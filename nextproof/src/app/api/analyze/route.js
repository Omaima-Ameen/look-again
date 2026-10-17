//*Recieves resume + Job description
import { NextResponse } from "next/server";
import { getData } from "pdf-parse/worker";
import { PDFParse } from "pdf-parse";

import { GoogleGenAI } from "@google/genai";

PDFParse.setWorker(getData());
const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request) {
  try {
    const formData = await request.formData();

    const resume = formData.get("resume");
    const jobDescription = formData.get("jobDescription");
    const jobFile = formData.get("jobFile");

    // Validate resume
    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json(
        { error: "Please upload your resume." },
        { status: 400 }
      );
    }

    if (resume.size > MAX_RESUME_SIZE) {
      return NextResponse.json(
        { error: "Resume must be smaller than 5 MB." },
        { status: 413 }
      );
    }

    if (!ALLOWED_RESUME_TYPES.includes(resume.type)) {
      return NextResponse.json(
        { error: "Resume must be a PDF or DOCX file." },
        { status: 415 }
      );
    }

    // Validate job description input
    const description =
      typeof jobDescription === "string" ? jobDescription.trim() : "";

    const hasJobFile =
      jobFile instanceof File && jobFile.size > 0;

    if (!description && !hasJobFile) {
      return NextResponse.json(
        { error: "Please provide a job description." },
        { status: 400 }
      );
    }

    if (description.length > 30000) {
      return NextResponse.json(
        { error: "Job description is too long. Maximum 30,000 characters." },
        { status: 400 }
      );
    }
// Read the uploaded PDF into memory
const resumeBuffer = new Uint8Array(await resume.arrayBuffer());

const parser = new PDFParse({ data: resumeBuffer });

let extractedText;

try {
  const result = await parser.getText();
  extractedText = result.text;
} finally {
  await parser.destroy();
}

// Reject scanned PDFs or files with no extractable text
if (!extractedText || !extractedText.trim()) {
  return NextResponse.json(
    {
      error:
        "No readable text found. Please upload a text-based PDF resume.",
    },
    { status: 422 }
  );
}

// Temporary debugging summary — don't log the resume itself
console.log("Resume text extracted:", extractedText.length, "characters");

    // Require a text job description for this first version
    if (!description) {
      return NextResponse.json(
        {
          error: "Please paste the job description for now. File extraction is coming next.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMMA_MODEL || "gemma-4-26b-a4b-it";

    if (!apiKey) {
      return NextResponse.json(
        { error: "AI configuration is missing on the server." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

const prompt = `
Compare this resume with this job description.
Return only valid JSON with these keys:
summary, strengths, missingEvidence, potentialGaps, nextSteps.

RESUME:
${extractedText.slice(0, 5000)}

JOB DESCRIPTION:
${description.slice(0, 4000)}
`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    const rawText = response.text;

    if (!rawText) {
      throw new Error("The AI model returned an empty response.");
    }

    const cleanedText = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    let analysis;

    try {
      analysis = JSON.parse(cleanedText);
    } catch {
      console.error("AI returned invalid JSON.");
      return NextResponse.json(
        { error: "The AI returned an unreadable result. Please try again." },
        { status: 502 }
      );
    }



    // File extraction and AI analysis 
    
return NextResponse.json(
  {
    success: true,
    message: "Resume analysis completed.",
    resume: {
      name: resume.name,
      size: resume.size,
      type: resume.type,
    },
    analysis,
    nextStep: "ai-analysis",
  },
  { status: 200 }
);

  }  catch (error) {
  console.error("Analyze route error:", error);

  return NextResponse.json(
    {
      error: "Unable to process your request.",
      details:
        error instanceof Error ? error.message : String(error),
    },
    { status: 500 }
  );

}}
