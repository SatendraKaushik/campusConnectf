"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { chatSession } from "@/utils/GeminiAImodel";
import { Mic, StopCircle } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { useRouter } from "next/navigation";

type InterviewData = {
  id: number;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string | null;
  mockId: string;
};
type RecordAnswerSectionProps = {
  interviewData: InterviewData | null;
  mockInterviewQuestion: any[] | null; // Replace 'any' with the actual type if known
  activeQuestionIndex: number;
};
function RecordAnswerSection({
  interviewData,
  mockInterviewQuestion,
  activeQuestionIndex,
}: RecordAnswerSectionProps) {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  
  // Update user answer when speech recognition results change
  useEffect(() => {
    results.forEach((result: any) => {
      if (typeof result !== "string" && result.transcript) {
        // Type guard
        setUserAnswer((prevAnswer) => prevAnswer + result.transcript);
      }
    });
  }, [results]);

  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setRecordingInterval(interval);
    } else {
      if (recordingInterval) {
        clearInterval(recordingInterval);
        setRecordingInterval(null);
      }
      setRecordingTime(0);
    }
    
    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  }, [isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer.length > 10) {
        // Check if userAnswer is valid before updating
        await UpdateUserAnswer();
      } else {
        toast({
          title: "Answer too short",
          description: "Please provide a more detailed answer",
          variant: "destructive",
        });
      }
    } else {
      setUserAnswer(""); // Clear previous answer when starting new recording
      startSpeechToText();
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone",
      });
    }
  };

  const UpdateUserAnswer = async () => {
    console.log("User answer:", userAnswer);
    setLoading(true);
    
    // Format the prompt for AI feedback
    const feedbackPrompt = `Question: ${mockInterviewQuestion ? mockInterviewQuestion[activeQuestionIndex]?.question : "No question available"}, 
    User Answer: ${userAnswer}, 
    Based on the question and user answer, please provide a rating for the answer (0 to 5, with 0 being an invalid response) and feedback on areas of improvement (if any) in just 3 to 5 lines. 
    Format the response in JSON with "rating" and "feedback" fields.`;

    try {
      // Get AI feedback on the answer
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      const JsonFeedbackResp = JSON.parse(mockJsonResp);
      console.log("AI Feedback:", JsonFeedbackResp);
      
      // Store the answer and feedback in localStorage for the feedback page
      const userAnswers = JSON.parse(localStorage.getItem('userAnswers') || '[]');
      userAnswers.push({
        mockIdRef: interviewData?.mockId || "",
        question: mockInterviewQuestion
          ? mockInterviewQuestion[activeQuestionIndex]?.question
          : "",
        correctAns: mockInterviewQuestion
          ? mockInterviewQuestion[activeQuestionIndex]?.answer
          : "",
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: "user@example.com", // In a real app, get this from authentication
        createdAt: moment().format("DD-MM-yyyy"),
      });
      localStorage.setItem('userAnswers', JSON.stringify(userAnswers));

      // Show success message
      toast({
        title: "Success",
        description: "Your answer has been recorded successfully",
      });
      
      // Clear the answer and results for the next question
      setUserAnswer("");
      setResults([]);
      
      // Check if this is the last question and offer to go to feedback
      if (mockInterviewQuestion && activeQuestionIndex === mockInterviewQuestion.length - 1) {
        const goToFeedback = window.confirm("You've completed all questions! Would you like to see your feedback now?");
        if (goToFeedback) {
          router.push(`/student/practice/interview/${interviewData?.mockId}/feedback`);
        }
      }
    } catch (error) {
      console.error("Error processing answer:", error);
      toast({
        title: "Error",
        description: "Failed to process your answer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Format recording time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (typeof window === undefined) return null;
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative">
        {!isRecording && !userAnswer && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 rounded-lg">
            <p className="text-white text-lg">Click "Record Answer" to begin</p>
          </div>
        )}
        <Image
          alt="web-cam"
          priority={true}
          src={"/placeholder.svg"} // Using a placeholder image
          width={200}
          height={200}
          className="absolute z-0"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 500,
            width: 500,
            zIndex: 10,
          }}
        />
        {isRecording && (
          <div className="absolute top-5 right-5 bg-red-600 text-white px-3 py-1 rounded-full animate-pulse">
            Recording {formatTime(recordingTime)}
          </div>
        )}
      </div>
      
      {userAnswer && !isRecording && (
        <div className="mt-5 p-4 border rounded-lg w-full max-w-lg">
          <h3 className="font-medium mb-2">Your current answer:</h3>
          <p className="text-sm">{userAnswer}</p>
        </div>
      )}
      
      <Button
        disabled={loading}
        variant={isRecording ? "destructive" : "outline"}
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-white flex gap-2 items-center">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
      
      {loading && (
        <div className="text-center text-sm text-gray-500">
          Processing your answer...
        </div>
      )}
    </div>
  );
}

export default RecordAnswerSection;