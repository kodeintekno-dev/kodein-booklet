import { google } from "googleapis";

// Configuration for Google Sheets - Strictly Environment Driven
export const SHEET_ID = process.env.GOOGLE_SHEET_ID;
export const DEFAULT_SHEET_NAME = process.env.GOOGLE_SHEET_NAME || "Booklets";

/**
 * Mendapatkan client Google Sheets yang terautentikasi.
 * Menggunakan individual environment variables untuk keamanan dan kemudahan konfigurasi.
 */
export async function getGoogleSheetsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const projectId = process.env.GOOGLE_PROJECT_ID;

  // Validasi keberadaan environment variables secara ketat
  if (!clientEmail || !privateKey || !projectId) {
    throw new Error(
      "[Sheets API] Missing required environment variables: " +
      (!clientEmail ? "GOOGLE_CLIENT_EMAIL " : "") +
      (!privateKey ? "GOOGLE_PRIVATE_KEY " : "") +
      (!projectId ? "GOOGLE_PROJECT_ID" : "")
    );
  }

  try {
    // Konfigurasi Auth menggunakan individual credentials dari .env
    // Normalisasi Private Key: Menangani berbagai kemungkinan escaping \n di environment variables
    const formattedKey = privateKey
      .replace(/\\n/g, "\n")       // Ganti literal \n (backslash + n) menjadi newline asli
      .replace(/['"]/g, "")        // Hapus tanda petik (single/double) jika terbawa dari .env
      .trim();                     // Hapus whitespace di awal/akhir

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: formattedKey,
        project_id: projectId,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    console.log("[Sheets API] Authenticated using environment variables");
    return google.sheets({ version: "v4", auth });
  } catch (error) {
    console.error("[Sheets API] Authentication failed:", error);
    throw error;
  }
}
