//BAckend entry point...//

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoute from "./routes/recipe.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/recipe", recipeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`AI Recipe Backend running on port ${PORT}`);
});
