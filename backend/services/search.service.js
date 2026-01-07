/**
 * NOTE:
 * This service is currently NOT used in the active flow.
 * It is reserved for future enhancements like:
 * - Web-based recipe search
 * - AI fallback enrichment
 * - YouTube / blog recipe extraction
 */

import fetch from "node-fetch";

export async function searchIndianRecipes(ingredients) {
  const query = `simple indian home style recipe using ${ingredients.join(", ")}`;

  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(
    query
  )}&hl=en&gl=in&api_key=${process.env.SERPAPI_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  // Extract useful text
  const snippets =
    data.organic_results?.map((r) => r.snippet).slice(0, 5) || [];

  return snippets.join("\n");
}
