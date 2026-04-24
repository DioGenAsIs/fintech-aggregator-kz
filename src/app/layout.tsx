import type { Metadata } from "next";

const GOOGLE_SITE_VERIFICATION = "y9EdwPcxbsZKW6XOhUYAS2aNgDl-bbBO8fxKkE-xMPg";

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
  return children;
}
