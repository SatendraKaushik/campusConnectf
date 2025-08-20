"use client"
import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import Axios from "@/utils/Axios"
import UpdatePlatforms from "./update-platforms"
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
  // State for platform data
  const [platformData, setPlatformData] = useState({
    leetcode: null,
    codechef: null,
    geeksforgeeks: null,
    github: null
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Define interfaces for platform data
  interface LeetcodeSubmission {
    id: string;
    problem: string;
    difficulty: "Easy" | "Medium" | "Hard";
    status: string;
    date: string;
  }

  interface LeetcodeData {
    solved: number;
    total: number;
    easy: number;
    medium: number;
    hard: number;
    recentSubmissions: LeetcodeSubmission[];
    progressData: { month: string; problems: number }[];
  }

  interface CodechefContest {
    contest: string;
    rating: number;
  }

  interface CodechefData {
    rating: number;
    stars: number;
    globalRank: number;
    contests: number;
    highestRating: number;
    contestData: { name: string; rating: number }[];
    ratingHistory?: CodechefContest[];
  }

  // Default data for fallback when API fails
  const defaultLeetcodeData: LeetcodeData = {
    solved: 0,
    total: 2000,
    easy: 0,
    medium: 0,
    hard: 0,
    recentSubmissions: [],
    progressData: [
      { month: "Jan", problems: 0 },
      { month: "Feb", problems: 0 },
      { month: "Mar", problems: 0 },
      { month: "Apr", problems: 0 },
      { month: "May", problems: 0 },
    ],
  }

  const defaultCodechefData: CodechefData = {
    rating: 0,
    stars: 0,
    globalRank: 0,
    contests: 0,
    highestRating: 0,
    contestData: [
      { name: "Jan", rating: 0 },
      { name: "Feb", rating: 0 },
      { name: "Mar", rating: 0 },
      { name: "Apr", rating: 0 },
      { name: "May", rating: 0 },
    ],
    ratingHistory: []
  }

  const defaultGfgData = {
    score: 0,
    solved: 0,
    institute_rank: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    currentStreak: 0,
    maxStreak: 0,
    fullName: "",
    institute: "",
    monthlyScore: 0,
    topics: [
      { name: "Arrays", solved: 0, total: 30 },
      { name: "Strings", solved: 0, total: 25 },
      { name: "Linked Lists", solved: 0, total: 20 },
      { name: "Trees", solved: 0, total: 18 },
      { name: "Dynamic Programming", solved: 0, total: 25 },
    ],
    monthlyData: [
      { month: "Jan", problems: 0 },
      { month: "Feb", problems: 0 },
      { month: "Mar", problems: 0 },
      { month: "Apr", problems: 0 },
      { month: "May", problems: 0 },
    ],
  }


  
  // Fetch platform data from API
  useEffect(() => {
    const fetchPlatformData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Get user ID from localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        const userId = user._id
        
        if (!userId) {
          throw new Error('User not authenticated')
        }
        
        // Fetch platform performance data
        const response = await Axios.get(`/platform/performance/${userId}`)
        
        if (response.data.success) {
          console.log('Platform data:', response.data.data)
          setPlatformData(response.data.data)
        } else {
          throw new Error(response.data.message || 'Failed to fetch platform data')
         }
      } catch (err: unknown) {
        console.error('Error fetching platform data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch platform data')
        toast.error('Failed to load performance data. Using default values.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPlatformData()
  }, [])
  
  // Use dynamic data or fallback to defaults
  const leetcodeData = platformData.leetcode || defaultLeetcodeData
  const codechefData = platformData.codechef || defaultCodechefData
  const gfgData = {
    ...defaultGfgData,
    ...(platformData.geeksforgeeks || {}),
    topics: (platformData.geeksforgeeks?.topics || defaultGfgData.topics)
  }


  // Function to refresh data
  const refreshData = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const userId = user._id
      
      if (!userId) {
        throw new Error('User not authenticated')
      }
      
      // Fetch platform performance data
      const response = await Axios.get(`/platform/performance/${userId}`)
      
      if (response.data.success) {
        setPlatformData(response.data.data)
        toast.success('Performance data refreshed successfully')
      } else {
        throw new Error(response.data.message || 'Failed to fetch platform data')
      }
    } catch (err: unknown) {
      console.error('Error fetching platform data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch platform data')
      toast.error('Failed to refresh performance data')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Performance Dashboard</h1>
            <p className="text-muted-foreground">Track your coding progress across different platforms.</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={refreshData}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                'Refresh Data'
              )}
            </Button>
            
            <UpdatePlatforms onUpdate={refreshData} />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading performance data...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64 text-destructive">
            <AlertCircle className="h-8 w-8 mr-2" />
            <div>
              <p className="text-lg font-medium">Error loading data</p>
              <p className="text-sm">{error}</p>
              <p className="text-sm mt-2">Showing default values instead.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">LeetCode</CardTitle>
                  <CardDescription>Problem solving progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{leetcodeData.solved || 191}</div>
                  <p className="text-xs text-muted-foreground">Problems Solved</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-sm font-medium text-green-500">{leetcodeData.easy || 78}</div>
                      <p className="text-xs text-muted-foreground">Easy</p>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-yellow-500">{leetcodeData.medium || 103}</div>
                      <p className="text-xs text-muted-foreground">Medium</p>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-red-500">{leetcodeData.hard || 10}</div>
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
                  <div className="text-2xl font-bold">{codechefData.rating || 1096}</div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs text-muted-foreground">Current Rating</p>
                    <Badge variant="outline" className="text-xs">
                      {codechefData.stars || 1}★
                    </Badge>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Global Rank</span>
                      <span className="font-medium">#{codechefData.globalRank || 107885}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Contests</span>
                      <span className="font-medium">{codechefData.contests || 2}</span>
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
                  <div className="text-2xl font-bold">{gfgData.score || 118}</div>
                  <p className="text-xs text-muted-foreground">Total Score</p>
                  <div className="mt-4 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Problems Solved</span>
                      <span className="font-medium">{gfgData.solved || 30}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Institute Rank</span>
                      <span className="font-medium">#{gfgData.institute_rank || 197}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>

            <Tabs defaultValue="leetcode">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
                <TabsTrigger value="codechef">CodeChef</TabsTrigger>
                <TabsTrigger value="gfg">GeeksforGeeks</TabsTrigger>
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
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={[
                            { name: "Easy", value: leetcodeData.easy || 78, fill: "#4ade80" },
                            { name: "Medium", value: leetcodeData.medium || 103, fill: "#facc15" },
                            { name: "Hard", value: leetcodeData.hard || 10, fill: "#f87171" },
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
                        {leetcodeData.recentSubmissions?.map((submission) => (
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
                        {(codechefData.ratingHistory || []).map((contest: CodechefContest, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{contest.contest}</p>
                              <p className="text-sm text-muted-foreground">Rating: {contest.rating}</p>
                            </div>
                            <Badge
                              variant={
                                index > 0 && contest.rating > (codechefData.ratingHistory || [])[index - 1].rating
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {index > 0
                                ? contest.rating > (codechefData.ratingHistory || [])[index - 1].rating
                                  ? `+${contest.rating - (codechefData.ratingHistory || [])[index - 1].rating}`
                                  : `${contest.rating - (codechefData.ratingHistory || [])[index - 1].rating}`
                                : "0"}
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
                      <CardTitle>Monthly Progress</CardTitle>
                      <CardDescription>Problems solved per month</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={gfgData.monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="problems" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Topic Mastery</CardTitle>
                      <CardDescription>Progress by topic</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {gfgData.topics.map((topic, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">{topic.name}</span>
                              <span className="text-sm text-muted-foreground">
                                {topic.solved}/{topic.total}
                              </span>
                            </div>
                            <Progress value={(topic.solved / topic.total) * 100} className="h-2" />
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="https://geeksforgeeks.org" target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit GeeksforGeeks
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>


            </Tabs>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}