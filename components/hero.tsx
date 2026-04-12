import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

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

          <div className="text-base-content/70 text-lg leading-relaxed flex gap-2">
            <button className="btn btn-lg">
              Browse Articles
              <ArrowRightIcon className="h-4 w-4" />
            </button>
            <button className="btn btn-outline btn-lg">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
}