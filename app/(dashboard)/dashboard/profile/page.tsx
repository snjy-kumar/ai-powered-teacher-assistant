"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  User, Lock, Bell, Shield, BookOpen, GraduationCap, Briefcase, 
  MapPin, Globe, Save, Upload, LogOut,
  FileText
} from "lucide-react"

// This would normally be fetched from an API
const userProfile = {
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@university.edu",
  studentId: "1234567890",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  program: "Computer Science",
  year: "Junior",
  bio: "Computer Science student with a focus on artificial intelligence and machine learning. I enjoy solving complex problems and building innovative applications.",
  phone: "(555) 123-4567",
  address: "123 University Ave, College Town, CT 12345",
  birthDate: "1999-05-15",
  socialLinks: {
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    website: "alexjohnson.dev"
  },
  academicInfo: {
    gpa: "3.8",
    credits: "78",
    advisor: "Dr. Sarah Miller",
    department: "School of Computer Science",
    expectedGraduation: "May 2025"
  }
}

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState(userProfile)
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value
    })
  }
  
  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      socialLinks: {
        ...profileData.socialLinks,
        [name]: value
      }
    })
  }
  
  const handleSaveProfile = () => {
    // In a real app, you would save the data to your backend
    console.log("Saving profile data:", profileData)
    setEditMode(false)
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences</p>
      </div>

      <div className="flex justify-end mb-6">
        <Button 
          variant={editMode ? "default" : "outline"} 
          onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
        >
          {editMode ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-xl mb-8 w-full sm:w-auto mx-auto ">
          <TabsTrigger 
            value="personal" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <User className="w-4 h-4 mr-2" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger 
            value="academic" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Academic
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <Lock className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-black rounded-lg px-8 py-2.5 transition-all duration-200"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 h-fit">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profileData.avatar} alt={`${profileData.firstName} ${profileData.lastName}`} />
                    <AvatarFallback>{profileData.firstName[0]}{profileData.lastName[0]}</AvatarFallback>
                  </Avatar>
                  {editMode && (
                    <label 
                      htmlFor="avatar-upload" 
                      className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer"
                    >
                      <Upload className="h-4 w-4 text-white" />
                      <input id="avatar-upload" type="file" className="hidden" />
                    </label>
                  )}
                </div>
                
                <h2 className="text-2xl font-semibold mb-2">{profileData.firstName} {profileData.lastName}</h2>
                <p className="text-muted-foreground">{profileData.program} • {profileData.year}</p>
                
                <div className="w-full mt-6 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>Student ID</span>
                    </div>
                    <span className="font-medium">{profileData.studentId}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <span>Program</span>
                    </div>
                    <span className="font-medium">{profileData.program}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <span>Year</span>
                    </div>
                    <span className="font-medium">{profileData.year}</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 md:col-span-2">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      value={profileData.firstName} 
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={profileData.lastName} 
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      value={profileData.email} 
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={profileData.phone} 
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Date of Birth</Label>
                    <Input 
                      id="birthDate" 
                      name="birthDate" 
                      type="date"
                      value={profileData.birthDate} 
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      value={profileData.address} 
                      onChange={handleInputChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Bio</h3>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  value={profileData.bio} 
                  onChange={handleInputChange}
                  className="min-h-[100px]"
                  disabled={!editMode}
                />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Social Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <div className="flex items-center">
                      <div className="p-2 bg-muted/50 border rounded-l-md">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <Input 
                        id="linkedin" 
                        name="linkedin" 
                        value={profileData.socialLinks.linkedin} 
                        onChange={handleSocialLinkChange}
                        className="rounded-l-none"
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <div className="flex items-center">
                      <div className="p-2 bg-muted/50 border rounded-l-md">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <Input 
                        id="github" 
                        name="github" 
                        value={profileData.socialLinks.github} 
                        onChange={handleSocialLinkChange}
                        className="rounded-l-none"
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Personal Website</Label>
                    <div className="flex items-center">
                      <div className="p-2 bg-muted/50 border rounded-l-md">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <Input 
                        id="website" 
                        name="website" 
                        value={profileData.socialLinks.website} 
                        onChange={handleSocialLinkChange}
                        className="rounded-l-none"
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="academic" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <h3 className="text-xl font-semibold mb-6">Academic Information</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-muted/30 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">GPA</p>
                    <p className="text-3xl font-bold text-primary">{profileData.academicInfo.gpa}</p>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Credits</p>
                    <p className="text-3xl font-bold text-primary">{profileData.academicInfo.credits}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-primary" />
                      <span>Academic Advisor</span>
                    </div>
                    <span className="font-medium">{profileData.academicInfo.advisor}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>Department</span>
                    </div>
                    <span className="font-medium">{profileData.academicInfo.department}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <span>Expected Graduation</span>
                    </div>
                    <span className="font-medium">{profileData.academicInfo.expectedGraduation}</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <h3 className="text-xl font-semibold mb-6">Program Settings</h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Academic Program</Label>
                  <Select disabled={!editMode} defaultValue={profileData.program}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Liberal Arts">Liberal Arts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label>Current Year</Label>
                  <Select disabled={!editMode} defaultValue={profileData.year}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Freshman">Freshman</SelectItem>
                      <SelectItem value="Sophomore">Sophomore</SelectItem>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label>Study Focus</Label>
                  <Select disabled={!editMode}>
                    <SelectTrigger>
                    <SelectValue placeholder="Select focus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="software-engineering">Software Engineering</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="networks">Networks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-medium mb-4">Academic Documents</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Transcript</span>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Enrollment Verification</span>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Degree Plan</span>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <h3 className="text-xl font-semibold mb-6">Password & Authentication</h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="••••••••" />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="••••••••" />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" />
                </div>
                
                <Button className="w-full">Update Password</Button>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enhance your account security</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <h3 className="text-xl font-semibold mb-6">Account Security</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Last Login</p>
                      <p className="text-sm text-muted-foreground">April 12, 2024 - 09:45 AM</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Details</Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium mb-2">Login History</h4>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Chrome on Windows</span>
                        <span className="text-sm text-muted-foreground">April 12, 2024</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>College Town, CT</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Safari on iPhone</span>
                        <span className="text-sm text-muted-foreground">April 10, 2024</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>College Town, CT</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Firefox on MacOS</span>
                        <span className="text-sm text-muted-foreground">April 8, 2024</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>College Town, CT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <Button variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out of All Devices
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
            <h3 className="text-xl font-semibold mb-6">Notification Preferences</h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium">Email Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Assignment Updates</p>
                      <p className="text-sm text-muted-foreground">New assignments, due dates, and grades</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Course Announcements</p>
                      <p className="text-sm text-muted-foreground">Updates from instructors and course changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Discussion Replies</p>
                      <p className="text-sm text-muted-foreground">Responses to your forum posts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Direct Messages</p>
                      <p className="text-sm text-muted-foreground">Messages from instructors and classmates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">School Events</p>
                      <p className="text-sm text-muted-foreground">Upcoming events, workshops, and activities</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Push Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Assignment Reminders</p>
                      <p className="text-sm text-muted-foreground">Reminders for upcoming due dates</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Grade Notifications</p>
                      <p className="text-sm text-muted-foreground">Alerts when new grades are posted</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">Class Schedule Alerts</p>
                      <p className="text-sm text-muted-foreground">Reminders before scheduled classes</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Notification Frequency</h4>
                <div className="space-y-3">
                  <Select defaultValue="immediate">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t flex justify-end gap-4">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Preferences</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}