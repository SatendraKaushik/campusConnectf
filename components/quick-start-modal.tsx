"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  ArrowRight, 
  Brain, 
  LayoutDashboard, 
  UserCircle, 
  Briefcase, 
  Trophy, 
  GraduationCap, 
  LineChart 
} from "lucide-react";

export function QuickStartModal() {
  const [open, setOpen] = React.useState(false);

  const solutions = [
    { 
      title: "AI Interview", 
      icon: Brain, 
      color: "text-blue-600",
      description: "Practice interviews with AI feedback and improve your skills"
    },
    { 
      title: "Faculty Dashboard", 
      icon: LayoutDashboard, 
      color: "text-blue-600",
      description: "Manage courses, track student progress, and optimize teaching"
    },
    { 
      title: "Student Profile", 
      icon: UserCircle, 
      color: "text-blue-600",
      description: "Build your digital portfolio with skills, projects, and achievements"
    },
    { 
      title: "Job Matching", 
      icon: Briefcase, 
      color: "text-blue-600",
      description: "Get matched with job opportunities based on your unique profile"
    },
    { 
      title: "Leaderboard", 
      icon: Trophy, 
      color: "text-blue-600",
      description: "Track performance rankings and celebrate achievements"
    },
    { 
      title: "Placement", 
      icon: GraduationCap, 
      color: "text-blue-600",
      description: "Connect with employers and explore career opportunities"
    },
    { 
      title: "Analytics", 
      icon: LineChart, 
      color: "text-blue-600",
      description: "Gain insights from performance metrics and progress tracking"
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200"
        >
          Start Your Journey
          <ArrowRight className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-lg p-6">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Welcome to Campus Connect
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 mt-2">
            Your gateway to academic excellence and career success
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center justify-center p-4 border border-gray-100 rounded-lg bg-gray-50 hover:shadow-md hover:border-blue-200 transition-all duration-300 group cursor-pointer h-32"
            >
              <solution.icon className={`w-8 h-8 ${solution.color} mb-3 group-hover:scale-110 transition-transform duration-300`} />
              <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {solution.title}
              </span>
              
              {/* Hidden details that appear on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-95 p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-blue-200 shadow-lg">
                <solution.icon className={`w-6 h-6 ${solution.color} mb-2`} />
                <h4 className="text-sm font-bold text-gray-900 mb-1">{solution.title}</h4>
                <p className="text-xs text-gray-600 text-center">
                  {solution.description}
                </p>
                <Button variant="ghost" size="sm" className="mt-2 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1 h-auto">
                  Learn more
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="flex justify-center mt-6">
          <Button
            onClick={() => window.location.href = "/login"}
            className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
          >
            Begin Your Journey
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}