import type { ApiResponse, ApiError } from "@/lib/types/api";

const apiURL = process.env.API_URL;
const token = process.env.API_BYPASS_TOKEN;

if (!apiURL || !token) {
  throw new Error("API_URL and API_BYPASS_TOKEN must be set in environment variables");
}

export async function apiFetch<T, M = undefined>(
  path: string,
  init?: RequestInit
): Promise<ApiResponse<T, M>> {
  const res = await fetch(`${apiURL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "x-vercel-protection-bypass": token as string,
      ...init?.headers,
    },
    ...init,
  });

  if (!res.ok) {
    const error: ApiError = await res.json();
    throw error;
  }

  return await res.json() as ApiResponse<T, M>;
}