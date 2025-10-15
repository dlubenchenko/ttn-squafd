const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

export async function fetchSheetData(sheetName: string) {
    const url = `${API_KEY}${sheetName}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch data from Google Sheets');

    const data = await response.json();

    return data;
}