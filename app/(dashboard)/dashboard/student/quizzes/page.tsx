"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { GraduationCap, Clock, Search, Calendar, CheckCircle, Award, ArrowRight } from "lucide-react"

// Mock data for quizzes
const quizzes = {
  upcoming: [
    {
      id: "1",
      title: "Linear Equations Quiz",
      subject: "Mathematics",
      dueDate: "2023-04-25T15:30:00Z",
      timeLimit: 30, // minutes
      questions: 5,
      difficulty: "Medium"
    },
    {
      id: "2",
      title: "Grammar and Punctuation",
      subject: "English",
      dueDate: "2023-04-28T14:00:00Z",
      timeLimit: 20,
      questions: 15,
      difficulty: "Easy"
    }
  ],
  completed: [
    {
      id: "3",
      title: "World History: Ancient Civilizations",
      subject: "History",
      completedAt: "2023-04-10T09:45:00Z",
      score: 85,
      totalScore: 100,
      timeSpent: "18:22" // mm:ss
    },
    {
      id: "4",
      title: "Atomic Structure",
      subject: "Science",
      completedAt: "2023-04-05T13:20:00Z",
      score: 92,
      totalScore: 100,
      timeSpent: "24:15"
    },
    {
      id: "5",
      title: "Literary Devices",
      subject: "English",
      completedAt: "2023-03-28T11:05:00Z",
      score: 78,
      totalScore: 100,
      timeSpent: "19:47"
    }
  ]
}

export default function QuizzesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredUpcoming = quizzes.upcoming.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const filteredCompleted = quizzes.completed.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">My Quizzes</h1>
        <p className="text-muted-foreground">Practice and test your knowledge with interactive quizzes</p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder="Search quizzes by title or subject..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No upcoming quizzes found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? "Try a different search term" : "You don't have any upcoming quizzes scheduled"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredUpcoming.map(quiz => (
                <Link key={quiz.id} href={`/dashboard/student/quizzes/${quiz.id}`}>
                  <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-primary/20">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{quiz.title}</h3>
                        <p className="text-muted-foreground">{quiz.subject}</p>
                      </div>
                      
                      <Button>Start Quiz</Button>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          Due: {new Date(quiz.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">{quiz.timeLimit} minutes</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <span className="text-sm">{quiz.questions} questions</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm">Difficulty: {quiz.difficulty}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {filteredCompleted.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No completed quizzes found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? "Try a different search term" : "You haven't completed any quizzes yet"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredCompleted.map(quiz => (
                <Link key={quiz.id} href={`/dashboard/student/quizzes/${quiz.id}/results`}>
                  <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-primary/20">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{quiz.title}</h3>
                        <p className="text-muted-foreground">{quiz.subject}</p>
                      </div>
                      
                      <div className="flex items-center bg-primary/10 px-5 py-4 rounded-xl">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">{quiz.score}%</p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          Completed: {new Date(quiz.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">Time Spent: {quiz.timeSpent}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-primary" />
                        <span className="text-sm">View Details</span>
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