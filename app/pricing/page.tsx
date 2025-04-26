'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Star, Zap, Shield, Users, Brain, Clock, BarChart, MessageSquare, FileText, Target, GraduationCap, Globe } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    price: "$29",
    description: "Perfect for individual teachers and small classes",
    features: [
      "Up to 100 students",
      "Basic analytics",
      "Email support",
      "Standard grading",
      "Basic resource library",
      "Core assessment tools"
    ],
    cta: "Start Free Trial",
    icon: Users
  },
  {
    name: "Professional",
    price: "$79",
    description: "Ideal for growing institutions and departments",
    features: [
      "Up to 500 students",
      "Advanced analytics",
      "Priority support",
      "AI-powered grading",
      "Custom feedback templates",
      "Interactive learning tools",
      "Communication hub",
      "Advanced resource library",
      "Professional development resources"
    ],
    cta: "Get Started",
    popular: true,
    icon: Star
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large institutions requiring advanced features",
    features: [
      "Unlimited students",
      "Custom analytics",
      "24/7 support",
      "Advanced AI features",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Custom training",
      "SLA guarantees",
      "Advanced security features"
    ],
    cta: "Contact Sales",
    icon: Globe
  }
];

const includedFeatures = [
  {
    title: "AI-Powered Grading",
    description: "Advanced AI system for accurate and instant grading",
    icon: Zap
  },
  {
    title: "Personalized Learning",
    description: "Custom learning paths for each student",
    icon: Brain
  },
  {
    title: "Analytics Dashboard",
    description: "Comprehensive insights and reporting",
    icon: BarChart
  },
  {
    title: "Communication Tools",
    description: "Integrated messaging and collaboration",
    icon: MessageSquare
  },
  {
    title: "Resource Library",
    description: "Access to educational materials",
    icon: FileText
  },
  {
    title: "Assessment Tools",
    description: "Flexible assessment creation and management",
    icon: Target
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Choose the plan that best fits your needs. All plans include a 14-day free trial.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className={`relative flex flex-col rounded-lg border bg-background p-6 shadow-sm ${
                plan.popular ? "border-primary" : ""
              }`}
            >
              {plan.popular && (
                <motion.div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Most Popular
                </motion.div>
              )}
              <plan.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold">
                {plan.price}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </p>
              <p className="mt-2 text-muted-foreground">{plan.description}</p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8" variant={plan.popular ? "default" : "outline"}>
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold">All Plans Include</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {includedFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <feature.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 