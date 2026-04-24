import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types/articles';

type ArticleCardProps = {
  article: Article;
  index: number;
};

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col gap-3"
    >
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-base-300">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes={'(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            loading={index < 3 ? 'eager' : 'lazy'}
            priority={index < 3}
            className="object-cover transition-opacity duration-300 group-hover:opacity-90"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-base-content/20 select-none text-sm">
            No image
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5">
        {/* Category */}
        <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
          {article.category}
        </span>

        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:underline underline-offset-2 decoration-base-content/30">
          {article.title}
        </h3>

        {/* Author + date */}
        <div className="flex items-center gap-1.5 mt-0.5">
          {article.author.avatar && (
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={16}
              height={16}
              className="rounded-full object-cover shrink-0 opacity-80"
            />
          )}
          <span className="text-xs text-base-content/50 truncate">
            {article.author.name}
          </span>
          <span className="text-base-content/30 text-xs shrink-0">·</span>
          <time dateTime={article.publishedAt} className="text-xs text-base-content/40 shrink-0">
            {publishedDate}
          </time>
        </div>
      </div>
    </Link>
  );
}
