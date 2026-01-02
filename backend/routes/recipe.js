import express from "express";
import { searchIndianRecipes } from "../services/search.service.js";
import { generateIndianRecipe } from "../services/ai.service.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { ingredients, preferences } = req.body;

    if (!ingredients || ingredients.length < 2) {
      return res.status(400).json({
        error: "Not enough ingredients",
      });
    }

    console.log("📥 Ingredients:", ingredients);
    console.log("⚙️ Preferences:", preferences);

    // 1️⃣ Search internet
    const context = await searchIndianRecipes(ingredients);

    console.log("🌐 Search Context:\n", context);

    // 2️⃣ AI reasoning
    const recipe = await generateIndianRecipe(
      ingredients,
      preferences,
      context
    );

    res.json(recipe);
  } catch (err) {
    console.error("❌ GENERATE ERROR:", err.message);
    res.status(500).json({
      error: "Failed to generate recipe",
    });
  }
});

export default router;
