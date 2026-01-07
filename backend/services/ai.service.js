import fetch from "node-fetch";

export async function generateRecipe(ingredients, preferences) {
  const API_KEY = process.env.GROQ_API_KEY;

  if (!API_KEY) {
    throw new Error("GROQ_API_KEY missing");
  }

  console.log("🔑 GROQ KEY PREFIX:", API_KEY.slice(0, 6));

  const prompt = `
You are an Indian home cooking assistant.

Create a SIMPLE Indian recipe (ghar jaisa khana).

Ingredients: ${ingredients.join(", ")}
Preferences: ${preferences.join(", ")}

Return STRICT JSON only in this format:
{
  "title": "",
  "ingredients": [],
  "steps": [],
  "cookTime": "",
  "tips": ""
}
`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // ✅ UPDATED MODEL
        messages: [
          { role: "system", content: "You are a helpful Indian cooking assistant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.6
      })
    }
  );

  const data = await response.json();

  if (!data.choices) {
    console.error("❌ GROQ RAW ERROR:", data);
    throw new Error("Groq failed");
  }

  return data.choices[0].message.content;
}
