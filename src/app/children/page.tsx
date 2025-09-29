"use client";

import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import { ChildProfiles } from "@/components/ChildProfiles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Search,
  Plus,
  Star,
  TrendingUp,
  Activity,
  MessageSquare,
  User as UserIcon,
  CheckCircle,
  Heart,
  BookOpen,
  Camera,
} from "lucide-react";
import Link from "next/link";

interface ChildProfile {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  enrollmentDate: string;
  ageGroup: string;
  classroom: string;
  status: "active" | "inactive" | "pending";
  parentName: string;
  parentEmail: string;
  milestones: number;
  recentActivity: string;
  profilePhoto?: string;
}

interface MilestoneRecord {
  id: string;
  childId: string;
  category: "physical" | "cognitive" | "social" | "language";
  title: string;
  description: string;
  achievedDate: string;
  ageAchieved: string;
  status: "achieved" | "in-progress" | "upcoming";
}

const milestoneCategoryMeta: Record<MilestoneRecord["category"], { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  physical: { label: "Physical", icon: Activity, color: "text-blue-600" },
  cognitive: { label: "Cognitive", icon: BookOpen, color: "text-green-600" },
  social: { label: "Social", icon: Heart, color: "text-purple-600" },
  language: { label: "Language", icon: MessageSquare, color: "text-amber-600" },
};

const demoChildren: ChildProfile[] = [
  {
    id: "1",
    firstName: "Emma",
    lastName: "Johnson",
    dateOfBirth: "2021-03-15",
    enrollmentDate: "2023-09-01",
    ageGroup: "Toddler",
    classroom: "Sunshine Room",
    status: "active",
    parentName: "Sarah Johnson",
    parentEmail: "sarah@example.com",
    milestones: 15,
    recentActivity: "Completed art activity - finger painting",
    profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "2",
    firstName: "Liam",
    lastName: "Chen",
    dateOfBirth: "2020-07-22",
    enrollmentDate: "2023-08-15",
    ageGroup: "Preschooler",
    classroom: "Rainbow Room",
    status: "active",
    parentName: "Michael Chen",
    parentEmail: "michael@example.com",
    milestones: 23,
    recentActivity: "Achieved counting to 20 milestone",
    profilePhoto: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "3",
    firstName: "Sophia",
    lastName: "Rodriguez",
    dateOfBirth: "2022-01-10",
    enrollmentDate: "2024-01-08",
    ageGroup: "Infant",
    classroom: "Little Stars",
    status: "active",
    parentName: "Maria Rodriguez",
    parentEmail: "maria@example.com",
    milestones: 8,
    recentActivity: "First independent sitting session",
    profilePhoto: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "4",
    firstName: "Noah",
    lastName: "Williams",
    dateOfBirth: "2019-11-05",
    enrollmentDate: "2023-06-01",
    ageGroup: "Pre-K",
    classroom: "Discovery Zone",
    status: "active",
    parentName: "Jennifer Williams",
    parentEmail: "jennifer@example.com",
    milestones: 31,
    recentActivity: "Participated in science experiment",
    profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
];

const demoMilestones: MilestoneRecord[] = [
  {
    id: "1",
    childId: "1",
    category: "physical",
    title: "Walks Independently",
    description: "Can walk without support for extended periods",
    achievedDate: "2024-01-15",
    ageAchieved: "2 years 10 months",
    status: "achieved",
  },
  {
    id: "2",
    childId: "2",
    category: "cognitive",
    title: "Counts to 20",
    description: "Can count from 1 to 20 without assistance",
    achievedDate: "2024-02-10",
    ageAchieved: "3 years 7 months",
    status: "achieved",
  },
  {
    id: "3",
    childId: "3",
    category: "social",
    title: "Sits Independently",
    description: "Can sit without support for several minutes",
    achievedDate: "2024-01-20",
    ageAchieved: "2 years",
    status: "achieved",
  },
];

const calculateAgeLabel = (dateOfBirth: string): string => {
  const birth = new Date(dateOfBirth);
  const today = new Date();
  const diffMonths = today.getMonth() - birth.getMonth() + 12 * (today.getFullYear() - birth.getFullYear());
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;

  if (years <= 0) {
    return `${months} months`;
  }

  if (months === 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  }

  return `${years} year${years > 1 ? "s" : ""}, ${months} month${months > 1 ? "s" : ""}`;
};

export default function ChildrenPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");
  const [selectedClassroom, setSelectedClassroom] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAddChildOpen, setIsAddChildOpen] = useState(false);

  const filteredChildren = useMemo(() => {
    return demoChildren.filter((child) => {
      const matchesSearch =
        child.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        child.parentName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAgeGroup = selectedAgeGroup === "all" || child.ageGroup === selectedAgeGroup;
      const matchesClassroom = selectedClassroom === "all" || child.classroom === selectedClassroom;

      return matchesSearch && matchesAgeGroup && matchesClassroom;
    });
  }, [searchTerm, selectedAgeGroup, selectedClassroom]);

  const ageGroupCounts = useMemo(() => ({
    Infant: demoChildren.filter((child) => child.ageGroup === "Infant").length,
    Toddler: demoChildren.filter((child) => child.ageGroup === "Toddler").length,
    Preschooler: demoChildren.filter((child) => child.ageGroup === "Preschooler").length,
    "Pre-K": demoChildren.filter((child) => child.ageGroup === "Pre-K").length,
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="h-8 w-8" />
                  Children Management
                </h1>
                <p className="text-gray-600">Manage child profiles, track milestones, and monitor development</p>
              </div>
              <Dialog open={isAddChildOpen} onOpenChange={setIsAddChildOpen}>
                <Button size="lg" onClick={() => setIsAddChildOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Child
                </Button>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Child</DialogTitle>
                    <DialogDescription>Enter the child&apos;s information to create their profile</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input id="dateOfBirth" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="enrollmentDate">Enrollment Date</Label>
                      <Input id="enrollmentDate" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="ageGroup">Age Group</Label>
                      <Select>
                        <SelectTrigger id="ageGroup">
                          <SelectValue placeholder="Select age group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Infant">Infant (0-12 months)</SelectItem>
                          <SelectItem value="Toddler">Toddler (1-2 years)</SelectItem>
                          <SelectItem value="Preschooler">Preschooler (3-4 years)</SelectItem>
                          <SelectItem value="Pre-K">Pre-K (4-5 years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="classroom">Classroom</Label>
                      <Select>
                        <SelectTrigger id="classroom">
                          <SelectValue placeholder="Select classroom" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Little Stars">Little Stars</SelectItem>
                          <SelectItem value="Sunshine Room">Sunshine Room</SelectItem>
                          <SelectItem value="Rainbow Room">Rainbow Room</SelectItem>
                          <SelectItem value="Discovery Zone">Discovery Zone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="parentName">Parent/Guardian Name</Label>
                      <Input id="parentName" placeholder="Enter parent/guardian name" />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
                      <Input id="parentEmail" type="email" placeholder="Enter email address" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddChildOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddChildOpen(false)}>Add Child</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Children</p>
                    <p className="text-3xl font-bold text-gray-900">{demoChildren.length}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> +2 this month
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Milestones This Week</p>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-green-600">Up 20%</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Observations</p>
                    <p className="text-3xl font-bold text-gray-900">24</p>
                    <p className="text-sm text-gray-500">In progress</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Parent Updates</p>
                    <p className="text-3xl font-bold text-gray-900">18</p>
                    <p className="text-sm text-gray-500">Today</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </section>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search children..."
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>

                  <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Age Groups" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Age Groups</SelectItem>
                      <SelectItem value="Infant">Infant ({ageGroupCounts.Infant})</SelectItem>
                      <SelectItem value="Toddler">Toddler ({ageGroupCounts.Toddler})</SelectItem>
                      <SelectItem value="Preschooler">Preschooler ({ageGroupCounts.Preschooler})</SelectItem>
                      <SelectItem value="Pre-K">Pre-K ({ageGroupCounts["Pre-K"]})</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Classrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classrooms</SelectItem>
                      <SelectItem value="Little Stars">Little Stars</SelectItem>
                      <SelectItem value="Sunshine Room">Sunshine Room</SelectItem>
                      <SelectItem value="Rainbow Room">Rainbow Room</SelectItem>
                      <SelectItem value="Discovery Zone">Discovery Zone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
                    Grid
                  </Button>
                  <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                    List
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="profiles" className="mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="profiles">Profiles</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="profiles" className="mt-6">
              {viewMode === "grid" ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredChildren.map((child) => (
                    <Card key={child.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          {child.profilePhoto ? (
                            <img
                              src={child.profilePhoto}
                              alt={`${child.firstName} ${child.lastName}`}
                              className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                              <UserIcon className="h-8 w-8 text-white" />
                            </div>
                          )}
                          <h3 className="font-bold text-lg text-gray-900">
                            {child.firstName} {child.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">Age: {calculateAgeLabel(child.dateOfBirth)}</p>
                        </div>

                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Age Group:</span>
                            <Badge variant="secondary">{child.ageGroup}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Classroom:</span>
                            <span>{child.classroom}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <Badge variant={child.status === "active" ? "default" : child.status === "pending" ? "outline" : "secondary"}>
                              {child.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Milestones:</span>
                            <span className="font-medium flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {child.milestones}
                            </span>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <p className="text-xs text-gray-500 mb-1">Recent Activity:</p>
                          <p className="text-sm text-gray-700">{child.recentActivity}</p>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button asChild size="sm" className="flex-1">
                            <Link href={`/children/${child.id}`}>View Profile</Link>
                          </Button>
                          <Button size="sm" variant="outline">
                            <Camera className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {filteredChildren.map((child) => (
                        <div key={child.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                          <div className="flex items-center gap-4">
                            {child.profilePhoto ? (
                              <img
                                src={child.profilePhoto}
                                alt={`${child.firstName} ${child.lastName}`}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                <UserIcon className="h-6 w-6 text-white" />
                              </div>
                            )}
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {child.firstName} {child.lastName}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>Age: {calculateAgeLabel(child.dateOfBirth)}</span>
                                <span>•</span>
                                <span>{child.ageGroup}</span>
                                <span>•</span>
                                <span>{child.classroom}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-sm font-medium text-gray-900">{child.milestones}</div>
                              <div className="text-xs text-gray-600">Milestones</div>
                            </div>
                            <Badge variant={child.status === "active" ? "default" : "secondary"}>{child.status}</Badge>
                            <Button asChild size="sm">
                              <Link href={`/children/${child.id}`}>View Profile</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="milestones" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Milestones</CardTitle>
                    <CardDescription>Latest developmental achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {demoMilestones.map((milestone) => {
                        const child = demoChildren.find((entry) => entry.id === milestone.childId);
                        const { icon: IconComponent, label, color } = milestoneCategoryMeta[milestone.category];
                        return (
                          <div key={milestone.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <IconComponent className={`h-5 w-5 ${color} mt-0.5`} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-medium text-gray-900">{milestone.title}</p>
                                <Badge variant="outline" className="text-xs">
                                  {label}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{child ? `${child.firstName} ${child.lastName}` : "Child"}</span>
                                <span>•</span>
                                <span>{milestone.ageAchieved}</span>
                                <span>•</span>
                                <span>{milestone.achievedDate}</span>
                              </div>
                            </div>
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Milestone Tracking</CardTitle>
                    <CardDescription>Development progress by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { category: "Physical", achieved: 18, total: 25, color: "bg-blue-500" },
                        { category: "Cognitive", achieved: 22, total: 28, color: "bg-green-500" },
                        { category: "Social", achieved: 15, total: 20, color: "bg-purple-500" },
                        { category: "Language", achieved: 20, total: 24, color: "bg-yellow-500" },
                      ].map((category) => (
                        <div key={category.category}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">{category.category}</span>
                            <span className="text-sm text-gray-600">
                              {category.achieved}/{category.total}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`${category.color} h-2 rounded-full`}
                              style={{ width: `${(category.achieved / category.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <ChildProfiles userPlan="professional" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
