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
    let apiError: ApiError;

    if (contentType.includes('application/json')) {
      apiError = await res.json();
    } else {
      const message = await res.text();
      apiError = {
        success: false,
        error: {
          code: 'BAD_REQUEST',
          message: message || res.statusText,
        },
      };
    }

    throw new Error(apiError.error.message, { cause: apiError });
  }

  return await res.json() as ApiResponse<T, M>;
}