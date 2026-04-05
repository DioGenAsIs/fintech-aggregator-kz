"use client";

import { useMemo } from "react";
import type { Offer } from "@/types/offers";
import { amountBucketMap, termBucketMap, type AmountBucket, type TermBucket } from "@/lib/i18n";

export function useOfferSorting(
  offers: Offer[],
  amountBucket: AmountBucket,
  termBucket: TermBucket,
) {
  return useMemo(() => {
    const selectedAmount = amountBucketMap[amountBucket];
    const selectedTerm = termBucketMap[termBucket];

    return [...offers].sort((a, b) => {
      const scoreA = getScore(a, selectedAmount, selectedTerm);
      const scoreB = getScore(b, selectedAmount, selectedTerm);
      return scoreB - scoreA;
    });
  }, [offers, amountBucket, termBucket]);
}

function getScore(offer: Offer, selectedAmount: number, selectedTerm: number) {
  const amountMatch = offer.maxAmountKzt >= selectedAmount ? 40 : 0;
  const termMatch =
    selectedTerm >= offer.minTermDays && selectedTerm <= offer.maxTermDays ? 50 : 0;
  const badgeBoost = offer.badgesRu?.length || offer.badgesKk?.length ? 5 : 0;

  return termMatch + amountMatch + offer.priority * 0.1 + badgeBoost;
}
