import { useState } from "react";

// Можна змінити модель на claude-3-haiku, llama-3, mixtral тощо
const DEFAULT_MODEL = "openai/gpt-3.5-turbo"; // або "mistralai/mixtral-8x7b-instruct", "meta-llama/llama-3-8b-instruct", "anthropic/claude-3-haiku"

export function useOpenRouterAi(apiKey: string, model: string = DEFAULT_MODEL) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function askOpenRouter(prompt: string): Promise<string | null> {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin, // для безкоштовного ключа це обов'язково!
          "X-Title": "ttn-squad-parser"
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content || null;
      setLoading(false);
      return text;
    } catch (e: any) {
      setError(e.message || "Помилка запиту до OpenRouter");
      setLoading(false);
      return null;
    }
  }

  return { askOpenRouter, loading, error };
}