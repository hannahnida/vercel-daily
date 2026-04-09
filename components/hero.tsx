import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types/articles';

type HeroProps = {
  article?: Article;
};

// A prominent hero area with headline text, supporting description, and a visual element (featured story image or illustration).
export default function Hero({ article }: HeroProps) {
  const publishedDate = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'April 9, 2026';

  return (
    <section className="w-full py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* ── Text side ── */}
        <div className="flex flex-col gap-5">
          <span className="badge badge-primary uppercase tracking-widest text-xs w-fit">
            {article?.category ?? 'Featured'}
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            {article?.title ?? 'Top stories from the world of web development'}
          </h1>

          <p className="text-base-content/70 text-lg leading-relaxed">
            {article?.excerpt ??
              'Stay up to date with the latest news, insights, and releases from the Vercel ecosystem and beyond.'}
          </p>

          {/* Author row */}
          <div className="flex items-center gap-3 text-sm text-base-content/60">
            {article?.author.avatar ? (
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-base-300" />
            )}
            <span>{article?.author.name ?? 'Vercel Daily'}</span>
            <span aria-hidden>·</span>
            <time dateTime={article?.publishedAt}>{publishedDate}</time>
          </div>

          {article?.slug ? (
            <Link href={`/articles/${article.slug}`} className="btn btn-primary w-fit">
              Read story →
            </Link>
          ) : (
            <span className="btn btn-primary btn-disabled w-fit">Read story →</span>
          )}
        </div>

        {/* ── Image side ── */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-base-300">
          {article?.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-base-content/20 select-none">
              Featured image
            </div>
          )}
        </div>

      </div>
    </section>
  );
}