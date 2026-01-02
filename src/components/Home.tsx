import { useState } from "react";
import Header from "./Header";
import IngredientInput from "./IngredientInput";
import PreferenceChips from "./PreferenceChips";
import CookingAnimation from "./CookingAnimation";
import RecipeList from "./RecipeList";
import RecipeDetailModal from "./RecipeDetailModal";

const BACKEND_URL = "http://localhost:5000/api/recipe/generate";

const Home = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients,
          preferences,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Backend returns ONE recipe → convert to array for UI
      setRecipes([data]);
    } catch (err: any) {
      setError("Failed to generate recipe. Backend not responding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 pb-16">
        <section className="py-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            What's in Your <span className="text-gradient">Kitchen?</span>
          </h2>

          <IngredientInput
            ingredients={ingredients}
            onIngredientsChange={setIngredients}
          />

          <PreferenceChips
            selectedPreferences={preferences}
            onPreferencesChange={setPreferences}
          />

          <button
            onClick={handleGenerate}
            disabled={ingredients.length < 2}
            className="mt-6 px-8 py-4 rounded-xl gradient-accent text-white disabled:opacity-50"
          >
            🍳 Generate Recipe
          </button>
        </section>

        {loading && <CookingAnimation />}

        {error && (
          <p className="text-center text-red-400 mt-4">{error}</p>
        )}

        {!loading && recipes.length > 0 && (
          <RecipeList
            recipes={recipes}
            onRecipeSelect={(r) => setSelectedRecipe(r)}
          />
        )}
      </main>

      <RecipeDetailModal
        recipe={selectedRecipe}
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
};

export default Home;
