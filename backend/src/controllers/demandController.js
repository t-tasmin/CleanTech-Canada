const pool = require("../../database"); // import DB connection

//*************************************************************************/
// GET all demand data
const getAllDemand = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM demand ORDER BY date, hour;");
    res.json({
      success: true,
      message: "Fetched demand data",
      data: result.rows
    });
  } catch (err) {
    console.error("❌ Error fetching demand:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
};
//*************************************************************************/
// POST new demand entry
const createDemand = async (req, res) => {
  const { date, hour, market_demand, ontario_demand } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO demand (date, hour, market_demand, ontario_demand) VALUES ($1, $2, $3, $4) RETURNING *",
      [date, hour, market_demand, ontario_demand]
    );
    res.status(201).json({
      success: true,
      message: "New demand record added",
      data: result.rows[0]
    });
  } catch (err) {
    console.error("❌ Error inserting demand:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
};

//*************************************************************************/
module.exports = { getAllDemand, createDemand };
