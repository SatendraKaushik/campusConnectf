import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, ExternalLink, MessageSquare, Search, Share2, ThumbsUp } from "lucide-react"
import Link from "next/link"

export default function PostsPage() {
  // Hardcoded data for demonstration
  const posts = [
    {
      id: 1,
      author: {
        name: "Career Cell",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Official",
      },
      title: "Summer Internship Opportunities",
      content:
        "Several companies have opened applications for summer internships. The last date to apply is May 30th. Check the career portal for more details and application links.",
      category: "Opportunities",
      date: "2 hours ago",
      likes: 45,
      comments: 12,
      isLiked: true,
    },
    {
      id: 2,
      author: {
        name: "Tech Club",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Club",
      },
      title: "Annual Hackathon Announcement",
      content:
        "The annual college hackathon will be held next month. Registration opens next week. Form your teams of 3-4 members and get ready for 24 hours of coding, innovation, and fun!",
      category: "Events",
      date: "Yesterday",
      likes: 78,
      comments: 23,
      isLiked: false,
    },
    {
      id: 3,
      author: {
        name: "Prof. Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Faculty",
      },
      title: "Special Lecture on AI and Machine Learning",
      content:
        "I'll be conducting a special lecture on 'Recent Advances in AI and Machine Learning' this Friday at 3 PM in the Main Auditorium. All interested students are welcome to attend.",
      category: "Academics",
      date: "2 days ago",
      likes: 32,
      comments: 8,
      isLiked: false,
    },
    {
      id: 4,
      author: {
        name: "Placement Cell",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Official",
      },
      title: "Mock Interview Sessions",
      content:
        "We are organizing mock interview sessions for final year students next week. Sign up through the placement portal to secure your slot. Limited seats available.",
      category: "Placements",
      date: "3 days ago",
      likes: 56,
      comments: 15,
      isLiked: true,
    },
    {
      id: 5,
      author: {
        name: "Cultural Committee",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Club",
      },
      title: "Annual Cultural Fest Dates Announced",
      content:
        "Mark your calendars! The annual cultural fest will be held from June 10-12. Registrations for various events will open next week. Stay tuned for more updates.",
      category: "Events",
      date: "4 days ago",
      likes: 89,
      comments: 27,
      isLiked: false,
    },
  ]

  const announcements = posts.filter((post) => post.author.role === "Official")
  const events = posts.filter((post) => post.category === "Events")
  const academic = posts.filter((post) => post.category === "Academics")

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Posts & Announcements</h1>
            <p className="text-muted-foreground">Stay updated with the latest news and events from your college.</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search posts..."
              className="pl-8 w-full md:w-[250px]"
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6 space-y-6">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{post.author.name}</CardTitle>
                          <Badge variant="outline">{post.author.role}</Badge>
                        </div>
                        <CardDescription>{post.date}</CardDescription>
                      </div>
                    </div>
                    <Badge>{post.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className={post.isLiked ? "text-primary" : ""}>
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                  {post.category === "Events" && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Link>
                    </Button>
                  )}
                  {post.category === "Opportunities" && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Apply Now
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="announcements" className="mt-6 space-y-6">
            {announcements.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{post.author.name}</CardTitle>
                          <Badge variant="outline">{post.author.role}</Badge>
                        </div>
                        <CardDescription>{post.date}</CardDescription>
                      </div>
                    </div>
                    <Badge>{post.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className={post.isLiked ? "text-primary" : ""}>
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                  {post.category === "Opportunities" && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Apply Now
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="events" className="mt-6 space-y-6">
            {events.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{post.author.name}</CardTitle>
                          <Badge variant="outline">{post.author.role}</Badge>
                        </div>
                        <CardDescription>{post.date}</CardDescription>
                      </div>
                    </div>
                    <Badge>{post.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className={post.isLiked ? "text-primary" : ""}>
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#">
                      <Calendar className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="academic" className="mt-6 space-y-6">
            {academic.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{post.author.name}</CardTitle>
                          <Badge variant="outline">{post.author.role}</Badge>
                        </div>
                        <CardDescription>{post.date}</CardDescription>
                      </div>
                    </div>
                    <Badge>{post.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-6">
                    <Button variant="ghost" size="sm" className={post.isLiked ? "text-primary" : ""}>
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}