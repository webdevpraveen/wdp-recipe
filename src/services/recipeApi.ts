export interface RecipeResponse {
  title: string;
  ingredients: string[];
  steps: string[];
  cookTime: string;
  tips: string;
}

export async function generateRecipe(
  ingredients: string[],
  preferences: string[]
): Promise<RecipeResponse> {
  const res = await fetch("http://localhost:5000/api/recipe/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ingredients,
      preferences
    })
  });

  if (!res.ok) {
    throw new Error("Failed to generate recipe");
  }

  return res.json();
}
