import { google } from "googleapis";
import path from "path";

/**
 * Service Layer for Google Sheets API
 * Using local keyFile for maximum stability with OpenSSL 3 and Turbopack.
 */

export const getGoogleSheetsClient = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      // Resolve path relative to project root
      keyFile: path.join(process.cwd(), "kodein-school-b19ce657123b.json"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    return google.sheets({ version: "v4", auth });
  } catch (error: any) {
    throw new Error(`Google Sheets Initialization Error: ${error.message}`);
  }
};

export const SHEET_ID = process.env.GOOGLE_SHEET_ID;
export const DEFAULT_SHEET_NAME = "Booklets";
