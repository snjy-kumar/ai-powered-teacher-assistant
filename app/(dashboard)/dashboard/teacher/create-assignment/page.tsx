"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"

export default function CreateAssignment() {
  const [dueDate, setDueDate] = useState<Date>()

  return (
    <div className="container max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Create Assignment</h1>
        <p className="text-muted-foreground">Fill in the details to create a new assignment for your students</p>
      </div>

      <Card className="p-8 shadow-lg">
        <form className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">Assignment Title</Label>
            <Input 
              id="title" 
              placeholder="Enter assignment title" 
              className="h-12 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">Assignment Description</Label>
            <Textarea
              id="description"
              placeholder="Enter detailed assignment description"
              className="h-40 text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-base">Subject</Label>
              <Select>
                <SelectTrigger className="h-12">
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

            <div className="space-y-2">
              <Label htmlFor="class" className="text-base">Class</Label>
              <Select>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class-a">Class A</SelectItem>
                  <SelectItem value="class-b">Class B</SelectItem>
                  <SelectItem value="class-c">Class C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal text-base",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {dueDate ? format(dueDate, "PPP") : "Select due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="points" className="text-base">Total Points</Label>
              <Input
                id="points"
                type="number"
                placeholder="Enter total points"
                className="h-12 text-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Assignment Type</Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select assignment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="essay">Essay</SelectItem>
                <SelectItem value="problem-set">Problem Set</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="presentation">Presentation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Grading Criteria</Label>
            <Textarea
              placeholder="Enter grading criteria and rubric"
              className="h-40 text-base"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" size="lg" className="px-8">Save as Draft</Button>
            <Button size="lg" className="px-8">Publish Assignment</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}