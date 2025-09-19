// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "500mb",
    },
  },
  images: {
    // Keep any domains you already use…
    domains: ["localhost", "greenlove.fun"],

    // Add explicit remote patterns for IP + port and (optionally) your HTTPS domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "148.230.85.23",
        port: "5000",
        pathname: "/uploads/**", // allow everything under /uploads
      },
      // If you also serve images via your domain (recommended for HTTPS prod):
      {
        protocol: "https",
        hostname: "server.greenlove.fun",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
