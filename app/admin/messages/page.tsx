"use client"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Search, Filter, Flag, MoreHorizontal, CheckCircle, XCircle, Plus, Send } from "lucide-react"
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

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [conversations, setConversations] = useState([
    {
      id: "CONV001",
      participants: [
        {
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Student",
        },
        {
          name: "Emma Wilson",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Senior",
        },
      ],
      lastMessage: "Thanks for the advice on the interview preparation!",
      timestamp: "2023-06-15 14:30",
      unread: 0,
      type: "student-senior",
      status: "active",
      flagged: false,
    },
    {
      id: "CONV002",
      participants: [
        {
          name: "Michael Brown",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Student",
        },
        {
          name: "Admin User",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Administrator",
        },
      ],
      lastMessage: "I'm having trouble accessing the resources section.",
      timestamp: "2023-06-14 10:15",
      unread: 2,
      type: "student-admin",
      status: "active",
      flagged: false,
    },
    {
      id: "CONV003",
      participants: [
        {
          name: "Sophia Chen",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Student",
        },
        {
          name: "James Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Student",
        },
      ],
      lastMessage: "Can you share your notes from yesterday's class?",
      timestamp: "2023-06-13 16:45",
      unread: 0,
      type: "student-student",
      status: "active",
      flagged: false,
    },
    {
      id: "CONV004",
      participants: [
        {
          name: "William Taylor",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Senior",
        },
        {
          name: "Olivia Martinez",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Senior",
        },
      ],
      lastMessage: "Let's coordinate for the upcoming mentor session.",
      timestamp: "2023-06-12 09:30",
      unread: 1,
      type: "senior-senior",
      status: "active",
      flagged: false,
    },
    {
      id: "CONV005",
      participants: [
        {
          name: "Anonymous User",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Student",
        },
        {
          name: "Ava Thomas",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Student",
        },
      ],
      lastMessage: "This message contains inappropriate content.",
      timestamp: "2023-06-11 13:20",
      unread: 0,
      type: "student-student",
      status: "flagged",
      flagged: true,
    },
    {
      id: "CONV006",
      participants: [
        {
          name: "Sarah Miller",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Senior",
        },
        {
          name: "Admin User",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Administrator",
        },
      ],
      lastMessage: "I'd like to propose a new mentor session format.",
      timestamp: "2023-06-10 11:05",
      unread: 0,
      type: "senior-admin",
      status: "active",
      flagged: false,
    },
  ])

  // New message form state
  const [newMessage, setNewMessage] = useState({
    recipient: "",
    recipientRole: "Student",
    message: ""
  })

  // Available users (in a real app, this would come from an API)
  const availableUsers = [
    { name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40", role: "Student" },
    { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40", role: "Senior" },
    { name: "Michael Brown", avatar: "/placeholder.svg?height=40&width=40", role: "Student" },
    { name: "Sophia Chen", avatar: "/placeholder.svg?height=40&width=40", role: "Student" },
    { name: "James Rodriguez", avatar: "/placeholder.svg?height=40&width=40", role: "Student" },
    { name: "William Taylor", avatar: "/placeholder.svg?height=40&width=40", role: "Senior" },
    { name: "Olivia Martinez", avatar: "/placeholder.svg?height=40&width=40", role: "Senior" },
    { name: "Ava Thomas", avatar: "/placeholder.svg?height=40&width=40", role: "Student" },
    { name: "Sarah Miller", avatar: "/placeholder.svg?height=40&width=40", role: "Senior" },
  ]

  // Filter users by role
  const filteredUsers = availableUsers.filter(user => 
    newMessage.recipientRole === "All" || user.role === newMessage.recipientRole
  )

  const messageStats = [
    { type: "Student-Student", count: 450, avgResponse: 15 },
    { type: "Student-Senior", count: 320, avgResponse: 25 },
    { type: "Student-Admin", count: 120, avgResponse: 30 },
    { type: "Senior-Senior", count: 85, avgResponse: 20 },
    { type: "Senior-Admin", count: 65, avgResponse: 35 },
  ]

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewMessage(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle message sending
  const handleSendMessage = () => {
    // Get current date and time
    const now = new Date()
    const formattedDateTime = `${now.toISOString().split('T')[0]} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`

    // Find the selected recipient
    const recipient = availableUsers.find(user => user.name === newMessage.recipient)
    
    if (!recipient) return

    // Create new conversation object
    const conversation = {
      id: `CONV${String(conversations.length + 1).padStart(3, '0')}`,
      participants: [
        {
          name: "Admin User",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Administrator",
        },
        {
          name: recipient.name,
          avatar: recipient.avatar,
          role: recipient.role,
        }
      ],
      lastMessage: newMessage.message,
      timestamp: formattedDateTime,
      unread: 0,
      type: `admin-${recipient.role.toLowerCase()}`,
      status: "active",
      flagged: false,
    }

    // Add new conversation to the list
    setConversations([conversation, ...conversations])

    // Reset form and close dialog
    setNewMessage({
      recipient: "",
      recipientRole: "Student",
      message: ""
    })
    setIsDialogOpen(false)
  }

  // Filter conversations based on search query and filters
  const filteredConversations = conversations.filter((conversation) => {
    const participantNames = conversation.participants.map(p => p.name.toLowerCase()).join(' ')
    const matchesSearch = participantNames.includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = filterType === "all" || conversation.type === filterType
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "flagged" && conversation.flagged) ||
      (filterStatus === "active" && !conversation.flagged)
    
    return matchesSearch && matchesType && matchesStatus
  })

  // Validation for form submission
  const isFormValid = 
    newMessage.recipient !== "" && 
    newMessage.message.trim() !== ""

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground">Monitor and moderate conversations on the platform.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Send Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Send New Message</DialogTitle>
                <DialogDescription>
                  Create a new conversation or send a message to a user.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recipientRole" className="text-right">
                    Recipient Type
                  </Label>
                  <Select 
                    name="recipientRole" 
                    value={newMessage.recipientRole} 
                    onValueChange={(value) => setNewMessage(prev => ({ 
                      ...prev, 
                      recipientRole: value,
                      recipient: "" // Reset recipient when role changes
                    }))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select recipient type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="All">All Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recipient" className="text-right">
                    Recipient
                  </Label>
                  <Select 
                    name="recipient" 
                    value={newMessage.recipient} 
                    onValueChange={(value) => setNewMessage(prev => ({ ...prev, recipient: value }))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredUsers.map((user) => (
                        <SelectItem key={user.name} value={user.name}>
                          <div className="flex items-center gap-2">
                            <span>{user.name}</span>
                            <span className="text-xs text-muted-foreground">({user.role})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="message" className="text-right">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={newMessage.message}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Type your message here..."
                    rows={5}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!isFormValid}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Message
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
                  <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
                  <p className="text-2xl font-bold">{conversations.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Today</p>
                  <p className="text-2xl font-bold">215</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Flagged Content</p>
                  <p className="text-2xl font-bold">
                    {conversations.filter(conv => conv.flagged).length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Flag className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all-conversations">
          <TabsList>
            <TabsTrigger value="all-conversations">All Conversations</TabsTrigger>
            <TabsTrigger value="message-stats">Message Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-conversations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversations</CardTitle>
                <CardDescription>View and moderate all conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by participant or message content..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="student-student">Student-Student</SelectItem>
                        <SelectItem value="student-senior">Student-Senior</SelectItem>
                        <SelectItem value="student-admin">Student-Admin</SelectItem>
                        <SelectItem value="senior-senior">Senior-Senior</SelectItem>
                        <SelectItem value="senior-admin">Senior-Admin</SelectItem>
                        <SelectItem value="admin-student">Admin-Student</SelectItem>
                        <SelectItem value="admin-senior">Admin-Senior</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="flagged">Flagged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Participants</TableHead>
                        <TableHead>Last Message</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredConversations.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No conversations found matching your filters.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredConversations.map((conversation) => (
                          <TableRow key={conversation.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                  {conversation.participants.map((participant, index) => (
                                    <Avatar key={index} className="border-2 border-background">
                                      <AvatarImage src={participant.avatar} alt={participant.name} />
                                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                  ))}
                                </div>
                                <div className="ml-2">
                                  <div className="font-medium">
                                    {conversation.participants.map(p => p.name).join(' & ')}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {conversation.participants.map(p => p.role).join(' & ')}
                                  </div>
                                </div>
                                {conversation.unread > 0 && (
                                  <Badge variant="secondary" className="ml-auto">
                                    {conversation.unread} new
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {conversation.lastMessage}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {conversation.timestamp}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {conversation.type.replace('-', ' → ')}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {conversation.flagged ? (
                                <Badge variant="destructive" className="flex items-center gap-1">
                                  <Flag className="h-3 w-3" />
                                  Flagged
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                                  Active
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Conversation</DropdownMenuItem>
                                  <DropdownMenuItem>Send Message</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {conversation.flagged ? (
                                    <DropdownMenuItem className="text-green-600">
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Approve Content
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem className="text-red-600">
                                      <Flag className="mr-2 h-4 w-4" />
                                      Flag Content
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Block Conversation
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="message-stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Statistics</CardTitle>
                <CardDescription>Overview of messaging activity by conversation type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Conversation Type</TableHead>
                        <TableHead>Total Count</TableHead>
                        <TableHead>Avg. Response Time (min)</TableHead>
                        <TableHead>Activity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {messageStats.map((stat) => (
                        <TableRow key={stat.type}>
                          <TableCell>
                            <div className="font-medium">{stat.type}</div>
                          </TableCell>
                          <TableCell>{stat.count}</TableCell>
                          <TableCell>{stat.avgResponse} minutes</TableCell>
                          <TableCell>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ width: `${(stat.count / 450) * 100}%` }}
                              ></div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}