export type UserRoles = 'admin' | 'teamlead' | 'agent' | 'guest';

export type UserDivision = 'ticketing' | 'r&r' | 'involuntary';
export interface User {
    email: string;
    displayName: string;
    role: UserRoles;
    department: string;
    division: UserDivision;
}