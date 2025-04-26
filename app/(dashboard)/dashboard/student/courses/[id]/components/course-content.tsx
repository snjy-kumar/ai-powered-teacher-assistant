"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, MessageCircle, Users, Download } from "lucide-react"
import Link from "next/link"
import { Course, CourseAssignment, CourseAnnouncement } from "../api/get-course"

export function CourseContent({ course }: { course: Course }) {
  const [selectedModule, setSelectedModule] = useState<number>(
    // Default to the current module if available
    course.modules.find(m => m.current)?.id || course.modules[0].id
  );

  return (
    <Tabs defaultValue="modules" className="w-full">
      <TabsList className="bg-muted/50 p-1 rounded-xl mb-8 w-full sm:w-auto mx-auto flex justify-center">
        <TabsTrigger 
          value="modules" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary rounded-lg px-8 py-2.5 transition-all duration-200"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Modules
        </TabsTrigger>
        <TabsTrigger 
          value="assignments" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary rounded-lg px-8 py-2.5 transition-all duration-200"
        >
          <FileText className="w-4 h-4 mr-2" />
          Assignments
        </TabsTrigger>
        <TabsTrigger 
          value="announcements" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary rounded-lg px-8 py-2.5 transition-all duration-200"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Announcements
        </TabsTrigger>
      </TabsList>

      <TabsContent value="modules" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
        <CourseModules course={course} selectedModule={selectedModule} setSelectedModule={setSelectedModule} />
      </TabsContent>

      <TabsContent value="assignments" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
        <CourseAssignmentsList assignments={course.assignments} />
      </TabsContent>

      <TabsContent value="announcements" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
        <CourseAnnouncementsList announcements={course.announcements} />
      </TabsContent>
    </Tabs>
  )
}

function CourseModules({ 
  course, 
  selectedModule, 
  setSelectedModule 
}: { 
  course: Course, 
  selectedModule: number, 
  setSelectedModule: (id: number) => void 
}) {
  return (
    <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded-lg">
          <h3 className="font-medium p-4 border-b bg-muted/30">Course Modules</h3>
          <div className="space-y-1 p-2">
            {course.modules.map((module) => (
              <div 
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedModule === module.id 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{module.title}</span>
                  {module.completed && (
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  )}
                  {module.current && !module.completed && (
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2 border rounded-lg">
          {course.modules.map((module) => 
            selectedModule === module.id && (
              <div key={module.id}>
                <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
                  <h3 className="font-medium">{module.title}</h3>
                  {module.completed ? (
                    <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">Completed</span>
                  ) : module.current ? (
                    <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full">Current</span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 px-2 py-1 rounded-full">Upcoming</span>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-medium mb-4">Materials</h4>
                  <div className="space-y-3">
                    {module.materials.map((material) => (
                      <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/20 transition-colors">
                        <div className="flex items-center">
                          {material.type === 'pdf' && (
                            <FileText className="h-5 w-5 mr-3 text-red-500" />
                          )}
                          {material.type === 'video' && (
                            <BookOpen className="h-5 w-5 mr-3 text-blue-500" />
                          )}
                          {material.type === 'interactive' && (
                            <Users className="h-5 w-5 mr-3 text-green-500" />
                          )}
                          <span>{material.title}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Card>
  )
}

function CourseAssignmentsList({ assignments }: { assignments: CourseAssignment[] }) {
  return (
    <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Course Assignments</h2>
        <div className="p-2 bg-primary/10 rounded-lg">
          <FileText className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{assignment.title}</h3>
                <p className="text-sm text-muted-foreground">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              </div>
              {assignment.status === 'Completed' ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">{assignment.grade}</span>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
              ) : (
                <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-full">
                  {assignment.status}
                </span>
              )}
            </div>
            <div className="mt-3">
              <Link href={`/dashboard/student/assignments/${assignment.id}`}>
                <Button variant="outline" size="sm">
                  {assignment.status === 'Completed' ? 'View Submission' : 'Continue Working'}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function CourseAnnouncementsList({ announcements }: { announcements: CourseAnnouncement[] }) {
  return (
    <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Course Announcements</h2>
        <div className="p-2 bg-primary/10 rounded-lg">
          <MessageCircle className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">{announcement.title}</h3>
              <span className="text-xs text-muted-foreground">{new Date(announcement.date).toLocaleDateString()}</span>
            </div>
            <p className="text-muted-foreground">{announcement.content}</p>
          </div>
        ))}
      </div>
    </Card>
  )
} 