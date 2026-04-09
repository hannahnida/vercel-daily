import { apiFetch } from "@/lib/api/client";
import type { ApiError, PaginationMeta } from "@/lib/types/api";
import type { Article } from "@/lib/types/articles";

export const articlesApi = {
  getAll: async () => {
    try {
      const res = await apiFetch<Article[], PaginationMeta>("/articles");
      return res.data;
    } catch (e) {
      const error = e as ApiError;
      if (error.error.code === 'NOT_FOUND') return null;
      throw error;
    }
  },
  getFeatured: async () => {
    try {
      const res = await apiFetch<Article[], PaginationMeta>("/articles?featured=true");
      return res.data;
    } catch (e) {
      const error = e as ApiError;
      if (error.error.code === 'NOT_FOUND') return null;
      throw error;
    }
  },
  search: async (input: string) => {
    try {
      const res = await apiFetch<Article[], PaginationMeta>(`/articles?search=${input}`);
      return res.data;
    } catch (e) {
      const error = e as ApiError;
      if (error.error.code === 'NOT_FOUND') return null;
      throw error;
    }
  }
};