"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Users, Heart, Shield, Globe, Lightbulb, Award } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "ECE Centers Served", value: "2,500+", icon: Users },
  { label: "Children Supported", value: "150,000+", icon: Heart },
  { label: "Compliance Rate", value: "99.7%", icon: Shield },
  { label: "Countries", value: "12", icon: Globe },
];

const values = [
  {
    icon: Heart,
    title: "Child-Centered",
    description: "Every feature is designed with the child's development and wellbeing at the center.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Comprehensive compliance tools ensure the highest safety standards are maintained.",
  },
  {
    icon: Lightbulb,
    title: "Innovation-Driven",
    description: "Leveraging AI and modern technology to enhance early childhood education.",
  },
  {
    icon: Users,
    title: "Community-Focused",
    description: "Building bridges between educators, families, and children for stronger communities.",
  },
];

const leadership = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Founder & CEO",
    bio: "Former ECE educator with 15+ years experience in childhood development",
    credentials: "PhD Early Childhood Education, Harvard",
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    bio: "EdTech veteran who has built platforms serving 1M+ students",
    credentials: "MS Computer Science, Stanford",
  },
  {
    name: "Dr. Jennifer Rodriguez",
    role: "Head of Compliance",
    bio: "Former state ECE inspector with expertise in regulatory frameworks",
    credentials: "JD Education Law, Columbia",
  },
];

export default function AboutPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation userPlan="free" />

      <main className="px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="py-16 text-center">
            <div className="mb-6 flex items-center justify-center">
              <img
                src="https://ucarecdn.com/a1a0352a-bb45-4b8b-8ca8-db2c8dd0fcb1/"
                alt="KatoSuite Logo"
                className="mr-4 h-16 w-16"
              />
              <h1 className="text-5xl font-bold text-gray-900">About KatoSuite</h1>
            </div>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
              Empowering Early Childhood Education through innovative technology, comprehensive compliance
              management, and AI-powered tools that put children's development at the center of everything we do.
            </p>
            <Badge variant="secondary" className="mt-4 px-6 py-2 text-lg">
              Serving the $18.3B ECE Industry
            </Badge>
          </section>

          <section className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="text-center">
                  <CardHeader className="pb-2">
                    <Icon className="mx-auto h-8 w-8 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <section className="mb-16">
            <Card className="mx-auto max-w-4xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-gray-900">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p>
                  KatoSuite exists to revolutionize Early Childhood Education by providing educators, administrators,
                  and families with the most comprehensive, user-friendly, and compliant management platform available.
                </p>
                <p>
                  We believe that every child deserves the highest quality early childhood education experience, and
                  every educator deserves tools that make their important work more effective, efficient, and fulfilling.
                </p>
                <p>
                  Through cutting-edge AI technology, real-time collaboration tools, and industry-leading compliance
                  management, we're building the future of early childhood education - one center, one child, one family
                  at a time.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <Card key={value.title} className="h-full text-center">
                    <CardHeader>
                      <Icon className="mb-4 h-12 w-12 text-blue-600" />
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">{value.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Leadership Team</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {leadership.map((member) => (
                <Card key={member.name}>
                  <CardHeader>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="font-medium text-blue-600">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-gray-700">
                    <p>{member.bio}</p>
                    <Badge variant="outline" className="text-xs">
                      {member.credentials}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Awards & Recognition</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {["EdTech Breakthrough Award", "NAEYC Technology Partner", "SOC 2 Type II Certified"].map((award) => (
                <Card key={award} className="text-center">
                  <CardHeader>
                    <Award className="mx-auto mb-4 h-12 w-12 text-yellow-600" />
                    <CardTitle>{award}</CardTitle>
                    <CardDescription>
                      {award === "EdTech Breakthrough Award"
                        ? "2024 ECE Innovation Platform"
                        : award === "NAEYC Technology Partner"
                        ? "Official Technology Partner 2024"
                        : "Highest Security Standards"}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <section className="py-16 text-center">
            <Card className="mx-auto max-w-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardContent className="py-12">
                <h3 className="mb-4 text-2xl font-bold">Ready to Transform Your ECE Program?</h3>
                <p className="mb-8 text-lg opacity-90">
                  Join thousands of educators who trust KatoSuite for comprehensive ECE management and compliance.
                </p>
                <div className="space-x-4">
                  <Link href="/pricing">
                    <Button size="lg" variant="secondary">View Pricing</Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="bg-white text-blue-600">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
