"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Phone, Video, Info } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function MessagesPage() {
  // Hardcoded data for demonstration
  const contacts = [
    {
      id: 1,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Senior",
      lastMessage: "Thanks for reaching out!",
      time: "2 min ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Prof. Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Faculty",
      lastMessage: "Let me know if you have any questions about the assignment.",
      time: "1 hour ago",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "James Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Senior",
      lastMessage: "I'll send you the resources for the ML project.",
      time: "Yesterday",
      unread: 0,
      online: true,
    },
    {
      id: 4,
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Senior",
      lastMessage: "Let's catch up tomorrow after class.",
      time: "2 days ago",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: "Sophia Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Senior",
      lastMessage: "Here's the link to the study group.",
      time: "3 days ago",
      unread: 0,
      online: true,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Emma Wilson",
      content: "Hi Alex! How are you doing?",
      time: "10:30 AM",
      isUser: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Hey Emma! I'm doing well, thanks for asking. How about you?",
      time: "10:32 AM",
      isUser: true,
    },
    {
      id: 3,
      sender: "Emma Wilson",
      content: "I'm good too! I saw that you're working on a web development project. How's it going?",
      time: "10:35 AM",
      isUser: false,
    },
    {
      id: 4,
      sender: "You",
      content:
        "It's going well! I'm using React and Next.js for the frontend. But I'm having some issues with the API integration.",
      time: "10:38 AM",
      isUser: true,
    },
    {
      id: 5,
      sender: "Emma Wilson",
      content:
        "I've worked with those technologies before. Maybe I can help you out. What specific issues are you facing?",
      time: "10:40 AM",
      isUser: false,
    },
    {
      id: 6,
      sender: "You",
      content:
        "That would be great! I'm struggling with handling authentication tokens and making secure API calls. Do you have any experience with that?",
      time: "10:42 AM",
      isUser: true,
    },
    {
      id: 7,
      sender: "Emma Wilson",
      content:
        "Yes, I've implemented authentication flows using JWT before. I can share some code examples and resources that might help you.",
      time: "10:45 AM",
      isUser: false,
    },
    {
      id: 8,
      sender: "Emma Wilson",
      content:
        "Are you free for a quick call tomorrow? I think it would be easier to explain some concepts over a call rather than text.",
      time: "10:46 AM",
      isUser: false,
    },
    {
      id: 9,
      sender: "You",
      content: "That sounds perfect! I'm free tomorrow after 3 PM. Would that work for you?",
      time: "10:48 AM",
      isUser: true,
    },
    {
      id: 10,
      sender: "Emma Wilson",
      content: "3:30 PM works for me. I'll send you a meeting link tomorrow.",
      time: "10:50 AM",
      isUser: false,
    },
    {
      id: 11,
      sender: "You",
      content: "Great! Looking forward to it. Thanks for your help, Emma!",
      time: "10:52 AM",
      isUser: true,
    },
    {
      id: 12,
      sender: "Emma Wilson",
      content: "No problem at all! Happy to help. See you tomorrow!",
      time: "10:55 AM",
      isUser: false,
    },
  ]

  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    // In a real app, you would send the message to the server here
    // For demo purposes, we'll just clear the input
    setNewMessage("")
  }

  return (
    <DashboardLayout userType="student">
      <div className="h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-0 rounded-lg overflow-hidden border">
          {/* Contacts List */}
          <div className="md:col-span-1 border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search messages..." className="pl-8" />
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="divide-y">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 cursor-pointer hover:bg-muted transition-colors ${
                      selectedContact.id === contact.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{contact.name}</p>
                          <p className="text-xs text-muted-foreground">{contact.time}</p>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                          {contact.unread > 0 && <Badge className="ml-2">{contact.unread}</Badge>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                  <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{selectedContact.name}</p>
                    <Badge variant="outline">{selectedContact.role}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{selectedContact.online ? "Online" : "Offline"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                  <span className="sr-only">Call</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                  <span className="sr-only">Video Call</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Info</span>
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="text-center">
                  <Badge variant="outline" className="text-xs">
                    Today
                  </Badge>
                </div>
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.isUser ? "flex-row-reverse" : ""}`}>
                      {!message.isUser && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                          <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`rounded-lg p-3 ${
                            message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-right">{message.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

