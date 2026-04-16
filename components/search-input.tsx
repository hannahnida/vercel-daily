'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  initialQ?: string
}

export default function SearchInput({initialQ = ''}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [q, setQ] = useState(initialQ)

  function updateUrl(nextQ: string) {
    const params = new URLSearchParams(searchParams);
    if (nextQ) {
      params.set('q', nextQ);
    } else {
      params.delete('q');
    }
    params.delete('page');
    router.replace(`/search${params.toString() ? `?${params}` : ''}`);
  }

  useEffect(() => {
    if (q.length > 0 && q.length < 3) return
    const t = setTimeout(() => updateUrl(q), 300)
    return () => clearTimeout(t)
  }, [q])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateUrl(q)
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
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  )
};