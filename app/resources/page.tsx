import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, ExternalLink, Search, ThumbsUp, Video } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  // Hardcoded data for demonstration
  const studyMaterials = [
    {
      id: 1,
      title: "Data Structures and Algorithms Notes",
      description: "Comprehensive notes covering all important DSA topics with examples and practice problems.",
      category: "Computer Science",
      type: "PDF",
      size: "2.5 MB",
      uploadedBy: "Prof. Smith",
      uploadDate: "May 10, 2024",
      downloads: 245,
      tags: ["DSA", "Algorithms", "Programming"],
      link: "#",
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      description:
        "Introduction to machine learning concepts, algorithms, and practical applications with Python code examples.",
      category: "Computer Science",
      type: "PDF",
      size: "4.2 MB",
      uploadedBy: "Dr. Johnson",
      uploadDate: "April 25, 2024",
      downloads: 189,
      tags: ["Machine Learning", "AI", "Python"],
      link: "#",
    },
    {
      id: 3,
      title: "Web Development Crash Course",
      description: "Learn HTML, CSS, JavaScript, and modern frameworks like React and Next.js with practical projects.",
      category: "Computer Science",
      type: "ZIP",
      size: "15 MB",
      uploadedBy: "Prof. Wilson",
      uploadDate: "May 5, 2024",
      downloads: 320,
      tags: ["Web Dev", "HTML", "CSS", "JavaScript"],
      link: "#",
    },
    {
      id: 4,
      title: "Digital Electronics Lecture Notes",
      description: "Complete lecture notes for Digital Electronics covering combinational and sequential circuits.",
      category: "Electronics",
      type: "PDF",
      size: "3.8 MB",
      uploadedBy: "Prof. Davis",
      uploadDate: "April 15, 2024",
      downloads: 156,
      tags: ["Digital Electronics", "Circuits", "Logic Gates"],
      link: "#",
    },
  ]

  const pastPapers = [
    {
      id: 1,
      title: "Data Structures Mid-Semester Exam 2023",
      course: "CS201",
      semester: "Autumn 2023",
      type: "Mid-Semester",
      size: "1.2 MB",
      uploadedBy: "Admin",
      uploadDate: "December 15, 2023",
      downloads: 312,
      link: "#",
    },
    {
      id: 2,
      title: "Machine Learning End-Semester Exam 2023",
      course: "CS401",
      semester: "Spring 2023",
      type: "End-Semester",
      size: "1.5 MB",
      uploadedBy: "Admin",
      uploadDate: "June 20, 2023",
      downloads: 278,
      link: "#",
    },
    {
      id: 3,
      title: "Web Technologies End-Semester Exam 2023",
      course: "CS301",
      semester: "Autumn 2023",
      type: "End-Semester",
      size: "1.8 MB",
      uploadedBy: "Admin",
      uploadDate: "December 10, 2023",
      downloads: 245,
      link: "#",
    },
  ]

  const videoLectures = [
    {
      id: 1,
      title: "Introduction to Data Structures",
      description: "Learn about arrays, linked lists, stacks, queues, and their implementations.",
      instructor: "Prof. Smith",
      duration: "45 minutes",
      uploadDate: "May 5, 2024",
      views: 456,
      category: "Computer Science",
      thumbnail: "/placeholder.svg?height=120&width=200",
      link: "#",
    },
    {
      id: 2,
      title: "Machine Learning Algorithms Explained",
      description: "Detailed explanation of popular ML algorithms with practical examples.",
      instructor: "Dr. Johnson",
      duration: "60 minutes",
      uploadDate: "April 28, 2024",
      views: 389,
      category: "Computer Science",
      thumbnail: "/placeholder.svg?height=120&width=200",
      link: "#",
    },
    {
      id: 3,
      title: "Web Development with React",
      description: "Learn how to build modern web applications using React and Next.js.",
      instructor: "Prof. Wilson",
      duration: "55 minutes",
      uploadDate: "May 2, 2024",
      views: 512,
      category: "Computer Science",
      thumbnail: "/placeholder.svg?height=120&width=200",
      link: "#",
    },
  ]

  const usefulLinks = [
    {
      id: 1,
      title: "LeetCode",
      description: "Practice coding problems and prepare for technical interviews.",
      category: "Coding Practice",
      icon: "/placeholder.svg?height=40&width=40",
      link: "https://leetcode.com",
    },
    {
      id: 2,
      title: "Coursera",
      description: "Access online courses from top universities and organizations.",
      category: "Online Learning",
      icon: "/placeholder.svg?height=40&width=40",
      link: "https://coursera.org",
    },
    {
      id: 3,
      title: "GitHub",
      description: "Host and review code, manage projects, and build software.",
      category: "Development",
      icon: "/placeholder.svg?height=40&width=40",
      link: "https://github.com",
    },
    {
      id: 4,
      title: "Stack Overflow",
      description: "Find answers to your programming questions and help others.",
      category: "Development",
      icon: "/placeholder.svg?height=40&width=40",
      link: "https://stackoverflow.com",
    },
    {
      id: 5,
      title: "Kaggle",
      description: "Find datasets, competitions, and notebooks for data science.",
      category: "Data Science",
      icon: "/placeholder.svg?height=40&width=40",
      link: "https://kaggle.com",
    },
  ]

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Resource Library</h1>
            <p className="text-muted-foreground">Access study materials, past papers, and useful resources</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search resources..." className="pl-8 w-full md:w-[250px]" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="mechanical">Mechanical</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="civil">Civil</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="study-materials">
          <TabsList>
            <TabsTrigger value="study-materials">Study Materials</TabsTrigger>
            <TabsTrigger value="past-papers">Past Papers</TabsTrigger>
            <TabsTrigger value="video-lectures">Video Lectures</TabsTrigger>
            <TabsTrigger value="useful-links">Useful Links</TabsTrigger>
          </TabsList>

          <TabsContent value="study-materials" className="mt-6 space-y-6">
            {studyMaterials.map((material) => (
              <Card key={material.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{material.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {material.category} • {material.type} • {material.size}
                      </CardDescription>
                    </div>
                    <Button asChild>
                      <Link href={material.link}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{material.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {material.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Uploaded by:</span> {material.uploadedBy} on {material.uploadDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {material.downloads} downloads
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past-papers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Past Examination Papers</CardTitle>
                <CardDescription>Access previous years' question papers for exam preparation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-4">Title</div>
                    <div className="col-span-2">Course</div>
                    <div className="col-span-2">Semester</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Action</div>
                  </div>
                  <div className="divide-y">
                    {pastPapers.map((paper) => (
                      <div key={paper.id} className="grid grid-cols-12 p-4 items-center">
                        <div className="col-span-4 font-medium">{paper.title}</div>
                        <div className="col-span-2">{paper.course}</div>
                        <div className="col-span-2">{paper.semester}</div>
                        <div className="col-span-2">
                          <Badge variant="outline">{paper.type}</Badge>
                        </div>
                        <div className="col-span-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={paper.link}>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Past Papers
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="video-lectures" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videoLectures.map((lecture) => (
                <Card key={lecture.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <img
                      src={lecture.thumbnail || "/placeholder.svg"}
                      alt={lecture.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{lecture.title}</CardTitle>
                      <Badge variant="outline">{lecture.duration}</Badge>
                    </div>
                    <CardDescription>{lecture.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{lecture.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div>{lecture.uploadDate}</div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {lecture.views} views
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={lecture.link}>
                        <Video className="mr-2 h-4 w-4" />
                        Watch Lecture
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="useful-links" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {usefulLinks.map((link) => (
                <Card key={link.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage src={link.icon} alt={link.title} />
                        <AvatarFallback>
                          <ExternalLink className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{link.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{link.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{link.category}</Badge>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={link.link} target="_blank">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Visit Site
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

