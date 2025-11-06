import type { LoadMenuProps } from "../types";
import { filterMenuByRole, parseMenu } from "../utils";
import { fetchSidebarMenu } from "../utils/sidebarMenuApi";

export const loadMenu = async ({ role, division, setMenuLoading, setMenu }: LoadMenuProps) => {
    setMenuLoading(true);
    try {
        const data = await fetchSidebarMenu();
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