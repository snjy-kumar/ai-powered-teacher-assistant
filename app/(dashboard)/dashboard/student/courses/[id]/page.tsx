import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { CourseHeader } from "./components/course-header"
import { CourseOverview } from "./components/course-overview"
import { CourseInstructor } from "./components/course-instructor"
import { CourseContent } from "./components/course-content"
import { getCourse } from "./api/get-course"

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  // Return all possible course IDs that should be pre-rendered
  return [
    { id: '101' },
    { id: '102' },
    { id: '103' },
    { id: '104' },
    { id: '090' },
    { id: '091' },
    { id: '092' },
    // Add more IDs as needed for your static export
  ]
}

export default async function CourseDetail({ params }: { params: { id: string } }) {
  // Fetch the course data - this runs on the server
  const course = await getCourse(params.id)
  
  // If the course doesn't exist, show a 404 page
  if (!course) {
    notFound()
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <CourseHeader course={course} />

      <div className="grid gap-8 md:grid-cols-3 mb-10">
        <div className="md:col-span-2">
          <Suspense fallback={<div className="h-52 w-full bg-muted animate-pulse rounded-lg"></div>}>
            <CourseOverview course={course} />
          </Suspense>
        </div>
        
        <Suspense fallback={<div className="h-52 w-full bg-muted animate-pulse rounded-lg"></div>}>
          <CourseInstructor instructor={course.instructor} />
        </Suspense>
      </div>

      <Suspense fallback={<div className="h-96 w-full bg-muted/30 animate-pulse rounded-lg"></div>}>
        <CourseContent course={course} />
      </Suspense>
    </div>
  )
}