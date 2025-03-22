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
    const top = req.query.top ? parseInt(req.query.top as string, 10) : null;
    const pageSize = req.query.pagesize
      ? parseInt(req.query.pagesize as string, 10)
      : 10;
    const currentPage = req.query.current_page
      ? parseInt(req.query.current_page as string, 10)
      : 1;
    const accountId = req.query.account_id
      ? parseInt(req.query.account_id as string, 10)
      : null;

    if (!accountId) {
      return res.status(400).json({ error: "Missing account_id" });
    }

    const query = `SELECT * FROM getVocabWithPagination($1, $2, $3, $4)`;
    const values = [top, pageSize, currentPage, accountId];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: "No vocab found" });
    }

    const { totalrecords, vocabs } = rows[0];

    return res.status(200).json({
      total_records: totalrecords,
      vocabs: vocabs || [],
    });
  } catch (error) {
    console.error("Error fetching vocab:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
