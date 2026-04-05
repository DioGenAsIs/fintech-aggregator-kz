export type Locale = "kk" | "ru";

export type Offer = {
  id: number;
  name: string;
  logo: string;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  rateText: Record<Locale, string>;
  features: Record<Locale, string[]>;
  ctaLink: string;
  priority: number;
};

export const offers: Offer[] = [
  {
    id: 2291,
    name: "Zaimer KZ",
    logo: "/logos/zaimer.svg",
    maxAmount: 400000,
    minTerm: 5,
    maxTerm: 30,
    rateText: {
      kk: "Жаңа клиенттерге 0%-дан",
      ru: "0% для новых клиентов",
    },
    features: {
      kk: ["Жылдам шешім", "Анықтама қажет емес", "Онлайн 24/7"],
      ru: ["Быстрое решение", "Без справок", "Онлайн 24/7"],
    },
    ctaLink: "https://leadgid.example.com/click/2291",
    priority: 100,
  },
  {
    id: 4905,
    name: "GoMoney KZ",
    logo: "/logos/gomoney.svg",
    maxAmount: 200000,
    minTerm: 7,
    maxTerm: 30,
    rateText: {
      kk: "Қарау ~15 минутқа дейін",
      ru: "Рассмотрение до ~15 минут",
    },
    features: {
      kk: ["Телефоннан өтінім", "Тез анкета", "18+"],
      ru: ["Заявка с телефона", "Быстрая анкета", "18+"],
    },
    ctaLink: "https://leadgid.example.com/click/4905",
    priority: 90,
  },
  {
    id: 6288,
    name: "Creditbar KZ",
    logo: "/logos/creditbar.svg",
    maxAmount: 400000,
    minTerm: 5,
    maxTerm: 45,
    rateText: {
      kk: "Шешім бірнеше минутта",
      ru: "Решение за несколько минут",
    },
    features: {
      kk: ["Шарттар өзекті", "Жылдам өту", "Артық қадам жоқ"],
      ru: ["Актуальные условия", "Быстрый переход", "Без лишних шагов"],
    },
    ctaLink: "https://leadgid.example.com/click/6288",
    priority: 85,
  },
  {
    id: 6322,
    name: "Tengebai",
    logo: "/logos/tengebai.svg",
    maxAmount: 300000,
    minTerm: 7,
    maxTerm: 30,
    rateText: {
      kk: "Қарау 1–5 минут",
      ru: "Рассмотрение 1–5 минут",
    },
    features: {
      kk: ["Қысқа анкета", "Ұялыға ыңғайлы", "Қарапайым өту"],
      ru: ["Короткая анкета", "Удобно с телефона", "Простой переход"],
    },
    ctaLink: "https://leadgid.example.com/click/6322",
    priority: 82,
  },
  {
    id: 6225,
    name: "OneCredit",
    logo: "/logos/onecredit.svg",
    maxAmount: 190000,
    minTerm: 10,
    maxTerm: 30,
    rateText: {
      kk: "Шарттар жеке есептеледі",
      ru: "Условия рассчитываются индивидуально",
    },
    features: {
      kk: ["Түсінікті шарттар", "Онлайн тексеру", "18+"],
      ru: ["Понятные условия", "Онлайн-проверка", "18+"],
    },
    ctaLink: "https://leadgid.example.com/click/6225",
    priority: 75,
  },
  {
    id: 3321,
    name: "CreditPlus KZ",
    logo: "/logos/creditplus.svg",
    maxAmount: 280000,
    minTerm: 7,
    maxTerm: 30,
    rateText: {
      kk: "Шешім ~7 минут",
      ru: "Решение ~7 минут",
    },
    features: {
      kk: ["Бір жерде салыстыру", "Тез өтінім", "Тегін сервис"],
      ru: ["Сравнение в одном месте", "Быстрая заявка", "Бесплатный сервис"],
    },
    ctaLink: "https://leadgid.example.com/click/3321",
    priority: 70,
  },
];

export const offersMap = Object.fromEntries(
  offers.map((offer) => [String(offer.id), offer.ctaLink]),
);
