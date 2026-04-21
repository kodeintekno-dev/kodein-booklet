import { google } from "googleapis";

// Configuration for Google Sheets
export const SHEET_ID = process.env.GOOGLE_SHEET_ID;
export const DEFAULT_SHEET_NAME = "Booklets";

/**
 * Mendapatkan client Google Sheets yang terautentikasi.
 * Aplikasi ini mendukung dua metode autentikasi:
 * 1. Lokal: Menggunakan file keyFile (untuk development).
 * 2. Produksi (Vercel): Menggunakan environment variable GOOGLE_SERVICE_ACCOUNT (JSON string).
 */
export async function getGoogleSheetsClient() {
  try {
    const serviceAccountVar = process.env.GOOGLE_SERVICE_ACCOUNT;
    
    let auth;
    
    if (serviceAccountVar) {
      // MODE PRODUKSI: Menggunakan JSON string dari env variable
      const credentials = JSON.parse(serviceAccountVar);
      
      auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      });
      
      console.log("[Sheets API] Using Service Account credentials from Environment Variable");
    } else {
      // MODE LOKAL: Mencari file fisik .json
      auth = new google.auth.GoogleAuth({
        keyFile: "kodein-school-b19ce657123b.json",
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      });
      
      console.log("[Sheets API] Using local keyFile authentication");
    }

    return google.sheets({ version: "v4", auth });
  } catch (error) {
    console.error("[Sheets Architecture Error] Authentication failed:", error);
    throw error;
  }
}
