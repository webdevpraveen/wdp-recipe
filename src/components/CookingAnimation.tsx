import { useState, useEffect } from "react";

const COOKING_TEXTS = [
  "Chopping veggies...",
  "Heating the pan...",
  "Adding spices...",
  "Almost ready...",
];

interface CookingAnimationProps {
  isCorner?: boolean;
}

const CookingAnimation = ({ isCorner = false }: CookingAnimationProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % COOKING_TEXTS.length);
        setIsVisible(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  if (isCorner) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
        <div className="glass-strong rounded-2xl p-4 flex items-center gap-3 shadow-xl">
          <div className="relative w-12 h-12">
            <span className="text-3xl animate-bounce-slow">👨‍🍳</span>
            <div className="absolute -top-1 -right-1 w-4 h-4">
              <span className="text-xs animate-pulse">✨</span>
            </div>
          </div>
          <div 
            className={`text-xs text-muted-foreground font-body transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {COOKING_TEXTS[textIndex]}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative mb-6">
        {/* Pot/Pan */}
        <div className="relative">
          <div className="text-8xl animate-bounce-slow">🍳</div>
          
          {/* Steam particles */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="text-2xl animate-float-steam" style={{ animationDelay: "0s" }}>💨</span>
            <span className="text-xl animate-float-steam" style={{ animationDelay: "0.5s" }}>💨</span>
            <span className="text-2xl animate-float-steam" style={{ animationDelay: "1s" }}>💨</span>
          </div>
          
          {/* Chef hat */}
          <div className="absolute -top-4 -right-4">
            <span className="text-4xl animate-wiggle">👨‍🍳</span>
          </div>
          
          {/* Sparkles */}
          <div className="absolute top-0 left-0 w-full h-full">
            <span className="absolute -top-2 left-2 text-xl animate-pulse" style={{ animationDelay: "0.2s" }}>✨</span>
            <span className="absolute top-4 -right-6 text-lg animate-pulse" style={{ animationDelay: "0.7s" }}>⭐</span>
            <span className="absolute -bottom-2 left-0 text-xl animate-pulse" style={{ animationDelay: "1.2s" }}>✨</span>
          </div>
        </div>
      </div>
      
      <h3 
        className={`font-display text-2xl font-semibold text-foreground mb-2 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {COOKING_TEXTS[textIndex]}
      </h3>
      <p className="text-muted-foreground font-body text-sm">
        Our AI chef is preparing delicious recipes ✨
      </p>
      
      {/* Loading dots */}
      <div className="flex gap-2 mt-6">
        <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0s" }} />
        <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
        <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }} />
      </div>
    </div>
  );
};

export default CookingAnimation;
