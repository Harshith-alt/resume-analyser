const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" }); 

async function extractTextFromPdf(pdfBuffer) {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to extract text from PDF.");
  }
}

async function analyzeResumeWithGemini(resumeText) {
  const prompt = `
      You are an expert technical recruiter and career coach. Analyze the following resume text and extract the information into a valid JSON object. The JSON object must conform to the following structure, and all fields must be populated. If a field's information is not found, use null for strings/numbers or an empty array for arrays. Do not include any text or markdown formatting before or after the JSON object. Ensure the output is *only* the JSON object.

      Resume Text:
      """
      ${resumeText}
      """

      JSON Structure:
      {
        "name": "string | null",
        "email": "string | null",
        "phone": "string | null",
        "linkedin_url": "string | null",
        "portfolio_url": "string | null",
        "summary": "string | null",
        "work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }] | [],
        "education": [{ "degree": "string", "institution": "string", "graduation_year": "string" }] | [],
        "technical_skills": ["string"] | [],
        "soft_skills": ["string"] | [],
        "projects": [{ "name": "string", "description": "string", "technologies": ["string"] }] | [],
        "certifications": [{ "name": "string", "issuer": "string", "year": "string" }] | [],
        "resume_rating": "number (1-10) | null",
        "improvement_areas": "string | null",
        "upskill_suggestions": ["string"] | []
      }
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Gemini sometimes includes backticks and "json" label, clean it up
    const cleanJsonString = text.replace(/```json\n|```/g, "").trim();

    return JSON.parse(cleanJsonString);
  } catch (error) {
    console.error("Error analyzing resume with Gemini:", error);
    throw new Error("Failed to analyze resume with AI.");
  }
}

module.exports = {
  extractTextFromPdf,
  analyzeResumeWithGemini,
};
