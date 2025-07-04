// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "typs.dev",
        pathname: "/logo.png", // or "/**" for all images
      },
    ],
  },
};

export default nextConfig;
