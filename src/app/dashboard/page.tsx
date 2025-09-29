"use client";

import Navigation from "@/components/Navigation";
import DashboardOverview from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import {
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
  BarChart3,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Activity,
  Heart,
  Bell,
  Settings,
} from "lucide-react";
import Link from "next/link";

interface QuickStat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
}

interface RecentActivity {
  id: string;
  type: "lesson" | "observation" | "message" | "milestone";
  title: string;
  description: string;
  time: string;
  priority: "low" | "medium" | "high";
}

interface ComplianceItem {
  category: string;
  status: "compliant" | "warning" | "overdue";
  score: number;
  items: number;
  dueDate?: string;
}

const quickStats: QuickStat[] = [
  { title: "Active Children", value: "48", change: "+3 this week", trend: "up", icon: Users },
  { title: "Staff Members", value: "12", change: "1 new hire", trend: "up", icon: Heart },
  { title: "Lessons This Week", value: "24", change: "100% planned", trend: "neutral", icon: BookOpen },
  { title: "Parent Messages", value: "18", change: "6 unread", trend: "neutral", icon: MessageSquare },
];

const recentActivities: RecentActivity[] = [
  {
    id: "1",
    type: "milestone",
    title: "Sarah achieved walking milestone",
    description: "Documented first independent steps",
    time: "2 hours ago",
    priority: "high",
  },
  {
    id: "2",
    type: "message",
    title: "New message from Emma's parent",
    description: "Question about pickup time tomorrow",
    time: "4 hours ago",
    priority: "medium",
  },
  {
    id: "3",
    type: "lesson",
    title: "Art lesson completed",
    description: "Color mixing activity with Toddler group",
    time: "6 hours ago",
    priority: "low",
  },
  {
    id: "4",
    type: "observation",
    title: "Daily observation logged",
    description: "Social interaction notes for 5 children",
    time: "1 day ago",
    priority: "low",
  },
];

const complianceOverview: ComplianceItem[] = [
  { category: "Staff Certifications", status: "compliant", score: 98, items: 12 },
  { category: "Safety Inspections", status: "warning", score: 85, items: 8, dueDate: "Due in 5 days" },
  { category: "Health Records", status: "compliant", score: 100, items: 48 },
  { category: "Financial Reports", status: "overdue", score: 60, items: 3, dueDate: "Overdue by 2 days" },
];

const upcomingEvents = [
  { title: "Parent-Teacher Conferences", date: "Tomorrow, 9:00 AM", type: "meeting", participants: "8 families" },
  { title: "Fire Safety Drill", date: "Friday, 10:30 AM", type: "drill", participants: "All staff & children" },
  { title: "Monthly Staff Meeting", date: "Next Monday, 3:00 PM", type: "meeting", participants: "12 staff members" },
];

const getActivityIcon = (type: RecentActivity["type"]): React.ComponentType<{ className?: string }> => {
  switch (type) {
    case "milestone":
      return Star;
    case "message":
      return MessageSquare;
    case "lesson":
      return BookOpen;
    case "observation":
      return Activity;
    default:
      return Bell;
  }
};

const getComplianceIcon = (status: ComplianceItem["status"]): React.ComponentType<{ className?: string }> => {
  switch (status) {
    case "compliant":
      return CheckCircle;
    case "warning":
    case "overdue":
      return AlertTriangle;
    default:
      return Shield;
  }
};

const getComplianceColor = (status: ComplianceItem["status"]): string => {
  switch (status) {
    case "compliant":
      return "text-green-600";
    case "warning":
      return "text-yellow-600";
    case "overdue":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default function DashboardPage(): JSX.Element {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <main className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-8">You need to be logged in to access your dashboard.</p>
              <Button asChild size="lg">
                <Link href="/login">Sign In</Link>
              </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back{user ? `, ${user.email.split("@")[0]}` : ""}!
                </h1>
                <p className="text-gray-600">Here&apos;s what&apos;s happening at your center today</p>
              </div>
              <Button asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </header>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map(({ title, value, change, icon: IconComponent }) => (
              <Card key={title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{title}</p>
                      <p className="text-3xl font-bold text-gray-900">{value}</p>
                      <p className="text-sm text-gray-500">{change}</p>
                    </div>
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Latest updates from your center</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => {
                        const IconComponent = getActivityIcon(activity.type);
                        return (
                          <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <IconComponent className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900">{activity.title}</p>
                              <p className="text-sm text-gray-600">{activity.description}</p>
                              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                            </div>
                            <Badge
                              variant=
                                {activity.priority === "high"
                                  ? "destructive"
                                  : activity.priority === "medium"
                                  ? "default"
                                  : "secondary"}
                              className="text-xs"
                            >
                              {activity.priority}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View All Activity
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button asChild variant="outline" className="h-20 flex-col">
                        <Link href="/lessons">
                          <BookOpen className="h-6 w-6 mb-2" />
                          Plan Lesson
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="h-20 flex-col">
                        <Link href="/children">
                          <Users className="h-6 w-6 mb-2" />
                          Add Child
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="h-20 flex-col">
                        <Link href="/parents">
                          <MessageSquare className="h-6 w-6 mb-2" />
                          Send Message
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="h-20 flex-col">
                        <Link href="/reports">
                          <BarChart3 className="h-6 w-6 mb-2" />
                          View Reports
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Compliance Overview
                    </CardTitle>
                    <CardDescription>Monitor your compliance status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {complianceOverview.map((item) => {
                        const IconComponent = getComplianceIcon(item.status);
                        const colorClass = getComplianceColor(item.status);
                        return (
                          <div key={item.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <IconComponent className={`h-5 w-5 ${colorClass}`} />
                              <div>
                                <p className="font-medium text-gray-900">{item.category}</p>
                                <p className="text-sm text-gray-600">
                                  {item.items} items
                                  {item.dueDate ? ` • ${item.dueDate}` : ""}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">{item.score}%</p>
                              <Progress value={item.score} className="w-20 h-2 mt-1" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <Button asChild className="w-full mt-4">
                      <Link href="/compliance">View Full Compliance Hub</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Score Trends</CardTitle>
                    <CardDescription>Your compliance performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
                      <div className="text-gray-600 mb-4">Overall Compliance Score</div>
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">+5% from last month</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Recent Improvements</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Updated staff certifications</li>
                        <li>• Completed safety inspection</li>
                        <li>• Filed monthly reports on time</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <DashboardOverview userPlan={user?.plan ?? "free"} />
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Events
                    </CardTitle>
                    <CardDescription>Important dates and deadlines</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map(({ title, date, participants }) => (
                        <div key={title} className="flex items-start gap-3 p-3 border rounded-lg">
                          <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">{title}</p>
                            <p className="text-sm text-gray-600">{date}</p>
                            <p className="text-xs text-gray-500">{participants}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4">
                      <Link href="/calendar">View Full Calendar</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Today&apos;s Schedule</CardTitle>
                    <CardDescription>Current activities and staff assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[ 
                        { label: "Morning Circle Time", group: "Preschool Group", time: "9:00 AM" },
                        { label: "Outdoor Play", group: "All Groups", time: "10:30 AM" },
                        { label: "Art Activity", group: "Toddler Group", time: "2:00 PM" },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-gray-600">{item.group}</p>
                          </div>
                          <Badge variant="secondary">{item.time}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
