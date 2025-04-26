"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { BookOpen, Clock, FileText, GraduationCap, ChevronLeft, ChevronRight, Plus } from "lucide-react"

// This would normally be fetched from an API
const eventCategories = [
  { id: "class", label: "Classes", color: "bg-blue-500", icon: GraduationCap },
  { id: "assignment", label: "Assignments", color: "bg-amber-500", icon: FileText },
  { id: "exam", label: "Exams", color: "bg-red-500", icon: Clock },
  { id: "meeting", label: "Meetings", color: "bg-green-500", icon: BookOpen }
]

const events = [
  {
    id: 1,
    title: "Advanced Mathematics",
    description: "Differential Equations",
    date: "2024-04-15",
    time: "10:00 AM - 11:30 AM",
    category: "class",
    location: "Math Building, Room 210"
  },
  {
    id: 2,
    title: "English Literature",
    description: "Essay Discussion",
    date: "2024-04-15",
    time: "1:00 PM - 2:30 PM",
    category: "class",
    location: "Humanities Building, Room 305"
  },
  {
    id: 3,
    title: "Literary Analysis Essay",
    description: "Due: English Literature",
    date: "2024-04-15",
    category: "assignment"
  },
  {
    id: 4,
    title: "Physics Lab Session",
    description: "Electricity and Magnetism",
    date: "2024-04-16",
    time: "9:00 AM - 11:00 AM",
    category: "class",
    location: "Science Building, Lab 3"
  },
  {
    id: 5,
    title: "Mathematical Problem Set",
    description: "Due: Advanced Mathematics",
    date: "2024-04-18",
    category: "assignment"
  },
  {
    id: 6,
    title: "Study Group Meeting",
    description: "Physics Group Project",
    date: "2024-04-17",
    time: "3:00 PM - 5:00 PM",
    category: "meeting",
    location: "Library, Study Room 4"
  },
  {
    id: 7,
    title: "Midterm Exam",
    description: "World History",
    date: "2024-04-20",
    time: "10:00 AM - 12:00 PM",
    category: "exam",
    location: "Hall A"
  }
]

// Add timetable data
const timetable = [
  {
    day: "Monday",
    slots: [
      { time: "9:00 AM - 10:30 AM", subject: "Advanced Mathematics", room: "Math 210", type: "class" },
      { time: "11:00 AM - 12:30 PM", subject: "Physics", room: "Science 305", type: "class" },
      { time: "2:00 PM - 3:30 PM", subject: "English Literature", room: "Humanities 405", type: "class" }
    ]
  },
  {
    day: "Tuesday",
    slots: [
      { time: "9:00 AM - 10:30 AM", subject: "Chemistry", room: "Science 210", type: "class" },
      { time: "11:00 AM - 12:30 PM", subject: "History", room: "Social 305", type: "class" },
      { time: "2:00 PM - 3:30 PM", subject: "Computer Science", room: "Tech 405", type: "class" }
    ]
  },
  {
    day: "Wednesday",
    slots: [
      { time: "9:00 AM - 10:30 AM", subject: "Advanced Mathematics", room: "Math 210", type: "class" },
      { time: "11:00 AM - 12:30 PM", subject: "Physics Lab", room: "Science Lab 3", type: "class" },
      { time: "2:00 PM - 3:30 PM", subject: "English Literature", room: "Humanities 405", type: "class" }
    ]
  },
  {
    day: "Thursday",
    slots: [
      { time: "9:00 AM - 10:30 AM", subject: "Chemistry", room: "Science 210", type: "class" },
      { time: "11:00 AM - 12:30 PM", subject: "History", room: "Social 305", type: "class" },
      { time: "2:00 PM - 3:30 PM", subject: "Computer Science", room: "Tech 405", type: "class" }
    ]
  },
  {
    day: "Friday",
    slots: [
      { time: "9:00 AM - 10:30 AM", subject: "Advanced Mathematics", room: "Math 210", type: "class" },
      { time: "11:00 AM - 12:30 PM", subject: "Physics", room: "Science 305", type: "class" },
      { time: "2:00 PM - 3:30 PM", subject: "English Literature", room: "Humanities 405", type: "class" }
    ]
  }
]

// Add upcoming assignments and quizzes
const upcomingTasks = [
  {
    id: 1,
    title: "Physics Lab Report",
    dueDate: "2024-04-20",
    type: "assignment",
    subject: "Physics",
    priority: "high"
  },
  {
    id: 2,
    title: "Math Problem Set 5",
    dueDate: "2024-04-22",
    type: "assignment",
    subject: "Advanced Mathematics",
    priority: "medium"
  },
  {
    id: 3,
    title: "Chemistry Quiz",
    dueDate: "2024-04-25",
    type: "exam",
    subject: "Chemistry",
    priority: "high"
  },
  {
    id: 4,
    title: "History Essay",
    dueDate: "2024-04-28",
    type: "assignment",
    subject: "History",
    priority: "medium"
  }
]

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const monthsOfYear = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(eventCategories.map(cat => cat.id))

  const filteredEvents = events.filter(event => selectedCategories.includes(event.category))

  // Get events for the selected date
  const todayEvents = filteredEvents.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.toDateString() === date.toDateString()
  })

  // For weekly view, get the start and end date of the week
  const getWeekDates = (date: Date) => {
    const day = date.getDay() // 0 for Sunday, 6 for Saturday
    const diff = date.getDate() - day
    const weekStart = new Date(date)
    weekStart.setDate(diff)
    
    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(weekStart)
      newDate.setDate(weekStart.getDate() + i)
      weekDates.push(newDate)
    }
    
    return weekDates
  }

  const weekDates = getWeekDates(date)

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  const navigatePrevious = () => {
    const newDate = new Date(date)
    if (view === "month") {
      newDate.setMonth(date.getMonth() - 1)
    } else if (view === "week") {
      newDate.setDate(date.getDate() - 7)
    } else if (view === "day") {
      newDate.setDate(date.getDate() - 1)
    }
    setDate(newDate)
  }

  const navigateNext = () => {
    const newDate = new Date(date)
    if (view === "month") {
      newDate.setMonth(date.getMonth() + 1)
    } else if (view === "week") {
      newDate.setDate(date.getDate() + 7)
    } else if (view === "day") {
      newDate.setDate(date.getDate() + 1)
    }
    setDate(newDate)
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Academic Calendar</h1>
        <p className="text-muted-foreground">Manage your academic schedule, assignments, and events</p>
      </div>

      <div className="grid md:grid-cols-4 gap-2">
        <div className="md:col-span-1 space-y-6">
          <Card className="p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <Button className="w-full mb-4" size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>

            <div className="mb-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-md p-2 border"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Event Categories</h3>
              <div className="space-y-2">
                {eventCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <div key={category.id} className="flex items-center">
                      <button 
                        className={`h-4 w-4 rounded mr-2 ${category.color} ${
                          !selectedCategories.includes(category.id) ? 'opacity-40' : ''
                        }`}
                        onClick={() => handleCategoryToggle(category.id)}
                      ></button>
                      <Icon className="h-4 w-4 mr-2" />
                      <span className="text-sm">{category.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <h3 className="font-medium mb-4">Today&apos;s Events</h3>
            {todayEvents.length > 0 ? (
              <div className="space-y-3">
                {todayEvents.map((event) => {
                  const category = eventCategories.find(cat => cat.id === event.category)
                  const Icon = category?.icon
                  
                  return (
                    <div key={event.id} className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`h-2 w-2 rounded-full ${category?.color}`}></div>
                        {Icon ? <Icon className="h-4 w-4" /> : null}
                        <h4 className="font-medium text-sm">{event.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                      {event.time && (
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{event.time}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No events for today</p>
            )}
          </Card>

          <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <h3 className="font-medium mb-4">Upcoming Tasks</h3>
            <div className="space-y-3">
              {upcomingTasks.map((task) => {
                const category = eventCategories.find(cat => cat.id === task.type)
                const Icon = category?.icon
                const dueDate = new Date(task.dueDate)
                const daysUntilDue = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                
                return (
                  <div key={task.id} className="p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${category?.color}`}></div>
                        {Icon ? <Icon className="h-4 w-4" /> : null}
                        <h4 className="font-medium text-sm">{task.title}</h4>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{task.subject}</span>
                      <span>Due in {daysUntilDue} days</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" onClick={navigatePrevious}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={navigateNext}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {view === "month" && `${monthsOfYear[date.getMonth()]} ${date.getFullYear()}`}
                    {view === "week" && `Week of ${monthsOfYear[weekDates[0].getMonth()]} ${weekDates[0].getDate()}`}
                    {view === "day" && `${monthsOfYear[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
                  </h2>
                </div>
                
                <div className="flex items-center gap-4">
                  <Tabs value={view} onValueChange={(value: string) => setView(value as any)} className="w-fit">
                    <TabsList className="grid grid-cols-3 w-[240px]">
                      <TabsTrigger value="month">Month</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="day">Day</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <Button variant="outline" onClick={() => setDate(new Date())}>
                    Today
                  </Button>
                </div>
              </div>
            </div>
            
            <Tabs className="p-4">
              <TabsContent value="month" className="mt-0">
                <div className="grid grid-cols-7 gap-1">
                  {daysOfWeek.map((day, i) => (
                    <div key={i} className="text-center p-2 font-medium">
                      {day.slice(0, 3)}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 h-[600px]">
                  {/* This would normally be a calendar component with the days of the month */}
                  {Array.from({ length: 35 }).map((_, i) => {
                    const dayDate = new Date(date.getFullYear(), date.getMonth(), i - date.getDay() + 1)
                    const isCurrentMonth = dayDate.getMonth() === date.getMonth()
                    const isToday = dayDate.toDateString() === new Date().toDateString()
                    const isSelected = dayDate.toDateString() === date.toDateString()
                    
                    const dayEvents = filteredEvents.filter(event => {
                      const eventDate = new Date(event.date)
                      return eventDate.toDateString() === dayDate.toDateString()
                    })
                    
                    return (
                      <div 
                        key={i}
                        className={`p-1 border rounded-md ${
                          isCurrentMonth ? 'bg-card' : 'bg-muted/20 text-muted-foreground'
                        } ${isToday ? 'border-primary' : ''} ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                        onClick={() => setDate(new Date(dayDate))}
                      >
                        <div className="h-full flex flex-col">
                          <div className="text-right p-1">
                            <span className={`text-sm ${isSelected ? 'font-bold' : ''}`}>
                              {dayDate.getDate()}
                            </span>
                          </div>
                          <div className="flex-grow overflow-y-auto max-h-20 space-y-1">
                            {dayEvents.map((event, j) => {
                              const category = eventCategories.find(cat => cat.id === event.category)
                              return (
                                <div 
                                  key={j}
                                  className={`text-xs p-1 rounded truncate ${category?.color} bg-opacity-20 text-foreground`}
                                >
                                  {event.title}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="week" className="mt-0">
                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((weekDate, i) => (
                    <div key={i} className="text-center">
                      <div className="font-medium">{daysOfWeek[i].slice(0, 3)}</div>
                      <div className={`text-sm rounded-full w-7 h-7 flex items-center justify-center mx-auto ${
                        weekDate.toDateString() === new Date().toDateString() 
                          ? 'bg-primary text-primary-foreground' 
                          : ''
                      }`}>
                        {weekDate.getDate()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2 mt-4 h-[600px]">
                  {weekDates.map((weekDate, i) => {
                    const dayEvents = filteredEvents.filter(event => {
                      const eventDate = new Date(event.date)
                      return eventDate.toDateString() === weekDate.toDateString()
                    })
                    
                    return (
                      <div key={i} className="border rounded-md h-full p-2 overflow-y-auto">
                        {dayEvents.length > 0 ? (
                          <div className="space-y-2">
                            {dayEvents.map((event, j) => {
                              const category = eventCategories.find(cat => cat.id === event.category)
                              return (
                                <div 
                                  key={j} 
                                  className={`p-2 rounded ${category?.color} bg-opacity-20`}
                                >
                                  <div className="font-medium text-sm">{event.title}</div>
                                  <div className="text-xs mt-1">{event.description}</div>
                                  {event.time && (
                                    <div className="flex items-center mt-2 text-xs">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>{event.time}</span>
                                    </div>
                                  )}
                                  {event.location && (
                                    <div className="flex items-center mt-1 text-xs">
                                      <BookOpen className="h-3 w-3 mr-1" />
                                      <span>{event.location}</span>
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                            No events
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="day" className="mt-0">
                <div className="text-center mb-4">
                  <div className="font-medium text-lg">
                    {daysOfWeek[date.getDay()]}, {monthsOfYear[date.getMonth()]} {date.getDate()}
                  </div>
                </div>
                
                {todayEvents.length > 0 ? (
                  <div className="space-y-4 p-4">
                    {todayEvents.map((event) => {
                      const category = eventCategories.find(cat => cat.id === event.category)
                      
                      return (
                        <Card key={event.id} className="p-4 hover:shadow-md transition-all duration-200">
                          <div className="flex items-start gap-3">
                            <div className={`h-4 w-4 rounded-full ${category?.color} mt-1`}></div>
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium">{event.title}</h3>
                                <div className="px-2 py-1 text-xs rounded-full bg-muted">
                                  {category?.label}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                              
                              <div className="flex flex-wrap gap-4 mt-3">
                                {event.time && (
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4 mr-1.5" />
                                    <span>{event.time}</span>
                                  </div>
                                )}
                                {event.location && (
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <BookOpen className="h-4 w-4 mr-1.5" />
                                    <span>{event.location}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                    <FileText className="h-12 w-12 mb-4 opacity-20" />
                    <h3 className="font-medium text-lg">No Events</h3>
                    <p className="text-sm mt-2">There are no events scheduled for this day.</p>
                    <Button className="mt-6">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Event
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <div className="p-6">
              <h3 className="font-medium mb-4">Weekly Timetable</h3>
              <div className="space-y-4">
                {timetable.map((day) => (
                  <div key={day.day} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{day.day}</h4>
                    <div className="space-y-2">
                      {day.slots.map((slot, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-accent/50 rounded-md">
                          <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{slot.time}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">{slot.subject}</span>
                            <span className="text-xs text-muted-foreground">{slot.room}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}