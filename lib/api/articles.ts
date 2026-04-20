import type { PaginationMeta } from '@/lib/types/api';
import type { Article } from '@/lib/types/articles';
import { apiFetch } from '@/lib/api/client';
import { cacheLife, cacheTag } from 'next/cache';
import handleApiError from '@/lib/api/handle-error';

async function getAllArticlesForStaticParams() {
  try {
    const res = await apiFetch<Article[]>("/articles");
    return res.data;
  } catch (e) {
    handleApiError(e);
  }
}

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
  cacheLife("articles");
  cacheTag('articles', 'articles:featured');
  try {
    const res = await apiFetch<Article[], PaginationMeta>("/articles?featured=true&limit=6");
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
  const articleIds = ids.join(",");
  try {
    const res = await apiFetch<Article[]>(`/articles/trending?exclude=${articleIds}`);
    return res.data;
  } catch (e) {
    return handleApiError(e);
  }
}

async function getRecent({ page }: { page: number }) {
  'use cache';
  cacheLife('articles');
  cacheTag('articles', 'articles:recent');
  const params = new URLSearchParams();
  params.set('page', String(page || 1));
  params.set('limit', '5');
  try {
    return await apiFetch<Article[], PaginationMeta>(`/articles?${params}`);
  } catch (e) {
    return handleApiError(e);
  }
}

async function searchArticles({q, page, category}: { q?: string; page?: number; category?: string }) {
  'use cache';
  cacheLife('articles');
  cacheTag('articles', `articles:search:${q}:${category}`);
  const params = new URLSearchParams()
  if (q) params.set('search', q)
  if (category) params.set('category', category)
  params.set('limit', '5')
  params.set('page', String(page || 1))
  try {
    return await apiFetch<Article[], PaginationMeta>(`/articles?${params}`);
  } catch (e) {
    return handleApiError(e);
  }
}

// The object API surface stays the same — callers don't need to change anything
export const articlesApi = {
  getAll: getAllArticles,
  getAllArticlesForStaticParams,
  getFeatured: getFeaturedArticles,
  getArticleBySlug,
  getTrendingArticles,
  getRecent,
  search: searchArticles,
};