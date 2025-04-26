"use client"

import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Assignment } from "../api/get-assignment"

export function AssignmentHeader({ assignment }: { assignment: Assignment }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{assignment.title}</h1>
        <p className="text-muted-foreground">{assignment.subject}</p>
      </div>

      <div className="mt-4 md:mt-0 flex items-center gap-6">
        <div className="flex items-center text-amber-600 dark:text-amber-400">
          <Clock className="h-5 w-5 mr-2" />
          <div>
            <p className="text-sm font-medium">Due Date</p>
            <p className="text-sm">{new Date(assignment.dueDate).toLocaleDateString()}</p>
          </div>
        </div>
        <Button>Save & Submit</Button>
      </div>
    </div>
  )
} 