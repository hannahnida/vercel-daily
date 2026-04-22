export default function ArticleBodySkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-3 mt-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="h-4 w-full rounded bg-base-300" />
          <div className="h-4 w-full rounded bg-base-300" />
          <div className="h-4 w-5/6 rounded bg-base-300" />
        </div>
      ))}
      <div className="h-6 w-1/2 rounded bg-base-300 mt-4" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="h-4 w-full rounded bg-base-300" />
          <div className="h-4 w-full rounded bg-base-300" />
          <div className="h-4 w-4/6 rounded bg-base-300" />
        </div>
      ))}
    </div>
  );
}

