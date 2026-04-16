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