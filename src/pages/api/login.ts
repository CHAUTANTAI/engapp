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
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const query = "SELECT * FROM fn_login($1, $2)";
    const values = [email, password];
    const { rows } = await pool.query(query, values);

    if (rows.length > 0) {
      const { is_valid, account_id, email, rule_id } = rows[0];

      if (is_valid) {
        return res.status(200).json({
          message: "LOGIN SUCCESS!",
          account_id,
          email,
          rule_id,
        });
      }
    }

    return res.status(401).json({ message: "LOGIN FAILED!" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
