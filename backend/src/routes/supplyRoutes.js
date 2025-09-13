const express = require("express"); // import express
const router = express.Router(); // create a router object for supply routes
const { getAllSupply, createSupply } = require("../controllers/supplyController"); // import controller

router.get("/",  getAllSupply); // define GET /api/supply → handled by getAllSupply controller
router.post("/", createSupply);

module.exports = router; // export router so app.js can use it
