"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, User, Clock, Calendar, BadgeCheck } from "lucide-react"
import Link from "next/link"
import { CurrentCourse, CompletedCourse } from "../api/get-courses"
import { motion } from "framer-motion"

interface CoursesContentProps {
  currentCourses: CurrentCourse[]
  completedCourses: CompletedCourse[]
}

export function CoursesContent({ currentCourses, completedCourses }: CoursesContentProps) {
  return (
    <Tabs defaultValue="current" className="w-full">
      <TabsList className="bg-muted/50 p-1 rounded-xl mb-8 w-full sm:w-auto mx-auto flex justify-center">
        <TabsTrigger 
          value="current" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary rounded-lg px-8 py-2.5 transition-all duration-200"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Current Courses
        </TabsTrigger>
        <TabsTrigger 
          value="completed" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary rounded-lg px-8 py-2.5 transition-all duration-200"
        >
          <BadgeCheck className="w-4 h-4 mr-2" />
          Completed Courses
        </TabsTrigger>
      </TabsList>

      <TabsContent value="current" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
        <CurrentCoursesList courses={currentCourses} />
      </TabsContent>

      <TabsContent value="completed" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
        <CompletedCoursesList courses={completedCourses} />
      </TabsContent>
    </Tabs>
  )
}

function CurrentCoursesList({ courses }: { courses: CurrentCourse[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Link href={`/dashboard/student/courses/${course.id}`}>
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 h-full">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <p className="text-muted-foreground">{course.code}</p>
                  </div>
                  <div className="bg-primary/10 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-primary">{course.credits} Credits</span>
                  </div>
                </div>
                
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{course.schedule}</span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Course Progress</span>
                      <span className="text-sm font-medium text-primary">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium">Upcoming: {course.upcoming.title}</p>
                  <p className="text-xs text-muted-foreground">{course.upcoming.date}</p>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

function CompletedCoursesList({ courses }: { courses: CompletedCourse[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.code}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-green-700 dark:text-green-400">{course.grade}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{course.term}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4" />
                <span>{course.credits} Credits</span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                View Certificate
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
} 