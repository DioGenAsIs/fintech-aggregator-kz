"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dictionary } from "@/i18n/dictionaries";
import { Locale, Offer, offers } from "@/data/offers";

const amountRanges = [50000, 100000, 200000, Number.POSITIVE_INFINITY];
const termRanges = [7, 14, 30, Number.POSITIVE_INFINITY];

const trackEvent = (eventName: string, payload?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  const eventPayload = { event: eventName, ...payload };
  const dataLayer = (window as Window & { dataLayer?: Record<string, unknown>[] })
    .dataLayer;

  if (Array.isArray(dataLayer)) {
    dataLayer.push(eventPayload);
  }

  window.dispatchEvent(new CustomEvent("analytics", { detail: eventPayload }));
};

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function MarketplacePage({ locale, dict }: Props) {
  const [amountIndex, setAmountIndex] = useState(1);
  const [termIndex, setTermIndex] = useState(2);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const personalizedHeading = useMemo(() => {
    const selectedAmount = dict.hero.amountOptions[amountIndex];

    if (!isPersonalized) {
      return dict.offers.title;
    }

    if (locale === "ru") {
      return `${dict.offers.personalizedPrefix} ${selectedAmount}`;
    }

    return `${dict.offers.personalizedPrefix} ${selectedAmount} ${dict.offers.personalizedSuffix}`;
  }, [amountIndex, dict, isPersonalized, locale]);

  const sortedOffers = useMemo(() => {
    const selectedAmount = amountRanges[amountIndex];
    const selectedTerm = termRanges[termIndex];

    return [...offers]
      .map((offer, index) => {
        const amountMatch = offer.maxAmount >= selectedAmount ? 2 : 0;
        const termMatch = offer.maxTerm >= selectedTerm && offer.minTerm <= selectedTerm ? 2 : 0;

        return {
          offer,
          fallback: index,
          score: amountMatch + termMatch,
        };
      })
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.offer.priority !== a.offer.priority) {
          return b.offer.priority - a.offer.priority;
        }
        return a.fallback - b.fallback;
      })
      .map((item) => item.offer);
  }, [amountIndex, termIndex]);

  const visibleOffers = sortedOffers.slice(0, visibleCount);

  useEffect(() => {
    trackEvent("offers_view", {
      locale,
      amount: dict.hero.amountOptions[amountIndex],
      term: dict.hero.termOptions[termIndex],
      visibleOffers: visibleOffers.map((offer) => offer.id),
    });
  }, [amountIndex, dict.hero.amountOptions, dict.hero.termOptions, locale, termIndex, visibleOffers]);

  const scrollToOffers = () => {
    trackEvent("hero_cta_click", {
      locale,
      amount: dict.hero.amountOptions[amountIndex],
      term: dict.hero.termOptions[termIndex],
    });

    setIsPersonalized(true);

    requestAnimationFrame(() => {
      document.getElementById("offers")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const onOfferClick = (offer: Offer) => {
    trackEvent("offer_click", {
      locale,
      offerId: offer.id,
      offerName: offer.name,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href={`/${locale}`} className="text-lg font-bold tracking-tight">
            {dict.brand}
          </Link>

          <nav className="hidden items-center gap-5 text-sm text-slate-600 md:flex">
            <a href="#offers">{dict.nav.offers}</a>
            <a href="#how-it-works">{dict.nav.howItWorks}</a>
            <a href="#faq">{dict.nav.faq}</a>
          </nav>

          <div className="flex items-center text-sm">
            <Link
              href="/kk"
              className={`${locale === "kk" ? "font-semibold text-slate-900" : "text-slate-600 hover:text-slate-900"}`}
            >
              {dict.lang.kk}
            </Link>
            <span className="px-2 text-slate-400">|</span>
            <Link
              href="/ru"
              className={`${locale === "ru" ? "font-semibold text-slate-900" : "text-slate-600 hover:text-slate-900"}`}
            >
              {dict.lang.ru}
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-10 px-4 py-6 sm:py-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{dict.hero.title}</h1>
          <p className="mt-3 text-slate-600">{dict.hero.subtitle}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>{dict.hero.amountLabel}</span>
              <select
                value={amountIndex}
                onChange={(event) => {
                  const nextValue = Number(event.target.value);
                  setAmountIndex(nextValue);
                  trackEvent("hero_quiz_amount_select", {
                    locale,
                    value: dict.hero.amountOptions[nextValue],
                  });
                }}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base"
              >
                {dict.hero.amountOptions.map((option, index) => (
                  <option key={option} value={index}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span>{dict.hero.termLabel}</span>
              <select
                value={termIndex}
                onChange={(event) => {
                  const nextValue = Number(event.target.value);
                  setTermIndex(nextValue);
                  trackEvent("hero_quiz_term_select", {
                    locale,
                    value: dict.hero.termOptions[nextValue],
                  });
                }}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base"
              >
                {dict.hero.termOptions.map((option, index) => (
                  <option key={option} value={index}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <Button className="mt-5 h-12 w-full rounded-xl text-base font-semibold" onClick={scrollToOffers}>
            {dict.hero.cta}
          </Button>
        </section>

        <section id="offers" className="scroll-mt-24">
          <h2 className="text-2xl font-bold">{personalizedHeading}</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleOffers.map((offer) => (
              <article key={offer.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-3">
                  <Image
                    src={offer.logo}
                    alt={offer.name}
                    width={44}
                    height={44}
                    loading="lazy"
                    className="rounded-lg border border-slate-200"
                  />
                  <p className="font-semibold">{offer.name}</p>
                </div>

                <p className="text-lg font-bold">
                  {dict.offers.maxAmount} {new Intl.NumberFormat(locale === "kk" ? "kk-KZ" : "ru-RU").format(offer.maxAmount)} ₸
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {dict.offers.term}: {offer.minTerm}–{offer.maxTerm} {dict.offers.days}
                </p>
                <p className="mt-1 text-sm font-medium text-emerald-700">
                  {dict.offers.promoLabel}: {offer.rateText[locale]}
                </p>

                <ul className="my-3 space-y-1 text-sm text-slate-700">
                  {offer.features[locale].map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>

                <a
                  href={`/go/${offer.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onOfferClick(offer)}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white"
                >
                  {dict.offers.openOffer}
                </a>
              </article>
            ))}
          </div>

          {visibleCount < sortedOffers.length && (
            <Button
              variant="outline"
              className="mt-5 h-11 rounded-xl"
              onClick={() => {
                setVisibleCount((prev) => prev + 3);
                trackEvent("show_more_click", { locale });
              }}
            >
              {dict.offers.showMore}
            </Button>
          )}
        </section>

        <section id="how-it-works" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold">{dict.howItWorks.title}</h2>
          <ol className="mt-4 space-y-3 text-sm text-slate-700">
            {dict.howItWorks.steps.map((step, index) => (
              <li key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold">{dict.benefits.title}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {dict.benefits.items.map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold">{dict.faq.title}</h2>
          <div className="mt-4 space-y-2">
            {dict.faq.items.map((item) => (
              <details key={item.q} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <summary className="cursor-pointer font-medium">{item.q}</summary>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-6 text-sm text-slate-600">
          <p>{dict.footer.disclaimer}</p>
          <p>{dict.footer.compliance}</p>
          <p>{dict.footer.contact}</p>
        </div>
      </footer>
    </div>
  );
}
