"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Axios from "@/utils/Axios"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff } from "lucide-react"

// Set fixed default years to ensure server/client consistency
const DEFAULT_CURRENT_YEAR = 2025
const DEFAULT_PAST_YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016]
const DEFAULT_FUTURE_YEARS = [2025, 2026, 2027, 2028, 2029, 2030]

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userType, setUserType] = useState("student")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showFacultyPassword, setShowFacultyPassword] = useState(false)
  const [showFacultyConfirmPassword, setShowFacultyConfirmPassword] = useState(false)
  
  // Use static default years for hydration consistency
  const [years, setYears] = useState(DEFAULT_PAST_YEARS)
  const [futureYears, setFutureYears] = useState(DEFAULT_FUTURE_YEARS)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    branch: "cs",
    joiningYear: DEFAULT_CURRENT_YEAR.toString(), // Use string for consistency
    passingYear: (DEFAULT_CURRENT_YEAR + 4).toString(), // Use string for consistency
    userType: "student",
    collegeId: "",
    rollNumber: "", 
    facultyId: "",
    name: "",
    department: "cs",
    position: "",
    phone: "",
    facultyEmail: "",
    facultyPassword: "",
    facultyConfirmPassword: ""
  })

  // Update date-dependent values only after initial render
  useEffect(() => {
    // Safe to access browser APIs after component mounts
    const actualCurrentYear = new Date().getFullYear()
    
    // Only update if different from our default
    if (actualCurrentYear !== DEFAULT_CURRENT_YEAR) {
      // Generate updated year arrays
      const pastYears = Array.from({ length: 10 }, (_, i) => actualCurrentYear - i)
      const nextYears = Array.from({ length: 6 }, (_, i) => actualCurrentYear + i)
      
      // Update state with new arrays
      setYears(pastYears)
      setFutureYears(nextYears)
      
      // Only update form defaults if they match the original defaults
      if (formData.joiningYear === DEFAULT_CURRENT_YEAR.toString()) {
        setFormData(prev => ({
          ...prev,
          joiningYear: actualCurrentYear.toString()
        }))
      }
      
      if (formData.passingYear === (DEFAULT_CURRENT_YEAR + 4).toString()) {
        setFormData(prev => ({
          ...prev,
          passingYear: (actualCurrentYear + 4).toString()
        }))
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, userType: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (userType === "admin") {
        if (formData.facultyPassword !== formData.facultyConfirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please ensure both passwords match",
            variant: "destructive"
          })
          setIsLoading(false)
          return
        }
        
        const response = await Axios.post('/auth/faculty-register', {
          facultyId: formData.facultyId,
          name: formData.name,
          email: formData.facultyEmail,
          password: formData.facultyPassword,
          department: formData.department,
          position: formData.position,
          phone: formData.phone,
          collegeId: formData.collegeId
        })
        
        if (response.status === 201) {
          toast({
            title: "Registration successful",
            description: "Your faculty account has been created. Please login.",
          })
          router.push("/login")
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please ensure both passwords match",
            variant: "destructive"
          })
          setIsLoading(false)
          return
        }
        
      
      
          const response = await Axios.post('/auth/student-register', {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            collegeId: formData.collegeId,
            password: formData.password,
            branch: formData.branch,
            joiningYear: formData.joiningYear,
            passingYear: formData.passingYear,
            userType: formData.userType,
            rollNumber: formData.rollNumber
          })
          
          if (response.status === 201) {
            toast({
              title: "Registration successful",
              description: "Your student account has been created. Please login.",
            })
            router.push("/login")
          }
        
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: error.response?.data?.error || "There was an error during registration. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
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
                <TabsTrigger value="admin">Faculty</TabsTrigger>
              </TabsList>

              {userType === "student" && (
                <form onSubmit={handleRegister}>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="John" 
                          value={formData.firstName}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Doe" 
                          value={formData.lastName}
                          onChange={handleChange}
                          required 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john.doe@example.com" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="collegeId">College ID</Label>
                      <Input 
                        id="collegeId" 
                        placeholder="Enter your college's unique ID" 
                        value={formData.collegeId}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input 
                        id="rollNumber" 
                        placeholder="Enter your roll number" 
                        value={formData.rollNumber}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          required 
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input 
                          id="confirmPassword" 
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required 
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Select 
                        defaultValue={formData.branch}
                        onValueChange={(value) => handleSelectChange("branch", value)}
                      >
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
                        <Label htmlFor="joiningYear">Joining Year</Label>
                        <Select 
                          value={formData.joiningYear}
                          onValueChange={(value) => handleSelectChange("joiningYear", value)}
                        >
                          <SelectTrigger id="joiningYear">
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
                        <Label htmlFor="passingYear">Passing Year</Label>
                        <Select 
                          value={formData.passingYear}
                          onValueChange={(value) => handleSelectChange("passingYear", value)}
                        >
                          <SelectTrigger id="passingYear">
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
                      <RadioGroup 
                        value={formData.userType} 
                        className="flex space-x-4"
                        onValueChange={handleRadioChange}
                      >
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

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Student Account"}
                    </Button>
                  </div>
                </form>
              )}

              {userType === "admin" && (
                <form onSubmit={handleRegister}>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="facultyId">Faculty ID</Label>
                      <Input 
                        id="facultyId" 
                        placeholder="Enter your faculty ID" 
                        value={formData.facultyId}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Enter your full name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="collegeId">College ID</Label>
                      <Input 
                        id="collegeId" 
                        placeholder="Enter your college ID" 
                        value={formData.collegeId}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input 
                        id="position" 
                        placeholder="e.g. Dean, Registrar, IT Admin" 
                        value={formData.position}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select 
                        defaultValue={formData.department}
                        onValueChange={(value) => handleSelectChange("department", value)}
                      >
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
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

                    <div className="space-y-2">
                      <Label htmlFor="facultyEmail">Email</Label>
                      <Input 
                        id="facultyEmail" 
                        type="email" 
                        placeholder="faculty@college.edu" 
                        value={formData.facultyEmail}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Contact Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+1 (123) 456-7890" 
                        value={formData.phone}
                        onChange={handleChange}
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facultyPassword">Password</Label>
                      <div className="relative">
                        <Input 
                          id="facultyPassword" 
                          type={showFacultyPassword ? "text" : "password"}
                          value={formData.facultyPassword}
                          onChange={handleChange}
                          required 
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowFacultyPassword(!showFacultyPassword)}
                        >
                          {showFacultyPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facultyConfirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input 
                          id="facultyConfirmPassword" 
                          type={showFacultyConfirmPassword ? "text" : "password"}
                          value={formData.facultyConfirmPassword}
                          onChange={handleChange}
                          required 
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowFacultyConfirmPassword(!showFacultyConfirmPassword)}
                        >
                          {showFacultyConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Faculty Account"}
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