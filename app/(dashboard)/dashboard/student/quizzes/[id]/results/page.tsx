"use client"

import { useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle, Award, ArrowRight } from "lucide-react"

// Mock function to get quiz results
async function getQuizResults(id: string) {
  // In a real app, this would fetch from an API
  return {
    id,
    title: "Linear Equations Quiz",
    subject: "Mathematics",
    score: 80,
    maxScore: 100,
    timeSpent: "22:45", // mm:ss
    completedAt: "2023-04-14T15:30:00Z",
    feedback: "Good work on understanding the basic concepts of linear equations. You need to review how to identify non-linear equations.",
    questionResults: [
      {
        id: 1,
        text: "Which of the following is the standard form of a linear equation?",
        userAnswer: "b",
        correctAnswer: "b",
        isCorrect: true,
        explanation: "The standard form of a linear equation is ax + b = c, where a, b, and c are constants."
      },
      {
        id: 2,
        text: "Solve for x: 3x + 5 = 11",
        userAnswer: "b",
        correctAnswer: "b",
        isCorrect: true,
        explanation: "3x + 5 = 11\n3x = 6\nx = 2"
      },
      {
        id: 3,
        text: "A linear equation can have more than one variable.",
        userAnswer: true,
        correctAnswer: true,
        isCorrect: true,
        explanation: "Yes, linear equations can have multiple variables, as long as each variable has a power of 1."
      },
      {
        id: 4,
        text: "Which of the following is NOT a linear equation?",
        userAnswer: "a",
        correctAnswer: "c",
        isCorrect: false,
        explanation: "x² + y = 9 is not a linear equation because it contains a variable with a power greater than 1 (x²)."
      },
      {
        id: 5,
        text: "Explain in your own words what a linear equation is and provide an example.",
        userAnswer: "A linear equation is an equation where each variable has a power of 1. An example is y = 2x + 3.",
        isCorrect: true,
        score: 9,
        maxScore: 10,
        feedback: "Good definition. You could have mentioned that all variables appear only to the first power and are not multiplied together."
      }
    ],
    recommendations: [
      "Review the characteristics of non-linear equations",
      "Practice more word problems involving linear equations",
      "Try some multi-variable linear equation systems"
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

export default async function QuizResultsPage({ params }: { params: { id: string } }) {
  const results = await getQuizResults(params.id)
  
  if (!results) {
    notFound()
  }

  const [selectedQuestion, setSelectedQuestion] = useState(0)
  
  const handleNext = () => {
    if (selectedQuestion < results.questionResults.length - 1) {
      setSelectedQuestion(selectedQuestion + 1)
    }
  }
  
  const handlePrevious = () => {
    if (selectedQuestion > 0) {
      setSelectedQuestion(selectedQuestion - 1)
    }
  }

  const question = results.questionResults[selectedQuestion]

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Link href="/dashboard/student/quizzes">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Quizzes
          </Button>
        </Link>
      </div>
      
      <Card className="p-8 shadow-lg mb-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8 border-b pb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{results.title} - Results</h1>
            <p className="text-muted-foreground">{results.subject}</p>
          </div>
          
          <div className="flex items-center bg-primary/10 p-4 rounded-xl gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{results.score}%</p>
              <p className="text-sm text-muted-foreground">Your Score</p>
            </div>
            <div className="h-12 w-[1px] bg-primary/20"></div>
            <div>
              <p className="text-sm font-medium">
                {results.score >= 70 ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Passed
                  </span>
                ) : (
                  <span className="flex items-center text-red-500">
                    <XCircle className="h-4 w-4 mr-1" />
                    Not Passed
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">Completed: {new Date(results.completedAt).toLocaleDateString()}</p>
              <p className="text-sm text-muted-foreground">Time Spent: {results.timeSpent}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Performance</h2>
          <div className="mb-6">
            <div className="flex justify-between mb-2 text-sm">
              <span>Score</span>
              <span>{results.score}%</span>
            </div>
            <Progress value={results.score} className="h-2.5" />
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-start gap-2 mb-1">
              <Award className="h-5 w-5 text-primary mt-0.5" />
              <h3 className="font-medium">Instructor Feedback</h3>
            </div>
            <p className="text-muted-foreground pl-7">{results.feedback}</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Question Review</h2>
          <div className="mb-6">
            <div className="flex justify-between mb-2 text-sm">
              <span>Question {selectedQuestion + 1} of {results.questionResults.length}</span>
              <span>
                {question.isCorrect ? (
                  <span className="text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Correct
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center">
                    <XCircle className="h-4 w-4 mr-1" />
                    Incorrect
                  </span>
                )}
              </span>
            </div>
            <Progress 
              value={((selectedQuestion + 1) / results.questionResults.length) * 100} 
              className="h-2"
            />
          </div>
          
          <Card className="border p-6 mb-4">
            <h3 className="font-semibold text-lg mb-4">{question.text}</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Your Answer:</h4>
                <p className={question.isCorrect ? "text-green-600" : "text-red-500"}>
                  {typeof question.userAnswer === 'boolean'
                    ? question.userAnswer ? 'True' : 'False'
                    : question.userAnswer}
                </p>
              </div>
              
              {!question.isCorrect && (
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2 text-green-700 dark:text-green-400">Correct Answer:</h4>
                  <p className="text-green-700 dark:text-green-400">
                    {typeof question.correctAnswer === 'boolean'
                      ? question.correctAnswer ? 'True' : 'False'
                      : question.correctAnswer}
                  </p>
                </div>
              )}
              
              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2 text-blue-700 dark:text-blue-400">Explanation:</h4>
                <p className="text-blue-700 dark:text-blue-400 whitespace-pre-line">{question.explanation}</p>
              </div>
              
              {question.feedback && (
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2 text-primary">Feedback:</h4>
                  <p className="text-primary/80">{question.feedback}</p>
                </div>
              )}
            </div>
          </Card>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious} 
              disabled={selectedQuestion === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={selectedQuestion === results.questionResults.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <ul className="space-y-2">
            {results.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary mt-1 shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <Button className="gap-2">
              <Award className="h-4 w-4" />
              Review Similar Quizzes
            </Button>
            <Link href={`/dashboard/student/courses`}>
              <Button variant="outline" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Continue Learning
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
} 