import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const CANONICAL_HOST = "tengimarket.kz";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Пропускаем служебные пути
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/go") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hostHeader = req.headers.get("host") ?? "";
  const [hostname = ""] = hostHeader.split(":");
  const currentHost = hostname.toLowerCase();

  // Редирект www → non-www
  if (currentHost !== CANONICAL_HOST) {
    const destination = `https://${CANONICAL_HOST}${pathname}${search}`;
    return NextResponse.redirect(destination, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
