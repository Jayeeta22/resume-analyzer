"use client";
import { useState } from "react";
import FileUpload from "../components/FileUpload";
import JobInput from "../components/JobInput";
import ResumeResult from "../components/ResumeResult";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlesetResumeText = (value) =>{
    console.log("value",value)
    setResumeText(value)
  }

  const handleAnalyze = async () => {
    setLoading(true);
    console.log("handleAnalyze")
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume: resumeText, job: jobText })
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Resume Analyzer + Job Match Bot</h1>
      <div className="grid gap-4">
        <FileUpload onChange={handlesetResumeText} />
        <JobInput value={jobText} onChange={setJobText} />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAnalyze}
          // disabled={loading || !resumeText || !jobText}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
        {result && <ResumeResult result={result} />}
      </div>
    </div>
  );
}
