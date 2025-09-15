const express = require('express');
const router = express.Router();

const {
    getAllSupply,
    getSupplyById,
    createSupply,
    updateSupply,
    deleteSupply,
    getSuppliesByDate,
    getSuppliesByDateRange,
    getSuppliesByGenerator,
    getSuppliesByFuel,
    getSuppliesByDateAndHour,
    getGenerators,
    getFuelTypes,
    getSupplyStats,
    getSupplyStatsByFuel
} = require('../controllers/supplyController');


// Analytics / Queries
router.get('/stats', getSupplyStats);           // Supply stats
router.get('/stats/fuel', getSupplyStatsByFuel);// Stats grouped by fuel type
router.get('/date/:date', getSuppliesByDate);   // Supply for a given date
router.get('/date/:date/hour/:hour', getSuppliesByDateAndHour); // Supply at date/hour
router.get('/range', getSuppliesByDateRange);   // Supply in date range
router.get('/generator/:generator', getSuppliesByGenerator); // Supply by generator
router.get('/fuel/:fuel', getSuppliesByFuel);   // Supply by fuel type
router.get('/generators/list', getGenerators);  // List of all generators
router.get('/fuels/list', getFuelTypes);        // List of all fuel types

// Base CRUD
router.get('/', getAllSupply);                  // Get all supply records
router.post('/', createSupply);                 // Create new supply
router.get('/:id', getSupplyById);              // Get supply by ID
router.put('/:id', updateSupply);               // Update supply
router.delete('/:id', deleteSupply);            // Delete supply

module.exports = router;