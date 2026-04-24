import type { Article } from '@/lib/types/articles';
import Image from 'next/image';

export default function ArticleHeader({title, image, author, category, tags, publishedAt}: Article) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mb-8 px-4">
      {image && (
        <div className="relative mb-6 aspect-4/3 lg:aspect-video overflow-hidden -z-10 -m-4">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover object-center not-prose"
            preload={true}
          />
        </div>
      )}
      {/* Category badge */}
      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
        {category}
      </span>

      <h1 className="pt-0 mb-6">{title}</h1>

      {/* Author row */}
      <div className="flex items-center gap-3 mb-5">
        {author.avatar && (
          <div className="avatar">
            <div className="w-24 rounded-full">
              <Image
                src={author.avatar}
                alt={author.name}
                width={44}
                height={44}
                className="rounded-full object-cover not-prose"
              />
            </div>
          </div>
        )}
        <div>
          <p className="font-semibold text-sm leading-tight">{author.name}</p>
          <p className="text-xs text-base-content/60">{formattedDate}</p>
        </div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="badge badge-outline text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}