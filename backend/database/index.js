require('dotenv').config();  //Ensure .env File is Loaded

// Import pg (node-postgres)
const { Pool } = require("pg");

// Connection string (store in .env for security)
const pool = new Pool({
  user: process.env.DB_USER,       // DB user
  host: process.env.DB_HOST,       // DB host
  database: process.env.DB_NAME,   // DB name
  password: String(process.env.DB_PASS),   // DB password
  port: process.env.DB_PORT,       // PostgreSQL default port
});

// Test connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

module.exports = pool;
