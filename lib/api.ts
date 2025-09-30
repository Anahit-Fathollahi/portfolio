// lib/api.ts
export const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchFromApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch from API");
  return res.json();
}
