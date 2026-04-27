import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  cacheLife: {
    breakingNews: { stale: 30,   revalidate: 60,    expire: 300    },
    articles:     { stale: 3600, revalidate: 86400, expire: 604800 },
    trending:     { stale: 300,  revalidate: 900,   expire: 3600   },
    search:       { stale: 300,  revalidate: 3600,  expire: 86400  },
    categories:   { stale: 3600, revalidate: 86400, expire: 604800 },
  },
  images: {
    remotePatterns: [new URL('https://i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com/news/**')],
  }
};

export default nextConfig;
