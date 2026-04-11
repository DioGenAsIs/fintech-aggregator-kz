import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { AnalyticsRouteTracker } from "@/components/analytics/AnalyticsRouteTracker";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

const GOOGLE_SITE_VERIFICATION = "y9EdwPcxbsZKW6XOhUYAS2aNgDl-bbBO8fxKkE-xMPg";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LoanMarket KZ — CPA loan showcase",
  description:
    "Быстрый двуязычный подбор онлайн-займов в Казахстане с переходом на сайт кредитора.",
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <Suspense fallback={null}><AnalyticsRouteTracker /></Suspense>
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
