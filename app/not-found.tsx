import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h1 className="mb-2 font-bold text-6xl">404</h1>
      <p className="mb-6 text-xl opacity-70">Page not found</p>
      <p className="mb-8 max-w-md text-center opacity-50">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn btn-neutral">
        Go home
      </Link>
    </div>
  );
}