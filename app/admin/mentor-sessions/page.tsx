"use client"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Search, Filter, Clock, Users, CheckCircle, XCircle, MoreHorizontal, Plus } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function MentorSessionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sessions, setSessions] = useState([
    {
      id: "MS001",
      title: "Technical Interview Preparation",
      mentor: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Senior",
      },
      date: "2023-06-20",
      time: "14:00 - 15:30",
      duration: 90,
      type: "Technical",
      attendees: 12,
      maxAttendees: 15,
      status: "upcoming",
      description: "Learn how to ace technical interviews with practical tips and mock interview sessions.",
    },
    {
      id: "MS002",
      title: "Resume Building Workshop",
      mentor: {
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Senior",
      },
      date: "2023-06-18",
      time: "10:00 - 11:30",
      duration: 90,
      type: "Career",
      attendees: 20,
      maxAttendees: 20,
      status: "upcoming",
      description: "Learn how to create an impressive resume that stands out to recruiters.",
    },
    {
      id: "MS003",
      title: "Data Structures Deep Dive",
      mentor: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Senior",
      },
      date: "2023-06-15",
      time: "16:00 - 18:00",
      duration: 120,
      type: "Technical",
      attendees: 18,
      maxAttendees: 25,
      status: "completed",
      description: "Advanced session on complex data structures and their applications.",
    },
    {
      id: "MS004",
      title: "Networking for Tech Professionals",
      mentor: {
        name: "William Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Senior",
      },
      date: "2023-06-12",
      time: "15:00 - 16:00",
      duration: 60,
      type: "Career",
      attendees: 15,
      maxAttendees: 15,
      status: "completed",
      description: "Learn effective networking strategies for building professional connections in the tech industry.",
    },
    {
      id: "MS005",
      title: "System Design Principles",
      mentor: {
        name: "James Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Senior",
      },
      date: "2023-06-25",
      time: "11:00 - 13:00",
      duration: 120,
      type: "Technical",
      attendees: 8,
      maxAttendees: 20,
      status: "upcoming",
      description: "Introduction to system design concepts and architecture patterns for scalable applications.",
    },
    {
      id: "MS006",
      title: "Behavioral Interview Strategies",
      mentor: {
        name: "Olivia Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Senior",
      },
      date: "2023-06-10",
      time: "13:00 - 14:30",
      duration: 90,
      type: "Career",
      attendees: 22,
      maxAttendees: 25,
      status: "completed",
      description: "Prepare for behavioral interviews with strategies to showcase your soft skills and experiences.",
    },
  ])

  // New session form state
  const [newSession, setNewSession] = useState({
    title: "",
    mentorName: "",
    date: "",
    startTime: "",
    endTime: "",
    type: "Technical",
    maxAttendees: 20,
    description: ""
  })

  // Available mentors (in a real app, this would come from an API)
  const availableMentors = [
    { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40", role: "Senior" },
    { name: "Sarah Miller", avatar: "/placeholder.svg?height=40&width=40", role: "Senior" },
    { name: "Michael Brown", avatar: "/placeholder.svg?height=40&width=40", role: "Senior" },
    { name: "William Taylor", avatar: "/placeholder.svg?height=40&width=40", role: "Senior" },
    { name: "James Rodriguez", avatar: "/placeholder.svg?height=40&width=40", role: "Senior" },
    { name: "Olivia Martinez", avatar: "/placeholder.svg?height=40&width=40", role: "Senior" },
  ]

  const sessionStats = [
    { month: "January", sessions: 15, attendance: 85 },
    { month: "February", sessions: 18, attendance: 82 },
    { month: "March", sessions: 22, attendance: 88 },
    { month: "April", sessions: 25, attendance: 90 },
    { month: "May", sessions: 28, attendance: 92 },
    { month: "June", sessions: 30, attendance: 89 },
  ]

  const sessionTypeStats = [
    { type: "Technical", count: 45, avgAttendance: 85 },
    { type: "Career", count: 38, avgAttendance: 90 },
    { type: "Academic", count: 25, avgAttendance: 75 },
    { type: "Other", count: 12, avgAttendance: 70 },
  ]

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewSession(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle session creation
  const handleCreateSession = () => {
    // Calculate duration in minutes
    const startTimeParts = newSession.startTime.split(':').map(Number)
    const endTimeParts = newSession.endTime.split(':').map(Number)
    const startMinutes = startTimeParts[0] * 60 + startTimeParts[1]
    const endMinutes = endTimeParts[0] * 60 + endTimeParts[1]
    const durationMinutes = endMinutes - startMinutes

    // Find the selected mentor
    const mentor = availableMentors.find(m => m.name === newSession.mentorName) || availableMentors[0]

    // Create new session object
    const session = {
      id: `MS${String(sessions.length + 1).padStart(3, '0')}`,
      title: newSession.title,
      mentor: {
        name: mentor.name,
        avatar: mentor.avatar,
        role: mentor.role,
      },
      date: newSession.date,
      time: `${newSession.startTime} - ${newSession.endTime}`,
      duration: durationMinutes,
      type: newSession.type,
      attendees: 0,
      maxAttendees: Number(newSession.maxAttendees),
      status: "upcoming",
      description: newSession.description,
    }

    // Add new session to the list
    setSessions([...sessions, session])

    // Reset form and close dialog
    setNewSession({
      title: "",
      mentorName: "",
      date: "",
      startTime: "",
      endTime: "",
      type: "Technical",
      maxAttendees: 20,
      description: ""
    })
    setIsDialogOpen(false)
  }

  // Filter sessions based on search query and filters
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || session.status === filterStatus
    const matchesType = filterType === "all" || session.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  // Validation for form submission
  const isFormValid = 
    newSession.title.trim() !== "" && 
    newSession.mentorName !== "" && 
    newSession.date !== "" && 
    newSession.startTime !== "" && 
    newSession.endTime !== "" && 
    newSession.description.trim() !== ""

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mentor Sessions</h1>
            <p className="text-muted-foreground">Manage and monitor all mentor sessions on the platform.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Session
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Mentor Session</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new mentor session.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={newSession.title}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Session title"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="mentorName" className="text-right">
                    Mentor
                  </Label>
                  <Select 
                    name="mentorName" 
                    value={newSession.mentorName} 
                    onValueChange={(value) => setNewSession(prev => ({ ...prev, mentorName: value }))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a mentor" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMentors.map((mentor) => (
                        <SelectItem key={mentor.name} value={mentor.name}>
                          {mentor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newSession.date}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <div className="col-span-3 flex items-center gap-2">
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={newSession.startTime}
                      onChange={handleInputChange}
                    />
                    <span>to</span>
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={newSession.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select 
                    name="type" 
                    value={newSession.type} 
                    onValueChange={(value) => setNewSession(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Career">Career</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="maxAttendees" className="text-right">
                    Max Attendees
                  </Label>
                  <Input
                    id="maxAttendees"
                    name="maxAttendees"
                    type="number"
                    min="1"
                    value={newSession.maxAttendees}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newSession.description}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Describe the session"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSession} disabled={!isFormValid}>
                  Create Session
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-bold">{sessions.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming Sessions</p>
                  <p className="text-2xl font-bold">
                    {sessions.filter(session => session.status === "upcoming").length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Attendance</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all-sessions">
          <TabsList>
            <TabsTrigger value="all-sessions">All Sessions</TabsTrigger>
            <TabsTrigger value="session-stats">Session Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-sessions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sessions List</CardTitle>
                <CardDescription>View and manage all mentor sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by title, mentor, or description..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Technical">Technical</SelectItem>
                        <SelectItem value="Career">Career</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Session</TableHead>
                        <TableHead>Mentor</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{session.title}</span>
                              <span className="text-xs text-muted-foreground truncate max-w-[200px]">{session.description}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={session.mentor.avatar} alt={session.mentor.name} />
                                <AvatarFallback>{session.mentor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{session.mentor.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{session.date}</span>
                              <span className="text-xs text-muted-foreground">{session.time} ({session.duration} min)</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{session.type}</Badge>
                          </TableCell>
                          <TableCell>
                            {session.attendees}/{session.maxAttendees}
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${(session.attendees / session.maxAttendees) * 100}%` }}
                              ></div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                session.status === "upcoming" ? "default" : "secondary"
                              }
                            >
                              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Session</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View Attendees</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Cancel Session</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="session-stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Statistics</CardTitle>
                <CardDescription>Session distribution and attendance by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Monthly Sessions</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Month</TableHead>
                            <TableHead>Total Sessions</TableHead>
                            <TableHead>Avg. Attendance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sessionStats.map((stat) => (
                            <TableRow key={stat.month}>
                              <TableCell className="font-medium">{stat.month}</TableCell>
                              <TableCell>{stat.sessions}</TableCell>
                              <TableCell>{stat.attendance}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Sessions by Type</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Total Sessions</TableHead>
                            <TableHead>Avg. Attendance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sessionTypeStats.map((stat) => (
                            <TableRow key={stat.type}>
                              <TableCell className="font-medium">{stat.type}</TableCell>
                              <TableCell>{stat.count}</TableCell>
                              <TableCell>{stat.avgAttendance}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}