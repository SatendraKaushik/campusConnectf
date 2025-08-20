"use client"
import { useState, useEffect, useRef } from 'react';
import { jsPDF } from "jspdf";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, MapPin, Download } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyCd-td1UuOoCMLIr2edx_XfYW1mPhbYlEc");

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  flowchart: { useMaxWidth: true, curve: 'cardinal' }
});

export default function RoadmapPage() {
  const [step, setStep] = useState(1);
  const [skill, setSkill] = useState('');
  const [techStack, setTechStack] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [learningGoal, setLearningGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [flowchartCode, setFlowchartCode] = useState(null);
  const [error, setError] = useState(null); // Add error state
  const mermaidRef = useRef(null);

  // Generate flowchart code using only headings (##) as nodes
  const generateFlowchartCode = (markdownText) => {
    if (!markdownText) return null;

    // Extract only lines that start with ## (headings)
    const lines = markdownText.split('\n').filter(line => line.trim().startsWith('## '));
    if (lines.length === 0) {
      setError("No headings found in the roadmap to generate a flowchart.");
      return null;
    }

    let mermaidCode = 'graph TD;\n';
    let nodeCount = 1;
    let previousNode = 'A';

    mermaidCode += `A[Start: ${skill}];\n`;
    const mainSections = lines.slice(0, 10); // Limit to 10 blocks
    mainSections.forEach((line) => {
      const section = line.replace('## ', '').trim();
      if (section) { // Ensure the section isn't empty
        const currentNode = `N${nodeCount++}`;
        mermaidCode += `${currentNode}["${section}"];\n`;
        mermaidCode += `${previousNode} --> ${currentNode};\n`;
        previousNode = currentNode;
      }
    });
    mermaidCode += `END[Goal: ${learningGoal || 'Mastery'}];\n`;
    mermaidCode += `${previousNode} --> END;\n`;
    return mermaidCode;
  };

  // Generate roadmap with a refined prompt
  const generateRoadmap = async () => {
    if (!skill || !techStack || !experienceLevel || !learningGoal) {
      setError("Please fill in all fields before generating the roadmap.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error state
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `Create a concise learning roadmap for ${skill} in ${techStack}. 
      The user has ${experienceLevel} experience and aims to ${learningGoal}.
      Use markdown format with exactly 5 main sections (each starting with ##), 
      and under each section, include 2-3 subtopics as a numbered list (e.g., 1. Subtopic).
      Ensure the markdown is clean and properly formatted for rendering. 
      Tailor the roadmap to the user's experience and goal.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setRoadmapData(text);
      const generatedFlowchartCode = generateFlowchartCode(text);
      if (generatedFlowchartCode) {
        setFlowchartCode(generatedFlowchartCode);
      }
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Simplified PDF download
  const downloadPDF = () => {
    if (!roadmapData) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Roadmap: ${skill}`, 20, 20);
    doc.setFontSize(10);
    doc.text(roadmapData, 20, 30, { maxWidth: 160 });
    doc.save(`${skill}_Roadmap.pdf`);
  };

  useEffect(() => {
    if (flowchartCode && mermaidRef.current) {
      mermaid.render('mermaidChart', flowchartCode).then(({ svg }) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg;
        }
      }).catch(err => {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render flowchart.");
      });
    }
  }, [flowchartCode]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <DashboardLayout userType="student">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Learning Roadmap</h1>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" /> Create Your Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <>
                <Input placeholder="Skill (e.g., React.js)" value={skill} onChange={(e) => setSkill(e.target.value)} />
                <Button onClick={nextStep} disabled={!skill}>Next</Button>
              </>
            )}
            {step === 2 && (
              <>
                <Select onValueChange={setTechStack} value={techStack}>
                  <SelectTrigger><SelectValue placeholder="Tech Stack" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Backend Development">Backend Development</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={prevStep} variant="outline">Back</Button>
                <Button onClick={nextStep} disabled={!techStack}>Next</Button>
              </>
            )}
            {step === 3 && (
              <>
                <Select onValueChange={setExperienceLevel} value={experienceLevel}>
                  <SelectTrigger><SelectValue placeholder="Experience Level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={prevStep} variant="outline">Back</Button>
                <Button onClick={nextStep} disabled={!experienceLevel}>Next</Button>
              </>
            )}
            {step === 4 && (
              <>
                <Input placeholder="Learning Goal" value={learningGoal} onChange={(e) => setLearningGoal(e.target.value)} />
                <Button onClick={prevStep} variant="outline">Back</Button>
                <Button onClick={generateRoadmap} disabled={loading || !learningGoal}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Generate'}
                </Button>
              </>
            )}

            {roadmapData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div ref={mermaidRef} className="overflow-x-auto p-4 bg-gray-50 rounded" />
                <div className="prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{roadmapData}</ReactMarkdown>
                  <Button onClick={downloadPDF} variant="outline" className="mt-4">
                    <Download className="h-4 w-4 mr-2" /> Download PDF
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}