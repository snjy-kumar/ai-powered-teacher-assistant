"use client"

import { useState, useEffect } from "react"
import { FileText, Upload, Save, SendIcon, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  getAssignmentDraft, 
  saveAssignmentDraft, 
  submitAssignment, 
  getAssignment 
} from "../api/get-assignment"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { useToast } from "@/app/components/ui/use-toast"

export function AssignmentContent({ assignmentId }: { assignmentId: string }) {
  const [essayText, setEssayText] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalWords, setTotalWords] = useState(1500) // Default
  const { toast } = useToast()
  
  useEffect(() => {
    const loadDraft = async () => {
      try {
        setIsLoading(true)
        // Load draft content
        const content = await getAssignmentDraft(assignmentId)
        setEssayText(content)
        setWordCount(content.split(/\s+/).filter(Boolean).length)
        
        // Get assignment details for word count requirement
        const assignment = await getAssignment(assignmentId)
        if (assignment?.totalWords) {
          setTotalWords(assignment.totalWords)
        }
      } catch (error) {
        console.error("Error loading draft:", error)
        toast({
          title: "Error loading draft",
          description: "Your draft could not be loaded. Please try again.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    loadDraft()
  }, [assignmentId, toast])
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setEssayText(text)
    setWordCount(text.split(/\s+/).filter(Boolean).length)
  }
  
  const handleSaveDraft = async () => {
    try {
      setIsSaving(true)
      await saveAssignmentDraft(assignmentId, essayText)
      toast({
        title: "Draft saved",
        description: "Your draft has been saved successfully."
      })
    } catch (error) {
      console.error("Error saving draft:", error)
      toast({
        title: "Error saving draft",
        description: "Your draft could not be saved. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleSubmitAssignment = async () => {
    try {
      setIsSubmitting(true)
      await submitAssignment(assignmentId, essayText)
      toast({
        title: "Assignment submitted",
        description: "Your assignment has been submitted successfully."
      })
    } catch (error) {
      console.error("Error submitting assignment:", error)
      toast({
        title: "Error submitting assignment",
        description: "Your assignment could not be submitted. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles([...files, ...newFiles])
    }
  }
  
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
  }

  const getWordCountColor = () => {
    if (wordCount < totalWords * 0.5) return 'text-red-600 dark:text-red-400'
    if (wordCount < totalWords * 0.9) return 'text-amber-600 dark:text-amber-400'
    return 'text-green-600 dark:text-green-400'
  }
  
  return (
    <Tabs defaultValue="editor" className="w-full">
      <TabsList className="bg-muted/50 p-1 rounded-xl mb-8 w-full sm:w-auto mx-auto flex justify-center">
        <TabsTrigger 
          value="editor" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary rounded-lg px-8 py-2.5 transition-all duration-200"
        >
          <FileText className="w-4 h-4 mr-2" />
          Editor
        </TabsTrigger>
        <TabsTrigger 
          value="upload" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-800 data-[state=active]:text-primary rounded-lg px-8 py-2.5 transition-all duration-200"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </TabsTrigger>
      </TabsList>

      <TabsContent value="editor" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Essay Editor</h2>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${getWordCountColor()}`}>
                {wordCount} / {totalWords} words
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Textarea 
              className="min-h-[400px] text-base leading-relaxed p-4 resize-y font-mono" 
              placeholder="Start writing your essay here..."
              value={essayText}
              onChange={handleTextChange}
            />
          )}

          <div className="flex justify-end gap-4 mt-6">
            <Button 
              variant="outline" 
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </>
              )}
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={isSubmitting || wordCount < totalWords * 0.8}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <SendIcon className="h-4 w-4 mr-2" />
                      Submit Assignment
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Once submitted, you will not be able to make further changes to this assignment.
                    {wordCount < totalWords && (
                      <div className="flex items-center mt-4 text-amber-600 bg-amber-50 dark:bg-amber-900/30 p-3 rounded-md">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span>Your word count is below the required {totalWords} words.</span>
                      </div>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmitAssignment}>
                    Submit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="upload" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Upload Assignment Files</h2>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Upload className="h-5 w-5 text-primary" />
            </div>
          </div>

          <div className="border-2 border-dashed rounded-lg p-10 text-center mb-6 hover:bg-muted/20 transition-colors cursor-pointer">
            <Input 
              type="file" 
              className="hidden" 
              id="file-upload" 
              onChange={handleFileChange}
              multiple
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <p className="font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">DOC, DOCX, or PDF (max 10MB)</p>
            </label>
          </div>

          {files.length > 0 && (
            <div className="space-y-3 mb-6">
              <h3 className="font-medium">Uploaded Files</h3>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-primary" />
                    <span>{file.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveFile(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button disabled={files.length === 0}>Submit Files</Button>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 