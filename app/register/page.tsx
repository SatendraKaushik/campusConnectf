"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [userType, setUserType] = useState("student")
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i)
  const futureYears = Array.from({ length: 6 }, (_, i) => currentYear + i)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate and submit the form data to your backend
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="bg-primary rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-foreground"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-primary">Campus Connect</h1>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Join Campus Connect to connect with your college community</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" onValueChange={setUserType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="admin">College Admin</TabsTrigger>
              </TabsList>

              {userType === "student" && (
                <form onSubmit={handleRegister}>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Select defaultValue="cs">
                        <SelectTrigger id="branch">
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="it">Information Technology</SelectItem>
                          <SelectItem value="ec">Electronics & Communication</SelectItem>
                          <SelectItem value="ee">Electrical Engineering</SelectItem>
                          <SelectItem value="me">Mechanical Engineering</SelectItem>
                          <SelectItem value="ce">Civil Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="joining-year">Joining Year</Label>
                        <Select defaultValue={currentYear.toString()}>
                          <SelectTrigger id="joining-year">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passing-year">Passing Year</Label>
                        <Select defaultValue={(currentYear + 4).toString()}>
                          <SelectTrigger id="passing-year">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {futureYears.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>User Type</Label>
                      <RadioGroup defaultValue="student" className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="student" id="student-type" />
                          <Label htmlFor="student-type">Current Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="senior" id="senior-type" />
                          <Label htmlFor="senior-type">Senior/Alumni</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full">
                      Create Student Account
                    </Button>
                  </div>
                </form>
              )}

              {userType === "admin" && (
                <form onSubmit={handleRegister}>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="college-name">College Name</Label>
                      <Input id="college-name" placeholder="Example University" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-name">Admin Name</Label>
                      <Input id="admin-name" placeholder="Admin Full Name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-position">Position</Label>
                      <Input id="admin-position" placeholder="e.g. Dean, Registrar, IT Admin" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Official Email</Label>
                      <Input id="admin-email" type="email" placeholder="admin@college.edu" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-phone">Contact Number</Label>
                      <Input id="admin-phone" type="tel" placeholder="+1 (123) 456-7890" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="college-website">College Website</Label>
                      <Input id="college-website" type="url" placeholder="https://www.college.edu" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="college-address">College Address</Label>
                      <Input id="college-address" placeholder="123 Education St, City, State" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input id="admin-password" type="password" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-confirm-password">Confirm Password</Label>
                      <Input id="admin-confirm-password" type="password" required />
                    </div>

                    <Button type="submit" className="w-full">
                      Create Admin Account
                    </Button>
                  </div>
                </form>
              )}
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </div>
            <div className="text-center text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

