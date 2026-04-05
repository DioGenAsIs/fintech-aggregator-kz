import { isLocale } from "@/lib/i18n";

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const lang = isLocale(params.locale) ? params.locale : "kk";

  return <section lang={lang}>{children}</section>;
}
