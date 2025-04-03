"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Download, FileText, Laptop, MessageSquare, Search } from "lucide-react"
import Link from "next/link"

export default function PracticePage() {
  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Practice Center</h1>
          <p className="text-muted-foreground">Enhance your skills with resources, coding practice, and interview preparation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                College Resources
              </CardTitle>
              <CardDescription>Access study materials and previous year papers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/student/practice/resources" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Previous Year Papers
                    <Badge className="ml-auto" variant="secondary">25+</Badge>
                  </Button>
                </Link>
                <Link href="/student/practice/resources" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Study Materials
                    <Badge className="ml-auto" variant="secondary">40+</Badge>
                  </Button>
                </Link>
                <Link href="/student/practice/resources" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Lecture Notes
                    <Badge className="ml-auto" variant="secondary">30+</Badge>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Coding Questions
              </CardTitle>
              <CardDescription>Practice questions from popular platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/student/practice/coding" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Laptop className="mr-2 h-4 w-4" />
                    LeetCode
                    <Badge className="ml-auto" variant="secondary">100+</Badge>
                  </Button>
                </Link>
                <Link href="/student/practice/coding" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Laptop className="mr-2 h-4 w-4" />
                    CodeChef
                    <Badge className="ml-auto" variant="secondary">80+</Badge>
                  </Button>
                </Link>
                <Link href="/student/practice/coding" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Laptop className="mr-2 h-4 w-4" />
                    GeeksforGeeks
                    <Badge className="ml-auto" variant="secondary">120+</Badge>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Interview Practice
              </CardTitle>
              <CardDescription>Prepare for interviews with AI assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/student/practice/interview" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Technical Interview
                  </Button>
                </Link>
                <Link href="/student/practice/interview" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    HR Interview
                  </Button>
                </Link>
                <Link href="/student/practice/interview" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Mock Interviews
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Practice Questions</CardTitle>
              <CardDescription>Practice questions organized by subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="dbms">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="dbms">DBMS</TabsTrigger>
                  <TabsTrigger value="os">OS</TabsTrigger>
                  <TabsTrigger value="dsa">DSA</TabsTrigger>
                  <TabsTrigger value="cn">Computer Networks</TabsTrigger>
                  <TabsTrigger value="oops">OOPS</TabsTrigger>
                </TabsList>
                <TabsContent value="dbms" className="mt-6">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What is normalization in DBMS?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Explain the concept of normalization and its different forms (1NF, 2NF, 3NF, BCNF).
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain ACID properties in DBMS.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe Atomicity, Consistency, Isolation, and Durability with examples.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What is the difference between primary key and foreign key?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Explain the concepts with examples and their importance in database design.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="os" className="mt-6">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain process scheduling algorithms.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe FCFS, SJF, Round Robin, Priority scheduling with examples and comparisons.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What is deadlock? How can it be prevented?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Explain deadlock conditions, detection, prevention, and avoidance techniques.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain virtual memory and paging.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe the concept of virtual memory, paging, and page replacement algorithms.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="dsa" className="mt-6">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain time and space complexity analysis.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe Big O, Big Omega, and Big Theta notations with examples.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Compare different sorting algorithms.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Explain Bubble Sort, Merge Sort, Quick Sort, and Heap Sort with their complexities.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain graph traversal algorithms.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe BFS and DFS with their applications and implementations.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="cn" className="mt-6">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain OSI model layers.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe all seven layers of the OSI model with their functions and protocols.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What is the difference between TCP and UDP?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Compare TCP and UDP protocols with their features, advantages, and use cases.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain IP addressing and subnetting.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe IPv4, IPv6, CIDR notation, and subnet mask calculations.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="oops" className="mt-6">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain the four pillars of OOP.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe Encapsulation, Inheritance, Polymorphism, and Abstraction with examples.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What is the difference between overloading and overriding?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Compare method overloading and method overriding with examples in different programming languages.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain abstract classes and interfaces.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe the concepts with their differences and use cases in object-oriented design.
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button size="sm" variant="outline">View Answer</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}