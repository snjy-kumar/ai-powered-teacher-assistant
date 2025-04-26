"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Search, Send, Paperclip, User, Users, Plus } from "lucide-react"

const contacts = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Professor",
    course: "Mathematics",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "Hi, do you have any questions about the upcoming assignment?",
    time: "10:30 AM",
    unread: true
  },
  {
    id: 2,
    name: "Prof. Michael Brown",
    role: "Professor",
    course: "English Literature",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "Your essay feedback is now available.",
    time: "Yesterday",
    unread: false
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Classmate",
    course: "World History",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    lastMessage: "Are we meeting for the study group tomorrow?",
    time: "Yesterday",
    unread: false
  },
  {
    id: 4,
    name: "Robert Lee",
    role: "Teaching Assistant",
    course: "Physics",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    lastMessage: "I've posted the lab materials for next week.",
    time: "Apr 10",
    unread: false
  },
  {
    id: 5,
    name: "Study Group - Physics",
    role: "Group",
    members: 6,
    avatar: null,
    lastMessage: "Alex: Does anyone have notes from last lecture?",
    time: "Apr 9",
    unread: false
  }
]

const messages = [
  {
    id: 1,
    sender: "Dr. Sarah Johnson",
    text: "Hi there! I noticed you haven't submitted your assignment yet. Is everything going okay?",
    time: "10:20 AM",
    isMe: false
  },
  {
    id: 2,
    sender: "Me",
    text: "Hello Dr. Johnson! I've been working on it but had some questions about the differential equations section.",
    time: "10:22 AM",
    isMe: true
  },
  {
    id: 3,
    sender: "Dr. Sarah Johnson",
    text: "I'm glad you reached out. Which specific part are you struggling with?",
    time: "10:25 AM",
    isMe: false
  },
  {
    id: 4,
    sender: "Me",
    text: "I'm having trouble with the separation of variables technique for problem #3. The solution doesn't seem to match what I'm getting.",
    time: "10:28 AM",
    isMe: true
  },
  {
    id: 5,
    sender: "Dr. Sarah Johnson",
    text: "Hi, do you have any questions about the upcoming assignment?",
    time: "10:30 AM",
    isMe: false
  }
]

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [messageText, setMessageText] = useState("")

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.course && contact.course.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, you would send the message to your backend
      console.log("Sending message:", messageText)
      setMessageText("")
    }
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">Communicate with your instructors and classmates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 h-[700px] flex flex-col">
            <div className="p-4 border-b">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-9" 
                  placeholder="Search messages..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex-grow overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className={`p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors ${
                    selectedContact.id === contact.id ? 'bg-muted/50' : ''
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start gap-3">
                    {contact.avatar ? (
                      <Avatar>
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium leading-none">{contact.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {contact.role} {contact.course && `• ${contact.course}`}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground">{contact.time}</span>
                          {contact.unread && (
                            <span className="h-2 w-2 bg-primary rounded-full mt-1"></span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 truncate">{contact.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t mt-auto">
              <Button className="w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 h-[700px] flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedContact.avatar ? (
                    <Avatar>
                      <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                      <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{selectedContact.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedContact.role} {selectedContact.course && `• ${selectedContact.course}`}
                    </p>
                  </div>
                </div>
                
                <div>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${
                    message.isMe 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  } p-3 rounded-lg`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isMe ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input 
                  className="flex-grow" 
                  placeholder="Type a message..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}