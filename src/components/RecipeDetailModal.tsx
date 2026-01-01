import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Users, Check, Download } from "lucide-react";

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  servings: number;
  ingredients?: string[];
  instructions?: string[];
  nutrition?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
}

const RecipeDetailModal = ({ recipe, open, onClose }: RecipeDetailModalProps) => {
  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass-strong border-none">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {recipe.title}
          </DialogTitle>
          
          {/* Badges */}
          <div className="flex justify-center gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium">
              <Clock className="w-4 h-4" />
              {recipe.cookTime}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/40 text-foreground text-sm font-medium">
              <Users className="w-4 h-4" />
              {recipe.servings} servings
            </span>
            {recipe.nutrition && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/30 text-foreground text-sm font-medium">
                🔥 {recipe.nutrition.calories}
              </span>
            )}
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {/* Ingredients Section */}
          <div>
            <h3 className="font-display text-lg font-semibold text-primary mb-4">
              Ingredients
            </h3>
            <ul className="space-y-3">
              {recipe.ingredients?.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 pb-3 border-b border-muted/30 last:border-none"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="font-body text-foreground/90 text-sm">
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div>
            <h3 className="font-display text-lg font-semibold text-destructive mb-4">
              Instructions
            </h3>
            <ol className="space-y-4">
              {recipe.instructions?.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 text-destructive text-sm font-semibold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="font-body text-foreground/80 text-sm leading-relaxed">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Nutritional Info */}
        {recipe.nutrition && (
          <div className="mt-8 pt-6 border-t border-muted/30">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 text-center">
              Nutritional Information <span className="text-muted-foreground text-sm font-normal">(per serving)</span>
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center glass rounded-xl p-3">
                <p className="font-display text-xl font-bold text-primary">{recipe.nutrition.calories}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Calories</p>
              </div>
              <div className="text-center glass rounded-xl p-3">
                <p className="font-display text-xl font-bold text-primary">{recipe.nutrition.protein}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Protein</p>
              </div>
              <div className="text-center glass rounded-xl p-3">
                <p className="font-display text-xl font-bold text-primary">{recipe.nutrition.carbs}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Carbs</p>
              </div>
              <div className="text-center glass rounded-xl p-3">
                <p className="font-display text-xl font-bold text-primary">{recipe.nutrition.fat}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">Fat</p>
              </div>
            </div>
          </div>
        )}

        {/* Download Button */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-primary-foreground font-body font-medium hover:scale-105 transition-transform">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        {/* Note */}
        <p className="mt-6 text-center font-body text-xs text-muted-foreground italic">
          Note: This recipe was generated by AI and hasn't been kitchen-tested. Please review the steps and use your best judgment. Happy cooking!
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailModal;
