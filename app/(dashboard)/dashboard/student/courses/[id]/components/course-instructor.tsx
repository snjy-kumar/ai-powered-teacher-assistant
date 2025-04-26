"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, BookOpen, Clock } from "lucide-react"
import { CourseInstructor } from "../api/get-course"

export function CourseInstructor({ instructor }: { instructor: CourseInstructor }) {
  return (
    <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Instructor</h2>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Users className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="flex flex-col items-center text-center mb-6">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarImage src={instructor.avatar} alt={instructor.name} />
          <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-lg">{instructor.name}</h3>
        <p className="text-muted-foreground">{instructor.email}</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <BookOpen className="h-4 w-4 text-primary mt-1" />
          <div>
            <p className="font-medium">Office</p>
            <p className="text-sm text-muted-foreground">{instructor.office}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Clock className="h-4 w-4 text-primary mt-1" />
          <div>
            <p className="font-medium">Office Hours</p>
            <p className="text-sm text-muted-foreground">{instructor.officeHours}</p>
          </div>
        </div>
      </div>
    </Card>
  )
} 