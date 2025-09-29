"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import Navigation from "./Navigation";
import PricingPlans from "./PricingPlans";
import Dashboard from "./Dashboard";
import LessonPlanner from "./LessonPlanner";
import ChildProfiles from "./ChildProfiles";
import ComplianceHub from "./ComplianceHub";
import ParentPortal from "./ParentPortal";
import AuthenticationModal from "./AuthenticationModal";
import { useAuth } from "../hooks/useAuth";
import { useSpacetimeDB } from "../hooks/useSpacetimeDB";
import { sdk } from "../lib/farcaster";
import { AlertCircle, LogIn, User } from "lucide-react";

const logoUrl =
  "https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/03f4745f-0569-4c0e-8f57-9e979acad9dd-O7oTSKJ64pCCuQ9F16v8ZxSX55trOM";

const planLabels: Record<string, string> = {
  free: "Free Starter",
  individual: "Individual Educator",
  small: "Small Center",
  professional: "Professional Center",
  enterprise: "Enterprise",
};

const getPlanLabel = (plan: string): string => planLabels[plan] ?? planLabels.free;

const KatoSuite: React.FC = () => {
  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        if (typeof window === "undefined") {
          console.log("SSR environment - skipping Farcaster initialization");
          return;
        }

        if (typeof sdk === "undefined" || !sdk?.actions?.ready) {
          console.log("Farcaster SDK not available - running in web mode");
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 100));

        if (typeof document !== "undefined" && document.readyState !== "complete") {
          await new Promise<void>((resolve) => {
            if (document.readyState === "complete") {
              resolve();
            } else {
              window.addEventListener("load", () => resolve(), { once: true });
            }
          });
        }

        await sdk.actions.ready();
        console.log("Farcaster SDK initialized successfully");
      } catch (error) {
        console.warn(
          "Farcaster SDK initialization failed (this is normal outside of Farcaster):",
          error,
        );
      }
    };

    const timeoutId = setTimeout(() => {
      void initializeFarcaster();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const { isLoading: authLoading, isAuthenticated, user, login } = useAuth();

  const { connected: dbConnected, statusMessage } = useSpacetimeDB();

  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  const userPlan = user?.plan ?? "free";

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setShowAuthModal(true);
    } else if (isAuthenticated) {
      setShowAuthModal(false);
    }
  }, [authLoading, isAuthenticated]);

  const renderActiveSection = (): React.ReactElement => {
    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center h-96">
          <Card className="w-96">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Authentication Required</h3>
                <p className="text-gray-600">Please sign in to access KatoSuite features.</p>
              </div>
              <Button onClick={() => setShowAuthModal(true)}>Sign In</Button>
              <Button variant="outline" onClick={login}>
                Demo Login
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    try {
      if (renderError) setRenderError(null);

      switch (activeSection) {
        case "dashboard":
          return <Dashboard userPlan={userPlan} />;
        case "lessons":
          return <LessonPlanner userPlan={userPlan} />;
        case "children":
          return <ChildProfiles userPlan={userPlan} />;
        case "compliance":
          return <ComplianceHub userPlan={userPlan} />;
        case "parents":
          return <ParentPortal userPlan={userPlan} />;
        case "pricing":
          return <PricingPlans onPlanSelect={() => {}} currentPlan={userPlan} />;
        default:
          return <Dashboard userPlan={userPlan} />;
      }
    } catch (error) {
      console.error("Error rendering section:", error);
      setRenderError(error instanceof Error ? error.message : "Unknown rendering error");
      return (
        <div className="flex items-center justify-center h-96">
          <Card className="w-96">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Section Error</h3>
                <p className="text-gray-600">Unable to load this section. Please try again.</p>
              </div>
              <Button onClick={() => setActiveSection("dashboard")}>Return to Dashboard</Button>
            </CardContent>
          </Card>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                <img src={logoUrl} alt="KatoSuite Logo" className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">KatoSuite</h1>
                <p className="text-blue-100 text-sm">Complete ECE Management Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${dbConnected ? "bg-green-400" : "bg-yellow-400"}`} />
                <span className="text-sm text-blue-100">
                  {dbConnected ? "Connected" : "Connecting..."}
                </span>
              </div>
              {isAuthenticated && (
                <>
                  <Badge variant="outline" className="text-white border-white">
                    {getPlanLabel(userPlan)}
                  </Badge>
                  <div className="flex items-center space-x-2 text-blue-100">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{user?.name}</span>
                  </div>
                </>
              )}
              {!isAuthenticated ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white"
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white"
                  onClick={() => setActiveSection("pricing")}
                >
                  Upgrade Plan
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} userPlan={userPlan} />
        <main className="flex-1 p-6 bg-gray-50 min-h-full">
          {authLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                  <img src={logoUrl} alt="KatoSuite Logo" className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Loading KatoSuite</h3>
                <p className="text-gray-600">{statusMessage}</p>
              </div>
            </div>
          ) : (
            renderActiveSection()
          )}
        </main>
      </div>

      <AuthenticationModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default KatoSuite;
