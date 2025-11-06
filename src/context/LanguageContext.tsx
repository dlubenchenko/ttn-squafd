import React, { createContext, useContext } from "react"
import type { LangKey, LanguageContextType } from "../types";
import type { ContextProviderProps } from "../types/context";
import { EN, UA } from "../locales";

const locales = { UA: UA, EN: EN }

const LanguageContext = createContext<LanguageContextType>({
    userLang: 'UA',
    setUserLang: () => { },
    language: UA,
});

export const userLanguageHandler = () => useContext(LanguageContext)

export default function LanguageProvider({ children }: ContextProviderProps) {
    const [userLang, setUserLang] = React.useState<LangKey>('UA');
    const language = locales[userLang];


    return (
        <LanguageContext.Provider value={{ userLang, setUserLang, language }}>
            {children}
        </LanguageContext.Provider>
    )
}
