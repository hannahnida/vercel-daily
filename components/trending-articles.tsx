import { articlesApi } from '@/lib/api/articles';
import ArticleGrid from '@/components/article-grid';

type TrendingArticlesProps = {
  excludedIds: string[];
};

export default async function TrendingArticles({ excludedIds }: TrendingArticlesProps) {
  const articles = await articlesApi.getTrendingArticles(excludedIds);

  if (!articles || articles.length === 0) {
    return <p className="text-base-content/60">No trending articles found.</p>;
  }

  return <ArticleGrid articles={articles} title="Trending Articles" columns={4} />;
}
