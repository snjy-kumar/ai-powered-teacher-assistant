"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  FileText,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

interface Attachment {
  id: number;
  name: string;
  type: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  content: string;
  attachments: Attachment[];
  prevLessonId?: string | null;
  nextLessonId?: string | null;
  courseId?: string;
}

// Mock function to simulate fetching lesson data from API
async function getLesson(courseId: string, lessonId: string) {
  // In a real app, this would be an actual API call
  return {
    id: lessonId,
    title: "Introduction to Linear Equations",
    description:
      "Learn the fundamentals of linear equations and their applications in real-world scenarios.",
    videoUrl: "https://example.com/lesson-video",
    duration: "45 minutes",
    content: `
      <h2>Linear Equations</h2>
      <p>A linear equation is an equation where each term is either a constant or the product of a constant and a single variable. The standard form of a linear equation is:</p>
      <p class="font-mono text-center my-4">ax + b = c</p>
      <p>Where:</p>
      <ul>
        <li>a, b, and c are constants</li>
        <li>x is a variable</li>
      </ul>
      <h3 class="mt-6">Solving Linear Equations</h3>
      <p>To solve a linear equation, we need to isolate the variable on one side of the equation. Here's a step-by-step approach:</p>
      <ol>
        <li>Move all terms with the variable to one side</li>
        <li>Move all constant terms to the other side</li>
        <li>Combine like terms on each side</li>
        <li>Divide both sides by the coefficient of the variable</li>
      </ol>
      <h3 class="mt-6">Example</h3>
      <p>Let's solve the equation: 3x + 5 = 11</p>
      <p>Step 1: Subtract 5 from both sides</p>
      <p class="font-mono text-center my-2">3x + 5 - 5 = 11 - 5</p>
      <p class="font-mono text-center my-2">3x = 6</p>
      <p>Step 2: Divide both sides by 3</p>
      <p class="font-mono text-center my-2">3x/3 = 6/3</p>
      <p class="font-mono text-center my-2">x = 2</p>
      <p>Therefore, the solution to the equation 3x + 5 = 11 is x = 2.</p>
    `,
    attachments: [
      { id: 1, name: "Lecture Notes.pdf", type: "pdf" },
      { id: 2, name: "Practice Problems.pdf", type: "pdf" },
    ],
    courseId: courseId,
    nextLessonId: "2",
    prevLessonId: null,
  };
}

export default function LessonPage({
  params,
}: {
  params: { id: string; lessonId: string };
}) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLesson(params.id, params.lessonId).then((data) => {
      setLesson(data);
      setLoading(false);
    });
  }, [params.id, params.lessonId]);

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto py-8 px-4">Loading...</div>
    );
  }

  if (!lesson) {
    notFound();
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <Link href={`/dashboard/student/courses/${params.id}`}>
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Course
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          {lesson.prevLessonId && (
            <Link
              href={`/dashboard/student/courses/${params.id}/lessons/${lesson.prevLessonId}`}
            >
              <Button variant="outline" size="sm" className="gap-1">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
            </Link>
          )}

          {lesson.nextLessonId && (
            <Link
              href={`/dashboard/student/courses/${params.id}/lessons/${lesson.nextLessonId}`}
            >
              <Button variant="outline" size="sm" className="gap-1">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="aspect-video bg-black/90 flex items-center justify-center">
              <PlayCircle className="h-20 w-20 text-white/70 hover:text-white transition-colors" />
            </div>
            <div className="p-4 text-sm text-muted-foreground flex items-center gap-2">
              <PlayCircle className="h-4 w-4" />
              <span>{lesson.duration}</span>
            </div>
          </Card>

          <Card className="mt-6 p-8 shadow-lg">
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Attachments</h3>
            <div className="space-y-3">
              {lesson.attachments.map((attachment: Attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between p-3 bg-muted/40 rounded-lg hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>{attachment.name}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Mark as Complete
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask a Question
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
