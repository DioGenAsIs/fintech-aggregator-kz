"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Offer = {
  id: number;
  name: string;
  brand: string;
  goPath: string;
  loanMinKzt: number;
  loanMaxKzt: number;
  termDays: string;
  speedHint: string;
  benefits: string[];
  cta: string;
};

type SortKey = "popular" | "amount" | "speed";

const speedRank: Record<string, number> = {
  "1–5 мин": 1,
  "карта ~5 мин": 2,
  "от 5 мин": 3,
  "~7 мин": 4,
  "до ~15 мин": 5,
  "решение за несколько минут": 6,
};

const featuredBadges = ["Лучший выбор", "Быстрое решение", "Популярный вариант"];

const formatKzt = (value: number) =>
  `${new Intl.NumberFormat("ru-RU").format(value)} ₸`;

export function OffersSection({ offers }: { offers: Offer[] }) {
  const [sortBy, setSortBy] = useState<SortKey>("popular");
  const [visibleCount, setVisibleCount] = useState(5);

  const sortedOffers = useMemo(() => {
    const draft = [...offers];

    if (sortBy === "amount") {
      draft.sort((a, b) => b.loanMaxKzt - a.loanMaxKzt);
    }

    if (sortBy === "speed") {
      draft.sort(
        (a, b) => (speedRank[a.speedHint] ?? 99) - (speedRank[b.speedHint] ?? 99),
      );
    }

    return draft;
  }, [offers, sortBy]);

  const visibleOffers = sortedOffers.slice(0, visibleCount);

  return (
    <section id="offers" className="scroll-mt-24">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Лучшие предложения
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Сравните суммы, сроки и скорость рассмотрения перед переходом на
            сайт кредитора.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-1">
          {[
            ["popular", "По популярности"],
            ["amount", "По сумме"],
            ["speed", "По скорости"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setSortBy(value as SortKey)}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                sortBy === value
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleOffers.map((offer, index) => (
          <article
            key={offer.id}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-700">
                  {offer.brand.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-slate-500">Оффер #{offer.id}</p>
                  <h3 className="text-base font-semibold text-slate-900">
                    {offer.brand}
                  </h3>
                </div>
              </div>

              {index < 3 && (
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                  {featuredBadges[index]}
                </span>
              )}
            </div>

            <div className="space-y-2 text-sm text-slate-700">
              <p>
                <span className="font-medium text-slate-900">Сумма:</span> от{" "}
                {formatKzt(offer.loanMinKzt)} до {formatKzt(offer.loanMaxKzt)}
              </p>
              <p>
                <span className="font-medium text-slate-900">Срок:</span>{" "}
                {offer.termDays}
              </p>
              <p>
                <span className="font-medium text-slate-900">Скорость:</span>{" "}
                {offer.speedHint}
              </p>
            </div>

            <ul className="my-4 flex flex-1 list-disc flex-col gap-1 pl-5 text-sm text-slate-600">
              {offer.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>

            <div className="space-y-2">
              <Button asChild className="w-full rounded-xl text-base font-semibold">
                <Link href={offer.goPath}>{offer.cta}</Link>
              </Button>
              <Link
                href={offer.goPath}
                className="block text-center text-sm text-slate-600 underline underline-offset-4 hover:text-slate-900"
              >
                Подробнее
              </Link>
            </div>
          </article>
        ))}
      </div>

      {visibleCount < sortedOffers.length && (
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => setVisibleCount((prev) => prev + 3)}
          >
            Показать ещё
          </Button>
        </div>
      )}
    </section>
  );
}
