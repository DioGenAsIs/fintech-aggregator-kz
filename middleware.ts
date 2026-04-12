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
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (!LOCALE_PREFIX.test(pathname)) {
    return NextResponse.redirect(new URL(`/kk${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
