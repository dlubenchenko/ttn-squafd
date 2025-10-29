import { parser } from "./parser";

export function useParser(parserId: string, aiParser: (input: string) => Promise<string | null>) {
    return async (input: string) => {
        const parserFn = parser[parserId];
        // Якщо функція є — використовуємо її, якщо ні — AI
        if (typeof parserFn === "function") {
            return parserFn(input);
        }
        // Якщо parserId == "ai-parser" або кастомного парсера немає — AI
        return await aiParser(input);
    };
}