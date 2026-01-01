interface PreferenceChipsProps {
  selectedPreferences: string[];
  onPreferencesChange: (preferences: string[]) => void;
}

const PREFERENCES = [
  { id: "veg", label: "🥦 Veg" },
  { id: "non-veg", label: "🍗 Non-Veg" },
  { id: "bachelor", label: "⭐ Bachelor Friendly" },
  { id: "quick", label: "⏱ Under 20 Minutes" },
  { id: "few", label: "🧺 Few Ingredients" },
  { id: "budget", label: "💸 Budget Friendly" },
];

const PreferenceChips = ({
  selectedPreferences,
  onPreferencesChange,
}: PreferenceChipsProps) => {
  const togglePreference = (id: string) => {
    // Veg & Non-veg mutually exclusive
    if (id === "veg" && selectedPreferences.includes("non-veg")) {
      onPreferencesChange(
        selectedPreferences.filter((p) => p !== "non-veg").concat("veg")
      );
      return;
    }

    if (id === "non-veg" && selectedPreferences.includes("veg")) {
      onPreferencesChange(
        selectedPreferences.filter((p) => p !== "veg").concat("non-veg")
      );
      return;
    }

    if (selectedPreferences.includes(id)) {
      onPreferencesChange(selectedPreferences.filter((p) => p !== id));
    } else {
      onPreferencesChange([...selectedPreferences, id]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-center text-muted-foreground text-sm mb-3">
        Select your preferences (optional)
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {PREFERENCES.map((pref) => {
          const isSelected = selectedPreferences.includes(pref.id);
          return (
            <button
              key={pref.id}
              onClick={() => togglePreference(pref.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? "gradient-accent text-white shadow-lg"
                  : "glass text-foreground hover:bg-primary/10"
              }`}
            >
              {pref.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PreferenceChips;
