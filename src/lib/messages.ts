import kk from "@/messages/kk.json";
import ru from "@/messages/ru.json";
import type { Locale } from "@/lib/i18n";

export type Messages = typeof kk;

export function getMessages(locale: Locale): Messages {
  return locale === "kk" ? kk : ru;
}
