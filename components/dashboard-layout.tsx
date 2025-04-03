"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronDown,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Trophy,
  Users,
  FileText,
  Bell,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useSidebar } from "./sidebar-provider"

type NavItem = {
  title: string
  href: string
  icon: React.ElementType
}

type DashboardLayoutProps = {
  children: React.ReactNode
  userType: "student" | "admin" | "senior"
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { isOpen, toggle, close } = useSidebar()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const studentNavItems: NavItem[] = [
    { title: "Dashboard", href: "/student/dashboard", icon: Home },
    { title: "Performance", href: "/student/performance", icon: BarChart3 },
    { title: "Seniors", href: "/student/seniors", icon: Users },
    { title: "Posts", href: "/student/posts", icon: FileText },
    { title: "Jobs", href: "/student/jobs", icon: Briefcase },
    { title: "Mentor Sessions", href: "/student/mentor-sessions", icon: Calendar },
    { title: "Leaderboard", href: "/student/leaderboard", icon: Trophy },
    { title: "Messages", href: "/student/messages", icon: MessageSquare },
    { title: "Academic Records", href: "/student/academic-records", icon: BookOpen },
    { title: "Practice", href: "/student/practice", icon: BookOpen },
  ]

  const adminNavItems: NavItem[] = [
    { title: "Dashboard", href: "/admin/dashboard", icon: Home },
    { title: "Student Records", href: "/admin/student-records", icon: Users },
    { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { title: "Jobs", href: "/admin/jobs", icon: Briefcase },
    { title: "Posts", href: "/admin/posts", icon: FileText },
    { title: "Mentor Sessions", href: "/admin/mentor-sessions", icon: Calendar },
    { title: "Messages", href: "/admin/messages", icon: MessageSquare },
    { title: "Settings", href: "/admin/settings", icon: Settings },
  ]

  const seniorNavItems: NavItem[] = [
    { title: "Dashboard", href: "/senior/dashboard", icon: Home },
    { title: "Students", href: "/senior/students", icon: Users },
    { title: "Senior Network", href: "/senior/network", icon: Users },
    { title: "Mentor Sessions", href: "/senior/mentor-sessions", icon: Calendar },
    { title: "Posts", href: "/senior/posts", icon: FileText },
    { title: "Messages", href: "/senior/messages", icon: MessageSquare },
  ]

  const navItems = userType === "student" ? studentNavItems : userType === "admin" ? adminNavItems : seniorNavItems

  const userInfo = {
    student: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "https://png.pngtree.com/png-clipart/20230102/original/pngtree-business-man-avatar-png-image_8855195.png",
      role: "Student",
    },
    admin: {
      name: "Admin User",
      email: "admin@example.com",
      avatar: "https://png.pngtree.com/png-clipart/20230102/original/pngtree-business-man-avatar-png-image_8855195.png",
      role: "Administrator",
    },
    senior: {
      name: "Sarah Miller",
      email: "sarah.miller@example.com",
      avatar: "https://png.pngtree.com/png-clipart/20230102/original/pngtree-business-man-avatar-png-image_8855195.png",
      role: "Senior Student",
    }
  }

  const currentUser = userInfo[userType]

  if (!mounted) return null

  return (
    <div className="flex min-h-screen overflow-hidden">
    {/* Desktop Sidebar */}
    <aside className="hidden md:flex md:flex-col md:w-64 border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <div className="bg-primary rounded-full p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
        <h1 className="text-xl font-bold text-primary">Campus Connect</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon size={18} />
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
        <div className="p-4 border-t border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">{currentUser.name}</span>
                    <span className="text-xs text-gray-500">{currentUser.role}</span>
                  </div>
                  <ChevronDown size={16} className="ml-auto" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/${userType}/profile`} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${userType}/settings`} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login" className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={toggle}>
        <SheetContent side="left" className="p-0 w-64">
          <div className="p-4 border-b border-gray-200 flex items-center gap-2">
            <div className="bg-primary rounded-full p-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            <h1 className="text-xl font-bold text-primary">Campus Connect</h1>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={close}
                    >
                      <item.icon size={18} />
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start px-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-sm">
                      <span className="font-medium">{currentUser.name}</span>
                      <span className="text-xs text-gray-500">{currentUser.role}</span>
                    </div>
                    <ChevronDown size={16} className="ml-auto" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/${userType}/profile`} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${userType}/settings`} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login" className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6">
          <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggle}>
            <Menu size={20} />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/${userType}/profile`} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${userType}/settings`} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/login" className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}