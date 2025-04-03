"use client"
import { useParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

export default function StudentPerformanceDetail() {
  const params = useParams()
  const studentId = params.id

  // Hardcoded data for demonstration - in a real app, this would be fetched based on studentId
  const studentData = {
    id: studentId,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    branch: "Computer Science",
    year: "3rd Year",
    cgpa: 9.2,
    attendance: 92,
    avatar: "/placeholder.svg?height=128&width=128",
    status: "active",
  }

  // Performance data structure similar to student performance page
  const performanceData = {
    leetcode: {
      solved: 120,
      total: 2000,
      easy: 75,
      medium: 40,
      hard: 5,
      rank: 5243,
      recentSubmissions: [
        { id: 1, problem: "Two Sum", difficulty: "Easy", status: "Accepted", date: "2 days ago" },
        { id: 2, problem: "Add Two Numbers", difficulty: "Medium", status: "Accepted", date: "3 days ago" },
        {
          id: 3,
          problem: "Longest Substring Without Repeating Characters",
          difficulty: "Medium",
          status: "Wrong Answer",
          date: "5 days ago",
        },
        { id: 4, problem: "Median of Two Sorted Arrays", difficulty: "Hard", status: "Accepted", date: "1 week ago" },
        { id: 5, problem: "Palindrome Number", difficulty: "Easy", status: "Accepted", date: "1 week ago" },
      ],
      progressData: [
        { month: "Jan", problems: 10 },
        { month: "Feb", problems: 15 },
        { month: "Mar", problems: 20 },
        { month: "Apr", problems: 35 },
        { month: "May", problems: 40 },
      ],
    },
    codechef: {
      rating: 1823,
      stars: 4,
      globalRank: 15243,
      contests: 12,
      highestRating: 1900,
      ratingHistory: [
        { contest: "April Long", rating: 1750 },
        { contest: "April Cook-Off", rating: 1780 },
        { contest: "April Lunchtime", rating: 1800 },
        { contest: "May Long", rating: 1823 },
      ],
      contestData: [
        { name: "Jan", rating: 1650 },
        { name: "Feb", rating: 1700 },
        { name: "Mar", rating: 1750 },
        { name: "Apr", rating: 1800 },
        { name: "May", rating: 1823 },
      ],
    },
    gfg: {
      score: 350,
      rank: 5243,
      solved: 85,
      institute_rank: 42,
      topics: [
        { name: "Arrays", solved: 20, total: 30 },
        { name: "Strings", solved: 15, total: 25 },
        { name: "Linked Lists", solved: 12, total: 20 },
        { name: "Trees", solved: 10, total: 18 },
        { name: "Dynamic Programming", solved: 8, total: 25 },
      ],
      monthlyData: [
        { month: "Jan", problems: 12 },
        { month: "Feb", problems: 15 },
        { month: "Mar", problems: 18 },
        { month: "Apr", problems: 20 },
        { month: "May", problems: 20 },
      ],
    },
    codingNinjas: {
      points: 1250,
      rank: "Knight",
      courses: [
        { name: "Data Structures & Algorithms", progress: 85, status: "In Progress" },
        { name: "Competitive Programming", progress: 70, status: "In Progress" },
        { name: "Web Development", progress: 100, status: "Completed" },
      ],
      problemsSolved: 95,
      contestsParticipated: 8,
      skillData: [
        { name: "Problem Solving", value: 85 },
        { name: "Data Structures", value: 80 },
        { name: "Algorithms", value: 75 },
        { name: "Time Complexity", value: 70 },
        { name: "Space Complexity", value: 65 },
      ],
    },
    skillsGrowth: [
      { month: "Jan", dsa: 60, webdev: 40, ml: 20 },
      { month: "Feb", dsa: 65, webdev: 45, ml: 25 },
      { month: "Mar", dsa: 70, webdev: 50, ml: 30 },
      { month: "Apr", dsa: 75, webdev: 60, ml: 40 },
      { month: "May", dsa: 80, webdev: 70, ml: 50 },
    ],
  }

  return (
    <DashboardLayout userType="admin">
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-6 p-6">
        <div className="space-y-6">
          {/* Back button and title */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/student-records">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Student Performance</h1>
              <p className="text-muted-foreground">Detailed performance metrics for {studentData.name}</p>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={studentData.avatar} alt={studentData.name} />
                  <AvatarFallback>{studentData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold">{studentData.name}</h2>
                  <p className="text-muted-foreground">{studentData.email}</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                    <Badge>{studentData.branch}</Badge>
                    <Badge>{studentData.year}</Badge>
                    <Badge variant={studentData.status === "active" ? "default" : "destructive"}>
                      {studentData.status === "active" ? "Active" : "Warning"}
                    </Badge>
                  </div>
                </div>
                <div className="ml-auto space-y-1 hidden md:block">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">CGPA:</span>
                    <span className="text-sm">{studentData.cgpa}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">Attendance:</span>
                    <span className="text-sm">{studentData.attendance}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">LeetCode</CardTitle>
                <CardDescription>Problem solving progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.leetcode.solved}</div>
                <p className="text-xs text-muted-foreground">Problems Solved</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-medium text-green-500">{performanceData.leetcode.easy}</div>
                    <p className="text-xs text-muted-foreground">Easy</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-yellow-500">{performanceData.leetcode.medium}</div>
                    <p className="text-xs text-muted-foreground">Medium</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-red-500">{performanceData.leetcode.hard}</div>
                    <p className="text-xs text-muted-foreground">Hard</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">CodeChef</CardTitle>
                <CardDescription>Competitive coding rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.codechef.rating}</div>
                <div className="flex items-center gap-1">
                  <p className="text-xs text-muted-foreground">Current Rating</p>
                  <Badge variant="outline" className="text-xs">
                    {performanceData.codechef.stars}★
                  </Badge>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Global Rank</span>
                    <span className="font-medium">#{performanceData.codechef.globalRank}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Contests</span>
                    <span className="font-medium">{performanceData.codechef.contests}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">GeeksforGeeks</CardTitle>
                <CardDescription>Practice platform stats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.gfg.score}</div>
                <p className="text-xs text-muted-foreground">Total Score</p>
                <div className="mt-4 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Problems Solved</span>
                    <span className="font-medium">{performanceData.gfg.solved}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Institute Rank</span>
                    <span className="font-medium">#{performanceData.gfg.institute_rank}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Coding Ninjas</CardTitle>
                <CardDescription>Learning platform progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceData.codingNinjas.points}</div>
                <div className="flex items-center gap-1">
                  <p className="text-xs text-muted-foreground">Points</p>
                  <Badge variant="outline" className="text-xs">
                    {performanceData.codingNinjas.rank}
                  </Badge>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Problems Solved</span>
                    <span className="font-medium">{performanceData.codingNinjas.problemsSolved}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Contests</span>
                    <span className="font-medium">{performanceData.codingNinjas.contestsParticipated}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Skills Growth</CardTitle>
              <CardDescription>Progress in key skill areas over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData.skillsGrowth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="dsa" stroke="#8884d8" name="DSA" strokeWidth={2} />
                  <Line type="monotone" dataKey="webdev" stroke="#82ca9d" name="Web Dev" strokeWidth={2} />
                  <Line type="monotone" dataKey="ml" stroke="#ffc658" name="Machine Learning" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Tabs defaultValue="leetcode">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
              <TabsTrigger value="codechef">CodeChef</TabsTrigger>
              <TabsTrigger value="gfg">GeeksforGeeks</TabsTrigger>
              <TabsTrigger value="codingninja">Coding Ninjas</TabsTrigger>
            </TabsList>

            <TabsContent value="leetcode" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Problem Solving Progress</CardTitle>
                    <CardDescription>Monthly solved problems</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="w-full h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData.leetcode.progressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="problems" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Problem Distribution</CardTitle>
                    <CardDescription>By difficulty level</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={[
                          { name: "Easy", value: performanceData.leetcode.easy, fill: "#4ade80" },
                          { name: "Medium", value: performanceData.leetcode.medium, fill: "#facc15" },
                          { name: "Hard", value: performanceData.leetcode.hard, fill: "#f87171" },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                  <CardDescription>Latest problem solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 font-medium border-b">
                      <div>Problem</div>
                      <div>Difficulty</div>
                      <div>Status</div>
                      <div>Date</div>
                      <div></div>
                    </div>
                    <div className="divide-y">
                      {performanceData.leetcode.recentSubmissions.map((submission) => (
                        <div key={submission.id} className="grid grid-cols-5 p-4 items-center">
                          <div className="font-medium">{submission.problem}</div>
                          <div>
                            <Badge
                              variant="outline"
                              className={
                                submission.difficulty === "Easy"
                                  ? "bg-green-50 text-green-700 hover:bg-green-50"
                                  : submission.difficulty === "Medium"
                                    ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                                    : "bg-red-50 text-red-700 hover:bg-red-50"
                              }
                            >
                              {submission.difficulty}
                            </Badge>
                          </div>
                          <div>
                            <Badge variant={submission.status === "Accepted" ? "outline" : "destructive"}>
                              {submission.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{submission.date}</div>
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="codechef" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rating History</CardTitle>
                  <CardDescription>Performance over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData.codechef.contestData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={["dataMin - 100", "dataMax + 100"]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="rating" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gfg" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Topic-wise Progress</CardTitle>
                    <CardDescription>Problems solved by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {performanceData.gfg.topics.map((topic, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{topic.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {topic.solved}/{topic.total}
                            </p>
                          </div>
                          <Progress value={(topic.solved / topic.total) * 100} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Progress</CardTitle>
                    <CardDescription>Problems solved per month</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={performanceData.gfg.monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="problems" fill="#4ade80" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="codingninja" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                    <CardDescription>Learning journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {performanceData.codingNinjas.courses.map((course, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{course.name}</p>
                            <Badge variant={course.status === "Completed" ? "secondary" : "outline"}>{course.status}</Badge>
                          </div>
                          <Progress value={course.progress} />
                          <p className="text-xs text-right text-muted-foreground">{course.progress}% complete</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skill Assessment</CardTitle>
                    <CardDescription>Proficiency levels</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={performanceData.codingNinjas.skillData}
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 100, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}