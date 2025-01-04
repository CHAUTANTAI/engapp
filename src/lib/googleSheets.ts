/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from "googleapis";
// import * as path from "path";
// import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const spreadsheetId = "1ObxYpe_22uMMVQRoGbXDag07l5Y7hDwWSC7lmTzzIQM"; // ID của Google Sheet của bạn

// Load credentials file
// const credentialsPath = path.join(
//   process.cwd(),
//   "src/credentials/credential-json.json"
// );
const credentials = {
  client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_id: process.env.GOOGLE_CLOUD_CLIENT_ID,
  auth_uri: process.env.GOOGLE_CLOUD_AUTH_URI,
  token_uri: process.env.GOOGLE_CLOUD_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_CLOUD_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLOUD_CLIENT_X509_CERT_URL,
};

// Authenticate with Google Sheets API
const auth = new google.auth.JWT(
  credentials.client_email,
  undefined,
  credentials.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"],
  undefined
);

const sheets = google.sheets({ version: "v4", auth });

export const getSheetData = async () => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1", // Phạm vi của bảng bạn muốn lấy
    });
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
    return data;
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    throw error;
  }
};
