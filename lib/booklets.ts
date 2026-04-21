import { Booklet, BookletsResponse } from "@/types/booklet";
import { getGoogleSheetsClient, SHEET_ID, DEFAULT_SHEET_NAME } from "./google-sheets";

/**
 * Fetches and parses booklet data from Google Sheets.
 * 
 * @param kelas Optional filter for specific class
 * @returns Object containing success status, data, and available months
 */
export async function getBookletsFromSheets({
  kelas,
}: {
  kelas?: string;
} = {}): Promise<BookletsResponse> {
  // Validate basic config
  if (!SHEET_ID) {
    console.error("[Sheets Architecture] GOOGLE_SHEET_ID is missing.");
    return { success: false, data: {}, months: [] };
  }

  try {
    const sheets = await getGoogleSheetsClient();
    
    // Fetch data using the specific range format: 'SheetName!Range'
    const range = `${DEFAULT_SHEET_NAME}!A1:Z`;
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });

    const rows = response.data.values;
    console.log("[Sheets Architecture] Headers detected:", rows?.[0]?.slice(4));

    // Handle empty or missing sheet data
    if (!rows || rows.length === 0) {
      console.warn(`[Sheets Architecture] No data found in range ${range}`);
      return { success: true, data: {}, months: [] };
    }

    // Extract headers and data rows
    const [headers, ...dataRows] = rows;

    // Validate header structure (Minimum required: No, Nama, Kelas, Link Canva)
    if (headers.length < 4) {
      console.error("[Sheets Architecture] Invalid header structure. Expected at least 4 columns.");
      return { success: false, data: {}, months: [] };
    }

    // Month columns start from index 4 (Column E)
    const monthColumns = headers.slice(4) as string[];
    const validMonths = monthColumns.filter(m => m && m.trim() !== "");

    const bookletsByClass: Record<string, Booklet[]> = {};

    dataRows.forEach((row, rowIndex) => {
      // Basic row validation - must have at least Name and Class
      if (!row[1] || !row[2]) {
        console.debug(`[Sheets Architecture] Skipping invalid row at index ${rowIndex + 2}`);
        return;
      }

      const rowNo = row[0] || "";
      const rowName = row[1] || "";
      const rowKelas = row[2] || "";
      const rowCanva = row[3] || "";

      // Mapping month columns to the URL record
      const urlMap: Record<string, string> = {};
      validMonths.forEach((month, index) => {
        const cellValue = row[index + 4];
        if (cellValue && cellValue.startsWith("http")) {
          urlMap[month] = cellValue;
        }
      });

      const booklet: Booklet = {
        no: rowNo,
        name: rowName,
        kelas: rowKelas,
        linkCanva: rowCanva,
        url: urlMap,
      };

      // Server-side filtering logic
      if (kelas && kelas !== "All" && rowKelas !== kelas) {
        return;
      }

      if (!bookletsByClass[rowKelas]) {
        bookletsByClass[rowKelas] = [];
      }
      bookletsByClass[rowKelas].push(booklet);
    });

    return {
      success: true,
      data: bookletsByClass,
      months: validMonths,
    };
  } catch (error: any) {
    // Production logging strategy
    console.error("[Sheets Architecture] Execution failed:", error?.message || "Unknown error");
    
    // Check for common API errors
    if (error?.code === 403) {
      console.error("[Sheets Architecture] Permission Denied. Ensure service account has access to the spreadsheet.");
    }

    return {
      success: false,
      data: {},
      months: [],
    };
  }
}
