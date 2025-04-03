"use client"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts"
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react"

export default function AnalyticsPage() {
  // Hardcoded data for demonstration
  const platformUsageData = [
    { name: "Jan", students: 850, seniors: 320, faculty: 45 },
    { name: "Feb", students: 940, seniors: 350, faculty: 48 },
    { name: "Mar", students: 980, seniors: 370, faculty: 52 },
    { name: "Apr", students: 1050, seniors: 390, faculty: 55 },
    { name: "May", students: 1150, seniors: 410, faculty: 58 },
    { name: "Jun", students: 1220, seniors: 430, faculty: 60 },
  ]

  const studentPerformanceData = [
    { name: "Jan", leetcode: 45, codechef: 30, gfg: 25 },
    { name: "Feb", leetcode: 50, codechef: 35, gfg: 30 },
    { name: "Mar", leetcode: 55, codechef: 40, gfg: 35 },
    { name: "Apr", leetcode: 60, codechef: 45, gfg: 40 },
    { name: "May", leetcode: 65, codechef: 50, gfg: 45 },
    { name: "Jun", leetcode: 70, codechef: 55, gfg: 50 },
  ]

  const mentorSessionsData = [
    { name: "Jan", sessions: 25, attendance: 85 },
    { name: "Feb", sessions: 30, attendance: 82 },
    { name: "Mar", sessions: 35, attendance: 88 },
    { name: "Apr", sessions: 40, attendance: 90 },
    { name: "May", sessions: 45, attendance: 92 },
    { name: "Jun", sessions: 50, attendance: 94 },
  ]

  const placementStats = [
    { name: "< ₹10 LPA", value: 40 },
    { name: "₹10-15 LPA", value: 80 },
    { name: "₹15-20 LPA", value: 60 },
    { name: "₹20-25 LPA", value: 25 },
    { name: "₹25+ LPA", value: 15 },
  ]

  const branchWisePerformance = [
    { name: "Computer Science", cgpa: 8.7, placement: 92 },
    { name: "Information Technology", cgpa: 8.5, placement: 90 },
    { name: "Electronics", cgpa: 8.2, placement: 85 },
    { name: "Electrical", cgpa: 8.0, placement: 82 },
    { name: "Mechanical", cgpa: 7.8, placement: 78 },
    { name: "Civil", cgpa: 7.9, placement: 80 },
  ]

  const yearWisePerformance = [
    { name: "1st Year", cgpa: 8.3, attendance: 88 },
    { name: "2nd Year", cgpa: 8.4, attendance: 85 },
    { name: "3rd Year", cgpa: 8.5, attendance: 82 },
    { name: "4th Year", cgpa: 8.6, attendance: 80 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive analytics and insights about your campus.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Platform Users</p>
                  <p className="text-2xl font-bold">1,750</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Engagement</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. CGPA</p>
                  <p className="text-2xl font-bold">8.4</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Placement Rate</p>
                  <p className="text-2xl font-bold">88%</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="platform-usage">
          <TabsList>
            <TabsTrigger value="platform-usage">Platform Usage</TabsTrigger>
            <TabsTrigger value="student-performance">Student Performance</TabsTrigger>
            <TabsTrigger value="mentor-sessions">Mentor Sessions</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="platform-usage" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Usage Trends</CardTitle>
                <CardDescription>Monthly active users by category</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={platformUsageData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Area type="monotone" dataKey="students" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="seniors" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="faculty" stackId="1" stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="student-performance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Coding Performance</CardTitle>
                <CardDescription>Monthly average problems solved on coding platforms</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={studentPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="leetcode" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="codechef" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="gfg" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mentor-sessions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mentor Sessions Analytics</CardTitle>
                <CardDescription>Monthly sessions and attendance rates</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mentorSessionsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <RechartsTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sessions" fill="#8884d8" name="Total Sessions" />
                    <Bar yAxisId="right" dataKey="attendance" fill="#82ca9d" name="Attendance %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="placements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Statistics</CardTitle>
                <CardDescription>Package distribution for placed students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={placementStats}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {placementStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={branchWisePerformance}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="placement" name="Placement %" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}