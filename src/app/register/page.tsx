"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import {
  User,
  Mail,
  Lock,
  Building,
  Shield,
  CheckCircle,
  Award,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";

const registrationBenefits = [
  "Start with our Free Starter plan",
  "30-day free trial on paid plans",
  "Access to AI lesson planning",
  "Basic compliance tools included",
  "Parent communication portal",
  "Mobile app for parents and staff",
];

const trustIndicators = [
  { icon: Shield, label: "SOC 2 Certified", color: "text-green-600" },
  { icon: CheckCircle, label: "99.9% Uptime", color: "text-purple-600" },
  { icon: Award, label: "NAEYC Partner", color: "text-amber-600" },
  { icon: User, label: "2,500+ Centers", color: "text-blue-600" },
];

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  organization: string;
  role: string;
  organizationType: string;
  childrenCount: string;
  staffCount: string;
}

export default function RegisterPage(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    role: "",
    organizationType: "",
    childrenCount: "",
    staffCount: "",
  });

  const { login, ready } = useAuth();

  const handleInputChange = (field: keyof RegistrationForm, value: string) => {
    setRegistrationData((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!agreedToTerms) {
      window.alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    if (registrationData.password !== registrationData.confirmPassword) {
      window.alert("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Registration attempt:", registrationData);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivyRegister = () => {
    if (ready) {
      login();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[80vh] py-8">
            <section className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <img
                  src="https://ucarecdn.com/a1a0352a-bb45-4b8b-8ca8-db2c8dd0fcb1/"
                  alt="KatoSuite Logo"
                  className="w-16 h-16 mr-4"
                />
                <h1 className="text-4xl font-bold text-gray-900">Join KatoSuite</h1>
              </div>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your Early Childhood Education program with our comprehensive platform trusted by thousands of
                educators worldwide.
              </p>

              <ul className="space-y-4 mb-8">
                {registrationBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {trustIndicators.map(({ icon: IconComponent, label, color }) => (
                  <div key={label} className="flex items-center gap-2 p-3 bg-white rounded-lg border">
                    <IconComponent className={`h-5 w-5 ${color}`} />
                    <span className="text-sm font-medium text-gray-800">{label}</span>
                  </div>
                ))}
              </div>

              <Badge variant="secondary" className="px-6 py-2 text-lg inline-flex items-center">
                <Award className="h-4 w-4 mr-2" />
                NAEYC Technology Partner 2024
              </Badge>
            </section>

            <section className="max-w-md mx-auto w-full">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Create Account</CardTitle>
                  <CardDescription>Start your journey with KatoSuite today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Button
                      onClick={handlePrivyRegister}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      size="lg"
                      disabled={!ready}
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      Sign Up with Secure Authentication
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Quick signup with email, Google, Apple ID, or crypto wallets
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Separator className="flex-1" />
                    <span className="text-sm text-gray-500">or</span>
                    <Separator className="flex-1" />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="firstName"
                            placeholder="First name"
                            value={registrationData.firstName}
                            onChange={(event) => handleInputChange("firstName", event.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Last name"
                          value={registrationData.lastName}
                          onChange={(event) => handleInputChange("lastName", event.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={registrationData.email}
                          onChange={(event) => handleInputChange("email", event.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="organization"
                          placeholder="Your center or organization"
                          value={registrationData.organization}
                          onChange={(event) => handleInputChange("organization", event.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="organizationType">Organization Type</Label>
                        <Select
                          value={registrationData.organizationType}
                          onValueChange={(value) => handleInputChange("organizationType", value)}
                        >
                          <SelectTrigger id="organizationType">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daycare">Daycare Center</SelectItem>
                            <SelectItem value="preschool">Preschool</SelectItem>
                            <SelectItem value="headstart">Head Start</SelectItem>
                            <SelectItem value="family">Family Daycare</SelectItem>
                            <SelectItem value="nonprofit">Non-Profit</SelectItem>
                            <SelectItem value="government">Government/District</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="role">Your Role</Label>
                        <Select value={registrationData.role} onValueChange={(value) => handleInputChange("role", value)}>
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="educator">Educator/Teacher</SelectItem>
                            <SelectItem value="director">Director/Administrator</SelectItem>
                            <SelectItem value="owner">Owner/Founder</SelectItem>
                            <SelectItem value="coordinator">Program Coordinator</SelectItem>
                            <SelectItem value="assistant">Assistant Teacher</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="childrenCount">Number of Children</Label>
                        <Select
                          value={registrationData.childrenCount}
                          onValueChange={(value) => handleInputChange("childrenCount", value)}
                        >
                          <SelectTrigger id="childrenCount">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10</SelectItem>
                            <SelectItem value="11-25">11-25</SelectItem>
                            <SelectItem value="26-50">26-50</SelectItem>
                            <SelectItem value="51-100">51-100</SelectItem>
                            <SelectItem value="101-200">101-200</SelectItem>
                            <SelectItem value="200+">200+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="staffCount">Number of Staff</Label>
                        <Select
                          value={registrationData.staffCount}
                          onValueChange={(value) => handleInputChange("staffCount", value)}
                        >
                          <SelectTrigger id="staffCount">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Just me</SelectItem>
                            <SelectItem value="2-5">2-5 staff</SelectItem>
                            <SelectItem value="6-15">6-15 staff</SelectItem>
                            <SelectItem value="16-50">16-50 staff</SelectItem>
                            <SelectItem value="50+">50+ staff</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create password"
                            value={registrationData.password}
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
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={registrationData.confirmPassword}
                            onChange={(event) => handleInputChange("confirmPassword", event.target.value)}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword((previous) => !previous)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <label className="flex items-start space-x-2 text-sm leading-relaxed">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(event) => setAgreedToTerms(event.target.checked)}
                        className="mt-1"
                      />
                      <span>
                        I agree to the{" "}
                        <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading || !agreedToTerms}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>

                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
