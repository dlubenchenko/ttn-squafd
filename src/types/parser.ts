export type ParserMap = {
    [key: string]: ((input: string) => string) | null;
};