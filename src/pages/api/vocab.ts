// pages/api/vocabs.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getDbConnection } from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const db = await getDbConnection(); // Get the shared DB connection

      // Query to fetch data from VOCAB table
      const result = await db.query`SELECT * FROM VOCAB`;

      res.status(200).json(result.recordset); // Send the result as a response
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        vocab,
        meaning,
        class_id,
        example,
        ipa,
        synonym_vocab_id,
        antonym_vocab_id,
        stress_position,
      } = req.body;

      // Check if all required fields are provided
      if (!vocab || !meaning || !class_id) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const db = await getDbConnection(); // Get the shared DB connection

      // Query to insert new vocab into the database
      const result = await db.query`
        INSERT INTO VOCAB (word, meaning, class_id, example, ipa, synonym_vocab_id, antonym_vocab_id, stress_position)
        VALUES (${vocab}, ${meaning}, ${class_id}, ${example}, ${ipa}, ${synonym_vocab_id}, ${antonym_vocab_id}, ${stress_position})
      `;

      res.status(201).json({ message: 'Vocab added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
