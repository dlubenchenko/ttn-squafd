// src/utils/aiParser.ts
import { AI_PARSER_PROMPT } from "../../constants/aiPrompts";
import { useOpenRouterAi } from "../../hooks";

// Повертає функцію, яку можна викликати для парсингу через AI
export function useAiParser(apiKey: string, model: string) {
  const { askOpenRouter, loading, error } = useOpenRouterAi(apiKey, model);

  async function parseWithAi(input: string): Promise<string | null> {
    if (!input.trim()) return null;
    const prompt = `${AI_PARSER_PROMPT}${input}`;
    return await askOpenRouter(prompt);
  }

  return { parseWithAi, loading, error };
}