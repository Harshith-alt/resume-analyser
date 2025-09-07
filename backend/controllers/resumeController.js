const db = require("../db");
const analysisService = require("../services/analysisService");

async function uploadResume(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "No resume file uploaded." });
  }

  try {
    const fileName = req.file.originalname;
    const pdfBuffer = req.file.buffer;

    // 1. Extract text from PDF
    const resumeText = await analysisService.extractTextFromPdf(pdfBuffer);

    // 2. Analyze resume with Gemini
    const analysisResult = await analysisService.analyzeResumeWithGemini(
      resumeText
    );

    // 3. Save to database
    const {
      name,
      email,
      phone,
      linkedin_url,
      portfolio_url,
      summary,
      work_experience,
      education,
      technical_skills,
      soft_skills,
      projects,
      certifications,
      resume_rating,
      improvement_areas,
      upskill_suggestions,
    } = analysisResult;

    const insertQuery = `
            INSERT INTO resumes (
                file_name, name, email, phone, linkedin_url, portfolio_url, summary,
                work_experience, education, technical_skills, soft_skills, projects,
                certifications, resume_rating, improvement_areas, upskill_suggestions
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING *;
        `;
    const values = [
      fileName,
      name,
      email,
      phone,
      linkedin_url,
      portfolio_url,
      summary,
      JSON.stringify(work_experience),
      JSON.stringify(education),
      JSON.stringify(technical_skills),
      JSON.stringify(soft_skills),
      JSON.stringify(projects),
      JSON.stringify(certifications),
      resume_rating,
      improvement_areas,
      JSON.stringify(upskill_suggestions),
    ];

    const { rows } = await db.query(insertQuery, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error in uploadResume:", error);
    res.status(500).json({
      error: error.message || "Internal Server Error during resume upload.",
    });
  }
}

async function getAllResumes(req, res) {
  try {
    const { rows } = await db.query(
      "SELECT * FROM resumes ORDER BY uploaded_at DESC"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error in getAllResumes:", error);
    res.status(500).json({ error: "Internal Server Error fetching resumes." });
  }
}

async function getResumeById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await db.query("SELECT * FROM resumes WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Resume not found." });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error in getResumeById:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error fetching resume details." });
  }
}

module.exports = {
  uploadResume,
  getAllResumes,
  getResumeById,
};
