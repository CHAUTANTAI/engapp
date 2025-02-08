import { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const result = await pool.query("CALL sp_login($1, $2, $3)", [
      email,
      password,
      null,
    ]);
    console.log(result);

    if (result.command === "CALL") {
      if (result.rows[0].is_valid === true) {
        return res.status(200).json({ message: "LOGIN SUCCESS!" });
      }
      return res.status(401).json({ message: "LOGIN FAILED!" });
    }
    return res.status(500).json({ message: "Server Error" });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
};

export default login;
