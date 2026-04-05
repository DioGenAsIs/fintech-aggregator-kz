import { NextRequest, NextResponse } from "next/server";
import { offersMap } from "@/data/offers";

const allowedParam = (key: string) =>
  key.startsWith("utm_") || key === "cid" || key.startsWith("sub");

export function GET(
  request: NextRequest,
  { params }: { params: { offerId: string } },
) {
  const { offerId } = params;
  const target = process.env[`OFFER_${offerId}_URL`] ?? offersMap[offerId];

  if (!target) {
    return NextResponse.redirect(new URL("/kk", request.url));
  }

  const redirectUrl = new URL(target);

  request.nextUrl.searchParams.forEach((value, key) => {
    if (allowedParam(key)) {
      redirectUrl.searchParams.set(key, value);
    }
  });

  return NextResponse.redirect(redirectUrl, 307);
}
