import type { MenuContextValueType, UserDivision, UserRoles } from "../types";

export function filterMenuByRole(menu: MenuContextValueType[], role: UserRoles, division: UserDivision): MenuContextValueType[] {
    return menu.filter(item => {
        if (item.visible === false || item.visible === 'FALSE') return false;

        if (item.roles && !item.roles.includes(role)) return false;

        if (!item.division || item.division.length === 0) {
            return role === "admin";
        }

        if (item.division.includes("all")) return true;

        if (item.roles && item.roles.includes(role)) return true;

        if (item.division.includes(division)) return true;

        return false;
    })
}