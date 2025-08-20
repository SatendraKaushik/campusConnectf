"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import Axios from "@/utils/Axios"

interface UploadAcademicRecordProps {
  documentType?: "college" | "school";
  onUploadSuccess?: () => void;
}

export default function UploadAcademicRecord({ 
  documentType = "college", 
  onUploadSuccess 
}: UploadAcademicRecordProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    documentType: documentType === "school" ? "school" : "marksheet",
    year: "",
    semester: documentType === "school" ? "0" : ""
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size must be less than 5MB")
        return
      }
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(selectedFile.type)) {
        toast.error("Only PDF and image files are allowed")
        return
      }
      setFile(selectedFile)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      toast.error("Please select a file to upload")
      return
    }

    if (!formData.year) {
      toast.error("Please enter the academic year")
      return
    }

    if (documentType !== "school" && !formData.semester) {
      toast.error("Please enter the semester")
      return
    }

    try {
      setIsUploading(true)
      
      const data = new FormData()
      data.append('document', file)
      data.append('documentType', formData.documentType)
      data.append('year', formData.year)
      data.append('semester', formData.semester || "0")
      
      const response = await Axios.post('/academic-records/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (response.status === 201) {
        toast.success("Document uploaded successfully")
        setFile(null)
        setFormData({
          documentType: documentType === "school" ? "school" : "marksheet",
          year: "",
          semester: documentType === "school" ? "0" : ""
        })
        
        if (onUploadSuccess) {
          onUploadSuccess()
        }
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload document")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload {documentType === "school" ? "School" : "College"} Record</CardTitle>
        <CardDescription>
          Upload your {documentType === "school" ? "school marksheet" : "semester marksheet or transcript"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentType !== "school" && (
              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type</Label>
                <Select 
                  value={formData.documentType} 
                  onValueChange={(value) => handleSelectChange("documentType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marksheet">Marksheet</SelectItem>
                    <SelectItem value="transcript">Transcript</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="year">
                {documentType === "school" ? "Class (10/12)" : "Academic Year"}
              </Label>
              <Input
                id="year"
                name="year"
                type="number"
                placeholder={documentType === "school" ? "10 or 12" : "Enter year"}
                value={formData.year}
                onChange={handleInputChange}
              />
            </div>
            
            {documentType !== "school" && (
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Input
                  id="semester"
                  name="semester"
                  type="number"
                  placeholder="Enter semester number"
                  value={formData.semester}
                  onChange={handleInputChange}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="document">Upload Document</Label>
              <Input
                id="document"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500">Supported formats: PDF, JPG, PNG</p>
            </div>
          </div>
          
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Document"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}