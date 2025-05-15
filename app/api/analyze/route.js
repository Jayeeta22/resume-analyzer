import { NextResponse } from "next/server";
import { analyzeResume } from "../../../lib/langchain/resumeAnalyzer";

export async function POST(req) {
  try {
    console.log("API route handler started");
    
    // Check if the request has content
    if (!req.body) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }
    
    let reqData;
    try {
      reqData = await req.json();
      console.log("Request parsed successfully");
    } catch (parseError) {
      console.error("Error parsing request JSON:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }
    
    const { resume, job } = reqData;
    
    // Validate input
    if (!resume) {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 }
      );
    }
    
    if (!job) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }
    
    console.log("Input validated, calling analyzeResume");
    
    try {
      const analysis = await analyzeResume(resume, job);
      console.log("Analysis complete", analysis);
      return NextResponse.json(analysis);
    } catch (analysisError) {
      console.error("Error during resume analysis:", analysisError);
      return NextResponse.json(
        { error: analysisError.message || "Failed to analyze resume" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unhandled error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}