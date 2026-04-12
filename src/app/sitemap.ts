import type { MetadataRoute } from "next";
import { landingPageConfigs } from "@/lib/landingConfigs";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tengimarket.kz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/ru", "/kk"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.9,
    })),
    ...landingPageConfigs.map((config) => ({
      url: `${BASE_URL}/${config.locale}/${config.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority:
        config.slug === "zaim-online" || config.slug === "zaim-na-kartu" || config.slug === "mikroqaryz-online"
          ? 0.95
          : 0.8,
    })),
  ];
}
