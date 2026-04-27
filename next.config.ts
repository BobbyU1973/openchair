import type { NextConfig } from "next";

const indexNowKey = process.env.INDEXNOW_KEY?.trim();

const nextConfig: NextConfig = {
  async rewrites() {
    if (!indexNowKey) {
      return [];
    }

    return [
      {
        source: `/${indexNowKey}.txt`,
        destination: "/api/indexnow/key"
      }
    ];
  }
};

export default nextConfig;
