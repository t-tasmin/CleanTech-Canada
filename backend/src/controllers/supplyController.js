// src/controllers/supplyController.js
const Supply = require('../models/supply');

/*************************************************************************/
// GET all supply data
const getAllSupply = async (req, res) => {
    try {
        const supplies = await Supply.findAll();
        res.json({
            success: true,
            message: "Fetched supply data",
            data: supplies
        });
    } catch (err) {
        console.error("❌ Error fetching supply:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET single supply by ID
const getSupplyById = async (req, res) => {
    try {
        const { id } = req.params;
        const supply = await Supply.findById(id);
        
        if (!supply) {
            return res.status(404).json({
                success: false,
                message: "Supply record not found"
            });
        }
        
        res.json({
            success: true,
            message: "Fetched supply record",
            data: supply
        });
    } catch (err) {
        console.error("❌ Error fetching supply by ID:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// POST new supply entry
const createSupply = async (req, res) => {
    try {
        const {date, hour, generator, fuel, measurement, value } = req.body;
        
        // Basic validation
        if (!date || hour === undefined || !generator || !fuel || !measurement || value === undefined) {
            return res.status(400).json({
                success: false,
                error: "All fields are required: date, hour, generator, fuel, measurement, value"
            });
        }
        
        const supply = await Supply.create({ date, hour, generator, fuel, measurement, value });
        
        res.status(201).json({
            success: true,
            message: "New supply record added",
            data: supply
        });
    } catch (err) {
        console.error("❌ Error inserting supply:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// PUT update supply entry
const updateSupply = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, hour, generator, fuel, measurement, value } = req.body;
        
        const supply = await Supply.update(id, { date, hour, generator, fuel, measurement, value });
        
        if (!supply) {
            return res.status(404).json({
                success: false,
                message: "Supply record not found"
            });
        }
        
        res.json({
            success: true,
            message: "Supply record updated",
            data: supply
        });
    } catch (err) {
        console.error("❌ Error updating supply:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// DELETE supply entry
const deleteSupply = async (req, res) => {
    try {
        const { id } = req.params;
        const supply = await Supply.delete(id);
        
        if (!supply) {
            return res.status(404).json({
                success: false,
                message: "Supply record not found"
            });
        }
        
        res.json({
            success: true,
            message: "Supply record deleted",
            data: supply
        });
    } catch (err) {
        console.error("❌ Error deleting supply:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET supply records by specific date
const getSuppliesByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const supplies = await Supply.findByDate(date);
        
        res.json({
            success: true,
            message: `Fetched supply data for ${date}`,
            data: supplies,
            count: supplies.length
        });
    } catch (err) {
        console.error("❌ Error fetching supplies by date:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET supply records by date range
const getSuppliesByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                error: "Both startDate and endDate are required"
            });
        }
        
        const supplies = await Supply.findByDateRange(startDate, endDate);
        
        res.json({
            success: true,
            message: `Fetched supply data from ${startDate} to ${endDate}`,
            data: supplies,
            count: supplies.length
        });
    } catch (err) {
        console.error("❌ Error fetching supplies by date range:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET supply records by generator
const getSuppliesByGenerator = async (req, res) => {
    try {
        const { generator } = req.params;
        const supplies = await Supply.findByGenerator(generator);
        
        res.json({
            success: true,
            message: `Fetched supply data for generator: ${generator}`,
            data: supplies,
            count: supplies.length
        });
    } catch (err) {
        console.error("❌ Error fetching supplies by generator:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET supply records by fuel type
const getSuppliesByFuel = async (req, res) => {
    try {
        const { fuel } = req.params;
        const supplies = await Supply.findByFuel(fuel);
        console.log("###"+supplies);
        
        res.json({
            success: true,
            message: `Fetched supply data for fuel type: ${fuel}`,
            data: supplies,
            count: supplies.length
        });
    } catch (err) {
        console.error("❌ Error fetching supplies by fuel:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET supply records for specific date and hour
const getSuppliesByDateAndHour = async (req, res) => {
    try {
        const { date, hour } = req.params;
        const supplies = await Supply.findByDateAndHour(date, parseInt(hour));
        
        res.json({
            success: true,
            message: `Fetched supply data for ${date} at hour ${hour}`,
            data: supplies,
            count: supplies.length
        });
    } catch (err) {
        console.error("❌ Error fetching supplies by date and hour:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET unique generators list
const getGenerators = async (req, res) => {
    try {
        const generators = await Supply.getGenerators();
        
        res.json({
            success: true,
            message: "Fetched generators list",
            data: generators,
            count: generators.length
        });
    } catch (err) {
        console.error("❌ Error fetching generators:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET unique fuel types list
const getFuelTypes = async (req, res) => {
    try {
        const fuelTypes = await Supply.getFuelTypes();
        
        res.json({
            success: true,
            message: "Fetched fuel types list",
            data: fuelTypes,
            count: fuelTypes.length
        });
    } catch (err) {
        console.error("❌ Error fetching fuel types:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET supply statistics
const getSupplyStats = async (req, res) => {
    try {
        const stats = await Supply.getStats();
        
        res.json({
            success: true,
            message: "Fetched supply statistics",
            data: {
                totalRecords: parseInt(stats.total_records),
                averageValue: parseFloat(stats.avg_value || 0).toFixed(2),
                maximumValue: parseFloat(stats.max_value || 0),
                minimumValue: parseFloat(stats.min_value || 0),
                totalValue: parseFloat(stats.total_value || 0).toFixed(2),
                uniqueGenerators: parseInt(stats.unique_generators),
                uniqueFuelTypes: parseInt(stats.unique_fuel_types)
            }
        });
    } catch (err) {
        console.error("❌ Error fetching supply statistics:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET supply statistics by fuel type
const getSupplyStatsByFuel = async (req, res) => {
    try {
        const statsByFuel = await Supply.getStatsByFuel();
        
        const formattedStats = statsByFuel.map(stat => ({
            fuel: stat.fuel,
            recordCount: parseInt(stat.record_count),
            averageValue: parseFloat(stat.avg_value || 0).toFixed(2),
            maximumValue: parseFloat(stat.max_value || 0),
            minimumValue: parseFloat(stat.min_value || 0),
            totalValue: parseFloat(stat.total_value || 0).toFixed(2)
        }));
        
        res.json({
            success: true,
            message: "Fetched supply statistics by fuel type",
            data: formattedStats
        });
    } catch (err) {
        console.error("❌ Error fetching supply statistics by fuel:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
module.exports = { 
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
};