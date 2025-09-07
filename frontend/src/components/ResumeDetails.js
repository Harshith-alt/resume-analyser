import React from "react";
function ResumeDetails({ resumeData }) {
  if (!resumeData) {
    return <p>No resume data to display.</p>;
  }

  return (
    <div
      className="resume-details"
      style={{ textAlign: "left", margin: "20px" }}
    >
      <h3>Contact Information</h3>
      <p>
        <strong>Name:</strong> {resumeData.name}
      </p>
      <p>
        <strong>Email:</strong> {resumeData.email}
      </p>
      <p>
        <strong>Phone:</strong> {resumeData.phone}
      </p>
      {resumeData.linkedin_url && (
        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href={resumeData.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {resumeData.linkedin_url}
          </a>
        </p>
      )}
      {resumeData.portfolio_url && (
        <p>
          <strong>Portfolio:</strong>{" "}
          <a
            href={resumeData.portfolio_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {resumeData.portfolio_url}
          </a>
        </p>
      )}

      {resumeData.summary && (
        <>
          <h3>Summary</h3>
          <p>{resumeData.summary}</p>
        </>
      )}

      {resumeData.work_experience && resumeData.work_experience.length > 0 && (
        <>
          <h3>Work Experience</h3>
          {resumeData.work_experience.map((job, index) => (
            <div key={index} className="experience-item">
              <h4>
                {job.role} at {job.company} ({job.duration})
              </h4>
              <ul>
                {job.description &&
                  job.description.map((desc, idx) => <li key={idx}>{desc}</li>)}
              </ul>
            </div>
          ))}
        </>
      )}

      {resumeData.education && resumeData.education.length > 0 && (
        <>
          <h3>Education</h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <p>
                <strong>Degree:</strong> {edu.degree}
              </p>
              <p>
                <strong>Institution:</strong> {edu.institution}
              </p>
              <p>
                <strong>Graduation Year:</strong> {edu.graduation_year}
              </p>
            </div>
          ))}
        </>
      )}

      {(resumeData.technical_skills &&
        resumeData.technical_skills.length > 0) ||
      (resumeData.soft_skills && resumeData.soft_skills.length > 0) ? (
        <>
          <h3>Skills</h3>
          {resumeData.technical_skills &&
            resumeData.technical_skills.length > 0 && (
              <p>
                <strong>Technical:</strong>{" "}
                {resumeData.technical_skills.join(", ")}
              </p>
            )}
          {resumeData.soft_skills && resumeData.soft_skills.length > 0 && (
            <p>
              <strong>Soft:</strong> {resumeData.soft_skills.join(", ")}
            </p>
          )}
        </>
      ) : null}

      {resumeData.projects && resumeData.projects.length > 0 && (
        <>
          <h3>Projects</h3>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="project-item">
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <p>
                  <strong>Technologies:</strong>{" "}
                  {project.technologies.join(", ")}
                </p>
              )}
            </div>
          ))}
        </>
      )}

      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <>
          <h3>Certifications</h3>
          {resumeData.certifications.map((cert, index) => (
            <div key={index} className="certification-item">
              <p>
                <strong>{cert.name}</strong> from {cert.issuer} ({cert.year})
              </p>
            </div>
          ))}
        </>
      )}

      {resumeData.resume_rating !== null && (
        <>
          <h3>Resume Rating: {resumeData.resume_rating}/10</h3>
        </>
      )}

      {resumeData.improvement_areas && (
        <>
          <h3>Areas for Improvement</h3>
          <p>{resumeData.improvement_areas}</p>
        </>
      )}

      {resumeData.upskill_suggestions &&
        resumeData.upskill_suggestions.length > 0 && (
          <>
            <h3>Upskill Suggestions</h3>
            <ul>
              {resumeData.upskill_suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
}

export default ResumeDetails;
