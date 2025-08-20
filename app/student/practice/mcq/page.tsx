"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SubjectMCQ from "./_components/SubjectMCQ"

export default function MCQPracticePage() {
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined)

  // Define subjects and their topics
  const subjects = {
    dbms: {
      name: "DBMS",
      topics: ["SQL", "Normalization", "Transactions", "Indexing", "ER Model"]
    },
    os: {
      name: "Operating Systems",
      topics: ["Process Management", "Memory Management", "File Systems", "Deadlocks", "Scheduling Algorithms"]
    },
    dsa: {
      name: "Data Structures & Algorithms",
      topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming", "Sorting Algorithms"]
    },
    cn: {
      name: "Computer Networks",
      topics: ["OSI Model", "TCP/IP", "Routing", "Network Security", "Subnetting"]
    },
    oops: {
      name: "Object-Oriented Programming",
      topics: ["Classes & Objects", "Inheritance", "Polymorphism", "Encapsulation", "Abstraction"]
    },
    aptitude: {
      name: "Aptitude",
      topics: ["Quantitative", "Logical Reasoning", "Verbal", "Data Interpretation"]
    }
  }

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">MCQ Practice Questions</h1>
          <p className="text-muted-foreground">Test your knowledge with subject-wise multiple choice questions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subject-wise MCQ Practice</CardTitle>
            <CardDescription>Select a subject and topic to practice MCQ questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="dbms">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="dbms">DBMS</TabsTrigger>
                <TabsTrigger value="os">OS</TabsTrigger>
                <TabsTrigger value="dsa">DSA</TabsTrigger>
                <TabsTrigger value="cn">Computer Networks</TabsTrigger>
                <TabsTrigger value="oops">OOPS</TabsTrigger>
                <TabsTrigger value="aptitude">Aptitude</TabsTrigger>
              </TabsList>

              {Object.entries(subjects).map(([key, subject]) => (
                <TabsContent key={key} value={key} className="mt-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-6">
                      <Select onValueChange={(value) => setSelectedTopic(value === "all" ? undefined : value)}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Select a topic (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Topics</SelectItem>
                          {subject.topics.map((topic) => (
                            <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedTopic(undefined)}
                      >
                        Reset Topic
                      </Button>
                    </div>
                    <SubjectMCQ subject={subject.name} topic={selectedTopic} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>MCQ Practice Tips</CardTitle>
            <CardDescription>How to get the most out of your practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">1. Regular Practice</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Set aside time each day to practice MCQs. Consistent practice is key to mastering concepts.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">2. Understand Explanations</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Don't just memorize answers. Take time to understand the explanations for both correct and incorrect options.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">3. Track Your Progress</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep track of your scores and revisit topics where you score less than 70%.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">4. Mix Topics</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  After mastering individual topics, practice with mixed topics to simulate real exam conditions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}