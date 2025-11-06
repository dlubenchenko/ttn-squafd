import type { MenuContextValueType, RawMenuValue, UserDivision, UserRoles } from "../types";

export function parseMenu(data: RawMenuValue[]): MenuContextValueType[] {
    return data.map(item => ({
        key: item.key,
        label: item.label,
        path: item.path,
        roles: Array.isArray(item.roles)
            ? item.roles
            : typeof item.roles === 'string'
                ? (item.roles.split(',').map(role => role.trim()) as UserRoles[])
                : [],
        available: item.available === true || item.available === 'true',
        icon: item.icon,
        division: Array.isArray(item.division)
            ? item.division
            : typeof item.division === 'string'
                ? (item.division.split(',').map(d => d.trim()) as UserDivision[])
                : [],
        childrenOf: typeof item.childrenOf === 'string' ? item.childrenOf : undefined,
        children: null
    }));
}