'use client';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Category } from '@/lib/types/categories';

export default function CategoryDropdown({
  categories,
  initialCategory,
}: {
  categories: Category[];
  initialCategory?: Category;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeSlug = searchParams.get('category') ?? initialCategory?.slug ?? '';

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const slug = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    params.delete('page');
    startTransition(() => {
      router.push(`/search${params.toString() ? `?${params}` : ''}`);
    });
  }

  return (
    <div className="relative w-full sm:w-72">
      <select
        className="select select-bordered select-lg w-full"
        value={activeSlug}
        onChange={handleChange}
        disabled={isPending}
        aria-label="Filter by category"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name} ({category.articleCount})
          </option>
        ))}
      </select>
    </div>
  );
}

