"use client"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function AcademicRecordsPage() {
  // Hardcoded data for demonstration
  const collegeResults = [
    {
      semester: 1,
      courses: [
        { code: "CS101", name: "Introduction to Programming", credits: 4, grade: "A", points: 10 },
        { code: "MA101", name: "Calculus", credits: 4, grade: "A", points: 10 },
        { code: "PH101", name: "Physics", credits: 4, grade: "B+", points: 9 },
        { code: "EN101", name: "Technical English", credits: 2, grade: "A", points: 10 },
        { code: "CS102", name: "Data Structures", credits: 4, grade: "A-", points: 9 },
      ],
      sgpa: 9.6,
      cgpa: 9.6,
    },
    {
      semester: 2,
      courses: [
        { code: "CS201", name: "Object-Oriented Programming", credits: 4, grade: "A", points: 10 },
        { code: "MA201", name: "Linear Algebra", credits: 4, grade: "B+", points: 9 },
        { code: "CS202", name: "Database Management Systems", credits: 4, grade: "A-", points: 9 },
        { code: "CS203", name: "Computer Networks", credits: 4, grade: "B", points: 8 },
        { code: "HS201", name: "Economics", credits: 2, grade: "A", points: 10 },
      ],
      sgpa: 9.1,
      cgpa: 9.35,
    },
    {
      semester: 3,
      courses: [
        { code: "CS301", name: "Operating Systems", credits: 4, grade: "A-", points: 9 },
        { code: "CS302", name: "Software Engineering", credits: 4, grade: "A", points: 10 },
        { code: "CS303", name: "Web Technologies", credits: 4, grade: "A", points: 10 },
        { code: "CS304", name: "Algorithms", credits: 4, grade: "B+", points: 9 },
        { code: "HS301", name: "Professional Ethics", credits: 2, grade: "A", points: 10 },
      ],
      sgpa: 9.5,
      cgpa: 9.4,
    },
  ];

  const schoolResults = {
    tenth: {
      board: "CBSE",
      year: 2018,
      percentage: 95.6,
      subjects: [
        { name: "English", marks: 95 },
        { name: "Mathematics", marks: 98 },
        { name: "Science", marks: 96 },
        { name: "Social Science", marks: 94 },
        { name: "Hindi", marks: 92 },
      ],
    },
    twelfth: {
      board: "CBSE",
      year: 2020,
      percentage: 94.2,
      subjects: [
        { name: "English", marks: 94 },
        { name: "Physics", marks: 95 },
        { name: "Chemistry", marks: 93 },
        { name: "Mathematics", marks: 96 },
        { name: "Computer Science", marks: 98 },
      ],
    },
  };

  const cgpaData = [
    { semester: "Sem 1", cgpa: 9.6 },
    { semester: "Sem 2", cgpa: 9.35 },
    { semester: "Sem 3", cgpa: 9.4 },
  ];

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Academic Records</h1>
          <p className="text-muted-foreground">View and manage your academic performance records.</p>
        </div>

        <Tabs defaultValue="college">
          <TabsList>
            <TabsTrigger value="college">College</TabsTrigger>
            <TabsTrigger value="school">School</TabsTrigger>
          </TabsList>
          
          <TabsContent value="college" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>CGPA Progression</CardTitle>
                  <CardDescription>Your cumulative GPA across semesters</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={cgpaData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="semester" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Bar dataKey="cgpa" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Status</CardTitle>
                  <CardDescription>Your academic standing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Current CGPA</p>
                        <p className="text-sm font-bold">{collegeResults[collegeResults.length - 1].cgpa}</p>
                      </div>
                      <Progress value={(collegeResults[collegeResults.length - 1].cgpa / 10) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Credits Completed</p>
                        <p className="text-sm font-bold">54/180</p>
                      </div>
                      <Progress value={(54 / 180) * 100} className="h-2" />
                    </div>
                    <div className="pt-4">
                      <p className="text-sm font-medium mb-2">Academic Standing</p>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-medium mb-2">Current Semester</p>
                      <p className="text-sm">Semester 4 (2023-24)</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-medium mb-2">Expected Graduation</p>
                      <p className="text-sm">May 2026</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {collegeResults.map((semester) => (
                <Card key={semester.semester}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Semester {semester.semester}</CardTitle>
                        <CardDescription>Academic Year 202{semester.semester + 1}-2{semester.semester + 2}</CardDescription>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">SGPA</p>
                          <p className="text-2xl font-bold">{semester.sgpa}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">CGPA</p>
                          <p className="text-2xl font-bold">{semester.cgpa}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 p-4 font-medium border-b">
                        <div className="col-span-2">Course Code</div>
                        <div className="col-span-5">Course Name</div>
                        <div className="col-span-2">Credits</div>
                        <div className="col-span-2">Grade</div>
                        <div className="col-span-1">Points</div>
                      </div>
                      <div className="divide-y">
                        {semester.courses.map((course) => (
                          <div key={course.code} className="grid grid-cols-12 p-4 items-center">
                            <div className="col-span-2 font-medium">{course.code}</div>
                            <div className="col-span-5">{course.name}</div>
                            <div className="col-span-2">{course.credits}</div>
                            <div className="col-span-2">
                              <Badge variant="outline" className={
                                course.grade === "A" || course.grade === "A+" ? "bg-green-50 text-green-700 hover:bg-green-50" :
                                course.grade === "A-" || course.grade === "B+" ? "bg-blue-50 text-blue-700 hover:bg-blue-50" :
                                course.grade === "B" || course.grade === "B-" ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50" :
                                "bg-red-50 text-red-700 hover:bg-red-50"
                              }>
                                {course.grade}
                              </Badge>
                            </div>
                            <div className="col-span-1">{course.points}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="school" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Class 10 Results</CardTitle>
                  <CardDescription>{schoolResults.tenth.board} Board, {schoolResults.tenth.year}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Overall Percentage</p>
                      <p className="text-sm font-bold">{schoolResults.tenth.percentage}%</p>
                    </div>
                    <Progress value={schoolResults.tenth.percentage} className="h-2" />
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 p-4 font-medium border-b">
                      <div className="col-span-4">Subject</div>
                      <div className="col-span-2">Marks</div>
                    </div>
                    <div className="divide-y">
                      {schoolResults.tenth.subjects.map((subject) => (
                        <div key={subject.name} className="grid grid-cols-6 p-4 items-center">
                          <div className="col-span-4 font-medium">{subject.name}</div>
                          <div className="col-span-2">{subject.marks}/100</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Class 12 Results</CardTitle>
                  <CardDescription>{schoolResults.twelfth.board} Board, {schoolResults.twelfth.year}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Overall Percentage</p>
                      <p className="text-sm font-bold">{schoolResults.twelfth.percentage}%</p>
                    </div>
                    <Progress value={schoolResults.twelfth.percentage} className="h-2" />
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 p-4 font-medium border-b">
                      <div className="col-span-4">Subject</div>
                      <div className="col-span-2">Marks</div>
                    </div>
                    <div className="divide-y">
                      {schoolResults.twelfth.subjects.map((subject) => (
                        <div key={subject.name} className="grid grid-cols-6 p-4 items-center">
                          <div className="col-span-4 font-medium">{subject.name}</div>
                          <div className="col-span-2">{subject.marks}/100</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}