"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Messages } from "@/lib/messages";
import type { Locale, AmountBucket, TermBucket } from "@/lib/i18n";
import type { Offer } from "@/types/offers";
import { useOfferSorting } from "@/lib/useOfferSorting";
import { useAnalytics } from "@/lib/useAnalytics";

export function LandingPage({ locale, messages, offers }: { locale: Locale; messages: Messages; offers: Offer[] }) {
  const track = useAnalytics();
  const [amount, setAmount] = useState<AmountBucket>("100k");
  const [term, setTerm] = useState<TermBucket>("14");
  const [visible, setVisible] = useState(3);
  const offersRef = useRef<HTMLElement>(null);
  const sorted = useOfferSorting(offers, amount, term);
  const currentOffers = useMemo(() => sorted.slice(0, visible), [sorted, visible]);

  const t = messages;

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
    offersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const switchHref = locale === "kk" ? "/ru" : "/kk";

  return (
    <div className="min-h-screen bg-[#F6F8FC] text-[#0B1220]">
      <header className="sticky top-0 z-50 border-b border-[#E6EAF2] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="text-lg font-semibold">{t.brand}</a>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#offers">{t.nav.offers}</a><a href="#how">{t.nav.how}</a><a href="#faq">{t.nav.faq}</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href={switchHref} onClick={() => track("language_switch", { from: locale, to: locale === "kk" ? "ru" : "kk" })} className="rounded-md px-2 py-1 text-sm underline underline-offset-4">
              {locale === "kk" ? "Русский" : "Қазақша"}
            </Link>
            <button className="rounded-xl bg-[#1F4BFF] px-4 py-2 text-sm font-semibold text-white" onClick={onSubmit}>{t.nav.pick}</button>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6 sm:py-10">
        <section className="rounded-2xl bg-white p-6 shadow-[0_10px_30px_rgba(11,18,32,0.08)] sm:p-8">
          <h1 className="text-3xl font-semibold sm:text-5xl">{t.hero.title}</h1>
          <p className="mt-4 max-w-2xl text-[#4B5565]">{t.hero.subtitle}</p>

          <div className="mt-6 grid gap-3 sm:max-w-xl sm:grid-cols-2">
            <label className="text-sm font-medium">{t.quiz.amount}
              <select value={amount} onChange={(e) => { const v = e.target.value as AmountBucket; setAmount(v); track("hero_amount_select", { bucket: v }); }} className="mt-1 h-12 w-full rounded-xl border border-[#E6EAF2] px-3" aria-label={t.quiz.amount}>
                <option value="50k">{t.quiz.amount_50k}</option><option value="100k">{t.quiz.amount_100k}</option><option value="200k">{t.quiz.amount_200k}</option><option value="200k_plus">{t.quiz.amount_200k_plus}</option>
              </select>
            </label>
            <label className="text-sm font-medium">{t.quiz.term}
              <select value={term} onChange={(e) => { const v = e.target.value as TermBucket; setTerm(v); track("hero_term_select", { bucket: v }); }} className="mt-1 h-12 w-full rounded-xl border border-[#E6EAF2] px-3" aria-label={t.quiz.term}>
                <option value="7">{t.quiz.term_7}</option><option value="14">{t.quiz.term_14}</option><option value="30">{t.quiz.term_30}</option><option value="30_plus">{t.quiz.term_30_plus}</option>
              </select>
            </label>
          </div>

          <button className="mt-4 h-12 w-full rounded-xl bg-[#1F4BFF] font-semibold text-white sm:w-auto sm:px-8" onClick={onSubmit}>{t.cta.primary}</button>
          <a href="#how" className="mt-3 block text-sm text-[#1F4BFF] underline underline-offset-4">{t.hero.howLink}</a>

          <ul className="mt-5 grid gap-2 text-sm text-[#4B5565] sm:grid-cols-2">
            {t.hero.bullets.map((b) => <li key={b}>• {b}</li>)}
          </ul>
          <p className="mt-4 text-xs text-[#4B5565]">{t.hero.disclaimer}</p>
        </section>

        <section id="offers" ref={offersRef} className="scroll-mt-24">
          <h2 className="text-2xl font-semibold">{t.offers.title}</h2>
          <p className="mt-1 text-sm text-[#4B5565]">{t.offers.subtitle}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {currentOffers.map((offer, idx) => {
              const features = locale === "kk" ? offer.featuresKk : offer.featuresRu;
              const rate = locale === "kk" ? offer.rateTextKk : offer.rateTextRu;
              const badge = locale === "kk" ? offer.badgesKk?.[0] : offer.badgesRu?.[0];
              return (
                <article key={offer.id} className="rounded-2xl border border-[#E6EAF2] bg-white p-5 shadow-[0_8px_20px_rgba(11,18,32,0.06)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F6F8FC] font-semibold">{offer.logoText}</div><div><p className="font-semibold">{offer.name}</p><p className="text-xs text-[#4B5565]">{rate}</p></div></div>
                    {badge ? <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">{badge}</span> : null}
                  </div>
                  <div className="mt-3 space-y-1 text-sm"><p><b>{t.offers.maxAmount}</b> {offer.maxAmountKzt.toLocaleString("ru-RU")} ₸</p><p><b>{t.offers.term}</b> {offer.minTermDays}–{offer.maxTermDays} {t.offers.days}</p>{offer.gesvMax ? <p className="text-xs text-[#4B5565]">{t.offers.gesv} {offer.gesvMax}%</p> : null}</div>
                  <ul className="my-3 list-disc space-y-1 pl-5 text-sm text-[#4B5565]">{features.slice(0,3).map((f) => <li key={f}>{f}</li>)}</ul>
                  <Link href={offer.goPath} target="_blank" rel="noopener noreferrer" onClick={() => track("offer_click", { offerId: offer.id, position: idx + 1, locale })} className="flex h-12 items-center justify-center rounded-xl bg-[#1F4BFF] font-semibold text-white">{t.cta.offer}</Link>
                </article>
              );
            })}
          </div>
          {visible < sorted.length ? <button onClick={() => { setVisible((v) => v + 3); track("show_more_click", { currentCount: visible }); }} className="mt-5 rounded-xl border border-[#E6EAF2] bg-white px-4 py-2">{t.cta.showMore}</button> : null}
        </section>

        <section className="rounded-2xl bg-white p-6">
          <h3 className="text-xl font-semibold">{t.trust.title}</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{t.trust.items.map((x) => <div key={x} className="rounded-xl border border-[#E6EAF2] p-3 text-sm">{x}</div>)}</div>
        </section>

        <section id="how" className="rounded-2xl bg-white p-6">
          <h3 className="text-xl font-semibold">{t.how.title}</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">{t.how.steps.map((s) => <div key={s.title} className="rounded-xl border border-[#E6EAF2] p-4"><h4 className="font-semibold">{s.title}</h4><p className="mt-1 text-sm text-[#4B5565]">{s.text}</p></div>)}</div>
        </section>

        <section id="faq" className="rounded-2xl bg-white p-6">
          <h3 className="text-xl font-semibold">{t.faq.title}</h3>
          <div className="mt-4 space-y-2">{t.faq.items.map((item, idx) => <details key={item.q} className="rounded-xl border border-[#E6EAF2] p-4" onToggle={(e) => track("faq_toggle", { itemId: idx, open: (e.target as HTMLDetailsElement).open })}><summary className="cursor-pointer font-medium">{item.q}</summary><p className="mt-2 text-sm text-[#4B5565]">{item.a}</p></details>)}</div>
        </section>
      </main>

      <button className="fixed bottom-3 left-3 right-3 z-40 h-12 rounded-xl bg-[#1F4BFF] font-semibold text-white md:hidden" onClick={() => { track("sticky_cta_click"); onSubmit(); }}>{t.cta.sticky}</button>

      <footer className="border-t border-[#E6EAF2] bg-white pb-20 md:pb-8">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-6 text-sm text-[#4B5565]"><p>{t.footer.d1}</p><p>{t.footer.d2}</p><p>{t.footer.privacy} · {t.footer.terms}</p><p>{t.footer.contact}</p></div>
      </footer>
    </div>
  );
}
