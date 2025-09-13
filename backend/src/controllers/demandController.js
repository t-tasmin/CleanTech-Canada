// src/controllers/demandController.js
const Demand = require('../models/demand');

/*************************************************************************/
// GET all demand data
const getAllDemand = async (req, res) => {
    try {
        const demands = await Demand.findAll();
        res.json({
            success: true,
            message: "Fetched demand data",
            data: demands
        });
    } catch (err) {
        console.error("❌ Error fetching demand:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET single demand by ID
const getDemandById = async (req, res) => {
    try {
        const { id } = req.params;
        const demand = await Demand.findById(id);
        
        if (!demand) {
            return res.status(404).json({
                success: false,
                message: "Demand record not found"
            });
        }
        
        res.json({
            success: true,
            message: "Fetched demand record",
            data: demand
        });
    } catch (err) {
        console.error("❌ Error fetching demand by ID:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// POST new demand entry
const createDemand = async (req, res) => {
    try {
        const { date, hour, market_demand, ontario_demand } = req.body;
        
        // Basic validation
        if (!date || hour === undefined || !market_demand || !ontario_demand) {
            return res.status(400).json({
                success: false,
                error: "All fields are required: date, hour, market_demand, ontario_demand"
            });
        }
        
        const demand = await Demand.create({ date, hour, market_demand, ontario_demand });
        
        res.status(201).json({
            success: true,
            message: "New demand record added",
            data: demand
        });
    } catch (err) {
        console.error("❌ Error inserting demand:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// PUT update demand entry
const updateDemand = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, hour, market_demand, ontario_demand } = req.body;
        
        const demand = await Demand.update(id, { date, hour, market_demand, ontario_demand });
        
        if (!demand) {
            return res.status(404).json({
                success: false,
                message: "Demand record not found"
            });
        }
        
        res.json({
            success: true,
            message: "Demand record updated",
            data: demand
        });
    } catch (err) {
        console.error("❌ Error updating demand:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// DELETE demand entry
const deleteDemand = async (req, res) => {
    try {
        const { id } = req.params;
        const demand = await Demand.delete(id);
        
        if (!demand) {
            return res.status(404).json({
                success: false,
                message: "Demand record not found"
            });
        }
        
        res.json({
            success: true,
            message: "Demand record deleted",
            data: demand
        });
    } catch (err) {
        console.error("❌ Error deleting demand:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET demands by specific date
const getDemandsByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const demands = await Demand.findByDate(date);
        
        res.json({
            success: true,
            message: `Fetched demand data for ${date}`,
            data: demands,
            count: demands.length
        });
    } catch (err) {
        console.error("❌ Error fetching demands by date:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET demands by date range
const getDemandsByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                error: "Both startDate and endDate are required"
            });
        }
        
        const demands = await Demand.findByDateRange(startDate, endDate);
        
        res.json({
            success: true,
            message: `Fetched demand data from ${startDate} to ${endDate}`,
            data: demands,
            count: demands.length
        });
    } catch (err) {
        console.error("❌ Error fetching demands by date range:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET demand for specific date and hour
const getDemandByDateAndHour = async (req, res) => {
    try {
        const { date, hour } = req.params;
        const demand = await Demand.findByDateAndHour(date, parseInt(hour));
        
        if (!demand) {
            return res.status(404).json({
                success: false,
                message: `No demand record found for ${date} at hour ${hour}`
            });
        }
        
        res.json({
            success: true,
            message: `Fetched demand data for ${date} at hour ${hour}`,
            data: demand
        });
    } catch (err) {
        console.error("❌ Error fetching demand by date and hour:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
// GET demand statistics
const getDemandStats = async (req, res) => {
    try {
        const stats = await Demand.getStats();
        
        res.json({
            success: true,
            message: "Fetched demand statistics",
            data: {
                totalRecords: parseInt(stats.total_records),
                averages: {
                    marketDemand: parseFloat(stats.avg_market_demand || 0).toFixed(2),
                    ontarioDemand: parseFloat(stats.avg_ontario_demand || 0).toFixed(2)
                },
                maximums: {
                    marketDemand: parseFloat(stats.max_market_demand || 0),
                    ontarioDemand: parseFloat(stats.max_ontario_demand || 0)
                },
                minimums: {
                    marketDemand: parseFloat(stats.min_market_demand || 0),
                    ontarioDemand: parseFloat(stats.min_ontario_demand || 0)
                }
            }
        });
    } catch (err) {
        console.error("❌ Error fetching demand statistics:", err);
        res.status(500).json({ success: false, error: "Database error" });
    }
};

/*************************************************************************/
module.exports = { 
    getAllDemand, 
    getDemandById,
    createDemand, 
    updateDemand,
    deleteDemand,
    getDemandsByDate,
    getDemandsByDateRange,
    getDemandByDateAndHour,
    getDemandStats
};