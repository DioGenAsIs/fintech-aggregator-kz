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

    const exactMatches = offers.filter(
      (offer) => offer.maxAmount >= selectedAmount && offer.maxTerm >= selectedTerm,
    );

    if (exactMatches.length > 0) {
      return [...exactMatches].sort(
        (a, b) => getMatchScore(b, selectedAmount, selectedTerm) - getMatchScore(a, selectedAmount, selectedTerm),
      );
    }

    return [...offers].sort((a, b) => {
      const distanceA = getDistance(a, selectedAmount, selectedTerm);
      const distanceB = getDistance(b, selectedAmount, selectedTerm);

      if (distanceA !== distanceB) {
        return distanceA - distanceB;
      }

      return b.priority - a.priority;
    });
  }, [offers, amountBucket, termBucket]);
}

function getMatchScore(offer: Offer, selectedAmount: number, selectedTerm: number) {
  const amountHeadroom = offer.maxAmount - selectedAmount;
  const termHeadroom = offer.maxTerm - selectedTerm;
  const promoBoost = offer.badgesRu?.length || offer.badgesKk?.length ? 4 : 0;

  return offer.priority * 2 + amountHeadroom * 0.00008 + termHeadroom * 0.3 + promoBoost;
}

function getDistance(offer: Offer, selectedAmount: number, selectedTerm: number) {
  const amountOverflow = Math.max(0, selectedAmount - offer.maxAmount);
  const amountUnderflow = Math.max(0, offer.minAmount - selectedAmount);
  const termOverflow = Math.max(0, selectedTerm - offer.maxTerm);
  const termUnderflow = Math.max(0, offer.minTerm - selectedTerm);

  return amountOverflow * 0.001 + amountUnderflow * 0.0005 + termOverflow * 2 + termUnderflow;
}
