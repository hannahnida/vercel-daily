import Link from "next/link";
import type { BreakingNews } from "@/lib/types/breaking-news";
import { TriangleAlertIcon, NewspaperIcon, ArrowRightIcon } from 'lucide-react';

export function BreakingNewsBanner({ news }: { news: BreakingNews }) {
  return (
    <div
      role="banner"
      aria-label="Breaking news"
      className="w-full  flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 bg-black/80 dark:bg-white"
    >
      <div className="max-w-screen-xl text-white dark:text-black  mx-auto w-full px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <span
          className={`badge badge-outline rounded-base text-xs font-bold uppercase tracking-widest shrink-0 ${news.urgent && "badge-warning"}`}
        >
          {news.urgent ? <TriangleAlertIcon className="h-4 w-4" /> : <NewspaperIcon className="h-4 w-4" />}
          {news.urgent ? 'Breaking' : 'News'}
      </span>

        <p className="text-sm font-medium leading-snug flex-1">
          {news.headline}
        </p>

        <Link
          href={`/articles/${news.slug}`}
          className="text-xs font-semibold flex gap-2"
        >
          Read more
          <ArrowRightIcon className="h-3 w-3 self-center-safe" />
        </Link>
      </div>
    </div>
  );
}

