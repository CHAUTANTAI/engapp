import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { account_id, description, name, parent_id } = req.body;

    if (!account_id || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await pool.query(
      `SELECT * FROM createPractice($1, $2, $3, $4)`,
      [account_id, description, name, parent_id || null]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating practice:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
