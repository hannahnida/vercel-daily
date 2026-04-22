import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  cacheLife: {
    breakingNews: { stale: 30, revalidate: 60, expire: 300 },
    articles:     { stale: 60, revalidate: 300, expire: 3600 },
    trending:     { stale: 30, revalidate: 120, expire: 600 },
  },
  images: {
    remotePatterns: [new URL('https://i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com/news/**')],
  }
};

export default nextConfig;
