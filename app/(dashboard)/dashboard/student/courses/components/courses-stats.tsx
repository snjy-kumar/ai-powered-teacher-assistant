"use client"

import { Card } from "@/components/ui/card"
import { BookOpen, Clock, Calendar, BadgeCheck } from "lucide-react"
import { useState, useEffect } from "react"
import { CurrentCourse } from "../api/get-courses"

export function CoursesStats({ currentCourses }: { currentCourses: CurrentCourse[] }) {
  const [nextClass, setNextClass] = useState({
    title: "",
    time: ""
  })
  
  // Calculate total credits for current courses
  const totalCredits = currentCourses.reduce((sum, course) => sum + course.credits, 0)
  
  // In a real app, you would calculate the term progress based on dates
  const termProgress = 62
  
  // Find the next upcoming class
  useEffect(() => {
    // This is a simplified example - in a real app, you would compare dates
    // and determine the actually next scheduled class
    const physics = currentCourses.find(course => course.code.startsWith("PHYS"))
    if (physics) {
      setNextClass({
        title: physics.title,
        time: "9:00 AM"
      })
    }
  }, [currentCourses])
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Courses</p>
            <p className="text-3xl font-bold">{currentCourses.length}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <BadgeCheck className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Credits This Term</p>
            <p className="text-3xl font-bold">{totalCredits}</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Calendar className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Term Progress</p>
            <p className="text-3xl font-bold">{termProgress}%</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Clock className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Next Class</p>
            <p className="text-sm font-medium mt-1">{nextClass.title || "Physics"}, {nextClass.time || "9:00 AM"}</p>
          </div>
        </div>
      </Card>
    </div>
  )
} 