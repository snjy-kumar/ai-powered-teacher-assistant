"use client"

import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"

export function AssignmentProgress({ progress }: { progress: number }) {
  // Animate progress from 0 to the actual value
  const [value, setValue] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => setValue(progress), 200)
    return () => clearTimeout(timer)
  }, [progress])
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">Progress</span>
        <span className="font-medium text-primary">{progress}%</span>
      </div>
      <Progress value={value} className="h-3 transition-all duration-700" />
    </div>
  )
} 