"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Mail, Lock, Eye, EyeOff, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";

const loginBenefits = [
  "Access to AI lesson planning",
  "Child development tracking",
  "Parent communication portal",
  "Compliance management tools",
  "Real-time data synchronization",
];

export default function LoginPage(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { login, ready } = useAuth();

  const handleInputChange = (field: "email" | "password", value: string) => {
    setCredentials((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login attempt:", credentials, { rememberMe });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivyLogin = () => {
    if (ready) {
      login();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <section className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <img
                  src="https://ucarecdn.com/a1a0352a-bb45-4b8b-8ca8-db2c8dd0fcb1/"
                  alt="KatoSuite Logo"
                  className="w-16 h-16 mr-4"
                />
                <h1 className="text-4xl font-bold text-gray-900">Welcome Back</h1>
              </div>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Sign in to your KatoSuite account and continue transforming Early Childhood Education with our comprehensive
                platform.
              </p>

              <ul className="space-y-4 mb-8">
                {loginBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Badge variant="secondary" className="px-4 py-2">
                  2,500+ Centers Trust Us
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  SOC 2 Certified
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  99.9% Uptime
                </Badge>
              </div>
            </section>

            <section className="max-w-md mx-auto w-full">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Sign In</CardTitle>
                  <CardDescription>Access your KatoSuite ECE management dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Button
                      onClick={handlePrivyLogin}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      size="lg"
                      disabled={!ready}
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      Sign In with Secure Authentication
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Supports email, Google, Apple ID, and crypto wallets
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Separator className="flex-1" />
                    <span className="text-sm text-gray-500">or</span>
                    <Separator className="flex-1" />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={credentials.email}
                          onChange={(event) => handleInputChange("email", event.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={credentials.password}
                          onChange={(event) => handleInputChange("password", event.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((previous) => !previous)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 text-sm text-gray-700">
                        <Checkbox id="remember" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
                        <span>Remember me</span>
                      </label>

                      <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                        Forgot password?
                      </Link>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>

                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-600">
                      Don&apos;t have an account?{" "}
                      <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                        Sign up for free
                      </Link>
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">Enterprise-Grade Security</h4>
                        <p className="text-xs text-blue-700 mt-1">
                          Your data is protected with SOC 2 Type II compliance, end-to-end encryption, and multi-factor
                          authentication.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 text-center space-y-2">
                <p className="text-sm text-gray-500">Need help? Contact our support team</p>
                <div className="space-x-4 text-sm">
                  <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                    Contact Support
                  </Link>
                  <Link href="/help" className="text-blue-600 hover:text-blue-700">
                    Help Center
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
