'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    title: "Getting Started",
    questions: [
      {
        question: "How do I get started with EduAI Assistant?",
        answer: "Getting started is easy! Simply sign up for a free trial, import your student list, and begin using our platform. Our onboarding team will guide you through the process and help you set up your first class."
      },
      {
        question: "What are the system requirements?",
        answer: "Our platform is web-based and works on any modern browser. You'll need a stable internet connection and a device with a modern web browser (Chrome, Firefox, Safari, or Edge)."
      },
      {
        question: "Can I import my existing student data?",
        answer: "Yes! We support various data import formats including CSV, Excel, and Google Sheets. Our import wizard will guide you through the process and help you map your data correctly."
      }
    ]
  },
  {
    title: "Features & Functionality",
    questions: [
      {
        question: "How does the AI grading system work?",
        answer: "Our AI system analyzes student submissions using advanced machine learning algorithms to provide accurate and consistent grading. It considers multiple factors including content quality, grammar, and learning objectives. The system learns from your grading patterns to provide more personalized feedback."
      },
      {
        question: "Can I customize the feedback templates?",
        answer: "Yes, you can create and customize feedback templates to match your teaching style and specific requirements. The system allows for both standard and personalized feedback generation, and you can save your templates for future use."
      },
      {
        question: "What types of assessments are supported?",
        answer: "We support various types of assessments including multiple choice, short answer, essay questions, and file uploads. You can also create custom assessment types to match your specific needs."
      }
    ]
  },
  {
    title: "Security & Privacy",
    questions: [
      {
        question: "Is my data secure?",
        answer: "We use enterprise-grade encryption and security measures to protect all your data. We're compliant with major educational data protection standards and regularly undergo security audits. Your data is encrypted both in transit and at rest."
      },
      {
        question: "How do you handle student privacy?",
        answer: "We take student privacy seriously. We comply with FERPA, GDPR, and other relevant privacy regulations. You have full control over what data is collected and how it's used. Students can request their data to be deleted at any time."
      },
      {
        question: "Can I control who has access to my data?",
        answer: "Yes, you have complete control over data access. You can manage user permissions, set up role-based access control, and monitor all access to your data through our audit logs."
      }
    ]
  },
  {
    title: "Billing & Support",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans. Enterprise customers can also set up custom payment terms."
      },
      {
        question: "How does the free trial work?",
        answer: "The free trial gives you full access to all features for 14 days. No credit card is required to start. You can upgrade to a paid plan at any time during or after the trial."
      },
      {
        question: "What kind of support do you offer?",
        answer: "We offer multiple support channels including email, live chat, and phone support. Premium and Enterprise plans include priority support with faster response times and dedicated support representatives."
      }
    ]
  }
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

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
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Find answers to common questions about our platform
          </p>
        </motion.div>

        <div className="mt-16 space-y-8">
          {faqCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-lg border bg-background"
            >
              <button
                onClick={() => toggleCategory(category.title)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <h2 className="text-2xl font-semibold">{category.title}</h2>
                {openCategory === category.title ? (
                  <Minus className="h-6 w-6" />
                ) : (
                  <Plus className="h-6 w-6" />
                )}
              </button>
              {openCategory === category.title && (
                <div className="border-t p-6">
                  <div className="space-y-4">
                    {category.questions.map((faq, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: j * 0.1 }}
                        className="rounded-lg border bg-muted/50"
                      >
                        <button
                          onClick={() => toggleQuestion(`${category.title}-${j}`)}
                          className="flex w-full items-center justify-between p-4 text-left"
                        >
                          <h3 className="font-semibold">{faq.question}</h3>
                          {openQuestions[`${category.title}-${j}`] ? (
                            <Minus className="h-5 w-5" />
                          ) : (
                            <Plus className="h-5 w-5" />
                          )}
                        </button>
                        {openQuestions[`${category.title}-${j}`] && (
                          <div className="border-t p-4">
                            <p className="text-muted-foreground">{faq.answer}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold">Still have questions?</h2>
          <p className="mt-4 text-muted-foreground">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="mt-8">
            <Button size="lg">
              Contact Support
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 