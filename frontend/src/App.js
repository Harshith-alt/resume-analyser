import React, { useState } from "react";
import ResumeUploader from "./components/ResumeUploader";
import PastResumesTable from "./components/PastResumesTable";
import "./App.css"; 

function App() {
  const [activeTab, setActiveTab] = useState("analyze");
  const [latestAnalysis, setLatestAnalysis] = useState(null);

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <div
        className="box-container"
        style={{ backgroundColor: "#282c34", padding: "20px", color: "white" }}
      >
        <h1>Resume Analyzer</h1>
      </div>
      <div className="button-container">
        <nav className="tabs">
          <button
            className={activeTab === "analyze" ? "active" : ""}
            style={{
              marginTop: "10px",
              marginRight: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
            }}
            onClick={() => setActiveTab("analyze")}
          >
            Resume Analysis
          </button>
          <button
            className={activeTab === "history" ? "active" : ""}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "5px",
            }}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </nav>
      </div>
      <main className="tab-content">
        {activeTab === "analyze" && (
          <ResumeUploader
            setLatestAnalysis={setLatestAnalysis}
            latestAnalysis={latestAnalysis}
          />
        )}
        {activeTab === "history" && <PastResumesTable />}
      </main>
    </div>
  );
}

export default App;
