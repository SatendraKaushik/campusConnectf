"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Download, FileText, Laptop, MessageSquare, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PracticePage() {
  const [visibleAnswers, setVisibleAnswers] = useState<{ [key: string]: boolean }>({});

  const toggleAnswer = (questionId: string) => {
    setVisibleAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getAnswer = (questionId: string) => {
    const answers: { [key: string]: string } = {
      'dbms-normalization': 'Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. The different forms are:\n1NF: Eliminates repeating groups\n2NF: Eliminates partial dependencies\n3NF: Eliminates transitive dependencies\nBCNF: A stronger version of 3NF',
      'dbms-acid': 'ACID properties ensure reliable database transactions:\n- Atomicity: All-or-nothing execution\n- Consistency: Database remains in valid state\n- Isolation: Concurrent transactions don\'t interfere\n- Durability: Committed changes are permanent',
      'dbms-keys': 'Primary Key: Unique identifier for a record in a table\nForeign Key: References primary key of another table to maintain referential integrity',
      'os-scheduling': 'Process scheduling algorithms:\n- FCFS: First Come First Serve\n- SJF: Shortest Job First\n- Round Robin: Time-sliced execution\n- Priority: Based on process priority',
      'os-deadlock': 'Deadlock occurs when processes wait for resources held by each other. Prevention methods:\n- Resource ordering\n- Hold and wait prevention\n- No preemption\n- Mutual exclusion elimination',
      'os-virtual-memory': 'Virtual memory allows programs to use more memory than physically available. Paging divides memory into fixed-size blocks called pages.',
      'dsa-complexity': 'Time complexity measures execution time growth rate:\n- O(1): Constant time\n- O(n): Linear time\n- O(log n): Logarithmic time\n- O(n²): Quadratic time',
      'dsa-sorting': 'Sorting algorithms comparison:\n- Bubble Sort: O(n²)\n- Merge Sort: O(n log n)\n- Quick Sort: O(n log n) average\n- Heap Sort: O(n log n)',
      'dsa-graph': 'Graph traversal algorithms:\n- BFS: Level-by-level traversal\n- DFS: Depth-first exploration',
      'cn-osi': 'OSI Model Layers:\n1. Physical\n2. Data Link\n3. Network\n4. Transport\n5. Session\n6. Presentation\n7. Application',
      'cn-tcp-udp': 'TCP vs UDP:\nTCP: Connection-oriented, reliable, ordered\nUDP: Connectionless, faster, no guarantee',
      'cn-ip': 'IP addressing:\n- IPv4: 32-bit addresses\n- IPv6: 128-bit addresses\n- Subnetting: Divides networks into smaller parts',
      'oops-pillars': 'OOP Pillars:\n1. Encapsulation: Data hiding\n2. Inheritance: Code reuse\n3. Polymorphism: Multiple forms\n4. Abstraction: Hide complexity',
      'oops-overloading': 'Overloading: Same method name, different parameters\nOverriding: Same method signature in child class',
      'oops-abstract': 'Abstract Class: Can have both abstract and concrete methods\nInterface: Only abstract methods',
      'aptitude-time-work': 'Answer: 9 days\nSolution: (6 × 12) ÷ 8 = 9',
      'aptitude-sequence': 'Answer: 30\nPattern: n² + n',
      'aptitude-analogies': 'Answer: (c) Eating\nBook is used for reading, Fork is used for eating'
    };
    return answers[questionId] || 'Answer not available';
  };

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
                    Platform-wise Questions
                    <Badge className="ml-auto" variant="secondary">300+</Badge>
                  </Button>
                </Link>
                <Link href="/student/practice/coding/company" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Laptop className="mr-2 h-4 w-4" />
                    Company-wise Questions
                    <Badge className="ml-auto" variant="secondary">200+</Badge>
                  </Button>
                </Link>
                <Link href="/student/practice/coding" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Laptop className="mr-2 h-4 w-4" />
                    Popular DSA Problems
                    <Badge className="ml-auto" variant="secondary">150+</Badge>
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Subject-wise Practice Questions</CardTitle>
                <CardDescription>Practice questions organized by subjects</CardDescription>
              </div>
              <Link href="/student/practice/mcq">
                <Button variant="default">
                  Practice MCQs
                </Button>
              </Link>
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
                <TabsContent value="dbms" className="mt-6">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What is normalization in DBMS?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Explain the concept of normalization and its different forms (1NF, 2NF, 3NF, BCNF).
                      </p>
                      {visibleAnswers['dbms-normalization'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('dbms-normalization')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('dbms-normalization')}
                        >
                          {visibleAnswers['dbms-normalization'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain ACID properties in DBMS.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe Atomicity, Consistency, Isolation, and Durability with examples.
                      </p>
                      {visibleAnswers['dbms-acid'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('dbms-acid')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('dbms-acid')}
                        >
                          {visibleAnswers['dbms-acid'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What is the difference between primary key and foreign key?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Explain the concepts with examples and their importance in database design.
                      </p>
                      {visibleAnswers['dbms-keys'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('dbms-keys')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('dbms-keys')}
                        >
                          {visibleAnswers['dbms-keys'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
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
                      {visibleAnswers['os-scheduling'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('os-scheduling')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('os-scheduling')}
                        >
                          {visibleAnswers['os-scheduling'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What is deadlock? How can it be prevented?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Explain deadlock conditions, detection, prevention, and avoidance techniques.
                      </p>
                      {visibleAnswers['os-deadlock'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('os-deadlock')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('os-deadlock')}
                        >
                          {visibleAnswers['os-deadlock'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain virtual memory and paging.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe the concept of virtual memory, paging, and page replacement algorithms.
                      </p>
                      {visibleAnswers['os-virtual-memory'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('os-virtual-memory')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('os-virtual-memory')}
                        >
                          {visibleAnswers['os-virtual-memory'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
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
                      {visibleAnswers['dsa-complexity'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('dsa-complexity')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('dsa-complexity')}
                        >
                          {visibleAnswers['dsa-complexity'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Compare different sorting algorithms.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Explain Bubble Sort, Merge Sort, Quick Sort, and Heap Sort with their complexities.
                      </p>
                      {visibleAnswers['dsa-sorting'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('dsa-sorting')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('dsa-sorting')}
                        >
                          {visibleAnswers['dsa-sorting'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain graph traversal algorithms.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe BFS and DFS with their applications and implementations.
                      </p>
                      {visibleAnswers['dsa-graph'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('dsa-graph')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('dsa-graph')}
                        >
                          {visibleAnswers['dsa-graph'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
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
                      {visibleAnswers['cn-osi'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('cn-osi')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('cn-osi')}
                        >
                          {visibleAnswers['cn-osi'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What is the difference between TCP and UDP?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Compare TCP and UDP protocols with their features, advantages, and use cases.
                      </p>
                      {visibleAnswers['cn-tcp-udp'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('cn-tcp-udp')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('cn-tcp-udp')}
                        >
                          {visibleAnswers['cn-tcp-udp'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain IP addressing and subnetting.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe IPv4, IPv6, CIDR notation, and subnet mask calculations.
                      </p>
                      {visibleAnswers['cn-ip'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('cn-ip')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('cn-ip')}
                        >
                          {visibleAnswers['cn-ip'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
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
                      {visibleAnswers['oops-pillars'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('oops-pillars')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('oops-pillars')}
                        >
                          {visibleAnswers['oops-pillars'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What is the difference between overloading and overriding?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Compare method overloading and method overriding with examples in different programming languages.
                      </p>
                      {visibleAnswers['oops-overloading'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('oops-overloading')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('oops-overloading')}
                        >
                          {visibleAnswers['oops-overloading'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Explain abstract classes and interfaces.</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Describe the concepts with their differences and use cases in object-oriented design.
                      </p>
                      {visibleAnswers['oops-abstract'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('oops-abstract')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Frequently Asked</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('oops-abstract')}
                        >
                          {visibleAnswers['oops-abstract'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="aptitude" className="mt-6">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Time and Work Problems</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        If 6 men can do a piece of work in 12 days, in how many days can 8 men do the same work?
                      </p>
                      {visibleAnswers['aptitude-time-work'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('aptitude-time-work')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Numerical Ability</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('aptitude-time-work')}
                        >
                          {visibleAnswers['aptitude-time-work'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Logical Sequence</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Find the next number in the sequence: 2, 6, 12, 20, ?
                      </p>
                      {visibleAnswers['aptitude-sequence'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('aptitude-sequence')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Logical Reasoning</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('aptitude-sequence')}
                        >
                          {visibleAnswers['aptitude-sequence'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Verbal Analogies</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Book is to Reading as Fork is to: (a) Drawing (b) Writing (c) Eating (d) Speaking
                      </p>
                      {visibleAnswers['aptitude-analogies'] && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                          <p className="text-sm whitespace-pre-line">{getAnswer('aptitude-analogies')}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        <Badge>Verbal Ability</Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAnswer('aptitude-analogies')}
                        >
                          {visibleAnswers['aptitude-analogies'] ? 'Hide Answer' : 'View Answer'}
                        </Button>
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