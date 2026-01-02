# 🍽️ WDP Recipe Generator

An AI-powered recipe generator that creates **simple, Indian home-style recipes** based on the ingredients you already have.

This project is designed with a **bachelor-friendly mindset**, focusing on:
- Fewer ingredients
- Quick cooking
- Budget-friendly Indian food
- Clean, modern UI with smooth UX

---

## ✨ Features

### Ingredient-Based Recipe Generation
- Enter ingredients in any form (English / Indian terms)
- Smart ingredient chips with category-based colors
- Quality hints if only basic items are added

### Preference Filters
- Veg / Non-Veg
- Bachelor Friendly
- Under 20 Minutes

### Smart Recipe Results
- Highlight tags like:
  - Best Match
  - Fastest
  - Least Ingredients
- Clear recipe cards with cooking time & servings

### Recipe Detail Modal
- Full ingredients list
- Step-by-step cooking instructions
- Nutritional information (when available)
- Download recipe as PDF (future scope)
  
---

## 🛠 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS (Glassmorphism UI)
- React Query

### Backend
- Node.js
- Express.js
- Modular service-based architecture
- AI provider abstraction layer [ OpenAI (old) → Gemini (current) ]

---

## 🧠 Architecture Overview
```bash
Frontend
↓ (api call)
Backend
↓
Search Context Builder
↓
AI Service (Provider Agnostic)
```


The backend is intentionally designed so that **AI providers can be switched to another AI Models** without touching frontend code.

---

## 🚧 AI Provider Status

> **Note:**  
> This project initially used **OpenAI** for recipe generation.  
> Due to API quota limitations during development, OpenAI integration was paused.
> Now it work with Gemini API

The backend is now structured to support:
- OpenAI (previous)
- Gemini (current )
- Any future AI provider 

No frontend changes are required when switching providers.

---

## 📌 Project Status


* Frontend complete
* Backend connected
* AI abstraction ready
* Gemini integration in progress...
* Deployment planned...
---

> This project reflects real-world problem solving, iteration, and engineering decisions — not just a demo app.
