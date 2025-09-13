const express = require("express");
const router = express.Router();
const { getAllDemand } = require("../controllers/demandController");

// GET /api/demand
router.get("/", getAllDemand);

module.exports = router;
