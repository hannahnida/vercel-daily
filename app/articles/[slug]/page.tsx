import { Suspense } from 'react';
import { articlesApi } from '@/lib/api/articles';
import { notFound } from 'next/navigation';
import ArticleHeader from '@/components/article-header';
import ArticleContent from '@/components/article-content';
import TrendingArticles from '@/components/trending-articles';
import ArticleGridSkeleton from '@/components/article-grid-skeleton';

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await articlesApi.getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-12 py-10">
      {/* Prose body — constrained to readable width */}
      <article className="max-w-3xl mx-auto prose">
        <ArticleHeader {...article} />
        <ArticleContent content={article.content} />
      </article>

      {/* Trending grid — full container width */}
      <Suspense fallback={<ArticleGridSkeleton title="Trending Articles" columns={4} />}>
        <TrendingArticles excludedIds={[article.id]} />
      </Suspense>
    </div>
  );
}
