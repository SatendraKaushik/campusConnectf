 "use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, FileText, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ResourcesPage() {
  // Hardcoded data for demonstration
  const previousYearPapers = [
    {
      id: "pyp-1",
      title: "Data Structures and Algorithms - 2023",
      subject: "DSA",
      year: "2023",
      semester: "3rd",
      fileSize: "2.4 MB",
      fileType: "PDF",
    },
    {
      id: "pyp-2",
      title: "Database Management Systems - 2023",
      subject: "DBMS",
      year: "2023",
      semester: "4th",
      fileSize: "1.8 MB",
      fileType: "PDF",
    },
    {
      id: "pyp-3",
      title: "Operating Systems - 2023",
      subject: "OS",
      year: "2023",
      semester: "5th",
      fileSize: "3.2 MB",
      fileType: "PDF",
    },
    {
      id: "pyp-4",
      title: "Computer Networks - 2023",
      subject: "CN",
      year: "2023",
      semester: "6th",
      fileSize: "2.1 MB",
      fileType: "PDF",
    },
    {
      id: "pyp-5",
      title: "Object Oriented Programming - 2023",
      subject: "OOP",
      year: "2023",
      semester: "3rd",
      fileSize: "1.5 MB",
      fileType: "PDF",
    },
    {
      id: "pyp-6",
      title: "Data Structures and Algorithms - 2022",
      subject: "DSA",
      year: "2022",
      semester: "3rd",
      fileSize: "2.3 MB",
      fileType: "PDF",
    },
    {
      id: "pyp-7",
      title: "Database Management Systems - 2022",
      subject: "DBMS",
      year: "2022",
      semester: "4th",
      fileSize: "1.7 MB",
      fileType: "PDF",
    },
  ];

  const studyMaterials = [
    {
      id: "sm-1",
      title: "DSA Complete Notes",
      subject: "DSA",
      author: "Prof. Sharma",
      uploadDate: "2023-08-15",
      fileSize: "5.2 MB",
      fileType: "PDF",
    },
    {
      id: "sm-2",
      title: "DBMS Concepts and Design",
      subject: "DBMS",
      author: "Prof. Gupta",
      uploadDate: "2023-07-22",
      fileSize: "4.8 MB",
      fileType: "PDF",
    },
    {
      id: "sm-3",
      title: "Operating Systems Fundamentals",
      subject: "OS",
      author: "Prof. Verma",
      uploadDate: "2023-09-05",
      fileSize: "6.1 MB",
      fileType: "PDF",
    },
    {
      id: "sm-4",
      title: "Computer Networks Illustrated",
      subject: "CN",
      author: "Prof. Kumar",
      uploadDate: "2023-08-30",
      fileSize: "7.3 MB",
      fileType: "PDF",
    },
    {
      id: "sm-5",
      title: "OOP Concepts with Java",
      subject: "OOP",
      author: "Prof. Singh",
      uploadDate: "2023-07-10",
      fileSize: "4.5 MB",
      fileType: "PDF",
    },
  ];

  const lectureNotes = [
    {
      id: "ln-1",
      title: "DSA Lecture 1-5: Arrays and Linked Lists",
      subject: "DSA",
      lecturer: "Prof. Sharma",
      uploadDate: "2023-08-02",
      fileSize: "3.2 MB",
      fileType: "PDF",
    },
    {
      id: "ln-2",
      title: "DSA Lecture 6-10: Stacks and Queues",
      subject: "DSA",
      lecturer: "Prof. Sharma",
      uploadDate: "2023-08-09",
      fileSize: "2.8 MB",
      fileType: "PDF",
    },
    {
      id: "ln-3",
      title: "DBMS Lecture 1-4: ER Diagrams",
      subject: "DBMS",
      lecturer: "Prof. Gupta",
      uploadDate: "2023-07-15",
      fileSize: "2.5 MB",
      fileType: "PDF",
    },
    {
      id: "ln-4",
      title: "DBMS Lecture 5-8: SQL Basics",
      subject: "DBMS",
      lecturer: "Prof. Gupta",
      uploadDate: "2023-07-22",
      fileSize: "2.7 MB",
      fileType: "PDF",
    },
    {
      id: "ln-5",
      title: "OS Lecture 1-3: Process Management",
      subject: "OS",
      lecturer: "Prof. Verma",
      uploadDate: "2023-09-01",
      fileSize: "2.1 MB",
      fileType: "PDF",
    },
  ];

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">College Resources</h1>
          <p className="text-muted-foreground">Access and download study materials, previous year papers, and lecture notes.</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resources..."
              className="w-full pl-8"
            />
          </div>
        </div>

        <Tabs defaultValue="previous-papers">
          <TabsList>
            <TabsTrigger value="previous-papers">Previous Year Papers</TabsTrigger>
            <TabsTrigger value="study-materials">Study Materials</TabsTrigger>
            <TabsTrigger value="lecture-notes">Lecture Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="previous-papers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Previous Year Papers</CardTitle>
                <CardDescription>Access and download previous year examination papers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>File Size</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previousYearPapers.map((paper) => (
                      <TableRow key={paper.id}>
                        <TableCell className="font-medium">{paper.title}</TableCell>
                        <TableCell>{paper.subject}</TableCell>
                        <TableCell>{paper.year}</TableCell>
                        <TableCell>{paper.semester}</TableCell>
                        <TableCell>{paper.fileSize}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="study-materials" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Materials</CardTitle>
                <CardDescription>Access and download comprehensive study materials</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>File Size</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studyMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.title}</TableCell>
                        <TableCell>{material.subject}</TableCell>
                        <TableCell>{material.author}</TableCell>
                        <TableCell>{material.uploadDate}</TableCell>
                        <TableCell>{material.fileSize}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="lecture-notes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Lecture Notes</CardTitle>
                <CardDescription>Access and download lecture notes from professors</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Lecturer</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>File Size</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lectureNotes.map((note) => (
                      <TableRow key={note.id}>
                        <TableCell className="font-medium">{note.title}</TableCell>
                        <TableCell>{note.subject}</TableCell>
                        <TableCell>{note.lecturer}</TableCell>
                        <TableCell>{note.uploadDate}</TableCell>
                        <TableCell>{note.fileSize}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}