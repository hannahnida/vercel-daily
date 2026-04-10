const colClasses: Record<3 | 4, string> = {
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

type ArticleGridSkeletonProps = {
  count?: number;
  title?: string;
  columns?: 3 | 4;
};

export default function ArticleGridSkeleton({ count = 6, title, columns = 3 }: ArticleGridSkeletonProps) {
  return (
    <section className="w-full py-10 animate-pulse">
      {title !== undefined && (
        <div className="mb-6 h-8 w-48 rounded bg-base-300" />
      )}
      <div className={`grid ${colClasses[columns]} gap-6`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            {/* Image */}
            <div className="aspect-video w-full rounded-sm bg-base-300" />
            <div className="flex flex-col gap-1.5">
              {/* Category */}
              <div className="h-3 w-16 rounded bg-base-300" />
              {/* Title */}
              <div className="h-4 w-full rounded bg-base-300" />
              <div className="h-4 w-3/4 rounded bg-base-300" />
              {/* Author + date */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="h-4 w-4 rounded-full bg-base-300 shrink-0" />
                <div className="h-3 w-20 rounded bg-base-300" />
                <div className="h-3 w-14 rounded bg-base-300 ml-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
