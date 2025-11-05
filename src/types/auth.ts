import type { LoadMenuProps, MenuContextValueType } from "./menu";
import type { User } from "./user";

export type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    authLoading: boolean;
    menu: MenuContextValueType[] | null;
    setMenu: (menu: MenuContextValueType[] | null) => void;
    loadMenu: (props: LoadMenuProps) => void;
}

export interface FirebaseUser extends Pick<User, 'displayName' | 'role' | 'division' | 'department'> {
    uid: string;
    email: string | null;
}