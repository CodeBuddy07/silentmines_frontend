import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    domains: ['localhost','greenlove.fun'], // Add 'localhost' to the domains list
  },
};

export default nextConfig;
