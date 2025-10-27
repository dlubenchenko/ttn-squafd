import type { LoadMenuProps } from "../types";
import { fetchSheetData } from "../api/googleSheets";
import { filterMenuByRole, parseMenu } from "../utils";

export const loadMenu = async ({ role, division, setMenuLoading, setMenu }: LoadMenuProps) => {
    setMenuLoading(true);
    try {
        const data = await fetchSheetData('sidebar');
        if (Array.isArray(data)) {
            const parsedMenu = parseMenu(data);
            const filteredMenu = filterMenuByRole(parsedMenu, role, division);
            
            setMenu(filteredMenu);
        } else {
            setMenu([]);
        }

    } catch (error) {
        setMenu([]);
        console.error('Error fetching menu data', error);
    }
    setMenuLoading(false);
}