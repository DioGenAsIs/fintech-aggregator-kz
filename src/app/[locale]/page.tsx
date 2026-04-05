import { notFound } from "next/navigation";
import { MarketplacePage } from "@/components/marketplace/MarketplacePage";
import { dictionaries, locales } from "@/i18n/dictionaries";
import { Locale } from "@/data/offers";

type Props = {
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocalizedPage({ params }: Props) {
  if (!locales.includes(params.locale as Locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  return <MarketplacePage locale={locale} dict={dictionaries[locale]} />;
}
