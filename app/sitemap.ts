import type { MetadataRoute } from "next";
import { getIndexableUrlEntries } from "@/lib/indexableUrls";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return getIndexableUrlEntries().map((entry) => ({
    ...entry,
    lastModified: now
  }));
}
