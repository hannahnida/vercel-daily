import { apiFetch } from "@/lib/api/client";
import type { ApiError, PaginationMeta } from "@/lib/types/api";
import { isApiError } from "@/lib/types/api";
import type { Article } from "@/lib/types/articles";
// import { cacheLife, cacheTag } from 'next/cache';

export function handleApiError(e: unknown): null {
  if (isApiError(e) && e.error.code === 'NOT_FOUND') {
    // The resource simply doesn't exist — caller can handle this gracefully
    return null;
  }
  // Everything else — unexpected API errors, network failures, etc.
  // Let it propagate to Next.js error boundaries
  throw e;
}

export const articlesApi = {
  getAll: async () => {
    try {
      const res = await apiFetch<Article[], PaginationMeta>("/articles");
      return res.data;
    } catch (e) {
      return handleApiError(e);
    }
  },
  getFeatured: async () => {
    try {
      const res = await apiFetch<Article[], PaginationMeta>("/articles?featured=true");
      return res.data;
    } catch (e) {
      return handleApiError(e);
    }
  },
  getArticleBySlug: async (slug: string) => {
    // "use cache";
    // cacheTag(`article-${slug}`);
    // cacheLife('hours');
    try {
      const res = await apiFetch<Article>(`/articles/${slug}`);
      return res.data;
    } catch (e) {
      return handleApiError(e);
    }
  },
  search: async (input: string) => {
    try {
      const res = await apiFetch<Article[], PaginationMeta>(`/articles?search=${input}`);
      return res.data;
    } catch (e) {
      return handleApiError(e);
    }
  }
};