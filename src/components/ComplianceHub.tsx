import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import {
  AlertTriangle,
  Bell,
  Building,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Heart,
  Settings,
  Shield,
  Users,
} from "lucide-react";

interface ComplianceHubProps {
  userPlan: string;
}

type ComplianceCategory = {
  id: "staff" | "financial" | "health" | "environmental";
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  score: number;
  color: string;
  items: string[];
};

type ComplianceActivity = {
  type: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  date: string;
};

const getPriorityColor = (priority: ComplianceActivity["priority"]): string => {
  switch (priority) {
    case "high":
      return "text-red-600 bg-red-50 border-red-200";
    case "medium":
      return "text-orange-600 bg-orange-50 border-orange-200";
    default:
      return "text-green-600 bg-green-50 border-green-200";
  }
};

const complianceCategories: ComplianceCategory[] = [
  {
    id: "staff",
    title: "Staff Management",
    icon: Users,
    score: 96,
    color: "bg-blue-500",
    items: [
      "Staff Credential Manager",
      "Training Hours Tracker",
      "Substitute Teacher Database",
      "Staff-to-Child Ratio Monitor",
    ],
  },
  {
    id: "financial",
    title: "Financial Compliance",
    icon: DollarSign,
    score: 92,
    color: "bg-green-500",
    items: [
      "Subsidy Management System",
      "Budget Transparency Portal",
      "Parent Fee Calculator",
      "Grant Application Assistant",
    ],
  },
  {
    id: "health",
    title: "Health & Safety",
    icon: Heart,
    score: 95,
    color: "bg-red-500",
    items: [
      "Incident Report System",
      "Medical Alert Manager",
      "Daily Health Checks",
      "Emergency Protocol Hub",
    ],
  },
  {
    id: "environmental",
    title: "Environmental & Facility",
    icon: Building,
    score: 91,
    color: "bg-purple-500",
    items: [
      "Space Compliance Checker",
      "Equipment Safety Tracker",
      "Cleaning Protocol Manager",
      "Facility Inspection Logs",
    ],
  },
];

const recentActivity: ComplianceActivity[] = [
  {
    type: "staff",
    title: "Credential Renewal Due",
    description: "Sarah Johnson's First Aid certification expires in 30 days",
    priority: "medium",
    date: "2024-01-10",
  },
  {
    type: "financial",
    title: "CWELCC Report Submitted",
    description: "Monthly subsidy report successfully submitted to government",
    priority: "low",
    date: "2024-01-09",
  },
  {
    type: "health",
    title: "New Medical Alert",
    description: "Emma T. - Updated allergy information received from parents",
    priority: "high",
    date: "2024-01-08",
  },
  {
    type: "environmental",
    title: "Equipment Inspection Completed",
    description: "Playground equipment safety inspection passed with minor notes",
    priority: "low",
    date: "2024-01-07",
  },
];

const ComplianceHub: React.FC<ComplianceHubProps> = ({ userPlan }) => {
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  const complianceData = {
    overallScore: 94,
    staffCompliance: {
      score: 96,
      totalStaff: 8,
      credentialsExpiring: 2,
      trainingHours: 42,
      requiredHours: 40,
    },
    financialCompliance: {
      score: 92,
      subsidyApplications: 15,
      budgetTransparency: 98,
      feeCompliance: 100,
      cwelccCompliant: true,
    },
    healthSafety: {
      score: 95,
      incidentReports: 2,
      healthChecks: 156,
      emergencyDrills: 4,
      medicalAlerts: 3,
    },
    environmental: {
      score: 91,
      spaceCompliance: 89,
      equipmentSafety: 94,
      cleaningProtocols: 97,
      inspectionsDue: 1,
    },
  };

  if (userPlan === "free") {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 space-y-6">
          <Shield className="w-16 h-16 text-gray-300 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">KatoCompliance Hub</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access comprehensive compliance management tools including staff tracking, financial compliance, health &
              safety protocols, and environmental monitoring.
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg max-w-md mx-auto space-y-4">
            <h3 className="text-lg font-semibold">15+ Compliance Tools Available</h3>
            <ul className="text-sm text-left space-y-1">
              <li>• Staff Credential Management</li>
              <li>• Financial Compliance Tracking</li>
              <li>• Health & Safety Protocols</li>
              <li>• Environmental Monitoring</li>
              <li>• Government Reporting</li>
            </ul>
            <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Upgrade to Access Compliance Hub</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Shield className="w-7 h-7 mr-3 text-blue-600" />
            KatoCompliance Hub
          </h1>
          <p className="text-gray-600 mt-1">Comprehensive compliance management with 15+ professional tools</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant={complianceData.overallScore >= 95 ? "default" : "secondary"}>
            Overall Score: {complianceData.overallScore}%
          </Badge>
          <Button className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Compliance Dashboard</span>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              Last updated: Today, 2:30 PM
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="relative overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Icon className="w-6 h-6 text-gray-600" />
                      <Badge variant={category.score >= 95 ? "default" : "secondary"}>{category.score}%</Badge>
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <Progress value={category.score} className="h-2" />
                    <div className="space-y-1 text-xs text-gray-600">
                      {category.items.slice(0, 2).map((item) => (
                        <p key={item}>• {item}</p>
                      ))}
                      <p className="text-gray-500">+{category.items.length - 2} more tools</p>
                    </div>
                  </CardContent>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${category.color}`} style={{ opacity: category.score / 100 }} />
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="staff" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="staff" className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Staff
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Financial
              </TabsTrigger>
              <TabsTrigger value="health" className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Health & Safety
              </TabsTrigger>
              <TabsTrigger value="environmental" className="flex items-center">
                <Building className="w-4 h-4 mr-2" />
                Environmental
              </TabsTrigger>
            </TabsList>

            <TabsContent value="staff" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Staff Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Total Staff</span>
                      <span className="font-semibold">{complianceData.staffCompliance.totalStaff}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Credentials Expiring</span>
                      <Badge variant="destructive">{complianceData.staffCompliance.credentialsExpiring}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Training Hours</span>
                      <span className="font-semibold">
                        {complianceData.staffCompliance.trainingHours}/{complianceData.staffCompliance.requiredHours}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Recent Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Background check completed
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                      First Aid renewal due
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-blue-600 mr-2" />
                      Training scheduled
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure Workflows
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      Schedule Training
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Set Reminders
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      CWELCC Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Max $10/day fee compliance</span>
                      <Badge variant="default">100%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Subsidy applications processed</span>
                      <span className="font-semibold">{complianceData.financialCompliance.subsidyApplications}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Budget transparency</span>
                      <span className="font-semibold">{complianceData.financialCompliance.budgetTransparency}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Financial Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Monthly Subsidy Report",
                      "Budget Transparency Report",
                      "Fee Compliance Summary",
                    ].map((report) => (
                      <Button key={report} variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        {report}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="health" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-red-700">Medical Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        3 children with severe allergies require EpiPens
                      </AlertDescription>
                    </Alert>
                    <div className="text-sm text-gray-600">Last updated: Today</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Health Checks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between items-center">
                      <span>Today's checks</span>
                      <Badge variant="default">23/23</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This month</span>
                      <span className="font-semibold">{complianceData.healthSafety.healthChecks}</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Emergency Preparedness</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Fire drill completed (Jan 5)
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Lockdown drill completed (Dec 15)
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-blue-600 mr-2" />
                      Next drill: Feb 1
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="environmental" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Facility Compliance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-gray-600">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Space per child requirement</span>
                        <span className="font-semibold">{complianceData.environmental.spaceCompliance}%</span>
                      </div>
                      <Progress value={complianceData.environmental.spaceCompliance} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Equipment safety</span>
                        <span className="font-semibold">{complianceData.environmental.equipmentSafety}%</span>
                      </div>
                      <Progress value={complianceData.environmental.equipmentSafety} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Cleaning protocols</span>
                        <span className="font-semibold">{complianceData.environmental.cleaningProtocols}%</span>
                      </div>
                      <Progress value={complianceData.environmental.cleaningProtocols} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Inspection Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <span className="text-sm">Fire safety inspection</span>
                      <Badge variant="outline">Due Jan 25</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Playground equipment</span>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <span className="text-sm">Kitchen sanitation</span>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Recent Compliance Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.title} className={`p-3 border rounded-lg ${getPriorityColor(activity.priority)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">{activity.date}</span>
                    <Badge variant="outline" className="text-xs ml-2">
                      {activity.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceHub;
export { ComplianceHub };
