export function buildIndianRecipePrompt(ingredients, preferences, context) {
  return `
You are an expert Indian home cook.

Your task:
- Suggest ONE simple Indian home-style recipe
- Use ONLY these ingredients: ${ingredients.join(", ")}
- Cooking style: typical Indian kitchen (kadhai, tawa, pressure cooker)
- Avoid fancy or foreign ingredients
- Keep it bachelor friendly and practical

Preferences:
${preferences.join(", ")}

Internet context (for inspiration only):
${context}

Return result STRICTLY in this JSON format:

{
  "title": "",
  "ingredients": [],
  "instructions": [],
  "time": "",
  "servings": 1,
  "tips": ""
}

Rules:
- Steps should sound like Indian cooking
- Simple language
- No oven, no wine, no exotic techniques, no to over work
`;
}
