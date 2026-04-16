import ArticleGridSkeleton from '@/components/article-grid-skeleton';

export function SearchInputSkeleton() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        type="search"
        disabled
        placeholder="Search articles…"
        className="input input-bordered flex-1 lg:flex-5"
      />
      <button disabled className="btn btn-primary flex-1">Search</button>
    </div>
  );
}

export function CategoryBadgesSkeleton({ hasSelected = false }: { hasSelected?: boolean }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`badge ${i === 0 && hasSelected ? 'badge-primary min-w-30' : 'min-w-30'}`}
        />
      ))}
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">
        Loading results...
      </h2>
      <ArticleGridSkeleton count={5} columns={3} />
      <div className="mt-8 h-8 animate-pulse" />
    </section>
  );
}