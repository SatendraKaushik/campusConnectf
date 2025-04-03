"use client"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, Briefcase, Building2, Calendar, Clock, Download, ExternalLink, Filter, MapPin, Plus, Search, Users } from "lucide-react"
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

export default function AdminJobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Hardcoded data for demonstration
  const jobPostings = [
    {
      id: "JOB001",
      title: "Frontend Developer Intern",
      company: "TechSolutions Inc.",
      location: "Remote",
      type: "Internship",
      salary: "₹25,000 - ₹35,000/month",
      posted: "2023-05-10",
      deadline: "2023-05-30",
      status: "active",
      applicants: 24,
      logo: "/placeholder.svg?height=40&width=40",
      skills: ["JavaScript", "React", "HTML", "CSS", "TypeScript"],
      description: "We are looking for a passionate Frontend Developer Intern to join our team. You will be working on real-world projects and gain hands-on experience with modern web technologies.",
      requirements: [
        "Strong knowledge of JavaScript, HTML, and CSS",
        "Experience with React or similar frontend frameworks",
        "Basic understanding of UI/UX principles",
        "Good problem-solving skills",
        "Currently pursuing a degree in Computer Science or related field",
      ],
    },
    {
      id: "JOB002",
      title: "Backend Developer",
      company: "DataWorks Systems",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹8,00,000 - ₹12,00,000/year",
      posted: "2023-05-05",
      deadline: "2023-06-15",
      status: "active",
      applicants: 18,
      logo: "/placeholder.svg?height=40&width=40",
      skills: ["Node.js", "Express", "MongoDB", "REST API", "JavaScript"],
      description: "We are seeking a skilled Backend Developer to design and implement server-side applications. You will be responsible for developing and maintaining the core functionality of our products.",
      requirements: [
        "Strong proficiency in Node.js and Express",
        "Experience with MongoDB or other NoSQL databases",
        "Knowledge of RESTful API design principles",
        "Understanding of server-side templating languages",
        "Bachelor's degree in Computer Science or equivalent experience",
      ],
    },
    {
      id: "JOB003",
      title: "Machine Learning Engineer",
      company: "AI Innovations",
      location: "Hyderabad, India",
      type: "Full-time",
      salary: "₹12,00,000 - ₹18,00,000/year",
      posted: "2023-05-08",
      deadline: "2023-06-10",
      status: "active",
      applicants: 12,
      logo: "/placeholder.svg?height=40&width=40",
      skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"],
      description: "Join our team of ML engineers working on cutting-edge AI solutions. You will be involved in developing and deploying machine learning models for various applications.",
      requirements: [
        "Strong programming skills in Python",
        "Experience with machine learning frameworks like TensorFlow or PyTorch",
        "Understanding of machine learning algorithms and principles",
        "Knowledge of data preprocessing techniques",
        "Master's or Bachelor's degree in Computer Science, AI, or related field",
      ],
    },
    {
      id: "JOB004",
      title: "Software Development Engineer",
      company: "Amazon",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹15,00,000 - ₹25,00,000/year",
      posted: "2023-05-06",
      deadline: "2023-06-20",
      status: "active",
      applicants: 35,
      logo: "/placeholder.svg?height=40&width=40",
      skills: ["Java", "Data Structures", "Algorithms", "System Design", "AWS"],
      description: "Amazon is looking for Software Development Engineers to join our team. You will be responsible for designing, developing, and maintaining scalable software solutions.",
      requirements: [
        "Strong programming skills in Java or similar languages",
        "Solid understanding of data structures and algorithms",
        "Experience with distributed systems and cloud technologies",
        "Ability to work in a fast-paced environment",
        "Bachelor's or Master's degree in Computer Science or related field",
      ],
    },
    {
      id: "JOB005",
      title: "Data Analyst",
      company: "Finance Solutions",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹6,00,000 - ₹9,00,000/year",
      posted: "2023-05-03",
      deadline: "2023-06-05",
      status: "active",
      applicants: 20,
      logo: "/placeholder.svg?height=40&width=40",
      skills: ["SQL", "Excel", "Python", "Data Visualization", "Statistics"],
      description: "We are looking for a Data Analyst to interpret data and turn it into information which can offer ways to improve our business.",
      requirements: [
        "Strong analytical skills with the ability to collect, organize, and analyze significant amounts of information",
        "Proficiency in SQL and Excel",
        "Experience with data visualization tools",
        "Bachelor's degree in Statistics, Mathematics, Computer Science, or related field",
      ],
    },
    {
      id: "JOB006",
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Pune, India",
      type: "Full-time",
      salary: "₹10,00,000 - ₹15,00,000/year",
      posted: "2023-04-25",
      deadline: "2023-05-25",
      status: "closed",
      applicants: 15,
      logo: "/placeholder.svg?height=40&width=40",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
      description: "We are seeking a DevOps Engineer to help build and maintain our cloud infrastructure and deployment pipelines.",
      requirements: [
        "Experience with containerization technologies like Docker and Kubernetes",
        "Knowledge of cloud platforms, preferably AWS",
        "Understanding of CI/CD principles and tools",
        "Strong Linux administration skills",
        "Bachelor's degree in Computer Science or equivalent experience",
      ],
    },
  ]

  // Filter jobs based on search query and filters
  const filteredJobs = jobPostings.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesType = filterType === "all" || job.type.toLowerCase() === filterType.toLowerCase()
    const matchesStatus = filterStatus === "all" || job.status.toLowerCase() === filterStatus.toLowerCase()
    
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Job Postings</h1>
            <p className="text-muted-foreground">
              Manage job postings and track applications from companies.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Job
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search jobs..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Job Listings</CardTitle>
            <CardDescription>
              Total {filteredJobs.length} job postings found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={job.logo} alt={job.company} />
                          <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {job.title}
                      </div>
                    </TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>{new Date(job.posted).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(job.deadline).toLocaleDateString()}</TableCell>
                    <TableCell>{job.applicants}</TableCell>
                    <TableCell>
                      <Badge variant={job.status === "active" ? "default" : job.status === "closed" ? "secondary" : "outline"}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Click on a job to view detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobPostings.slice(0, 1).map((job) => (
                  <div key={job.id} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={job.logo} alt={job.company} />
                        <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Posted: {new Date(job.posted).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Salary Range</h4>
                      <p className="text-sm">{job.salary}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{job.description}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Requirements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Application Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground">Total Applications</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">Shortlisted</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">In Review</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold">4</div>
                            <p className="text-xs text-muted-foreground">Rejected</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Applicant Skills Match</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>JavaScript</span>
                            <span className="text-muted-foreground">18/24</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-primary" style={{ width: "75%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>React</span>
                            <span className="text-muted-foreground">15/24</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-primary" style={{ width: "62.5%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>TypeScript</span>
                            <span className="text-muted-foreground">10/24</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-primary" style={{ width: "41.6%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>HTML/CSS</span>
                            <span className="text-muted-foreground">22/24</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-primary" style={{ width: "91.6%" }} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Close Job</Button>
                    <Button>View All Applicants</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}