import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { dictionaries, locales } from "@/i18n/dictionaries";
import { Locale } from "@/data/offers";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!locales.includes(params.locale as Locale)) {
    return {};
  }

  const locale = params.locale as Locale;

  return {
    title: dictionaries[locale].metaTitle,
    description: dictionaries[locale].metaDescription,
    alternates: {
      languages: {
        kk: "/kk",
        ru: "/ru",
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
  if (!locales.includes(params.locale as Locale)) {
    redirect("/kk");
  }

  return <>{children}</>;
}
