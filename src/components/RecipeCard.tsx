import { Clock, Layers } from "lucide-react";

export interface Recipe {
  title: string;
  ingredients: string[];
  steps: string[];
  cookTime: string;
  tips: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  showBachelorBadges?: boolean;
  highlightLabel?: string;
}

const RecipeCard = ({
  recipe,
  onClick,
  showBachelorBadges = false,
  highlightLabel,
}: RecipeCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg relative"
    >
      {/* Highlight Label */}
      {highlightLabel && (
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg glass text-xs font-medium">
          {highlightLabel}
        </div>
      )}

      {/* Placeholder Image (static, safe) */}
      <div className="h-44 w-full bg-gradient-to-br from-orange-200/40 to-rose-200/40 flex items-center justify-center">
        <span className="text-6xl">🍲</span>
      </div>

      <div className="p-5">
        {/* Title */}
        <h3 className="font-display text-lg font-semibold mb-2 line-clamp-1">
          {recipe.title}
        </h3>

        {/* Short description / tips */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {recipe.tips}
        </p>

        {/* Bachelor badges */}
        {showBachelorBadges && (
          <div className="flex flex-wrap gap-2 text-xs mb-3">
            <span className="glass px-2 py-0.5 rounded-full">
              ⭐ Easy
            </span>
            <span className="glass px-2 py-0.5 rounded-full">
              ⏱ Quick
            </span>
            <span className="glass px-2 py-0.5 rounded-full">
              🧺 Few Ingredients
            </span>
             <span className="glass px-2 py-0.5 rounded-full">
             👌 Hinglish
            </span>
          </div>
        )}

        {/* Meta info */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {recipe.cookTime}
          </span>
          <span className="flex items-center gap-1">
            <Layers size={14} />
            {recipe.ingredients.length} items
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
