"use client"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import Axios from "./Axios";

// Initialize the Google Generative AI with the API key
const apiKey = "AIzaSyBp7NQMTYykuZnCoVhpPPGnRH0o4NJzLpY";
const genAI = new GoogleGenerativeAI(apiKey);

// Get the model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Configuration for the model
const generationConfig = {
  temperature: 0.4, // Lower temperature for more deterministic responses
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

// Safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Define types for academic record data
export interface Course {
  code: string;
  name: string;
  credits: number;
  grade: string;
  points: number;
}

export interface ParsedData {
  sgpa: number;
  cgpa: number;
  courses: Course[];
}

// Function to calculate grade points based on letter grade
const calculateGradePoints = (grade: string): number => {
  const gradeMap: { [key: string]: number } = {
    'A+': 10,
    'A': 9,
    'A-': 8,
    'B+': 7,
    'B': 6,
    'B-': 5,
    'C+': 4,
    'C': 3,
    'D': 2,
    'F': 0
  };

  return gradeMap[grade] || 0;
};

// Function to calculate SGPA from courses
export const calculateSGPA = (courses: Course[]): number => {
  if (!courses || courses.length === 0) return 0;
  
  let totalCredits = 0;
  let totalPoints = 0;
  
  courses.forEach(course => {
    totalCredits += course.credits;
    totalPoints += course.credits * course.points;
  });
  
  return totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : 0;
};

// Main function to parse academic record from image
export const parseAcademicRecordFromImage = async (imageUrl: string): Promise<ParsedData> => {
  try {
    // Fetch the image as a blob
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    const imageBlob = await response.blob();
    
    // Convert blob to base64
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageBlob);
    });
    
    // Prepare the prompt for Gemini
    const prompt = `
      You are an expert in analyzing academic marksheets and transcripts. 
      Please extract the following information from this image:
      
      1. All courses with their course codes, names, credits, and grades
      2. Calculate the SGPA (Semester Grade Point Average) if not explicitly mentioned
      3. Calculate the CGPA (Cumulative Grade Point Average) if not explicitly mentioned
      
      Format your response as a JSON object with the following structure:
      {
        "courses": [
          {
            "code": "string",
            "name": "string",
            "credits": number,
            "grade": "string",
            "points": number
          }
        ],
        "sgpa": number,
        "cgpa": number
      }
      
      For each course, calculate the points based on the grade (A+ = 10, A = 9, A- = 8, B+ = 7, B = 6, B- = 5, C+ = 4, C = 3, D = 2, F = 0).
      If SGPA or CGPA is not explicitly mentioned, calculate them based on the courses.
    `;
    
    // Create a vision model instance
    const visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Process the image with the prompt
    const result = await visionModel.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64.split(',')[1] // Remove the data URL prefix
        }
      }
    ]);
    
    const generatedContent = await result.response;
    const text = generatedContent.text();
    
    // Clean and parse the JSON response
    try {
      // Remove markdown code block if present
      const cleanText = text.replace(/```json\n|```/g, '').trim();
      const parsedData = JSON.parse(cleanText);
      
      // Validate and ensure all required fields are present
      const validatedData: ParsedData = {
        courses: Array.isArray(parsedData.courses) ? parsedData.courses.map((course: any) => ({
          code: course.code || '',
          name: course.name || '',
          credits: Number(course.credits) || 0,
          grade: course.grade || '',
          points: Number(course.points) || calculateGradePoints(course.grade)
        })) : [],
        sgpa: Number(parsedData.sgpa) || 0,
        cgpa: Number(parsedData.cgpa) || 0
      };
      
      // If SGPA is not provided, calculate it
      if (!parsedData.sgpa && validatedData.courses.length > 0) {
        validatedData.sgpa = calculateSGPA(validatedData.courses);
      }
      
      return validatedData;
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      return { courses: [], sgpa: 0, cgpa: 0 };
    }
  } catch (error) {
    console.error('Error processing academic record image:', error);
    return { courses: [], sgpa: 0, cgpa: 0 };
  }
};

// Function to update academic record with parsed data
export const updateAcademicRecordWithParsedData = async (recordId: string, parsedData: ParsedData): Promise<boolean> => {
  try {
    const response = await Axios.patch(`/academic-records/update/${recordId}`, { parsedData });
    return response.status === 200;
  } catch (error) {
    console.error('Error updating academic record with parsed data:', error);
    return false;
  }
};