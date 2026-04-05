import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

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

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/kk", req.url));
  }

  if (!pathname.startsWith("/kk") && !pathname.startsWith("/ru")) {
    return NextResponse.redirect(new URL(`/kk${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
