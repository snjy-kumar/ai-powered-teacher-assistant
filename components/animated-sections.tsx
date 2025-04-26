'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Users, Zap, Shield, Clock, Brain } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Automated grading system",
    description: "Save time with AI-powered grading that provides instant feedback and detailed analysis.",
    icon: Zap,
  },
  {
    title: "Personalized feedback generation",
    description: "Generate tailored feedback for each student based on their performance and learning style.",
    icon: Brain,
  },
  {
    title: "Advanced analytics and reporting",
    description: "Get comprehensive insights into student performance and learning patterns.",
    icon: Shield,
  },
  {
    title: "AI-powered learning recommendations",
    description: "Receive intelligent suggestions to improve teaching methods and student engagement.",
    icon: Star,
  },
  {
    title: "Real-time progress tracking",
    description: "Monitor student progress and identify areas that need attention in real-time.",
    icon: Clock,
  },
  {
    title: "Secure and scalable platform",
    description: "Enterprise-grade security with unlimited scalability for growing institutions.",
    icon: Shield,
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "High School Teacher",
    content: "EduAI Assistant has transformed how I teach. I now spend more time engaging with students and less time on administrative tasks.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
  },
  {
    name: "Michael Chen",
    role: "University Professor",
    content: "The personalized feedback system is incredible. It helps me provide detailed guidance to each student efficiently.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
  },
  {
    name: "Emily Rodriguez",
    role: "Middle School Teacher",
    content: "The analytics dashboard gives me valuable insights into student performance and helps me adjust my teaching methods accordingly.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "$29",
    features: ["Up to 100 students", "Basic analytics", "Email support", "Standard grading"],
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    price: "$79",
    features: ["Up to 500 students", "Advanced analytics", "Priority support", "AI-powered grading", "Custom feedback templates"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited students", "Custom analytics", "24/7 support", "Advanced AI features", "API access", "Custom integrations"],
    cta: "Contact Sales",
  },
];

const faqs = [
  {
    question: "How does the AI grading system work?",
    answer: "Our AI system analyzes student submissions using advanced machine learning algorithms to provide accurate and consistent grading. It considers multiple factors including content quality, grammar, and learning objectives.",
  },
  {
    question: "Can I customize the feedback templates?",
    answer: "Yes, you can create and customize feedback templates to match your teaching style and specific requirements. The system allows for both standard and personalized feedback generation.",
  },
  {
    question: "Is my data secure?",
    answer: "We use enterprise-grade encryption and security measures to protect all your data. We're compliant with major educational data protection standards and regularly undergo security audits.",
  },
  {
    question: "How can I get started?",
    answer: "Getting started is easy! Simply sign up for a free trial, import your student list, and begin using our platform. Our onboarding team will guide you through the process.",
  },
];

export default function AnimatedSections() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background" />
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-12">
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Transform Teaching with AI-Powered Assistance
              </motion.h1>
              <motion.p 
                className="mt-6 text-xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Enhance your teaching experience with automated grading, personalized feedback, and intelligent analytics. Let AI handle the routine tasks while you focus on what matters most - teaching.
              </motion.p>
              <motion.div 
                className="mt-8 flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative aspect-video overflow-hidden rounded-xl border bg-muted shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted" />
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"
                alt="Teacher using digital tools"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <motion.h2 
            className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Key Features
          </motion.h2>
          <motion.p 
            className="mx-auto mt-4 max-w-[700px] text-center text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Everything you need to streamline your teaching process and enhance student learning outcomes.
          </motion.p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="flex flex-col space-y-4 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <feature.icon className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <motion.h2 
            className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Users Say
          </motion.h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="flex flex-col rounded-lg border bg-background p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">{testimonial.content}</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <motion.h2 
            className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            className="mx-auto mt-4 max-w-[700px] text-center text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the plan that best fits your needs. All plans include a 14-day free trial.
          </motion.p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                className={`relative flex flex-col rounded-lg border bg-background p-6 shadow-sm ${
                  plan.popular ? "border-primary" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Most Popular
                  </motion.div>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-3xl font-bold">
                  {plan.price}
                  <span className="text-sm font-normal text-muted-foreground">/month</span>
                </p>
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
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <motion.h2 
            className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="mx-auto mt-12 max-w-3xl space-y-8">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                className="rounded-lg border bg-background p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-12">
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Transform Your Teaching?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/90">
                Join thousands of educators who are already using EduAI Assistant to enhance their teaching experience and improve student outcomes.
              </p>
              <div className="mt-8">
                <Link href="/signup">
                  <Button size="lg" variant="secondary">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="relative aspect-video overflow-hidden rounded-xl border bg-background/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/10 to-transparent" />
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                alt="Students collaborating"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
} 