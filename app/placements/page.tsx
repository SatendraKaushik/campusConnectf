import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Building2, ExternalLink, Search, MapPin, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

export default function PlacementsPage() {
  // Hardcoded data for demonstration
  const companies = [
    {
      id: 1,
      name: "Google",
      logo: "/placeholder.svg?height=40&width=40",
      description:
        "Google LLC is an American multinational technology company that specializes in Internet-related services and products.",
      openings: [
        { role: "Software Engineer", package: "₹25-30 LPA", deadline: "June 30, 2024" },
        { role: "Product Manager", package: "₹28-35 LPA", deadline: "July 15, 2024" },
      ],
      location: "Bangalore, India",
      eligibility: "CGPA 8.0+, Computer Science/IT",
      applicationLink: "#",
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "/placeholder.svg?height=40&width=40",
      description:
        "Microsoft Corporation is an American multinational technology corporation that produces computer software, consumer electronics, and related services.",
      openings: [
        { role: "Software Engineer", package: "₹20-25 LPA", deadline: "July 5, 2024" },
        { role: "Data Scientist", package: "₹22-28 LPA", deadline: "July 10, 2024" },
      ],
      location: "Hyderabad, India",
      eligibility: "CGPA 7.5+, All Engineering Branches",
      applicationLink: "#",
    },
    {
      id: 3,
      name: "Amazon",
      logo: "/placeholder.svg?height=40&width=40",
      description:
        "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      openings: [
        { role: "SDE", package: "₹22-28 LPA", deadline: "June 25, 2024" },
        { role: "Business Analyst", package: "₹18-22 LPA", deadline: "July 5, 2024" },
      ],
      location: "Bangalore, India",
      eligibility: "CGPA 7.0+, All Engineering Branches",
      applicationLink: "#",
    },
  ]

  const placementStats = {
    totalStudents: 250,
    placedStudents: 220,
    highestPackage: "₹45 LPA",
    averagePackage: "₹18.5 LPA",
    companiesVisited: 35,
    offersReceived: 245,
    branchWisePlacement: [
      { name: "Computer Science", placed: 95, total: 100 },
      { name: "Information Technology", placed: 45, total: 50 },
      { name: "Electronics", placed: 40, total: 50 },
      { name: "Electrical", placed: 25, total: 30 },
      { name: "Mechanical", placed: 15, total: 20 },
    ],
    packageDistribution: [
      { name: "< ₹10 LPA", value: 40 },
      { name: "₹10-15 LPA", value: 80 },
      { name: "₹15-20 LPA", value: 60 },
      { name: "₹20-25 LPA", value: 25 },
      { name: "₹25+ LPA", value: 15 },
    ],
    topRecruiters: [
      { name: "Google", offers: 15 },
      { name: "Microsoft", offers: 12 },
      { name: "Amazon", offers: 18 },
      { name: "Adobe", offers: 10 },
      { name: "Goldman Sachs", offers: 8 },
    ],
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Placement Portal</h1>
            <p className="text-muted-foreground">Explore job opportunities and placement statistics</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search companies..." className="pl-8 w-full md:w-[250px]" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="sde">Software Engineer</SelectItem>
                <SelectItem value="data">Data Scientist</SelectItem>
                <SelectItem value="pm">Product Manager</SelectItem>
                <SelectItem value="analyst">Business Analyst</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="companies">
          <TabsList>
            <TabsTrigger value="companies">Companies & Openings</TabsTrigger>
            <TabsTrigger value="statistics">Placement Statistics</TabsTrigger>
            <TabsTrigger value="preparation">Preparation Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="companies" className="mt-6 space-y-6">
            {companies.map((company) => (
              <Card key={company.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 rounded-md">
                      <AvatarImage src={company.logo} alt={company.name} />
                      <AvatarFallback>
                        <Building2 className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle>{company.name}</CardTitle>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={company.applicationLink} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Career Page
                          </Link>
                        </Button>
                      </div>
                      <CardDescription className="mt-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {company.location}
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{company.description}</p>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Eligibility Criteria:</p>
                    <p className="text-sm text-muted-foreground">{company.eligibility}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Current Openings:</p>
                    <div className="space-y-3">
                      {company.openings.map((opening, index) => (
                        <div key={index} className="border rounded-md p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{opening.role}</p>
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  {opening.package}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  Deadline: {opening.deadline}
                                </div>
                              </div>
                            </div>
                            <Button size="sm">Apply Now</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="statistics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Placement Rate</CardTitle>
                  <CardDescription>Overall placement percentage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round((placementStats.placedStudents / placementStats.totalStudents) * 100)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {placementStats.placedStudents} out of {placementStats.totalStudents} students placed
                  </p>
                  <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(placementStats.placedStudents / placementStats.totalStudents) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Package Details</CardTitle>
                  <CardDescription>Salary packages offered</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Highest Package</p>
                      <p className="text-2xl font-bold">{placementStats.highestPackage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Package</p>
                      <p className="text-2xl font-bold">{placementStats.averagePackage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Recruitment Overview</CardTitle>
                  <CardDescription>Companies and offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Companies Visited</p>
                      <p className="text-2xl font-bold">{placementStats.companiesVisited}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Offers Received</p>
                      <p className="text-2xl font-bold">{placementStats.offersReceived}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Branch-wise Placement</CardTitle>
                  <CardDescription>Placement statistics by department</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={placementStats.branchWisePlacement}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="placed" fill="#8884d8" name="Placed Students" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter className="flex-col items-start pt-0">
                  <p className="text-sm font-medium mb-2">Department-wise Placement Rate:</p>
                  <div className="w-full space-y-2">
                    {placementStats.branchWisePlacement.map((branch, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm">{branch.name}</p>
                          <p className="text-sm font-medium">{Math.round((branch.placed / branch.total) * 100)}%</p>
                        </div>
                        <Progress value={(branch.placed / branch.total) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Package Distribution</CardTitle>
                  <CardDescription>Salary packages offered to students</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={placementStats.packageDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {placementStats.packageDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter>
                  <div className="w-full">
                    <p className="text-sm font-medium mb-2">Top Recruiters:</p>
                    <div className="space-y-2">
                      {placementStats.topRecruiters.map((recruiter, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <p className="text-sm">{recruiter.name}</p>
                          <Badge variant="outline">{recruiter.offers} offers</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preparation" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Building</CardTitle>
                  <CardDescription>Resources to create an impressive resume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Resume Templates</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Access professionally designed resume templates for different roles.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Download Templates
                      </Link>
                    </Button>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Resume Review Workshop</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Join our workshop on June 10th to get your resume reviewed by industry experts.
                    </p>
                    <Button variant="outline" size="sm">
                      Register Now
                    </Button>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Resume Tips & Best Practices</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn how to highlight your skills and experiences effectively.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#">Read Guide</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Interview Preparation</CardTitle>
                  <CardDescription>Resources to ace your interviews</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Technical Interview Questions</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Practice with a collection of commonly asked technical questions.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#">Access Questions</Link>
                    </Button>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Mock Interview Sessions</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Schedule a mock interview with seniors and placement coordinators.
                    </p>
                    <Button variant="outline" size="sm">
                      Book a Session
                    </Button>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">HR Interview Preparation</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Prepare for common HR questions and learn how to present yourself.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#">Read Guide</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Development</CardTitle>
                  <CardDescription>Resources to enhance your skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Technical Courses</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Access free courses on programming, data structures, and algorithms.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#">Browse Courses</Link>
                    </Button>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Soft Skills Workshop</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Improve your communication, teamwork, and leadership skills.
                    </p>
                    <Button variant="outline" size="sm">
                      Register Now
                    </Button>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Industry Projects</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Work on real-world projects to build your portfolio.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#">Explore Projects</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

