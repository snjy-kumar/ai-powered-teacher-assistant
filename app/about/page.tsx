'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap, Target, Users, Globe, Heart, Award } from "lucide-react";

const stats = [
  {
    title: "Active Users",
    value: "50,000+",
    description: "Teachers and students using our platform",
    icon: Users
  },
  {
    title: "Countries",
    value: "30+",
    description: "Global reach across continents",
    icon: Globe
  },
  {
    title: "Success Rate",
    value: "95%",
    description: "Of teachers report improved outcomes",
    icon: Award
  }
];

const values = [
  {
    title: "Excellence in Education",
    description: "We strive to provide the highest quality educational tools and resources to enhance learning outcomes.",
    icon: GraduationCap
  },
  {
    title: "Innovation",
    description: "We continuously innovate to bring cutting-edge technology to education, making learning more effective and engaging.",
    icon: Target
  },
  {
    title: "Community",
    description: "We believe in the power of community and collaboration in education, fostering connections between teachers and students.",
    icon: Heart
  }
];

export default function AboutPage() {
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
            Our Story okay
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Transforming education through innovative AI-powered solutions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 prose prose-lg mx-auto"
        >
          <p>
            Founded in 2023, EduAI Assistant emerged from a simple observation: teachers were spending too much time on administrative tasks and not enough time doing what they love - teaching. Our mission is to revolutionize education by leveraging artificial intelligence to automate routine tasks and enhance the teaching and learning experience.
          </p>
          <p>
            We believe that every student deserves personalized attention and every teacher deserves tools that make their job easier. Our platform combines cutting-edge AI technology with intuitive design to create a seamless educational experience for both teachers and students.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid gap-8 sm:grid-cols-3"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <stat.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-3xl font-bold">{stat.value}</h3>
              <p className="mt-2 text-lg font-semibold">{stat.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-24"
        >
          <h2 className="text-center text-3xl font-bold">Our Values</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <value.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-xl font-semibold">{value.title}</h3>
                <p className="mt-2 text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold">Join Our Mission</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Be part of the future of education
          </p>
          <div className="mt-8">
            <Button size="lg">
              Get Started Today
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 