import fetch from "node-fetch";
import { buildIndianRecipePrompt } from "../utils/prompt.js";

export async function generateIndianRecipe(
  ingredients,
  preferences,
  context
) {
  const prompt = buildIndianRecipePrompt(
    ingredients,
    preferences,
    context
  );

  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        // 🔥 SAFE + AVAILABLE MODEL
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a strict JSON API. Respond ONLY with valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.4,
      }),
    }
  );

  const data = await response.json();

  console.log("🧠 AI RAW RESPONSE:", data);

  if (!data.choices || !data.choices[0]) {
    throw new Error("No AI response");
  }

  const rawText = data.choices[0].message.content;

  const jsonStart = rawText.indexOf("{");
  const jsonEnd = rawText.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("Invalid JSON from AI");
  }

  const cleanJson = rawText.slice(jsonStart, jsonEnd + 1);

  return JSON.parse(cleanJson);
}
