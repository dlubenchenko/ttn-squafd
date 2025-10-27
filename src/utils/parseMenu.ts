import type { MenuContextValueType, RawMenuValue, UserDivision, UserRoles } from "../types";

export function parseMenu(data: RawMenuValue[]): MenuContextValueType[] {
    return data.map(item => ({
        key: item.key,
        label: item.label,
        path: item.path,
        roles: item.roles
            ? (item.roles.split(',').map(role => role.trim()) as UserRoles[])
            : [],
        available: item.available === true || item.available === 'true',
        icon: item.icon,
        division: item.division?.length
            ? (item.division.split(',').map((division: string) => division.trim()) as UserDivision[])
            : [],
        childrenOf: item.childrenOf || null,
        children: null
    }));
}