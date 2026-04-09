import { Suspense } from 'react';
import { articlesApi } from '@/lib/api/articles';
import { getBreakingNews } from '@/lib/api/breaking-news';
import { ArticleList } from '@/components/article-list';
import { BreakingNewsBanner } from '@/components/breaking-news-banner';
import { FeaturedArticles } from '@/components/featured-articles';
import Hero from '@/components/hero';

function GridSkeleton() {
  return (
    <section className="w-full py-10 animate-pulse">
      <div className="mb-6 h-8 w-48 rounded bg-base-300" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card bg-base-100 overflow-hidden">
            <div className="aspect-video w-full bg-base-300" />
            <div className="p-4 flex flex-col gap-2">
              <div className="h-4 w-20 rounded bg-base-300" />
              <div className="h-5 w-full rounded bg-base-300" />
              <div className="h-3 w-24 rounded bg-base-300 mt-auto" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const articlesPromise = articlesApi.getAll();       // ← no await, fires immediately
  const featuredPromise = articlesApi.getFeatured();  // ← no await, fires immediately
  const breakingNewsPromise = getBreakingNews();      // ← no await, fires immediately

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-6xl flex-col py-16 px-6 sm:px-12">
        <Suspense fallback={<div className="animate-pulse h-10 w-full rounded-lg bg-base-300 mb-6" />}>
          <BreakingNewsBanner breakingNewsPromise={breakingNewsPromise} />
        </Suspense>
        <Hero />
        <Suspense fallback={<GridSkeleton />}>
          <FeaturedArticles featuredPromise={featuredPromise} />
        </Suspense>
        <Suspense fallback={<div className="animate-pulse h-8 w-48 rounded bg-base-300 mt-10" />}>
          <ArticleList articlesPromise={articlesPromise} />
        </Suspense>
      </main>
    </div>
  );
}