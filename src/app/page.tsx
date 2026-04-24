import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import offers from "@/data/offers.json";
import { getMessages } from "@/lib/messages";
import { LandingPage } from "@/components/landing/LandingPage";
import { AnalyticsRouteTracker } from "@/components/analytics/AnalyticsRouteTracker";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  alternates: {
    canonical: "https://tengimarket.kz/kk",
    languages: {
      kk: "https://tengimarket.kz/kk",
      ru: "https://tengimarket.kz/ru",
    },
  },
};

export default function RootPage() {
  const messages = getMessages("kk");
  return (
    <html lang="kk">
      <body className={`${geistSans.variable} antialiased`}>
        <LandingPage locale="kk" messages={messages} offers={offers} />
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
