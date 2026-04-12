export type BreakingNews = {
  id: string;
  headline: string;
  summary: string;
  articleId: string;
  category: string;
  publishedAt: string;
  urgent: boolean;
  slug: string;
};

export type BreakingNewsResponse = {
  success: boolean;
  data: BreakingNews;
};
