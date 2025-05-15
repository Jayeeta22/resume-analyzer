import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }
    
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    
    // Two approaches to consider:
    
    // OPTION 1: Use a cloud-based PDF extraction API
    // This requires signing up for a service like PDF.co, Adobe PDF Services, etc.
    /*
    const apiKey = process.env.PDF_EXTRACTION_API_KEY;
    const formData = new FormData();
    formData.append('file', new Blob([fileBuffer]), file.name);
    
    const response = await fetch('https://api.pdf-extraction-service.com/v1/extract', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    });
    
    const data = await response.json();
    return NextResponse.json({ text: data.text });
    */
    
    // OPTION 2: Use a client-side approach 
    // Return the PDF as base64 and handle extraction in the browser
    const base64Pdf = fileBuffer.toString('base64');

  const { default: pdfParse } = await import("pdf-parse");
  const buffer = Buffer.from(base64Pdf, "base64");
  const parsedText = await pdfParse(buffer);
  console.log("parsed...",parsedText?.text)
    return NextResponse.json({
      success: true,
      parsedText: parsedText.text,
      message: "PDF received. Consider extracting text on the client side using PDF.js"
    });
  } catch (error) {
    console.error("PDF processing error:", error);
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}