import Link from "next/link";
import offers from "@/data/offers.kz.json";
import { OffersSection } from "@/components/kz/OffersSection";
import { Button } from "@/components/ui/button";
import { Clock3, FileCheck2, Landmark, ShieldCheck, Smartphone } from "lucide-react";

const trustBadges = [
  "Актуальные предложения",
  "Онлайн-заявка",
  "Для клиентов 18+",
  "Решение у кредитора",
];

const faqItems = [
  {
    question: "Как подать заявку?",
    answer:
      "Выберите оффер, перейдите на сайт кредитора по кнопке и заполните анкету онлайн.",
  },
  {
    question: "Это бесплатно?",
    answer:
      "Да, использование витрины бесплатно. Мы показываем предложения и ссылки на партнеров.",
  },
  {
    question: "Кто принимает решение?",
    answer:
      "Итоговое решение по заявке принимает кредитная организация после проверки данных.",
  },
  {
    question: "Какие требования к заемщику?",
    answer:
      "Обычно требуется возраст 18+ и действующий телефон. Точные условия зависят от кредитора.",
  },
  {
    question: "Нужна ли справка о доходах?",
    answer:
      "У разных кредиторов требования отличаются. Уточняйте список документов на стороне МФО.",
  },
  {
    question: "Как быстро приходит ответ?",
    answer:
      "По многим офферам ответ приходит в течение нескольких минут, но срок зависит от кредитора.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="text-lg font-bold tracking-tight">
            LoanMarket KZ
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <a href="#offers" className="hover:text-slate-900">
              Займы
            </a>
            <a href="#how-it-works" className="hover:text-slate-900">
              Как это работает
            </a>
            <a href="#faq" className="hover:text-slate-900">
              FAQ
            </a>
          </nav>
          <Button asChild className="rounded-xl">
            <a href="#offers">Подобрать займ</a>
          </Button>
        </div>
      </header>

      <main id="top" className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-8 sm:py-10">
        <section className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              Займы онлайн в Казахстане — сравните предложения и подайте заявку
            </h1>
            <p className="mt-4 text-slate-600">
              Подбор актуальных предложений МФО. Сравните условия, суммы и
              сроки. Решение зависит от кредитора.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-xl px-6 py-6 text-base font-semibold">
                <a href="#offers">Смотреть предложения</a>
              </Button>
              <Button asChild variant="outline" className="rounded-xl px-6 py-6 text-base">
                <a href="#how-it-works">Как это работает</a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {offers.slice(0, 3).map((offer) => (
              <div
                key={offer.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">{offer.name}</p>
                    <h3 className="text-base font-semibold text-slate-900">
                      до {new Intl.NumberFormat("ru-RU").format(offer.loanMaxKzt)} ₸
                    </h3>
                  </div>
                  <p className="text-xs font-medium text-slate-600">{offer.termDays}</p>
                </div>
                <p className="mt-1 text-sm text-slate-600">{offer.speedHint}</p>
                <Button asChild className="mt-3 w-full rounded-lg" size="sm">
                  <Link href={offer.goPath}>Подать заявку</Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        <OffersSection offers={offers} />

        <section id="how-it-works" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-2xl font-bold">Как это работает</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { icon: FileCheck2, title: "Выберите предложение", text: "Сравните условия и откройте подходящий оффер." },
              { icon: Landmark, title: "Перейдите на сайт кредитора", text: "Мы перенаправим вас на официальную страницу заявки." },
              { icon: Clock3, title: "Заполните заявку онлайн", text: "Оставьте данные и дождитесь решения кредитной организации." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <Icon className="h-6 w-6 text-slate-700" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-2xl font-bold">Почему через нас удобно</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, text: "Сравнение предложений в одном месте" },
              { icon: Clock3, text: "Быстрый переход к заявке" },
              { icon: FileCheck2, text: "Актуальные условия" },
              { icon: Smartphone, text: "Удобно с телефона" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <Icon className="mb-2 h-5 w-5" />
                {text}
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="mt-4 space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <summary className="cursor-pointer list-none pr-6 font-medium text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-8 text-sm text-slate-600">
          <p>
            LoanMarket KZ — информационная витрина, не является кредитором и не
            выдает займы. 18+.
          </p>
          <p>
            Решение по заявке, условия, ставки и сроки принимает кредитная
            организация. Перед оформлением изучайте договор и политику
            конфиденциальности кредитора.
          </p>
          <p>
            Комплаенс: размещаем партнерские предложения для пользователей
            Казахстана. Контакт: support@loanmarket.kz.
          </p>
          <p className="text-xs text-slate-500">Политика конфиденциальности (placeholder)</p>
        </div>
      </footer>
    </div>
  );
}
