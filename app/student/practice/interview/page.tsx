"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, User, Video } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"

export default function InterviewPracticePage() {
  const [activeTab, setActiveTab] = useState("technical")
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      content: "Hello! I'm your AI interview assistant. I'll be asking you some common technical interview questions. Let's start with a simple one: Can you explain the difference between a stack and a queue?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: 2,
      role: "user",
      content: "A stack is a LIFO (Last In First Out) data structure where elements are added and removed from the same end, while a queue is a FIFO (First In First Out) data structure where elements are added at one end and removed from the other end.",
      timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    },
    {
      id: 3,
      role: "ai",
      content: "Great explanation! Now, can you give me a real-world example where you would use a stack and another where you would use a queue?",
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newUserMessage])
    setInputValue("")

    // Simulate AI response based on the interview type
    setTimeout(() => {
      let aiResponse = ""

      if (activeTab === "technical") {
        aiResponse = "That's a good point. Let's move on to another technical question: Can you explain how a hash table works and what are some common collision resolution strategies?"
      } else if (activeTab === "hr") {
        aiResponse = "Thank you for sharing that. Now, tell me about a time when you had to work with a difficult team member. How did you handle the situation?"
      } else {
        aiResponse = "Great answer! Now, imagine you're working on a project with tight deadlines. How do you prioritize your tasks and ensure timely delivery?"
      }

      const newAiMessage = {
        id: messages.length + 2,
        role: "ai",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      }

      setMessages((prevMessages) => [...prevMessages, newAiMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Hardcoded interview questions for each category
  const technicalQuestions = [
    "What is the time complexity of binary search?",
    "Explain the concept of recursion with an example.",
    "What is the difference between process and thread?",
    "Explain the concept of normalization in DBMS.",
    "What are the ACID properties in database systems?",
  ]

  const hrQuestions = [
    "Tell me about yourself.",
    "Why do you want to work for our company?",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
    "Describe a challenging situation you faced and how you resolved it.",
  ]

  const mockInterviewQuestions = [
    "How would you design a URL shortening service?",
    "Explain your approach to debugging a complex issue.",
    "How do you stay updated with the latest technologies?",
    "Describe a project where you had to learn a new technology quickly.",
    "How do you handle feedback and criticism?",
  ]

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Interview Practice</h1>
          <p className="text-muted-foreground">Practice your interview skills with our AI assistant.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Interview Types</CardTitle>
              <CardDescription>Select the type of interview you want to practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant={activeTab === "technical" ? "default" : "outline"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("technical")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Technical Interview
                </Button>
                <Button 
                  variant={activeTab === "hr" ? "default" : "outline"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("hr")}
                >
                  <User className="mr-2 h-4 w-4" />
                  HR Interview
                </Button>
                <Button 
                  variant={activeTab === "mock" ? "default" : "outline"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("mock")}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Mock Interview
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Sample Questions</h3>
                <div className="space-y-2">
                  {activeTab === "technical" && technicalQuestions.map((question, index) => (
                    <div key={index} className="text-sm p-2 rounded-md bg-muted">
                      {question}
                    </div>
                  ))}
                  {activeTab === "hr" && hrQuestions.map((question, index) => (
                    <div key={index} className="text-sm p-2 rounded-md bg-muted">
                      {question}
                    </div>
                  ))}
                  {activeTab === "mock" && mockInterviewQuestions.map((question, index) => (
                    <div key={index} className="text-sm p-2 rounded-md bg-muted">
                      {question}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>
                {activeTab === "technical" ? "Technical Interview Practice" : 
                 activeTab === "hr" ? "HR Interview Practice" : "Mock Interview Practice"}
              </CardTitle>
              <CardDescription>
                {activeTab === "technical" ? "Practice answering technical questions" : 
                 activeTab === "hr" ? "Practice answering HR and behavioral questions" : 
                 "Practice a full interview simulation"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col h-[500px]">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4 mb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                          <Avatar className="h-8 w-8">
                            {message.role === "ai" ? (
                              <AvatarImage src="/placeholder.svg" alt="AI" />
                            ) : (
                              <AvatarImage src="/placeholder-user.jpg" alt="You" />
                            )}
                            <AvatarFallback>
                              {message.role === "ai" ? "AI" : "You"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div
                              className={`rounded-lg p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                            >
                              <p>{message.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-4 flex items-center gap-2">
                  <Input
                    placeholder="Type your response..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Interview Tips</CardTitle>
            <CardDescription>Helpful tips to ace your interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Technical Interviews</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Practice coding problems regularly on platforms like LeetCode</li>
                  <li>• Understand time and space complexity analysis</li>
                  <li>• Think out loud during problem-solving</li>
                  <li>• Review fundamental concepts in your domain</li>
                  <li>• Prepare examples of your past technical projects</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">HR Interviews</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Research the company thoroughly</li>
                  <li>• Prepare your elevator pitch</li>
                  <li>• Use the STAR method for behavioral questions</li>
                  <li>• Have questions ready for the interviewer</li>
                  <li>• Follow up with a thank-you email</li>
                </ul>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">General Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Dress professionally</li>
                  <li>• Arrive early or set up your virtual space</li>
                  <li>• Maintain good body language</li>
                  <li>• Be honest and authentic</li>
                  <li>• Practice with mock interviews</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}