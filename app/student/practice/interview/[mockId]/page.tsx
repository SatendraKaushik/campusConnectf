"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Webcam from "react-webcam";
import DashboardLayout from "@/components/dashboard-layout";

type InterviewProp = {
  params: { mockId: string };
};

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

function Interview({ params }: InterviewProp) {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null
  );
  const [webCamEnabled, setWebCamEnabled] = useState<boolean>(false);
  
  useEffect(() => {
    console.log(params.mockId);
    getInterviewDetails();
    console.log(interviewData);
  }, []);
  
  async function getInterviewDetails() {
    // This is a placeholder. In a real implementation, you would fetch data from your database
    // For now, we'll use mock data
    const mockData = {
      id: 1,
      jsonMockResp: JSON.stringify([
        {
          question: "Tell me about your experience with React.js?",
          answer: "I have been working with React.js for over 2 years. I've built several web applications using React, including e-commerce platforms, dashboards, and social media applications. I'm familiar with hooks, context API, and state management libraries like Redux."
        },
        {
          question: "How do you handle state management in large React applications?",
          answer: "For large React applications, I prefer using Redux or Context API depending on the complexity. For simpler applications, React's built-in useState and useReducer hooks are sufficient. I also follow best practices like lifting state up and using component composition to minimize prop drilling."
        },
        {
          question: "Explain the concept of virtual DOM in React.",
          answer: "The Virtual DOM is a lightweight copy of the actual DOM in memory. When state changes in a React component, React creates a new Virtual DOM tree and compares it with the previous one (diffing). It then updates only the parts of the actual DOM that have changed, rather than re-rendering the entire DOM tree. This approach improves performance significantly."
        },
        {
          question: "How do you optimize performance in React applications?",
          answer: "To optimize React performance, I use techniques like: 1) Memoization with React.memo, useMemo, and useCallback to prevent unnecessary re-renders, 2) Code splitting with React.lazy and Suspense to reduce initial load time, 3) Virtualization for long lists using libraries like react-window, 4) Proper management of component state to minimize renders, and 5) Using the production build for deployment."
        },
        {
          question: "What are your experiences with testing React applications?",
          answer: "I have experience with Jest and React Testing Library for unit and integration testing. I follow the testing pyramid approach with more unit tests than integration tests. I write tests for components, hooks, and utilities. For complex applications, I also use Cypress for end-to-end testing to ensure the application works correctly from a user's perspective."
        }
      ]),
      jobPosition: "Frontend Developer",
      jobDesc: "React, JavaScript, TypeScript, CSS",
      jobExperience: "2-3 years",
      createdBy: "admin@example.com",
      createdAt: new Date().toISOString(),
      mockId: params.mockId
    };
    
    setInterviewData(mockData);
  }
  
  return (
    <DashboardLayout userType="student">
      <div className="my-10">
        <h2 className="font-bold text-2xl">Let&apos;s Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col my-5 gap-5">
            <div className="flex flex-col p-5 rounded-lg border gap-5">
              <h2 className="text-lg">
                <strong>Job Role/Job Position:</strong>{" "}
                {interviewData?.jobPosition}{" "}
              </h2>
              <h2 className="text-lg">
                <strong>Job Description/Tech Stack:</strong>{" "}
                {interviewData?.jobDesc}{" "}
              </h2>
              <h2 className="text-lg">
                <strong>Years of Experience:</strong>{" "}
                {interviewData?.jobExperience}{" "}
              </h2>
            </div>
            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
              <h2 className="flex gap-2 items-center text-yellow-500">
                {" "}
                <Lightbulb />
                <strong>Information</strong>
              </h2>
              <h2 className="mt-3 text-yellow-500">
                Enable Video Web Cam and Microphone to Start your AI Generated
                Mock Interview, It Has 5 question which you can answer and at the
                last you will get the report on the basis of your answer. 
              </h2>
            </div>
          </div>
          <div>
            {webCamEnabled ? (
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                style={{
                  height: 300,
                  width: 300,
                }}
              />
            ) : (
              <>
                <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setWebCamEnabled(true)}
                >
                  Enable Web Cam and Microphone
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end items-end">
          <Link href={"/student/practice/interview/" + params.mockId + "/start"}>
            <Button className="text-white">Start Interview</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Interview;