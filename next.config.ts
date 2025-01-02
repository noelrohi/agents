import { NextConfig } from "next";

const nextConfig = {
  images: {
    unoptimized: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  experimental: {
    dynamicIO: true,
    cacheLife: {
      item: {
        stale: 3600, // 1 hour
        revalidate: 900, // 15 minutes
        expire: 86400, // 1 day
      },
    },
  },
} satisfies NextConfig;

export default nextConfig;
