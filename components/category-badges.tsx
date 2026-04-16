'use client';

import { clsx } from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Category } from '@/lib/types/categories';
import { X } from 'lucide-react';

export default function CategoryBadges({
  categories,
  initialCategory,
}: {
  categories: Category[];
  initialCategory?: Category;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeSlug = searchParams.get('category') ?? initialCategory?.slug;

  const sorted = activeSlug
    ? [...categories.filter(c => c.slug === activeSlug), ...categories.filter(c => c.slug !== activeSlug)]
    : categories;

  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams);

    if (activeSlug === categorySlug) {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }

    params.delete('page');

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {sorted.map(category => (
        <button
          key={category.slug}
          onClick={() => handleCategoryClick(category.slug)}
          className={clsx(
            ' badge cursor-pointer min-w-30',
            activeSlug === category.slug && 'badge-primary'
          )}
        >
          {category.name}&nbsp;({category.articleCount})
          {activeSlug === category.slug && (
            <X className="ml-1 h-3 w-3" />
          )}
        </button>
      ))}
    </div>
  );
}