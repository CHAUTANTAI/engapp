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
    const { vocab_id, practice_id } = req.body;

    if (!vocab_id || !practice_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await pool.query(`SELECT addVocabForPractice($1, $2)`, [
      vocab_id,
      practice_id,
    ]);

    return res
      .status(200)
      .json({ status: true, message: "Vocab added successfully" });
  } catch (error) {
    console.error("Error adding vocab:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
