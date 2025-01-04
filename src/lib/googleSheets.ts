import { google } from "googleapis";
import * as path from "path";
import * as fs from "fs";

const spreadsheetId = "1ObxYpe_22uMMVQRoGbXDag07l5Y7hDwWSC7lmTzzIQM"; // ID của Google Sheet của bạn

// Load credentials file
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

export const getSheetData = async () => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1", // Phạm vi của bảng bạn muốn lấy
    });
    return response.data.values; // Trả về dữ liệu bảng
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    throw error;
  }
};
