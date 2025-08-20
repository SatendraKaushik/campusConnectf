"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { parseAcademicRecordFromImage, updateAcademicRecordWithParsedData, ParsedData } from "@/utils/AcademicRecordParser"
import { Loader2 } from "lucide-react"

interface ScanAcademicRecordProps {
  recordId: string;
  documentUrl: string;
  onScanComplete: (parsedData: ParsedData) => void;
}

export default function ScanAcademicRecord({ 
  recordId, 
  documentUrl, 
  onScanComplete 
}: ScanAcademicRecordProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [parsedData, setParsedData] = useState<ParsedData | null>(null)

  const handleScan = async () => {
    try {
      setIsScanning(true)
      
      // Parse the academic record from the image
      const extractedData = await parseAcademicRecordFromImage(documentUrl)
      
      // Update the state with the parsed data
      setParsedData(extractedData)
      setScanComplete(true)
      
      // Update the academic record in the database
      const updateSuccess = await updateAcademicRecordWithParsedData(recordId, extractedData)
      
      if (updateSuccess) {
        toast.success("Academic record scanned and updated successfully")
        // Call the callback function with the parsed data
        onScanComplete(extractedData)
      } else {
        toast.error("Failed to update academic record")
      }
    } catch (error) {
      console.error("Error scanning academic record:", error)
      toast.error("Failed to scan academic record")
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Academic Record</CardTitle>
        <CardDescription>
          Use AI to extract information from your academic record
        </CardDescription>
      </CardHeader>
      <CardContent>
        {scanComplete && parsedData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 p-6 bg-muted rounded-lg mb-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold">{parsedData.sgpa}</h3>
                <p className="text-sm text-muted-foreground">SGPA</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold">{parsedData.cgpa}</h3>
                <p className="text-sm text-muted-foreground">CGPA</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Detailed Information</h3>
              <div className="rounded-md border p-4">
                {parsedData.courses && parsedData.courses.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Courses</p>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 p-2 font-medium border-b text-xs">
                        <div className="col-span-2">Code</div>
                        <div className="col-span-5">Name</div>
                        <div className="col-span-2">Credits</div>
                        <div className="col-span-2">Grade</div>
                        <div className="col-span-1">Points</div>
                      </div>
                      <div className="divide-y">
                        {parsedData.courses.map((course, index) => (
                          <div key={index} className="grid grid-cols-12 p-2 items-center text-xs">
                            <div className="col-span-2 font-medium">{course.code}</div>
                            <div className="col-span-5">{course.name}</div>
                            <div className="col-span-2">{course.credits}</div>
                            <div className="col-span-2">{course.grade}</div>
                            <div className="col-span-1">{course.points}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-center text-muted-foreground mb-4">
              Click the button below to scan your academic record and extract information
            </p>
            <img 
              src={documentUrl} 
              alt="Academic Record" 
              className="max-w-full h-auto max-h-64 object-contain mb-4 border rounded-md" 
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleScan}
          disabled={isScanning || scanComplete}
        >
          {isScanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : scanComplete ? (
            "Scan Complete"
          ) : (
            "Scan Document"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}