import { query } from "@/util/api/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { generateAccessToken, generateRefreshToken } from "@/util/funs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body; // password đã hash từ frontend

  const sql = `SELECT * FROM login($1, $2)`;
  const result = await query(sql, [email, password]);
  const row = result.rows[0];
  console.log("CTT:", row);

  if (row.error || !row.data) {
    return res
      .status(401)
      .json({ total_count: 0, data: null, error: row.error });
  }

  const account = row.data;

  const access_token = generateAccessToken({ account_id: account.account_id });
  const refresh_token = generateRefreshToken({
    account_id: account.account_id,
  });

  const sessionFnSql = `SELECT * FROM session_create($1, $2, $3, $4)`;
  const sessionRes = await query(sessionFnSql, [
    account.account_id,
    refresh_token,
    req.headers["user-agent"] ?? null,
    req.socket.remoteAddress ?? null,
  ]);

  const sessionRow = sessionRes.rows[0];
  console.log(sessionRow);
  if (sessionRow.error || !sessionRow.data) {
    return res.status(500).json({
      total_count: 0,
      data: null,
      error: sessionRow.error ?? "Failed to create session",
    });
  }

  res.status(200).json({
    total_count: 1,
    data: {
      session: sessionRow.data,
      access_token,
    },
    error: null,
  });
}
