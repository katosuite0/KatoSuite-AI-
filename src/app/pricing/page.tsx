"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import { Check, Users, Building, Globe, Star } from "lucide-react";
import Link from "next/link";

const pricingTiers = [
  {
    name: "Free Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for individual educators getting started",
    badge: null,
    features: [
      "Basic lesson planning (5/month)",
      "Up to 10 child profiles",
      "Basic parent communication",
      "Email support",
      "Mobile app access",
    ],
    limitations: ["Limited AI features", "No compliance tools", "Basic reporting"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Individual Educator",
    price: "$29",
    period: "per month",
    description: "Enhanced tools for independent educators",
    badge: null,
    features: [
      "Unlimited lesson planning",
      "Up to 25 child profiles",
      "AI development tracking",
      "Advanced parent portal",
      "Priority email support",
      "Photo & video sharing",
      "Basic analytics",
    ],
    limitations: ["Limited compliance features", "Single user only"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Small Center",
    price: "$89",
    period: "per month",
    description: "Complete solution for small childcare centers",
    badge: "Most Popular",
    features: [
      "Up to 3 staff members",
      "Up to 50 child profiles",
      "Full AI lesson planning",
      "Basic compliance hub",
      "Staff management tools",
      "Financial tracking",
      "Parent app access",
      "Phone support",
    ],
    limitations: ["Limited advanced compliance", "Basic integrations"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Growing Center",
    price: "$179",
    period: "per month",
    description: "Advanced features for expanding centers",
    badge: null,
    features: [
      "Up to 8 staff members",
      "Up to 100 child profiles",
      "Full KatoCompliance Hub",
      "Advanced analytics",
      "Custom reporting",
      "API integrations",
      "Training resources",
      "Priority phone support",
    ],
    limitations: ["Limited to single location"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Established Center",
    price: "$329",
    period: "per month",
    description: "Comprehensive tools for established programs",
    badge: null,
    features: [
      "Up to 15 staff members",
      "Up to 200 child profiles",
      "Advanced compliance automation",
      "Predictive analytics",
      "Custom integrations",
      "Dedicated account manager",
      "White-label parent app",
      "24/7 priority support",
    ],
    limitations: ["Limited multi-location features"],
    cta: "Contact Sales",
    popular: false,
  },
  {
    name: "Multi-Location",
    price: "$599",
    period: "per month",
    description: "Multi-site management and coordination",
    badge: null,
    features: [
      "Unlimited staff",
      "Unlimited child profiles",
      "Multi-location dashboard",
      "Centralized compliance management",
      "Advanced financial reporting",
      "Custom training programs",
      "Dedicated implementation team",
      "Enterprise-grade security",
    ],
    limitations: ["Requires minimum 3 locations"],
    cta: "Contact Sales",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "$1,299",
    period: "per month",
    description: "Enterprise-grade solution for large organizations",
    badge: null,
    features: [
      "Unlimited everything",
      "Custom feature development",
      "Advanced AI capabilities",
      "Enterprise integrations",
      "Custom compliance frameworks",
      "Dedicated success team",
      "On-premise deployment option",
      "SLA guarantee",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
  {
    name: "District/Government",
    price: "Custom",
    period: "pricing",
    description: "Tailored solutions for government agencies",
    badge: "Enterprise",
    features: [
      "Government compliance",
      "Custom security requirements",
      "Multi-district management",
      "Government reporting integration",
      "Custom training and support",
      "Dedicated government team",
      "Flexible deployment options",
      "Volume discounting",
    ],
    limitations: [],
    cta: "Contact Government Sales",
    popular: false,
  },
];

const additionalServices = [
  {
    name: "Professional Implementation",
    price: "$2,500",
    description: "Full setup, data migration, and staff training",
    features: [
      "Data migration from existing systems",
      "Custom configuration and setup",
      "Staff training (up to 20 staff)",
      "Go-live support",
      "90-day post-launch support",
    ],
  },
  {
    name: "Advanced Training Package",
    price: "$1,200",
    description: "Comprehensive training for your entire team",
    features: [
      "Virtual training sessions",
      "Custom training materials",
      "Ongoing training support",
      "Certification program",
      "Train-the-trainer sessions",
    ],
  },
  {
    name: "Custom Integration",
    price: "Starting at $5,000",
    description: "Connect KatoSuite with your existing systems",
    features: [
      "API development and integration",
      "Data synchronization setup",
      "Custom reporting dashboards",
      "Ongoing integration support",
      "Testing and quality assurance",
    ],
  },
];

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.",
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer: "Yes, we offer 20% discounts for qualified non-profit organizations. Contact our sales team for details.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "You can export all your data before canceling. We keep data for 30 days after cancellation for account reactivation.",
  },
  {
    question: "Do you provide training and support?",
    answer:
      "All plans include training resources and support. Higher tiers include dedicated account management and priority support.",
  },
];

export default function PricingPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation userPlan="free" />

      <main className="px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="py-16 text-center">
            <div className="mb-6 flex items-center justify-center">
              <img
                src="https://ucarecdn.com/a1a0352a-bb45-4b8b-8ca8-db2c8dd0fcb1/"
                alt="KatoSuite Logo"
                className="mr-4 h-16 w-16"
              />
              <h1 className="text-5xl font-bold text-gray-900">Simple, Transparent Pricing</h1>
            </div>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
              Choose the perfect plan for your Early Childhood Education needs. All plans include core features with no hidden
              fees.
            </p>
            <Badge variant="secondary" className="mt-4 px-6 py-2 text-lg">
              30-Day Free Trial on All Paid Plans
            </Badge>
          </section>

          <Tabs defaultValue="monthly" className="mb-16">
            <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
            </TabsList>

            <TabsContent value="monthly">
              <div className="mb-8 grid gap-6 lg:grid-cols-4">
                {pricingTiers.slice(0, 4).map((tier) => (
                  <Card
                    key={tier.name}
                    className={`relative ${tier.popular ? "ring-2 ring-blue-500" : ""}`}
                  >
                    {tier.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                        <Badge className="bg-blue-600 px-4 py-1 text-white">{tier.badge}</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      <div className="text-4xl font-bold text-gray-900">
                        {tier.price}
                        <span className="text-sm font-normal text-gray-600">/{tier.period}</span>
                      </div>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="mb-6 space-y-2">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="h-4 w-4 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${tier.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                        variant={tier.popular ? "default" : "outline"}
                      >
                        {tier.cta}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-4">
                {pricingTiers.slice(4).map((tier) => (
                  <Card key={tier.name} className="relative">
                    {tier.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                        <Badge className="bg-purple-600 px-4 py-1 text-white">{tier.badge}</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{tier.name}</CardTitle>
                      <div className="text-4xl font-bold text-gray-900">
                        {tier.price}
                        <span className="text-sm font-normal text-gray-600">/{tier.period}</span>
                      </div>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="mb-6 space-y-2">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="h-4 w-4 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant="outline">
                        {tier.cta}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="annual">
              <div className="py-12 text-center">
                <div className="mx-auto max-w-2xl">
                  <Badge variant="secondary" className="mb-4 px-6 py-2 text-lg">
                    Save 20% with Annual Billing
                  </Badge>
                  <p className="mb-8 text-gray-600">
                    All the same great features at a reduced annual rate. Perfect for centers looking to maximize their budget.
                  </p>
                  <Link href="/contact">
                    <Button size="lg">Contact Sales for Annual Pricing</Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <section className="mb-16">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Additional Services</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {additionalServices.map((service) => (
                <Card key={service.name}>
                  <CardHeader>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div className="mx-auto max-w-3xl space-y-4">
              {faqs.map((faq) => (
                <Card key={faq.question}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700">{faq.answer}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="py-12 text-center">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">Trusted by Thousands</h3>
                <div className="mb-8 grid gap-8 md:grid-cols-3">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">2,500+</div>
                      <div className="text-sm text-gray-600">ECE Centers</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Building className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">150,000+</div>
                      <div className="text-sm text-gray-600">Children Served</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Globe className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <div className="text-sm text-gray-600">Countries</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-6 w-6 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">4.9/5 from 1,200+ reviews</span>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="py-16 text-center">
            <Card className="mx-auto max-w-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardContent className="py-12">
                <h3 className="mb-4 text-3xl font-bold">Ready to Get Started?</h3>
                <p className="mb-8 text-lg opacity-90">
                  Join thousands of ECE professionals who trust KatoSuite. Start your free trial today with no credit card required.
                </p>
                <div className="space-x-4">
                  <Link href="/register">
                    <Button size="lg" variant="secondary">Start Free Trial</Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="bg-white text-blue-600">
                      Schedule Demo
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
