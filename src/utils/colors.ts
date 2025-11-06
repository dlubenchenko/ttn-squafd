import { DivisionColor, RoleColor, type DivisionKey, type RoleKey } from "../types";

export function getColor(key: string): string {
    return RoleColor[key as RoleKey] || DivisionColor[key as DivisionKey];
}