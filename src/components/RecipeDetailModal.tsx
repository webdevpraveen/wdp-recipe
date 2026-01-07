import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Check, Layers } from "lucide-react";

export interface Recipe {
  title: string;
  ingredients: string[];
  steps: string[];
  cookTime: string;
  tips: string;
}

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
}

const RecipeDetailModal = ({
  recipe,
  open,
  onClose,
}: RecipeDetailModalProps) => {
  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass-strong border-none">
        {/* HEADER */}
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="font-display text-2xl md:text-3xl font-bold">
            {recipe.title}
          </DialogTitle>

          {/* Meta badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm font-medium">
              <Clock className="w-4 h-4" />
              {recipe.cookTime}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm font-medium">
              <Layers className="w-4 h-4" />
              {recipe.ingredients.length} ingredients
            </span>
          </div>
        </DialogHeader>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          {/* INGREDIENTS */}
          <div>
            <h3 className="font-display text-lg font-semibold text-primary mb-4">
              Ingredients
            </h3>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 pb-3 border-b border-muted/30 last:border-none"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <span className="text-sm">
                    {ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* STEPS */}
          <div>
            <h3 className="font-display text-lg font-semibold text-destructive mb-4">
              Cooking Steps
            </h3>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-destructive/10 text-destructive text-sm font-semibold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* TIPS */}
        {recipe.tips && (
          <div className="mt-8 pt-6 border-t border-muted/30">
            <h3 className="font-display text-lg font-semibold mb-2 text-center">
              Chef’s Tip 👨‍🍳
            </h3>
            <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto">
              {recipe.tips}
            </p>
          </div>
        )}

        {/* FOOTER NOTE */}
        <p className="mt-6 text-center text-xs text-muted-foreground italic">
          This recipe is AI-generated. Adjust salt, spice & oil as per your taste 🙂
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailModal;
