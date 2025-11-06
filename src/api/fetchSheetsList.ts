import { useFirebaseIdToken } from "../hooks";
import { fetchWithRetry } from "../utils/fetchWithRetry";

export async function fetchSheetsList(link: string): Promise<{ name: string, month: string, year: string }[]> {
    const token = await useFirebaseIdToken();
    const url = `${link}?action=sheetsList&token=${token}`;

    // console.log(url);
    
    const res = await fetchWithRetry(url, undefined, 2, 1000);
    const data = await res.json();

    // console.log(data);
    
    if (data.result === "success") return data.sheets;
    throw new Error(data.message || "Failed to fetch sheets list");
}