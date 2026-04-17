import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const LOCALE_PREFIX = /^\/(kk|ru)(\/|$)/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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

  // Root URL canonicalization/locale redirect is handled at the CDN layer (Netlify)
  // to avoid temporary redirects (307) in SEO-critical entrypoints.
  if (pathname !== "/" && !LOCALE_PREFIX.test(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/kk${pathname}`;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
