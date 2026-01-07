import dotenv from "dotenv";
dotenv.config(); // THIS IS FINE
import cors from "cors";

import express from "express";
import recipeRoutes from "./routes/recipe.js";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:5173",
      "https://wdprecipe.vercel.app"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use("/api/recipe", recipeRoutes);

app.listen(5000, () => {
  console.log("🚀 Backend running");
});
