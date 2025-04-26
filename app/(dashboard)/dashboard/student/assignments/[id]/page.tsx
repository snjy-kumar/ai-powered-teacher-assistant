"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, FileText, Calendar, Clock, Download, Upload, CheckCircle, XCircle, MessageCircle } from "lucide-react"

// Mock function to get assignment data
function getAssignment(id: string) {
  // In a real app, this would fetch from an API
  return {
    id,
    title: "Literary Analysis Essay",
    subject: "English Literature",
    description: "Write a 1500-word analysis of the themes in 'To Kill a Mockingbird' by Harper Lee.",
    dueDate: "2023-04-28T23:59:00Z",
    status: "in-progress", // "not-started", "in-progress", "submitted", "graded"
    submissionDate: null,
    attachments: [
      { id: 1, name: "Assignment Instructions.pdf", size: "245 KB", type: "pdf" },
      { id: 2, name: "Grading Rubric.pdf", size: "120 KB", type: "pdf" },
      { id: 3, name: "Example Essay.pdf", size: "350 KB", type: "pdf" }
    ],
    gradingCriteria: [
      { name: "Content Analysis", weight: "30%" },
      { name: "Evidence & Examples", weight: "25%" },
      { name: "Organization & Structure", weight: "20%" },
      { name: "Writing Style & Grammar", weight: "15%" },
      { name: "Citations & References", weight: "10%" }
    ],
    courseId: "102"
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

export default function AssignmentPage({ params }: { params: { id: string } }) {
  const [assignment, setAssignment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState("details")
  const [uploadingFile, setUploadingFile] = useState(false)
  
  useEffect(() => {
    // Fetch the assignment data
    const data = getAssignment(params.id)
    setAssignment(data)
    setLoading(false)
  }, [params.id])
  
  if (loading) {
    return <div className="container max-w-6xl mx-auto py-8 px-4">Loading...</div>
  }
  
  if (!assignment) {
    notFound()
  }
  
  const handleFileUpload = () => {
    setUploadingFile(true)
    
    // In a real app, you would upload the file here
    setTimeout(() => {
      setUploadingFile(false)
    }, 2000)
  }
  
  const currentDate = new Date()
  const dueDate = new Date(assignment.dueDate)
  const daysRemaining = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "not-started": return "bg-gray-500"
      case "in-progress": return "bg-amber-500"
      case "submitted": return "bg-blue-500"
      case "graded": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "not-started": return "Not Started"
      case "in-progress": return "In Progress"
      case "submitted": return "Submitted"
      case "graded": return "Graded"
      default: return "Unknown"
    }
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Link href="/dashboard/student/assignments">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Assignments
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{assignment.title}</h1>
          <p className="text-muted-foreground">{assignment.subject}</p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
          <div className={`h-3 w-3 rounded-full ${getStatusColor(assignment.status)}`}></div>
          <span className="font-medium">{getStatusText(assignment.status)}</span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="details" className="w-full" 
            onValueChange={(value) => setSelectedTab(value)}
          >
            <TabsList className="justify-start mb-6">
              <TabsTrigger value="details" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-6 py-2 transition-all duration-200">
                Details
              </TabsTrigger>
              <TabsTrigger value="submission" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-6 py-2 transition-all duration-200">
                Submission
              </TabsTrigger>
              <TabsTrigger value="feedback" className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-6 py-2 transition-all duration-200">
                Feedback
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card className="p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Assignment Description</h2>
                <p className="text-muted-foreground mb-6">{assignment.description}</p>
                
                <h3 className="font-medium mb-3">Grading Criteria</h3>
                <ul className="space-y-2 mb-6">
                  {assignment.gradingCriteria.map((criteria, i) => (
                    <li key={i} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span>{criteria.name}</span>
                      <span className="font-medium">{criteria.weight}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>
            
            <TabsContent value="submission">
              <Card className="p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Submit Your Assignment</h2>
                
                {assignment.status === "submitted" || assignment.status === "graded" ? (
                  <div className="bg-muted/30 p-6 rounded-lg text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-1">Assignment Submitted</h3>
                    <p className="text-muted-foreground mb-4">
                      {assignment.submissionDate && (
                        `You submitted this assignment on ${new Date(assignment.submissionDate).toLocaleDateString()}`
                      )}
                    </p>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Your Submission
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/10 transition-colors cursor-pointer">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-medium mb-1">Upload Your Submission</h3>
                      <p className="text-muted-foreground mb-4">
                        Drag and drop your file here, or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Accepts PDF, DOCX, or TXT files up to 10MB
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleFileUpload} disabled={uploadingFile}>
                        {uploadingFile ? (
                          <>Uploading...</>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Submit Assignment
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="feedback">
              <Card className="p-6 shadow-lg">
                {assignment.status === "graded" ? (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Instructor Feedback</h2>
                      <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/20 px-4 py-2 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-green-700 dark:text-green-400">Grade: A (92%)</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Grading Breakdown</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Content Analysis (30%)</span>
                            <span className="font-medium">27/30</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Evidence & Examples (25%)</span>
                            <span className="font-medium">23/25</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Organization & Structure (20%)</span>
                            <span className="font-medium">18/20</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Writing Style & Grammar (15%)</span>
                            <span className="font-medium">14/15</span>
                          </div>
                          <Progress value={93} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>Citations & References (10%)</span>
                            <span className="font-medium">10/10</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg mb-6">
                      <h3 className="font-medium mb-2">Comments</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        Excellent work on your literary analysis! Your thesis was clear and you provided strong evidence from the text to support your arguments. Your analysis of the symbolism throughout the novel was particularly insightful.

                        Areas for improvement:
                        - Consider exploring the historical context more deeply
                        - Some paragraphs could benefit from stronger topic sentences

                        Overall, a very strong essay that demonstrates a deep understanding of the text.
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Annotated Paper
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Feedback Yet</h3>
                    <p className="text-muted-foreground mb-6">
                      {assignment.status === "submitted" 
                        ? "Your assignment has been submitted and is awaiting grading by your instructor."
                        : "Please submit your assignment to receive feedback."}
                    </p>
                    
                    {assignment.status === "submitted" && (
                      <Button variant="outline" onClick={() => setSelectedTab("submission")}>
                        View Submission
                      </Button>
                    )}
                    
                    {(assignment.status === "not-started" || assignment.status === "in-progress") && (
                      <Button onClick={() => setSelectedTab("submission")}>
                        Go to Submission
                      </Button>
                    )}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card className="p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Due Date</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-red-50 dark:bg-red-950/20">
                <Calendar className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="font-medium">{new Date(assignment.dueDate).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(assignment.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            {daysRemaining > 0 ? (
              <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-amber-700 dark:text-amber-400">
                  {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
                </span>
              </div>
            ) : (
              <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-700 dark:text-red-400">
                  Past due
                </span>
              </div>
            )}
          </Card>
          
          <Card className="p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <div className="space-y-3">
              {assignment.attachments.map(attachment => (
                <div key={attachment.id} className="flex items-center justify-between p-3 bg-muted/40 rounded-lg hover:bg-muted/70 transition-colors">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{attachment.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have questions about this assignment, contact your instructor for clarification.
            </p>
            <Button className="w-full" variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message Instructor
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}