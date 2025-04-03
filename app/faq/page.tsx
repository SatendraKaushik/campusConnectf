import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, Mail } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  // Hardcoded data for demonstration
  const generalFAQs = [
    {
      id: "general-1",
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to the login page and click on 'Forgot Password'. Enter your registered email address, and you will receive a password reset link. Follow the instructions in the email to create a new password.",
    },
    {
      id: "general-2",
      question: "How can I update my profile information?",
      answer:
        "You can update your profile information by navigating to the Settings page from your dashboard. Click on the 'Edit Profile' button, make the necessary changes, and click 'Save Changes' to update your information.",
    },
    {
      id: "general-3",
      question: "How do I connect with seniors on the platform?",
      answer:
        "To connect with seniors, go to the 'Seniors' page from your dashboard. You can browse through the list of seniors, filter them by branch or interests, and click on the 'Connect' button to send a connection request.",
    },
    {
      id: "general-4",
      question: "Can I delete my account?",
      answer:
        "Yes, you can delete your account by going to the Settings page and scrolling down to the 'Danger Zone' section. Click on 'Deactivate Account' and follow the instructions. Please note that this action is irreversible and all your data will be permanently deleted.",
    },
    {
      id: "general-5",
      question: "How do I report inappropriate content or behavior?",
      answer:
        "If you come across any inappropriate content or behavior, you can report it by clicking on the 'Report' button available on posts, messages, or user profiles. Provide the necessary details, and our team will review the report and take appropriate action.",
    },
  ]

  const academicFAQs = [
    {
      id: "academic-1",
      question: "How can I access my academic records?",
      answer:
        "You can access your academic records by navigating to the 'Academic Records' page from your dashboard. Here, you can view your semester-wise results, CGPA, and other academic information.",
    },
    {
      id: "academic-2",
      question: "How do I register for mentor sessions?",
      answer:
        "To register for mentor sessions, go to the 'Mentor Sessions' page from your dashboard. Browse through the available sessions, click on 'Register Now' for the session you're interested in, and follow the instructions to complete the registration.",
    },
    {
      id: "academic-3",
      question: "Where can I find study materials for my courses?",
      answer:
        "You can find study materials for your courses in the 'Resource Library' section. Here, you can browse through study materials, past papers, video lectures, and useful links categorized by subject and course.",
    },
    {
      id: "academic-4",
      question: "How do I track my coding platform performance?",
      answer:
        "Your coding platform performance is automatically tracked and displayed on your 'Performance' page. You can view your progress on platforms like LeetCode, CodeChef, GeeksforGeeks, and Coding Ninjas, including problems solved, ratings, and rankings.",
    },
    {
      id: "academic-5",
      question: "Can I download my academic certificates?",
      answer:
        "Yes, you can download your academic certificates from the 'Academic Records' page. Navigate to the 'Certificates' tab, select the certificate you want to download, and click on the 'Download' button.",
    },
  ]

  const placementFAQs = [
    {
      id: "placement-1",
      question: "How do I apply for job openings through the platform?",
      answer:
        "To apply for job openings, go to the 'Placement Portal' from your dashboard. Browse through the available openings, click on 'Apply Now' for the position you're interested in, and follow the instructions to complete your application.",
    },
    {
      id: "placement-2",
      question: "What resources are available for placement preparation?",
      answer:
        "The platform offers various resources for placement preparation, including resume templates, interview preparation guides, technical and HR interview questions, mock interview sessions, and skill development courses. You can access these resources from the 'Placement Portal' under the 'Preparation Resources' tab.",
    },
    {
      id: "placement-3",
      question: "How can I check my eligibility for a particular company?",
      answer:
        "Each company listing in the 'Placement Portal' includes eligibility criteria such as minimum CGPA, branch restrictions, and other requirements. You can check these criteria to determine your eligibility for a particular company.",
    },
    {
      id: "placement-4",
      question: "How do I schedule a mock interview?",
      answer:
        "To schedule a mock interview, go to the 'Placement Portal' and navigate to the 'Preparation Resources' tab. Click on 'Mock Interview Sessions', select a convenient time slot, and book your session. You will receive a confirmation email with the details.",
    },
    {
      id: "placement-5",
      question: "Where can I find placement statistics?",
      answer:
        "Placement statistics are available in the 'Placement Portal' under the 'Statistics' tab. Here, you can view overall placement rates, branch-wise placement data, package distributions, and top recruiters.",
    },
  ]

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Find answers to common questions about Campus Connect</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search for answers..." className="pl-10 h-12" />
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="placement">Placement</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>General Questions</CardTitle>
                <CardDescription>Answers to common questions about using Campus Connect</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {generalFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Questions</CardTitle>
                <CardDescription>Answers to questions about academic features and resources</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {academicFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="placement" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Questions</CardTitle>
                <CardDescription>Answers to questions about placements and career opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {placementFAQs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-muted rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 bg-primary/10 rounded-full p-4">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-semibold mb-2">Couldn't find what you're looking for?</h2>
              <p className="text-muted-foreground mb-4">
                If you couldn't find the answer to your question, feel free to contact our support team. We're here to
                help you with any queries or issues you might have.
              </p>
              <Button asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

