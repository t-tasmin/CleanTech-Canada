const fs = require("fs");
const path = require("path");
const pool = require("./index");

// Helper function to run SQL file
const runSQLFile = async (filePath) => {
  const sql = fs.readFileSync(filePath).toString();
  await pool.query(sql);
};

// Reset database
const resetDB = async () => {
  try {
    console.log("🔄 Resetting Database...");

    // Drop tables
    await pool.query("DROP TABLE IF EXISTS demand CASCADE;");
    await pool.query("DROP TABLE IF EXISTS supply CASCADE;");

    // Run schema files
    await runSQLFile(path.join(__dirname, "schema", "demand.sql"));
    await runSQLFile(path.join(__dirname, "schema", "supply.sql"));

    // Run seed files
    await runSQLFile(path.join(__dirname, "seeds", "demand_seed.sql"));
    await runSQLFile(path.join(__dirname, "seeds", "supply_seed.sql"));

    console.log("✅ Database Reset Complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error resetting DB:", err);
    process.exit(1);
  }
};

resetDB();
