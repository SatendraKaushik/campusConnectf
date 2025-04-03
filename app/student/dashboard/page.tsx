import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Calendar, Code2, ExternalLink, MessageSquare, Users, FileText } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  // Hardcoded data for demonstration
  const recentActivities = [
    { id: 1, type: "post", title: "New Internship Opportunities", time: "2 hours ago" },
    { id: 2, type: "mentor", title: "Upcoming DSA Workshop", time: "Yesterday" },
    { id: 3, type: "performance", title: "Completed LeetCode Challenge", time: "2 days ago" },
    { id: 4, type: "message", title: "New message from Mentor", time: "3 days ago" },
  ]

  const upcomingEvents = [
    { id: 1, title: "DSA Workshop", date: "Tomorrow, 3:00 PM", host: "Prof. Smith" },
    { id: 2, title: "Career Guidance Session", date: "May 15, 2:00 PM", host: "Career Cell" },
    { id: 3, title: "Hackathon Briefing", date: "May 20, 10:00 AM", host: "Tech Club" },
  ]

  const performanceStats = {
    leetcode: { solved: 120, total: 2000, rank: 15243 },
    codechef: { rating: 1823, contests: 12, highestRank: 342 },
    gfg: { solved: 85, score: 350 },
    codingNinjas: { points: 1250, rank: "Knight" },
  }

  const recommendedSeniors = [
    { id: 1, name: "Emma Wilson", role: "Software Engineer at Google", avatar: "https://png.pngtree.com/png-clipart/20230102/original/pngtree-business-man-avatar-png-image_8855195.png" },
    { id: 2, name: "James Rodriguez", role: "Data Scientist at Amazon", avatar: "https://png.pngtree.com/png-clipart/20230102/original/pngtree-business-man-avatar-png-image_8855195.png" },
    { id: 3, name: "Sophia Chen", role: "Product Manager at Microsoft", avatar: "https://png.pngtree.com/png-clipart/20230102/original/pngtree-business-man-avatar-png-image_8855195.png" },
  ]

  return (
    <DashboardLayout userType="student">
      <div className="container mx-auto px-4 py-6 max-w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Alex! Here's what's happening with your account.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/student/performance">
                <BarChart className="mr-2 h-4 w-4" />
                View Performance
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">LeetCode Progress</CardTitle>
              <CardDescription>Your coding practice stats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{performanceStats.leetcode.solved}</p>
                  <p className="text-xs text-muted-foreground">Problems Solved</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${(performanceStats.leetcode.solved / performanceStats.leetcode.total) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-muted-foreground flex justify-between">
                <span>Rank: #{performanceStats.leetcode.rank}</span>
                <span>
                  {performanceStats.leetcode.solved}/{performanceStats.leetcode.total} Problems
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">CodeChef Rating</CardTitle>
              <CardDescription>Your competitive coding stats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{performanceStats.codechef.rating}</p>
                  <p className="text-xs text-muted-foreground">Current Rating</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Contests Participated</span>
                  <span className="font-medium">{performanceStats.codechef.contests}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Highest Rank</span>
                  <span className="font-medium">#{performanceStats.codechef.highestRank}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Upcoming Sessions</CardTitle>
              <CardDescription>Scheduled mentor sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                      <p className="text-xs text-muted-foreground">Host: {event.host}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/student/mentor-sessions">View All Sessions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="activities" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="activities">Recent Activities</TabsTrigger>
                <TabsTrigger value="posts">Latest Posts</TabsTrigger>
              </TabsList>
              <TabsContent value="activities" className="mt-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 p-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            {activity.type === "post" && <FileText className="h-5 w-5 text-primary" />}
                            {activity.type === "mentor" && <Calendar className="h-5 w-5 text-primary" />}
                            {activity.type === "performance" && <BarChart className="h-5 w-5 text-primary" />}
                            {activity.type === "message" && <MessageSquare className="h-5 w-5 text-primary" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{activity.title}</p>
                              <Badge variant="outline" className="text-xs">
                                {activity.time}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {activity.type === "post" && "New post available in the forum"}
                              {activity.type === "mentor" && "New mentor session has been scheduled"}
                              {activity.type === "performance" && "You've made progress in your coding journey"}
                              {activity.type === "message" && "You have unread messages"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="posts" className="mt-4">
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Career Cell" />
                            <AvatarFallback>CC</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Career Cell</p>
                            <p className="text-xs text-muted-foreground">Posted 2 hours ago</p>
                          </div>
                        </div>
                        <h3 className="text-base font-medium mb-2">Summer Internship Opportunities</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Several companies have opened applications for summer internships. Check the career portal for
                          more details.
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="#">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Tech Club" />
                            <AvatarFallback>TC</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Tech Club</p>
                            <p className="text-xs text-muted-foreground">Posted yesterday</p>
                          </div>
                        </div>
                        <h3 className="text-base font-medium mb-2">Annual Hackathon Announcement</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          The annual college hackathon will be held next month. Registration opens next week.
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="#">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/student/posts">View All Posts</Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Recommended Seniors</CardTitle>
              <CardDescription>Connect with seniors in your field</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recommendedSeniors.map((senior) => (
                  <div key={senior.id} className="flex items-center gap-4 p-4">
                    <Avatar>
                      <AvatarImage src={senior.avatar} alt={senior.name} />
                      <AvatarFallback>{senior.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{senior.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{senior.role}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Users className="h-4 w-4" />
                      <span className="sr-only">Connect</span>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="p-4 pt-0">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/student/seniors">View All Seniors</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}