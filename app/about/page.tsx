import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  // Hardcoded data for demonstration
  const collegeInfo = {
    name: "Delhi Technological University",
    established: 1941,
    location: "New Delhi, India",
    students: "15,000+",
    faculty: "500+",
    courses: "50+",
    accreditation: "NAAC 'A++' Grade",
    ranking: "Among Top 10 Technical Institutes in India",
    vision:
      "To be a global leader in education and research in engineering and technology, fostering innovation and entrepreneurship for societal development.",
    mission:
      "To provide quality education and research opportunities in engineering and technology, nurture talent, foster innovation, and promote ethical values and leadership qualities.",
  }

  const achievements = [
    {
      title: "Research Excellence",
      description:
        "Over 5000+ research papers published in international journals and conferences in the last 5 years.",
      icon: "/placeholder.svg?height=60&width=60",
    },
    {
      title: "Industry Partnerships",
      description: "Collaborations with 100+ leading companies for research, internships, and placements.",
      icon: "/placeholder.svg?height=60&width=60",
    },
    {
      title: "Placements",
      description: "95% placement rate with top companies like Google, Microsoft, Amazon, and more.",
      icon: "/placeholder.svg?height=60&width=60",
    },
    {
      title: "Innovation Hub",
      description: "Incubation center supporting 50+ startups founded by students and alumni.",
      icon: "/placeholder.svg?height=60&width=60",
    },
  ]

  const departments = [
    "Computer Science & Engineering",
    "Information Technology",
    "Electronics & Communication Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Biotechnology",
    "Software Engineering",
  ]

  const campusConnect = {
    description:
      "Campus Connect is a comprehensive web portal designed to facilitate student-centric interactions and administrative functionalities. The portal enables students to access their performance records, connect with seniors, and provides college administrators with tools to manage student data effectively.",
    features: [
      "Student Performance Tracking",
      "Senior-Junior Connectivity",
      "Mentor Sessions",
      "Resource Library",
      "Placement Portal",
      "Academic Records Management",
      "Events Calendar",
      "Analytics Dashboard",
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="relative text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: 'url("https://www.abesit.in/wp-content/uploads/2023/07/desktop-banner-abesit.webp")' }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="container mx-auto py-12 px-4 relative z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full p-2">
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
                  className="text-blue-600"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Campus Connect</h1>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" className="text-white hover:bg-blue-500" asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button variant="ghost" className="text-white hover:bg-blue-500" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
          <div className="mt-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About {collegeInfo.name}</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Established in {collegeInfo.established}, we are committed to excellence in education, research, and
              innovation.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our History</h2>
              <p className="text-gray-600 mb-4">
                {collegeInfo.name} was established in {collegeInfo.established} as a premier institution for technical
                education in India. Over the decades, it has evolved into one of the country's leading universities,
                known for its academic excellence, research contributions, and industry connections.
              </p>
              <p className="text-gray-600 mb-4">
                The university has a rich legacy of producing some of the finest engineers and technologists who have
                made significant contributions to various fields both in India and globally.
              </p>
              <p className="text-gray-600">
                Today, with {collegeInfo.students} students and {collegeInfo.faculty} faculty members, we continue to
                push the boundaries of knowledge and innovation.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image src="https://www.abesit.in/wp-content/uploads/2023/07/desktop-banner-abesit.webp" alt="College Campus" fill className="object-cover" />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Vision & Mission</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-blue-600">Our Vision</h3>
                <p className="text-gray-600">{collegeInfo.vision}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-blue-600">Our Mission</h3>
                <p className="text-gray-600">{collegeInfo.mission}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Achievements</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 rounded-full p-4">
                      <Image
                        src={achievement.icon || "/placeholder.svg"}
                        alt={achievement.title}
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Academic Departments</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((department, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">{department}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Campus Connect</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://www.abesit.in/wp-content/uploads/2023/07/desktop-banner-abesit.webp"
                alt="Campus Connect Platform"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-gray-600 mb-6">{campusConnect.description}</p>
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {campusConnect.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/register">Join Campus Connect</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-12">
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
                  <Link href="/" className="text-gray-600 hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-blue-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-600 hover:text-blue-600">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-blue-600">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-600 hover:text-blue-600">
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
                <Link href="#" className="text-gray-600 hover:text-blue-600">
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
                <Link href="#" className="text-gray-600 hover:text-blue-600">
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