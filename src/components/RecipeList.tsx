import RecipeCard from "./RecipeCard";

interface RecipeListProps {
  recipes: any[];
  onRecipeSelect: (recipe: any) => void;
  showBachelorBadges?: boolean;
}

const LABELS = ["🔥 Best Match", "⏱ Fastest", "🧺 Simple"];

const RecipeList = ({
  recipes,
  onRecipeSelect,
  showBachelorBadges,
}: RecipeListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => onRecipeSelect(recipe)}
          highlightLabel={LABELS[index]}
          showBachelorBadges={showBachelorBadges}
        />
      ))}
    </div>
  );
};

export default RecipeList;
