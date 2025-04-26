"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar } from "lucide-react"
import { Course } from "../api/get-course"

export function CourseOverview({ course }: { course: Course }) {
  const [progress, setProgress] = useState(0)
  
  // Animate progress bar on load
  useEffect(() => {
    const timer = setTimeout(() => setProgress(course.progress), 500)
    return () => clearTimeout(timer)
  }, [course.progress])
  
  return (
    <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Course Overview</h2>
        <div className="p-2 bg-primary/10 rounded-lg">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
      </div>
      <p className="text-muted-foreground mb-6">{course.description}</p>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Course Progress</span>
          <span className="font-medium text-primary">{course.progress}%</span>
        </div>
        <Progress value={progress} className="h-2 transition-all duration-700" />
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg hover:bg-muted/50 transition-colors">
        <h3 className="font-medium mb-2 flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-primary" />
          Next Class
        </h3>
        <div className="ml-6 space-y-1">
          <p className="font-medium">{course.nextClass.topic}</p>
          <p className="text-sm text-muted-foreground">{course.nextClass.date} | {course.nextClass.time}</p>
          <p className="text-sm text-muted-foreground">{course.nextClass.room}</p>
        </div>
      </div>
    </Card>
  )
} 