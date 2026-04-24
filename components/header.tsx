import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeController from '@/components/header/theme-controller';
import { DrawerNavLink } from '@/components/header/drawer-nav-link';

const DRAWER_ID = 'menu-drawer';

function DesktopNav() {
  const linkClass =
    'font-medium hover:bg-transparent active:bg-transparent text-neutral dark:text-neutral-50 no-underline';
  return (
    <>
      <li><Link className={linkClass} href="/">Home</Link></li>
      <li><Link className={linkClass} href="/search">Search</Link></li>
    </>
  );
}

function MobileNav() {
  const linkClass =
    'font-medium hover:bg-transparent active:bg-transparent text-neutral dark:text-neutral-50 no-underline';
  return (
    <>
      <li><DrawerNavLink drawerId={DRAWER_ID} className={linkClass} href="/">Home</DrawerNavLink></li>
      <li><DrawerNavLink drawerId={DRAWER_ID} className={linkClass} href="/search">Search</DrawerNavLink></li>
    </>
  );
}

export function Header() {
  return (
    <header className="bg-base-100 shadow-sm dark:shadow-none dark:border-b dark:border-white/10">
      <div className="max-w-screen-xl mx-auto navbar">
        <div className="navbar-start flex-2 md:flex-initial md:w-auto">
          <div className="drawer w-auto">
            <input id={DRAWER_ID} type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor={DRAWER_ID} className="drawer-button btn btn-ghost lg:hidden">
                <Menu className="h-5 w-5" />
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor={DRAWER_ID} aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 min-h-full w-80 p-4">
                <label htmlFor={DRAWER_ID} className="drawer-button cursor-pointer self-end mb-4">
                  <X className="h-5 w-5" />
                </label>
                <MobileNav />
              </ul>
            </div>
          </div>
          <Link href="/" className="text-xl px-1 md:px-4">
            <div className="flex items-center gap-2">
              <Image
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
                className="invert dark:invert-0 w-5 h-5"
              />
              <span className="font-bold text-lg">Vercel Daily</span>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex lg:flex-1 lg:ml-auto">
          <ul className="menu menu-horizontal px-1">
            <DesktopNav />
          </ul>
        </div>
        <div className="navbar-end ml-auto flex-1 px-1 md:px-4">
          <ThemeController />
        </div>
      </div>
    </header>
  );
}