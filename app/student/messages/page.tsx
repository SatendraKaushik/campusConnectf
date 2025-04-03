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
      avatar: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
      role: "Senior",
      lastMessage: "Thanks for reaching out!",
      time: "2 min ago",
      unread: 2,
      online: true,
    },
    // ... existing code ...
  ]

  const messages = [
    {
      id: 1,
      sender: "Emma Wilson",
      content: "Hi Alex! How are you doing?",
      time: "10:30 AM",
      isUser: false,
    },
    // ... existing code ...
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
            <div className="h-[calc(100vh-12rem)] overflow-y-auto">
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
            </div>
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
            <div className="flex-1 p-4 overflow-y-auto">
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
            </div>

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