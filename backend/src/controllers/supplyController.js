const pool = require("../../database");

//*************************************************************************/
// GET all supply data
const getAllSupply = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM supply ORDER BY date, hour;");
    res.json({
      success: true,
      message: "Fetched supply data",
      data: result.rows
    });
  } catch (err) {
    console.error("❌ Error fetching supply:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
};

//*************************************************************************/
// POST new supply entry
const createSupply = async (req, res) => {
  const { date, hour, generator, fuel, measurement, value } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO supply (date, hour, generator, fuel, measurement, value) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [date, hour, generator, fuel, measurement, value]
    );
    res.status(201).json({
      success: true,
      message: "New supply record added",
      data: result.rows[0]
    });
  } catch (err) {
    console.error("❌ Error inserting supply:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
};

//*************************************************************************/
module.exports = { getAllSupply, createSupply };
