import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  Mic,
  Share,
  Sparkles,
  Target,
  Users,
  Wand2,
} from "lucide-react";

interface LessonPlannerProps {
  userPlan: string;
}

type LessonFormState = {
  title: string;
  ageGroup: string;
  subject: string;
  duration: string;
  objectives: string;
  framework: string;
};

type LessonActivity = {
  name: string;
  duration: string;
  description: string;
};

type GeneratedLesson = {
  title: string;
  ageGroup: string;
  subject: string;
  duration: string;
  framework: string;
  objectives: string[];
  materials: string[];
  activities: LessonActivity[];
  assessment: string;
  extensions: string[];
  complianceNotes: string;
};

const LessonPlanner: React.FC<LessonPlannerProps> = ({ userPlan }) => {
  const [lessonForm, setLessonForm] = useState<LessonFormState>({
    title: "",
    ageGroup: "",
    subject: "",
    duration: "",
    objectives: "",
    framework: "hdlh",
  });
  const [generatedLesson, setGeneratedLesson] = useState<GeneratedLesson | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [usedLessonsThisMonth, setUsedLessonsThisMonth] = useState(3);

  const frameworks = [
    { value: "hdlh", label: "How Does Learning Happen (HDLH)" },
    { value: "flight", label: "Flight Framework" },
    { value: "elof", label: "Early Learning Outcomes Framework (ELOF)" },
    { value: "accueillir", label: "Accueillir la petite enfance" },
  ];

  const ageGroups = [
    { value: "infants", label: "Infants (0-18 months)" },
    { value: "toddlers", label: "Toddlers (18 months - 3 years)" },
    { value: "preschool", label: "Preschool (3-4 years)" },
    { value: "kindergarten", label: "Kindergarten (4-5 years)" },
    { value: "mixed", label: "Mixed Age Groups" },
  ];

  const subjects = [
    "Mathematics",
    "Language & Literacy",
    "Science & Discovery",
    "Art & Creativity",
    "Music & Movement",
    "Social Skills",
    "Physical Development",
    "Dramatic Play",
    "Sensory Exploration",
    "Nature & Environment",
    "Cultural Awareness",
    "Problem Solving",
  ];

  const canGenerateLesson = userPlan !== "free" || usedLessonsThisMonth < 5;

  const handleGenerateLesson = async () => {
    if (!canGenerateLesson || !lessonForm.ageGroup || !lessonForm.subject) {
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const sampleLesson: GeneratedLesson = {
        title:
          lessonForm.title || `${lessonForm.subject || "Learning"} Exploration for ${lessonForm.ageGroup || "ECE"}`,
        ageGroup: lessonForm.ageGroup,
        subject: lessonForm.subject,
        duration: lessonForm.duration,
        framework: lessonForm.framework,
        objectives: [
          "Develop fine motor skills through hands-on activities",
          "Encourage creative expression and imagination",
          "Foster social interaction and cooperation",
          "Introduce basic mathematical concepts",
        ],
        materials: [
          "Colored paper squares (various sizes)",
          "Child-safe scissors",
          "Glue sticks",
          "Crayons or markers",
          "Large poster board",
          "Magnifying glasses",
        ],
        activities: [
          {
            name: "Circle Time Introduction",
            duration: "10 minutes",
            description:
              "Gather children in a circle and introduce the day's theme. Show examples and ask open-ended questions to engage their curiosity.",
          },
          {
            name: "Hands-on Exploration",
            duration: "20 minutes",
            description:
              "Children work in small groups to explore materials and create their own projects. Encourage experimentation and observation.",
          },
          {
            name: "Share & Reflect",
            duration: "10 minutes",
            description:
              "Children present their creations to the group and discuss what they learned. Ask questions to reinforce learning objectives.",
          },
        ],
        assessment:
          "Observe children's engagement, problem-solving approaches, and social interactions. Document with photos and brief notes.",
        extensions: [
          "Create a classroom display of children's work",
          "Send home extension activities for families",
          "Connect to upcoming themes or seasonal activities",
        ],
        complianceNotes: "This lesson aligns with HDLH principles of engagement, expression, belonging, and well-being.",
      };

      setGeneratedLesson(sampleLesson);
      setUsedLessonsThisMonth((prev) => prev + 1);
      setIsGenerating(false);
    }, 1200);
  };

  const handleInputChange = <K extends keyof LessonFormState>(key: K, value: LessonFormState[K]) => {
    setLessonForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BookOpen className="w-7 h-7 mr-3 text-blue-600" />
            AI Lesson Planner
          </h1>
          <p className="text-gray-600 mt-1">Create framework-compliant lesson plans in seconds with AI assistance</p>
        </div>

        <div className="text-right space-y-2">
          <Badge variant={userPlan === "free" ? "destructive" : "default"}>
            {userPlan === "free" ? `${usedLessonsThisMonth}/5 used this month` : "Unlimited lessons"}
          </Badge>
          {userPlan !== "free" && (
            <div className="flex items-center text-sm text-gray-500 justify-end">
              <Mic className="w-4 h-4 mr-1" />
              Voice AI Planning Available
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wand2 className="w-5 h-5 mr-2" />
              Create New Lesson Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="lesson-title">Lesson Title</Label>
              <Input
                id="lesson-title"
                placeholder="e.g., Nature Scavenger Hunt"
                value={lessonForm.title}
                onChange={(event) => handleInputChange("title", event.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Age Group</Label>
                <Select value={lessonForm.ageGroup} onValueChange={(value) => handleInputChange("ageGroup", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age group" />
                  </SelectTrigger>
                  <SelectContent>
                    {ageGroups.map((age) => (
                      <SelectItem key={age.value} value={age.value}>
                        {age.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Duration</Label>
                <Select value={lessonForm.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15min">15 minutes</SelectItem>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="45min">45 minutes</SelectItem>
                    <SelectItem value="60min">1 hour</SelectItem>
                    <SelectItem value="90min">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Subject/Theme</Label>
              <Select value={lessonForm.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Compliance Framework</Label>
              <Select value={lessonForm.framework} onValueChange={(value) => handleInputChange("framework", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.map((framework) => (
                    <SelectItem key={framework.value} value={framework.value}>
                      {framework.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="lesson-objectives">Learning Objectives (Optional)</Label>
              <Textarea
                id="lesson-objectives"
                placeholder="Describe specific learning goals for this lesson..."
                value={lessonForm.objectives}
                onChange={(event) => handleInputChange("objectives", event.target.value)}
                rows={3}
              />
            </div>

            <Button
              onClick={handleGenerateLesson}
              disabled={!canGenerateLesson || isGenerating || !lessonForm.ageGroup || !lessonForm.subject}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating AI Lesson Plan...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate AI Lesson Plan
                </>
              )}
            </Button>

            {!canGenerateLesson && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg space-y-1">
                <div className="flex items-center text-orange-800">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm font-semibold">Monthly Limit Reached</span>
                </div>
                <p className="text-sm text-orange-700">
                  You've used all 5 free lesson plans this month. Upgrade to Individual plan for unlimited lessons.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Generated Lesson Plan
              </span>
              {generatedLesson && (
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Share className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!generatedLesson ? (
              <div className="text-center py-12 space-y-3">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto" />
                <p className="text-gray-500">
                  Fill out the form and click "Generate AI Lesson Plan" to create your lesson.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">{generatedLesson.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      <Users className="w-3 h-3 mr-1" />
                      {generatedLesson.ageGroup}
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      {generatedLesson.duration}
                    </Badge>
                    <Badge variant="outline">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {generatedLesson.framework.toUpperCase()} Compliant
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Learning Objectives</h4>
                  <ul className="space-y-1">
                    {generatedLesson.objectives.map((objective) => (
                      <li key={objective} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Materials Needed</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    {generatedLesson.materials.map((material) => (
                      <div key={material} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                        {material}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Activity Sequence</h4>
                  <div className="space-y-4">
                    {generatedLesson.activities.map((activity) => (
                      <div key={activity.name} className="border-l-4 border-blue-200 pl-4 space-y-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-gray-900">{activity.name}</h5>
                          <Badge variant="secondary" className="text-xs">
                            {activity.duration}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Assessment Strategy</h4>
                    <p>{generatedLesson.assessment}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Extension Activities</h4>
                    <ul className="space-y-1">
                      {generatedLesson.extensions.map((extension) => (
                        <li key={extension} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {extension}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-1">
                  <div className="flex items-center text-green-800">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="font-semibold text-sm">Framework Compliance</span>
                  </div>
                  <p className="text-sm text-green-700">{generatedLesson.complianceNotes}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Lesson Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                title: "Nature Scavenger Hunt",
                subject: "Science & Discovery",
                date: "2 days ago",
                framework: "HDLH",
              },
              {
                title: "Color Mixing Magic",
                subject: "Art & Creativity",
                date: "5 days ago",
                framework: "Flight",
              },
              {
                title: "Story Circle Time",
                subject: "Language & Literacy",
                date: "1 week ago",
                framework: "ELOF",
              },
            ].map((lesson) => (
              <div key={lesson.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                  <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                    <span>{lesson.subject}</span>
                    <span>•</span>
                    <span>{lesson.date}</span>
                    <Badge variant="outline" className="text-xs">
                      {lesson.framework}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonPlanner;
export { LessonPlanner };
