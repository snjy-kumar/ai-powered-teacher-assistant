"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Book, Brain, Clock, Trophy, CalendarDays, TrendingUp, ChevronRight, Bell, BookOpen, FileText, CheckCircle, MessageCircle, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const performanceData = [
  { week: 'Week 1', score: 85 },
  { week: 'Week 2', score: 78 },
  { week: 'Week 3', score: 92 },
  { week: 'Week 4', score: 88 },
]

const upcomingAssignments = [
  { title: "Literature Essay", due: "Tomorrow", subject: "English" },
  { title: "Math Quiz", due: "In 2 days", subject: "Mathematics" },
  { title: "Science Project", due: "Next week", subject: "Physics" },
]

export default function StudentDashboard() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground max-w-3xl">Track your progress, manage assignments, and improve your academic performance</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Brain className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Grade</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">88%</p>
                <span className="text-xs text-green-500 font-medium pb-1">+3%</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Book className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">24/30</p>
                <span className="text-xs text-amber-500 font-medium pb-1">6 pending</span>
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
              <p className="text-sm text-muted-foreground">Study Time</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">32h</p>
                <span className="text-xs text-green-500 font-medium pb-1">this month</span>
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
              <p className="text-sm text-muted-foreground">Achievements</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">12</p>
                <span className="text-xs text-blue-500 font-medium pb-1">+2 new</span>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="md:col-span-2 lg:col-span-4 mt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/student/courses">
              <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                <BookOpen className="h-5 w-5 mb-1" />
                <span>My Courses</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/student/assignments">
              <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                <FileText className="h-5 w-5 mb-1" />
                <span>Assignments</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/student/quizzes">
              <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                <CheckCircle className="h-5 w-5 mb-1" />
                <span>Quizzes</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/student/grades">
              <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                <TrendingUp className="h-5 w-5 mb-1" />
                <span>Grades</span>
              </Button>
            </Link>
            
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
            
            <Link href="/dashboard/student/feedback">
              <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                <Bell className="h-5 w-5 mb-1" />
                <span>Feedback</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/profile">
              <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                <User className="h-5 w-5 mb-1" />
                <span>Profile</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-10">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Performance Overview
            </h2>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="week" />
                <YAxis domain={[60, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid hsl(var(--primary) / 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
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
            <h2 className="text-xl font-semibold flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-primary" />
              Upcoming Assignments
            </h2>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-4">
            {upcomingAssignments.map((assignment, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-muted rounded-lg hover:bg-muted/50 transition-colors group">
                <div>
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className={`font-medium ${
                      assignment.due.includes("Tomorrow") ? "text-red-500" : 
                      assignment.due.includes("2 days") ? "text-amber-500" : "text-primary"
                    }`}>
                      {assignment.due}
                    </p>
                    <p className="text-xs text-muted-foreground">Due date</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Link href="/dashboard/student/assignments">
                <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5 font-medium text-sm">
                  View All Assignments
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-xl mb-8 w-full sm:w-auto mx-auto flex justify-center">
          <TabsTrigger 
            value="courses" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <Book className="w-4 h-4 mr-2" />
            Active Courses
          </TabsTrigger>
          <TabsTrigger 
            value="skills" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <Brain className="w-4 h-4 mr-2" />
            Career Skills
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Mathematics 101</h3>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Book className="h-5 w-5 text-primary" />
                </div>
              </div>
              <Progress value={85} className="mb-3 h-2.5 rounded-full" />
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">85% Complete</p>
                <span className="text-sm font-medium text-primary">Grade: A-</span>
              </div>
              <div className="mt-2 flex justify-end">
                <Link href="/dashboard/student/courses/math-101">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                    Go to Course
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
            
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">English Literature</h3>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Book className="h-5 w-5 text-primary" />
                </div>
              </div>
              <Progress value={72} className="mb-3 h-2.5 rounded-full" />
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">72% Complete</p>
                <span className="text-sm font-medium text-primary">Grade: B+</span>
              </div>
              <div className="mt-2 flex justify-end">
                <Link href="/dashboard/student/courses/english-lit">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                    Go to Course
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
            
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Computer Science</h3>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Book className="h-5 w-5 text-primary" />
                </div>
              </div>
              <Progress value={93} className="mb-3 h-2.5 rounded-full" />
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">93% Complete</p>
                <span className="text-sm font-medium text-primary">Grade: A+</span>
              </div>
              <div className="mt-2 flex justify-end">
                <Link href="/dashboard/student/courses/cs-intro">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5">
                    Go to Course
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skills" className="mt-0">
          <div className="bg-muted/20 p-8 rounded-lg mb-6">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Career-Ready Skills Assessment</h3>
                <p className="text-muted-foreground">Track your progress on key career skills</p>
              </div>
              <Link href="/dashboard/student/career-planning">
                <Button className="mt-4 md:mt-0">Career Planning</Button>
              </Link>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 mt-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Critical Thinking</span>
                    <span className="font-semibold text-primary">85%</span>
                  </div>
                  <Progress value={85} className="h-2.5 rounded-full" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Communication</span>
                    <span className="font-semibold text-primary">72%</span>
                  </div>
                  <Progress value={72} className="h-2.5 rounded-full" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Problem Solving</span>
                    <span className="font-semibold text-primary">90%</span>
                  </div>
                  <Progress value={90} className="h-2.5 rounded-full" />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Teamwork</span>
                    <span className="font-semibold text-primary">88%</span>
                  </div>
                  <Progress value={88} className="h-2.5 rounded-full" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Digital Literacy</span>
                    <span className="font-semibold text-primary">95%</span>
                  </div>
                  <Progress value={95} className="h-2.5 rounded-full" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">Time Management</span>
                    <span className="font-semibold text-primary">65%</span>
                  </div>
                  <Progress value={65} className="h-2.5 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Suggested Career Paths</h3>
                <p className="text-sm text-muted-foreground">Based on your strengths and interests</p>
              </div>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span className="text-muted-foreground">Software Development</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span className="text-muted-foreground">Data Analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span className="text-muted-foreground">Product Management</span>
                </li>
              </ul>
              <Link href="/dashboard/student/career-paths">
                <Button variant="outline" size="sm" className="w-full">Explore Career Paths</Button>
              </Link>
            </Card>
            
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Recommended Certifications</h3>
                <p className="text-sm text-muted-foreground">Enhance your career prospects</p>
              </div>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span className="text-muted-foreground">Web Development Fundamentals</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span className="text-muted-foreground">Introduction to Data Science</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span className="text-muted-foreground">Project Management Basics</span>
                </li>
              </ul>
              <Link href="/dashboard/student/certifications">
                <Button variant="outline" size="sm" className="w-full">Browse Certifications</Button>
              </Link>
            </Card>
            
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2">Skill Improvement</h3>
                <p className="text-sm text-muted-foreground">Suggested areas to focus on</p>
              </div>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500 mt-2 mr-2"></span>
                  <span className="text-muted-foreground">Time Management</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500 mt-2 mr-2"></span>
                  <span className="text-muted-foreground">Public Speaking</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-500 mt-2 mr-2"></span>
                  <span className="text-muted-foreground">Advanced Writing</span>
                </li>
              </ul>
              <Link href="/dashboard/student/skill-development">
                <Button variant="outline" size="sm" className="w-full">Develop Skills</Button>
              </Link>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}