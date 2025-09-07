# Resume Analyzer

A full-stack web app for uploading resumes, receiving AI-driven analysis, and viewing historical data. Built with **ReactJS**, **Node.js + Express**, and **PostgreSQL**.

---

## Features

- **Live Resume Analysis**: Upload PDFs, extract personal details, experience, education, projects, technical & soft skills, and receive AI feedback (rating, improvement areas, suggested skills).  
- **Historical Viewer**: View past analyzed resumes in a table with a modal for detailed analysis.  

---

## Tech Stack

- Frontend: ReactJS  
- Backend: Node.js + Express.js  
- Database: PostgreSQL  
- AI: Google Gemini LLM  
- PDF Parsing: pdf-parse  
- HTTP Requests: Axios  

---

## Installation & Running

### 1. Clone Repository
```bash 
git clone https://github.com/Harshith-alt/resume-analyser.git
cd resume-analyser
```
### 2. Backend Setup
```bash 
cd backend
npm install
```
env file setup:
use your google gemini api for the response generation.
Create a database in the pgsql and run setup.sql for the table creation.
```bash 
node server.js
```
### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

Live Resume Analysis tab:
Upload a PDF resume.
View structured data and AI feedback (rating, improvements, suggested skills).
History Viewer tab:
View previously analyzed resumes.
Click Details to see full resume analysis.

