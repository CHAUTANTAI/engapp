import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse, ParamSQL, query } from "@/pages/api/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "PUT") {
    return res.status(405).json({
      total_count: 0,
      data: null,
      error: "Method Not Allowed",
    });
  }

  const { id, term, definition } = req.body;

  const sql = `select * from flashcard_modify($1, $2, $3)`;
  const params: ParamSQL[] = [id, term, definition];

  try {
    const result = await query(sql, params);
    const row = result.rows[0];
    res.status(200).json({
      total_count: row.total_count,
      data: row.data,
      error: row.error,
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    res.status(500).json({
      total_count: 0,
      data: null,
      error: errorMessage,
    });
  }
}