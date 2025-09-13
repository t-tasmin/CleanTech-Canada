const express = require("express"); // import express
const router = express.Router(); // create a router object for demand routes
const { getAllDemand, createDemand} = require("../controllers/demandController"); // import the controller function

router.get("/", getAllDemand); // define GET /api/demand → handled by getAllDemand controller
router.post("/", createDemand);


module.exports = router; // export router so app.js can use it
