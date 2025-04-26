import { Suspense } from "react"
import { CoursesStats } from "./components/courses-stats"
import { CoursesContent } from "./components/courses-content"
import { getCourses } from "./api/get-courses"

export default async function StudentCoursesPage() {
  // Fetch courses data on the server
  const { currentCourses, completedCourses } = await getCourses()
  
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">My Courses</h1>
        <p className="text-muted-foreground">Manage and track your academic courses</p>
      </div>

      <Suspense fallback={<div className="h-28 w-full grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-full bg-muted/30 animate-pulse rounded-lg"></div>
        ))}
      </div>}>
        <CoursesStats currentCourses={currentCourses} />
      </Suspense>

      <Suspense fallback={<div className="h-96 w-full bg-muted/30 animate-pulse rounded-lg"></div>}>
        <CoursesContent currentCourses={currentCourses} completedCourses={completedCourses} />
      </Suspense>
    </div>
  )
}