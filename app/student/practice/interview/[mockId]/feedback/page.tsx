"use client"
import { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import {  ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FaBackward } from 'react-icons/fa'
import DashboardLayout from '@/components/dashboard-layout'

type ResultType = {
    id?: number;
    createdAt: string | null;
    mockIdRef: string;
    question: string;
    correctAns: string | null;
    userAns: string | null;
    feedback: string | null;
    rating: string | null;
    userEmail: string | null;
}

function Feedback({ params }: { params: { mockId: string } }) {
    const [feedbackList, setFeedbackList] = useState<ResultType[]>([]);
    const router = useRouter();
    
    useEffect(() => {
        GetFeedback();
    }, [])
    
    const GetFeedback = async () => {
        // In a real implementation, you would fetch this from your database
        // For now, we'll retrieve it from localStorage
        try {
            const storedAnswers = localStorage.getItem('userAnswers');
            if (storedAnswers) {
                const answers = JSON.parse(storedAnswers);
                // Filter answers for this specific mock interview
                const filteredAnswers = answers.filter((answer: ResultType) => 
                    answer.mockIdRef === params.mockId
                );
                setFeedbackList(filteredAnswers);
            }
        } catch (error) {
            console.error("Error retrieving feedback:", error);
        }
    }

    return (
        <DashboardLayout userType="student">
            <div className='p-10'>
                {feedbackList?.length === 0 ?
                    <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2>  
                    :
                    <>
                        <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
                        <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
                        <h2 className='text-sm text-gray-500 mt-3 mb-6'>Find below interview questions with correct answers, your answers, and feedback for improvement</h2>
                        
                        {feedbackList && feedbackList.map((item, index) => (
                            <Collapsible key={index} className='mt-7'>
                                <CollapsibleTrigger className='p-2
                                bg-secondary rounded-lg flex justify-between
                                my-2 text-left gap-7 w-full'>
                                    {item.question} <ChevronsUpDown className='h-5 w-5'/>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className='flex flex-col gap-2'>
                                        <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong> {item.rating} / 5</h2>
                                        <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                                        <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                                        <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </>
                }
                
                <div className="mt-8">
                    <Button onClick={() => router.push('/student/practice')}>
                        <FaBackward size={16}/> Back to Practice Center
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Feedback