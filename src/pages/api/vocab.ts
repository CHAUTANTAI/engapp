/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/api/vocab.ts
import { getSheetData } from "../../lib/googleSheets";


export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const data = await getSheetData();
      res.status(200).json(data);
    } catch (error) {
      console.log("error:", error);
      res.status(500).json({
        error: "Failed to fetch data from Google Sheets",
        details: error,
      });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
