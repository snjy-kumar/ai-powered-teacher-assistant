"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { Course } from "../api/get-course"

export function CourseHeader({ course }: { course: Course }) {
  const handleContactInstructor = () => {
    // In a real app, this could open a modal or navigate to a message page
    window.open(`mailto:${course.instructor.email}`, "_blank")
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-muted-foreground mb-2">{course.code}</p>
      </div>
      <div className="mt-4 md:mt-0">
        <Button className="shadow-md" onClick={handleContactInstructor}>
          <MessageCircle className="mr-2 h-4 w-4" />
          Contact Instructor
        </Button>
      </div>
    </div>
  )
} 