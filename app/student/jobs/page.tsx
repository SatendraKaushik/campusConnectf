"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Briefcase, Building2, Calendar, Clock, ExternalLink, Filter, Loader2, MapPin, Search, X } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Define types for job data
interface Job {
  id: number | string;
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
  url?: string;
}

export default function JobsPage() {
  // Define student skills
  const studentSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Data Structures",
    "Algorithms",
    "Machine Learning",
  ]

  // State for jobs
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([])
  const [allJobs, setAllJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  // Filter states
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [minSalary, setMinSalary] = useState("")
  const [currentFilters, setCurrentFilters] = useState<string[]>([])

  // Function to fetch jobs based on skills
  const fetchJobs = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Use fallback data directly since the API key is not working
      const fallbackJobs = generateFallbackJobs(studentSkills)
      
      // Sort by matched skills (descending)
      fallbackJobs.sort((a, b) => b.matched - a.matched)
      
      // Set recommended jobs (top matches)
      setRecommendedJobs(fallbackJobs.filter(job => job.matched >= 2))
      
      // Set all jobs
      setAllJobs(fallbackJobs)
      
    } catch (err) {
      console.error("Error generating jobs:", err)
      setError("Failed to load jobs. Please try again later.")
      
      // Use fallback data
      const fallbackJobs = generateFallbackJobs(studentSkills)
      setRecommendedJobs(fallbackJobs.filter(job => job.matched >= 2))
      setAllJobs(fallbackJobs)
    } finally {
      setLoading(false)
    }
  }
  
  // Helper functions for fallback data
  const getRandomJobType = () => {
    const types = ["Full-time", "Part-time", "Contract", "Internship", "Remote"]
    return types[Math.floor(Math.random() * types.length)]
  }
  
  const getRandomSalary = () => {
    const currencies = ["₹", "$", "£"]
    const currency = currencies[Math.floor(Math.random() * currencies.length)]
    const min = Math.floor(Math.random() * 10 + 5) * 10000
    const max = min + Math.floor(Math.random() * 10 + 5) * 10000
    
    if (currency === "₹") {
      return `${currency}${(min/1000).toFixed(0)}K - ${(max/1000).toFixed(0)}K/year`
    } else {
      return `${currency}${(min/1000).toFixed(0)}K - ${(max/1000).toFixed(0)}K/year`
    }
  }
  
  const getRandomPostedDate = () => {
    const days = Math.floor(Math.random() * 14) + 1
    return days === 1 ? "1 day ago" : `${days} days ago`
  }
  
  const getRandomDeadline = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = months[Math.floor(Math.random() * months.length)]
    const day = Math.floor(Math.random() * 28) + 1
    return `${month} ${day}, 2025`
  }
  
  // Generate fallback jobs data
  const generateFallbackJobs = (skills: string[]): Job[] => {
    const jobTitles = [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Engineer",
      "Data Scientist",
      "Machine Learning Engineer",
      "DevOps Engineer",
      "React Developer",
      "Python Developer",
      "Node.js Developer",
      "Software Engineer"
    ]
    
    const companies = [
      "TechSolutions Inc.",
      "DataWorks Systems",
      "AI Innovations",
      "CodeCraft",
      "ByteLogic",
      "Microsoft",
      "Amazon",
      "Google",
      "Meta",
      "Salesforce"
    ]
    
    const locations = [
      "Remote",
      "Bangalore, India",
      "Mumbai, India",
      "Delhi, India",
      "Hyderabad, India",
      "Chennai, India",
      "San Francisco, USA",
      "New York, USA",
      "London, UK",
      "Berlin, Germany"
    ]
    
    return Array.from({ length: 12 }, (_, i) => {
      // Randomly select skills for this job
      const jobSkills = [...skills].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 2)
      
      // Add some non-student skills
      const additionalSkills = ["SQL", "Java", "TypeScript", "AWS", "Docker", "HTML", "CSS", "Express", "MongoDB", "Git"]
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1)
      
      const allJobSkills = [...new Set([...jobSkills, ...additionalSkills])].slice(0, 5)
      
      // Calculate matched skills
      const matched = allJobSkills.filter(skill => skills.includes(skill)).length
      
      return {
        id: i + 1,
        title: jobTitles[i % jobTitles.length],
        company: companies[i % companies.length],
        location: locations[i % locations.length],
        type: getRandomJobType(),
        salary: getRandomSalary(),
        posted: getRandomPostedDate(),
        deadline: getRandomDeadline(),
        logo: "https://static.vecteezy.com/system/resources/previews/028/169/662/non_2x/3d-icons-occupation-job-avatar-for-social-media-profile-pictures-free-png.png",
        skills: allJobSkills,
        description: "We are looking for a talented professional to join our team. You will be working on exciting projects using cutting-edge technologies.",
        requirements: [
          "Strong knowledge of relevant technologies",
          "Experience with software development lifecycle",
          "Good problem-solving skills",
          "Team collaboration",
          "Bachelor's degree in Computer Science or related field"
        ],
        matched: matched
      }
    })
  }
  
  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs()
  }, [])
  
  // Filter functions
  const handleAddJobTypeFilter = (type: string) => {
    if (!selectedJobTypes.includes(type)) {
      setSelectedJobTypes([...selectedJobTypes, type])
      setCurrentFilters([...currentFilters, `Job Type: ${type}`])
    }
  }
  
  const handleAddSkillFilter = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill])
      setCurrentFilters([...currentFilters, `Skill: ${skill}`])
    }
  }
  
  const handleAddLocationFilter = (location: string) => {
    if (!selectedLocations.includes(location)) {
      setSelectedLocations([...selectedLocations, location])
      setCurrentFilters([...currentFilters, `Location: ${location}`])
    }
  }
  
  const handleRemoveFilter = (filter: string) => {
    const filterText = filter.split(": ")[1]
    const filterType = filter.split(": ")[0]
    
    setCurrentFilters(currentFilters.filter(f => f !== filter))
    
    if (filterType === "Job Type") {
      setSelectedJobTypes(selectedJobTypes.filter(t => t !== filterText))
    } else if (filterType === "Skill") {
      setSelectedSkills(selectedSkills.filter(s => s !== filterText))
    } else if (filterType === "Location") {
      setSelectedLocations(selectedLocations.filter(l => l !== filterText))
    }
  }
  
  const clearAllFilters = () => {
    setSelectedJobTypes([])
    setSelectedSkills([])
    setSelectedLocations([])
    setMinSalary("")
    setCurrentFilters([])
    setSearchTerm("")
  }
  
  // Filter jobs based on criteria
  const filterJobs = (jobs: Job[]) => {
    return jobs.filter(job => {
      // Search term filter
      if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !job.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !job.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      
      // Job type filter
      if (selectedJobTypes.length > 0 && !selectedJobTypes.some(type => job.type.includes(type))) {
        return false
      }
      
      // Skills filter
      if (selectedSkills.length > 0 && !selectedSkills.some(skill => job.skills.includes(skill))) {
        return false
      }
      
      // Location filter
      if (selectedLocations.length > 0 && !selectedLocations.some(location => job.location.includes(location))) {
        return false
      }
      
      return true
    })
  }
  
  const filteredRecommendedJobs = filterJobs(recommendedJobs)
  const filteredAllJobs = filterJobs(allJobs)
  
  // Get unique values for filters
  const getUniqueJobTypes = () => {
    return [...new Set(allJobs.map(job => job.type))]
  }
  
  const getUniqueLocations = () => {
    return [...new Set(allJobs.map(job => job.location))]
  }
  
  const getUniqueSkills = () => {
    const skillsSet = new Set<string>()
    allJobs.forEach(job => {
      job.skills.forEach(skill => {
        skillsSet.add(skill)
      })
    })
    return Array.from(skillsSet)
  }

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
          <Button 
            onClick={() => fetchJobs()} 
            variant="outline"
          >
            Refresh Jobs
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search for jobs..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full md:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Jobs</SheetTitle>
                <SheetDescription>
                  Narrow down job listings based on your preferences.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Job Type</h3>
                  <div className="space-y-2">
                    {getUniqueJobTypes().map((type, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`type-${index}`} 
                          checked={selectedJobTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleAddJobTypeFilter(type)
                            } else {
                              handleRemoveFilter(`Job Type: ${type}`)
                            }
                          }}
                        />
                        <label htmlFor={`type-${index}`} className="text-sm">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Skills</h3>
                  <div className="space-y-2">
                    {getUniqueSkills().map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`skill-${index}`} 
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleAddSkillFilter(skill)
                            } else {
                              handleRemoveFilter(`Skill: ${skill}`)
                            }
                          }}
                        />
                        <label htmlFor={`skill-${index}`} className="text-sm">{skill}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Location</h3>
                  <div className="space-y-2">
                    {getUniqueLocations().map((location, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`location-${index}`} 
                          checked={selectedLocations.includes(location)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleAddLocationFilter(location)
                            } else {
                              handleRemoveFilter(`Location: ${location}`)
                            }
                          }}
                        />
                        <label htmlFor={`location-${index}`} className="text-sm">{location}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {currentFilters.length > 0 && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {currentFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {filter}
                  <button 
                    onClick={() => handleRemoveFilter(filter)}
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button variant="link" className="h-6 px-2" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Your Skills</h2>
          <div className="flex flex-wrap gap-2">
            {studentSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleAddSkillFilter(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading jobs...</span>
          </div>
        ) : (
          <Tabs defaultValue="recommended">
            <TabsList>
              <TabsTrigger value="recommended">
                Recommended Jobs {filteredRecommendedJobs.length > 0 && `(${filteredRecommendedJobs.length})`}
              </TabsTrigger>
              <TabsTrigger value="all">
                All Jobs {filteredAllJobs.length > 0 && `(${filteredAllJobs.length})`}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="recommended" className="mt-6 space-y-6">
              {filteredRecommendedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredRecommendedJobs.map((job) => (
                    <JobCard key={job.id} job={job} studentSkills={studentSkills} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recommended jobs found with current filters.</p>
                  {currentFilters.length > 0 && (
                    <Button variant="link" onClick={clearAllFilters}>
                      Clear filters
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
            <TabsContent value="all" className="mt-6 space-y-6">
              {filteredAllJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAllJobs.map((job) => (
                    <JobCard key={job.id} job={job} studentSkills={studentSkills} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No jobs found with current filters.</p>
                  {currentFilters.length > 0 && (
                    <Button variant="link" onClick={clearAllFilters}>
                      Clear filters
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  )
}

interface JobCardProps {
  job: Job;
  studentSkills: string[];
}

function JobCard({ job, studentSkills }: JobCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{job.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {job.company} • {job.location}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex justify-between items-center">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Posted: {job.posted}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Salary:</span> {job.salary}
                    </div>
                  </div>
                  <Badge variant={job.matched >= 3 ? "default" : "secondary"} className="h-6">
                    {job.matched} skill{job.matched !== 1 ? "s" : ""} matched
                  </Badge>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Job Description</h3>
                  <p className="text-sm">{job.description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Requirements</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className={studentSkills.includes(skill) ? "bg-primary/10" : ""}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline">Save Job</Button>
                  <Button onClick={() => {
                    if (job.url) {
                      window.open(job.url, '_blank')
                    } else {
                      window.open(`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title)}`, '_blank')
                    }
                    setIsDialogOpen(false)
                  }}>
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  )
}