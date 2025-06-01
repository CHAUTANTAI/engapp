import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export type ApiResponse = {
  total_count: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; //
  error: string | null;
};

export type ParamSQL = string | number | null;

export const query = async (text: string, params?: ParamSQL[]) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

export default pool;
