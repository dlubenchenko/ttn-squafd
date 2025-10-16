import type { User } from "./user";

export type AuthContextType = {
    user: FirebaseUser | null;
    setUser: (user: FirebaseUser | null) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    authLoading: boolean;
}

export interface FirebaseUser extends Pick<User, 'displayName' | 'role' | 'division'> {
    uid: string;
    email: string | null;
}