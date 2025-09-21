// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "500mb",
    },
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `https://server.greenlove.fun/uploads/:path*`,
      },
    ];
  },
  images: {
    // Replace deprecated domains with remotePatterns
    remotePatterns: [
      // For local development
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      // For production domain
      {
        protocol: "https",
        hostname: "server.greenlove.fun",
        pathname: "/uploads/**",
      },
      // For IP address access (if needed)
      {
        protocol: "http",
        hostname: "148.230.85.23",
        port: "5000",
        pathname: "/uploads/**",
      },
      // For your main domain if serving images from there
      {
        protocol: "https",
        hostname: "greenlove.fun",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;