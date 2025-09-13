const express = require("express");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Example route
app.get("/", (req, res) => {
  res.send("Welcome to cleanTechAI API 🚀");
});

// Import routes (later we’ll add demandRoutes, supplyRoutes, etc.)
// const demandRoutes = require("./routes/demandRoutes");
// app.use("/api/demand", demandRoutes);

module.exports = app;

