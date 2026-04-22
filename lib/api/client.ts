import type { ApiResponse, ApiError } from '@/lib/types/api';

const apiURL = process.env.API_URL;
const token = process.env.API_BYPASS_TOKEN;

if (!apiURL || !token) {
  throw new Error('API_URL and API_BYPASS_TOKEN must be set in environment variables');
}

export async function apiFetch<T, M = undefined>(
  path: string,
  init?: RequestInit
): Promise<ApiResponse<T, M>> {
  const { headers: initHeaders, ...initRest } = init ?? {};
  const res = await fetch(`${apiURL}${path}`, {
    ...initRest,
    headers: {
      'Content-Type': 'application/json',
      'x-vercel-protection-bypass': token as string,
      ...initHeaders,
    },
  });

  if (!res.ok) {
    const contentType = res.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      const error: ApiError = await res.json();
      throw error;
    }
    // Non-JSON error (e.g. plain-text 401 Unauthorized)
    const message = await res.text();
    throw {
      success: false,
      error: {
        code: 'BAD_REQUEST',
        message: message || res.statusText,
      },
    } satisfies ApiError;
  }

  return await res.json() as ApiResponse<T, M>;
}