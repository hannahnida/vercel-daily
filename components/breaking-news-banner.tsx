import Link from "next/link";
import type { BreakingNews } from "@/lib/types/breaking-news";

export async function BreakingNewsBanner({
  breakingNewsPromise,
}: {
  breakingNewsPromise: Promise<BreakingNews>;
}) {
  const news = await breakingNewsPromise;

  if (!news) return null;

  return (
    <div
      role="banner"
      aria-label="Breaking news"
      className={`w-full rounded-lg px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 ${
        news.urgent ? "bg-error/10 border border-error/30" : "bg-base-200"
      }`}
    >
      <span
        className={`badge text-xs font-bold uppercase tracking-widest shrink-0 ${
          news.urgent ? "badge-error" : "badge-neutral"
        }`}
      >
        {news.urgent ? "⚡ Breaking" : "News"}
      </span>

      <p className="text-sm font-medium text-base-content leading-snug flex-1">
        {news.headline}
      </p>

      <Link
        href={`/articles/${news.articleId}`}
        className="text-xs font-semibold text-primary underline-offset-2 hover:underline shrink-0"
      >
        Read more →
      </Link>
    </div>
  );
}

