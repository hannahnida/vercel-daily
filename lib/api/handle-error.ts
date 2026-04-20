import { isApiError } from '@/lib/types/api';

export default function handleApiError(e: unknown): null {
  if (isApiError(e) && e.error.code === 'NOT_FOUND') {
    // The resource simply doesn't exist — caller can handle this gracefully
    return null;
  }
  // Everything else — unexpected API errors, network failures, etc.
  // Let it propagate to Next.js error boundaries
  throw e;
}