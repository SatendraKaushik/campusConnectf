"use client"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
// Remove the Chart import since we're not using it
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

export default function StudentPerformance() {
  // Hardcoded data for demonstration
  const leetcodeData = {
    solved: 120,
    total: 2000,
    easy: 75,
    medium: 40,
    hard: 5,
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
  }

  const codechefData = {
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
  }

  const gfgData = {
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
  }

  const codingNinjasData = {
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
  }

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance Dashboard</h1>
          <p className="text-muted-foreground">Track your coding progress across different platforms.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">LeetCode</CardTitle>
              <CardDescription>Problem solving progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leetcodeData.solved}</div>
              <p className="text-xs text-muted-foreground">Problems Solved</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-medium text-green-500">{leetcodeData.easy}</div>
                  <p className="text-xs text-muted-foreground">Easy</p>
                </div>
                <div>
                  <div className="text-sm font-medium text-yellow-500">{leetcodeData.medium}</div>
                  <p className="text-xs text-muted-foreground">Medium</p>
                </div>
                <div>
                  <div className="text-sm font-medium text-red-500">{leetcodeData.hard}</div>
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
              <div className="text-2xl font-bold">{codechefData.rating}</div>
              <div className="flex items-center gap-1">
                <p className="text-xs text-muted-foreground">Current Rating</p>
                <Badge variant="outline" className="text-xs">
                  {codechefData.stars}★
                </Badge>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Global Rank</span>
                  <span className="font-medium">#{codechefData.globalRank}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Contests</span>
                  <span className="font-medium">{codechefData.contests}</span>
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
              <div className="text-2xl font-bold">{gfgData.score}</div>
              <p className="text-xs text-muted-foreground">Total Score</p>
              <div className="mt-4 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Problems Solved</span>
                  <span className="font-medium">{gfgData.solved}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Institute Rank</span>
                  <span className="font-medium">#{gfgData.institute_rank}</span>
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
              <div className="text-2xl font-bold">{codingNinjasData.points}</div>
              <div className="flex items-center gap-1">
                <p className="text-xs text-muted-foreground">Points</p>
                <Badge variant="outline" className="text-xs">
                  {codingNinjasData.rank}
                </Badge>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Problems Solved</span>
                  <span className="font-medium">{codingNinjasData.problemsSolved}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Contests</span>
                  <span className="font-medium">{codingNinjasData.contestsParticipated}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                      <AreaChart data={leetcodeData.progressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                  {/* Removed Chart component wrapper */}
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={[
                        { name: "Easy", value: leetcodeData.easy, fill: "#4ade80" },
                        { name: "Medium", value: leetcodeData.medium, fill: "#facc15" },
                        { name: "Hard", value: leetcodeData.hard, fill: "#f87171" },
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
                <CardDescription>Your latest problem solutions</CardDescription>
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
                    {leetcodeData.recentSubmissions.map((submission) => (
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
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="https://leetcode.com" target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit LeetCode
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="codechef" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rating History</CardTitle>
                  <CardDescription>Your performance over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  {/* Removed Chart component wrapper */}
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={codechefData.contestData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={["dataMin - 100", "dataMax + 100"]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="rating" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contest Performance</CardTitle>
                  <CardDescription>Recent contest results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {codechefData.ratingHistory.map((contest, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{contest.contest}</p>
                          <p className="text-sm text-muted-foreground">Rating: {contest.rating}</p>
                        </div>
                        <Badge
                          variant={
                            index > 0 && contest.rating > codechefData.ratingHistory[index - 1].rating
                              ? "secondary"
                              : index > 0 && contest.rating < codechefData.ratingHistory[index - 1].rating
                                ? "destructive"
                                : "outline"
                          }
                        >
                          {index > 0
                            ? contest.rating > codechefData.ratingHistory[index - 1].rating
                              ? `+${contest.rating - codechefData.ratingHistory[index - 1].rating}`
                              : `${contest.rating - codechefData.ratingHistory[index - 1].rating}`
                            : "Initial"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="https://codechef.com" target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit CodeChef
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                    {gfgData.topics.map((topic, index) => (
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
                  {/* Removed Chart component wrapper */}
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={gfgData.monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            <div className="flex justify-end">
              <Button variant="outline" size="sm" asChild>
                <Link href="https://geeksforgeeks.org" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit GeeksforGeeks
                </Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="codingninja" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                  <CardDescription>Your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {codingNinjasData.courses.map((course, index) => (
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
                  <CardDescription>Your proficiency levels</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  {/* Removed Chart component wrapper */}
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={codingNinjasData.skillData}
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
            <div className="flex justify-end">
              <Button variant="outline" size="sm" asChild>
                <Link href="https://codingninjas.com" target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Coding Ninjas
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}