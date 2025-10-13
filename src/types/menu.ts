import { type UserRoles } from './user';
import { type UserDivision } from './user';

export interface SidebarMenuItems {
    key: string;
    title: string;
    path: string;
    roles: UserRoles[];
    visible: boolean;
    children?: SidebarMenuItems[];
    icon: string;
    division: UserDivision[];
}