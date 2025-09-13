// src/models/supply.js
const pool = require('../../database/index');

class Supply {
    // Get all supply records ordered by date and hour
    static async findAll() {
        const result = await pool.query('SELECT * FROM supply ORDER BY date, hour');
        return result.rows;
    }
    
    // Get supply by ID
    static async findById(id) {
        const result = await pool.query('SELECT * FROM supply WHERE id = $1', [id]);
        return result.rows[0];
    }
    
    // Create new supply entry
    static async create(data) {
        const { date, hour, generator, fuel, measurement, value } = data;
        const result = await pool.query(
            'INSERT INTO supply (date, hour, generator, fuel, measurement, value) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [date, hour, generator, fuel, measurement, value]
        );
        return result.rows[0];
    }
    
    // Update supply entry
    static async update(id, data) {
        const { date, hour, generator, fuel, measurement, value } = data;
        const result = await pool.query(
            'UPDATE supply SET date = $1, hour = $2, generator = $3, fuel = $4, measurement = $5, value = $6 WHERE id = $7 RETURNING *',
            [date, hour, generator, fuel, measurement, value, id]
        );
        return result.rows[0];
    }
    
    // Delete supply entry
    static async delete(id) {
        const result = await pool.query('DELETE FROM supply WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
    
    // Get supply records by specific date
    static async findByDate(date) {
        const result = await pool.query(
            'SELECT * FROM supply WHERE date = $1 ORDER BY hour, generator', 
            [date]
        );
        return result.rows;
    }
    
    // Get supply records by date range
    static async findByDateRange(startDate, endDate) {
        const result = await pool.query(
            'SELECT * FROM supply WHERE date BETWEEN $1 AND $2 ORDER BY date, hour, generator',
            [startDate, endDate]
        );
        return result.rows;
    }
    
    // Get supply records by generator
    static async findByGenerator(generator) {
        const result = await pool.query(
            'SELECT * FROM supply WHERE generator = $1 ORDER BY date, hour',
            [generator]
        );
        return result.rows;
    }
    
    // Get supply records by fuel type
    static async findByFuel(fuel) {
        const result = await pool.query(
            'SELECT * FROM supply WHERE fuel = $1 ORDER BY date, hour',
            [fuel]
        );
        return result.rows;
    }
    
    // Get supply for specific date and hour
    static async findByDateAndHour(date, hour) {
        const result = await pool.query(
            'SELECT * FROM supply WHERE date = $1 AND hour = $2 ORDER BY generator',
            [date, hour]
        );
        return result.rows;
    }
    
    // Get unique generators list
    static async getGenerators() {
        const result = await pool.query('SELECT DISTINCT generator FROM supply ORDER BY generator');
        return result.rows.map(row => row.generator);
    }
    
    // Get unique fuel types list
    static async getFuelTypes() {
        const result = await pool.query('SELECT DISTINCT fuel FROM supply ORDER BY fuel');
        return result.rows.map(row => row.fuel);
    }
    
    // Get supply statistics
    static async getStats() {
        const result = await pool.query(`
            SELECT 
                COUNT(*) as total_records,
                AVG(value) as avg_value,
                MAX(value) as max_value,
                MIN(value) as min_value,
                SUM(value) as total_value,
                COUNT(DISTINCT generator) as unique_generators,
                COUNT(DISTINCT fuel) as unique_fuel_types
            FROM supply
        `);
        return result.rows[0];
    }
    
    // Get supply statistics by fuel type
    static async getStatsByFuel() {
        const result = await pool.query(`
            SELECT 
                fuel,
                COUNT(*) as record_count,
                AVG(value) as avg_value,
                MAX(value) as max_value,
                MIN(value) as min_value,
                SUM(value) as total_value
            FROM supply
            GROUP BY fuel
            ORDER BY fuel
        `);
        return result.rows;
    }
    
    // Get supply count
    static async getCount() {
        const result = await pool.query('SELECT COUNT(*) as count FROM supply');
        return parseInt(result.rows[0].count);
    }
}

module.exports = Supply;