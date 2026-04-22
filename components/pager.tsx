import Link from 'next/link';
import type { Pagination } from '@/lib/types/api';

export default function Pager({ pagination, q, category }: { pagination: Pagination; q?: string; category?: string }) {
  const { page, totalPages, hasNextPage, hasPreviousPage } = pagination;

  function href(p: number) {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (category) params.set('category', category);
    if (p > 1) params.set('page', String(p));
    return `/search${params.toString() ? `?${params}` : ''}`;
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-2">
      <Link
        href={href(page - 1)}
        aria-disabled={!hasPreviousPage}
        className={`btn btn-sm ${!hasPreviousPage ? 'btn-disabled' : ''}`}
      >
        Previous
      </Link>
      <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
      <Link
        href={href(page + 1)}
        aria-disabled={!hasNextPage}
        className={`btn btn-sm ${!hasNextPage ? 'btn-disabled' : ''}`}
      >
        Next
      </Link>
    </nav>
  );
}