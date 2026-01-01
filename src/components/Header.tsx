import { ChefHat } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-6">
      <div className="container mx-auto px-4">
        <div className="glass rounded-2xl py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center shadow-lg">
              <ChefHat className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Recipe Generator
              </h1>
              <p className="font-body text-sm text-muted-foreground">
                Create magic with your ingredients
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors">
              Explore
            </a>
            <a href="#" className="font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Favorites
            </a>
            <a href="#" className="font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
