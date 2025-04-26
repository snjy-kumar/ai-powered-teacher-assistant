"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BookOpen, Clock, BrainCircuit, Calendar, Bell, FileText, CheckCircle, TrendingUp } from "lucide-react"
import Link from "next/link"

const performanceData = [
  { subject: 'Math', score: 85 },
  { subject: 'English', score: 92 },
  { subject: 'Science', score: 78 },
  { subject: 'History', score: 88 },
]

const upcomingAssignments = [
  {
    id: 1,
    title: "Literary Analysis Essay",
    subject: "English Literature",
    dueDate: "2024-04-15",
    daysLeft: 3
  },
  {
    id: 2,
    title: "Mathematical Problem Set",
    subject: "Advanced Mathematics",
    dueDate: "2024-04-18",
    daysLeft: 6
  },
]

const upcomingClasses = [
  {
    subject: "Advanced Mathematics",
    time: "09:00 AM - 10:30 AM",
    teacher: "Dr. Johnson",
    room: "Room 105"
  },
  {
    subject: "World History",
    time: "11:00 AM - 12:30 PM",
    teacher: "Prof. Williams",
    room: "Room 210"
  },
  {
    subject: "Physics Lab",
    time: "02:00 PM - 03:30 PM",
    teacher: "Dr. Miller",
    room: "Lab 3"
  }
]

export default function StudentDashboard() {
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome, Student</h1>
        <p className="text-muted-foreground">Your learning journey at a glance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">5</p>
                <span className="text-xs text-blue-500 font-medium pb-1">Current Semester</span>
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
              <p className="text-sm text-muted-foreground">Pending Tasks</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">8</p>
                <span className="text-xs text-amber-500 font-medium pb-1">2 due today</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <CheckCircle className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">GPA</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">3.8</p>
                <span className="text-xs text-green-500 font-medium pb-1">+0.2 this semester</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <BrainCircuit className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Study Streak</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">12</p>
                <span className="text-xs text-green-500 font-medium pb-1">Days</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-10">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Performance</h2>
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="subject" />
                <YAxis domain={[50, 100]} />
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
            <h2 className="text-xl font-semibold">Upcoming Assignments</h2>
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <Link key={assignment.id} href={`/dashboard/student/assignments/${assignment.id}`}>
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    </div>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      assignment.daysLeft <= 3 ? 'bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400' : 
                      'bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400'
                    }`}>
                      {assignment.daysLeft} days left
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/dashboard/student/assignments">
              <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5">
                View All Assignments
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-xl mb-8 w-full sm:w-auto mx-auto flex justify-center">
          <TabsTrigger 
            value="today" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Today's Schedule
          </TabsTrigger>
          <TabsTrigger 
            value="calendar" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-0">
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Today's Classes</h3>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
              </div>
              
              <div className="space-y-4">
                {upcomingClasses.map((classItem, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="mb-2 md:mb-0">
                      <h4 className="font-medium">{classItem.subject}</h4>
                      <p className="text-sm text-muted-foreground">{classItem.teacher}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1.5 text-primary" />
                          <span>{classItem.time}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <BookOpen className="h-3.5 w-3.5 mr-1.5 text-primary" />
                          <span>{classItem.room}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Join</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-0">
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Recent Notifications</h3>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                  <p className="text-sm font-medium">New assignment posted in Advanced Mathematics</p>
                  <p className="text-xs text-muted-foreground mt-1">Today, 10:45 AM</p>
                </div>
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/10 rounded-r-lg">
                  <p className="text-sm font-medium">Your Science Project has been graded: 95%</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday, 3:22 PM</p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/10 rounded-r-lg">
                  <p className="text-sm font-medium">Class schedule updated for next week</p>
                  <p className="text-xs text-muted-foreground mt-1">Apr 10, 11:15 AM</p>
                </div>
                <div className="p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/10 rounded-r-lg">
                  <p className="text-sm font-medium">Reminder: English Literature essay due in 3 days</p>
                  <p className="text-xs text-muted-foreground mt-1">Apr 9, 9:30 AM</p>
                </div>
              </div>
              
              <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5">
                View All Notifications
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}