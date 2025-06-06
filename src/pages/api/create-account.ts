import type { NextApiRequest, NextApiResponse } from "next";
import { query } from "@/lib/db-helper";

const createAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { email, password, rule_id } = req.body;

  if (!email || !password || !rule_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await query("CALL sp_create_account($1, $2, $3)", [
      email,
      password,
      rule_id,
    ]);

    if (result.command === "CALL") {
      return res.status(201).json({ message: "Account created successfully!" });
    } else {
      return res
        .status(500)
        .json({ message: "An error occurred while creating the account." });
    }
  } catch (error: unknown) {
    if (error as Error) {
      return res.status(500).json({ message: (error as Error).message });
    }
    return res.status(500).json({ message: "Error creating account" });
  }
};

export default createAccount;
