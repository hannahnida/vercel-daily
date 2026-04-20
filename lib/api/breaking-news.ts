import { apiFetch } from "@/lib/api/client";
import type { BreakingNews } from "@/lib/types/breaking-news";
import type { Article } from "@/lib/types/articles";
import { cacheLife, cacheTag } from 'next/cache';
import handleApiError from '@/lib/api/handle-error';

export async function getBreakingNewsWithSlug() {
  "use cache";
  cacheLife("minutes");
  cacheTag("breaking-news");

  try {
    const breaking = await apiFetch<BreakingNews>("/breaking-news");
    const article = await apiFetch<Article>(`/articles/${breaking.data.articleId}`);
    return { ...breaking.data, slug: article.data.slug };
  } catch (e) {
    handleApiError(e);
  }
}

