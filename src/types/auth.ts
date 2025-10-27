import type { LoadMenuProps, MenuContextValueType } from "./menu";
import type { User } from "./user";

export type AuthContextType = {
    user: FirebaseUser | null;
    setUser: (user: FirebaseUser | null) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    authLoading: boolean;
    menu: MenuContextValueType[] | null;
    setMenu: (menu: MenuContextValueType[] | null) => void;
    loadMenu: (props: LoadMenuProps) => Promise<void>;
}

export interface FirebaseUser extends Pick<User, 'displayName' | 'role' | 'division' | 'department'> {
    uid: string;
    email: string | null;
}