import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Users, BookOpen, CheckCircle, AlertTriangle, Calendar, MessageSquare, Shield, Star } from "lucide-react";

interface DashboardProps {
  userPlan: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userPlan }) => {
  const planLimits: Record<string, { children: number | null; lessons: number | null; observations: number | null }> = {
    free: { children: 3, lessons: 5, observations: 20 },
    individual: { children: 15, lessons: null, observations: 100 },
    small: { children: 35, lessons: null, observations: null },
    professional: { children: 75, lessons: null, observations: null },
  };

  const limits = planLimits[userPlan as keyof typeof planLimits] ?? planLimits.free;

  const stats = {
    childrenCount: userPlan === "free" ? 2 : userPlan === "individual" ? 8 : 23,
    lessonsThisMonth: userPlan === "free" ? 3 : 47,
    observationsThisMonth: userPlan === "free" ? 15 : 89,
    complianceScore: userPlan === "free" ? 0 : 94,
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome to KatoSuite! 🎉</h1>
        <p className="text-blue-100">Your complete Early Childhood Education management platform with 65+ professional tools.</p>
        {userPlan === "free" && (
          <div className="mt-4 p-3 bg-white/10 rounded border-l-4 border-yellow-300">
            <p className="text-sm">
              <span className="font-semibold">Free Starter Plan:</span> Unlock unlimited features with an upgrade!
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Child Profiles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.childrenCount}</div>
            <p className="text-xs text-muted-foreground">
              {limits.children === null ? "Unlimited" : `of ${limits.children} limit`}
            </p>
            {typeof limits.children === "number" && (
              <Progress value={(stats.childrenCount / limits.children) * 100} className="mt-2 h-2" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Lesson Plans</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lessonsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              {userPlan === "free" ? `${stats.lessonsThisMonth}/5 this month` : "Unlimited"}
            </p>
            {userPlan === "free" && <Progress value={(stats.lessonsThisMonth / 5) * 100} className="mt-2 h-2" />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Observations</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.observationsThisMonth}</div>
           <p className="text-xs text-muted-foreground">
              {limits.observations === null ? "Unlimited" : `of ${limits.observations} limit`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userPlan === "free" ? "—" : `${stats.complianceScore}%`}</div>
            <p className="text-xs text-muted-foreground">
              {userPlan === "free" ? "Upgrade for compliance tracking" : "Excellent!"}
            </p>
            {userPlan !== "free" && <Progress value={stats.complianceScore} className="mt-2 h-2" />}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Lesson plan created</p>
                  <p className="text-xs text-gray-500">Math Activities - Age 4-5</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Child observation added</p>
                  <p className="text-xs text-gray-500">Emma S. - Social interaction</p>
                  <p className="text-xs text-gray-400">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Parent message sent</p>
                  <p className="text-xs text-gray-500">Daily update to 3 families</p>
                  <p className="text-xs text-gray-400">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                <BookOpen className="w-6 h-6" />
                <span className="text-sm">Create Lesson</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline">
                <Users className="w-6 h-6" />
                <span className="text-sm">Add Child</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline">
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm">Message Parents</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-2" variant="outline" disabled={userPlan === "free"}>
                <Shield className="w-6 h-6" />
                <span className="text-sm">Compliance Check</span>
                {userPlan === "free" && <Badge variant="outline" className="text-xs">PRO</Badge>}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {userPlan !== "free" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Framework Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-green-800">HDLH Compliance</h3>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-green-700">All requirements met</p>
                <Progress value={100} className="mt-2 h-2" />
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-green-800">Flight Framework</h3>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-green-700">98% compliant</p>
                <Progress value={98} className="mt-2 h-2" />
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-yellow-800">ELOF Standards</h3>
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-sm text-yellow-700">2 items need attention</p>
                <Progress value={85} className="mt-2 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
