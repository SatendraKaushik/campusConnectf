"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, Code, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CompanyQuestions from "../_components/CompanyQuestions"

export default function CompanyQuestionsPage() {
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>(undefined)
  const [selectedPlatform, setSelectedPlatform] = useState<string | undefined>(undefined)

  // Define top companies for tech interviews
  const topCompanies = [
    "Google",
    "Amazon",
    "Microsoft",
    "Facebook",
    "Apple",
    "Netflix",
    "Adobe",
    "Uber",
    "LinkedIn",
    "Twitter"
  ]

  // Define coding platforms
  const platforms = [
    "LeetCode",
    "CodeChef",
    "GeeksforGeeks",
    "HackerRank"
  ]

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Company-wise Coding Questions</h1>
          <p className="text-muted-foreground">Practice coding questions frequently asked in technical interviews at top companies</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter Questions</CardTitle>
            <CardDescription>Select a company and/or platform to view specific questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <Select onValueChange={(value) => setSelectedCompany(value === "all" ? undefined : value)}>
                <SelectTrigger className="w-full md:w-[280px]">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {topCompanies.map((company) => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select onValueChange={(value) => setSelectedPlatform(value === "all" ? undefined : value)}>
                <SelectTrigger className="w-full md:w-[280px]">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  {platforms.map((platform) => (
                    <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCompany(undefined)
                  setSelectedPlatform(undefined)
                }}
              >
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <CompanyQuestions company={selectedCompany} platform={selectedPlatform} />

        <Card>
          <CardHeader>
            <CardTitle>Top Companies</CardTitle>
            <CardDescription>Quick access to questions from top tech companies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {topCompanies.map((company) => (
                <Button 
                  key={company} 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col gap-2"
                  onClick={() => setSelectedCompany(company)}
                >
                  <Building className="h-6 w-6 text-primary" />
                  <span>{company}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coding Platforms</CardTitle>
            <CardDescription>Filter questions by coding platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {platforms.map((platform) => (
                <Button 
                  key={platform} 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col gap-2"
                  onClick={() => setSelectedPlatform(platform)}
                >
                  <Code className="h-6 w-6 text-primary" />
                  <span>{platform}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Practice Tips</CardTitle>
            <CardDescription>How to effectively practice coding questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Understand the Problem First</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Before diving into coding, make sure you fully understand the problem. Identify the inputs, outputs, constraints, and edge cases.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Think Before You Code</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Spend time thinking about different approaches and their time/space complexity. Choose the most efficient solution.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Practice Consistently</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Regular practice is key. Try to solve at least one problem daily, focusing on different data structures and algorithms.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Review and Learn</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  After solving a problem, review other solutions to learn different approaches and optimizations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}