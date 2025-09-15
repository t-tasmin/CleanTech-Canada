const express = require('express');
const router = express.Router();
const {
    getAllDemand,
    getDemandById,
    createDemand,
    updateDemand,
    deleteDemand,
    getDemandsByDate,
    getDemandsByDateRange,
    getDemandByDateAndHour,
    getDemandStats
} = require('../controllers/demandController');


// Analytics / Queries
router.get('/stats', getDemandStats);           // Demand stats
router.get('/date/:date', getDemandsByDate);    // Demands for a given date
router.get('/date/:date/hour/:hour', getDemandByDateAndHour); // Demand at date/hour
router.get('/range', getDemandsByDateRange);    // Demands in date range (?startDate=...&endDate=...)

// Base CRUD
router.get('/', getAllDemand);                  // Get all demands
router.post('/', createDemand);                 // Create new demand
router.get('/:id', getDemandById);              // Get demand by ID
router.put('/:id', updateDemand);               // Update demand
router.delete('/:id', deleteDemand);            // Delete demand

module.exports = router;