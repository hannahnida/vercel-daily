import ArticleGridSkeleton from '@/components/article-grid-skeleton';

export function FormSkeleton() {
  return <div className="h-10 animate-pulse rounded-md bg-secondary" />;
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
      <div className="mt-8 h-8 animate-pulse" />;
    </section>
  );
}