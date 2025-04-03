"use client"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { BarChart3, Calendar, FileText, GraduationCap, Users, Clock } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminDashboard() {
  // Hardcoded data for demonstration
  const overviewStats = {
    totalStudents: 1250,
    activeStudents: 1180,
    totalSeniors: 450,
    activeSeniors: 420,
    totalMentorSessions: 85,
    upcomingSessions: 12,
    totalPosts: 320,
    newPostsToday: 15,
  };

  const branchWiseStudents = [
    { name: "Computer Science", students: 350 },
    { name: "Information Technology", students: 280 },
    { name: "Electronics", students: 220 },
    { name: "Electrical", students: 180 },
    { name: "Mechanical", students: 150 },
    { name: "Civil", students: 120 },
  ];

  const yearWiseStudents = [
    { name: "1st Year", students: 320 },
    { name: "2nd Year", students: 310 },
    { name: "3rd Year", students: 300 },
    { name: "4th Year", students: 290 },
  ];

  const performanceData = [
    { name: "Jan", leetcode: 45, codechef: 30, gfg: 25 },
    { name: "Feb", leetcode: 50, codechef: 35, gfg: 30 },
    { name: "Mar", leetcode: 55, codechef: 40, gfg: 35 },
    { name: "Apr", leetcode: 60, codechef: 45, gfg: 40 },
    { name: "May", leetcode: 65, codechef: 50, gfg: 45 },
  ];

  const placementStats = {
    totalPlaced: 220,
    totalStudents: 250,
    packageDistribution: [
      { name: "< ₹10 LPA", value: 40 },
      { name: "₹10-15 LPA", value: 80 },
      { name: "₹15-20 LPA", value: 60 },
      { name: "₹20-25 LPA", value: 25 },
      { name: "₹25+ LPA", value: 15 },
    ],
  };

  const recentActivities = [
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      action: "completed a LeetCode challenge",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Senior",
      },
      action: "posted a new mentor session",
      time: "3 hours ago",
    },
    {
      id: 3,
      user: {
        name: "Prof. Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Faculty",
      },
      action: "published a new announcement",
      time: "5 hours ago",
    },
    {
      id: 4,
      user: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      action: "connected with a senior",
      time: "Yesterday",
    },
    {
      id: 5,
      user: {
        name: "Sophia Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Student",
      },
      action: "registered for a mentor session",
      time: "Yesterday",
    },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin! Here's an overview of your campus.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{overviewStats.totalStudents}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Active</span>
                  <span>{Math.round((overviewStats.activeStudents / overviewStats.totalStudents) * 100)}%</span>
                </div>
                <Progress value={(overviewStats.activeStudents / overviewStats.totalStudents) * 100} className="h-1 mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Seniors</p>
                  <p className="text-2xl font-bold">{overviewStats.totalSeniors}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Active</span>
                  <span>{Math.round((overviewStats.activeSeniors / overviewStats.totalSeniors) * 100)}%</span>
                </div>
                <Progress value={(overviewStats.activeSeniors / overviewStats.totalSeniors) * 100} className="h-1 mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mentor Sessions</p>
                  <p className="text-2xl font-bold">{overviewStats.totalMentorSessions}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Upcoming</span>
                  <span>{overviewStats.upcomingSessions}</span>
                </div>
                <Progress value={(overviewStats.upcomingSessions / overviewStats.totalMentorSessions) * 100} className="h-1 mt-1" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold">{overviewStats.totalPosts}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>New Today</span>
                  <span>{overviewStats.newPostsToday}</span>
                </div>
                <Progress value={(overviewStats.newPostsToday / 20) * 100} className="h-1 mt-1" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Student Distribution</CardTitle>
              <CardDescription>Branch-wise student distribution</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={branchWiseStudents}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Year-wise Distribution</CardTitle>
              <CardDescription>Students by academic year</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={yearWiseStudents}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="students"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {yearWiseStudents.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance">
          <TabsList>
            <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
            <TabsTrigger value="placement">Placement Statistics</TabsTrigger>
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Coding Platform Performance</CardTitle>
                <CardDescription>Average problems solved per student per month</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="leetcode" stroke="#8884d8" name="LeetCode" />
                    <Line type="monotone" dataKey="codechef" stroke="#82ca9d" name="CodeChef" />
                    <Line type="monotone" dataKey="gfg" stroke="#ffc658" name="GeeksforGeeks" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
              <div className="px-6 pb-6">
                <Button variant="outline" asChild>
                  <Link href="/admin/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Link>
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="placement" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Overview</CardTitle>
                <CardDescription>Current placement statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Placement Rate</p>
                    <p className="text-3xl font-bold">{Math.round((placementStats.totalPlaced / placementStats.totalStudents) * 100)}%</p>
                    <p className="text-xs text-muted-foreground mt-1">{placementStats.totalPlaced} out of {placementStats.totalStudents} students</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Highest Package</p>
                    <p className="text-3xl font-bold">₹45 LPA</p>
                    <p className="text-xs text-muted-foreground mt-1">Google</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Average Package</p>
                    <p className="text-3xl font-bold">₹18.5 LPA</p>
                    <p className="text-xs text-muted-foreground mt-1">Across all companies</p>
                  </div>
                </div>
                <div className="h-80">
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
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <Button variant="outline" asChild>
                  <Link href="/admin/placements">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Placement Details
                  </Link>
                </Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="activities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest activities across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                        <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{activity.user.name}</span>
                            <span className="text-muted-foreground"> {activity.action}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="inline-flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {activity.time}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{activity.user.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <Button variant="outline" asChild>
                  <Link href="/admin/activities">
                    <FileText className="mr-2 h-4 w-4" />
                    View All Activities
                  </Link>
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}