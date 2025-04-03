import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, ExternalLink, MapPin, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function EventsPage() {
  // Hardcoded data for demonstration
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Tech Fest",
      description:
        "Join us for the biggest tech fest of the year featuring hackathons, coding competitions, and tech talks from industry experts.",
      date: "2024-06-15",
      time: "9:00 AM - 6:00 PM",
      location: "Main Auditorium",
      organizer: "Tech Club",
      category: "Tech",
      image: "/placeholder.svg?height=200&width=400",
      registrationLink: "#",
    },
    {
      id: 2,
      title: "Career Fair 2024",
      description:
        "Connect with top companies and explore internship and job opportunities. Bring your resume and dress professionally.",
      date: "2024-06-20",
      time: "10:00 AM - 4:00 PM",
      location: "College Grounds",
      organizer: "Placement Cell",
      category: "Career",
      image: "/placeholder.svg?height=200&width=400",
      registrationLink: "#",
    },
    {
      id: 3,
      title: "Workshop on AI and Machine Learning",
      description: "Learn the fundamentals of AI and ML with hands-on exercises and real-world applications.",
      date: "2024-06-25",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Science Lab",
      organizer: "AI Club",
      category: "Workshop",
      image: "/placeholder.svg?height=200&width=400",
      registrationLink: "#",
    },
    {
      id: 4,
      title: "Cultural Night",
      description: "Enjoy performances by talented students showcasing music, dance, and drama.",
      date: "2024-07-05",
      time: "6:00 PM - 10:00 PM",
      location: "Open Air Theatre",
      organizer: "Cultural Committee",
      category: "Cultural",
      image: "/placeholder.svg?height=200&width=400",
      registrationLink: "#",
    },
    {
      id: 5,
      title: "Alumni Meet 2024",
      description: "Connect with alumni and learn from their experiences and insights.",
      date: "2024-07-15",
      time: "11:00 AM - 3:00 PM",
      location: "Conference Hall",
      organizer: "Alumni Association",
      category: "Networking",
      image: "/placeholder.svg?height=200&width=400",
      registrationLink: "#",
    },
  ]

  const pastEvents = [
    {
      id: 6,
      title: "Spring Hackathon",
      description: "A 24-hour coding competition where teams built innovative solutions to real-world problems.",
      date: "2024-04-10",
      time: "9:00 AM - 9:00 AM (next day)",
      location: "Computer Science Building",
      organizer: "Tech Club",
      category: "Tech",
      image: "/placeholder.svg?height=200&width=400",
      photos: "#",
      recordings: "#",
    },
    {
      id: 7,
      title: "Guest Lecture: Future of AI",
      description: "An insightful lecture by Dr. Smith from Google on the future of AI and its impact on society.",
      date: "2024-04-15",
      time: "3:00 PM - 5:00 PM",
      location: "Main Auditorium",
      organizer: "Computer Science Department",
      category: "Academic",
      image: "/placeholder.svg?height=200&width=400",
      photos: "#",
      recordings: "#",
    },
  ]

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Events Calendar</h1>
            <p className="text-muted-foreground">Discover and participate in upcoming college events</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search events..." className="pl-8 w-full md:w-[250px]" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="career">Career</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="upcoming">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
                <TabsTrigger value="registered">My Registered Events</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-6 space-y-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto bg-muted">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{event.title}</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <CalendarIcon className="h-4 w-4" />
                                {format(new Date(event.date), "MMMM d, yyyy")}
                                <span className="mx-1">•</span>
                                <Clock className="h-4 w-4" />
                                {event.time}
                              </CardDescription>
                            </div>
                            <Badge>{event.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{event.description}</p>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{event.location}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Organized by:</span> {event.organizer}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <Button asChild>
                            <Link href={event.registrationLink}>Register Now</Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="past" className="mt-6 space-y-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto bg-muted">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{event.title}</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <CalendarIcon className="h-4 w-4" />
                                {format(new Date(event.date), "MMMM d, yyyy")}
                                <span className="mx-1">•</span>
                                <Clock className="h-4 w-4" />
                                {event.time}
                              </CardDescription>
                            </div>
                            <Badge>{event.category}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{event.description}</p>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{event.location}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Organized by:</span> {event.organizer}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="outline" asChild>
                            <Link href={event.photos}>View Photos</Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href={event.recordings}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Recordings
                            </Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="registered" className="mt-6">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No registered events</h3>
                    <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                      You haven't registered for any upcoming events yet.
                    </p>
                    <Button asChild>
                      <Link href="#upcoming">Browse Events</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View events by date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" className="rounded-md border" />
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-medium">Upcoming Events</h3>
                  <div className="space-y-2">
                    {upcomingEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>{format(new Date(event.date), "MMM d")}</span>
                        <span className="truncate">{event.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#upcoming">View All Events</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Filter events by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    All
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Tech
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Career
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Workshop
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Cultural
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Academic
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    Networking
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

