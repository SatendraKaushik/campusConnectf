"use client"
import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { toast } from "sonner"
import Axios from "@/utils/Axios"
import UploadAcademicRecord from "@/components/upload-academic-record"
import ScanAcademicRecord from "@/components/scan-academic-record"
import { Button } from "@/components/ui/button"
import { ParsedData } from "@/utils/AcademicRecordParser"

// Define types for our data structures
interface Course {
  code: string;
  name: string;
  credits: number;
  grade: string;
  points: number;
}

// Remove duplicate ParsedData interface since it's imported from AcademicRecordParser

interface AcademicRecord {
  _id: string;
  year: number;
  semester: number;
  documentType: string;
  verificationStatus: string;
  parsedData?: ParsedData;
}

interface Subject {
  name: string;
  marks: number;
}

interface SchoolRecord {
  board: string;
  year: number;
  percentage: number;
  subjects?: Subject[];
}

interface SchoolResults {
  tenth?: SchoolRecord;
  twelfth?: SchoolRecord;
}

interface AcademicStatus {
  status: string;
  cgpa: number;
  totalCredits: number;
  standing: string;
}

export default function AcademicRecordsPage() {
  const [uploadedRecords, setUploadedRecords] = useState<AcademicRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [collegeResults, setCollegeResults] = useState<AcademicRecord[]>([])
  const [schoolResults, setSchoolResults] = useState<SchoolResults | null>(null)
  const [cgpaData, setCgpaData] = useState<{ semester: string; cgpa: number }[]>([])
  const [academicStatus, setAcademicStatus] = useState<AcademicStatus>({
    status: '',
    cgpa: 0,
    totalCredits: 0,
    standing: ''
  })
  const [showUpload, setShowUpload] = useState(false)
  const [showSchoolUpload, setShowSchoolUpload] = useState(false)
  const [currentScanRecord, setCurrentScanRecord] = useState<{ id: string; documentUrl: string } | null>(null)
  const [showScanModal, setShowScanModal] = useState(false)

  const updateCGPAData = (records: AcademicRecord[]) => {
    const sortedRecords = [...records].sort((a, b) => a.semester - b.semester)
    const newCGPAData = sortedRecords.map(record => ({
      semester: `Sem ${record.semester}`,
      cgpa: record.parsedData?.cgpa || 0
    }))
    setCgpaData(newCGPAData)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAcademicRecords()
        await fetchAcademicStatus()
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    
    fetchData()
  }, [])

  const fetchAcademicRecords = async () => {
    try {
      setIsLoading(true)
      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const userId = user._id
      
      if (!userId) {
        throw new Error('User not authenticated')
      }
      
      // Fetch college records
      const recordsResponse = await Axios.get(`/academic-records/${userId}/records`)
      console.log('Records Response:', recordsResponse)
      if (recordsResponse.status === 200) {
        const records = recordsResponse.data.data.data
        console.log('Parsed Records:', records)
        // Make sure records is an array before setting state
        if (Array.isArray(records)) {
          setUploadedRecords(records)
          
          // Process college results
          const collegeData = records.filter((record: AcademicRecord) => 
            record.documentType === 'marksheet' || record.documentType === 'transcript'
          )
          setCollegeResults(collegeData)

          // Update CGPA data for chart using the helper function
          updateCGPAData(collegeData)
        } else {
          // Handle case where records is not an array
          setUploadedRecords([])
          setCollegeResults([])
          setCgpaData([])
          toast.error('Received invalid data format for academic records')
        }
      }
      
      // Fetch school records
      const schoolResponse = await Axios.get(`/academic-records/${userId}/school-results`)
      if (schoolResponse.status === 200 && schoolResponse.data.data) {
        setSchoolResults(schoolResponse.data.data)
      }
    } catch (error) {
      console.error('Error fetching records:', error)
      toast.error('Failed to fetch academic records')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAcademicStatus = async () => {
    try {
      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const userId = user._id
      
      if (!userId) {
        return
      }
      
      const statusResponse = await Axios.get(`/academic-records/${userId}/status`)
      if (statusResponse.status === 200) {
        setAcademicStatus(statusResponse.data.data)
      }
    } catch (error) {
      console.error('Error fetching academic status:', error)
    }
  }

  const handleUploadSuccess = () => {
    fetchAcademicRecords()
    setShowUpload(false)
    setShowSchoolUpload(false)
  }

  return (
    <DashboardLayout userType="student">
      {showScanModal && currentScanRecord && (
        <ScanAcademicRecord
          recordId={currentScanRecord.id}
          documentUrl={currentScanRecord.documentUrl}
          onScanComplete={async (parsedData) => {
            // Update the current record with the new parsed data
            const updatedRecords = collegeResults.map(record => 
              record._id === currentScanRecord.id 
                ? { ...record, parsedData, verificationStatus: 'verified' }
                : record
            )
            setCollegeResults(updatedRecords)
            updateCGPAData(updatedRecords)
            
            // Fetch latest academic status
            await fetchAcademicStatus()
            
            setShowScanModal(false)
            setCurrentScanRecord(null)
          }}
        />
      )}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Academic Records</h1>
          <p className="text-muted-foreground">View and manage your academic performance records.</p>
        </div>

        <Tabs defaultValue="college">
          <TabsList>
            <TabsTrigger value="college">College</TabsTrigger>
            <TabsTrigger value="school">School</TabsTrigger>
          </TabsList>
          
          <TabsContent value="college" className="mt-6 space-y-6">
            <div className="flex justify-end">
              <Button 
                onClick={() => setShowUpload(!showUpload)}
              >
                {showUpload ? "Cancel Upload" : "Upload New Record"}
              </Button>
            </div>
            
            {showUpload && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Academic Record</CardTitle>
                  <CardDescription>Upload your semester marksheet or transcript</CardDescription>
                </CardHeader>
                <CardContent>
                  <UploadAcademicRecord onUploadSuccess={handleUploadSuccess} />
                </CardContent>
              </Card>
            )}
            
            {/* Uploaded Documents Section */}
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
                <CardDescription>Your submitted academic records</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-4">Loading records...</div>
                ) : uploadedRecords.length > 0 ? (
                  <div className="space-y-4">
                    {uploadedRecords.map((record) => (
                      <div key={record._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Year {record.year} - Semester {record.semester}</h4>
                            <p className="text-sm text-gray-500">{record.documentType}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {record.verificationStatus === 'pending' && record.documentUrl && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  // Set the current record for scanning
                                  const recordToScan = {
                                    id: record._id,
                                    documentUrl: record.documentUrl
                                  };
                                  setCurrentScanRecord(recordToScan);
                                  setShowScanModal(true);
                                }}
                              >
                                Scan
                              </Button>
                            )}
                            <Badge
                              variant={record.verificationStatus === 'verified' ? 'default' : 
                                     record.verificationStatus === 'rejected' ? 'destructive' : 'outline'}
                              className={record.verificationStatus === 'verified' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                            >
                              {record.verificationStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No academic records uploaded yet
                  </div>
                )}
              </CardContent>
            </Card>

            {collegeResults.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>CGPA Progression</CardTitle>
                      <CardDescription>Your cumulative GPA across semesters</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={cgpaData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="semester" />
                          <YAxis domain={[0, 10]} />
                          <Tooltip />
                          <Bar dataKey="cgpa" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Current Status</CardTitle>
                      <CardDescription>Your academic standing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Current CGPA</p>
                            <p className="text-sm font-bold">{academicStatus.cgpa || 0}</p>
                          </div>
                          <Progress value={((academicStatus.cgpa || 0) / 10) * 100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Credits Completed</p>
                            <p className="text-sm font-bold">{academicStatus.totalCredits || 0}/180</p>
                          </div>
                          <Progress value={((academicStatus.totalCredits || 0) / 180) * 100} className="h-2" />
                        </div>
                        <div className="pt-4">
                          <p className="text-sm font-medium mb-2">Academic Standing</p>
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                            {academicStatus.standing || 'Not Available'}
                          </Badge>
                        </div>
                        <div className="pt-2">
                          <p className="text-sm font-medium mb-2">Current Semester</p>
                          <p className="text-sm">Semester {Math.max(...collegeResults.map(r => r.semester), 0) + 1} ({new Date().getFullYear()})</p>
                        </div>
                        <div className="pt-2">
                          <p className="text-sm font-medium mb-2">Expected Graduation</p>
                          <p className="text-sm">May {new Date().getFullYear() + Math.ceil((8 - Math.max(...collegeResults.map(r => r.semester), 0)) / 2)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {collegeResults.map((semester) => (
                    <Card key={semester._id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Semester {semester.semester}</CardTitle>
                            <CardDescription>Academic Year {semester.year}</CardDescription>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">SGPA</p>
                              <p className="text-2xl font-bold">{semester.parsedData?.sgpa || 0}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">CGPA</p>
                              <p className="text-2xl font-bold">{semester.parsedData?.cgpa || 0}</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <div className="grid grid-cols-12 p-4 font-medium border-b">
                            <div className="col-span-2">Course Code</div>
                            <div className="col-span-5">Course Name</div>
                            <div className="col-span-2">Credits</div>
                            <div className="col-span-2">Grade</div>
                            <div className="col-span-1">Points</div>
                          </div>
                          <div className="divide-y">
                            {semester.parsedData?.courses?.map((course) => (
                              <div key={course.code} className="grid grid-cols-12 p-4 items-center">
                                <div className="col-span-2 font-medium">{course.code}</div>
                                <div className="col-span-5">{course.name}</div>
                                <div className="col-span-2">{course.credits}</div>
                                <div className="col-span-2">
                                  <Badge variant="outline" className={
                                    course.grade === "A" || course.grade === "A+" ? "bg-green-50 text-green-700 hover:bg-green-50" :
                                    course.grade === "A-" || course.grade === "B+" ? "bg-blue-50 text-blue-700 hover:bg-blue-50" :
                                    course.grade === "B" || course.grade === "B-" ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50" :
                                    "bg-red-50 text-red-700 hover:bg-red-50"
                                  }>
                                    {course.grade}
                                  </Badge>
                                </div>
                                <div className="col-span-1">{course.points}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="school" className="mt-6 space-y-6">
            <div className="flex justify-end">
              <Button 
                onClick={() => setShowSchoolUpload(!showSchoolUpload)}
              >
                {showSchoolUpload ? "Cancel Upload" : "Upload School Record"}
              </Button>
            </div>
            
            {showSchoolUpload && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload School Record</CardTitle>
                  <CardDescription>Upload your 10th or 12th class marksheet</CardDescription>
                </CardHeader>
                <CardContent>
                  <UploadAcademicRecord 
                    documentType="school" 
                    onUploadSuccess={handleUploadSuccess} 
                  />
                </CardContent>
              </Card>
            )}
            
            {schoolResults && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schoolResults.tenth && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Class 10 Results</CardTitle>
                      <CardDescription>{schoolResults.tenth.board} Board, {schoolResults.tenth.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">Overall Percentage</p>
                          <p className="text-sm font-bold">{schoolResults.tenth.percentage}%</p>
                        </div>
                        <Progress value={schoolResults.tenth.percentage} className="h-2" />
                      </div>
                      
                      <div className="rounded-md border">
                        <div className="grid grid-cols-6 p-4 font-medium border-b">
                          <div className="col-span-4">Subject</div>
                          <div className="col-span-2">Marks</div>
                        </div>
                        <div className="divide-y">
                          {schoolResults.tenth.subjects?.map((subject) => (
                            <div key={subject.name} className="grid grid-cols-6 p-4 items-center">
                              <div className="col-span-4 font-medium">{subject.name}</div>
                              <div className="col-span-2">{subject.marks}/100</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {schoolResults.twelfth && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Class 12 Results</CardTitle>
                      <CardDescription>{schoolResults.twelfth.board} Board, {schoolResults.twelfth.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">Overall Percentage</p>
                          <p className="text-sm font-bold">{schoolResults.twelfth.percentage}%</p>
                        </div>
                        <Progress value={schoolResults.twelfth.percentage} className="h-2" />
                      </div>
                      
                      <div className="rounded-md border">
                        <div className="grid grid-cols-6 p-4 font-medium border-b">
                          <div className="col-span-4">Subject</div>
                          <div className="col-span-2">Marks</div>
                        </div>
                        <div className="divide-y">
                          {schoolResults.twelfth.subjects?.map((subject) => (
                            <div key={subject.name} className="grid grid-cols-6 p-4 items-center">
                              <div className="col-span-4 font-medium">{subject.name}</div>
                              <div className="col-span-2">{subject.marks}/100</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}