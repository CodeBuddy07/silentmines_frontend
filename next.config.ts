// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   experimental: {
//     serverActions: {
//       bodySizeLimit: '50mb',
//     },
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "**",
//       },
//     ],
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    domains: ['localhost', 'your-external-domain.com'], // Replace with your actual external domains
  },
};

export default nextConfig;
