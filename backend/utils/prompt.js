export function buildRecipePrompt(ingredients, preferences) {
  const ingredientText = ingredients.join(", ");
  const prefText = preferences.length
    ? preferences.join(", ")
    : "no specific preference";

  return `
You are a professional Indian home chef.

Create a simple Indian recipe using:
Ingredients: ${ingredientText}
Preferences: ${prefText}

Return:
- Recipe name
- Ingredients list
- Step-by-step instructions
- Cooking time
- Servings
- Tips for bachelors
- Hindi translation of the recipe
- Nutritional information

Format the response in markdown with appropriate headings and bullet points.

Keep it simple and practical.
`;
}
