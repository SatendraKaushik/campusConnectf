import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy } from "lucide-react"

export default function LeaderboardPage() {
  // Hardcoded data for demonstration
  const overallLeaderboard = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Computer Science",
      batch: "2022",
      score: 1250,
      rank: 1,
      isCurrentUser: true,
    },
    {
      id: 2,
      name: "Emma Wilson",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Computer Science",
      batch: "2021",
      score: 1180,
      rank: 2,
      isCurrentUser: false,
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Information Technology",
      batch: "2022",
      score: 1120,
      rank: 3,
      isCurrentUser: false,
    },
    {
      id: 4,
      name: "Sophia Chen",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Computer Science",
      batch: "2021",
      score: 1050,
      rank: 4,
      isCurrentUser: false,
    },
    {
      id: 5,
      name: "James Rodriguez",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Electronics",
      batch: "2022",
      score: 980,
      rank: 5,
      isCurrentUser: false,
    },
    {
      id: 6,
      name: "Olivia Martinez",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Information Technology",
      batch: "2021",
      score: 950,
      rank: 6,
      isCurrentUser: false,
    },
    {
      id: 7,
      name: "William Taylor",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Computer Science",
      batch: "2022",
      score: 920,
      rank: 7,
      isCurrentUser: false,
    },
    {
      id: 8,
      name: "Ava Johnson",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Design",
      batch: "2021",
      score: 890,
      rank: 8,
      isCurrentUser: false,
    },
    {
      id: 9,
      name: "Ethan Davis",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Computer Science",
      batch: "2022",
      score: 860,
      rank: 9,
      isCurrentUser: false,
    },
    {
      id: 10,
      name: "Isabella Garcia",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Information Technology",
      batch: "2021",
      score: 830,
      rank: 10,
      isCurrentUser: false,
    },
  ]

  const codingLeaderboard = [
    {
      id: 1,
      name: "Michael Brown",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Information Technology",
      batch: "2022",
      score: 980,
      rank: 1,
      isCurrentUser: false,
    },
    {
      id: 2,
      name: "Emma Wilson",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Computer Science",
      batch: "2021",
      score: 950,
      rank: 2,
      isCurrentUser: false,
    },
    {
      id: 3,
      name: "Alex Johnson",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Computer Science",
      batch: "2022",
      score: 920,
      rank: 3,
      isCurrentUser: true,
    },
    // ... more entries
  ]

  const academicLeaderboard = [
    {
      id: 1,
      name: "Emma Wilson",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Computer Science",
      batch: "2021",
      score: 9.8,
      rank: 1,
      isCurrentUser: false,
    },
    {
      id: 2,
      name: "Sophia Chen",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Computer Science",
      batch: "2021",
      score: 9.7,
      rank: 2,
      isCurrentUser: false,
    },
    {
      id: 3,
      name: "Alex Johnson",
      avatar: "https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-avatar-10107492-8179543.png",
      branch: "Computer Science",
      batch: "2022",
      score: 9.5,
      rank: 3,
      isCurrentUser: true,
    },
    // ... more entries
  ]

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
            <p className="text-muted-foreground">See how you rank among your peers across different categories.</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
                <SelectItem value="ec">Electronics</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overall">
          <TabsList>
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
          </TabsList>

          <TabsContent value="overall" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Performance Leaderboard</CardTitle>
                <CardDescription>Based on combined scores from coding, academics, and participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {overallLeaderboard.slice(0, 3).map((student) => (
                    <Card
                      key={student.id}
                      className={`overflow-hidden ${student.rank === 1 ? "border-yellow-400" : student.rank === 2 ? "border-gray-400" : "border-amber-600"}`}
                    >
                      <div
                        className={`h-2 ${student.rank === 1 ? "bg-yellow-400" : student.rank === 2 ? "bg-gray-400" : "bg-amber-600"}`}
                      ></div>
                      <CardContent className="pt-6 flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -top-2 -right-2 rounded-full p-1 ${
                              student.rank === 1 ? "bg-yellow-400" : student.rank === 2 ? "bg-gray-400" : "bg-amber-600"
                            }`}
                          >
                            <Trophy className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg">{student.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{student.branch}</Badge>
                          <Badge variant="outline">{student.batch}</Badge>
                        </div>
                        <div className="mt-4">
                          <p className="text-3xl font-bold">{student.score}</p>
                          <p className="text-sm text-muted-foreground">Points</p>
                        </div>
                        {student.isCurrentUser && (
                          <Badge className="mt-2">
                            You
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">Student</div>
                    <div className="col-span-3">Branch</div>
                    <div className="col-span-1">Batch</div>
                    <div className="col-span-2 text-right">Score</div>
                  </div>
                  <div className="divide-y">
                    {overallLeaderboard.map((student) => (
                      <div
                        key={student.id}
                        className={`grid grid-cols-12 p-4 items-center ${student.isCurrentUser ? "bg-muted" : ""}`}
                      >
                        <div className="col-span-1 font-medium">
                          {student.rank <= 3 ? (
                            <div
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                                student.rank === 1
                                  ? "bg-yellow-100 text-yellow-700"
                                  : student.rank === 2
                                    ? "bg-gray-100 text-gray-700"
                                    : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {student.rank}
                            </div>
                          ) : (
                            student.rank
                          )}
                        </div>
                        <div className="col-span-5 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            {student.isCurrentUser && (
                              <Badge variant="outline" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="col-span-3">{student.branch}</div>
                        <div className="col-span-1">{student.batch}</div>
                        <div className="col-span-2 text-right font-medium">{student.score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coding" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Coding Performance Leaderboard</CardTitle>
                <CardDescription>
                  Based on scores from LeetCode, CodeChef, GeeksforGeeks, and Coding Ninjas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">Student</div>
                    <div className="col-span-3">Branch</div>
                    <div className="col-span-1">Batch</div>
                    <div className="col-span-2 text-right">Score</div>
                  </div>
                  <div className="divide-y">
                    {codingLeaderboard.map((student) => (
                      <div
                        key={student.id}
                        className={`grid grid-cols-12 p-4 items-center ${student.isCurrentUser ? "bg-muted" : ""}`}
                      >
                        <div className="col-span-1 font-medium">
                          {student.rank <= 3 ? (
                            <div
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                                student.rank === 1
                                  ? "bg-yellow-100 text-yellow-700"
                                  : student.rank === 2
                                    ? "bg-gray-100 text-gray-700"
                                    : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {student.rank}
                            </div>
                          ) : (
                            student.rank
                          )}
                        </div>
                        <div className="col-span-5 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            {student.isCurrentUser && (
                              <Badge variant="outline" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="col-span-3">{student.branch}</div>
                        <div className="col-span-1">{student.batch}</div>
                        <div className="col-span-2 text-right font-medium">{student.score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Performance Leaderboard</CardTitle>
                <CardDescription>Based on CGPA and academic achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-5">Student</div>
                    <div className="col-span-3">Branch</div>
                    <div className="col-span-1">Batch</div>
                    <div className="col-span-2 text-right">CGPA</div>
                  </div>
                  <div className="divide-y">
                    {academicLeaderboard.map((student) => (
                      <div
                        key={student.id}
                        className={`grid grid-cols-12 p-4 items-center ${student.isCurrentUser ? "bg-muted" : ""}`}
                      >
                        <div className="col-span-1 font-medium">
                          {student.rank <= 3 ? (
                            <div
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                                student.rank === 1
                                  ? "bg-yellow-100 text-yellow-700"
                                  : student.rank === 2
                                    ? "bg-gray-100 text-gray-700"
                                    : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {student.rank}
                            </div>
                          ) : (
                            student.rank
                          )}
                        </div>
                        <div className="col-span-5 flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            {student.isCurrentUser && (
                              <Badge variant="outline" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="col-span-3">{student.branch}</div>
                        <div className="col-span-1">{student.batch}</div>
                        <div className="col-span-2 text-right font-medium">{student.score}</div>
                      </div>
                    ))}
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

