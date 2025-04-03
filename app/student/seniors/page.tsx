import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Search, Users } from "lucide-react"
import Link from "next/link"

export default function SeniorsPage() {
  // Hardcoded data for demonstration
  const seniors = [
    {
      id: 1,
      name: "Emma Wilson",
      role: "Software Engineer at Google",
      branch: "Computer Science",
      batch: "2020",
      skills: ["React", "Node.js", "Python"],
      avatar: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
      isConnected: false,
    },
    {
      id: 2,
      name: "James Rodriguez",
      role: "Data Scientist at Amazon",
      branch: "Computer Science",
      batch: "2019",
      skills: ["Machine Learning", "Python", "SQL"],
      avatar: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
      isConnected: true,
    },
    {
      id: 3,
      name: "Sophia Chen",
      role: "Product Manager at Microsoft",
      branch: "Information Technology",
      batch: "2020",
      skills: ["Product Management", "UX Design", "Agile"],
      avatar: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
      isConnected: false,
    },
    {
      id: 4,
      name: "Michael Brown",
      role: "Frontend Developer at Facebook",
      branch: "Computer Science",
      batch: "2019",
      skills: ["React", "TypeScript", "CSS"],
      avatar: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
      isConnected: true,
    },
    {
      id: 5,
      name: "Olivia Martinez",
      role: "Backend Engineer at Netflix",
      branch: "Information Technology",
      batch: "2018",
      skills: ["Java", "Spring Boot", "Microservices"],
      avatar: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
      isConnected: false,
    },
    {
      id: 6,
      name: "William Taylor",
      role: "ML Engineer at Apple",
      branch: "Electronics",
      batch: "2019",
      skills: ["TensorFlow", "PyTorch", "Computer Vision"],
      avatar: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
      isConnected: false,
    },
    {
      id: 7,
      name: "Ava Johnson",
      role: "UI/UX Designer at Adobe",
      branch: "Design",
      batch: "2020",
      skills: ["Figma", "Adobe XD", "Sketch"],
      avatar: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
      isConnected: true,
    },
    {
      id: 8,
      name: "Ethan Davis",
      role: "DevOps Engineer at IBM",
      branch: "Computer Science",
      batch: "2018",
      skills: ["Docker", "Kubernetes", "AWS"],
      avatar: "https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png",
      isConnected: false,
    },
  ]

  const connections = seniors.filter((senior) => senior.isConnected)

  return (
    <DashboardLayout userType="student">
      <div className="w-full max-h-screen">
        <div className="container mx-auto px-4 py-6 max-w-full">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Connect with Seniors</h1>
            <p className="text-muted-foreground">Find and connect with seniors who can guide you in your career.</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Seniors</TabsTrigger>
                <TabsTrigger value="connections">My Connections</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search seniors..." className="pl-8 w-full md:w-[250px]" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                    <SelectItem value="ec">Electronics</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {seniors.map((senior) => (
                  <Card key={senior.id} className="overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-24"></div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-center -mt-12">
                        <Avatar className="h-24 w-24 border-4 border-white">
                          <AvatarImage src={senior.avatar} alt={senior.name} />
                          <AvatarFallback>{senior.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="text-center mt-3">
                        <h3 className="font-semibold text-lg">{senior.name}</h3>
                        <p className="text-sm text-muted-foreground">{senior.role}</p>
                        <div className="flex items-center justify-center gap-2 mt-1">
                          <Badge variant="outline">{senior.branch}</Badge>
                          <Badge variant="outline">{senior.batch}</Badge>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {senior.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button className="flex-1" variant={senior.isConnected ? "outline" : "default"}>
                          <Users className="mr-2 h-4 w-4" />
                          {senior.isConnected ? "Connected" : "Connect"}
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/student/messages?user=${senior.id}`}>
                            <MessageSquare className="h-4 w-4" />
                            <span className="sr-only">Message</span>
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="connections" className="w-full">
              {connections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {connections.map((senior) => (
                    <Card key={senior.id} className="overflow-hidden">
                      <CardHeader className="p-0">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-24"></div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-center -mt-12">
                          <Avatar className="h-24 w-24 border-4 border-white">
                            <AvatarImage src={senior.avatar} alt={senior.name} />
                            <AvatarFallback>{senior.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="text-center mt-3">
                          <h3 className="font-semibold text-lg">{senior.name}</h3>
                          <p className="text-sm text-muted-foreground">{senior.role}</p>
                          <div className="flex items-center justify-center gap-2 mt-1">
                            <Badge variant="outline">{senior.branch}</Badge>
                            <Badge variant="outline">{senior.batch}</Badge>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {senior.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button className="flex-1" variant="outline">
                            <Users className="mr-2 h-4 w-4" />
                            Connected
                          </Button>
                          <Button variant="outline" size="icon" asChild>
                            <Link href={`/student/messages?user=${senior.id}`}>
                              <MessageSquare className="h-4 w-4" />
                              <span className="sr-only">Message</span>
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No connections yet</h3>
                    <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                      You haven't connected with any seniors yet. Start by connecting with seniors who can guide you.
                    </p>
                    <Button asChild>
                      <Link href="#all">Browse Seniors</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}