"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Award, BookOpen, Check, TrendingUp } from "lucide-react"

const performanceData = [
  { assignment: 'Essay 1', score: 85 },
  { assignment: 'Quiz 1', score: 92 },
  { assignment: 'Project', score: 88 },
  { assignment: 'Essay 2', score: 90 },
]

const feedbackHistory = [
  {
    id: 1,
    assignment: "Literary Analysis Essay",
    subject: "English Literature",
    grade: "A",
    score: 95,
    feedback: "Excellent analysis of the themes. Your writing demonstrates a deep understanding of the text. Consider incorporating more specific textual evidence to strengthen your arguments further.",
    strengths: ["Critical thinking", "Writing structure", "Theme analysis"],
    improvements: ["Citation usage", "Conclusion impact"],
  },
  {
    id: 2,
    assignment: "Research Project",
    subject: "History",
    grade: "B+",
    score: 88,
    feedback: "Good research methodology and presentation. The historical context was well-explained. To improve, focus on developing stronger connections between different historical events.",
    strengths: ["Research depth", "Presentation clarity"],
    improvements: ["Historical connections", "Source variety"],
  },
]

export default function StudentFeedback() {
  return (
    <div className="container py-8 max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Feedback & Progress</h1>
        <p className="text-muted-foreground">Track your academic performance and teacher feedback</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-12">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Performance Trend
            </h2>
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="assignment" />
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
              <Award className="mr-2 h-5 w-5 text-primary" />
              Skills Assessment
            </h2>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Check className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-3">
                <span className="font-medium">Critical Thinking</span>
                <span className="font-semibold text-primary">85%</span>
              </div>
              <Progress value={85} className="h-2.5 rounded-full" />
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <span className="font-medium">Writing Skills</span>
                <span className="font-semibold text-primary">90%</span>
              </div>
              <Progress value={90} className="h-2.5 rounded-full" />
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <span className="font-medium">Research Ability</span>
                <span className="font-semibold text-primary">78%</span>
              </div>
              <Progress value={78} className="h-2.5 rounded-full" />
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <span className="font-medium">Problem Solving</span>
                <span className="font-semibold text-primary">82%</span>
              </div>
              <Progress value={82} className="h-2.5 rounded-full" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="detailed" className="w-full">
        <TabsList className="w-full md:w-auto mx-auto flex justify-center mb-8 bg-muted/50 p-1 rounded-xl">
          <TabsTrigger 
            value="detailed" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            Detailed Feedback
          </TabsTrigger>
          <TabsTrigger 
            value="summary" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="detailed">
          <div className="space-y-8">
            {feedbackHistory.map((item) => (
              <Card key={item.id} className="p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">{item.assignment}</h3>
                    <p className="text-sm text-muted-foreground">{item.subject}</p>
                  </div>
                  <div className="flex items-center bg-primary/10 px-4 py-3 rounded-xl">
                    <div className="pr-4 border-r border-primary/20">
                      <span className="text-3xl font-bold text-primary">{item.grade}</span>
                    </div>
                    <div className="pl-4">
                      <p className="text-sm font-medium text-primary">{item.score}%</p>
                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-primary" />
                      Feedback
                    </h4>
                    <p className="text-muted-foreground">{item.feedback}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 text-green-700 dark:text-green-400 flex items-center">
                        <Check className="h-4 w-4 mr-2" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {item.strengths.map((strength, index) => (
                          <li key={index} className="text-muted-foreground flex items-start">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mt-2 mr-2"></span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 text-amber-700 dark:text-amber-400 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-2">
                        {item.improvements.map((improvement, index) => (
                          <li key={index} className="text-muted-foreground flex items-start">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500 mt-2 mr-2"></span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="summary">
          <Card className="p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold">Overall Progress Summary</h3>
              <div className="p-2.5 bg-primary/10 rounded-lg">
                <Award className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Academic Performance</h4>
                  <span className="font-semibold text-primary">88%</span>
                </div>
                <Progress value={88} className="mb-4 h-3 rounded-full" />
                <p className="text-muted-foreground bg-muted/30 p-4 rounded-lg">
                  Your overall academic performance is strong, with consistent improvement in writing and analytical skills.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted/20 p-5 rounded-lg">
                  <h4 className="font-medium mb-4 flex items-center">
                    <Check className="h-5 w-5 mr-2 text-primary" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                      <span className="text-muted-foreground">Excellent progress in critical analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                      <span className="text-muted-foreground">Strong improvement in research methodology</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                      <span className="text-muted-foreground">Consistent high performance in written assignments</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/20 p-5 rounded-lg">
                  <h4 className="font-medium mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Focus Areas
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                      <span className="text-muted-foreground">Continue developing citation skills</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                      <span className="text-muted-foreground">Enhance connections between concepts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-2"></span>
                      <span className="text-muted-foreground">Work on diversifying research sources</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}