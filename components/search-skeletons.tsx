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

export function CategoryDropdownSkeleton() {
  return (
    <div className="w-full sm:w-72">
      <select disabled className="select select-bordered select-lg w-full animate-pulse" aria-label="Filter by category">
        <option>All categories</option>
      </select>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-sm font-medium text-base-content/60">
        Loading results...
      </h2>
      <ArticleGridSkeleton count={5} columns={3} />
      <div className="mt-8 h-8 animate-pulse" />
    </section>
  );
}