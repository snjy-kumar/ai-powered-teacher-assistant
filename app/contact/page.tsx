'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";

const contactInfo = [
  {
    title: "Email",
    description: "support@eduai.com",
    icon: Mail,
    link: "mailto:support@eduai.com"
  },
  {
    title: "Phone",
    description: "+1 (555) 123-4567",
    icon: Phone,
    link: "tel:+15551234567"
  },
  {
    title: "Office",
    description: "123 Education Street, Tech City, TC 12345",
    icon: MapPin,
    link: "https://maps.google.com"
  },
  {
    title: "Hours",
    description: "Mon-Fri: 9:00 AM - 6:00 PM EST",
    icon: Clock,
    link: null
  }
];

export default function ContactPage() {
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
            Get in Touch
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center rounded-lg border bg-background p-6 text-center"
                >
                  <info.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="mt-2 text-muted-foreground hover:text-primary"
                    >
                      {info.description}
                    </a>
                  ) : (
                    <p className="mt-2 text-muted-foreground">{info.description}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-lg border bg-background p-6"
            >
              <h2 className="text-2xl font-semibold">Live Chat Support</h2>
              <p className="mt-2 text-muted-foreground">
                Need immediate assistance? Our support team is available via live chat during business hours.
              </p>
              <Button className="mt-4" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Chat
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-lg border bg-background p-6"
          >
            <h2 className="text-2xl font-semibold">Send us a Message</h2>
            <form className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your inquiry..."
                  className="min-h-[150px]"
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 