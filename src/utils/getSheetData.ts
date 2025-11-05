import { fetchSheetData } from "../api";

export async function getSheetData(sheet: string | null, url: string | null) {
    if (!sheet || !url) return undefined;

    const sheetData = await fetchSheetData(sheet, url);
    if (!Array.isArray(sheetData)) return undefined;
    
    return sheetData;
}