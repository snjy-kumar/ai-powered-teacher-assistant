"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Clock, Search, Calendar, Tag, ChevronRight, CheckCircle, AlertCircle } from "lucide-react"

// Mock data for assignments
const assignments = {
  upcoming: [
    {
      id: "1",
      title: "Linear Equations Problem Set",
      subject: "Mathematics",
      course: "MATH101",
      dueDate: "2023-04-25T15:30:00Z",
      status: "in-progress", // "not-started", "in-progress"
      type: "homework"
    },
    {
      id: "2",
      title: "Literary Analysis Essay",
      subject: "English Literature",
      course: "ENG205",
      dueDate: "2023-04-28T14:00:00Z",
      status: "not-started",
      type: "essay"
    },
    {
      id: "3",
      title: "World War II Research",
      subject: "History",
      course: "HIST101",
      dueDate: "2023-05-05T23:59:00Z",
      status: "not-started",
      type: "project"
    }
  ],
  completed: [
    {
      id: "4",
      title: "Chemical Bonds Worksheet",
      subject: "Chemistry",
      course: "CHEM103",
      submittedDate: "2023-04-10T09:45:00Z",
      dueDate: "2023-04-12T23:59:00Z",
      grade: "A",
      score: 95,
      status: "graded" // "submitted", "graded"
    },
    {
      id: "5",
      title: "Programming Assignment: Sorting Algorithms",
      subject: "Computer Science",
      course: "CS101",
      submittedDate: "2023-04-05T13:20:00Z",
      dueDate: "2023-04-07T23:59:00Z",
      grade: "A-",
      score: 90,
      status: "graded"
    },
    {
      id: "6",
      title: "Cell Biology Lab Report",
      subject: "Biology",
      course: "BIO201",
      submittedDate: "2023-03-28T11:05:00Z",
      dueDate: "2023-03-30T23:59:00Z",
      status: "submitted"
    }
  ]
}

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  
  // Get unique subjects for filter
  const subjects = [...new Set([
    ...assignments.upcoming.map(a => a.subject),
    ...assignments.completed.map(a => a.subject)
  ])]
  
  // Get unique types for filter
  const types = [...new Set([
    ...assignments.upcoming.map(a => a.type),
    "all"
  ])]
  
  const filteredUpcoming = assignments.upcoming.filter(assignment => {
    // Apply search filter
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Apply subject filter
    const matchesSubject = subjectFilter === "all" || assignment.subject === subjectFilter
    
    // Apply type filter
    const matchesType = typeFilter === "all" || assignment.type === typeFilter
    
    return matchesSearch && matchesSubject && matchesType
  })
  
  const filteredCompleted = assignments.completed.filter(assignment => {
    // Apply search filter
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Apply subject filter
    const matchesSubject = subjectFilter === "all" || assignment.subject === subjectFilter
    
    return matchesSearch && matchesSubject
  })
  
  const getDaysRemaining = (dueDate) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }
  
  const getStatusColor = (status, dueDate) => {
    const daysRemaining = getDaysRemaining(dueDate)
    
    if (status === "not-started" && daysRemaining <= 2) {
      return "text-red-500 bg-red-50 dark:bg-red-950/20"
    } else if (status === "in-progress") {
      return "text-amber-500 bg-amber-50 dark:bg-amber-950/20"
    } else if (status === "submitted") {
      return "text-blue-500 bg-blue-50 dark:bg-blue-950/20"
    } else if (status === "graded") {
      return "text-green-500 bg-green-50 dark:bg-green-950/20"
    } else {
      return "text-muted-foreground bg-muted/40"
    }
  }
  
  const getStatusText = (status, dueDate) => {
    const daysRemaining = getDaysRemaining(dueDate)
    
    if (status === "not-started") {
      return daysRemaining <= 2 ? "Due Soon" : "Not Started"
    } else if (status === "in-progress") {
      return "In Progress"
    } else if (status === "submitted") {
      return "Submitted"
    } else if (status === "graded") {
      return "Graded"
    } else {
      return "Unknown"
    }
  }
  
  const getStatusIcon = (status, dueDate) => {
    const daysRemaining = getDaysRemaining(dueDate)
    
    if (status === "not-started" && daysRemaining <= 2) {
      return <AlertCircle className="h-4 w-4" />
    } else if (status === "graded") {
      return <CheckCircle className="h-4 w-4" />
    } else {
      return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">My Assignments</h1>
        <p className="text-muted-foreground">Track, submit, and review all your academic assignments</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="grow">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="Search assignments by title or subject..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <Select 
            value={subjectFilter} 
            onValueChange={setSubjectFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((subject, i) => (
                <SelectItem key={i} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={typeFilter} 
            onValueChange={setTypeFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.filter(t => t !== "all").map((type, i) => (
                <SelectItem key={i} value={type} className="capitalize">{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="justify-left mb-8">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200">
            Completed
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {filteredUpcoming.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No upcoming assignments found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || subjectFilter !== "all" || typeFilter !== "all" 
                  ? "Try adjusting your search filters" 
                  : "You don't have any upcoming assignments"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredUpcoming.map(assignment => {
                const daysRemaining = getDaysRemaining(assignment.dueDate)
                
                return (
                  <Link key={assignment.id} href={`/dashboard/student/assignments/${assignment.id}`}>
                    <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-primary/20">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="px-2 py-1 text-xs rounded-full bg-muted capitalize">
                              {assignment.type}
                            </div>
                            <span className="text-muted-foreground text-sm">{assignment.course}</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-1">{assignment.title}</h3>
                          <p className="text-muted-foreground">{assignment.subject}</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${getStatusColor(assignment.status, assignment.dueDate)}`}>
                            {getStatusIcon(assignment.status, assignment.dueDate)}
                            <span className="text-sm font-medium">
                              {getStatusText(assignment.status, assignment.dueDate)}
                            </span>
                          </div>
                          
                          <Button>
                            {assignment.status === "not-started" ? "Start" : "Continue"}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              {daysRemaining < 0 
                                ? "Overdue" 
                                : daysRemaining === 0 
                                  ? "Due today" 
                                  : `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left`}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-primary flex items-center">
                          <span>View Details</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {filteredCompleted.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No completed assignments found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || subjectFilter !== "all" 
                  ? "Try adjusting your search filters" 
                  : "You haven't completed any assignments yet"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredCompleted.map(assignment => (
                <Link key={assignment.id} href={`/dashboard/student/assignments/${assignment.id}`}>
                  <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-primary/20">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-muted-foreground text-sm">{assignment.course}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-1">{assignment.title}</h3>
                        <p className="text-muted-foreground">{assignment.subject}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${getStatusColor(assignment.status)}`}>
                          {getStatusIcon(assignment.status)}
                          <span className="text-sm font-medium">
                            {getStatusText(assignment.status)}
                          </span>
                        </div>
                        
                        {assignment.status === "graded" && (
                          <div className="flex items-center bg-primary/10 px-4 py-3 rounded-xl">
                            <div className="text-center">
                              <p className="text-xl font-bold text-primary">{assignment.grade}</p>
                              <p className="text-xs text-muted-foreground">Grade</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="text-sm">
                            Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-primary flex items-center">
                        <span>View {assignment.status === "graded" ? "Feedback" : "Details"}</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}