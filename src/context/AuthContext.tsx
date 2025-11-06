import { createContext, useContext, useEffect, useState } from "react"

import type { User, ContextProviderProps, AuthContextType, MenuContextValueType } from "../types";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

import { loadMenu, userMenu } from "../helpers";
import { getUserByEmail } from "../utils";
import { addSheetData } from "../api";

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: ContextProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    const [menu, setMenu] = useState<MenuContextValueType[] | null>(null);
    const [_menuLoading, setMenuLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            const handleUser = async () => {
                if (firebaseUser) {
                    const user = {
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                    }
                    const sheetUserInfo = await getUserByEmail(firebaseUser.email);
                    sheetUserInfo && setUser(userMenu(user, sheetUserInfo));

                    if (sheetUserInfo?.role && sheetUserInfo?.division) {
                        await loadMenu({
                            role: sheetUserInfo?.role,
                            division: sheetUserInfo?.division,
                            setMenu,
                            setMenuLoading,
                        });
                    }
                } else {
                    setUser(null);
                    setMenu(null);
                }
                setAuthLoading(false);
            };
            handleUser();
        });
        return () => unsubscribe();
    }, []);


    const login = async (email: string, password: string) => {
        setAuthLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
            }
            let sheetUserInfo = await getUserByEmail(email);

            if (!sheetUserInfo) {
            const displayName = email.split('@')[0];
            await addSheetData({
                email,
                displayName,
                role: 'guest',
                department: 'none',
                division: 'none',
                nameUkr: 'Гість'
            }, 'users');
            // Після додавання — ще раз отримуємо
            sheetUserInfo = await getUserByEmail(email);
        }
            sheetUserInfo && setUser(userMenu(user, sheetUserInfo));
            if (sheetUserInfo?.role && sheetUserInfo?.division) {
                await loadMenu({
                    role: sheetUserInfo?.role,
                    division: sheetUserInfo?.division,
                    setMenu,
                    setMenuLoading,
                });
            }
        } catch (error: unknown) {
            setAuthLoading(false)
            throw error;
        }
    }

    const logout = () => {
        setAuthLoading(true)
        setUser(null);
        setMenu(null);
        auth.signOut()
    }

    return (
        <AuthContext.Provider value={{
            user, setUser, login, logout, authLoading, menu, setMenu, loadMenu: (props) => loadMenu({ ...props, setMenu, setMenuLoading })
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext);
}
