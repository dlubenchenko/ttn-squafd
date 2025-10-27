export type UserRoles = 'admin' | 'teamlead' | 'agent' | 'guest';

export type UserDivision = 'tkting' | 'r&r' | 'invol' | 'analytics' | 'all';
export interface User {
    email: string;
    displayName?: string | null;
    role: UserRoles;
    department?: string;
    division?: UserDivision | null;
}