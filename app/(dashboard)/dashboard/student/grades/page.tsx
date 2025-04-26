"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { BookOpen, GraduationCap, ArrowUpRight, TrendingUp, Trophy, Award } from "lucide-react"

// Mock data for grades
const courseGrades = [
  {
    id: "101",
    code: "MATH101",
    title: "Algebra Fundamentals",
    instructor: "Dr. Sarah Johnson",
    grade: "A",
    percentage: 92,
    credits: 3
  },
  {
    id: "102",
    code: "ENG205",
    title: "English Literature",
    instructor: "Prof. Michael Brown",
    grade: "B+",
    percentage: 87,
    credits: 3
  },
  {
    id: "103",
    code: "HIST101",
    title: "World History",
    instructor: "Dr. Emily Davis",
    grade: "A-",
    percentage: 90,
    credits: 3
  },
  {
    id: "104",
    code: "SCI203",
    title: "Introduction to Physics",
    instructor: "Prof. Robert Lee",
    grade: "B",
    percentage: 83,
    credits: 4
  }
]

const assignmentGrades = [
  {
    id: "1",
    title: "Algebraic Expressions Quiz",
    course: "MATH101",
    submitted: "2023-04-10T09:45:00Z",
    grade: "A",
    score: 95,
    maxScore: 100,
    weight: "10%"
  },
  {
    id: "2",
    title: "Linear Equations Assignment",
    course: "MATH101",
    submitted: "2023-04-02T14:30:00Z",
    grade: "A-",
    score: 90,
    maxScore: 100,
    weight: "15%"
  },
  {
    id: "3",
    title: "Literary Analysis Essay",
    course: "ENG205",
    submitted: "2023-04-05T11:15:00Z",
    grade: "B+",
    score: 87,
    maxScore: 100,
    weight: "20%"
  },
  {
    id: "4",
    title: "World War II Research Paper",
    course: "HIST101",
    submitted: "2023-03-28T13:45:00Z",
    grade: "A",
    score: 94,
    maxScore: 100,
    weight: "25%"
  },
  {
    id: "5",
    title: "Physics Lab Report",
    course: "SCI203",
    submitted: "2023-04-12T10:30:00Z",
    grade: "B",
    score: 83,
    maxScore: 100,
    weight: "15%"
  }
]

const termData = [
  { term: "Fall 2022", gpa: 3.5 },
  { term: "Winter 2022", gpa: 3.7 },
  { term: "Spring 2023", gpa: 3.8 },
  { term: "Current", gpa: 3.9 }
]

const gradeDistribution = [
  { grade: "A", count: 2 },
  { grade: "A-", count: 1 },
  { grade: "B+", count: 1 },
  { grade: "B", count: 1 },
  { grade: "B-", count: 0 },
  { grade: "C+", count: 0 },
  { grade: "C", count: 0 },
  { grade: "C-", count: 0 },
  { grade: "D", count: 0 },
  { grade: "F", count: 0 },
]

// Helper function to calculate GPA
const calculateGPA = (courses) => {
  const gradePoints = {
    "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "D-": 0.7,
    "F": 0.0
  }
  
  let totalPoints = 0
  let totalCredits = 0
  
  courses.forEach(course => {
    const points = gradePoints[course.grade] * course.credits
    totalPoints += points
    totalCredits += course.credits
  })
  
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0
}

export default function GradesPage() {
  const [termFilter, setTermFilter] = useState("current")
  const currentGPA = calculateGPA(courseGrades)
  
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">My Grades & Academic Progress</h1>
        <p className="text-muted-foreground">Track your academic performance across all courses</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-10">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current GPA</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">{currentGPA}</p>
                <span className="text-xs text-green-500 font-medium pb-1">+0.1 this term</span>
              </div>
            </div>
          </div>
          <Progress value={parseFloat(currentGPA) * 25} className="h-2" />
        </Card>
        
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Credits</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">13</p>
                <span className="text-xs text-blue-500 font-medium pb-1">Current term</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Trophy className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Academic Standing</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">Dean's List</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-10">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">GPA Trend</h2>
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={termData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="term" />
                <YAxis domain={[0, 4]} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid hsl(var(--primary) / 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="gpa" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3} 
                  dot={{ r: 6, fill: "hsl(var(--primary))" }} 
                  activeDot={{ r: 8, fill: "hsl(var(--primary))", stroke: "white", strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Grade Distribution</h2>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Award className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="grade" />
                <YAxis allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid hsl(var(--primary) / 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Academic Records</h2>
          <Select 
            value={termFilter} 
            onValueChange={setTermFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Term</SelectItem>
              <SelectItem value="spring2023">Spring 2023</SelectItem>
              <SelectItem value="winter2022">Winter 2022</SelectItem>
              <SelectItem value="fall2022">Fall 2022</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="justify-left mb-8">
            <TabsTrigger value="courses" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200">
              Courses
            </TabsTrigger>
            <TabsTrigger value="assignments" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200">
              Assignments
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses">
            <div className="grid gap-6">
              {courseGrades.map(course => (
                <Card key={course.id} className="p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-primary/20">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                      <p className="text-muted-foreground">{course.code} • {course.instructor}</p>
                    </div>
                    
                    <div className="flex items-center bg-primary/10 px-5 py-3 rounded-xl">
                      <div className="pr-4 border-r border-primary/20">
                        <p className="text-2xl font-bold text-primary">{course.grade}</p>
                      </div>
                      <div className="pl-4">
                        <p className="text-base font-medium text-primary">{course.percentage}%</p>
                        <p className="text-xs text-muted-foreground">{course.credits} credits</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Course Progress</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Link href={`/dashboard/student/courses/${course.id}`}>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                        View Course
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="assignments">
            <div className="grid gap-6">
              {assignmentGrades.map(assignment => (
                <Card key={assignment.id} className="p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-primary/20">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{assignment.title}</h3>
                      <p className="text-muted-foreground">{assignment.course} • Submitted: {new Date(assignment.submitted).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="flex items-center bg-primary/10 px-5 py-3 rounded-xl">
                      <div className="pr-4 border-r border-primary/20">
                        <p className="text-2xl font-bold text-primary">{assignment.grade}</p>
                      </div>
                      <div className="pl-4">
                        <p className="text-base font-medium text-primary">{assignment.score}/{assignment.maxScore}</p>
                        <p className="text-xs text-muted-foreground">Weight: {assignment.weight}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Link href={`/dashboard/student/assignments/${assignment.id}`}>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                        View Feedback
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 