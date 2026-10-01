const raw = import.meta.env.VITE_API_URL;

if (!raw) {
  throw new Error("VITE_API_URL is not set. Copy .env.example to .env and set it.");
}

export const env = {
  /** Backend base URL without a trailing slash, e.g. http://localhost:3000/api */
  apiUrl: raw.replace(/\/+$/, ""),
} as const;
