import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, ExternalLink, MapPin, Video } from "lucide-react"
import Link from "next/link"

export default function MentorSessionsPage() {
  // Hardcoded data for demonstration
  const upcomingSessions = [
    {
      id: 1,
      title: "Data Structures and Algorithms Workshop",
      mentor: {
        name: "Prof. Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Faculty",
      },
      date: "May 15, 2024",
      time: "3:00 PM - 5:00 PM",
      location: "Online (Zoom)",
      meetingLink: "https://zoom.us/j/123456789",
      description:
        "A comprehensive workshop on advanced data structures and algorithms. Topics include dynamic programming, graph algorithms, and optimization techniques.",
      tags: ["DSA", "Competitive Programming"],
      isRegistered: true,
    },
    {
      id: 2,
      title: "Career Guidance Session",
      mentor: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Alumni",
      },
      date: "May 18, 2024",
      time: "2:00 PM - 3:30 PM",
      location: "Online (Google Meet)",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      description:
        "Get insights on career paths in tech, resume building, and interview preparation from a Google software engineer.",
      tags: ["Career", "Industry"],
      isRegistered: false,
    },
    {
      id: 3,
      title: "Web Development Masterclass",
      mentor: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Senior",
      },
      date: "May 20, 2024",
      time: "4:00 PM - 6:00 PM",
      location: "Lab 3, Computer Science Building",
      description:
        "Hands-on session on modern web development using React, Next.js, and Tailwind CSS. Bring your laptops!",
      tags: ["Web Dev", "Frontend"],
      isRegistered: true,
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      mentor: {
        name: "Dr. Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Faculty",
      },
      date: "May 25, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Online (Zoom)",
      meetingLink: "https://zoom.us/j/987654321",
      description:
        "Introduction to machine learning concepts, algorithms, and practical applications. Perfect for beginners.",
      tags: ["ML", "AI"],
      isRegistered: false,
    },
  ]

  const pastSessions = [
    {
      id: 5,
      title: "System Design Interview Preparation",
      mentor: {
        name: "James Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Alumni",
      },
      date: "May 5, 2024",
      time: "3:00 PM - 5:00 PM",
      location: "Online (Zoom)",
      description: "Learn how to approach system design interviews with practical examples and case studies.",
      tags: ["System Design", "Interviews"],
      recording: "https://example.com/recording",
      resources: "https://example.com/resources",
    },
    {
      id: 6,
      title: "Introduction to DevOps",
      mentor: {
        name: "Ethan Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Alumni",
      },
      date: "April 28, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Online (Google Meet)",
      description: "Overview of DevOps practices, CI/CD pipelines, and containerization with Docker and Kubernetes.",
      tags: ["DevOps", "Cloud"],
      recording: "https://example.com/recording",
      resources: "https://example.com/resources",
    },
  ]

  const registeredSessions = upcomingSessions.filter((session) => session.isRegistered)

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mentor Sessions</h1>
          <p className="text-muted-foreground">
            Participate in expert-led sessions to enhance your skills and knowledge.
          </p>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="registered">My Registered Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6 space-y-6">
            {upcomingSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{session.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {session.date}
                        <span className="mx-1">•</span>
                        <Clock className="h-4 w-4" />
                        {session.time}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {session.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={session.mentor.avatar} alt={session.mentor.name} />
                      <AvatarFallback>{session.mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{session.mentor.name}</p>
                      <p className="text-sm text-muted-foreground">{session.mentor.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{session.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{session.location}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  {session.isRegistered ? <Badge variant="success">Registered</Badge> : <Button>Register Now</Button>}
                  {session.meetingLink && (
                    <Button variant="outline" asChild>
                      <Link href={session.meetingLink} target="_blank">
                        <Video className="mr-2 h-4 w-4" />
                        Join Meeting
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="registered" className="mt-6 space-y-6">
            {registeredSessions.length > 0 ? (
              registeredSessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{session.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4" />
                          {session.date}
                          <span className="mx-1">•</span>
                          <Clock className="h-4 w-4" />
                          {session.time}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {session.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={session.mentor.avatar} alt={session.mentor.name} />
                        <AvatarFallback>{session.mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{session.mentor.name}</p>
                        <p className="text-sm text-muted-foreground">{session.mentor.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{session.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{session.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline">Cancel Registration</Button>
                    {session.meetingLink && (
                      <Button variant="outline" asChild>
                        <Link href={session.meetingLink} target="_blank">
                          <Video className="mr-2 h-4 w-4" />
                          Join Meeting
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No registered sessions</h3>
                  <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                    You haven't registered for any upcoming mentor sessions yet.
                  </p>
                  <Button asChild>
                    <Link href="#upcoming">Browse Sessions</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6 space-y-6">
            {pastSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{session.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {session.date}
                        <span className="mx-1">•</span>
                        <Clock className="h-4 w-4" />
                        {session.time}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {session.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={session.mentor.avatar} alt={session.mentor.name} />
                      <AvatarFallback>{session.mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{session.mentor.name}</p>
                      <p className="text-sm text-muted-foreground">{session.mentor.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{session.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{session.location}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" asChild>
                    <Link href={session.recording} target="_blank">
                      <Video className="mr-2 h-4 w-4" />
                      View Recording
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={session.resources} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Resources
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

