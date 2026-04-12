import { Suspense } from 'react';
import { articlesApi } from '@/lib/api/articles';
import { getBreakingNewsWithSlug } from '@/lib/api/breaking-news';
import { BreakingNewsBanner } from '@/components/breaking-news-banner';
import { FeaturedArticles } from '@/components/featured-articles';
import Hero from '@/components/hero';
import ArticleGridSkeleton from '@/components/article-grid-skeleton';

export default async function Home() {
  const breakingNewsPromise = getBreakingNewsWithSlug();
  const featuredPromise = articlesApi.getFeatured();
  const breakingNews = await breakingNewsPromise;

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      {breakingNews && <BreakingNewsBanner news={breakingNews} />}
      <main className="flex flex-1 w-full max-w-screen-xl flex-col py-16 px-6 sm:px-12">
        <Hero />
        <Suspense fallback={<ArticleGridSkeleton title="Featured Articles" />}>
          <FeaturedArticles featuredPromise={featuredPromise} />
        </Suspense>
      </main>
    </div>
  );
}
