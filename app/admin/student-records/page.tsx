"use client"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, Download, Filter, Search, Users } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

export default function StudentRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterYear, setFilterYear] = useState("all")
  const [filterBranch, setFilterBranch] = useState("all")

  // Hardcoded data for demonstration
  const students = [
    {
      id: "STU001",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      branch: "Computer Science",
      year: "3rd Year",
      cgpa: 9.2,
      attendance: 92,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
    {
      id: "STU002",
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      branch: "Information Technology",
      year: "2nd Year",
      cgpa: 8.7,
      attendance: 88,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
    {
      id: "STU003",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      branch: "Electronics",
      year: "4th Year",
      cgpa: 8.9,
      attendance: 85,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
    {
      id: "STU004",
      name: "Sophia Chen",
      email: "sophia.chen@example.com",
      branch: "Computer Science",
      year: "1st Year",
      cgpa: 9.5,
      attendance: 95,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
    {
      id: "STU005",
      name: "James Rodriguez",
      email: "james.rodriguez@example.com",
      branch: "Mechanical",
      year: "3rd Year",
      cgpa: 7.8,
      attendance: 78,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "warning",
    },
    {
      id: "STU006",
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      branch: "Civil",
      year: "2nd Year",
      cgpa: 8.2,
      attendance: 82,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
    {
      id: "STU007",
      name: "William Taylor",
      email: "william.taylor@example.com",
      branch: "Electrical",
      year: "4th Year",
      cgpa: 7.5,
      attendance: 75,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "warning",
    },
    {
      id: "STU008",
      name: "Ava Thomas",
      email: "ava.thomas@example.com",
      branch: "Information Technology",
      year: "1st Year",
      cgpa: 9.0,
      attendance: 90,
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
  ]

  const branchStats = [
    { branch: "Computer Science", count: 350, avgCGPA: 8.7 },
    { branch: "Information Technology", count: 280, avgCGPA: 8.5 },
    { branch: "Electronics", count: 220, avgCGPA: 8.2 },
    { branch: "Electrical", count: 180, avgCGPA: 8.0 },
    { branch: "Mechanical", count: 150, avgCGPA: 7.8 },
    { branch: "Civil", count: 120, avgCGPA: 7.9 },
  ]

  const yearStats = [
    { year: "1st Year", count: 320, avgCGPA: 8.3 },
    { year: "2nd Year", count: 310, avgCGPA: 8.4 },
    { year: "3rd Year", count: 300, avgCGPA: 8.5 },
    { year: "4th Year", count: 290, avgCGPA: 8.6 },
  ]

  // Filter students based on search query and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesYear = filterYear === "all" || student.year === filterYear
    const matchesBranch = filterBranch === "all" || student.branch === filterBranch
    
    return matchesSearch && matchesYear && matchesBranch
  })

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Records</h1>
          <p className="text-muted-foreground">Manage and view all student information in one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">1,250</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Average CGPA</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Average Attendance</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all-students">
          <TabsList>
            <TabsTrigger value="all-students">All Students</TabsTrigger>
            <TabsTrigger value="branch-stats">Branch Statistics</TabsTrigger>
            <TabsTrigger value="year-stats">Year Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student List</CardTitle>
                <CardDescription>View and manage all student records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, or ID..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterYear} onValueChange={setFilterYear}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterBranch} onValueChange={setFilterBranch}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Branches</SelectItem>
                        <SelectItem value="Computer Science">Computer Science</SelectItem>
                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                        <SelectItem value="Mechanical">Mechanical</SelectItem>
                        <SelectItem value="Civil">Civil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>CGPA</TableHead>
                        <TableHead>Attendance</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow 
                          key={student.id} 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => window.location.href = `/admin/student-records/${student.id}`}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-medium">{student.name}</span>
                                <span className="text-xs text-muted-foreground">{student.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.branch}</TableCell>
                          <TableCell>{student.year}</TableCell>
                          <TableCell>{student.cgpa}</TableCell>
                          <TableCell>{student.attendance}%</TableCell>
                          <TableCell>
                            <Badge variant={student.status === "active" ? "default" : "destructive"}>
                              {student.status === "active" ? "Active" : "Warning"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="branch-stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Branch Statistics</CardTitle>
                <CardDescription>Student distribution and performance by branch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Branch</TableHead>
                        <TableHead>Total Students</TableHead>
                        <TableHead>Average CGPA</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {branchStats.map((branch) => (
                        <TableRow key={branch.branch}>
                          <TableCell className="font-medium">{branch.branch}</TableCell>
                          <TableCell>{branch.count}</TableCell>
                          <TableCell>{branch.avgCGPA}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="year-stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Year Statistics</CardTitle>
                <CardDescription>Student distribution and performance by year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead>Total Students</TableHead>
                        <TableHead>Average CGPA</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {yearStats.map((year) => (
                        <TableRow key={year.year}>
                          <TableCell className="font-medium">{year.year}</TableCell>
                          <TableCell>{year.count}</TableCell>
                          <TableCell>{year.avgCGPA}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}