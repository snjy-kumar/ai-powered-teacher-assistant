"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Download, Users, BookOpen, GraduationCap, BrainCircuit, AlertCircle, FileText } from "lucide-react"

const performanceTrends = [
  { month: 'Jan', avgScore: 78, participation: 88 },
  { month: 'Feb', avgScore: 81, participation: 85 },
  { month: 'Mar', avgScore: 80, participation: 90 },
  { month: 'Apr', avgScore: 85, participation: 92 },
  { month: 'May', avgScore: 88, participation: 95 },
  { month: 'Jun', avgScore: 90, participation: 93 },
]

const studentSegmentation = [
  { name: 'High Performers', value: 35 },
  { name: 'Average Performers', value: 45 },
  { name: 'Needs Improvement', value: 20 },
]

const COLORS = ['#4ade80', '#60a5fa', '#f97316']

const subjectPerformance = [
  { subject: 'Math', avgScore: 82 },
  { subject: 'Science', avgScore: 88 },
  { subject: 'English', avgScore: 75 },
  { subject: 'History', avgScore: 80 },
  { subject: 'Art', avgScore: 90 },
]

export default function TeacherAnalytics() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold mb-2">Teacher Analytics</h1>
        <p className="text-muted-foreground max-w-3xl">Track student performance, identify trends, and improve teaching strategies</p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold mb-6 md:mb-0">Performance Overview</h2>
        <Button className="shadow-md flex items-center gap-2 px-6 h-11">
          <Download className="h-4 w-4" />
          Export Analytics
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Class Average</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">83%</p>
                <span className="text-xs text-green-500 font-medium pb-1">+5%</span>
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
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">92%</p>
                <span className="text-xs text-green-500 font-medium pb-1">+3%</span>
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
              <p className="text-sm text-muted-foreground">Pass Rate</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">88%</p>
                <span className="text-xs text-amber-500 font-medium pb-1">-2%</span>
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
              <p className="text-sm text-muted-foreground">Engagement</p>
              <div className="flex items-end gap-1">
                <p className="text-3xl font-bold">85%</p>
                <span className="text-xs text-green-500 font-medium pb-1">+7%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full mb-10">
        <TabsList className="bg-muted/50 p-1 rounded-xl mb-8 w-full sm:w-auto mx-auto flex justify-center">
          <TabsTrigger 
            value="performance" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger 
            value="students" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <Users className="w-4 h-4 mr-2" />
            Students
          </TabsTrigger>
          <TabsTrigger 
            value="subjects" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Subjects
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="mt-0">
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Performance & Participation Trends</h3>
              <div className="p-2 bg-primary/10 rounded-lg">
                <BrainCircuit className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid hsl(var(--primary) / 0.2)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="avgScore" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3} 
                    name="Average Score"
                    dot={{ r: 6, fill: "hsl(var(--primary))" }} 
                    activeDot={{ r: 8, fill: "hsl(var(--primary))", stroke: "white", strokeWidth: 2 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="participation" 
                    stroke="#60a5fa" 
                    strokeWidth={3} 
                    name="Participation"
                    dot={{ r: 6, fill: "#60a5fa" }} 
                    activeDot={{ r: 8, fill: "#60a5fa", stroke: "white", strokeWidth: 2 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 bg-muted/20 p-5 rounded-lg">
              <h4 className="font-medium mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                Key Insights
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span className="text-muted-foreground">Average scores have been steadily increasing since February</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span className="text-muted-foreground">Participation rates peak in May with 95% engagement</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                  <span className="text-muted-foreground">The correlation between participation and scores is strong (0.87)</span>
                </li>
              </ul>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="mt-0">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Student Segmentation</h3>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="h-[300px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={studentSegmentation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {studentSegmentation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 flex items-center justify-around">
                {studentSegmentation.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div style={{ backgroundColor: COLORS[index % COLORS.length] }} className="h-3 w-3 rounded-full mr-2"></div>
                    <span className="text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">At-Risk Students</h3>
                <div className="p-2 bg-amber-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">John Smith</h4>
                    <span className="text-amber-500 font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Missing 3 assignments</span>
                    <span>Last active: 5 days ago</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Emma Johnson</h4>
                    <span className="text-amber-500 font-medium">58%</span>
                  </div>
                  <Progress value={58} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Missing 5 assignments</span>
                    <span>Last active: 7 days ago</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Alex Williams</h4>
                    <span className="text-amber-500 font-medium">62%</span>
                  </div>
                  <Progress value={62} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Missing 2 assignments</span>
                    <span>Last active: 3 days ago</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Intervention Plan
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="subjects" className="mt-0">
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Subject Performance</h3>
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid hsl(var(--primary) / 0.2)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                    }} 
                  />
                  <Bar dataKey="avgScore" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 