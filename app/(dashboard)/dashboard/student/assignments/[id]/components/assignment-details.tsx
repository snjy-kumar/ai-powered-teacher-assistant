"use client"

import { Card } from "@/components/ui/card"
import { FileText, BookOpen, CheckCircle, ExternalLink, Play } from "lucide-react"
import { Assignment } from "../api/get-assignment"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AssignmentDetails({ assignment }: { assignment: Assignment }) {
  const [activeCard, setActiveCard] = useState<string>("details")
  
  return (
    <>
      <div className="md:col-span-2">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Assignment Details</h2>
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="text-muted-foreground mb-6">{assignment.description}</p>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Requirements</h3>
            <ul className="space-y-2 ml-5 list-disc text-muted-foreground">
              {assignment.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Resources</h3>
            <div className="space-y-2">
              {assignment.resources.map((resource, index) => (
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  key={index} 
                  className="flex items-center p-3 border rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
                >
                  {resource.type === 'pdf' ? (
                    <FileText className="h-5 w-5 mr-3 text-red-500" />
                  ) : resource.type === 'video' ? (
                    <Play className="h-5 w-5 mr-3 text-purple-500" />
                  ) : (
                    <BookOpen className="h-5 w-5 mr-3 text-blue-500" />
                  )}
                  <span className="flex-1">{resource.title}</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Grading Rubric</h2>
          <div className="p-2 bg-primary/10 rounded-lg">
            <CheckCircle className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="space-y-4">
          {assignment.rubric.map((item, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">{item.criterion}</h4>
                <span className="text-primary font-medium">{item.points} pts</span>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Points</span>
            <span className="text-primary font-medium">
              {assignment.rubric.reduce((sum, item) => sum + item.points, 0)} pts
            </span>
          </div>
        </div>
      </Card>
    </>
  )
} 