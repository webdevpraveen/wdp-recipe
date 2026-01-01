import { Clock, Users } from "lucide-react";

interface RecipeCardProps {
  recipe: any;
  onClick: () => void;
  showBachelorBadges?: boolean;
  highlightLabel?: string;
}

const RecipeCard = ({
  recipe,
  onClick,
  showBachelorBadges,
  highlightLabel,
}: RecipeCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group glass rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-2 relative"
    >
      {highlightLabel && (
        <div className="absolute top-3 left-3 z-10 px-2 py-1 text-xs rounded-lg glass">
          {highlightLabel}
        </div>
      )}

      <img
        src={recipe.image}
        alt={recipe.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold mb-2">{recipe.title}</h3>

        {showBachelorBadges && (
          <div className="flex gap-2 text-xs mb-3">
            <span className="glass px-2 py-0.5 rounded-full">Easy</span>
            <span className="glass px-2 py-0.5 rounded-full">Quick</span>
          </div>
        )}

        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {recipe.readyInMinutes || "—"} min
          </span>
          <span className="flex items-center gap-1">
            <Users size={14} /> {recipe.servings || "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
