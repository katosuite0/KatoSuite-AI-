import { NextRequest, NextResponse } from "next/server";

interface LessonPlanRequest {
  framework: "HDLH" | "Flight" | "ELOF" | "Accueillir";
  ageGroup: string;
  topic: string;
  duration: number;
  additionalRequirements?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: LessonPlanRequest | null = null;

  try {
    body = await request.json();
    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const { framework, ageGroup, topic, duration, additionalRequirements } = body;

    if (!framework || !ageGroup || !topic || !duration) {
      return NextResponse.json(
        { error: "Missing required fields: framework, ageGroup, topic, duration" },
        { status: 400 },
      );
    }

    const prompt = buildLessonPlanPrompt(framework, ageGroup, topic, duration, additionalRequirements);

    const aiResponse = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer pplx-d41d8cd98f00b204e9800998ecf8427e`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          {
            role: "system",
            content:
              "You are an expert Early Childhood Education curriculum designer with deep knowledge of various ECE frameworks and developmentally appropriate practices.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI service responded with status: ${aiResponse.status}`);
    }

    const aiData = (await aiResponse.json()) as any;
    const generatedContent = aiData.choices?.[0]?.message?.content ?? "";

    const parsedLessonPlan = parseLessonPlanContent(
      generatedContent,
      framework,
      ageGroup,
      topic,
      duration,
    );

    return NextResponse.json({
      success: true,
      lessonPlan: parsedLessonPlan,
      metadata: {
        generatedAt: new Date().toISOString(),
        framework,
        ageGroup,
        topic,
        duration,
      },
    });
  } catch (error) {
    console.error("AI lesson plan generation error:", error);

    const fallbackPlan = createFallbackLessonPlan(
      body?.framework ?? "HDLH",
      body?.ageGroup ?? "preschool",
      body?.topic ?? "Exploration",
      body?.duration ?? 30,
    );

    return NextResponse.json({
      success: false,
      error: "AI generation failed, providing fallback lesson plan",
      lessonPlan: fallbackPlan,
      isFallback: true,
    });
  }
}

function buildLessonPlanPrompt(
  framework: string,
  ageGroup: string,
  topic: string,
  duration: number,
  additionalRequirements?: string,
): string {
  const frameworkGuidelines = getFrameworkGuidelines(framework);
  const ageAdaptations = getAgeGroupAdaptations(ageGroup);

  return `
Create a comprehensive Early Childhood Education lesson plan with these specifications:

**Framework**: ${framework}
**Age Group**: ${ageGroup}
**Topic**: ${topic}
**Duration**: ${duration} minutes
**Additional Requirements**: ${additionalRequirements || "None"}

**Framework Guidelines to Follow**:
${frameworkGuidelines}

**Age-Appropriate Adaptations**:
${ageAdaptations}

Please structure your response with these clearly labeled sections:

**TITLE**: [Engaging lesson title]

**DESCRIPTION**: [2-3 sentence overview of the lesson]

**LEARNING OBJECTIVES**: 
- [Specific, measurable objective 1]
- [Specific, measurable objective 2]
- [Specific, measurable objective 3]

**MATERIALS NEEDED**:
- [Material 1]
- [Material 2]
- [Material 3]

**ACTIVITIES BREAKDOWN**:
- [Time allocation] - [Activity name and description]
- [Time allocation] - [Activity name and description]
- [Time allocation] - [Activity name and description]

**ASSESSMENT STRATEGIES**:
- [Assessment method 1]
- [Assessment method 2]

**SAFETY CONSIDERATIONS**:
- [Safety point 1]
- [Safety point 2]

**DIFFERENTIATION/ADAPTATIONS**:
- [Adaptation for different learning styles]
- [Modification for special needs]

**EXTENSION ACTIVITIES**:
- [Extension idea 1]
- [Extension idea 2]

Ensure all activities are developmentally appropriate, engaging, and align with the ${framework} framework principles.
  `.trim();
}

function getFrameworkGuidelines(framework: string): string {
  const guidelines: Record<string, string> = {
    HDLH: `High/Scope Active Learning Approach:
- Emphasize hands-on learning through direct experience
- Follow the "plan-do-review" sequence
- Create rich learning environment with defined interest areas
- Support children's natural curiosity and initiative
- Use key developmental indicators (KDIs) as learning goals`,

    Flight: `Flight Curriculum Framework:
- Use emergent curriculum based on children's interests
- Implement project-based learning approaches
- Focus on documentation of learning processes
- Encourage family and community involvement
- Support children's natural learning progression`,

    ELOF: `Head Start Early Learning Outcomes Framework:
- Address all five central domains of school readiness
- Incorporate culturally and linguistically responsive practices
- Support dual language learners appropriately
- Use ongoing assessment for individualization
- Engage families as partners in learning`,

    Accueillir: `Accueillir la petite enfance Philosophy:
- Respect each child's individual developmental rhythm
- Create secure, nurturing emotional environments
- Support French language development naturally
- Honor cultural identity and family values
- Focus on holistic child development`,
  };

  return guidelines[framework] ?? "General ECE best practices";
}

function getAgeGroupAdaptations(ageGroup: string): string {
  const adaptations: Record<string, string> = {
    infants: `Infant Adaptations (0-12 months):
- Focus on sensory exploration and attachment
- Incorporate routine care as learning opportunities
- Use simple songs, textures, and visual stimulation
- Support emerging motor skills development
- Create calm, predictable environments`,

    toddlers: `Toddler Adaptations (1-2 years):
- Support emerging independence and autonomy
- Use simple, concrete language and instructions
- Incorporate movement and active exploration
- Allow for parallel play opportunities
- Support emerging self-help skills`,

    preschool: `Preschool Adaptations (3-5 years):
- Encourage complex dramatic play and imagination
- Introduce pre-academic concepts through play
- Support social skill development and friendship
- Use multi-step instructions and problem-solving
- Incorporate choice and decision-making`,

    "school-age": `School-Age Adaptations (6+ years):
- Provide structured activities with clear rules
- Support academic skill development and homework
- Encourage leadership and responsibility
- Offer challenging projects and investigations
- Foster peer collaboration and teamwork`,
  };

  return adaptations[ageGroup.toLowerCase()] ?? adaptations.preschool;
}

function parseLessonPlanContent(
  content: string,
  framework: string,
  ageGroup: string,
  topic: string,
  duration: number,
): any {
  const sections = extractSections(content);

  return {
    title: sections.title ?? `${topic} Exploration - ${framework}`,
    description: sections.description ?? `${framework}-aligned lesson for ${ageGroup}`,
    framework,
    ageGroup,
    duration,
    objectives:
      extractListItems(sections.learning_objectives ?? sections.objectives) ?? [
        `Explore ${topic} concepts through hands-on activities`,
        "Develop language and communication skills",
        "Foster creativity and problem-solving abilities",
      ],
    materials: extractListItems(sections.materials_needed ?? sections.materials) ?? [
      "Age-appropriate manipulatives",
      "Art supplies",
      "Books related to topic",
    ],
    activities: extractListItems(sections.activities_breakdown ?? sections.activities) ?? [
      "Opening circle time and introduction",
      "Hands-on exploration activity",
      "Creative expression time",
      "Closing reflection and cleanup",
    ],
    assessments: extractListItems(sections.assessment_strategies ?? sections.assessment) ?? [
      "Observational notes during activities",
      "Photo documentation",
      "Brief individual check-ins",
    ],
    safetyConsiderations: extractListItems(sections.safety_considerations) ?? [
      "Ensure all materials are age-appropriate",
      "Maintain proper supervision ratios",
    ],
    extensions: extractListItems(sections.extension_activities ?? sections.extensions) ?? [
      "Take learning outdoors if weather permits",
      "Create a follow-up art project",
    ],
    differentiations: extractListItems(sections.differentiation ?? sections.adaptations) ?? [
      "Provide visual supports for diverse learners",
      "Offer multiple ways to participate",
    ],
  };
}

function extractSections(content: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const sectionRegex = /\*\*([^*:]+)\*\*:?(?:\s*\n)?((?:[^*\n]+\n?)*)/g;

  let match: RegExpExecArray | null;
  while ((match = sectionRegex.exec(content)) !== null) {
    const [, header, sectionContent] = match;
    const key = header.toLowerCase().replace(/\s+/g, "_").replace(/[^\w]/g, "");
    sections[key] = sectionContent.trim();
  }

  return sections;
}

function extractListItems(text: string | undefined): string[] | undefined {
  if (!text) {
    return undefined;
  }

  const items = text
    .split("\n")
    .map((line) => line.replace(/^[-*•]\s*/, "").trim())
    .filter((line) => line.length > 0 && !line.startsWith("**"));

  return items.length > 0 ? items : undefined;
}

function createFallbackLessonPlan(
  framework: string,
  ageGroup: string,
  topic: string,
  duration: number,
): any {
  return {
    title: `${topic} Discovery Activity`,
    description: `Engaging ${topic} exploration designed for ${ageGroup} using ${framework} principles`,
    framework,
    ageGroup,
    duration,
    objectives: [
      `Investigate ${topic} through sensory exploration`,
      "Practice communication and vocabulary development",
      "Develop fine and gross motor skills",
    ],
    materials: [
      "Various textures and manipulatives",
      "Art and writing supplies",
      "Books or visual aids",
      "Music or sound elements",
    ],
    activities: [
      "5 min - Welcome circle and topic introduction",
      `${duration - 15} min - Hands-on ${topic} exploration`,
      "5 min - Group sharing and reflection",
      "5 min - Clean-up and transition",
    ],
    assessments: [
      "Anecdotal observations during play",
      "Photography of child engagement",
      "Simple questioning and discussion",
    ],
    safetyConsiderations: [
      "Age-appropriate materials only",
      "Constant adult supervision",
      "Clear activity boundaries",
    ],
    extensions: [
      "Create a class book about the experience",
      "Set up a related dramatic play area",
    ],
  };
}
