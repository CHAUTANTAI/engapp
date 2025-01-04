/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/api/vocab.ts
import { google } from "googleapis";
import * as path from "path";
import * as fs from "fs";

const spreadsheetId = "1ObxYpe_22uMMVQRoGbXDag07l5Y7hDwWSC7lmTzzIQM"; // ID của Google Sheet của bạn

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      // Load credentials file
      console.log("Loading credentials...");
      const credentialsPath = path.join(
        process.cwd(),
        "src/credentials/credential-json.json"
      );
      const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));
      // Authenticate with Google Sheets API
      const auth = new google.auth.JWT(
        credentials.client_email,
        undefined,
        credentials.private_key,
        ["https://www.googleapis.com/auth/spreadsheets"],
        undefined
      );

      const sheets = google.sheets({ version: "v4", auth });

      // Fetch data from Google Sheets
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Sheet1", // Thay đổi tên sheet nếu cần
      });
      console.log("Google Sheets response:", response);
      // Map data to match Vocab interface
      const data = response.data.values?.map((row: any[]) => ({
        vocab_id: parseInt(row[0], 10),
        word: row[1],
        meaning: row[2],
        class_id: row[3] ? parseInt(row[3], 10) : null,
        example: row[4] || null,
        synonym_vocab_id: row[5] ? parseInt(row[5], 10) : null,
        antonym_vocab_id: row[6] ? parseInt(row[6], 10) : null,
        stress_position: row[7] ? parseInt(row[7], 10) : null,
        ipa: row[8] || null,
        created_at: row[9],
        updated_at: row[10] || null,
      }));

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
