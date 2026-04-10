'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get('q') ?? '';

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q') as string;
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none">
        <Search size={16} />
      </span>
      <input
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Search articles…"
        className="input input-bordered w-full pl-9 pr-4 text-sm"
        autoFocus
      />
    </form>
  );
}
