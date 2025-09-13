const express = require("express"); // import express
const dotenv = require("dotenv"); // import dotenv for env variables

dotenv.config(); // load .env file
const app = express(); // create express app

app.use(express.json()); // middleware to parse JSON request bodies

// Import routes
const demandRoutes = require("./routes/demandRoutes"); // import demand routes
const supplyRoutes = require("./routes/supplyRoutes"); // import supply routes

// Use routes
app.use("/api/demand", demandRoutes); // mount demand routes at /api/demand
app.use("/api/supply", supplyRoutes); // mount supply routes at /api/supply

// Default root endpoint
app.get("/", (req, res) => { // define GET /
  res.send("Welcome to cleanTechAI API 🚀"); // send response text
});

module.exports = app; // export app for server.js


