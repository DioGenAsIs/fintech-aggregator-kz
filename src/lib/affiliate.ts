import type { AmountBucket, TermBucket } from "@/lib/i18n";
import { amountBucketMap, termBucketMap } from "@/lib/i18n";

const DEFAULT_SUB_IDS = {
  sub1: "loanmarket_kz",
  sub2: "homepage",
} as const;

const NOT_SELECTED = "not_selected";

export type AffiliateUrlOptions = {
  baseUrl: string;
  offerIdOrName: string;
  selectedAmount?: AmountBucket;
  selectedTerm?: TermBucket;
};

export function buildAffiliateUrl({
  baseUrl,
  offerIdOrName,
  selectedAmount,
  selectedTerm,
}: AffiliateUrlOptions): string {
  const url = new URL(baseUrl);

  url.searchParams.set("sub1", DEFAULT_SUB_IDS.sub1);
  url.searchParams.set("sub2", DEFAULT_SUB_IDS.sub2);
  url.searchParams.set("sub3", offerIdOrName || NOT_SELECTED);
  url.searchParams.set(
    "sub4",
    selectedAmount ? String(amountBucketMap[selectedAmount]) : NOT_SELECTED,
  );
  url.searchParams.set(
    "sub5",
    selectedTerm ? String(termBucketMap[selectedTerm]) : NOT_SELECTED,
  );

  return url.toString();
}
