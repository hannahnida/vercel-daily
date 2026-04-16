import { Suspense } from 'react';
import { getCategories } from '@/lib/api/categories';
import { articlesApi } from '@/lib/api/articles';
import ArticleGrid from '@/components/article-grid';
import Pager from '@/components/pager';
import SearchInput from '@/components/search-input';
import CategoryBadges from '@/components/category-badges';
import {
  FormSkeleton,
  CategoryBadgesSkeleton,
  SearchResultsSkeleton,
} from '@/components/search-skeletons';

type SearchParams = Promise<{ q?: string; category?: string; page?: string }>;

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="mx-auto max-w-5xl xl:min-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Search</h1>

      <Suspense fallback={<FormSkeleton />}>
        <SearchFormLoader searchParams={searchParams} />
      </Suspense>

      <Suspense fallback={<SearchResultsSkeleton />}>
        <KeyedResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function SearchFormLoader({ searchParams }: { searchParams: SearchParams }) {
  const { q, category } = await searchParams;

  return (
    <div className="space-y-4">
      <SearchInput initialQuery={q} />

      <Suspense fallback={<CategoryBadgesSkeleton hasSelected={!!category} />}>
        <CategoryLoader initialCategory={category} />
      </Suspense>
    </div>
  );
}

async function CategoryLoader({ initialCategory }: { initialCategory?: string }) {
  const categories = await getCategories();
  const selected = categories.find((c) => c.slug === initialCategory);
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
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">{heading}</h2>
      <ArticleGrid articles={articles} columns={3} />
      <Pager pagination={meta.pagination} q={q} category={category} />
    </section>
  );
}