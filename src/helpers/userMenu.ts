import type { User } from "../types";

export function userMenu(firebaseUser: { uid: string; email: string | null }, sheetUserInfo: User | null) {
    return {
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? "",
        displayName: sheetUserInfo?.displayName || null,
        department: sheetUserInfo?.department,
        role: sheetUserInfo?.role || "guest",
        division: sheetUserInfo?.division,
    };
}