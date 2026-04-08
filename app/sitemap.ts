import type { MetadataRoute } from "next";
import { shops } from "@/data/shops";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    ...shops.map((shop) => ({
      url: `${SITE_URL}/shops/${shop.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  ];
}
