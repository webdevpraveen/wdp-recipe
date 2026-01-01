import { useState } from "react";
import Header from "./Header";
import IngredientInput from "./IngredientInput";
import PreferenceChips from "./PreferenceChips";
import CookingAnimation from "./CookingAnimation";
import RecipeList from "./RecipeList";
import RecipeDetailModal from "./RecipeDetailModal";
import { fetchRecipesByIngredients } from "@/services/spoonacular";

const Home = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const data = await fetchRecipesByIngredients(ingredients, preferences);
    setRecipes(data);
    setLoading(false);
  };

  const handleRecipeSelect = (recipe: any) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
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
            className="mt-6 px-8 py-4 rounded-xl gradient-accent text-white"
          >
            🍳 Generate Recipes
          </button>
        </section>

        {loading && <CookingAnimation />}

        {!loading && recipes.length > 0 && (
          <RecipeList
            recipes={recipes}
            onRecipeSelect={handleRecipeSelect}
            showBachelorBadges={preferences.includes("bachelor")}
          />
        )}
      </main>

      {/* ✅ RECIPE DETAIL MODAL */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
