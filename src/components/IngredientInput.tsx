import { useState, useRef } from "react";
import { X } from "lucide-react";

const INGREDIENT_SUGGESTIONS = [
  "egg", "milk", "bread", "butter", "cheese", "chicken", "rice", "pasta",
  "tomato", "onion", "garlic", "potato", "carrot", "spinach", "mushroom",
  "beef", "pork", "salmon", "shrimp", "tofu", "beans", "lentils", "flour",
  "sugar", "salt", "pepper", "olive oil", "lemon", "lime", "avocado",
  "banana", "apple", "orange", "strawberry", "blueberry", "yogurt", "cream",
  "paneer", "turmeric", "chili", "water", "oil"
];

// Ingredient type categorization
const VEGETABLES = ["tomato", "onion", "garlic", "potato", "carrot", "spinach", "mushroom", "avocado", "lemon", "lime"];
const PROTEINS = ["egg", "chicken", "beef", "pork", "salmon", "shrimp", "tofu", "paneer", "beans", "lentils"];
const GRAINS = ["rice", "bread", "pasta", "flour"];
const SPICES = ["salt", "pepper", "turmeric", "chili", "sugar"];
const BASIC_ONLY = ["salt", "oil", "water", "sugar", "olive oil", "pepper"];

const getIngredientType = (ingredient: string): "vegetable" | "protein" | "grain" | "spice" | "other" => {
  const lower = ingredient.toLowerCase();
  if (VEGETABLES.includes(lower)) return "vegetable";
  if (PROTEINS.includes(lower)) return "protein";
  if (GRAINS.includes(lower)) return "grain";
  if (SPICES.includes(lower)) return "spice";
  return "other";
};

const getChipColorByType = (ingredient: string): string => {
  const type = getIngredientType(ingredient);
  switch (type) {
    case "vegetable":
      return "bg-[hsl(120_40%_90%)] text-[hsl(120_40%_30%)] border-[hsl(120_40%_70%)]";
    case "protein":
      return "bg-[hsl(40_80%_90%)] text-[hsl(30_60%_35%)] border-[hsl(40_70%_70%)]";
    case "grain":
      return "bg-[hsl(30_40%_88%)] text-[hsl(30_40%_30%)] border-[hsl(30_40%_70%)]";
    case "spice":
      return "bg-[hsl(25_50%_85%)] text-[hsl(25_50%_30%)] border-[hsl(25_50%_65%)]";
    default:
      return "bg-primary/20 text-primary border-primary/30";
  }
};

const hasOnlyBasicIngredients = (ingredients: string[]): boolean => {
  if (ingredients.length === 0) return false;
  return ingredients.every((ing) => BASIC_ONLY.includes(ing.toLowerCase()));
};

const hasMainIngredient = (ingredients: string[]): boolean => {
  return ingredients.some((ing) => {
    const lower = ing.toLowerCase();
    return VEGETABLES.includes(lower) || PROTEINS.includes(lower);
  });
};

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

const IngredientInput = ({ ingredients, onIngredientsChange }: IngredientInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = INGREDIENT_SUGGESTIONS.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !ingredients.includes(suggestion) &&
      inputValue.length > 0
  ).slice(0, 6);

  const addIngredient = (ingredient: string) => {
    const trimmed = ingredient.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      onIngredientsChange([...ingredients, trimmed]);
    }
    setInputValue("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeIngredient = (ingredient: string) => {
    onIngredientsChange(ingredients.filter((i) => i !== ingredient));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        addIngredient(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && ingredients.length > 0) {
      removeIngredient(ingredients[ingredients.length - 1]);
    }
  };

  const showBasicHint = hasOnlyBasicIngredients(ingredients) && !hasMainIngredient(ingredients);

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="glass-strong rounded-2xl p-3 transition-all duration-300 hover:shadow-lg">
        <div className="flex flex-wrap gap-2 items-center min-h-[48px]">
          {ingredients.map((ingredient) => (
            <span
              key={ingredient}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 ${getChipColorByType(ingredient)}`}
            >
              {ingredient}
              <button
                onClick={() => removeIngredient(ingredient)}
                className="hover:bg-foreground/10 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            placeholder={ingredients.length === 0 ? "Type ingredients (e.g., egg, milk, bread)" : "Add more..."}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="flex-1 min-w-[150px] bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground font-body text-base py-2 px-2"
          />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 glass-strong rounded-xl p-2 z-10 animate-fade-in">
            <div className="flex flex-wrap gap-2">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => addIngredient(suggestion)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-muted hover:bg-primary/20 hover:text-primary text-muted-foreground transition-all duration-200 hover:scale-105"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Helper message for ingredient count */}
      {ingredients.length < 3 && (
        <p className="text-center text-muted-foreground text-sm mt-3 font-body animate-fade-in">
          🥕 Better recipes need more ingredients. Try adding {3 - ingredients.length} more!
        </p>
      )}

      {/* Quality hint for basic ingredients only */}
      {showBasicHint && (
        <p className="text-center text-muted-foreground text-sm mt-2 font-body animate-fade-in">
          🧂 Try adding a main ingredient like vegetables, eggs, or paneer for better recipes.
        </p>
      )}
    </div>
  );
};

export default IngredientInput;
