import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Edit, Github, Linkedin, Mail, MapPin, Phone, Twitter, Trophy } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  // Hardcoded data for demonstration
  const profileData = {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=200&width=200",
    role: "Student",
    branch: "Computer Science",
    batch: "2022-2026",
    bio: "Passionate computer science student with interests in web development, machine learning, and competitive programming. Looking to connect with like-minded individuals and mentors.",
    location: "New Delhi, India",
    email: "alex.johnson@example.com",
    phone: "+91 9876543210",
    website: "https://alexjohnson.dev",
    socialLinks: {
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
    },
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "Java",
      "C++",
      "Data Structures",
      "Algorithms",
      "Machine Learning",
      "Web Development",
    ],
    education: [
      {
        institution: "Delhi Public School",
        degree: "10th Grade",
        field: "CBSE",
        year: "2018",
        score: "95.6%",
      },
      {
        institution: "Delhi Public School",
        degree: "12th Grade",
        field: "CBSE",
        year: "2020",
        score: "94.2%",
      },
      {
        institution: "Delhi Technological University",
        degree: "B.Tech",
        field: "Computer Science",
        year: "2022-2026",
        score: "9.4 CGPA",
      },
    ],
    achievements: [
      "1st place in College Hackathon 2023",
      "Selected for Google Summer of Code 2023",
      "5-star coder on CodeChef",
      "Published a research paper on ML algorithms",
      "Won the Best Project Award in Software Engineering course",
    ],
    interests: [
      "Competitive Programming",
      "Web Development",
      "Machine Learning",
      "Open Source",
      "Blockchain",
      "UI/UX Design",
    ],
    connections: {
      seniors: 12,
      peers: 45,
      mentors: 3,
    },
    performanceStats: {
      leetcode: { solved: 120, total: 2000, rank: 15243 },
      codechef: { rating: 1823, contests: 12, highestRank: 342 },
      gfg: { solved: 85, score: 350 },
      codingNinjas: { points: 1250, rank: "Knight" },
    },
  }

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and preferences</p>
          </div>
          <Button asChild>
            <Link href="/student/settings">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profileData.avatar} alt={profileData.name} />
                  <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">{profileData.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{profileData.role}</Badge>
                  <Badge variant="outline">{profileData.branch}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{profileData.batch}</p>
                <div className="flex items-center gap-2 mt-4">
                  <Link href={profileData.socialLinks.github} target="_blank">
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link href={profileData.socialLinks.linkedin} target="_blank">
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                  <Link href={profileData.socialLinks.twitter} target="_blank">
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </Link>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{profileData.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{profileData.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{profileData.phone}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-sm font-medium mb-3">Connections</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="border rounded-md p-2">
                    <p className="text-lg font-bold">{profileData.connections.seniors}</p>
                    <p className="text-xs text-muted-foreground">Seniors</p>
                  </div>
                  <div className="border rounded-md p-2">
                    <p className="text-lg font-bold">{profileData.connections.peers}</p>
                    <p className="text-xs text-muted-foreground">Peers</p>
                  </div>
                  <div className="border rounded-md p-2">
                    <p className="text-lg font-bold">{profileData.connections.mentors}</p>
                    <p className="text-xs text-muted-foreground">Mentors</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{profileData.bio}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="education">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="education" className="mt-4 space-y-4">
                {profileData.education.map((edu, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="font-semibold">{edu.institution}</h3>
                          <p className="text-sm text-muted-foreground">
                            {edu.degree} in {edu.field}
                          </p>
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                          <Badge variant="outline">{edu.year}</Badge>
                          <p className="text-sm font-medium mt-1">{edu.score}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="skills" className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <h3 className="text-sm font-medium mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.interests.map((interest, index) => (
                        <Badge key={index} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {profileData.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Trophy className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Coding Platforms Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-orange-100 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-orange-600"
                              >
                                <path d="m12 14 4-4"></path>
                                <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                              </svg>
                            </div>
                            <p className="font-medium">LeetCode</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {profileData.performanceStats.leetcode.solved} Problems Solved
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Rank: #{profileData.performanceStats.leetcode.rank}
                            </p>
                          </div>
                        </div>
                        <Progress
                          value={
                            (profileData.performanceStats.leetcode.solved /
                              profileData.performanceStats.leetcode.total) *
                            100
                          }
                          className="h-2"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-red-100 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-red-600"
                              >
                                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                              </svg>
                            </div>
                            <p className="font-medium">CodeChef</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{profileData.performanceStats.codechef.rating} Rating</p>
                            <p className="text-xs text-muted-foreground">
                              Contests: {profileData.performanceStats.codechef.contests}
                            </p>
                          </div>
                        </div>
                        <Progress value={(profileData.performanceStats.codechef.rating / 3000) * 100} className="h-2" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-green-100 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-600"
                              >
                                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
                                <path d="M7 7h.01"></path>
                              </svg>
                            </div>
                            <p className="font-medium">GeeksforGeeks</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{profileData.performanceStats.gfg.score} Score</p>
                            <p className="text-xs text-muted-foreground">
                              Problems: {profileData.performanceStats.gfg.solved}
                            </p>
                          </div>
                        </div>
                        <Progress value={(profileData.performanceStats.gfg.score / 500) * 100} className="h-2" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-600"
                              >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                              </svg>
                            </div>
                            <p className="font-medium">Coding Ninjas</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {profileData.performanceStats.codingNinjas.points} Points
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Rank: {profileData.performanceStats.codingNinjas.rank}
                            </p>
                          </div>
                        </div>
                        <Progress
                          value={(profileData.performanceStats.codingNinjas.points / 2000) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

