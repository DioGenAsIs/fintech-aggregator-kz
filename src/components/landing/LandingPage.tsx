"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Messages } from "@/lib/messages";
import type { Locale, AmountBucket, TermBucket } from "@/lib/i18n";
import type { Offer } from "@/types/offers";
import { useOfferSorting } from "@/lib/useOfferSorting";
import { useAnalytics } from "@/lib/useAnalytics";
import { buildAffiliateUrl } from "@/lib/affiliate";
import { trackEvent } from "@/lib/trackEvent";

const badgeToneByIndex = [
  "bg-amber-100 text-amber-800",
  "bg-emerald-100 text-emerald-800",
  "bg-blue-100 text-blue-800",
  "bg-violet-100 text-violet-800",
];

export function LandingPage({ locale, messages, offers }: { locale: Locale; messages: Messages; offers: Offer[] }) {
  const track = useAnalytics();
  const [amount, setAmount] = useState<AmountBucket>("100k");
  const [term, setTerm] = useState<TermBucket>("14");
  const [visible, setVisible] = useState(3);
  const [isFiltered, setIsFiltered] = useState(false);
  const offersRef = useRef<HTMLElement>(null);
  const sorted = useOfferSorting(offers, amount, term);
  const currentOffers = useMemo(() => sorted.slice(0, visible), [sorted, visible]);
  const t = messages;
  const selectedAmountLabel = {
    "50k": t.quiz.amount_50k,
    "100k": t.quiz.amount_100k,
    "200k": t.quiz.amount_200k,
    "200k_plus": t.quiz.amount_200k_plus,
  }[amount];
  const selectedTermLabel = {
    "7": t.quiz.term_7,
    "14": t.quiz.term_14,
    "30": t.quiz.term_30,
    "30_plus": t.quiz.term_30_plus,
  }[term];

  useEffect(() => {
    track("offers_view", { amountBucket: amount, termBucket: term });
  }, [amount, term, track]);

  useEffect(() => {
    currentOffers.forEach((offer, index) => {
      track("offer_impression", { offerId: offer.id, position: index + 1 });
    });
  }, [currentOffers, track]);

  const onSubmit = () => {
    track("hero_cta_click", { amountBucket: amount, termBucket: term });
    setIsFiltered(true);
    setVisible(3);
    offersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const switchHref = locale === "kk" ? "/ru" : "/kk";
  const offerCards = useMemo(() => {
    return currentOffers.map((offer, idx) => {
      const features = locale === "kk" ? offer.featuresKk : offer.featuresRu;
      const rateText = locale === "kk" ? offer.rateTextKk : offer.rateTextRu;
      const badge = locale === "kk" ? offer.badgesKk?.[0] : offer.badgesRu?.[0];
      const affiliateUrl = buildAffiliateUrl({
        baseUrl: offer.affiliateUrl,
        offerIdOrName: offer.id,
        selectedAmount: amount,
        selectedTerm: term,
      });

      return {
        id: offer.id,
        name: offer.name,
        badge: badge || (idx === 0 || offer.isTop ? "Лучший выбор" : "Популярный"),
        amount: `${offer.amountMinKzt?.toLocaleString("ru-RU")}–${offer.maxAmountKzt.toLocaleString("ru-RU")} ₸`,
        term: `${offer.minTermDays}–${offer.maxTermDays} ${t.offers.days}`,
        rateText,
        features,
        affiliateUrl,
      };
    });
  }, [amount, currentOffers, locale, t.offers.days, term]);

  return (
    <div className="min-h-screen bg-[#F2F6FF] text-[#0B1220]">
      <header className="sticky top-0 z-50 border-b border-[#DCE5FF] bg-[#07153A]/95 text-white backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="text-lg font-bold tracking-tight">{t.brand}</a>
          <nav className="hidden gap-6 text-sm text-white/85 md:flex">
            <a href="#offers" className="hover:text-white">{t.nav.offers}</a>
            <a href="#how" className="hover:text-white">{t.nav.how}</a>
            <a href="#faq" className="hover:text-white">{t.nav.faq}</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href={switchHref}
              onClick={() => track("language_switch", { from: locale, to: locale === "kk" ? "ru" : "kk" })}
              className="rounded-md border border-white/35 px-2 py-1 text-sm text-white"
            >
              {locale === "kk" ? "Русский" : "Қазақша"}
            </Link>
            <button className="rounded-xl bg-[#1F4BFF] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-900/30" onClick={onSubmit}>
              {t.nav.pick}
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6 sm:py-10">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#041135] via-[#0A2368] to-[#1F4BFF] p-6 text-white shadow-2xl shadow-blue-900/35 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="pr-2">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-200">{t.hero.eyebrow}</p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                {t.hero.title}
              </h1>
              <p className="mt-5 max-w-xl text-base text-blue-100 sm:text-lg">{t.hero.subtitle}</p>

              <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-2">
                {t.hero.bullets.map((b) => (
                  <li key={b} className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-center font-medium text-white">
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white p-6 text-[#0B1220] shadow-2xl shadow-[#01091f]/40 sm:p-7">
              <a href="#how" className="text-sm font-semibold text-[#1F4BFF] underline decoration-dotted underline-offset-4">{t.hero.howLink}</a>
              <div className="mt-4 grid gap-3">
                <label className="text-sm font-semibold">
                  {t.quiz.amount}
                  <select
                    value={amount}
                    onChange={(e) => {
                      const v = e.target.value as AmountBucket;
                      setAmount(v);
                      track("hero_amount_select", { bucket: v });
                    }}
                    className="mt-1 h-12 w-full rounded-xl border border-[#C7D6FF] bg-white px-3 font-medium"
                    aria-label={t.quiz.amount}
                  >
                    <option value="50k">{t.quiz.amount_50k}</option>
                    <option value="100k">{t.quiz.amount_100k}</option>
                    <option value="200k">{t.quiz.amount_200k}</option>
                    <option value="200k_plus">{t.quiz.amount_200k_plus}</option>
                  </select>
                </label>

                <label className="text-sm font-semibold">
                  {t.quiz.term}
                  <select
                    value={term}
                    onChange={(e) => {
                      const v = e.target.value as TermBucket;
                      setTerm(v);
                      track("hero_term_select", { bucket: v });
                    }}
                    className="mt-1 h-12 w-full rounded-xl border border-[#C7D6FF] bg-white px-3 font-medium"
                    aria-label={t.quiz.term}
                  >
                    <option value="7">{t.quiz.term_7}</option>
                    <option value="14">{t.quiz.term_14}</option>
                    <option value="30">{t.quiz.term_30}</option>
                    <option value="30_plus">{t.quiz.term_30_plus}</option>
                  </select>
                </label>
              </div>

              <button
                className="mt-4 h-12 w-full rounded-xl bg-[#1F4BFF] font-semibold text-white shadow-lg shadow-blue-200 transition hover:brightness-110"
                onClick={onSubmit}
              >
                {t.cta.primary}
              </button>
              <p className="mt-3 text-xs text-[#5B6475]">{t.hero.selectionDisclaimer}</p>
              <p className="mt-2 text-xs text-[#5B6475]">{t.hero.disclaimer}</p>
            </div>
          </div>
        </section>

        <section id="offers" ref={offersRef} className="scroll-mt-24">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#081A4A]">{t.offers.title}</h2>
              <p className="mt-1 text-sm font-medium text-[#4B5565]">{t.offers.subtitle}</p>
            </div>
            {isFiltered ? <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#123DB9]">{selectedAmountLabel} · {selectedTermLabel}</span> : null}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {currentOffers.map((offer, idx) => {
              const isTop = idx === 0 || offer.isTop;
              const aprText = locale === "kk" ? offer.aprTextKk : offer.aprTextRu;
              const ctaText = locale === "kk" ? offer.ctaTextKk : offer.ctaTextRu;
              const licenseDisclaimer = locale === "kk" ? offer.licenseDisclaimerKk : offer.licenseDisclaimerRu;
              const offerCard = offerCards[idx];
              const affiliateDomain = new URL(offerCard.affiliateUrl).hostname;
              const trackingPayload = {
                offer_id: offer.id,
                offer_name: offer.name,
                offer_position: idx + 1,
                affiliate_domain: affiliateDomain,
                selected_amount: amount,
                selected_term: term,
                page_name: "home",
                timestamp: new Date().toISOString(),
              };
              return (
                <article
                  key={offer.id}
                  onClick={() => trackEvent("offer_card_click", trackingPayload)}
                  className={`rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-2xl ${
                    isTop
                      ? "border-[#1F4BFF] bg-gradient-to-b from-white to-blue-50 shadow-xl shadow-blue-200/70"
                      : "border-[#DCE5FF] bg-white shadow-lg shadow-blue-100/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-[#EAF0FF] font-bold text-[#1F4BFF]">
                        {offer.logoIconPath ? (
                          <Image
                            src={offer.logoIconPath}
                            alt={`${offer.name} logo`}
                            width={36}
                            height={36}
                            className="h-9 w-9 object-contain"
                          />
                        ) : (
                          offer.logoText
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-[#081A4A]">{offer.name}</p>
                        <p className="text-xs font-medium text-[#1F4BFF]">{t.offers.rate}: {offerCard.rateText}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeToneByIndex[idx % badgeToneByIndex.length]}`}>
                      {offerCard.badge}
                    </span>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#DCE5FF] bg-white/90 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">{t.offers.maxAmount}</p>
                    <p className="text-2xl font-extrabold text-[#081A4A]">{offerCard.amount}</p>
                    <p className="mt-1 text-sm text-[#4B5565]"><b>{t.offers.term}</b> {offerCard.term}</p>
                    {aprText ? <p className="mt-1 text-xs text-[#4B5565]"><b>{t.offers.apr}:</b> {aprText}</p> : null}
                    {offer.gesvMax ? <p className="mt-1 text-xs text-[#4B5565]">{t.offers.gesv} {offer.gesvMax}%</p> : null}
                  </div>

                  <ul className="my-4 list-disc space-y-1 pl-5 text-sm text-[#334155]">
                    {offerCard.features.slice(0, 3).map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>

                  <a
                    href={offerCard.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    onClick={(event) => {
                      event.stopPropagation();
                      trackEvent("offer_button_click", trackingPayload);
                    }}
                    className={`flex h-12 items-center justify-center rounded-xl text-sm font-bold text-white transition hover:brightness-110 ${
                      isTop ? "bg-[#123DB9] shadow-xl shadow-blue-300/60" : "bg-[#1F4BFF]"
                    }`}
                  >
                    {ctaText || t.cta.offer}
                  </a>
                  {licenseDisclaimer ? <p className="mt-2 text-[11px] leading-4 text-[#6B7280]">{licenseDisclaimer}</p> : null}
                </article>
              );
            })}
          </div>

          {visible < sorted.length ? (
            <button
              onClick={() => {
                setVisible((v) => v + 3);
                track("show_more_click", { currentCount: visible });
              }}
              className="mt-5 rounded-xl border border-[#1F4BFF] bg-white px-4 py-2 font-semibold text-[#1F4BFF] transition hover:bg-blue-50"
            >
              {t.cta.showMore}
            </button>
          ) : null}
        </section>

        <section className="rounded-2xl border border-[#DCE5FF] bg-white p-6 shadow-lg shadow-blue-100/50">
          <h3 className="text-xl font-bold text-[#081A4A]">{t.trust.title}</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.trust.items.map((x) => (
              <div key={x} className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm font-medium text-emerald-900">
                {x}
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="rounded-2xl border border-[#DCE5FF] bg-white p-6">
          <h3 className="text-xl font-bold text-[#081A4A]">{t.how.title}</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {t.how.steps.map((s, i) => (
              <div key={s.title} className="rounded-xl border border-[#DCE5FF] bg-[#F8FAFF] p-4">
                <p className="text-xs font-bold uppercase text-[#1F4BFF]">0{i + 1}</p>
                <h4 className="mt-1 font-semibold">{s.title}</h4>
                <p className="mt-1 text-sm text-[#4B5565]">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="rounded-2xl border border-[#DCE5FF] bg-white p-6">
          <h3 className="text-xl font-bold text-[#081A4A]">{t.faq.title}</h3>
          <div className="mt-4 space-y-2">
            {t.faq.items.map((item, idx) => (
              <details
                key={item.q}
                className="rounded-xl border border-[#DCE5FF] p-4"
                onToggle={(e) =>
                  track("faq_toggle", { itemId: idx, open: (e.target as HTMLDetailsElement).open })
                }
              >
                <summary className="cursor-pointer font-semibold">{item.q}</summary>
                <p className="mt-2 text-sm text-[#4B5565]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <button
        className="fixed bottom-3 left-3 right-3 z-40 h-12 rounded-xl bg-[#123DB9] font-bold text-white shadow-2xl shadow-blue-900/40 md:hidden"
        onClick={() => {
          track("sticky_cta_click");
          onSubmit();
        }}
      >
        {t.cta.sticky}
      </button>

      <footer className="border-t border-[#DCE5FF] bg-[#07153A] pb-20 text-blue-100 md:pb-8">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-6 text-sm">
          <p>{t.footer.d1}</p>
          <p>{t.footer.d2}</p>
          <p>{t.footer.privacy} · {t.footer.terms}</p>
          <p>{t.footer.contact}</p>
        </div>
      </footer>
    </div>
  );
}
