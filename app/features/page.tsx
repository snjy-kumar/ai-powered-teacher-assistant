'use client';

import { motion } from "framer-motion";
import { Zap, Brain, Shield, Star, Clock, Users, BookOpen, BarChart, MessageSquare, FileText, Target, GraduationCap } from "lucide-react";

const features = [
  {
    title: "AI-Powered Grading System",
    description: "Our advanced AI system provides instant, accurate grading with detailed feedback. It analyzes multiple aspects of student work including content quality, grammar, and learning objectives.",
    icon: Zap,
    details: [
      "Instant grading and feedback",
      "Multiple assessment criteria",
      "Consistent evaluation standards",
      "Detailed performance analytics"
    ]
  },
  {
    title: "Personalized Learning Paths",
    description: "Create customized learning experiences for each student based on their individual needs, learning style, and progress.",
    icon: Brain,
    details: [
      "Individual learning plans",
      "Adaptive content delivery",
      "Progress tracking",
      "Custom learning objectives"
    ]
  },
  {
    title: "Advanced Analytics Dashboard",
    description: "Get comprehensive insights into student performance, learning patterns, and areas for improvement with our powerful analytics tools.",
    icon: BarChart,
    details: [
      "Real-time performance metrics",
      "Learning pattern analysis",
      "Progress visualization",
      "Custom report generation"
    ]
  },
  {
    title: "Interactive Learning Tools",
    description: "Engage students with interactive learning tools and activities that make learning more effective and enjoyable.",
    icon: BookOpen,
    details: [
      "Interactive exercises",
      "Virtual whiteboard",
      "Collaborative projects",
      "Gamified learning elements"
    ]
  },
  {
    title: "Communication Hub",
    description: "Streamline communication between teachers, students, and parents with our integrated messaging system.",
    icon: MessageSquare,
    details: [
      "Real-time messaging",
      "Announcement system",
      "Parent portal",
      "Discussion forums"
    ]
  },
  {
    title: "Resource Library",
    description: "Access and share educational resources, lesson plans, and learning materials through our comprehensive library.",
    icon: FileText,
    details: [
      "Digital resource storage",
      "Lesson plan sharing",
      "Material categorization",
      "Resource recommendations"
    ]
  },
  {
    title: "Assessment Tools",
    description: "Create and manage various types of assessments with our flexible assessment tools.",
    icon: Target,
    details: [
      "Multiple question types",
      "Automated grading",
      "Performance tracking",
      "Assessment analytics"
    ]
  },
  {
    title: "Professional Development",
    description: "Access training resources and professional development opportunities to enhance your teaching skills.",
    icon: GraduationCap,
    details: [
      "Teacher training modules",
      "Best practice guides",
      "Peer collaboration",
      "Skill development resources"
    ]
  }
];

export default function FeaturesPage() {
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
            Powerful Features for Modern Education
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Discover how our comprehensive suite of tools can transform your teaching experience and enhance student learning outcomes.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col space-y-4 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
            >
              <feature.icon className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <ul className="mt-4 space-y-2">
                {feature.details.map((detail, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 