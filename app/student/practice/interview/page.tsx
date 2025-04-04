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

// Define the SpeechRecognition types to fix TypeScript errors
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

// Add these to the Window interface
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

// Define result interface
interface InterviewResult {
  overallScore: number
  communicationScore: number
  answerQualityScore: number
  bodyLanguageScore: number
  strengths: string[]
  improvements: string[]
  correctAnswers?: string[]
}

export default function MockInterview() {
  // State for interview flow
  const [interviewState, setInterviewState] = useState<"idle" | "preparing" | "recording" | "processing" | "completed">(
    "idle",
  )
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

  // Camera and recording refs
  const webcamRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])

  // Speech recognition ref
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Chat messages
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "system", content: "Welcome to your mock interview. I'll ask you questions and evaluate your responses." },
  ])

  // Sample questions for display only (not used in actual interview)
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

  // Initialize Google Generative AI
  const apiKey = "AIzaSyBp7NQMTYykuZnCoVhpPPGnRH0o4NJzLpY" // Using the provided API key
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

  // Timer effect
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

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Please use Chrome, Edge, or Safari.",
        variant: "destructive",
      })
      return
    }

    // Initialize speech recognition
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognitionAPI) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Please use Chrome, Edge, or Safari.",
        variant: "destructive",
      })
      return
    }

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

      // Update transcript
      setCurrentTranscript(finalTranscript + interimTranscript)

      // Reset silence timer when speech is detected
      if (silenceTimer) {
        clearTimeout(silenceTimer)
      }

      // Set a new silence timer
      const timer = setTimeout(() => {
        // If we haven't heard anything for 3 seconds, consider the answer complete
        if (finalTranscript.trim() || interimTranscript.trim()) {
          handleFinishAnswer()
        }
      }, 3000) // 3 seconds of silence

      setSilenceTimer(timer)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error)
      if (event.error === "no-speech") {
        // No speech detected for a while
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
      // Only restart if we're still in listening mode
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

  // Generate dynamic questions based on interview type
  const generateDynamicQuestions = async (type: string) => {
    try {
      setInterviewState("preparing")

      // Create prompt based on interview type
      let prompt = ""
      if (type === "technical") {
        prompt = `Generate 5 unique technical interview questions for a software developer position. 
        Focus on programming concepts, algorithms, data structures, and software design principles.
        The questions should be challenging but answerable in 2-3 minutes.
        For each question, also provide a model answer that would be considered correct.
        Return the response as a JSON object with two arrays: "questions" and "answers".
        Example format: 
        {
          "questions": ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"],
          "answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5"]
        }`
      } else if (type === "hr") {
        prompt = `Generate 5 unique HR interview questions for a job candidate.
        Focus on background, motivation, company fit, and career goals.
        The questions should help assess cultural fit and professional aspirations.
        For each question, also provide a model answer that would be considered good.
        Return the response as a JSON object with two arrays: "questions" and "answers".
        Example format: 
        {
          "questions": ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"],
          "answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5"]
        }`
      } else {
        prompt = `Generate 5 unique behavioral interview questions for a job candidate.
        Focus on past experiences, conflict resolution, teamwork, and problem-solving.
        The questions should follow the STAR method format (Situation, Task, Action, Result).
        For each question, also provide a model answer that follows the STAR method.
        Return the response as a JSON object with two arrays: "questions" and "answers".
        Example format: 
        {
          "questions": ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"],
          "answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5"]
        }`
      }

      // Create a chat session
      const chat = model.startChat()
      const result = await chat.sendMessage(prompt)
      const responseText = result.response.text()

      // Parse the JSON response
      let questions: string[] = []
      let modelAnswers: string[] = []

      try {
        // Extract JSON if it's wrapped in code blocks and sanitize it
        let jsonString = responseText
        
        // Clean up the response text to ensure valid JSON
        if (responseText.includes("```json")) {
          jsonString = responseText.split("```json")[1].split("```")[0].trim()
        } else if (responseText.includes("```")) {
          jsonString = responseText.split("```")[1].split("```")[0].trim()
        }
        
        
      
        jsonString = jsonString
          .replace(/\n/g, "\\n") 
          .replace(/'/g, "\\'")
          .replace(/\\n/g, "\n") 
          .replace(/\\'/g, "'") 
          .replace(/\\(?!["\\])/g, "\\\\") 
          .replace(/([{,]\s*)(["']?)(\w+(?:-\w+)*)(\2)\s*:/g, '$1$2$3$2: ') 
          .replace(/,\s*([}\]])/g, "$1") 
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
          .replace(/([^\\])"([^"]*?)\\([^"]*?)"/g, '$1"$2\\\\$3"')
          .replace(/([^\\])\\([^"\\])/g, '$1\\\\$2')
          .trim();

        // Optional: Handle unterminated strings
        const matches = jsonString.match(/"(?:[^"\\]|\\.)*$/g);
        if (matches && matches.length > 0) {
            matches.forEach((match) => {
                jsonString = jsonString.replace(match, `${match}"`);
            });
        }


        // Log the sanitized JSON string for debugging
        console.log("Sanitized JSON string:", jsonString.substring(0, 100) + "...")
        
        // Try to parse the JSON, with a fallback to a more lenient approach if it fails
        let parsedResponse
        try {
          parsedResponse = JSON.parse(jsonString)
        } catch (jsonError) {
          console.error("Initial JSON parsing failed, trying more lenient approach:", jsonError)
          
          // Try to extract just the questions and answers using regex as a last resort
          const questionsMatch = responseText.match(/"questions"\s*:\s*\[(.*?)\]/)
          const answersMatch = responseText.match(/"answers"\s*:\s*\[(.*?)\]/)
          
          if (questionsMatch && answersMatch) {
            const questionsStr = questionsMatch[1]
            const answersStr = answersMatch[1]
            
            // Extract individual questions and answers
            const extractedQuestions = questionsStr.match(/"(.*?)"/g)?.map(q => q.replace(/"/g, "")) || []
            const extractedAnswers = answersStr.match(/"(.*?)"/g)?.map(a => a.replace(/"/g, "")) || []
            
            parsedResponse = {
              questions: extractedQuestions,
              answers: extractedAnswers
            }
          } else {
            throw new Error("Could not extract questions and answers from response")
          }
        }

        if (
          parsedResponse.questions &&
          Array.isArray(parsedResponse.questions) &&
          parsedResponse.questions.length >= 5
        ) {
          questions = parsedResponse.questions.slice(0, 5)

          if (parsedResponse.answers && Array.isArray(parsedResponse.answers) && parsedResponse.answers.length >= 5) {
            modelAnswers = parsedResponse.answers.slice(0, 5)
          } else {
            throw new Error("Invalid answer format")
          }
        } else {
          throw new Error("Invalid question format")
        }

        // Store model answers for later comparison
        localStorage.setItem("modelAnswers", JSON.stringify(modelAnswers))

        return questions
      } catch (error) {
        console.error("Error parsing AI response for questions:", error)
        // Fallback to default questions if parsing fails
        return getDefaultQuestions(type)
      }
    } catch (error) {
      console.error("Error generating questions:", error)
      toast({
        title: "Error",
        description: "Failed to generate interview questions. Using default questions instead.",
        variant: "destructive",
      })

      // Return default questions based on type
      return getDefaultQuestions(type)
    }
  }

  // Default questions if AI fails
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

    // Create default model answers
    const modelAnswers = questions.map(
      (q) => `Model answer for: ${q} This is a placeholder for a model answer that would be generated by the AI.`,
    )

    // Store model answers for later comparison
    localStorage.setItem("modelAnswers", JSON.stringify(modelAnswers))

    return questions
  }

  // Start speech recognition
  const startSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (error) {
        console.error("Error starting speech recognition:", error)
        // Try to recreate the recognition object if it failed
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
        if (SpeechRecognitionAPI) {
          const recognition = new SpeechRecognitionAPI()
          recognition.continuous = true
          recognition.interimResults = true
          recognition.lang = "en-US"

          recognition.onresult = recognitionRef.current.onresult
          recognition.onerror = recognitionRef.current.onerror
          recognition.onend = recognitionRef.current.onend

          recognitionRef.current = recognition
          recognition.start()
          setIsListening(true)
        }
      }
    }
  }

  // Stop speech recognition
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

  // Initialize camera when starting interview
  const startInterview = async () => {
    try {
      // Generate dynamic questions first
      const questions = await generateDynamicQuestions(interviewType)
      setDynamicQuestions(questions)

      // Request camera and microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      streamRef.current = stream

      // Set up video element
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream
        webcamRef.current.onloadedmetadata = () => {
          webcamRef.current?.play()
        }
      }

      // Set up media recorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9,opus",
      })

      mediaRecorder.ondataavailable = handleDataAvailable
      mediaRecorderRef.current = mediaRecorder

      // Start interview
      setInterviewState("recording")
      setTimeRemaining(120)

      // Add first question to messages
      const firstQuestion = questions[0]
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: firstQuestion,
        },
      ])

      // Start recording
      mediaRecorder.start(1000) // Collect data every second

      // Start speech recognition
      startSpeechRecognition()

      // Use speech synthesis to read the question
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

  // Use speech synthesis to speak text
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0
      window.speechSynthesis.speak(utterance)
    }
  }

  // Handle recorded data chunks
  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data && event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data])
    }
  }

  // Handle when the user finishes answering
  const handleFinishAnswer = async () => {
    if (isProcessing) return // Prevent multiple submissions
    setIsProcessing(true)

    // Stop speech recognition
    stopSpeechRecognition()

    // Stop recording for current question
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop()
    }

    // Set state to processing
    setInterviewState("processing")

    // Add user's answer to the list
    const newAnswers = [...answers, currentTranscript]
    setAnswers(newAnswers)

    // Add user's answer to messages
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentTranscript || "No answer provided.",
      },
    ])

    // Check if we've completed all questions
    if (currentQuestionIndex >= dynamicQuestions.length - 1) {
      // This was the last question, generate final results
      await generateResults(newAnswers, dynamicQuestions)
      setIsProcessing(false)
      return
    }

    // Move to next question
    const nextIndex = currentQuestionIndex + 1
    setCurrentQuestionIndex(nextIndex)

    // Add next question to messages
    const nextQuestion = dynamicQuestions[nextIndex]
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: nextQuestion,
      },
    ])

    // Reset transcript
    setCurrentTranscript("")

    // Reset timer and start recording again
    setTimeRemaining(120)
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.start(1000)
    }

    // Start speech recognition again
    startSpeechRecognition()

    // Use speech synthesis to read the next question
    speakText(nextQuestion)

    // Set state back to recording
    setInterviewState("recording")
    setIsProcessing(false)
  }

  // Generate final results using AI
  const generateResults = async (allAnswers: string[], questions: string[]) => {
    try {
      setInterviewState("completed")

      // Stop all media tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      // Check if camera was enabled during interview
      const cameraEnabled = webcamRef.current && webcamRef.current.srcObject !== null
      
      // Calculate participation metrics
      const participationMetrics = allAnswers.map(answer => {
        const hasAnswer = answer && answer.trim().length > 0
        return {
          hasAnswer,
          wordCount: hasAnswer ? answer.trim().split(/\s+/).length : 0
        }
      })

      // Calculate participation scores
      const participationScore = participationMetrics.reduce((acc, curr) => {
        return acc + (curr.hasAnswer ? 1 : 0)
      }, 0) / participationMetrics.length * 100

      // Calculate average word count for quality assessment
      const avgWordCount = participationMetrics.reduce((acc, curr) => acc + curr.wordCount, 0) / participationMetrics.length
      
      // Base scores calculation
      const baseAnswerQuality = participationScore > 0 ? Math.min(100, (avgWordCount / 50) * 100) : 0 // Zero if no answers provided
      const baseCommunicationScore = participationScore
      const baseBodyLanguageScore = cameraEnabled ? 100 : 0

      // Get model answers from localStorage
      let modelAnswers: string[] = []
      try {
        const storedAnswers = localStorage.getItem("modelAnswers")
        if (storedAnswers) {
          modelAnswers = JSON.parse(storedAnswers)
        }
      } catch (error) {
        console.error("Error retrieving model answers:", error)
      }

      // Calculate final scores based on participation and camera presence
      const overallScore = Math.round((baseAnswerQuality + baseCommunicationScore + baseBodyLanguageScore) / 3)
      
      // Generate strengths and improvements based on performance metrics
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

      // Set the results
      setResults({
        overallScore,
        communicationScore: Math.round(baseCommunicationScore),
        answerQualityScore: Math.round(baseAnswerQuality),
        bodyLanguageScore: Math.round(baseBodyLanguageScore),
        strengths,
        improvements
      })

      // Prepare prompt for AI evaluation
      const prompt = `
        You are an expert interview coach. Evaluate the following interview responses for a ${interviewType} interview.
        
        Questions:
        ${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}
        
        Candidate's Answers:
        ${allAnswers.map((a, i) => `${i + 1}. ${a || "No answer provided."}`).join("\n")}
        
        ${
          modelAnswers.length > 0
            ? `Model Answers for Reference:
        ${modelAnswers.map((a, i) => `${i + 1}. ${a}`).join("\n")}`
            : ""
        }
        
        Provide a comprehensive evaluation with the following:
        1. Overall score (0-100)
        2. Communication score (0-100)
        3. Quality of answers score (0-100)
        4. Body language score (based on the fact they were recorded on camera, assume 75 if you can't evaluate)
        5. Three specific strengths
        6. Three areas for improvement
        7. Correct answers or key points that should have been mentioned for each question
        
        Format your response as a JSON object with the following structure:
        {
          "overallScore": number,
          "communicationScore": number,
          "answerQualityScore": number,
          "bodyLanguageScore": number,
          "strengths": [string, string, string],
          "improvements": [string, string, string],
          "correctAnswers": [string, string, string, string, string]
        }
      `

      // Create a chat session
      const chat = model.startChat()
      const result = await chat.sendMessage(prompt)
      const responseText = result.response.text()

      // Parse the JSON response
      let jsonResponse: InterviewResult
      try {
        // Extract JSON if it's wrapped in code blocks and sanitize it
        let jsonString = responseText
        
        // Clean up the response text to ensure valid JSON
        if (responseText.includes("```json")) {
          jsonString = responseText.split("```json")[1].split("```")[0].trim()
        } else if (responseText.includes("```")) {
          jsonString = responseText.split("```")[1].split("```")[0].trim()
        }
        
        // Additional sanitization to fix common JSON issues
        jsonString = jsonString
        .replace(/\n/g, " ") // Replace newlines with spaces
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/\\/g, "\\\\") // Escape backslashes
        .replace(/({|\[|\s*),\s*([}\]])/g, "$1$2") // Remove trailing commas
        .replace(/([{,])\s*"?(\w+)"?\s*:/g, '$1"$2":') // Format JSON keys
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
        .trim();

        // Try to fix unterminated strings
        const matches = jsonString.match(/"(?:[^"\\]|\\.)*$/g)
        if (matches && matches.length > 0) {
          for (const match of matches) {
            jsonString = jsonString.replace(match, match + '"')
          }
        }

        jsonResponse = JSON.parse(jsonString)

        // Ensure all required fields are present with proper defaults based on participation
        const hasParticipated = allAnswers.some(answer => answer && answer.trim().length > 0)
        const cameraWasEnabled = webcamRef.current && webcamRef.current.srcObject !== null
        
        // Set default scores based on actual participation
        if (!jsonResponse.overallScore) {
          jsonResponse.overallScore = hasParticipated ? (cameraWasEnabled ? 75 : 50) : (cameraWasEnabled ? 25 : 0)
        }
        if (!jsonResponse.communicationScore) {
          jsonResponse.communicationScore = hasParticipated ? 75 : 0
        }
        if (!jsonResponse.answerQualityScore) {
          jsonResponse.answerQualityScore = hasParticipated ? 75 : 0
        }
        if (!jsonResponse.bodyLanguageScore) {
          jsonResponse.bodyLanguageScore = cameraWasEnabled ? 75 : 0
        }
        if (!jsonResponse.strengths || !Array.isArray(jsonResponse.strengths) || jsonResponse.strengths.length < 3) {
          jsonResponse.strengths = [
            "Showed willingness to engage with challenging questions",
            "Attempted to provide structured responses",
            "Demonstrated technical knowledge in relevant areas",
          ]
        }
        if (
          !jsonResponse.improvements ||
          !Array.isArray(jsonResponse.improvements) ||
          jsonResponse.improvements.length < 3
        ) {
          jsonResponse.improvements = [
            "Work on providing more concise and focused answers",
            "Practice using the STAR method for behavioral questions",
            "Expand technical knowledge in key areas",
          ]
        }

        setResults(jsonResponse)

        // Add final feedback to messages
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Interview completed! Your overall score is ${jsonResponse.overallScore}/100. Check the results panel for detailed feedback.`,
          },
        ])

        // Speak the final feedback
        speakText(
          `Interview completed! Your overall score is ${jsonResponse.overallScore} out of 100. Check the results panel for detailed feedback.`,
        )
      } catch (error) {
        console.error("Error parsing AI response:", error)
        // Analyze the answers and generate a score based on content
        const analyzedResults = analyzeAnswers(allAnswers, questions, interviewType, modelAnswers)
        setResults(analyzedResults)

        // Add final feedback to messages
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Interview completed! Your overall score is ${analyzedResults.overallScore}/100. Check the results panel for detailed feedback.`,
          },
        ])

        // Speak the final feedback
        speakText(
          `Interview completed! Your overall score is ${analyzedResults.overallScore} out of 100. Check the results panel for detailed feedback.`,
        )
      }
    } catch (error) {
      console.error("Error generating results:", error)
      toast({
        title: "Error",
        description: "Failed to generate interview results. Using fallback evaluation method.",
        variant: "destructive",
      })

      // Use fallback method
      const analyzedResults = analyzeAnswers(allAnswers, questions, interviewType, [])
      setResults(analyzedResults)

      // Add final feedback to messages
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Interview completed! Your overall score is ${analyzedResults.overallScore}/100. Check the results panel for detailed feedback.`,
        },
      ])

      // Speak the final feedback
      speakText(
        `Interview completed! Your overall score is ${analyzedResults.overallScore} out of 100. Check the results panel for detailed feedback.`,
      )
    }
  }

  // Fallback function to analyze answers if AI fails
  const analyzeAnswers = (
    answers: string[],
    questions: string[],
    type: string,
    modelAnswers: string[],
  ): InterviewResult => {
    // Calculate basic metrics
    const wordCounts = answers.map((answer) => answer.split(/\s+/).filter((word) => word.length > 0).length)
    const avgWordCount = wordCounts.reduce((sum, count) => sum + count, 0) / wordCounts.length || 0

    // Calculate scores based on answer length and content
    let answerQualityScore = 0
    let communicationScore = 0

    // Check for keywords based on interview type
    const technicalKeywords = [
      "function",
      "algorithm",
      "code",
      "data",
      "structure",
      "performance",
      "complexity",
      "api",
      "framework",
      "architecture",
      "javascript",
      "react",
      "component",
      "state",
      "props",
      "hooks",
      "async",
      "promise",
      "memory",
      "optimization",
    ]

    const hrKeywords = [
      "experience",
      "team",
      "collaborate",
      "goal",
      "achieve",
      "learn",
      "grow",
      "skill",
      "value",
      "culture",
      "passion",
      "motivation",
      "leadership",
      "communication",
      "adaptability",
      "challenge",
      "opportunity",
      "responsibility",
      "commitment",
      "vision",
    ]

    const behavioralKeywords = [
      "situation",
      "task",
      "action",
      "result",
      "challenge",
      "solve",
      "lead",
      "initiative",
      "improve",
      "success",
      "teamwork",
      "conflict",
      "resolution",
      "project",
      "deadline",
      "pressure",
      "responsibility",
      "decision",
      "impact",
      "outcome",
    ]

    const relevantKeywords = type === "technical" ? technicalKeywords : type === "hr" ? hrKeywords : behavioralKeywords

    // Generate correct answers if model answers are not available
    const correctAnswers =
      modelAnswers.length === questions.length
        ? modelAnswers
        : questions.map((q, i) => {
            if (type === "technical") {
              return `For "${q}", key points to mention include: technical concepts, implementation details, trade-offs, and real-world applications.`
            } else if (type === "hr") {
              return `For "${q}", a good answer would include: personal experiences, alignment with company values, specific examples, and future aspirations.`
            } else {
              return `For "${q}", use the STAR method: describe the Situation, Task, Action taken, and Results achieved with specific metrics and learnings.`
            }
          })

    // Analyze each answer
    answers.forEach((answer, index) => {
      const lowerAnswer = answer.toLowerCase()

      // Count relevant keywords
      const keywordCount = relevantKeywords.filter((keyword) => lowerAnswer.includes(keyword)).length

      // Calculate quality score based on length and keywords
      const answerLength = answer.length
      if (answerLength > 500) answerQualityScore += 20
      else if (answerLength > 300) answerQualityScore += 15
      else if (answerLength > 100) answerQualityScore += 10
      else answerQualityScore += 5

      // Add points for keywords
      answerQualityScore += keywordCount * 2

      // Communication score based on sentence structure
      const sentences = answer.split(/[.!?]+/).filter((s) => s.trim().length > 0)
      if (sentences.length > 5) communicationScore += 15
      else if (sentences.length > 3) communicationScore += 10
      else communicationScore += 5

      // Check for filler words (reduces score)
      const fillerWords = ["um", "uh", "like", "you know", "sort of", "kind of"]
      const fillerCount = fillerWords.filter((word) => lowerAnswer.includes(word)).length
      communicationScore = Math.max(0, communicationScore - fillerCount)

      // Compare with model answer if available
      if (modelAnswers.length > index) {
        const modelAnswer = modelAnswers[index].toLowerCase()
        const modelKeywords = modelAnswer.split(/\s+/).filter((word) => word.length > 3)
        const matchingKeywords = modelKeywords.filter((keyword) => lowerAnswer.includes(keyword)).length
        const keywordPercentage = modelKeywords.length > 0 ? matchingKeywords / modelKeywords.length : 0

        // Add bonus points for matching model answer
        answerQualityScore += keywordPercentage * 10
      }
    })

    // Normalize scores to 0-100 range
    // Check if user participated at all (provided any answers)
    const hasParticipated = answers.some(answer => answer && answer.trim().length > 0)
    
    // If no participation, set scores to 0
    if (!hasParticipated) {
      answerQualityScore = 0
      communicationScore = 0
    } else {
      answerQualityScore = Math.min(100, Math.max(0, (answerQualityScore / answers.length) * 5))
      communicationScore = Math.min(100, Math.max(0, (communicationScore / answers.length) * 6))
    }

    // Body language score based on camera status - check if camera is actually working
    // Only give a score if the camera is active and has valid tracks
    let cameraActive = false;
    let bodyLanguageScore = 0;
    
    try {
      // Get video tracks from the webcam
      const videoTracks = (webcamRef.current?.srcObject as MediaStream)?.getVideoTracks() || [];
      
      // Check if we have active video tracks
      cameraActive = Boolean(
        webcamRef.current && 
        webcamRef.current.srcObject !== null && 
        videoTracks.length > 0 && 
        videoTracks.some(track => track.enabled && track.readyState === 'live')
      );
      
      // Additional check for camera permissions and activity
      if (cameraActive) {
        // Try to get a frame from the video to verify it's actually working
        // This helps detect cases where camera permission is granted but camera is covered/blocked
        try {
          if (webcamRef.current && (webcamRef.current.videoWidth === 0 || webcamRef.current.videoHeight === 0)) {
            console.log("Camera may be blocked - no video dimensions");
            cameraActive = false;
          }
        } catch (frameError) {
          console.error("Error checking video frame:", frameError);
        }
      }
      
      // Calculate body language score based on camera status
      if (cameraActive) {
        // If camera is active, calculate a score between 60-90 based on participation
        const participationFactor = answers.filter(a => a && a.trim().length > 0).length / Math.max(1, answers.length);
        bodyLanguageScore = Math.round(60 + (participationFactor * 30));
      } else {
        // If camera is not active or blocked, score is 0
        bodyLanguageScore = 0;
      }
    } catch (error) {
      console.error("Error checking camera status:", error);
      cameraActive = false;
      bodyLanguageScore = 0;
    }
    
    // Log camera status for debugging
    console.log("Camera active:", cameraActive, "Body language score:", bodyLanguageScore);
    
    // Overall score is weighted average, but zero if no participation and no camera
    let overallScore = 0
    if (hasParticipated || bodyLanguageScore > 0) {
      overallScore = Math.round(answerQualityScore * 0.5 + communicationScore * 0.3 + bodyLanguageScore * 0.2)
    }

    // Generate strengths and improvements based on scores
    const strengths: string[] = []
    const improvements: string[] = []

    // Add strengths
    if (avgWordCount > 150) strengths.push("Provided detailed responses")
    if (answerQualityScore > 70) strengths.push("Demonstrated good knowledge of subject matter")
    if (communicationScore > 70) strengths.push("Communicated ideas clearly")

    // Fill remaining strengths
    while (strengths.length < 3) {
      const defaultStrengths = [
        "Showed enthusiasm for the position",
        "Structured answers logically",
        "Used relevant examples",
        "Demonstrated problem-solving skills",
        "Maintained good pacing in responses",
        "Showed confidence in your abilities",
      ]

      for (const strength of defaultStrengths) {
        if (!strengths.includes(strength)) {
          strengths.push(strength)
          break
        }
      }

      if (strengths.length >= 3) break
    }

    // Add improvements
    if (avgWordCount < 100) improvements.push("Provide more detailed responses")
    if (answerQualityScore < 70) improvements.push("Include more specific examples in your answers")
    if (communicationScore < 70) improvements.push("Work on clearer communication and structure")

    // Fill remaining improvements
    while (improvements.length < 3) {
      const defaultImprovements = [
        "Practice more concise responses",
        "Research common interview questions for better preparation",
        "Use the STAR method for behavioral questions",
        "Focus on highlighting achievements with metrics",
        "Reduce filler words in your responses",
        "Incorporate more industry-specific terminology",
      ]

      for (const improvement of defaultImprovements) {
        if (!improvements.includes(improvement)) {
          improvements.push(improvement)
          break
        }
      }

      if (improvements.length >= 3) break
    }

    return {
      overallScore,
      communicationScore: Math.round(communicationScore),
      answerQualityScore: Math.round(answerQualityScore),
      bodyLanguageScore,
      strengths: strengths.slice(0, 3),
      improvements: improvements.slice(0, 3),
      correctAnswers,
    }
  }

  // Reset the interview to start over
  const resetInterview = () => {
    // Stop speech recognition
    stopSpeechRecognition()

    // Stop all media tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }

    // Reset all state
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
                              {message.role === "assistant" ? (
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI" />
                              ) : (
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                              )}
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
                              {message.role === "assistant" &&
                                interviewState === "completed" &&
                                results?.correctAnswers &&
                                index > 0 &&
                                index % 2 === 0 && (
                                  <div className="mt-2 text-xs text-muted-foreground">
                                    <details>
                                      <summary className="cursor-pointer font-medium">View model answer</summary>
                                      <div className="mt-1 p-2 bg-muted/50 rounded-md">
                                        {results.correctAnswers[Math.floor(index / 2)] || "No model answer available."}
                                      </div>
                                    </details>
                                  </div>
                                )}
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
                <h3 className="font-medium">Body Language</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Maintain good posture</li>
                  <li>Make appropriate eye contact</li>
                  <li>Use hand gestures naturally</li>
                  <li>Smile and show engagement</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Answer Structure</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Use the STAR method for behavioral questions</li>
                  <li>Be concise but thorough</li>
                  <li>Provide specific examples</li>
                  <li>Connect your experience to the job requirements</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

