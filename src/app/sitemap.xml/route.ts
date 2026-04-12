import { landingPageConfigs } from "@/lib/landingConfigs";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tengimarket.kz";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const now = new Date().toISOString();
  const staticRoutes = ["", "/ru", "/kk"];

  const urls = [
    ...staticRoutes.map((route) => ({
      loc: `${BASE_URL}${route}`,
      priority: route === "" ? "1.0" : "0.9",
    })),
    ...landingPageConfigs.map((config) => ({
      loc: `${BASE_URL}/${config.locale}/${config.slug}`,
      priority:
        config.slug === "zaim-online" || config.slug === "zaim-na-kartu" || config.slug === "mikroqaryz-online"
          ? "0.95"
          : "0.8",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      ({ loc, priority }) =>
        `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
    )
    .join("\n")}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
