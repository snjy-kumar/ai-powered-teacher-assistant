"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, Clock, AlertCircle } from "lucide-react"

// Mock function to get quiz data
async function getQuiz(id: string) {
  // In a real app, this would fetch from an API
  return {
    id,
    title: "Linear Equations Quiz",
    subject: "Mathematics",
    totalQuestions: 5,
    timeLimit: 30, // minutes
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        text: "Which of the following is the standard form of a linear equation?",
        options: [
          { id: "a", text: "ax² + bx + c = 0" },
          { id: "b", text: "ax + b = c" },
          { id: "c", text: "a/x + b = c" },
          { id: "d", text: "a + b = cx" }
        ],
        correctAnswer: "b"
      },
      {
        id: 2,
        type: "multiple-choice",
        text: "Solve for x: 3x + 5 = 11",
        options: [
          { id: "a", text: "x = 1" },
          { id: "b", text: "x = 2" },
          { id: "c", text: "x = 3" },
          { id: "d", text: "x = 4" }
        ],
        correctAnswer: "b"
      },
      {
        id: 3,
        type: "true-false",
        text: "A linear equation can have more than one variable.",
        correctAnswer: true
      },
      {
        id: 4,
        type: "multiple-choice",
        text: "Which of the following is NOT a linear equation?",
        options: [
          { id: "a", text: "2x + 3 = 7" },
          { id: "b", text: "y = 2x + 1" },
          { id: "c", text: "x² + y = 9" },
          { id: "d", text: "3x - 2y = 8" }
        ],
        correctAnswer: "c"
      },
      {
        id: 5,
        type: "short-answer",
        text: "Explain in your own words what a linear equation is and provide an example.",
        maxWords: 50
      }
    ]
  }
}

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    // Add more IDs as needed
  ]
}

export default async function QuizPage({ params }: { params: { id: string } }) {
  const quiz = await getQuiz(params.id)
  const router = useRouter()
  
  if (!quiz) {
    notFound()
  }

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60) // seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }
  
  const handleAnswer = (value: any) => {
    setAnswers({
      ...answers,
      [quiz.questions[currentQuestion].id]: value
    })
  }
  
  const handleSubmit = () => {
    setIsSubmitting(true)
    
    // In a real app, you would send the answers to the server here
    setTimeout(() => {
      router.push(`/dashboard/student/quizzes/${params.id}/results`)
    }, 1500)
  }
  
  // Format time remaining as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <Link href="/dashboard/student/quizzes">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Exit Quiz
          </Button>
        </Link>
        
        <div className="flex items-center gap-2 text-amber-500 bg-amber-50 dark:bg-amber-950/20 px-4 py-2 rounded-full">
          <Clock className="h-4 w-4" />
          <span className="font-medium">{formatTime(timeRemaining)}</span>
        </div>
      </div>
      
      <Card className="p-8 shadow-lg mb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <p>Subject: {quiz.subject}</p>
            <p>•</p>
            <p>Questions: {quiz.totalQuestions}</p>
            <p>•</p>
            <p>Time Limit: {quiz.timeLimit} minutes</p>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2 text-sm">
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <span>{progress.toFixed(0)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-6">
            {question.text}
          </h2>
          
          {question.type === "multiple-choice" && (
            <RadioGroup 
              value={answers[question.id] || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {question.options.map(option => (
                <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
          
          {question.type === "true-false" && (
            <RadioGroup 
              value={answers[question.id]?.toString() || ""}
              onValueChange={val => handleAnswer(val === "true")}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="true" id="true" />
                <Label htmlFor="true" className="flex-grow cursor-pointer">True</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="false" id="false" />
                <Label htmlFor="false" className="flex-grow cursor-pointer">False</Label>
              </div>
            </RadioGroup>
          )}
          
          {question.type === "short-answer" && (
            <div className="space-y-2">
              <Textarea 
                placeholder="Write your answer here..."
                className="min-h-[120px]"
                value={answers[question.id] || ""}
                onChange={e => handleAnswer(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Maximum {question.maxWords} words
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious} 
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          {currentQuestion < quiz.questions.length - 1 ? (
            <Button 
              onClick={handleNext}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          )}
        </div>
      </Card>
      
      <div className="grid grid-cols-5 gap-2">
        {quiz.questions.map((_, index) => (
          <Button
            key={index}
            variant={answers[quiz.questions[index].id] ? "default" : "outline"}
            size="sm"
            className={`h-10 ${currentQuestion === index ? "ring-2 ring-primary" : ""}`}
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )
} 