const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5434,
  user: "postgres",
  password: "postgres",
  database: "saas_directory",
});

pool.query("SELECT 1", (err, res) => {
  if (err) {
    console.error("Error:", err.message);
  } else {
    console.log("Success:", res.rows[0]);
  }
  pool.end();
});
