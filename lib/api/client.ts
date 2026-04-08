import type { ApiResponse, ApiError } from "@/lib/types/api";

const apiURL =  process.env.API_URL || '';
const token = process.env.API_BYPASS_TOKEN || '';

export async function apiFetch<T, M = undefined>(
  path: string,
  init?: RequestInit
): Promise<ApiResponse<T, M>> {
  const res = await fetch(`${apiURL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "x-vercel-protection-bypass": token,
      ...init?.headers,
    },
    ...init,
  });

  if (!res.ok) {
    const error: ApiError = await res.json();
    throw error;
  }

  return await res.json() as Promise<ApiResponse<T, M>>;
}