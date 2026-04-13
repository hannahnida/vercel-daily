import { apiFetch } from '@/lib/api/client';
import type { Category } from '@/lib/types/categories';
import { cacheLife, cacheTag } from 'next/cache';

export async function getCategories() {
  "use cache";
  cacheLife("days");
  cacheTag("categories");
  try {
    const res = await apiFetch<Category[]>("/categories");
    return res.data;
  } catch {
    // don't break search page if categories fail to load, just return empty array
    return [];
  }
}