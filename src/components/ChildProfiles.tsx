import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  AlertTriangle,
  Camera,
  CheckCircle,
  Edit,
  Eye,
  Plus,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

interface ChildProfilesProps {
  userPlan: string;
}

type DevelopmentAreas = "physical" | "cognitive" | "social" | "emotional" | "communication";

type ChildProfile = {
  id: number;
  name: string;
  age: number;
  dateOfBirth: string;
  emergencyContact: string;
  allergies: string[];
  developmentalMilestones: Record<DevelopmentAreas, number>;
  recentObservations: Array<{ date: string; type: string; note: string }>;
  photo: string | null;
  enrollmentDate: string;
  currentGoals: string[];
};

const planLimits: Record<string, number> = {
  free: 3,
  individual: 15,
  small: 35,
  professional: 75,
  multisite: 150,
  enterprise: 300,
};

const developmentalAreas: Array<{ key: DevelopmentAreas; label: string; color: string }> = [
  { key: "physical", label: "Physical Development", color: "bg-blue-500" },
  { key: "cognitive", label: "Cognitive Development", color: "bg-green-500" },
  { key: "social", label: "Social Development", color: "bg-purple-500" },
  { key: "emotional", label: "Emotional Development", color: "bg-orange-500" },
  { key: "communication", label: "Communication", color: "bg-pink-500" },
];

const childrenData: ChildProfile[] = [
  {
    id: 1,
    name: "Emma Thompson",
    age: 4,
    dateOfBirth: "2020-03-15",
    emergencyContact: "Sarah Thompson",
    allergies: ["Peanuts", "Shellfish"],
    developmentalMilestones: {
      physical: 85,
      cognitive: 92,
      social: 78,
      emotional: 88,
      communication: 90,
    },
    recentObservations: [
      { date: "2024-01-10", type: "Social Skills", note: "Shared toys willingly with peers during free play" },
      { date: "2024-01-08", type: "Fine Motor", note: "Successfully used scissors to cut along lines" },
      { date: "2024-01-05", type: "Language", note: "Used complex sentences to describe weekend activities" },
    ],
    photo: null,
    enrollmentDate: "2023-09-01",
    currentGoals: [
      "Improve turn-taking during group activities",
      "Practice writing letters independently",
      "Develop conflict resolution skills",
    ],
  },
  {
    id: 2,
    name: "Marcus Chen",
    age: 3,
    dateOfBirth: "2021-07-22",
    emergencyContact: "Linda Chen",
    allergies: ["Dairy"],
    developmentalMilestones: {
      physical: 75,
      cognitive: 88,
      social: 82,
      emotional: 70,
      communication: 85,
    },
    recentObservations: [
      { date: "2024-01-09", type: "Emotional", note: "Needed support managing frustration during puzzle time" },
      { date: "2024-01-07", type: "Physical", note: "Climbed playground equipment confidently" },
      { date: "2024-01-04", type: "Cognitive", note: "Counted to 15 without assistance" },
    ],
    photo: null,
    enrollmentDate: "2023-10-15",
    currentGoals: [
      "Practice emotional regulation strategies",
      "Increase vocabulary through storytelling",
      "Build gross motor coordination",
    ],
  },
];

const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const getAgeString = (dateOfBirth: string): string => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;

  if (years === 0) return `${months} months`;
  if (months === 0) return `${years} year${years > 1 ? "s" : ""}`;
  return `${years}y ${months}m`;
};

const ChildProfiles: React.FC<ChildProfilesProps> = ({ userPlan }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChild, setActiveChild] = useState<ChildProfile | null>(null);

  const maxChildren = planLimits[userPlan] ?? planLimits.free;
  const currentChildrenCount = childrenData.length;

  const filteredChildren = childrenData.filter((child) =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="w-7 h-7 mr-3 text-blue-600" />
            Child Development Profiles
          </h1>
          <p className="text-gray-600 mt-1">Digital portfolios with developmental milestones and learning stories</p>
        </div>

        <div className="flex items-center space-x-4">
          <Badge variant={currentChildrenCount >= maxChildren ? "destructive" : "default"}>
            {currentChildrenCount}/{maxChildren === -1 ? "∞" : maxChildren} profiles
          </Badge>
          <Button disabled={currentChildrenCount >= maxChildren} className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Child
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Children Overview</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search children..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChildren.map((child) => (
              <Card
                key={child.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setActiveChild(child)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={child.photo ?? undefined} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">{getInitials(child.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{child.name}</h3>
                      <p className="text-sm text-gray-500">{getAgeString(child.dateOfBirth)}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {Math.round(
                        Object.values(child.developmentalMilestones).reduce((sum, value) => sum + value, 0) /
                          developmentalAreas.length,
                      )}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">Development Overview</span>
                      <span className="text-xs text-gray-500">
                        Avg: {Math.round(
                          Object.values(child.developmentalMilestones).reduce((sum, value) => sum + value, 0) /
                            developmentalAreas.length,
                        )}%
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                      {developmentalAreas.map((area) => (
                        <div key={area.key} className="text-center">
                          <div
                            className={`h-2 rounded-full ${area.color}`}
                            style={{ opacity: child.developmentalMilestones[area.key] / 100 }}
                          />
                          <span className="text-xs text-gray-500 mt-1 block">{area.key.slice(0, 3)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {child.allergies.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <div className="flex flex-wrap gap-1">
                        {child.allergies.map((allergy) => (
                          <Badge key={allergy} variant="outline" className="text-xs">
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-gray-600">
                    <span className="text-xs font-medium text-gray-600 block">Latest Observation</span>
                    <p className="mt-1">
                      {child.recentObservations[0]?.type}: {child.recentObservations[0]?.note.slice(0, 50)}...
                    </p>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {currentChildrenCount < maxChildren && (
              <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer transition-colors">
                <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] text-gray-500 text-center space-y-3">
                  <Plus className="w-12 h-12" />
                  <h3 className="font-medium text-gray-900">Add New Child</h3>
                  <p className="text-sm">Create a new development profile to track milestones and observations</p>
                </CardContent>
              </Card>
            )}
          </div>

          {currentChildrenCount >= maxChildren && (
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg space-y-2">
              <div className="flex items-center text-orange-800">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="font-semibold">Profile Limit Reached</span>
              </div>
              <p className="text-sm text-orange-700">
                You've reached the maximum of {maxChildren} child profiles for your plan. Upgrade to add more children.
              </p>
              <Button size="sm" className="mt-1" variant="outline">
                Upgrade Plan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {activeChild && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Detailed Profile: {activeChild.name}</span>
              <Button size="sm" variant="outline" onClick={() => setActiveChild(null)}>
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="development" className="space-y-4">
              <TabsList className="grid grid-cols-4 gap-2">
                <TabsTrigger value="development">Development</TabsTrigger>
                <TabsTrigger value="observations">Observations</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="family">Family Info</TabsTrigger>
              </TabsList>

              <TabsContent value="development" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {developmentalAreas.map((area) => (
                    <Card key={area.key}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center">
                          <span className={`w-4 h-4 rounded-full ${area.color} mr-2`} />
                          {area.label}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold">
                            {activeChild.developmentalMilestones[area.key]}%
                          </span>
                        </div>
                        <Progress value={activeChild.developmentalMilestones[area.key]} className="h-3" />
                        <p className="text-xs text-gray-500">On track for age-appropriate development</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="observations" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Recent Observations</h3>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Observation
                  </Button>
                </div>
                <div className="space-y-3">
                  {activeChild.recentObservations.map((observation) => (
                    <Card key={observation.date}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline">{observation.type}</Badge>
                              <span className="text-sm text-gray-500">{observation.date}</span>
                            </div>
                            <p className="text-sm text-gray-700">{observation.note}</p>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Camera className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="goals" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Current Learning Goals</h3>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
                <div className="space-y-3">
                  {activeChild.currentGoals.map((goal) => (
                    <div key={goal} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm text-gray-700">{goal}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Complete
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="family" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-gray-700">
                      <div>
                        <span className="text-xs uppercase text-gray-500">Date of Birth</span>
                        <p className="font-medium">{activeChild.dateOfBirth}</p>
                      </div>
                      <div>
                        <span className="text-xs uppercase text-gray-500">Enrollment Date</span>
                        <p className="font-medium">{activeChild.enrollmentDate}</p>
                      </div>
                      <div>
                        <span className="text-xs uppercase text-gray-500">Emergency Contact</span>
                        <p className="font-medium">{activeChild.emergencyContact}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Special Considerations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-xs uppercase text-gray-500">Allergies</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {activeChild.allergies.map((allergy) => (
                            <Badge key={allergy} variant="outline" className="text-red-700 border-red-200">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChildProfiles;
export { ChildProfiles };
