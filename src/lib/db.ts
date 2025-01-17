import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const query = async (text: string, params?: (string | number)[]) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

export default pool;
