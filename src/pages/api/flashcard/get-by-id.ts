import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, ParamSQL,query } from "@/lib/db-helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      total_count: 0,
      data: null,
      error: "Method Not Allowed",
    });
  }

  const { id } = req.query;

  const sql = `select * from flashcard_get_by_id($1)`;
  const params: ParamSQL[] = [Number(id)];

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