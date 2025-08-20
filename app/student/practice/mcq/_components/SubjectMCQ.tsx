"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { chatSession } from "@/utils/GeminiAImodel"

type MCQQuestion = {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

type SubjectMCQProps = {
  subject: string
  topic?: string
}

export default function SubjectMCQ({ subject, topic }: SubjectMCQProps) {
  const [questions, setQuestions] = useState<MCQQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string>("") 
  const [showAnswer, setShowAnswer] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [timerActive, setTimerActive] = useState<boolean>(false)

  useEffect(() => {
    generateQuestions()
  }, [subject, topic])
  
  // Start timer when questions are loaded
  useEffect(() => {
    if (questions.length > 0 && !showAnswer) {
      startTimer();
    }
  }, [questions.length, currentQuestionIndex])

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      // Time's up - auto submit the answer
      if (!showAnswer) {
        handleCheckAnswer();
      }
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, timerActive, showAnswer]);
  
  // Anti-copy event handlers
  useEffect(() => {
    const preventCopy = (e: Event) => {
      e.preventDefault();
      return false;
    };
    
    const preventSelection = () => {
      return false;
    };
    
    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+X
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 'a')) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('copy', preventCopy);
    document.addEventListener('cut', preventCopy);
    document.addEventListener('contextmenu', preventCopy);
    document.addEventListener('keydown', preventKeyboardShortcuts);
    document.addEventListener('selectstart', preventSelection);
    
    return () => {
      document.removeEventListener('copy', preventCopy);
      document.removeEventListener('cut', preventCopy);
      document.removeEventListener('contextmenu', preventCopy);
      document.removeEventListener('keydown', preventKeyboardShortcuts);
      document.removeEventListener('selectstart', preventSelection);
    };
  }, []);

  const generateQuestions = async () => {
    setLoading(true)
    setError(null)
    setQuestions([])
    setCurrentQuestionIndex(0)
    setSelectedOption("")
    setShowAnswer(false)
    setScore({ correct: 0, total: 0 })

    try {
      // Create a prompt for Gemini AI to generate MCQ questions
      const prompt = `Generate 5 multiple-choice questions (MCQs) about ${subject}${topic ? ` focusing on ${topic}` : ""}. 
      
      Each question should have 4 options with only one correct answer. 
      
      Format your response as a valid JSON array with the following structure for each question:
      {
        "question": "The question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "The correct option text",
        "explanation": "A brief explanation of why this answer is correct",
        "difficulty": "easy|medium|hard" (assign a difficulty level to each question)
      }
      
      Make sure the questions are challenging but appropriate for college students. Include a mix of conceptual and application-based questions with varying difficulty levels (easy, medium, and hard).
      
      Ensure that the questions cover important concepts and are relevant to technical interviews and assessments.
      For each question, provide a detailed explanation that helps the student understand the concept better.
      `

      const result = await chatSession.sendMessage(prompt)
      const responseText = await result.response.text()

      // Extract JSON from the response
      const jsonMatch = responseText.match(/\[\s*\{.*\}\s*\]/s)
      if (!jsonMatch) {
        throw new Error("Could not extract valid JSON from the response")
      }

      try {
        const parsedQuestions = JSON.parse(jsonMatch[0])
        
        if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
          throw new Error("Invalid question format received")
        }
        
        // Validate each question has the required fields
        const validatedQuestions = parsedQuestions.map((q: any, index: number) => {
          // Ensure all required fields are present
          if (!q.question || !q.options || !q.correctAnswer || !q.explanation) {
            console.warn(`Question ${index + 1} is missing required fields, adding defaults`)
            return {
              question: q.question || `Question ${index + 1} about ${subject}${topic ? ` (${topic})` : ""}`,
              options: q.options || ["Option A", "Option B", "Option C", "Option D"],
              correctAnswer: q.correctAnswer || "Option A",
              explanation: q.explanation || "Explanation not provided",
              difficulty: q.difficulty || "medium"
            }
          }
          
          // Assign difficulty levels if not present
          if (!q.difficulty) {
            const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
            q.difficulty = difficulties[index % 3];
          }
          
          return q;
        });

        setQuestions(validatedQuestions)
      } catch (parseError) {
        console.error("Error parsing questions JSON:", parseError)
        throw new Error("Failed to parse the generated questions. Please try again.")
      }
    } catch (err: any) {
      console.error("Error generating questions:", err)
      setError("Failed to generate questions. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleCheckAnswer = () => {
    if (!selectedOption) return

    setShowAnswer(true)
    setTimerActive(false) // Pause the timer when showing answer
    const currentQuestion = questions[currentQuestionIndex]
    
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }))
    }
    
    setScore(prev => ({ ...prev, total: prev.total + 1 }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedOption("")
      setShowAnswer(false)
      // Reset and start timer for next question
      startTimer()
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setSelectedOption("")
      setShowAnswer(false)
      // Reset and start timer for previous question
      startTimer()
    }
  }

  const handleRestart = () => {
    generateQuestions()
  }
  
  // Start timer based on question difficulty
  const startTimer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    let seconds = 60; // Default time for easy questions
    
    if (currentQuestion) {
      switch (currentQuestion.difficulty) {
        case 'easy':
          seconds = 60;
          break;
        case 'medium':
          seconds = 45;
          break;
        case 'hard':
          seconds = 30;
          break;
        default:
          seconds = 60;
      }
    }
    
    setTimeLeft(seconds);
    setTimerActive(true);
  }
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading Questions</CardTitle>
          <CardDescription>Generating MCQ questions for {subject}{topic ? ` - ${topic}` : ""}</CardDescription>
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
          <Button onClick={handleRestart} className="mt-4">Try Again</Button>
        </CardContent>
      </Card>
    )
  }

  if (questions.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No Questions Available</CardTitle>
          <CardDescription>No questions were generated for {subject}{topic ? ` - ${topic}` : ""}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Button onClick={handleRestart}>Generate Questions</Button>
        </CardContent>
      </Card>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{subject}{topic ? ` - ${topic}` : ""} MCQ</CardTitle>
            <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="text-sm">
              Score: {score.correct}/{score.total}
            </Badge>
            <Badge variant={currentQuestion.difficulty === 'easy' ? 'secondary' : currentQuestion.difficulty === 'medium' ? 'default' : 'destructive'} className="text-sm">
              {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
            </Badge>
            <Badge variant={timeLeft > 20 ? 'outline' : 'destructive'} className="text-sm">
              Time: {formatTime(timeLeft)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium text-lg select-none" style={{ userSelect: 'none' }}>{currentQuestion.question}</h3>
          </div>

          <RadioGroup value={selectedOption} className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className={`flex items-center space-x-2 rounded-lg border p-3 
                ${showAnswer && option === currentQuestion.correctAnswer ? "border-green-500 bg-green-50" : ""}
                ${showAnswer && option === selectedOption && option !== currentQuestion.correctAnswer ? "border-red-500 bg-red-50" : ""}
              `}>
                <RadioGroupItem 
                  value={option} 
                  id={`option-${index}`} 
                  disabled={showAnswer}
                  onClick={() => handleOptionSelect(option)}
                />
                <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer select-none" style={{ userSelect: 'none' }}>
                  {option}
                </Label>
                {showAnswer && option === currentQuestion.correctAnswer && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {showAnswer && option === selectedOption && option !== currentQuestion.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </RadioGroup>

          {showAnswer && (
            <div className="rounded-lg border p-4 bg-blue-50">
              <h4 className="font-medium">Explanation:</h4>
              <p className="text-sm mt-1 select-none" style={{ userSelect: 'none' }}>{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>

            {!showAnswer ? (
              <Button 
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
              >
                Check Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next Question
              </Button>
            )}
          </div>

          {currentQuestionIndex === questions.length - 1 && showAnswer && (
            <div className="mt-6 text-center">
              <p className="mb-4 font-medium">You've completed all questions!</p>
              <p className="mb-4">Final Score: {score.correct}/{questions.length}</p>
              <Button onClick={handleRestart}>Start New Quiz</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}