"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, BookOpen, GraduationCap, Clock, CheckCircle2, ChevronRight, Calendar, MessageCircle, User } from "lucide-react"
import Link from "next/link"

const classPerformance = [
  { class: 'Class A', average: 85 },
  { class: 'Class B', average: 78 },
  { class: 'Class C', average: 92 },
  { class: 'Class D', average: 88 },
]

const recentSubmissions = [
  { student: "Alice Smith", assignment: "Math Quiz 3", grade: "95%", status: "Graded" },
  { student: "Bob Johnson", assignment: "English Essay", grade: "Pending", status: "Submitted" },
  { student: "Carol Williams", assignment: "Science Project", grade: "88%", status: "Graded" },
]

export default function TeacherDashboard() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-muted-foreground max-w-3xl">Manage your classes, track student progress, and create assignments</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Create new content for your students</p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/dashboard/teacher/create-assignment">
            <Button className="bg-primary hover:bg-primary/90 shadow-md flex items-center gap-2 px-6 h-11">
              <BookOpen className="h-4 w-4" />
              Create Assignment
            </Button>
          </Link>
          <Link href="/dashboard/teacher/create-quiz">
            <Button variant="outline" className="hover:bg-primary/10 shadow-sm flex items-center gap-2 px-6 h-11">
              <GraduationCap className="h-4 w-4" />
              Create Quiz
            </Button>
          </Link>
          <Link href="/dashboard/teacher/analytics">
            <Button variant="outline" className="hover:bg-primary/10 shadow-sm flex items-center gap-2 px-6 h-11">
              <BarChart className="h-4 w-4" />
              Analytics
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">124</p>
                <span className="text-xs text-green-500 font-medium pb-1">+4 new</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">8</p>
                <span className="text-xs text-blue-500 font-medium pb-1">Fall semester</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Grade</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">85%</p>
                <span className="text-xs text-green-500 font-medium pb-1">+3% this month</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Clock className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Reviews</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">12</p>
                <span className="text-xs text-amber-500 font-medium pb-1">Needs attention</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-10">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Class Performance</h2>
            <div className="p-2 bg-primary/10 rounded-lg">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classPerformance}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="class" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid hsl(var(--primary) / 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
                <Bar 
                  dataKey="average" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Submissions</h2>
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-4">
            {recentSubmissions.map((submission, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-muted rounded-lg hover:bg-muted/50 transition-colors group">
                <div>
                  <p className="font-medium">{submission.student}</p>
                  <p className="text-sm text-muted-foreground">{submission.assignment}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className={`font-medium ${submission.grade === "Pending" ? "text-amber-500" : "text-primary"}`}>
                      {submission.grade}
                    </p>
                    <p className="text-xs text-muted-foreground">{submission.status}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5 font-medium text-sm">
                View All Submissions
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="assignments" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-xl mb-8 w-full sm:w-auto mx-auto flex justify-center">
          <TabsTrigger 
            value="assignments" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Assignments
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="assignments" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Mathematics - Class A</h3>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
              </div>
              <Progress value={75} className="mb-3 h-2.5 rounded-full" />
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">75% Submissions</p>
                <span className="text-sm font-medium text-primary">15/20 Students</span>
              </div>
              <div className="mt-2 flex justify-end">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                  Review
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">English - Class B</h3>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
              </div>
              <Progress value={90} className="mb-3 h-2.5 rounded-full" />
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">90% Submissions</p>
                <span className="text-sm font-medium text-primary">18/20 Students</span>
              </div>
              <div className="mt-2 flex justify-end">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                  Review
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Science - Class C</h3>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
              </div>
              <Progress value={65} className="mb-3 h-2.5 rounded-full" />
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">65% Submissions</p>
                <span className="text-sm font-medium text-primary">13/20 Students</span>
              </div>
              <div className="mt-2 flex justify-end">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                  Review
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="mt-0">
          <Card className="p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-semibold text-xl">Overall Class Progress</h3>
              <div className="p-2.5 bg-primary/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Assignment Completion Rate</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-primary mr-2">85%</span>
                    <span className="text-xs text-green-500 font-medium">+5% this month</span>
                  </div>
                </div>
                <Progress value={85} className="h-2.5 rounded-full" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Average Quiz Score</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-primary mr-2">78%</span>
                    <span className="text-xs text-amber-500 font-medium">-2% this month</span>
                  </div>
                </div>
                <Progress value={78} className="h-2.5 rounded-full" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Student Engagement</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-primary mr-2">92%</span>
                    <span className="text-xs text-green-500 font-medium">+8% this month</span>
                  </div>
                </div>
                <Progress value={92} className="h-2.5 rounded-full" />
              </div>
            </div>
            
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              <div className="bg-muted/20 p-5 rounded-lg">
                <h4 className="font-medium mb-4 flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                  High Performance Areas
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                    <span className="text-muted-foreground">Student participation in Class C</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                    <span className="text-muted-foreground">Assignment completion in English courses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                    <span className="text-muted-foreground">Overall student engagement this semester</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted/20 p-5 rounded-lg">
                <h4 className="font-medium mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-amber-500" />
                  Areas Needing Attention
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-500 mt-2 mr-2"></span>
                    <span className="text-muted-foreground">Quiz scores in Mathematics - Class B</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-500 mt-2 mr-2"></span>
                    <span className="text-muted-foreground">Late submissions in Science class</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber-500 mt-2 mr-2"></span>
                    <span className="text-muted-foreground">Attendance rates for early morning classes</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/dashboard/calendar">
          <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
            <Calendar className="h-5 w-5 mb-1" />
            <span>Calendar</span>
          </Button>
        </Link>
        
        <Link href="/dashboard/messages">
          <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
            <MessageCircle className="h-5 w-5 mb-1" />
            <span>Messages</span>
          </Button>
        </Link>
        
        <Link href="/dashboard/profile">
          <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
            <User className="h-5 w-5 mb-1" />
            <span>Profile</span>
          </Button>
        </Link>
        
        <Link href="/dashboard/teacher/analytics">
          <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
            <BarChart className="h-5 w-5 mb-1" />
            <span>Analytics</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}