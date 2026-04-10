import type { Article } from '@/lib/types/articles';
import ArticleGrid from '@/components/article-grid';

export async function FeaturedArticles({
  featuredPromise,
}: {
  featuredPromise: Promise<Article[] | null>;
}) {
  const articles = await featuredPromise;

  if (!articles || articles.length === 0) {
    return <p className="text-base-content/60">No featured articles found.</p>;
  }

  return <ArticleGrid articles={articles.slice(0, 6)} title="Featured Articles" columns={3} />;
}
