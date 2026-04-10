import { Suspense } from 'react';
import { articlesApi } from '@/lib/api/articles';
import { getBreakingNews } from '@/lib/api/breaking-news';
import { BreakingNewsBanner } from '@/components/breaking-news-banner';
import { FeaturedArticles } from '@/components/featured-articles';
import Hero from '@/components/hero';
import ArticleGridSkeleton from '@/components/article-grid-skeleton';

export default function Home() {
  const featuredPromise = articlesApi.getFeatured();  // ← no await, fires immediately
  const breakingNewsPromise = getBreakingNews();      // ← no await, fires immediately

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-6xl flex-col py-16 px-6 sm:px-12">
        <Suspense fallback={<div className="animate-pulse h-10 w-full rounded-lg bg-base-300 mb-6" />}>
          <BreakingNewsBanner breakingNewsPromise={breakingNewsPromise} />
        </Suspense>
        <Hero />
        <Suspense fallback={<ArticleGridSkeleton title="Featured Articles" />}>
          <FeaturedArticles featuredPromise={featuredPromise} />
        </Suspense>
      </main>
    </div>
  );
}
