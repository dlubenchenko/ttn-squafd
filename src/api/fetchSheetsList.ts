import { useFirebaseIdToken } from "../hooks";

export async function fetchSheetsList(link: string): Promise<{ name: string, month: string, year: string }[]> {
    const token = await useFirebaseIdToken();
    const url = `${link}?action=sheetsList&token=${token}`;

    // console.log(url);
    
    const res = await fetch(url);
    const data = await res.json();

    // console.log(data);
    
    if (data.result === "success") return data.sheets;
    throw new Error(data.message || "Failed to fetch sheets list");
}