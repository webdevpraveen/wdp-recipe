import express from "express";
import { generateRecipe } from "../services/ai.service.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { ingredients, preferences } = req.body;

    if (!Array.isArray(ingredients)) {
      return res.status(400).json({ error: "ingredients must be an array" });
    }

    const result = await generateRecipe(
      ingredients,
      preferences || []
    );

    res.json(JSON.parse(result));
  } catch (err) {
    console.error("❌ API ERROR:", err.message);
    res.status(500).json({ error: "AI response failed" });
  }
});

export default router;
