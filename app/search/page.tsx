import { Suspense } from 'react';
import { articlesApi } from '@/lib/api/articles';
import ArticleGrid from '@/components/article-grid';
import ArticleGridSkeleton from '@/components/article-grid-skeleton';
import SearchInput from '@/components/search-input';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function SearchResults({ query }: { query: string }) {
  const articles = await articlesApi.search(query);

  if (!articles || articles.length === 0) {
    return (
      <p className="text-base-content/60 text-sm mt-8">
        No articles found for &ldquo;{query}&rdquo;.
      </p>
    );
  }

  return (
    <ArticleGrid
      articles={articles}
      title={`Results for "${query}"`}
      columns={4}
    />
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = typeof q === 'string' ? q.trim() : '';

  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 sm:px-12 py-12">
      <h1 className="text-3xl font-bold mb-8">Search</h1>

      {/* Search input — client component, wrapped in Suspense (useSearchParams requirement) */}
      <Suspense fallback={<div className="input input-bordered w-full max-w-xl animate-pulse" />}>
        <SearchInput />
      </Suspense>

      {/* Results */}
      {query ? (
        <Suspense
          key={query}
          fallback={<ArticleGridSkeleton title={`Results for "${query}"`} columns={4} count={8} />}
        >
          <SearchResults query={query} />
        </Suspense>
      ) : (
        <p className="text-base-content/50 text-sm mt-8">
          Type something above to search articles.
        </p>
      )}
    </div>
  );
}
