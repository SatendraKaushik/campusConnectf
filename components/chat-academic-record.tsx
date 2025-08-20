"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { parseAcademicRecordFromImage, ParsedData } from "@/utils/AcademicRecordParser"
import { toast } from "sonner"

interface ChatAcademicRecordProps {
  documentUrl: string;
}

export default function ChatAcademicRecord({ documentUrl }: ChatAcademicRecordProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [parsedData, setParsedData] = useState<ParsedData | null>(null)

  const handleScan = async () => {
    try {
      setIsScanning(true)
      const extractedData = await parseAcademicRecordFromImage(documentUrl)
      setParsedData(extractedData)
      toast.success("Academic record scanned successfully")
    } catch (error) {
      console.error("Error scanning academic record:", error)
      toast.error("Failed to scan academic record")
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Academic Record Analysis</CardTitle>
        <CardDescription>View extracted information from your academic record</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center mb-4">
          <img
            src={documentUrl}
            alt="Academic Record"
            className="max-w-full h-auto max-h-64 object-contain rounded-md border"
          />
        </div>

        <Button
          onClick={handleScan}
          disabled={isScanning}
          className="w-full"
        >
          {isScanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Document...
            </>
          ) : (
            "Analyze Document"
          )}
        </Button>

        {parsedData && (
          <div className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm font-medium mb-2">Semester GPA (SGPA)</p>
                  <p className="text-3xl font-bold">{parsedData.sgpa.toFixed(2)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm font-medium mb-2">Cumulative GPA (CGPA)</p>
                  <p className="text-3xl font-bold">{parsedData.cgpa.toFixed(2)}</p>
                </CardContent>
              </Card>
            </div>

            {parsedData.courses && parsedData.courses.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Course Details</h3>
                <div className="space-y-3">
                  {parsedData.courses.map((course, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{course.name}</p>
                            <p className="text-sm text-muted-foreground">{course.code}</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant="outline"
                              className={`
                                ${course.grade === "A" || course.grade === "A+" ? "bg-green-100 text-green-800" :
                                  course.grade === "A-" || course.grade === "B+" ? "bg-blue-100 text-blue-800" :
                                  course.grade === "B" || course.grade === "B-" ? "bg-yellow-100 text-yellow-800" :
                                  "bg-red-100 text-red-800"}
                              `}
                            >
                              {course.grade}
                            </Badge>
                            <p className="text-sm mt-1">{course.credits} Credits</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}