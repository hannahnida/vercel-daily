import { apiFetch } from "@/lib/api/client";
import type { BreakingNews } from "@/lib/types/breaking-news";
import { cacheLife, cacheTag } from 'next/cache';

export async function getBreakingNews(): Promise<BreakingNews> {
  "use cache";
  cacheLife("seconds");
  cacheTag("breaking-news");
  const response = await apiFetch<BreakingNews>("/breaking-news");
  return response.data;
}

