/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import connection from "../../lib/db";

// Define the response type
interface Vocab {
  vocab_id: number;
  word: string;
  meaning: string;
  class_id: number | null;
  example: string | null;
  synonym_vocab_id: number | null;
  antonym_vocab_id: number | null;
  stress_position: number | null;
  ipa: string | null;
  created_at: Date;
  updated_at: Date | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const [results] = await connection.query('SELECT * FROM VOCAB') as [any, any];
      console.log("GET ALL __ VOCAB\n", results);
      res.status(200).json(results);
    } catch (err: any) {
      console.error("Error fetching data:", err.message);
      res
        .status(500)
        .json({ message: "Failed to fetch data", error: err.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
