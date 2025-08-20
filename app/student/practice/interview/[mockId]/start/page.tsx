"use client";
import { useState, useEffect } from "react";
import QuestionsSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

function Start({ params }: InterviewProp) {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null
  );
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<
    any[] | null
  >(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  useEffect(() => {
    getInterviewDetails();
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
    
    try {
      const jsonMockResp = JSON.parse(mockData.jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      console.log(jsonMockResp);
    } catch (error) {
      console.error("JSON parsing error:", error);
    }
  }
  
  return (
    <DashboardLayout userType="student">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {mockInterviewQuestion?.length &&
          activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            >
              Next Question
            </Button>
          )}
        {mockInterviewQuestion?.length &&
          activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
            <Link
              href={
                "/student/practice/interview/" + interviewData?.mockId + "/feedback"
              }
            >
              <Button>End Interview</Button>
            </Link>
          )}
      </div>
    </DashboardLayout>
  );
}

export default Start;