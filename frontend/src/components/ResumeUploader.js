import React, { useState } from "react";
import axios from "axios";
import ResumeDetails from "./ResumeDetails"; // We'll create this next

function ResumeUploader({ setLatestAnalysis, latestAnalysis }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
    setLatestAnalysis(null); // Clear previous analysis when new file selected
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file to upload.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/resumes/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLatestAnalysis(response.data);
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.error ||
          "Failed to upload and analyze resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-uploader" style={{ textAlign: "center" }}>
      <div
        className="file-details text-left"
        style={{
          minHeight: "10px",
          margin: "20px",
          backgroundColor: "#0081fb",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Resume Analysis application</h1>
        <p style={{ textAlign: "left", color: "#1c1e21" }}>
          Upload your resume in PDF format to receive an analysis of its
          content, structure, and key information extracted. This tool helps you
          understand how your resume presents your skills and experiences.
          Please ensure your file is in PDF format for optimal results. It is
          made by using the gemini API for the analysis of resume details.It
          also provides the AI based rating and feedback for the resume
          improvement.
        </p>
      </div>
      <h2>Upload Resume for Analysis</h2>
      <div
        className="flex justify-center items-center"
        style={{ margin: "20px" }}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{
            margin: "20px",
            borderRadius: "5px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={handleUpload}
          disabled={loading || !selectedFile}
          style={{
            margin: "20px",
            borderRadius: "5px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
          }}
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </div>

      {latestAnalysis && (
        <div className="analysis-result">
          <h3>Analysis Result for: {latestAnalysis.file_name}</h3>
          <ResumeDetails resumeData={latestAnalysis} />
        </div>
      )}
    </div>
  );
}

export default ResumeUploader;
