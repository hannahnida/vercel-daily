import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types/articles';

export async function FeaturedArticles({
  featuredPromise,
}: {
  featuredPromise: Promise<Article[]>;
}) {
  const articles = await featuredPromise;

  if (!articles || articles.length === 0) {
    return <p className="text-base-content/60">No featured articles found.</p>;
  }

  const featured = articles.slice(0, 6);

  return (
    <section className="w-full py-10">
      <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((article) => {
          const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });

          return (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <figure className="relative aspect-video w-full overflow-hidden bg-base-300">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-base-content/20 select-none text-sm">
                    No image
                  </div>
                )}
              </figure>
              <div className="card-body gap-2 p-4">
                <span className="badge badge-primary uppercase tracking-widest text-xs w-fit">
                  {article.category}
                </span>
                <h3 className="card-title text-base font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <time
                  dateTime={article.publishedAt}
                  className="text-xs text-base-content/60 mt-auto"
                >
                  {publishedDate}
                </time>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

