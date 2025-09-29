"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Headphones,
  Users,
  Building,
  Globe,
  Shield,
  Star,
  CheckCircle,
} from "lucide-react";

interface ContactForm {
  name: string;
  email: string;
  organization: string;
  phone: string;
  planInterest: string;
  subject: string;
  message: string;
}

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help from our support team",
    contact: "support@katosuite.com",
    hours: "24/7 for Enterprise customers",
    action: "Send Email",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our experts",
    contact: "+1 (555) 123-KATO",
    hours: "Mon-Fri 8AM-6PM EST",
    action: "Call Now",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Instant help when you need it",
    contact: "Available in-app",
    hours: "Mon-Fri 9AM-5PM EST",
    action: "Start Chat",
  },
  {
    icon: Headphones,
    title: "Training & Support",
    description: "Onboarding and training sessions",
    contact: "training@katosuite.com",
    hours: "Scheduled appointments",
    action: "Schedule Session",
  },
];

const officeLocations = [
  { city: "San Francisco, CA", address: "123 Education Street, Suite 400", zipcode: "San Francisco, CA 94105" },
  { city: "Austin, TX", address: "456 Innovation Drive, Floor 12", zipcode: "Austin, TX 73301" },
  { city: "Boston, MA", address: "789 Learning Avenue, Suite 200", zipcode: "Boston, MA 02101" },
];

const supportStats = [
  { label: "Average Response Time", value: "< 2 hours", icon: Clock },
  { label: "Customer Satisfaction", value: "98.5%", icon: Star },
  { label: "Support Languages", value: "12", icon: Globe },
  { label: "Certified Specialists", value: "50+", icon: Shield },
];

export default function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    organization: "",
    phone: "",
    planInterest: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Contact form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />

      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <section className="text-center py-16">
            <div className="flex items-center justify-center mb-6">
              <img
                src="https://ucarecdn.com/a1a0352a-bb45-4b8b-8ca8-db2c8dd0fcb1/"
                alt="KatoSuite Logo"
                className="w-16 h-16 mr-4"
              />
              <h1 className="text-5xl font-bold text-gray-900">Get in Touch</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our team of Early Childhood Education experts is here to help you transform your program with KatoSuite&apos;s
              comprehensive platform.
            </p>
            <Badge variant="secondary" className="mt-4 text-lg px-6 py-2">
              Trusted by 2,500+ ECE Centers Worldwide
            </Badge>
          </section>

          <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map(({ icon: IconComponent, title, description, contact, hours, action }) => (
              <Card key={title} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <IconComponent className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="font-medium text-gray-900">{contact}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                      <Clock className="h-4 w-4" />
                      {hours}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    {action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>Fill out the form below and we&apos;ll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(event) => handleInputChange("name", event.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(event) => handleInputChange("email", event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(event) => handleInputChange("organization", event.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(event) => handleInputChange("phone", event.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="planInterest">Plan Interest</Label>
                    <Select value={formData.planInterest} onValueChange={(value) => handleInputChange("planInterest", value)}>
                      <SelectTrigger id="planInterest">
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free Starter</SelectItem>
                        <SelectItem value="individual">Individual Educator</SelectItem>
                        <SelectItem value="small">Small Center</SelectItem>
                        <SelectItem value="growing">Growing Center</SelectItem>
                        <SelectItem value="established">Established Center</SelectItem>
                        <SelectItem value="multi">Multi-Location</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                        <SelectItem value="government">District/Government</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(event) => handleInputChange("subject", event.target.value)}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(event) => handleInputChange("message", event.target.value)}
                      rows={5}
                      placeholder="Tell us more about your needs..."
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MapPin className="h-6 w-6" />
                    Office Locations
                  </CardTitle>
                  <CardDescription>Visit us at one of our locations or schedule a virtual meeting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {officeLocations.map(({ city, address, zipcode }) => (
                      <div key={city} className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-semibold text-gray-900">{city}</h4>
                        <p className="text-gray-600">{address}</p>
                        <p className="text-gray-600">{zipcode}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Support Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {supportStats.map(({ label, value, icon: IconComponent }) => (
                      <div key={label} className="text-center p-4 bg-blue-50 rounded-lg">
                        <IconComponent className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                        <div className="font-bold text-gray-900">{value}</div>
                        <div className="text-sm text-gray-600">{label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="py-12">
                <div className="text-center mb-8">
                  <Users className="h-16 w-16 mx-auto text-green-600 mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet with Our Sales Team</h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Schedule a personalized demo with our ECE experts to see how KatoSuite can transform your childcare
                    program.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {["Custom Demo", "Implementation Planning", "Pricing Discussion"].map((item) => (
                    <div key={item} className="text-center">
                      <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                      <h4 className="font-semibold text-gray-900">{item}</h4>
                      <p className="text-gray-600">
                        {item === "Custom Demo"
                          ? "Tailored to your specific needs"
                          : item === "Implementation Planning"
                          ? "Roadmap for successful rollout"
                          : "Find the right plan for you"}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Schedule Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="py-8 text-center">
                <h3 className="text-xl font-bold text-red-900 mb-2">Emergency Support</h3>
                <p className="text-red-700 mb-4">For critical system issues affecting child safety or center operations</p>
                <Button size="lg" className="bg-red-600 text-white hover:bg-red-700">
                  Emergency Hotline: +1 (555) 911-KATO
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
