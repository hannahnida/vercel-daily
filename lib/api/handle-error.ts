import { isApiError } from '@/lib/types/api';

export default function handleApiError(e: unknown): null {
  const apiError = e instanceof Error && isApiError(e.cause) ? e.cause : null;

  if (apiError?.error.code === 'NOT_FOUND') {
    return null;
  }

  throw e;
}