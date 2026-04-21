import { google } from "googleapis";

// Configuration for Google Sheets
export const SHEET_ID = process.env.GOOGLE_SHEET_ID;
export const DEFAULT_SHEET_NAME = "Booklets";

/**
 * Mendapatkan client Google Sheets yang terautentikasi.
 */
export async function getGoogleSheetsClient() {
  try {
    const serviceAccountVar = process.env.GOOGLE_SERVICE_ACCOUNT;
    
    let auth;
    
    if (serviceAccountVar) {
      // MODE PRODUKSI: Menggunakan JSON string dari env variable
      // Pembersihan string: Menangani kemungkinan tanda petik atau karakter aneh yang terbawa dari shell
      const cleanJsonStr = serviceAccountVar.trim().replace(/^['"]|['"]$/g, "");
      const credentials = JSON.parse(cleanJsonStr);
      
      // NORMALISASI: Perbaikan karakter baris baru (\n) yang rusak
      if (credentials.private_key) {
        credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
        
        // Memastikan tidak ada \n literal yang masih tertinggal sebagai string "\\n"
        if (!credentials.private_key.includes("\n") && credentials.private_key.includes("n")) {
           // Fallback jika replace regex gagal
           credentials.private_key = credentials.private_key.split("\\n").join("\n");
        }
      }
      
      auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      });
      
      console.log("[Sheets API] Using Service Account credentials from Environment Variable (Hardened)");
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
