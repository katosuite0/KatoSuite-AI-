"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Shield, Wallet, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth, type AuthPlan, type AuthRole } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AuthenticationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthenticationModal({
  isOpen,
  onClose,
}: AuthenticationModalProps): JSX.Element {
  const {
    isLoading,
    isAuthenticated,
    user,
    login,
    logout,
    completeOnboarding,
    createWallet,
    hasCompletedOnboarding,
    error,
  } = useAuth();

  const [onboardingData, setOnboardingData] = useState({
    name: "",
    role: "" as AuthRole,
    plan: "" as AuthPlan,
    centerName: "",
  });

  const [currentStep, setCurrentStep] = useState<"login" | "onboarding" | "complete">("login");

  useEffect(() => {
    if (isAuthenticated && hasCompletedOnboarding) {
      setCurrentStep("complete");
    } else if (isAuthenticated && !hasCompletedOnboarding) {
      setCurrentStep("onboarding");
    } else {
      setCurrentStep("login");
    }
  }, [isAuthenticated, hasCompletedOnboarding]);

  const handleLogin = () => {
    login();
  };

  const handleCompleteOnboarding = async () => {
    if (!onboardingData.name || !onboardingData.role || !onboardingData.plan) {
      return;
    }

    await completeOnboarding({
      name: onboardingData.name,
      role: onboardingData.role,
      plan: onboardingData.plan,
      centerName: onboardingData.centerName || undefined,
    });

    setCurrentStep("complete");
  };

  const handleCreateWallet = async () => {
    await createWallet();
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const renderLoginStep = (): JSX.Element => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <img
            src="https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/03f4745f-0569-4c0e-8f57-9e979acad9dd-O7oTSKJ64pCCuQ9F16v8ZxSX55trOM"
            alt="KatoSuite Logo"
            className="w-8 h-8"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to KatoSuite</h2>
        <p className="text-gray-600">Secure access to your Early Childhood Education management platform</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5" />
            Secure Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-600">
          <p>KatoSuite uses privacy-first authentication. You can sign in with:</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" /> Email address
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" /> Google account
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" /> Apple ID
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" /> Crypto wallet (optional)
            </li>
          </ul>
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Sign In / Create Account"
            )}
          </Button>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-gray-500">
        By signing in, you agree to our Terms of Service and Privacy Policy. Your data is protected with end-to-end encryption.
      </p>
    </div>
  );

  const renderOnboardingStep = (): JSX.Element => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
        <p className="text-gray-600">Tell us about yourself to get started with KatoSuite</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={onboardingData.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setOnboardingData((previous) => ({ ...previous, name: event.target.value }))
            }
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            value={onboardingData.role}
            onValueChange={(value) =>
              setOnboardingData((previous) => ({ ...previous, role: value as AuthRole }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="educator">Educator/Teacher</SelectItem>
              <SelectItem value="administrator">Administrator/Director</SelectItem>
              <SelectItem value="parent">Parent/Guardian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="plan">Subscription Plan</Label>
          <Select
            value={onboardingData.plan}
            onValueChange={(value) =>
              setOnboardingData((previous) => ({ ...previous, plan: value as AuthPlan }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose your plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">
                <div className="flex flex-col">
                  <span>Free Starter</span>
                  <span className="text-xs text-gray-500">Basic features</span>
                </div>
              </SelectItem>
              <SelectItem value="individual">
                <div className="flex flex-col">
                  <span>Individual Educator - $29/mo</span>
                  <span className="text-xs text-gray-500">AI lessons, unlimited children</span>
                </div>
              </SelectItem>
              <SelectItem value="small">
                <div className="flex flex-col">
                  <span>Small Center - $99/mo</span>
                  <span className="text-xs text-gray-500">Up to 50 children, compliance</span>
                </div>
              </SelectItem>
              <SelectItem value="professional">
                <div className="flex flex-col">
                  <span>Professional Center - $199/mo</span>
                  <span className="text-xs text-gray-500">Up to 150 children, automation</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(onboardingData.role === "administrator" || onboardingData.role === "educator") && (
          <div>
            <Label htmlFor="centerName">Center/School Name (Optional)</Label>
            <Input
              id="centerName"
              value={onboardingData.centerName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setOnboardingData((previous) => ({ ...previous, centerName: event.target.value }))
              }
              placeholder="Enter your center or school name"
            />
          </div>
        )}
      </div>

      <Button
        onClick={handleCompleteOnboarding}
        disabled={
          isLoading || !onboardingData.name || !onboardingData.role || !onboardingData.plan
        }
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Setting up your account...
          </>
        ) : (
          "Complete Setup"
        )}
      </Button>
    </div>
  );

  const renderCompleteStep = (): JSX.Element => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h2>
        <p className="text-gray-600">Your KatoSuite account is ready to use</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span>Role:</span>
            <Badge variant="secondary">{user?.role}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Plan:</span>
            <Badge variant="outline">{user?.plan}</Badge>
          </div>
          {user?.centerName && (
            <div className="flex items-center justify-between">
              <span>Center:</span>
              <span className="text-sm text-gray-800">{user.centerName}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Wallet:</span>
            <div className="flex items-center gap-2">
              {user?.hasWallet ? (
                <Badge variant="outline" className="text-green-600">
                  <Wallet className="mr-1 h-3 w-3" /> Connected
                </Badge>
              ) : (
                <Button variant="outline" size="sm" onClick={handleCreateWallet} disabled={isLoading}>
                  <Wallet className="mr-1 h-3 w-3" /> Create Wallet
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button className="flex-1" onClick={onClose}>
          Continue to KatoSuite
        </Button>
        <Button variant="outline" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case "login":
        return renderLoginStep();
      case "onboarding":
        return renderOnboardingStep();
      case "complete":
        return renderCompleteStep();
      default:
        return renderLoginStep();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">
            {currentStep === "login"
              ? "Sign In"
              : currentStep === "onboarding"
              ? "Complete Profile"
              : "Account Ready"}
          </DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
