import { CurrentCourse, CompletedCourse } from "../../api/get-courses"

export type CourseInstructor = {
  name: string;
  avatar: string;
  email: string;
  office: string;
  officeHours: string;
};

export type CourseNextClass = {
  topic: string;
  date: string;
  time: string;
  room: string;
};

export type CourseMaterial = {
  id: number;
  title: string;
  type: "pdf" | "video" | "interactive";
};

export type CourseModule = {
  id: number;
  title: string;
  completed: boolean;
  current?: boolean;
  materials: CourseMaterial[];
};

export type CourseAssignment = {
  id: number;
  title: string;
  dueDate: string;
  status: "Completed" | "Pending" | "Overdue";
  grade: string | null;
};

export type CourseAnnouncement = {
  id: number;
  title: string;
  date: string;
  content: string;
};

export type Course = {
  id: string;
  title: string;
  code: string;
  description: string;
  instructor: CourseInstructor;
  progress: number;
  nextClass: CourseNextClass;
  modules: CourseModule[];
  assignments: CourseAssignment[];
  announcements: CourseAnnouncement[];
};

// Mock database of course details
const courseDatabase: Record<string, Course> = {
  "101": {
    id: "101",
    title: "Advanced Mathematics",
    code: "MATH 301",
    description: "This course covers advanced topics in calculus, linear algebra, and differential equations. Students will learn to apply mathematical concepts to solve complex problems.",
    instructor: {
      name: "Dr. Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      email: "s.johnson@university.edu",
      office: "Science Building, Room 305",
      officeHours: "Mon, Wed 2-4pm"
    },
    progress: 68,
    nextClass: {
      topic: "Differential Equations",
      date: "April 15, 2024",
      time: "10:00 AM - 11:30 AM",
      room: "Math Building, Room 210"
    },
    modules: [
      {
        id: 1,
        title: "Introduction to Advanced Calculus",
        completed: true,
        materials: [
          { id: 1, title: "Lecture Notes: Calculus Review", type: "pdf" },
          { id: 2, title: "Practice Problems Set 1", type: "pdf" }
        ]
      },
      {
        id: 2,
        title: "Linear Algebra Applications",
        completed: true,
        materials: [
          { id: 3, title: "Lecture Notes: Matrices and Determinants", type: "pdf" },
          { id: 4, title: "Matrix Operations Video", type: "video" },
          { id: 5, title: "Practice Problems Set 2", type: "pdf" }
        ]
      },
      {
        id: 3,
        title: "Differential Equations",
        completed: false,
        current: true,
        materials: [
          { id: 6, title: "Lecture Notes: Introduction to ODEs", type: "pdf" },
          { id: 7, title: "Differential Equations Interactive Demo", type: "interactive" }
        ]
      },
      {
        id: 4,
        title: "Multivariable Calculus",
        completed: false,
        materials: [
          { id: 8, title: "Lecture Notes: Partial Derivatives", type: "pdf" }
        ]
      }
    ],
    assignments: [
      {
        id: 1,
        title: "Problem Set 1: Integration Techniques",
        dueDate: "2024-04-01",
        status: "Completed",
        grade: "92%"
      },
      {
        id: 2,
        title: "Problem Set 2: Matrix Operations",
        dueDate: "2024-04-10",
        status: "Completed",
        grade: "88%"
      },
      {
        id: 3,
        title: "Problem Set 3: Differential Equations",
        dueDate: "2024-04-20",
        status: "Pending",
        grade: null
      }
    ],
    announcements: [
      {
        id: 1,
        title: "Office Hours Cancelled This Week",
        date: "2024-04-08",
        content: "Due to the academic conference, I will not be holding office hours this week. Please email me for any urgent questions."
      },
      {
        id: 2,
        title: "Extra Review Session for Upcoming Exam",
        date: "2024-04-05",
        content: "I will be holding an extra review session on Friday, April 12th from 3-5pm in Room 210. Please bring your questions!"
      }
    ]
  },
  // You can add more courses here as needed
};

/**
 * Get course data by ID
 * In a real app, this would fetch from a database
 */
export async function getCourse(id: string): Promise<Course | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return the course if it exists
  return courseDatabase[id] || null;
} 