import { useState } from "react";
import Header from "./Header";
import IngredientInput from "./IngredientInput";
import PreferenceChips from "./PreferenceChips";
import CookingAnimation from "./CookingAnimation";
import RecipeList from "./RecipeList";
import RecipeDetailModal from "./RecipeDetailModal";
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:5000/api/recipe/generate";

export interface Recipe {
  title: string;
  ingredients: string[];
  steps: string[];
  cookTime: string;
  tips: string;
}

const Home = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (ingredients.length < 2) return;

    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ingredients,
          preferences
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to generate recipe");
      }

      // backend returns ONE recipe → UI expects list
      setRecipes([data]);
    } catch (err) {
      console.error(err);
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 pb-16">
        {/* HERO / INPUT SECTION */}
        <section className="py-12 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            What's in Your <span className="text-gradient">Kitchen?</span>
          </h2>

          <p className="text-muted-foreground mb-8">
            Add ingredients you have and get a simple Indian recipe ✨
          </p>

          <div className="space-y-6">
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
              disabled={ingredients.length < 2 || loading}
              className="mt-6 px-8 py-4 rounded-xl gradient-accent text-primary-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🍳 Generate Recipe
            </button>
          </div>
        </section>

        {/* LOADING */}
        {loading && (
          <section className="mt-8">
            <CookingAnimation />
          </section>
        )}

        {/* ERROR */}
        {!loading && error && (
          <p className="text-center text-red-500 mt-6">
            {error}
          </p>
        )}

        {/* RESULTS */}
        {!loading && recipes.length > 0 && (
          <section className="mt-10 animate-fade-up">
            <RecipeList
              recipes={recipes}
              onRecipeSelect={(recipe) => setSelectedRecipe(recipe)}
            />
          </section>
        )}
      </main>

      {/* RECIPE DETAIL MODAL */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
};

export default Home;
