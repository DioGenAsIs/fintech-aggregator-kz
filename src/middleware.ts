import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const LOCALE_PREFIX = /^\/(kk|ru)(\/|$)/;
const CANONICAL_HOST = "www.tengimarket.kz";

function normalizePath(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function getCanonicalPath(pathname: string): string {
  if (pathname === "/") return "/kk";
  if (LOCALE_PREFIX.test(pathname)) return pathname;
  return `/kk${pathname}`;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

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

  // Уже с локалью — сразу пропускаем без лишних проверок
  if (LOCALE_PREFIX.test(pathname)) {
    return NextResponse.next();
  }

  const hostHeader = req.headers.get("host") ?? "";
  const [hostname = ""] = hostHeader.split(":");
  const currentHost = hostname.toLowerCase();

  if (currentHost !== CANONICAL_HOST) {
    return NextResponse.next();
  }

  const normalizedPath = normalizePath(pathname);
  const canonicalPath = getCanonicalPath(normalizedPath);

  const destination = `https://${CANONICAL_HOST}${canonicalPath}${search}`;
  return NextResponse.redirect(destination, { status: 301 });
}

export const config = {
  matcher: ["/:path*"],
};
