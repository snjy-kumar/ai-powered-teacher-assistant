"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2 } from "lucide-react"

export default function CreateQuiz() {
  const [questions, setQuestions] = useState([
    { question: "", type: "multiple-choice", options: ["", "", "", ""], correctAnswer: "" }
  ])

  const addQuestion = () => {
    setQuestions([...questions, { question: "", type: "multiple-choice", options: ["", "", "", ""], correctAnswer: "" }])
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Create Quiz</h1>

      <Card className="p-6 mb-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="quiz-title">Quiz Title</Label>
            <Input id="quiz-title" placeholder="Enter quiz title" />
          </div>
          
          <div>
            <Label htmlFor="quiz-description">Description</Label>
            <Textarea id="quiz-description" placeholder="Enter quiz description" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input id="duration" type="number" placeholder="Enter duration" />
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <Card key={index} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Question {index + 1}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeQuestion(index)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Question Text</Label>
                <Textarea placeholder="Enter your question" />
              </div>

              <div>
                <Label>Question Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="true-false">True/False</SelectItem>
                    <SelectItem value="short-answer">Short Answer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Options</Label>
                {question.options.map((_, optionIndex) => (
                  <Input
                    key={optionIndex}
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                ))}
              </div>

              <div>
                <Label>Correct Answer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select correct answer" />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options.map((_, optionIndex) => (
                      <SelectItem
                        key={optionIndex}
                        value={`option-${optionIndex + 1}`}
                      >
                        Option {optionIndex + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        ))}

        <Button onClick={addQuestion} variant="outline" className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Question
        </Button>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Save as Draft</Button>
          <Button>Publish Quiz</Button>
        </div>
      </div>
    </div>
  )
}