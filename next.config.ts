import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  experimental: {
    // Turbo configuration for better performance
    // Note: Moved from turbo property as it's now stable
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  // Dynamic deployment for full functionality
  // output: "export", // Uncomment for static deployment (will disable API routes)
  // trailingSlash: true, // Only needed for static export
  images: {
    unoptimized: true, // Better compatibility across deployment platforms
  },
};

export default nextConfig;
