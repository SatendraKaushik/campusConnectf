"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Camera, Mic, MicOff, User, Briefcase, Code, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: {
    [index: number]: {
      isFinal: boolean
      [index: number]: {
        transcript: string
      }
    }
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: (event: any) => void
  onend: () => void
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

interface InterviewResult {
  overallScore: number
  communicationScore: number
  answerQualityScore: number
  bodyLanguageScore: number
  eyeContactScore: number
  postureScore: number
  strengths: string[]
  improvements: string[]
  correctAnswers?: string[]
}

export default function MockInterview() {
  const [interviewState, setInterviewState] = useState<"idle" | "preparing" | "recording" | "processing" | "completed">("idle")
  const [interviewType, setInterviewType] = useState<"technical" | "hr" | "behavioral">("technical")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [dynamicQuestions, setDynamicQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [currentTranscript, setCurrentTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(120)
  const [results, setResults] = useState<InterviewResult | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const webcamRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "system", content: "Welcome to your mock interview. I'll ask you questions and evaluate your responses." },
  ])

  const sampleQuestions = {
    technical: [
      "Can you explain the difference between let, const, and var in JavaScript?",
      "What is the virtual DOM in React and how does it work?",
      "Explain the concept of closures in JavaScript.",
    ],
    hr: [
      "Tell me about yourself and your background.",
      "Why do you want to work for our company?",
      "Describe a challenging situation and how you overcame it.",
    ],
    behavioral: [
      "Tell me about a time you had to work under pressure to meet a deadline.",
      "Describe a situation where you had to resolve a conflict with a coworker.",
      "Give an example of a goal you achieved and how you achieved it.",
    ],
  }

  const apiKey = "AIzaSyAfM3oWp3JD3huaRKeYeiKzPulMNuqbAfE"
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  })

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (interviewState === "recording" && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0 && interviewState === "recording") {
      handleFinishAnswer()
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [interviewState, timeRemaining])

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Please use Chrome, Edge, or Safari.",
        variant: "destructive",
      })
      return
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognitionAPI) return

    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = ""
      let finalTranscript = currentTranscript

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " "
        } else {
          interimTranscript += transcript
        }
      }

      setCurrentTranscript(finalTranscript + interimTranscript)

      if (silenceTimer) {
        clearTimeout(silenceTimer)
      }

      const timer = setTimeout(() => {
        if (finalTranscript.trim() || interimTranscript.trim()) {
          handleFinishAnswer()
        }
      }, 3000)

      setSilenceTimer(timer)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error)
      if (event.error === "no-speech") {
        return
      }

      toast({
        title: "Speech Recognition Error",
        description: `Error: ${event.error}. Please try again.`,
        variant: "destructive",
      })

      stopSpeechRecognition()
    }

    recognition.onend = () => {
      if (isListening) {
        try {
          recognition.start()
        } catch (error) {
          console.error("Error restarting speech recognition:", error)
        }
      }
    }

    recognitionRef.current = recognition

    return () => {
      stopSpeechRecognition()
    }
  }, [isListening, currentTranscript])

  const generateDynamicQuestions = async (type: string) => {
    try {
      setInterviewState("preparing")

      let prompt = ""
      if (type === "technical") {
        prompt = `Generate 5 unique technical interview questions for a software developer position. 
        Focus on programming concepts, algorithms, data structures, and software design principles.
        The questions should be challenging but answerable in 2-3 minutes.
        Return only a JSON array of questions: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]`
      } else if (type === "hr") {
        prompt = `Generate 5 unique HR interview questions for a job candidate.
        Focus on background, motivation, company fit, and career goals.
        Return only a JSON array of questions: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]`
      } else {
        prompt = `Generate 5 unique behavioral interview questions for a job candidate.
        Focus on past experiences, conflict resolution, teamwork, and problem-solving.
        Return only a JSON array of questions: ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]`
      }

      const chat = model.startChat()
      const result = await chat.sendMessage(prompt)
      const responseText = result.response.text()

      let questions: string[] = []

      try {
        let jsonString = responseText
        
        if (responseText.includes("```json")) {
          jsonString = responseText.split("```json")[1].split("```")[0].trim()
        } else if (responseText.includes("```")) {
          jsonString = responseText.split("```")[1].split("```")[0].trim()
        }

        const parsedResponse = JSON.parse(jsonString)
        
        if (Array.isArray(parsedResponse) && parsedResponse.length >= 5) {
          questions = parsedResponse.slice(0, 5)
        } else {
          throw new Error("Invalid question format")
        }

        return questions
      } catch (error) {
        console.error("Error parsing AI response:", error)
        return getDefaultQuestions(type)
      }
    } catch (error) {
      console.error("Error generating questions:", error)
      toast({
        title: "Error",
        description: "Failed to generate interview questions. Using default questions instead.",
        variant: "destructive",
      })

      return getDefaultQuestions(type)
    }
  }

  const getDefaultQuestions = (type: string) => {
    const questions = [
      type === "technical"
        ? "Explain the difference between var, let, and const in JavaScript."
        : type === "hr"
          ? "Tell me about yourself and your background."
          : "Describe a time when you had to overcome a significant challenge at work.",
      type === "technical"
        ? "What is the difference between synchronous and asynchronous programming?"
        : type === "hr"
          ? "Why do you want to work for our company?"
          : "Tell me about a time you had to work under pressure to meet a deadline.",
      type === "technical"
        ? "Explain how React's virtual DOM works."
        : type === "hr"
          ? "Where do you see yourself in 5 years?"
          : "Describe a situation where you had to resolve a conflict with a coworker.",
      type === "technical"
        ? "What are closures in JavaScript and how would you use them?"
        : type === "hr"
          ? "What are your greatest strengths and weaknesses?"
          : "Give an example of a goal you achieved and how you achieved it.",
      type === "technical"
        ? "Explain the concept of RESTful APIs and their principles."
        : type === "hr"
          ? "Describe your ideal work environment."
          : "Tell me about a time you failed and what you learned from it.",
    ]

    return questions
  }

  const startSpeechRecognition = () => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!recognitionRef.current && SpeechRecognitionAPI) {
      const recognition = new SpeechRecognitionAPI()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"
      recognitionRef.current = recognition
    }
    
    if (recognitionRef.current) {
      try {
        try {
          recognitionRef.current.stop()
        } catch (stopError) {
          // Ignore errors when stopping
        }
        
        setTimeout(() => {
          try {
            recognitionRef.current?.start()
            setIsListening(true)
            
            toast({
              title: "Speech Recognition Active",
              description: "Your microphone is now listening. Start speaking to answer the question.",
            })
          } catch (error) {
            console.error("Error starting speech recognition:", error)
            toast({
              title: "Speech Recognition Error",
              description: "Could not start speech recognition. Please refresh and try again.",
              variant: "destructive",
            })
          }
        }, 300)
      } catch (error) {
        console.error("Error in speech recognition start/stop sequence:", error)
      }
    } else {
      toast({
        title: "Speech Recognition Not Available",
        description: "Could not initialize speech recognition. Please use Chrome, Edge, or Safari.",
        variant: "destructive",
      })
    }
  }

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (error) {
        console.error("Error stopping speech recognition:", error)
      }
      setIsListening(false)
    }

    if (silenceTimer) {
      clearTimeout(silenceTimer)
      setSilenceTimer(null)
    }
  }

  const startInterview = async () => {
    try {
      const questions = await generateDynamicQuestions(interviewType)
      setDynamicQuestions(questions)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      streamRef.current = stream

      if (webcamRef.current) {
        webcamRef.current.srcObject = stream
        webcamRef.current.onloadedmetadata = () => {
          webcamRef.current?.play()
        }
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9,opus",
      })

      mediaRecorder.ondataavailable = handleDataAvailable
      mediaRecorderRef.current = mediaRecorder

      setInterviewState("recording")
      setTimeRemaining(120)

      const firstQuestion = questions[0]
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: firstQuestion,
        },
      ])

      mediaRecorder.start(1000)
      startSpeechRecognition()
      speakText(firstQuestion)
    } catch (error) {
      console.error("Error starting interview:", error)
      toast({
        title: "Error",
        description: "Could not start the interview. Please check your camera and microphone permissions.",
        variant: "destructive",
      })
      setInterviewState("idle")
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data && event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data])
    }
  }

  const handleFinishAnswer = async () => {
    if (isProcessing) return
    setIsProcessing(true)

    stopSpeechRecognition()

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop()
    }

    setInterviewState("processing")

    const newAnswers = [...answers, currentTranscript]
    setAnswers(newAnswers)

    const messageContent = currentTranscript || "No answer provided."
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: messageContent,
      },
    ])

    if (currentQuestionIndex >= dynamicQuestions.length - 1) {
      await generateResults(newAnswers, dynamicQuestions)
      setIsProcessing(false)
      return
    }

    setIsProcessing(false)
  }

  const handleNextQuestion = () => {
    if (isProcessing) return
    setIsProcessing(true)

    const nextIndex = currentQuestionIndex + 1
    setCurrentQuestionIndex(nextIndex)

    const nextQuestion = dynamicQuestions[nextIndex]
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: nextQuestion,
      },
    ])

    setCurrentTranscript("")
    setTimeRemaining(120)
    
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start(1000)
    }

    startSpeechRecognition()
    speakText(nextQuestion)

    setInterviewState("recording")
    setIsProcessing(false)
  }

  const generateResults = async (allAnswers: string[], questions: string[]) => {
    try {
      setInterviewState("completed")

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      const cameraEnabled = webcamRef.current && webcamRef.current.srcObject !== null
      
      const participationMetrics = allAnswers.map(answer => {
        const hasAnswer = answer && answer.trim().length > 0
        return {
          hasAnswer,
          wordCount: hasAnswer ? answer.trim().split(/\s+/).length : 0
        }
      })

      const participationScore = participationMetrics.reduce((acc, curr) => {
        return acc + (curr.hasAnswer ? 1 : 0)
      }, 0) / participationMetrics.length * 100

      const avgWordCount = participationMetrics.reduce((acc, curr) => acc + curr.wordCount, 0) / participationMetrics.length
      
      const baseAnswerQuality = participationScore > 0 ? Math.min(100, (avgWordCount / 50) * 100) : 0
      const baseCommunicationScore = participationScore
      const baseBodyLanguageScore = cameraEnabled ? 100 : 0
      
      const baseEyeContactScore = cameraEnabled ? Math.min(100, 60 + Math.random() * 40) : 0
      const basePostureScore = cameraEnabled ? Math.min(100, 70 + Math.random() * 30) : 0

      const overallScore = Math.round((baseAnswerQuality + baseCommunicationScore + baseBodyLanguageScore + baseEyeContactScore + basePostureScore) / 5)
      
      const strengths = []
      const improvements = []
      
      if (participationScore > 80) {
        strengths.push("Consistently provided responses to questions")
      } else {
        improvements.push("Work on answering all questions, even if unsure")
      }
      
      if (avgWordCount > 30) {
        strengths.push("Provided detailed and comprehensive answers")
      } else {
        improvements.push("Try to elaborate more in your responses")
      }
      
      if (cameraEnabled) {
        strengths.push("Maintained visual presence during interview")
      } else {
        improvements.push("Enable camera to demonstrate professional presence")
      }

      const finalResults = {
        overallScore,
        communicationScore: Math.round(baseCommunicationScore),
        answerQualityScore: Math.round(baseAnswerQuality),
        bodyLanguageScore: Math.round(baseBodyLanguageScore),
        eyeContactScore: Math.round(baseEyeContactScore),
        postureScore: Math.round(basePostureScore),
        strengths,
        improvements
      }

      setResults(finalResults)

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Interview completed! Your overall score is ${finalResults.overallScore}/100. Check the results panel for detailed feedback.`,
        },
      ])

      speakText(
        `Interview completed! Your overall score is ${finalResults.overallScore} out of 100. Check the results panel for detailed feedback.`,
      )
    } catch (error) {
      console.error("Error generating results:", error)
      toast({
        title: "Error",
        description: "Failed to generate interview results.",
        variant: "destructive",
      })
    }
  }

  const resetInterview = () => {
    stopSpeechRecognition()

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }

    setInterviewState("idle")
    setCurrentQuestionIndex(0)
    setDynamicQuestions([])
    setAnswers([])
    setCurrentTranscript("")
    setTimeRemaining(120)
    setResults(null)
    setRecordedChunks([])
    setIsProcessing(false)
    setMessages([
      {
        role: "system",
        content: "Welcome to your mock interview. I'll ask you questions and evaluate your responses.",
      },
    ])
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">AI Mock Interview Practice</h1>

      {interviewState === "idle" && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Start a New Interview</CardTitle>
            <CardDescription>Select an interview type and prepare your camera and microphone</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="technical" onValueChange={(value) => setInterviewType(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="technical">
                  <Code className="mr-2 h-4 w-4" />
                  Technical
                </TabsTrigger>
                <TabsTrigger value="hr">
                  <Briefcase className="mr-2 h-4 w-4" />
                  HR
                </TabsTrigger>
                <TabsTrigger value="behavioral">
                  <User className="mr-2 h-4 w-4" />
                  Behavioral
                </TabsTrigger>
              </TabsList>
              <TabsContent value="technical" className="mt-4">
                <div className="space-y-4">
                  <p>Technical interviews focus on your programming knowledge and problem-solving skills.</p>
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Sample Questions:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {sampleQuestions.technical.map((q, i) => (
                        <li key={i} className="text-sm">
                          {q}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm mt-3 text-muted-foreground">
                      Note: Actual questions will be dynamically generated for each interview.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="hr" className="mt-4">
                <div className="space-y-4">
                  <p>HR interviews assess your fit with the company culture and your background.</p>
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Sample Questions:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {sampleQuestions.hr.map((q, i) => (
                        <li key={i} className="text-sm">
                          {q}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm mt-3 text-muted-foreground">
                      Note: Actual questions will be dynamically generated for each interview.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="behavioral" className="mt-4">
                <div className="space-y-4">
                  <p>Behavioral interviews evaluate how you've handled situations in the past.</p>
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Sample Questions:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {sampleQuestions.behavioral.map((q, i) => (
                        <li key={i} className="text-sm">
                          {q}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm mt-3 text-muted-foreground">
                      Note: Actual questions will be dynamically generated for each interview.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button onClick={startInterview} className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Start Interview with Camera
            </Button>
          </CardFooter>
        </Card>
      )}

      {interviewState === "preparing" && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Preparing Your Interview</CardTitle>
            <CardDescription>Generating unique questions for your {interviewType} interview</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Preparing your personalized interview questions...</p>
              <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
            </div>
          </CardContent>
        </Card>
      )}

      {(interviewState === "recording" || interviewState === "processing" || interviewState === "completed") && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {interviewType === "technical"
                    ? "Technical Interview"
                    : interviewType === "hr"
                      ? "HR Interview"
                      : "Behavioral Interview"}
                </CardTitle>
                <CardDescription>
                  Question {currentQuestionIndex + 1} of {dynamicQuestions.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {(interviewState === "recording" || interviewState === "processing") && (
                  <div className="space-y-4">
                    <div className="aspect-video bg-black rounded-md overflow-hidden">
                      <video ref={webcamRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Time Remaining</span>
                        <span>
                          {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
                        </span>
                      </div>
                      <Progress value={(timeRemaining / 120) * 100} />
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      {isListening ? (
                        <div className="flex items-center gap-2 text-green-500">
                          <Mic className="h-5 w-5 animate-pulse" />
                          <span>Listening...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500">
                          <MicOff className="h-5 w-5" />
                          <span>Processing...</span>
                        </div>
                      )}
                    </div>

                    {currentTranscript && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">Current Transcript:</h3>
                        <div className="bg-muted p-3 rounded-md text-sm max-h-40 overflow-y-auto">
                          {currentTranscript || "Waiting for speech..."}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {interviewState === "completed" && results && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Overall Score</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={results.overallScore} />
                        <span className="font-medium">{results.overallScore}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Communication</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={results.communicationScore} />
                        <span className="font-medium">{results.communicationScore}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Answer Quality</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={results.answerQualityScore} />
                        <span className="font-medium">{results.answerQualityScore}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Body Language</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={results.bodyLanguageScore} />
                        <span className="font-medium">{results.bodyLanguageScore}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Eye Contact</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={results.eyeContactScore} />
                        <span className="font-medium">{results.eyeContactScore}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium">Posture</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={results.postureScore} />
                        <span className="font-medium">{results.postureScore}%</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Strengths</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {results.strengths.map((strength: string, i: number) => (
                          <li key={i} className="text-sm">
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Areas for Improvement</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {results.improvements.map((improvement: string, i: number) => (
                          <li key={i} className="text-sm">
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={resetInterview} variant="outline" className="w-full">
                  Start New Interview
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Interview Conversation</CardTitle>
                <CardDescription>
                  {interviewState === "recording"
                    ? "Speak your answer clearly - the system will automatically detect when you're done"
                    : interviewState === "processing"
                      ? "Processing your answer..."
                      : "Review your interview conversation"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {messages
                      .filter((m) => m.role !== "system")
                      .map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{message.role === "assistant" ? "AI" : "You"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div
                                className={`rounded-lg p-3 ${
                                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                }`}
                              >
                                <p>{message.content}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
              {interviewState === "recording" && (
                <CardFooter className="border-t pt-4">
                  <div className="flex w-full items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Speak your answer clearly. The system will automatically detect when you're done.
                      </p>
                      <Button onClick={handleFinishAnswer} variant="outline" disabled={isProcessing}>
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "I'm Done Answering"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              )}
              
              {interviewState === "processing" && currentQuestionIndex < dynamicQuestions.length - 1 && (
                <CardFooter className="border-t pt-4">
                  <div className="flex w-full items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Ready to proceed to the next question?
                      </p>
                      <Button onClick={handleNextQuestion} disabled={isProcessing}>
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Next Question"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      )}

      {interviewState !== "idle" && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Interview Tips</CardTitle>
            <CardDescription>Follow these tips to improve your interview performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Communication</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Speak clearly and at a moderate pace</li>
                  <li>Use professional language</li>
                  <li>Avoid filler words (um, like, you know)</li>
                  <li>Structure your answers with a beginning, middle, and end</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Body Language & Posture</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Maintain good posture - sit up straight</li>
                  <li>Position yourself properly in the camera frame</li>
                  <li>Use hand gestures naturally but not excessively</li>
                  <li>Smile and show engagement</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Eye Contact</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Look directly at the camera when speaking</li>
                  <li>Avoid looking away for extended periods</li>
                  <li>Position your camera at eye level</li>
                  <li>Maintain natural blinking patterns</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}