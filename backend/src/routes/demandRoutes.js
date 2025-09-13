// routes/demandRoutes.js
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

// Existing routes
router.get('/', getAllDemand);
router.post('/', createDemand);

// New routes you can add
router.get('/stats', getDemandStats);
router.get('/date/:date', getDemandsByDate);
router.get('/date/:date/hour/:hour', getDemandByDateAndHour);
router.get('/range', getDemandsByDateRange); // ?startDate=2024-01-01&endDate=2024-01-31
router.get('/:id', getDemandById);
router.put('/:id', updateDemand);
router.delete('/:id', deleteDemand);

module.exports = router;