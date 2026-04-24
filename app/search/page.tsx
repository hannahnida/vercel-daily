import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getCategories } from '@/lib/api/categories';
import { articlesApi } from '@/lib/api/articles';
import ArticleGrid from '@/components/article-grid';
import Pager from '@/components/pager';
import SearchInput from '@/components/search-input';
import CategoryBadges from '@/components/category-badges';
import {
  SearchInputSkeleton,
  CategoryBadgesSkeleton,
  SearchResultsSkeleton,
} from '@/components/search-skeletons';

type SearchParams = Promise<{ q?: string; category?: string; page?: string }>;

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search articles across Vercel Daily.',
  openGraph: {
    title: 'Search',
    description: 'Search articles across Vercel Daily.',
  },
  robots: { index: false, follow: true },
};

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="mx-auto max-w-5xl xl:min-w-5xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold">Search</h1>

        <div className="space-y-4">
          <Suspense fallback={<SearchInputSkeleton />}>
            <SearchInput />
          </Suspense>

          <Suspense fallback={<CategoryBadgesSkeleton />}>
            <CategoryLoader searchParams={searchParams} />
          </Suspense>
        </div>

        <Suspense fallback={<SearchResultsSkeleton />}>
          <KeyedResults searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}

async function CategoryLoader({ searchParams }: { searchParams: SearchParams }) {
  const { category } = await searchParams;
  const categories = await getCategories();
  const selected = categories.find((c) => c.slug === category);
  return <CategoryBadges categories={categories} initialCategory={selected} />;
}

async function KeyedResults({ searchParams }: { searchParams: SearchParams }) {
  const { q = '', category = '', page = '' } = await searchParams;
  const resultsKey = `${q}-${category}-${page}`;

  return (
    <Suspense key={resultsKey} fallback={<SearchResultsSkeleton />}>
      <Results q={q} category={category} page={Number(page) || 1} />
    </Suspense>
  );
}

async function Results({ q, category, page }: { q: string; category: string; page: number }) {
  const result =
    q || category
      ? await articlesApi.search({ q, category, page })
      : await articlesApi.getRecent({ page });

  if (!result || result.data.length === 0) {
    return (
      <p role="status" className="py-12 text-center">
        No articles match your search.
      </p>
    );
  }

  const { data: articles, meta } = result;

  const heading = !q && !category
    ? 'Recent articles'
    : q
      ? `Results for "${q}"`
      : 'Filtered results';

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-sm font-medium text-base-content/60">{heading}</h2>
      <ArticleGrid articles={articles} columns={3} />
      <Pager pagination={meta.pagination} q={q} category={category} />
    </section>
  );
}