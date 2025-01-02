import { NextConfig } from "next";

const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    dynamicIO: true,
  },
} satisfies NextConfig;

export default nextConfig;
