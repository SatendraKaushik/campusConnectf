"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, Building2, Calendar, Clock, ExternalLink, Filter, MapPin, Search, Star, Users } from "lucide-react"
import Link from "next/link"

// Define types for job data
interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
    deadline: string;
    logo: string;
    skills: string[];
    description: string;
    requirements: string[];
    matched: number;
}

export default function JobsPage() {
    // Hardcoded data for demonstration
    const studentSkills: string[] = [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "Data Structures",
        "Algorithms",
        "Machine Learning",
    ]

    const recommendedJobs: Job[] = [
        {
            id: 1,
            title: "Frontend Developer Intern",
            company: "TechSolutions Inc.",
            location: "Remote",
            type: "Internship",
            salary: "₹25,000 - ₹35,000/month",
            posted: "2 days ago",
            deadline: "May 30, 2023",
            logo: "https://static.vecteezy.com/system/resources/previews/028/169/662/non_2x/3d-icons-occupation-job-avatar-for-social-media-profile-pictures-free-png.png",
            skills: ["JavaScript", "React", "HTML", "CSS", "TypeScript"],
            description: "We are looking for a passionate Frontend Developer Intern to join our team. You will be working on real-world projects and gain hands-on experience with modern web technologies.",
            requirements: [
                "Strong knowledge of JavaScript, HTML, and CSS",
                "Experience with React or similar frontend frameworks",
                "Basic understanding of UI/UX principles",
                "Good problem-solving skills",
                "Currently pursuing a degree in Computer Science or related field",
            ],
            matched: 4,
        },
        {
            id: 2,
            title: "Backend Developer",
            company: "DataWorks Systems",
            location: "Bangalore, India",
            type: "Full-time",
            salary: "₹8,00,000 - ₹12,00,000/year",
            posted: "1 week ago",
            deadline: "June 15, 2023",
            logo: "https://static.vecteezy.com/system/resources/previews/028/169/662/non_2x/3d-icons-occupation-job-avatar-for-social-media-profile-pictures-free-png.png",
            skills: ["Node.js", "Express", "MongoDB", "REST API", "JavaScript"],
            description: "We are seeking a skilled Backend Developer to design and implement server-side applications. You will be responsible for developing and maintaining the core functionality of our products.",
            requirements: [
                "Strong proficiency in Node.js and Express",
                "Experience with MongoDB or other NoSQL databases",
                "Knowledge of RESTful API design principles",
                "Understanding of server-side templating languages",
                "Bachelor's degree in Computer Science or equivalent experience",
            ],
            matched: 3,
        },
        {
            id: 3,
            title: "Machine Learning Engineer",
            company: "AI Innovations",
            location: "Hyderabad, India",
            type: "Full-time",
            salary: "₹12,00,000 - ₹18,00,000/year",
            posted: "3 days ago",
            deadline: "June 10, 2023",
            logo: "https://static.vecteezy.com/system/resources/previews/028/169/662/non_2x/3d-icons-occupation-job-avatar-for-social-media-profile-pictures-free-png.png",
            skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"],
            description: "Join our team of ML engineers working on cutting-edge AI solutions. You will be involved in developing and deploying machine learning models for various applications.",
            requirements: [
                "Strong programming skills in Python",
                "Experience with machine learning frameworks like TensorFlow or PyTorch",
                "Understanding of machine learning algorithms and principles",
                "Knowledge of data preprocessing techniques",
                "Master's or Bachelor's degree in Computer Science, AI, or related field",
            ],
            matched: 2,
        },
        {
            id: 4,
            title: "Software Development Engineer",
            company: "Amazon",
            location: "Bangalore, India",
            type: "Full-time",
            salary: "₹15,00,000 - ₹25,00,000/year",
            posted: "5 days ago",
            deadline: "June 20, 2023",
            logo: "https://static.vecteezy.com/system/resources/previews/028/169/662/non_2x/3d-icons-occupation-job-avatar-for-social-media-profile-pictures-free-png.png",
            skills: ["Java", "Data Structures", "Algorithms", "System Design", "AWS"],
            description: "Amazon is looking for Software Development Engineers to join our team. You will be responsible for designing, developing, and maintaining scalable software solutions.",
            requirements: [
                "Strong programming skills in Java or similar languages",
                "Solid understanding of data structures and algorithms",
                "Experience with distributed systems and cloud technologies",
                "Ability to work in a fast-paced environment",
                "Bachelor's or Master's degree in Computer Science or related field",
            ],
            matched: 2,
        },
    ]

    const allJobs: Job[] = [
        ...recommendedJobs,
        {
            id: 5,
            title: "Data Analyst",
            company: "Finance Solutions",
            location: "Mumbai, India",
            type: "Full-time",
            salary: "₹6,00,000 - ₹9,00,000/year",
            posted: "1 week ago",
            deadline: "June 5, 2023",
            logo: "https://static.vecteezy.com/system/resources/previews/028/169/662/non_2x/3d-icons-occupation-job-avatar-for-social-media-profile-pictures-free-png.png",
            skills: ["SQL", "Excel", "Python", "Data Visualization", "Statistics"],
            description: "We are looking for a Data Analyst to interpret data and turn it into information which can offer ways to improve our business.",
            requirements: [
                "Strong analytical skills with the ability to collect, organize, and analyze significant amounts of information",
                "Proficiency in SQL and Excel",
                "Experience with data visualization tools",
                "Bachelor's degree in Statistics, Mathematics, Computer Science, or related field",
            ],
            matched: 1,
        },
        {
            id: 6,
            title: "DevOps Engineer",
            company: "CloudTech Solutions",
            location: "Pune, India",
            type: "Full-time",
            salary: "₹10,00,000 - ₹15,00,000/year",
            posted: "2 weeks ago",
            deadline: "May 25, 2023",
            logo: "https://static.vecteezy.com/system/resources/previews/028/169/662/non_2x/3d-icons-occupation-job-avatar-for-social-media-profile-pictures-free-png.png",
            skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
            description: "We are seeking a DevOps Engineer to help build and maintain our cloud infrastructure and deployment pipelines.",
            requirements: [
                "Experience with containerization technologies like Docker and Kubernetes",
                "Knowledge of cloud platforms, preferably AWS",
                "Understanding of CI/CD principles and tools",
                "Strong Linux administration skills",
                "Bachelor's degree in Computer Science or equivalent experience",
            ],
            matched: 0,
        },
    ]

    return (
        <DashboardLayout userType="student">
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Job Opportunities</h1>
                        <p className="text-muted-foreground">
                            Discover job opportunities that match your skills and interests.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input type="search" placeholder="Search for jobs..." className="pl-10" />
                    </div>
                    <Button variant="outline" className="md:w-auto">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </div>

                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Your Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {studentSkills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </div>

                <Tabs defaultValue="recommended">
                    <TabsList>
                        <TabsTrigger value="recommended">Recommended Jobs</TabsTrigger>
                        <TabsTrigger value="all">All Jobs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="recommended" className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recommendedJobs.map((job) => (
                                <JobCard key={job.id} job={job} studentSkills={studentSkills} />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="all" className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {allJobs.map((job) => (
                                <JobCard key={job.id} job={job} studentSkills={studentSkills} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}

interface JobCardProps {
    job: Job;
    studentSkills: string[];
}

function JobCard({ job, studentSkills }: JobCardProps) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={job.logo} alt={job.company} />
                            <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg">{job.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {job.company}
                            </CardDescription>
                        </div>
                    </div>
                    <Badge variant={job.matched >= 3 ? "default" : "secondary"}>
                        {job.matched} skill{job.matched !== 1 ? "s" : ""} matched
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pb-3">
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        {job.type}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Posted: {job.posted}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Deadline: {job.deadline}
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                    {job.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className={studentSkills.includes(skill) ? "bg-primary/10" : ""}>
                            {skill}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                    Save
                </Button>
                <Button size="sm">
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}