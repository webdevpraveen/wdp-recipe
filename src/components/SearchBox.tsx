import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBoxProps {
  onSearch?: (ingredients: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = () => {
    if (onSearch) {
      onSearch(ingredients);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-strong rounded-2xl p-2 flex items-center gap-3 transition-all duration-300 hover:shadow-glass-hover">
        <div className="flex-1 flex items-center gap-3 px-4">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Enter ingredients (e.g., egg, milk, bread)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground font-body text-base py-3"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="gradient-accent text-primary-foreground px-6 py-3 rounded-xl font-body font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Find Recipes
        </button>
      </div>
      <p className="text-center text-muted-foreground text-sm mt-3 font-body">
        Separate ingredients with commas for best results
      </p>
    </div>
  );
};

export default SearchBox;
