// src/models/demand.js
const pool = require('../../database/index');

class Demand {
    // Get all demands ordered by date and hour
    static async findAll() {
        const result = await pool.query('SELECT * FROM demand ORDER BY date, hour');
        return result.rows;
    }
    
    // Get demand by ID
    static async findById(id) {
        const result = await pool.query('SELECT * FROM demand WHERE id = $1', [id]);
        return result.rows[0];
    }
    
    // Create new demand entry
    static async create(data) {
        const { date, hour, market_demand, ontario_demand } = data;
        const result = await pool.query(
            'INSERT INTO demand (date, hour, market_demand, ontario_demand) VALUES ($1, $2, $3, $4) RETURNING *',
            [date, hour, market_demand, ontario_demand]
        );
        return result.rows[0];
    }
    
    // Update demand entry
    static async update(id, data) {
        const { date, hour, market_demand, ontario_demand } = data;
        const result = await pool.query(
            'UPDATE demand SET date = $1, hour = $2, market_demand = $3, ontario_demand = $4 WHERE id = $5 RETURNING *',
            [date, hour, market_demand, ontario_demand, id]
        );
        return result.rows[0];
    }
    
    // Delete demand entry
    static async delete(id) {
        const result = await pool.query('DELETE FROM demand WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
    
    // Get demands by specific date
    static async findByDate(date) {
        const result = await pool.query(
            'SELECT * FROM demand WHERE date = $1 ORDER BY hour', 
            [date]
        );
        return result.rows;
    }
    
    // Get demands by date range
    static async findByDateRange(startDate, endDate) {
        const result = await pool.query(
            'SELECT * FROM demand WHERE date BETWEEN $1 AND $2 ORDER BY date, hour',
            [startDate, endDate]
        );
        return result.rows;
    }
    
    // Get demand for specific date and hour
    static async findByDateAndHour(date, hour) {
        const result = await pool.query(
            'SELECT * FROM demand WHERE date = $1 AND hour = $2',
            [date, hour]
        );
        return result.rows[0];
    }
    
    // Get total demand statistics
    static async getStats() {
        const result = await pool.query(`
            SELECT 
                COUNT(*) as total_records,
                AVG(market_demand) as avg_market_demand,
                AVG(ontario_demand) as avg_ontario_demand,
                MAX(market_demand) as max_market_demand,
                MAX(ontario_demand) as max_ontario_demand,
                MIN(market_demand) as min_market_demand,
                MIN(ontario_demand) as min_ontario_demand
            FROM demand
        `);
        return result.rows[0];
    }
    
    // Get demand count
    static async getCount() {
        const result = await pool.query('SELECT COUNT(*) as count FROM demand');
        return parseInt(result.rows[0].count);
    }
}

module.exports = Demand;