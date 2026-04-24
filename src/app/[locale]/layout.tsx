import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : "kk";
  return {
    alternates: {
      canonical: `https://tengimarket.kz/${locale}`,
      languages: {
        kk: "https://tengimarket.kz/kk",
        ru: "https://tengimarket.kz/ru",
      },
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const lang = isLocale(params.locale) ? params.locale : "kk";
  return <section lang={lang}>{children}</section>;
}
