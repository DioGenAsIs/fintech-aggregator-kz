import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import localFont from "next/font/local";
import "../globals.css";
import { AnalyticsRouteTracker } from "@/components/analytics/AnalyticsRouteTracker";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { isLocale } from "@/lib/i18n";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

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
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <Suspense fallback={null}>
          <AnalyticsRouteTracker />
        </Suspense>
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </html>
  );
}
