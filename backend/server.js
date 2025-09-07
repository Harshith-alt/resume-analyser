const express = require("express");
const cors = require("cors");
require("dotenv").config();
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust for production)
app.use(express.json()); // For parsing application/json

// Routes
app.use("/api/resumes", resumeRoutes);

// Basic error handling for routes not found
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!", details: err.message });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
