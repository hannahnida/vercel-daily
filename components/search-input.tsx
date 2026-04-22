'use client';

import { useEffect, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQuery] = useState(searchParams.get('q') ?? '');
  const [isPending, startTransition] = useTransition();

  // Sync local state when URL changes externally (back/forward, category click)
  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  function updateUrl(nextQuery: string) {
    const trimmed = nextQuery.trim();
    const params = new URLSearchParams(searchParams);
    if (trimmed) {
      params.set('q', trimmed);
    } else {
      params.delete('q');
    }
    params.delete('page');
    router.push(`/search${params.toString() ? `?${params}` : ''}`);
  }

  useEffect(() => {
    const currentQuery = searchParams.get('q') ?? '';
    const trimmedInput = q.trim();

    if (currentQuery === trimmedInput) return;
    if (trimmedInput.length > 0 && trimmedInput.length < 3) return;

    const t = setTimeout(() => startTransition(() => updateUrl(q)), 500);
    return () => clearTimeout(t);
  }, [q]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => updateUrl(q));
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="q" className="sr-only">Search articles</label>
      <input
        id="q"
        type="search"
        value={q}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles…"
        className="input input-bordered flex-1 lg:flex-5"
      />
      <button type="submit" className="btn btn-primary flex-1" disabled={isPending}>
        {isPending ? <span className="loading loading-spinner loading-sm" /> : 'Search'}
      </button>
    </form>
  );
}