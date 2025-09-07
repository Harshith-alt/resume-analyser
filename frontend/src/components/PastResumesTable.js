import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import ResumeDetails from "./ResumeDetails";

function PastResumesTable() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/resumes");
        setResumes(response.data);
      } catch (err) {
        console.error("Error fetching past resumes:", err);
        setError("Failed to load historical resumes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleViewDetails = (resume) => {
    setSelectedResume(resume);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResume(null);
  };

  if (loading) return <p>Loading historical resumes...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (resumes.length === 0) return <p>No resumes have been uploaded yet.</p>;

  return (
    <div className="past-resumes-table">
      <h2>History of Resumes</h2>
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Uploaded At</th>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume) => (
            <tr key={resume.id}>
              <td>{resume.file_name}</td>
              <td>{new Date(resume.uploaded_at).toLocaleDateString()}</td>
              <td>{resume.name || "N/A"}</td>
              <td>{resume.email || "N/A"}</td>
              <td>{resume.resume_rating || "N/A"}</td>
              <td>
                <button onClick={() => handleViewDetails(resume)}>
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedResume && <ResumeDetails resumeData={selectedResume} />}
      </Modal>
    </div>
  );
}

export default PastResumesTable;
