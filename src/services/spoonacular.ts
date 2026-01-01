const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

/**
 * Indian → English normalization
 */
function normalizeIngredients(ingredients: string[]): string {
  const map: Record<string, string> = {
    aloo: "potato",
    pyaz: "onion",
    tamatar: "tomato",
    matar: "peas",
    paneer: "paneer",
    dahi: "yogurt",
    curd: "yogurt",
    mirch: "chili",
    dhaniya: "coriander",
    oil: "oil",
  };

  return ingredients
    .map((i) => map[i.toLowerCase()] || i.toLowerCase())
    .join(",");
}

export async function fetchRecipesByIngredients(
  ingredients: string[],
  preferences: string[]
) {
  const includeIngredients = normalizeIngredients(ingredients);

  const isVeg = preferences.includes("veg");
  const isNonVeg = preferences.includes("non-veg");
  const isQuick = preferences.includes("quick");
  const isBachelor = preferences.includes("bachelor");

  const params = new URLSearchParams({
    apiKey: API_KEY,
    cuisine: "Indian",
    includeIngredients,
    number: "9",
    addRecipeInformation: "true",
    sort: "popularity",
    maxIngredients: "7", // simple food
  });

  // Veg filter
  if (isVeg) {
    params.set("diet", "vegetarian");
    params.set(
      "excludeIngredients",
      "chicken,beef,pork,lamb,fish,prawn,shrimp,egg"
    );
  }

  // Non-veg filter (allow meat, but avoid fancy stuff)
  if (isNonVeg) {
    params.set(
      "excludeIngredients",
      "prosciutto,bacon,ham,brie,parmesan,goat cheese"
    );
  }

  // Bachelor / quick = easy recipes
  if (isQuick || isBachelor) {
    params.set("maxReadyTime", "30");
  }

  const res = await fetch(
    `${BASE_URL}/recipes/complexSearch?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await res.json();
  return data.results;
}
