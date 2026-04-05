export const TRACKING_SITE = "loanmarketkz";

export type TrackingPlacement =
  | "hero"
  | "card"
  | "top_list"
  | "sticky_cta"
  | "quiz_result"
  | "footer_cta";

export type TrackingPage = "home_ru" | "home_kz" | "results_ru" | "results_kz";

export type BuildOfferTrackingUrlOptions = {
  offerId: string;
  site?: string;
  placement: TrackingPlacement;
  offerSlug: string;
  page: TrackingPage;
  sourceTag?: string;
};

export function buildOfferTrackingUrl({
  offerId,
  site = TRACKING_SITE,
  placement,
  offerSlug,
  page,
  sourceTag,
}: BuildOfferTrackingUrlOptions): string {
  const searchParams = new URLSearchParams({
    sub1: site,
    sub2: placement,
    sub3: offerSlug,
    sub4: page,
  });

  if (sourceTag) {
    searchParams.set("sub5", sourceTag);
  }

  return `/go/${offerId}?${searchParams.toString()}`;
}
