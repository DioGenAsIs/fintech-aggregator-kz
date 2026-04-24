import type { MetadataRoute } from "next";
import { landingPageConfigs } from "@/lib/landingConfigs";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tengimarket.kz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/kk`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ru`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const landingEntries: MetadataRoute.Sitemap = landingPageConfigs.map((config) => ({
    url: `${BASE_URL}/${config.locale}/${config.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority:
      config.slug === "zaim-online" ||
      config.slug === "zaim-na-kartu" ||
      config.slug === "mikroqaryz-online"
        ? 0.95
        : 0.8,
  }));

  return [...staticEntries, ...landingEntries];
}
