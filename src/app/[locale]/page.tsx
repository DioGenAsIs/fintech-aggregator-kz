import offers from "@/data/offers.json";
import { getMessages } from "@/lib/messages";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";

export default function LocalePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const messages = getMessages(locale);

  return <LandingPage locale={locale} messages={messages} offers={offers} />;
}
