import type { MetadataRoute } from "next";
import { locationPages } from "@/data/locationPages";
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
    ...locationPages.map((page) => ({
      url: `${SITE_URL}${page.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85
    })),
    ...shops.map((shop) => ({
      url: `${SITE_URL}/shops/${shop.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  ];
}
