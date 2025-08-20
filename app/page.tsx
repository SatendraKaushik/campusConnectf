import { Button } from "@/components/ui/button"
import { QuickStartModal } from "@/components/quick-start-modal"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
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
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/features">Features</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
      
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
         
        </div>
      </header>

      <main>
        {/* Hero section with background image */}
        <div className="relative py-20 mb-12 z-0">
          {/* Background image */}
          <div className="absolute inset-0 z-0 ">
            <Image
              src="https://www.abesit.in/wp-content/uploads/2023/07/desktop-banner-abesit.webp"
              alt="Campus Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Connect, Collaborate, and Grow with Campus Connect
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                A comprehensive platform designed to enhance student experience, facilitate mentorship, and streamline
                academic management.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
                  <Link href="/login">Get Started</Link>
                </Button>
                <QuickStartModal />
                <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100" asChild>
                  <Link href="/features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Track your coding progress across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center bg-gray-100 rounded-md">
                  <img
                    src="https://www.abesit.in/wp-content/uploads/2023/05/home-ban-3-scaled.jpg"
                    alt="ABESIT Banner"
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/login">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connect with Seniors</CardTitle>
                <CardDescription>Build valuable connections for guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center bg-gray-100 rounded-md">
                  <img
                    src="https://www.abesit.in/wp-content/uploads/2023/05/home-ban-1-scaled.jpg"
                    alt="ABESIT Banner"
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/login">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mentor Sessions</CardTitle>
                <CardDescription>Participate in expert-led learning sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center bg-gray-100 rounded-md">
                  <img
                    src="https://www.abesit.in/wp-content/uploads/2023/05/abes_img.jpg"
                    alt="ABESIT Banner"
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/login">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 mt-24 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Campus Connect</h3>
              <p className="text-gray-600">Empowering students through connectivity and collaboration.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-gray-600 hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-600 hover:text-primary">
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
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-primary">
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
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-primary">
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
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>© 2024 Campus Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}