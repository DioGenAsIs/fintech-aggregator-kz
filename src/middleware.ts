import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const LOCALE_PREFIX = /^\/(kk|ru)(\/|$)/;
const CANONICAL_HOST = "www.tengimarket.kz";
const SUPPORTED_HOSTS = new Set(["tengimarket.kz", "www.tengimarket.kz"]);

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

  const normalizedPath = normalizePath(pathname);
  const canonicalPath = getCanonicalPath(normalizedPath);

  // Всегда используем https и canonical host — один редирект сразу на финал
  const needsHttps = req.nextUrl.protocol !== "https:";
  const needsHost = SUPPORTED_HOSTS.has(currentHost) && currentHost !== CANONICAL_HOST;
  const needsPath = canonicalPath !== pathname;

  if (needsHttps || needsHost || needsPath) {
    const destination = `https://${CANONICAL_HOST}${canonicalPath}${search}`;
    return NextResponse.redirect(destination, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
