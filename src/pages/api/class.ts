import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const query = `SELECT * FROM getClass();`;
    const { rows } = await pool.query(query);

    if (rows.length === 0) {
      return res.status(404).json({ error: "No classes found" });
    }

    return res.status(200).json({ classes: rows });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
