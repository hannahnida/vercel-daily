import { apiFetch } from "@/lib/api/client";
import type { BreakingNews } from "@/lib/types/breaking-news";

export async function getBreakingNews(): Promise<BreakingNews> {
  const response = await apiFetch<BreakingNews>("/breaking-news");
  return response.data;
}

