import type { MenuContextValueType, RawMenuValue, UserDivision, UserRoles } from "../types";

export function parseMenu(data: RawMenuValue[]): MenuContextValueType[] {
    return data.map(item => ({
        key: item.key,
        title: item.title,
        path: item.path,
        roles: item.roles
            ? (item.roles.split(',').map(role => role.trim()) as UserRoles[])
            : [],
        visible: item.visible === true || item.visible === 'true',
        icon: item.icon,
        division: item.division?.length
            ? (item.division.split(',').map((division: string) => division.trim()) as UserDivision[])
            : [],
        children: item.children,
    }));
}