import { fetchSheetData, getDataFromFirestore } from "../api";
import type { User } from "../types";

export async function getUserByEmail(email: string | null): Promise<User | undefined> {
    if (!email) return undefined;

    const config = await getDataFromFirestore("config", "uukhzawgfo12mxNhSMkn");

    if (!config || !config.GOOGLE_SHEETS_API_KEY) return undefined;

    const users = await fetchSheetData("users", config.GOOGLE_SHEETS_API_KEY);
    if (!Array.isArray(users)) return undefined;

    return users.find((u: User) => u.email?.toLowerCase() === email?.toLowerCase());
}