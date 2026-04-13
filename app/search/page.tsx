import { Suspense } from 'react';
import { getCategories } from '@/lib/api/categories';
import { articlesApi } from "@/lib/api/articles";
import ArticleGrid from '@/components/article-grid';
import ArticleGridSkeleton from '@/components/article-grid-skeleton';
import Pager from '@/components/pager';
import SearchForm from '@/components/search-form';
import { FormSkeleton } from '@/components/search-skeletons';

type SearchParams = Promise<{ q?: string; category?: string; page?: string }>

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const { q, category, page } = await searchParams;
  const pageNum = Number(page) || 1;

  return (
    <main className="mx-auto max-w-5xl min-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Search</h1>

      <Suspense fallback={<FormSkeleton />}>
        <SearchFormLoader initialQ={q} initialCategory={category} />
      </Suspense>

      <Suspense key={`${q ?? ''}-${category ?? ''}-${pageNum}`} fallback={<ArticleGridSkeleton count={5} columns={3} />}>
        <Results q={q} category={category} page={pageNum} />
      </Suspense>
    </main>
  )
}

async function SearchFormLoader({ initialQ, initialCategory }: { initialQ?: string; initialCategory?: string }) {
  const categories = await getCategories()
  return <SearchForm categories={categories} initialQ={initialQ} initialCategory={initialCategory} />
}

async function Results({ q, category, page }: { q?: string; category?: string; page: number }) {
  const { data: articles, meta } = await articlesApi.search({ q, category, page })

  if (articles.length === 0) {
    return <p role="status" className="py-12 text-center">No articles match your search.</p>
  }

  const showingRecent = !q || q.length < 3

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">
        {showingRecent ? 'Recent articles' : `Results for "${q}"`}
      </h2>
      <ArticleGrid articles={articles} columns={3} />
      <Pager pagination={meta.pagination} q={q} category={category} />
    </section>
  )
};