import RecipeCard from "./RecipeCard";

export interface Recipe {
  title: string;
  ingredients: string[];
  steps: string[];
  cookTime: string;
  tips: string;
}

interface RecipeListProps {
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
  showBachelorBadges?: boolean;
}

const LABELS = ["🔥 Best Match", "⏱ Fastest", "🧺 Simple"];

const RecipeList = ({
  recipes,
  onRecipeSelect,
  showBachelorBadges = false,
}: RecipeListProps) => {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={`${recipe.title}-${index}`}   // ✅ safe key (backend has no id)
          recipe={recipe}
          onClick={() => onRecipeSelect(recipe)}
          highlightLabel={LABELS[index % LABELS.length]} // ✅ safe even if >3
          showBachelorBadges={showBachelorBadges}
        />
      ))}
    </div>
  );
};

export default RecipeList;
