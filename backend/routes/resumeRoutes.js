const express = require("express");
const router = express.Router();
const multer = require("multer");
const resumeController = require("../controllers/resumeController");

// Configure multer for memory storage as we process the PDF buffer directly
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

router.post("/upload", upload.single("resume"), resumeController.uploadResume);
router.get("/", resumeController.getAllResumes);
router.get("/:id", resumeController.getResumeById);

module.exports = router;
