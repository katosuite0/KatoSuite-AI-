import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Shield,
  MessageSquare,
  CreditCard,
  BarChart3,
  Calendar,
} from "lucide-react";

export interface NavigationProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  userPlan?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  available: boolean;
  badge?: string;
  premium?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection = "dashboard",
  setActiveSection,
  userPlan = "free",
}) => {
  const navigationItems: NavigationItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      available: true,
    },
    {
      id: "lessons",
      label: "AI Lesson Planner",
      icon: BookOpen,
      available: true,
      badge: userPlan === "free" ? "5/month" : "Unlimited",
    },
    {
      id: "children",
      label: "Child Profiles",
      icon: Users,
      available: true,
      badge:
        userPlan === "free"
          ? "3 profiles"
          : userPlan === "individual"
          ? "15 profiles"
          : userPlan === "small"
          ? "35 profiles"
          : "75+ profiles",
    },
    {
      id: "compliance",
      label: "KatoCompliance Hub",
      icon: Shield,
      available: userPlan !== "free",
      premium: userPlan === "free",
    },
    {
      id: "parents",
      label: "Parent Portal",
      icon: MessageSquare,
      available: true,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      available: ["small", "professional", "multisite", "enterprise"].includes(userPlan),
      premium: !["small", "professional", "multisite", "enterprise"].includes(userPlan),
    },
    {
      id: "calendar",
      label: "Calendar Planner",
      icon: Calendar,
      available: userPlan !== "free",
      premium: userPlan === "free",
    },
    {
      id: "pricing",
      label: "Pricing Plans",
      icon: CreditCard,
      available: true,
    },
  ];

  return (
    <nav className="w-64 bg-white shadow-lg h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center p-1">
            <img
              src="https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/03f4745f-0569-4c0e-8f57-9e979acad9dd-O7oTSKJ64pCCuQ9F16v8ZxSX55trOM"
              alt="KatoSuite Logo"
              className="w-6 h-6 brightness-0 invert"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">KatoSuite</h2>
            <p className="text-xs text-gray-500">ECE Platform</p>
          </div>
        </div>

        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isDisabled = !item.available;

            const handleClick = () => {
              if (!isDisabled) {
                setActiveSection?.(item.id);
              }
            };

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={handleClick}
                disabled={isDisabled}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs ml-2">
                    {item.badge}
                  </Badge>
                )}
                {item.premium && (
                  <Badge variant="outline" className="text-xs ml-2 text-orange-600 border-orange-600">
                    PRO
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Current Plan</h3>
          <p className="text-sm text-gray-600 capitalize mb-3">
            {userPlan === "free"
              ? "Free Starter"
              : userPlan === "individual"
              ? "Individual Educator"
              : userPlan === "small"
              ? "Small Center"
              : userPlan === "professional"
              ? "Professional Center"
              : "Free Starter"}
          </p>
          {userPlan === "free" && (
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              onClick={() => setActiveSection?.("pricing")}
            >
              Upgrade Now
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
