export type LangKey = 'UA' | 'EN';
export interface LanguageContextType {
    userLang: LangKey;
    setUserLang: React.Dispatch<React.SetStateAction<LangKey>>;
    language: Record<string, any>
}