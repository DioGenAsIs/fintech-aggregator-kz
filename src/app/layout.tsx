import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LoanMarket KZ — CPA loan showcase",
  description:
    "Быстрый двуязычный подбор онлайн-займов в Казахстане с переходом на сайт кредитора.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
