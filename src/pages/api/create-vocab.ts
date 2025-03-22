import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../lib/db";

const createVocab = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { word, meaning, class_ids, account_id, ipa, stress, example } =
    req.body;

  if (
    !word ||
    !meaning ||
    !Array.isArray(class_ids) ||
    class_ids.length === 0 ||
    !account_id
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const classIdsArray = class_ids.map(Number);

    await pool.query(
      `CALL sp_create_vocab($1, $2, $3::INT[], $4, $5, $6, $7)`,
      [
        word,
        meaning,
        classIdsArray,
        account_id,
        ipa || null,
        stress || null,
        example || null,
      ]
    );

    return res.status(201).json({ message: "Vocab created successfully!" });
  } catch (error: unknown) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error creating vocab",
    });
  }
};

export default createVocab;
