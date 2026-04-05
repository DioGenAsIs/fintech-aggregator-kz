import { NextRequest, NextResponse } from "next/server";
import { offersMap } from "@/data/offers";

const fallbackTargets: Record<string, string> = {
  "2291": "https://example.com/offers/2291",
  "4905": "https://example.com/offers/4905",
  "6288": "https://example.com/offers/6288",
  "6322": "https://example.com/offers/6322",
  "6225": "https://example.com/offers/6225",
  "3321": "https://example.com/offers/3321",
};

const allowedParam = (key: string) =>
  key.startsWith("utm_") || key === "cid" || key.startsWith("sub");

export function GET(
  request: NextRequest,
  { params }: { params: { offerId: string } },
) {
  const { offerId } = params;

  const target =
    process.env[`OFFER_${offerId}_URL`] ??
    offersMap[offerId] ??
    fallbackTargets[offerId];

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