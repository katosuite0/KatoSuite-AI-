"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import {
  Brain,
  Shield,
  Users,
  MessageSquare,
  Calendar,
  BarChart3,
  FileText,
  Camera,
  CheckCircle,
  Smartphone,
  Target,
  Zap,
  Globe,
  Heart,
  Star,
  Award,
} from "lucide-react";
import Link from "next/link";

const featureCategories = [
  {
    id: "ai-tools",
    title: "AI-Powered Tools",
    icon: Brain,
    description: "Advanced AI capabilities for lesson planning and child development",
    features: [
      {
        name: "AI Lesson Planner",
        description: "Framework-compliant lesson generation with voice AI support",
        icon: FileText,
        premium: false,
      },
      {
        name: "Development Milestone Tracking",
        description: "Automated child development monitoring and progress reports",
        icon: Target,
        premium: false,
      },
      {
        name: "Smart Scheduling",
        description: "AI-optimized activity scheduling based on age groups",
        icon: Calendar,
        premium: true,
      },
      {
        name: "Predictive Analytics",
        description: "AI-powered insights for educational outcomes",
        icon: BarChart3,
        premium: true,
      },
    ],
  },
  {
    id: "compliance",
    title: "Compliance Management",
    icon: Shield,
    description: "Comprehensive regulatory compliance and safety protocols",
    features: [
      {
        name: "KatoCompliance Hub",
        description: "15+ professional compliance tools in one dashboard",
        icon: Shield,
        premium: false,
      },
      {
        name: "Safety Protocol Management",
        description: "Emergency procedures and incident reporting",
        icon: CheckCircle,
        premium: false,
      },
      {
        name: "Staff Certification Tracking",
        description: "Automated tracking of staff qualifications and renewals",
        icon: Award,
        premium: true,
      },
      {
        name: "Regulatory Reporting",
        description: "Automated compliance reports for state agencies",
        icon: FileText,
        premium: true,
      },
    ],
  },
  {
    id: "communication",
    title: "Parent Communication",
    icon: MessageSquare,
    description: "Real-time communication and family engagement tools",
    features: [
      {
        name: "Daily Reports",
        description: "Automated daily updates with photos and observations",
        icon: Camera,
        premium: false,
      },
      {
        name: "Real-time Messaging",
        description: "Instant messaging between staff and families",
        icon: MessageSquare,
        premium: false,
      },
      {
        name: "Milestone Notifications",
        description: "Automated alerts for developmental achievements",
        icon: Star,
        premium: true,
      },
      {
        name: "Parent Portal App",
        description: "Mobile app for parents with push notifications",
        icon: Smartphone,
        premium: true,
      },
    ],
  },
  {
    id: "management",
    title: "Center Management",
    icon: Users,
    description: "Complete operational management for ECE centers",
    features: [
      {
        name: "Staff Management",
        description: "Employee scheduling, payroll integration, and performance tracking",
        icon: Users,
        premium: false,
      },
      {
        name: "Financial Tracking",
        description: "Tuition management, billing, and financial reporting",
        icon: BarChart3,
        premium: true,
      },
      {
        name: "Attendance Management",
        description: "Digital check-in/check-out with biometric options",
        icon: Calendar,
        premium: false,
      },
      {
        name: "Resource Management",
        description: "Inventory tracking for supplies and equipment",
        icon: FileText,
        premium: true,
      },
    ],
  },
];

const frameworks = [
  "Head Start Performance Standards",
  "NAEYC Accreditation Standards",
  "High/Scope Active Learning",
  "Creative Curriculum",
  "ELOF Framework",
  "State Quality Rating Systems",
];

const integrations = [
  "Google Classroom",
  "Zoom",
  "QuickBooks",
  "Brightwheel",
  "HiMama",
  "Procare",
  "Kangarootime",
  "ChildPlus",
];

export default function FeaturesPage(): JSX.Element {
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
              <h1 className="text-5xl font-bold text-gray-900">KatoSuite Features</h1>
            </div>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
              Discover the comprehensive suite of tools designed specifically for Early Childhood Education professionals.
              From AI-powered lesson planning to complete compliance management.
            </p>
            <Badge variant="secondary" className="mt-4 px-6 py-2 text-lg">
              65+ Professional ECE Tools
            </Badge>
          </section>

          <Tabs defaultValue="ai-tools" className="mb-16">
            <TabsList className="mb-8 grid w-full grid-cols-2 lg:grid-cols-4">
              {featureCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {featureCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="mb-8 flex items-center gap-3">
                  <category.icon className="h-8 w-8 text-blue-600" />
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {category.features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <Card key={feature.name} className="relative">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Icon className="h-6 w-6 text-blue-600" />
                              <CardTitle className="text-xl">{feature.name}</CardTitle>
                            </div>
                            {feature.premium && <Badge variant="secondary">Premium</Badge>}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <section className="mb-16">
            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader className="text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <CardTitle className="text-3xl text-gray-900">Framework Compliance</CardTitle>
                </div>
                <CardDescription className="text-lg text-gray-700">
                  Built-in compliance with major ECE frameworks and standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {frameworks.map((framework) => (
                    <div key={framework} className="flex items-center gap-2 rounded-lg border bg-white p-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-800">{framework}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardHeader className="text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <Globe className="h-8 w-8 text-purple-600" />
                  <CardTitle className="text-3xl text-gray-900">Seamless Integrations</CardTitle>
                </div>
                <CardDescription className="text-lg text-gray-700">
                  Connect with your existing tools and workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  {integrations.map((integration) => (
                    <div key={integration} className="flex items-center gap-2 rounded-lg border bg-white p-3">
                      <Zap className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-800">{integration}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Why Choose KatoSuite?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <Heart className="mx-auto mb-4 h-12 w-12 text-red-500" />
                  <CardTitle>Child-Centered Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Every feature is designed with child development and wellbeing at the center, ensuring the best outcomes for
                    the children in your care.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Zap className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
                  <CardTitle>Time-Saving Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    Reduce administrative workload by 70% with intelligent automation for lesson planning, reporting, and
                    compliance management.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Shield className="mx-auto mb-4 h-12 w-12 text-blue-500" />
                  <CardTitle>Enterprise Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    SOC 2 Type II certified with enterprise-grade security to protect sensitive child and family data with the
                    highest standards.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="py-16 text-center">
            <Card className="mx-auto max-w-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardContent className="py-12">
                <h3 className="mb-4 text-3xl font-bold">Experience All Features Risk-Free</h3>
                <p className="mb-8 text-lg opacity-90">
                  Start your 30-day free trial today and discover why thousands of ECE professionals trust KatoSuite for their
                  program management needs.
                </p>
                <div className="space-x-4">
                  <Link href="/pricing">
                    <Button size="lg" variant="secondary">Start Free Trial</Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="bg-white text-blue-600">
                      Schedule Demo
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
