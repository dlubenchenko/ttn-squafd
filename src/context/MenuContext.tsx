import { createContext, useContext, useState } from "react"
import type { ContextProviderProps, MenuContextType, MenuContextValueType } from "../types";
import { fetchSheetData } from "../api/googleSheets";
import { parseMenu } from "../utils";
import { filterMenuByRole } from "../utils/filterMenuByRole";
import { useAuthContext } from "./AuthContext";

export const MenuContext = createContext<MenuContextType>({} as MenuContextType);

export const MenuProvider = ({ children }: ContextProviderProps) => {

    const [menu, setMenu] = useState<MenuContextValueType[] | null>(null);
    const [menuLoading, setMenuLoading] = useState(false);

    const { user } = useAuthContext();

    const loadMenu = async () => {
        setMenuLoading(true);
        try {
            const data = await fetchSheetData('sidebar')
            if (Array.isArray(data)) {
                const parsedMenu = parseMenu(data);
                let filteredMenu = parsedMenu;
                if (user && user.role && user.division) {
                    filteredMenu = filterMenuByRole(parsedMenu, user.role, user.division);
                }
                setMenu(filteredMenu);
                console.log(parsedMenu);
                console.log(filteredMenu);
            }

        } catch (error) {
            console.error('Error fetching menu data:', error);
        }
        setMenuLoading(false);
    }


    return (
        <MenuContext.Provider value={{ menu, setMenu, menuLoading, setMenuLoading, loadMenu }}>
            {children}
        </MenuContext.Provider>
    )
}

export function useMenuContext() {
    return useContext(MenuContext);
}