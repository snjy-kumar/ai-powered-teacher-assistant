export type CourseUpcoming = {
  title: string;
  date: string;
};

export type CurrentCourse = {
  id: string;
  title: string;
  code: string;
  instructor: string;
  schedule: string;
  progress: number;
  credits: number;
  upcoming: CourseUpcoming;
};

export type CompletedCourse = {
  id: string;
  title: string;
  code: string;
  instructor: string;
  term: string;
  grade: string;
  credits: number;
};

export type CourseData = {
  currentCourses: CurrentCourse[];
  completedCourses: CompletedCourse[];
};

// Mock database of courses - in a real app, this would come from a database
const courseDatabase: CourseData = {
  currentCourses: [
    {
      id: "101",
      title: "Advanced Mathematics",
      code: "MATH 301",
      instructor: "Dr. Sarah Johnson",
      schedule: "Mon, Wed, Fri 10:00 AM",
      progress: 68,
      credits: 4,
      upcoming: {
        title: "Differential Equations",
        date: "Apr 15"
      }
    },
    {
      id: "102",
      title: "English Literature",
      code: "ENG 240",
      instructor: "Prof. Michael Brown",
      schedule: "Tue, Thu 1:00 PM",
      progress: 75,
      credits: 3,
      upcoming: {
        title: "Essay Discussion",
        date: "Apr 14"
      }
    },
    {
      id: "103",
      title: "World History",
      code: "HIST 210",
      instructor: "Dr. Emma Wilson",
      schedule: "Mon, Wed 2:30 PM",
      progress: 42,
      credits: 3,
      upcoming: {
        title: "Renaissance Period",
        date: "Apr 17"
      }
    },
    {
      id: "104",
      title: "Physics Fundamentals",
      code: "PHYS 201",
      instructor: "Prof. Robert Lee",
      schedule: "Tue, Thu 9:00 AM",
      progress: 55,
      credits: 4,
      upcoming: {
        title: "Lab Session",
        date: "Apr 16"
      }
    }
  ],
  completedCourses: [
    {
      id: "090",
      title: "Introduction to Psychology",
      code: "PSYC 101",
      instructor: "Dr. Jennifer King",
      term: "Fall 2023",
      grade: "A-",
      credits: 3
    },
    {
      id: "091",
      title: "Computer Science Fundamentals",
      code: "CS 150",
      instructor: "Prof. David Chen",
      term: "Fall 2023",
      grade: "B+",
      credits: 4
    },
    {
      id: "092",
      title: "Introduction to Sociology",
      code: "SOC 101",
      instructor: "Dr. Amanda Garcia",
      term: "Spring 2023",
      grade: "A",
      credits: 3
    }
  ]
};

/**
 * Get course data
 * In a real app, this would fetch from a database
 */
export async function getCourses(): Promise<CourseData> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return the course data
  return courseDatabase;
}

/**
 * Get a single current course by ID
 */
export async function getCurrentCourse(id: string): Promise<CurrentCourse | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Find and return the course
  return courseDatabase.currentCourses.find(course => course.id === id) || null;
}

/**
 * Get a single completed course by ID
 */
export async function getCompletedCourse(id: string): Promise<CompletedCourse | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Find and return the course
  return courseDatabase.completedCourses.find(course => course.id === id) || null;
} 