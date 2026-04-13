'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/lib/types/categories'

type Props = {
  categories: Category[]
  initialQ?: string
  initialCategory?: string
}

export default function SearchForm({ categories, initialQ = '', initialCategory }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [q, setQ] = useState(initialQ)
  const [category, setCategory] = useState<string | undefined>(initialCategory)

  function updateUrl(nextQ: string, nextCategory: string | undefined) {
    const params = new URLSearchParams()
    if (nextQ) params.set('q', nextQ)
    if (nextCategory) params.set('category', nextCategory)
    router.replace(`/search${params.toString() ? `?${params}` : ''}`)
  }

  useEffect(() => {
    if (q.length > 0 && q.length < 3) return
    const t = setTimeout(() => updateUrl(q, category), 300)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateUrl(q, category)
  }

  function onCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value || undefined
    setCategory(next)
    updateUrl(q, next)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="q" className="sr-only">Search articles</label>
      <input
        id="q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search articles…"
        className="input input-bordered flex-1"
      />

      <label htmlFor="category" className="sr-only">Filter by category</label>
      <select
        id="category"
        value={category ?? ''}
        onChange={onCategoryChange}
        className="select select-bordered"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name} ({c.articleCount})
          </option>
        ))}
      </select>

      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  )
};