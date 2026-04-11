import type { Metadata } from "next";
import offers from "@/data/offers.json";
import { LandingPage } from "@/components/landing/LandingPage";
import { isLocale, type Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";
import { getLandingConfig, landingPageConfigs } from "@/lib/landingConfigs";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return landingPageConfigs.map((config) => ({
    locale: config.locale,
    slug: config.slug,
  }));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  if (!isLocale(params.locale)) {
    return {};
  }

  const config = getLandingConfig(params.locale as Locale, params.slug);

  if (!config) {
    return {};
  }

  return {
    title: config.title,
    description: config.description,
  };
}

export default function SeoLandingPage({ params }: { params: { locale: string; slug: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;
  const messages = getMessages(locale);
  const seoConfig = getLandingConfig(locale, params.slug);

  if (!seoConfig) {
    notFound();
  }

  return <LandingPage locale={locale} messages={messages} offers={offers} seoConfig={seoConfig} />;
}
