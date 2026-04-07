import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import ThemeController from './theme-controller';


function NavMenu() {
  return (
    <>
      <li><Link className="btn btn-link font-medium text-neutral dark:text-neutral-50 no-underline" href="/">Home</Link></li>
      <li><Link className="btn btn-link font-medium text-neutral dark:text-neutral-50 no-underline" href="/search">Search</Link></li>
    </>
  );
}

export function Header() {
  return (
    <header className="navbar bg-base-100 shadow-sm dark:shadow-none dark:border-b dark:border-white/10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="h-5 w-5" />
          </div>
          <ul tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-md dark:shadow-none dark:border dark:border-white/10">
            <NavMenu />
          </ul>
        </div>
        <Link href="/" className="text-xl px-4">
          <div className="flex items-center gap-2">
            <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
              className="invert dark:invert-0 w-5 h-5"
            />
            <span className="font-bold text-lg">
              Vercel Daily
            </span>
            </div>
          </Link>
        </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavMenu />
        </ul>
      </div>
      <div className="navbar-end px-4">
        <ThemeController />
      </div>
    </header>
  );
}