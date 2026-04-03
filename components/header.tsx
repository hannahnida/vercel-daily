import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white border-b border-b-gray-300 dark:bg-black dark:border-gray-700 font-sans py-4">
      <div className="container px-8 mx-auto flex items-center gap-3">
        <Link href="/" className="pr-4">
          <div className="flex items-center gap-2">
            <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
              className="invert dark:invert-0 w-5 h-5"
            />
            <span className="font-bold text-black dark:text-gray-200 text-lg">
              Vercel Daily
            </span>
          </div>
        </Link>
        <Link href="/">Home</Link>
        <Link href="/search">Search</Link>
      </div>
    </header>
  );
}