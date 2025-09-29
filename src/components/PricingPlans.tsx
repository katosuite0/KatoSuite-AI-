import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Building,
  CheckCircle,
  Crown,
  Globe,
  Star,
  Users,
  Zap,
} from "lucide-react";

interface PricingPlansProps {
  onPlanSelect: (plan: string) => void;
  currentPlan: string;
}

type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  limits: {
    children: string;
    users: string;
    features: string;
  };
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  buttonColor: string;
  popular: boolean;
  target: string;
};

const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free Starter",
    price: "$0",
    period: "/month",
    description: "Perfect for individual educators and students",
    features: [
      "AI Lesson Plan Generator (5 plans/month)",
      "Child Development Profiles (3 children)",
      "Parent Communication Portal (basic)",
      "Professional Worksheets (25/month)",
      "Framework Compliance (HDLH, Flight, ELOF)",
      "Mobile app access",
      "Community support only",
    ],
    limits: {
      children: "3 profiles",
      users: "1 user account",
      features: "Basic features",
    },
    icon: Users,
    color: "bg-gray-100",
    buttonColor: "bg-gray-600",
    popular: false,
    target: "Student teachers, Parents homeschooling, New educators",
  },
  {
    id: "individual",
    name: "Individual Educator",
    price: "$19.99",
    period: "/month",
    description: "Everything in Free PLUS unlimited AI lesson plans",
    features: [
      "Unlimited AI lesson plans",
      "Observations Hub (100/month)",
      "Voice AI lesson planning",
      "Educational Calendar Planner",
      "Compliance reports (basic)",
      "Email support (48hr response)",
      "Remove KatoSuite branding",
    ],
    limits: {
      children: "15 profiles",
      users: "1 user account",
      features: "Enhanced features",
    },
    icon: Star,
    color: "bg-blue-50",
    buttonColor: "bg-blue-600",
    popular: true,
    target: "Individual ECE teachers, Home daycare providers",
  },
  {
    id: "small",
    name: "Small Center",
    price: "$39.99",
    period: "/month",
    description: "Everything in Individual PLUS multi-user collaboration",
    features: [
      "Advanced Analytics Dashboard",
      "Staff-to-Child Ratio Calculator",
      "Multi-user collaboration",
      "Parent Portal upgrade",
      "KatoCompliance Hub (Basic)",
      "Staff credential tracking",
      "Basic incident reports",
      "Priority email support (24hr)",
    ],
    limits: {
      children: "35 profiles",
      users: "3 staff accounts",
      features: "Advanced features",
    },
    icon: Building,
    color: "bg-purple-50",
    buttonColor: "bg-purple-600",
    popular: false,
    target: "Small daycare centers, Preschool classrooms",
  },
  {
    id: "professional",
    name: "Professional Center",
    price: "$69.99",
    period: "/month",
    description: "Everything in Small Center PLUS advanced compliance",
    features: [
      "Advanced Forms System",
      "Educational Marketplace (creator access)",
      "KatoCompliance Hub (Professional)",
      "Financial compliance tracking",
      "Subsidy management (CWELCC)",
      "Environmental safety logs",
      "Emergency protocols",
      "Phone support (business hours)",
    ],
    limits: {
      children: "75 profiles",
      users: "8 staff accounts",
      features: "Professional features",
    },
    icon: Crown,
    color: "bg-orange-50",
    buttonColor: "bg-orange-600",
    popular: false,
    target: "Medium daycare centers, Montessori schools",
  },
  {
    id: "multisite",
    name: "Multi-Site",
    price: "$129.99",
    period: "/month",
    description: "Everything in Professional PLUS multi-location management",
    features: [
      "Multi-location management (up to 3 sites)",
      "Advanced reporting suite",
      "KatoCompliance Hub (Advanced)",
      "Nutrition program management",
      "Staff training compliance",
      "Budget transparency reporting",
      "Custom integrations (QuickBooks)",
      "Dedicated customer success manager",
    ],
    limits: {
      children: "150 profiles",
      users: "15 staff accounts",
      features: "Multi-site features",
    },
    icon: Globe,
    color: "bg-green-50",
    buttonColor: "bg-green-600",
    popular: false,
    target: "Multi-site daycare chains, School districts",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$199.99",
    period: "/month",
    description: "Everything in Multi-Site PLUS unlimited locations",
    features: [
      "Unlimited locations",
      "Advanced AI analytics",
      "KatoCompliance Hub (Enterprise)",
      "Full regulatory compliance suite",
      "Government reporting automation",
      "Risk management tools",
      "White-glove onboarding",
      "Priority phone support (24/7)",
      "Service Level Agreement (SLA)",
    ],
    limits: {
      children: "300 profiles",
      users: "25 staff accounts",
      features: "Enterprise features",
    },
    icon: Zap,
    color: "bg-indigo-50",
    buttonColor: "bg-indigo-600",
    popular: false,
    target: "Large childcare corporations, Government centers",
  },
];

const PricingPlans: React.FC<PricingPlansProps> = ({ onPlanSelect, currentPlan }) => (
  <div className="space-y-8">
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">Choose Your KatoSuite Plan</h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        From individual educators to enterprise organizations - find the perfect plan for your Early Childhood
        Education needs with our 8-tier pricing structure.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pricingPlans.map((plan) => {
        const Icon = plan.icon;
        const isCurrentPlan = currentPlan === plan.id;
        const iconColor = plan.buttonColor.replace("bg-", "text-");

        return (
          <Card
            key={plan.id}
            className={`relative ${plan.color} border-2 ${plan.popular ? "border-blue-500 shadow-lg" : "border-gray-200"} ${
              isCurrentPlan ? "ring-2 ring-green-500" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-3 py-1">Most Popular</Badge>
              </div>
            )}

            {isCurrentPlan && (
              <div className="absolute -top-3 right-4">
                <Badge className="bg-green-600 text-white px-3 py-1">Current Plan</Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-lg bg-white shadow-sm flex items-center justify-center">
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-white p-3 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Child Profiles:</span>
                  <span className="font-semibold text-gray-900">{plan.limits.children}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Staff Accounts:</span>
                  <span className="font-semibold text-gray-900">{plan.limits.users}</span>
                </div>
              </div>

              <div className="space-y-2">
                {plan.features.slice(0, 4).map((feature) => (
                  <div key={feature} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
                {plan.features.length > 4 && (
                  <p className="text-sm text-gray-500 ml-6">+{plan.features.length - 4} more features</p>
                )}
              </div>

              <Separator />

              <div className="text-xs text-gray-500">
                <span className="font-semibold">Perfect For:</span> {plan.target}
              </div>

              <Button
                className={`w-full ${plan.buttonColor} text-white hover:opacity-90`}
                onClick={() => onPlanSelect(plan.id)}
                disabled={isCurrentPlan}
              >
                {isCurrentPlan ? "Current Plan" : plan.id === "free" ? "Start Free" : "Upgrade Now"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>

    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg text-center space-y-4">
      <h3 className="text-xl font-bold">Need Something Different?</h3>
      <p>We also offer À La Carte Pro and District/Government plans for specialized needs.</p>
      <Button variant="outline" className="text-blue-600 bg-white hover:bg-gray-100">
        Contact Sales for Custom Plans
      </Button>
    </div>

    <div className="bg-white p-6 rounded-lg border space-y-6">
      <h3 className="text-xl font-bold text-center">What's Included Across All Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
            <Star className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold">65+ Professional Tools</h4>
          <p className="text-sm text-gray-600">
            Complete suite of ECE management tools from lesson planning to compliance tracking.
          </p>
        </div>

        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-semibold">AI-Powered Platform</h4>
          <p className="text-sm text-gray-600">
            Advanced AI assistance for lesson planning, observations, and compliance management.
          </p>
        </div>

        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-semibold">Framework Compliance</h4>
          <p className="text-sm text-gray-600">Built-in compliance for HDLH, Flight, ELOF, and Accueillir frameworks.</p>
        </div>
      </div>
    </div>
  </div>
);

export default PricingPlans;
