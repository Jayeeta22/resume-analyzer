// ./lib/langchain/resumeAnalyzer.js
import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
You are a Resume Analyzer Bot. Analyze the following resume based on the job description and return match_score, skills_matched, and recommendations.
You must respond in valid JSON format with the following structure:
{
  "match_score": number,
  "skills_matched": [string],
  "recommendations": [string]
}

The match_score should be a number from 0 to 100, representing the percentage match between the resume and job description.
`;

export async function analyzeResume(resume, job) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // or gpt-3.5-turbo if you prefer
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: `Resume:\n${resume}\n\nJob Description:\n${job}` 
        }
      ]
    });

    // Extract the content string and parse it as JSON
    return JSON.parse(response.choices[0].message.content);
  } catch (e) {
    console.error("Error with OpenAI API or parsing response:", e);
    throw new Error("Failed to analyze resume: " + (e.message || "Unknown error"));
  }
}