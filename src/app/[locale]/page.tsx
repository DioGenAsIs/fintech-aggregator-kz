import { notFound } from "next/navigation";
import offers from "@/data/offers.json";
import { getMessages } from "@/lib/messages";
import { LandingPage } from "@/components/landing/LandingPage";

const supportedLocales = ["kk", "ru"] as const;

type Locale = (typeof supportedLocales)[number];

export default function LocalePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;

  if (!supportedLocales.includes(locale as Locale)) {
    notFound();
  }

  const messages = getMessages(locale as Locale);

  return (
    <LandingPage
      locale={locale as Locale}
      messages={messages}
      offers={offers}
    />
  );
}
