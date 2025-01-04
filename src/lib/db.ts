import mysql from "mysql2/promise"; // Importing promise-based version

// MySQL connection details
const connection = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12755723",
  password: "fnw1rus6bW",
  database: "sql12755723",
  port: 3306,
});

// Check the connection using async/await
async function checkConnection() {
  try {
    const conn = await connection.getConnection(); // Get a connection from the pool
    console.log("Successfully connected to MySQL!");
    conn.release(); // Release the connection back to the pool after use
  } catch (err) {
    console.error("Connection failed:", err);
  }
}

checkConnection();

export default connection; // Export the connection pool for use in other parts of your app
