type Author = {
  avatar: string;
  name: string;
}

export type Paragraph = {
  type: 'paragraph';
  text: string;
}

type Heading = {
  type: 'heading';
  level: 2 | 3;
  text: string;
}

type Blockquote = {
  type: 'blockquote';
  text: string;
}

type UnorderedList = {
  type: 'unordered-list';
  items: string[];
}

type OrderedList = {
  type: 'ordered-list';
  items: string[];
}

type Image = {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

type ContentBlock = Paragraph | Heading | Blockquote | UnorderedList | OrderedList | Image;

type Article = {
  author: Author;
  category: string;
  content: ContentBlock[];
  excerpt: string;
  featured: boolean;
  id: string;
  image: string;
  publishedAt: string;
  slug: string;
  tags: string[];
  title: string;
}

import { apiFetch } from "@/lib/api/client";
import type { PaginationMeta } from "@/lib/types/api";

export const articlesApi = {
  getAll: async () => {
    const res = await apiFetch<Article[], PaginationMeta>("/articles");
    return res.data;
  },
  getFeatured: async () => {
    const res = await apiFetch<Article[], PaginationMeta>("/articles?featured=true");
    return res.data;
  }
};