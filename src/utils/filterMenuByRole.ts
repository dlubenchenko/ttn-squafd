import type { MenuContextValueType, UserDivision, UserRoles } from "../types";

export function filterMenuByRole(
    menu: MenuContextValueType[],
    role: UserRoles,
    division: UserDivision): MenuContextValueType[] {
    return menu.filter(item => {

        // Не показуємо, якщо явно вимкнено
        if (item.available === false || item.available === 'FALSE') return false;

        // Якщо немає ролей — не показуємо
        if (!item.roles || !item.roles.includes(role)) return false;

        if (role === 'admin') {
            // admin бачить все, де він є у roles, навіть якщо division порожній
            return true;
        }

        // Для інших ролей: має бути їхній division або "all"
        if (!item.division || item.division.length === 0) return false;
        if (item.division.includes('all')) return true;
        if (item.division.includes(division)) return true;

        return false;
    })
}