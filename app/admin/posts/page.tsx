"use client"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Search, Filter, Eye, ThumbsUp, MessageSquare, Flag, MoreHorizontal, Plus } from "lucide-react"
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

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [posts, setPosts] = useState([
    {
      id: "POST001",
      title: "Tips for Cracking Technical Interviews",
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      category: "Career",
      date: "2023-06-15",
      views: 1250,
      likes: 85,
      comments: 32,
      status: "approved",
      flagged: false,
      excerpt: "In this post, I share my experience and tips for technical interviews...",
    },
    {
      id: "POST002",
      title: "My Internship Experience at Google",
      author: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Senior",
      },
      category: "Experience",
      date: "2023-06-10",
      views: 980,
      likes: 120,
      comments: 45,
      status: "approved",
      flagged: false,
      excerpt: "I recently completed my summer internship at Google and wanted to share...",
    },
    {
      id: "POST003",
      title: "Resources for Learning Data Structures",
      author: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      category: "Academic",
      date: "2023-06-08",
      views: 750,
      likes: 65,
      comments: 28,
      status: "approved",
      flagged: false,
      excerpt: "Here's a compilation of the best resources I've found for learning data structures...",
    },
    {
      id: "POST004",
      title: "Campus Hackathon Announcement",
      author: {
        name: "Admin User",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Administrator",
      },
      category: "Announcement",
      date: "2023-06-05",
      views: 1500,
      likes: 95,
      comments: 50,
      status: "approved",
      flagged: false,
      excerpt: "We're excited to announce our upcoming campus hackathon scheduled for...",
    },
    {
      id: "POST005",
      title: "Inappropriate Content - Please Remove",
      author: {
        name: "Anonymous User",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      category: "Other",
      date: "2023-06-03",
      views: 120,
      likes: 5,
      comments: 15,
      status: "flagged",
      flagged: true,
      excerpt: "This post contains inappropriate content that violates community guidelines...",
    },
    {
      id: "POST006",
      title: "How I Secured a Full-Time Offer",
      author: {
        name: "Sarah Miller",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Senior",
      },
      category: "Career",
      date: "2023-06-01",
      views: 850,
      likes: 75,
      comments: 30,
      status: "approved",
      flagged: false,
      excerpt: "After a long recruitment process, I'm happy to share that I've secured a full-time offer...",
    },
    {
      id: "POST007",
      title: "New Content Under Review",
      author: {
        name: "James Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      category: "Academic",
      date: "2023-05-28",
      views: 0,
      likes: 0,
      comments: 0,
      status: "pending",
      flagged: false,
      excerpt: "This post is currently under review by moderators...",
    },
  ])

  // New post form state
  const [newPost, setNewPost] = useState({
    title: "",
    category: "Announcement",
    content: "",
  })

  const categoryStats = [
    { category: "Career", count: 125, avgEngagement: 85 },
    { category: "Academic", count: 210, avgEngagement: 72 },
    { category: "Experience", count: 95, avgEngagement: 90 },
    { category: "Announcement", count: 45, avgEngagement: 88 },
    { category: "Question", count: 180, avgEngagement: 65 },
    { category: "Other", count: 75, avgEngagement: 50 },
  ]

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle post creation
  const handleCreatePost = () => {
    // Get current date
    const today = new Date()
    const formattedDate = today.toISOString().split('T')[0]

    // Create new post object
    const post = {
      id: `POST${String(posts.length + 1).padStart(3, '0')}`,
      title: newPost.title,
      author: {
        name: "Admin User",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Administrator",
      },
      category: newPost.category,
      date: formattedDate,
      views: 0,
      likes: 0,
      comments: 0,
      status: "approved", // Admin posts are auto-approved
      flagged: false,
      excerpt: newPost.content.length > 100 ? newPost.content.substring(0, 100) + "..." : newPost.content,
    }

    // Add new post to the list
    setPosts([post, ...posts])

    // Reset form and close dialog
    setNewPost({
      title: "",
      category: "Announcement",
      content: "",
    })
    setIsDialogOpen(false)
  }

  // Filter posts based on search query and filters
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = filterCategory === "all" || post.category === filterCategory
    const matchesStatus = filterStatus === "all" || post.status === filterStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Validation for form submission
  const isFormValid = 
    newPost.title.trim() !== "" && 
    newPost.category !== "" && 
    newPost.content.trim() !== ""

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Posts Management</h1>
            <p className="text-muted-foreground">Manage and moderate all posts on the platform.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>
                  Create a new announcement or post for the platform.
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
                    value={newPost.title}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Post title"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select 
                    name="category" 
                    value={newPost.category} 
                    onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Announcement">Announcement</SelectItem>
                      <SelectItem value="Career">Career</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Experience">Experience</SelectItem>
                      <SelectItem value="Question">Question</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content" className="text-right">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Write your post content here..."
                    rows={8}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePost} disabled={!isFormValid}>
                  Publish Post
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
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold">{posts.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold">
                    {posts.filter(post => post.status === "pending").length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-yellow-500" />
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
                    {posts.filter(post => post.flagged).length}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Flag className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all-posts">
          <TabsList>
            <TabsTrigger value="all-posts">All Posts</TabsTrigger>
            <TabsTrigger value="category-stats">Category Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-posts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Posts List</CardTitle>
                <CardDescription>View and manage all posts on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by title, author, or content..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Career">Career</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Experience">Experience</SelectItem>
                        <SelectItem value="Announcement">Announcement</SelectItem>
                        <SelectItem value="Question">Question</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="flagged">Flagged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Post</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Engagement</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{post.title}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">{post.author.name}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs">{post.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs">{post.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs">{post.comments}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                post.status === "approved" ? "default" : 
                                post.status === "pending" ? "outline" : 
                                "destructive"
                              }
                            >
                              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
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
                                <DropdownMenuItem>View Post</DropdownMenuItem>
                                <DropdownMenuItem>Edit Post</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {post.status === "pending" && (
                                  <DropdownMenuItem>Approve</DropdownMenuItem>
                                )}
                                {post.status === "flagged" && (
                                  <DropdownMenuItem>Mark as Safe</DropdownMenuItem>
                                )}
                                {post.status !== "flagged" && (
                                  <DropdownMenuItem className="text-red-600">Flag Content</DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-red-600">Delete Post</DropdownMenuItem>
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
          
          <TabsContent value="category-stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Statistics</CardTitle>
                <CardDescription>Post distribution and engagement by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Total Posts</TableHead>
                        <TableHead>Average Engagement</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryStats.map((category) => (
                        <TableRow key={category.category}>
                          <TableCell className="font-medium">{category.category}</TableCell>
                          <TableCell>{category.count}</TableCell>
                          <TableCell>{category.avgEngagement}%</TableCell>
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