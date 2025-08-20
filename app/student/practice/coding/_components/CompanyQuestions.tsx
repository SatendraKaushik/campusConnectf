"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Code, ExternalLink, Tag, Building } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { chatSession } from "@/utils/GeminiAImodel"

type CodingQuestion = {
  id: string
  title: string
  difficulty: string
  tags: string[]
  companies: string[]
  platform: string
  url: string
}

type CompanyQuestionsProps = {
  company?: string
  platform?: string
}

export default function CompanyQuestions({ company, platform }: CompanyQuestionsProps) {
  const [questions, setQuestions] = useState<CodingQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [platformFilter, setPlatformFilter] = useState<string>(platform || 'all')
  const [companyFilter, setCompanyFilter] = useState<string>(company || 'all')

  useEffect(() => {
    generateQuestions()
  }, [company, platform])

  const generateQuestions = async () => {
    setLoading(true)
    setError(null)
    setQuestions([])

    try {
      // Create a prompt for Gemini AI to generate coding questions
      const prompt = `Generate 10 coding questions that are frequently asked in technical interviews${company ? ` at ${company}` : ""}${platform ? ` on ${platform}` : ""}.
      
      Format your response as a valid JSON array with the following structure for each question:
      {
        "id": "unique-id",
        "title": "The question title",
        "difficulty": "Easy|Medium|Hard",
        "tags": ["Array", "String", "Dynamic Programming", etc.],
        "companies": ["Google", "Amazon", "Microsoft", etc.],
        "platform": "LeetCode|CodeChef|GeeksforGeeks|HackerRank",
        "url": "The URL to the question on the platform"
      }
      
      Make sure to include a variety of questions with different difficulty levels and topics. For each question, provide a realistic URL to the actual problem on the specified platform.`

      const result = await chatSession.sendMessage(prompt)
      const responseText = await result.response.text()

      // Extract JSON from the response
      const jsonMatch = responseText.match(/\[\s*\{.*\}\s*\]/s)
      if (!jsonMatch) {
        throw new Error("Could not extract valid JSON from the response")
      }

      const parsedQuestions = JSON.parse(jsonMatch[0])
      
      if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
        throw new Error("Invalid question format received")
      }

      setQuestions(parsedQuestions)
    } catch (err: any) {
      console.error("Error generating questions:", err)
      setError("Failed to generate questions. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Filter questions based on search term, difficulty, platform, and company
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = searchTerm === '' || 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesDifficulty = difficultyFilter === 'all' || 
      question.difficulty.toLowerCase() === difficultyFilter.toLowerCase()
    
    const matchesPlatform = platformFilter === 'all' || 
      question.platform.toLowerCase() === platformFilter.toLowerCase()
    
    const matchesCompany = companyFilter === 'all' || 
      question.companies.some(comp => comp.toLowerCase() === companyFilter.toLowerCase())
    
    return matchesSearch && matchesDifficulty && matchesPlatform && matchesCompany
  })

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading Questions</CardTitle>
          <CardDescription>Generating coding questions{company ? ` for ${company}` : ""}{platform ? ` on ${platform}` : ""}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-center text-muted-foreground">Please wait while we generate your questions...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load questions</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-center text-red-500">{error}</p>
          <Button onClick={generateQuestions} className="mt-4">Try Again</Button>
        </CardContent>
      </Card>
    )
  }

  if (questions.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No Questions Available</CardTitle>
          <CardDescription>No questions were generated{company ? ` for ${company}` : ""}{platform ? ` on ${platform}` : ""}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Button onClick={generateQuestions}>Generate Questions</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Coding Questions{company ? ` for ${company}` : ""}{platform ? ` on ${platform}` : ""}
            </CardTitle>
            <CardDescription>Practice coding questions frequently asked in technical interviews</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Input
                type="search"
                placeholder="Search questions..."
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="leetcode">LeetCode</SelectItem>
                  <SelectItem value="codechef">CodeChef</SelectItem>
                  <SelectItem value="geeksforgeeks">GeeksforGeeks</SelectItem>
                  <SelectItem value="hackerrank">HackerRank</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="amazon">Amazon</SelectItem>
                  <SelectItem value="microsoft">Microsoft</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="apple">Apple</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <p className="text-center py-10 text-muted-foreground">No questions match your filters. Try adjusting your search criteria.</p>
            ) : (
              filteredQuestions.map((question) => (
                <div key={question.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">{question.title}</h3>
                    <Badge className={`${question.difficulty.toLowerCase() === 'easy' ? 'bg-green-500' : question.difficulty.toLowerCase() === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>
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
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      Companies: {question.companies.join(", ")}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{question.platform}</Badge>
                      <Button size="sm" variant="outline" asChild>
                        <a href={question.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" />
                          Solve
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center mt-6">
            <Button onClick={generateQuestions}>Generate More Questions</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}