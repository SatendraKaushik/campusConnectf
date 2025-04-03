"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, ExternalLink, Filter, Search, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CodingQuestionsPage() {
  // Hardcoded data for demonstration
  const leetcodeQuestions = [
    {
      id: "lc-1",
      title: "Two Sum",
      difficulty: "Easy",
      tags: ["Array", "Hash Table"],
      companies: ["Amazon", "Google", "Microsoft"],
      url: "https://leetcode.com/problems/two-sum/",
    },
    {
      id: "lc-2",
      title: "Add Two Numbers",
      difficulty: "Medium",
      tags: ["Linked List", "Math", "Recursion"],
      companies: ["Amazon", "Microsoft", "Apple"],
      url: "https://leetcode.com/problems/add-two-numbers/",
    },
    {
      id: "lc-3",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      tags: ["Hash Table", "String", "Sliding Window"],
      companies: ["Amazon", "Facebook", "Google"],
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    },
    {
      id: "lc-4",
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      tags: ["Array", "Binary Search", "Divide and Conquer"],
      companies: ["Google", "Amazon", "Microsoft"],
      url: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    },
    {
      id: "lc-5",
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      tags: ["String", "Dynamic Programming"],
      companies: ["Amazon", "Microsoft", "Facebook"],
      url: "https://leetcode.com/problems/longest-palindromic-substring/",
    },
  ];

  const codechefQuestions = [
    {
      id: "cc-1",
      title: "Chef and Strings",
      difficulty: "Easy",
      tags: ["Strings", "Implementation"],
      companies: ["Amazon", "Microsoft"],
      url: "https://www.codechef.com/problems/CHEFSTR1",
    },
    {
      id: "cc-2",
      title: "Chef and Card Game",
      difficulty: "Easy",
      tags: ["Implementation", "Math"],
      companies: ["Google", "Microsoft"],
      url: "https://www.codechef.com/problems/CRDGAME",
    },
    {
      id: "cc-3",
      title: "Chef and Dice",
      difficulty: "Medium",
      tags: ["Math", "Implementation"],
      companies: ["Amazon", "Facebook"],
      url: "https://www.codechef.com/problems/SDICE",
    },
    {
      id: "cc-4",
      title: "Chef and Division 3",
      difficulty: "Easy",
      tags: ["Math", "Implementation"],
      companies: ["Microsoft", "Google"],
      url: "https://www.codechef.com/problems/DIVTHREE",
    },
    {
      id: "cc-5",
      title: "Chef and Meetings",
      difficulty: "Medium",
      tags: ["Implementation", "Strings"],
      companies: ["Amazon", "Microsoft"],
      url: "https://www.codechef.com/problems/MEET",
    },
  ];

  const gfgQuestions = [
    {
      id: "gfg-1",
      title: "Subarray with given sum",
      difficulty: "Easy",
      tags: ["Array", "Sliding Window"],
      companies: ["Amazon", "Facebook", "Google"],
      url: "https://practice.geeksforgeeks.org/problems/subarray-with-given-sum/0",
    },
    {
      id: "gfg-2",
      title: "Kadane's Algorithm",
      difficulty: "Medium",
      tags: ["Array", "Dynamic Programming"],
      companies: ["Microsoft", "Amazon", "Google"],
      url: "https://practice.geeksforgeeks.org/problems/kadanes-algorithm/0",
    },
    {
      id: "gfg-3",
      title: "Missing number in array",
      difficulty: "Easy",
      tags: ["Array", "Bit Magic"],
      companies: ["Amazon", "Microsoft", "Adobe"],
      url: "https://practice.geeksforgeeks.org/problems/missing-number-in-array/0",
    },
    {
      id: "gfg-4",
      title: "Merge Sort",
      difficulty: "Medium",
      tags: ["Sorting", "Divide and Conquer"],
      companies: ["Amazon", "Microsoft", "Google"],
      url: "https://practice.geeksforgeeks.org/problems/merge-sort/1",
    },
    {
      id: "gfg-5",
      title: "Detect Loop in linked list",
      difficulty: "Easy",
      tags: ["Linked List", "Two Pointer"],
      companies: ["Amazon", "Microsoft", "Samsung"],
      url: "https://practice.geeksforgeeks.org/problems/detect-loop-in-linked-list/1",
    },
  ];

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Coding Practice Questions</h1>
          <p className="text-muted-foreground">Practice coding questions from popular platforms that are frequently asked in interviews.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search questions..."
              className="w-full pl-8"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amazon">Amazon</SelectItem>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="microsoft">Microsoft</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="apple">Apple</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="leetcode">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
            <TabsTrigger value="codechef">CodeChef</TabsTrigger>
            <TabsTrigger value="gfg">GeeksforGeeks</TabsTrigger>
          </TabsList>
          <TabsContent value="leetcode" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  LeetCode Questions
                </CardTitle>
                <CardDescription>Popular LeetCode questions asked in interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leetcodeQuestions.map((question) => (
                    <div key={question.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium">{question.title}</h3>
                        <Badge className={`${question.difficulty === 'Easy' ? 'bg-green-500' : question.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                          {question.difficulty}
                        </Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {question.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Companies: {question.companies.join(", ")}
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <a href={question.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <ExternalLink className="h-3 w-3" />
                            Solve
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="codechef" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  CodeChef Questions
                </CardTitle>
                <CardDescription>Popular CodeChef questions asked in interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {codechefQuestions.map((question) => (
                    <div key={question.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium">{question.title}</h3>
                        <Badge className={`${question.difficulty === 'Easy' ? 'bg-green-500' : question.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                          {question.difficulty}
                        </Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {question.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Companies: {question.companies.join(", ")}
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <a href={question.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <ExternalLink className="h-3 w-3" />
                            Solve
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="gfg" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  GeeksforGeeks Questions
                </CardTitle>
                <CardDescription>Popular GeeksforGeeks questions asked in interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gfgQuestions.map((question) => (
                    <div key={question.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium">{question.title}</h3>
                        <Badge className={`${question.difficulty === 'Easy' ? 'bg-green-500' : question.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                          {question.difficulty}
                        </Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {question.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          Companies: {question.companies.join(", ")}
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <a href={question.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                            <ExternalLink className="h-3 w-3" />
                            Solve
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Placement Preparation Tips</CardTitle>
            <CardDescription>Tips to help you prepare for coding interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">1. Master Data Structures and Algorithms</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Focus on arrays, linked lists, stacks, queues, trees, graphs, and algorithms like sorting, searching, and dynamic programming.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">2. Practice Regularly</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Solve at least 2-3 problems daily from platforms like LeetCode, CodeChef, and GeeksforGeeks.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">3. Understand Time and Space Complexity</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Learn to analyze and optimize your solutions for better performance.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">4. Mock Interviews</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Practice with peers or use platforms that offer mock interviews to simulate real interview conditions.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">5. Company-Specific Preparation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Research and focus on questions frequently asked by your target companies.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}