import type { User } from "../types";
import { fetchSheetData } from "./googleSheets";

export async function fetchUserByEmail(email: string | null): Promise<User | undefined> {
    const users = await fetchSheetData("users");
    if (!Array.isArray(users)) return undefined;
    return users.find((u: User) => u.email?.toLowerCase() === email?.toLowerCase());
}