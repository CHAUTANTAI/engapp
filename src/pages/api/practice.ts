import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const { account_id } = req.query;

    if (!account_id) {
      return res.status(400).json({ message: "Missing account_id" });
    }

    const result = await pool.query(`SELECT * FROM getPractice($1)`, [
      parseInt(account_id as string),
    ]);

    return res.status(200).json({ practices: result.rows });
  } catch (error) {
    console.error("Error fetching practices:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
