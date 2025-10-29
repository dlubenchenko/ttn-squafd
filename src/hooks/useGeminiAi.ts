import { useState } from "react";
// Імпортуємо з @google/generative-ai (саме ця бібліотека потрібна!)
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-2.0-flash"; // або "gemini-1.0-pro" якщо треба

export function useGeminiAi(apiKey: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // SDK ініціалізується один раз
  const ai = new GoogleGenerativeAI(apiKey);

  async function askGemini(prompt: string): Promise<string | null> {
    setLoading(true);
    setError(null);
    try {
      // Отримуємо модель
      const model = ai.getGenerativeModel({ model: MODEL_NAME });
      // Надсилаємо prompt (рядок)
      const result = await model.generateContent(prompt);

      const text = await result.response.candidates?.[0]?.content?.parts?.[0]?.text || null;

      // result.text — це вже готовий текст відповіді
      setLoading(false);
      return text;
    } catch (e: any) {
      setError(e.message || "Помилка запиту до Gemini API");
      setLoading(false);
      return null;
    }
  }

  return { askGemini, loading, error };
}