import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { getSubscriptionStatus } from '@/lib/api/subscription';
import SubscribeButton from '@/components/subscribe-button';

async function HeroButtons() {
  const subscriptionStatus = await getSubscriptionStatus();

  return (
    <div className="text-base-content/70 text-lg leading-relaxed flex gap-2">
      <Link href="/search" className="btn btn-primary">
        Browse Articles
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
      <SubscribeButton status={subscriptionStatus} />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="w-full max-w-screen-xl py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        <div className="flex flex-col gap-5">
          <span className="uppercase tracking-widest text-xs w-fit">
            {'The Vercel Daily'}
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            {'Top stories from the world of web development'}
          </h1>

          <p className="text-base-content/70 text-lg leading-relaxed">
            {'Stay up to date with the latest news, insights, and releases from the Vercel ecosystem and beyond.'}
          </p>

          <Suspense fallback={
            <div className="flex gap-2">
              <div className="btn btn-primary animate-pulse">
                Browse Articles
                <ArrowRightIcon className="h-4 w-4" />
              </div>
              <div className="btn animate-pulse w-32 min-w-[120px]" />
            </div>
          }>
            <HeroButtons />
          </Suspense>
        </div>
      </div>
    </section>
  );
}