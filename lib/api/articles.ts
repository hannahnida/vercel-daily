import { apiFetch } from "@/lib/api/client";
import type { ApiError, PaginationMeta } from "@/lib/types/api";
import { isApiError } from "@/lib/types/api";
import type { Article } from "@/lib/types/articles";
import { cacheLife, cacheTag } from 'next/cache';

export function handleApiError(e: unknown): null {
  if (isApiError(e) && e.error.code === 'NOT_FOUND') {
    // The resource simply doesn't exist — caller can handle this gracefully
    return null;
  }
  // Everything else — unexpected API errors, network failures, etc.
  // Let it propagate to Next.js error boundaries
  throw e;
}

// Standalone functions — the compiler can reliably find and instrument
// the "use cache" directive at this level

async function getAllArticles() {
  "use cache";
  cacheTag("articles");
  cacheLife("hours");
  try {
    const res = await apiFetch<Article[], PaginationMeta>("/articles");
    return res.data;
  } catch (e) {
    return handleApiError(e);
  }
}

async function getFeaturedArticles() {
  "use cache";
  cacheTag("featured-articles");
  cacheLife("hours");
  try {
    const res = await apiFetch<Article[], PaginationMeta>("/articles?featured=true");
    return res.data;
  } catch (e) {
    return handleApiError(e);
  }
}

async function getArticleBySlug(slug: string) {
  "use cache";
  cacheTag(`article-${slug}`);
  cacheLife("hours");
  try {
    const res = await apiFetch<Article>(`/articles/${slug}`);
    return res.data;
  } catch (e) {
    return handleApiError(e);
  }
}

async function getTrendingArticles(ids: string[]) {
  "use cache";
  const articleIds = ids.join(",");
  cacheTag(`trending-excluding-${articleIds}`);
  cacheLife("hours");
  try {
    const res = await apiFetch<Article[]>(`/articles/trending?exclude=${articleIds}`);
    return res.data;
  } catch (e) {
    return handleApiError(e);
  }
}

async function searchArticles(input: string) {
  try {
    const res = await apiFetch<Article[], PaginationMeta>(`/articles?search=${input}`);
    return res.data;
  } catch (e) {
    return handleApiError(e);
  }
}

// The object API surface stays the same — callers don't need to change anything
export const articlesApi = {
  getAll: getAllArticles,
  getFeatured: getFeaturedArticles,
  getArticleBySlug,
  getTrendingArticles,
  search: searchArticles,
};