import { Locale } from "@/data/offers";

export const locales: Locale[] = ["kk", "ru"];

export type Dictionary = {
  metaTitle: string;
  metaDescription: string;
  brand: string;
  nav: { offers: string; howItWorks: string; faq: string };
  hero: {
    title: string;
    subtitle: string;
    amountLabel: string;
    termLabel: string;
    amountOptions: string[];
    termOptions: string[];
    cta: string;
  };
  offers: {
    title: string;
    personalizedPrefix: string;
    personalizedSuffix: string;
    showMore: string;
    maxAmount: string;
    term: string;
    days: string;
    openOffer: string;
    promoLabel: string;
  };
  howItWorks: { title: string; steps: string[] };
  benefits: { title: string; items: string[] };
  faq: { title: string; items: { q: string; a: string }[] };
  footer: { disclaimer: string; compliance: string; contact: string };
  lang: { kk: string; ru: string };
};

export const dictionaries: Record<Locale, Dictionary> = {
  kk: {
    metaTitle: "LoanMarket KZ — онлайн қарыз витринасы",
    metaDescription: "Сома мен мерзім бойынша МҚҰ ұсыныстарын тез салыстырыңыз.",
    brand: "LoanMarket KZ",
    nav: { offers: "Қарыздар", howItWorks: "Қалай жұмыс істейді", faq: "FAQ" },
    hero: {
      title: "Қазақстанда онлайн қарыз",
      subtitle: "Сома мен мерзімді таңдаңыз — сізге сай ұсыныстарды көрсетеміз",
      amountLabel: "Қарыз сомасы",
      termLabel: "Қарыз мерзімі",
      amountOptions: ["50 000 ₸ дейін", "50 000–100 000 ₸", "100 000–200 000 ₸", "200 000+ ₸"],
      termOptions: ["7 күнге дейін", "7–14 күн", "14–30 күн", "30+ күн"],
      cta: "Қарызды таңдау",
    },
    offers: {
      title: "Үздік ұсыныстар",
      personalizedPrefix: "Ұсыныстар",
      personalizedSuffix: "сомасына",
      showMore: "Тағы көрсету",
      maxAmount: "Дейін",
      term: "Мерзімі",
      days: "күн",
      openOffer: "Ақша алу",
      promoLabel: "Акция",
    },
    howItWorks: {
      title: "Қалай жұмыс істейді",
      steps: [
        "Сома мен мерзімді таңдаңыз",
        "Ұсыныстарды салыстырыңыз",
        "МҚҰ сайтына өтіп, өтінім беріңіз",
      ],
    },
    benefits: {
      title: "Неге бізбен ыңғайлы",
      items: [
        "Жылдам іріктеу",
        "Тексерілген ұсыныстар",
        "Артық сауалнама жоқ",
        "Пайдаланушыға тегін",
      ],
    },
    faq: {
      title: "Жиі сұрақтар",
      items: [
        { q: "Өтінімді қалай беремін?", a: "Ұсынысты таңдап, МҚҰ сайтына өтіп онлайн өтінім жібересіз." },
        { q: "Бұл тегін бе?", a: "Иә, сервис тегін. Біз тек ұсыныстарды салыстыруға көмектесеміз." },
        { q: "Қарыз алушыға қандай талаптар бар?", a: "Әдетте 18+, жеке куәлік және байланыс нөмірі қажет. Нақты талапты МҚҰ белгілейді." },
        { q: "Жауап қанша уақытта келеді?", a: "Көп ұсыныста бірнеше минутта, бірақ нақты уақытты кредитор анықтайды." },
      ],
    },
    footer: {
      disclaimer: "Біз кредитор емеспіз және қарыз бермейміз. Шешімді тек кредиттік ұйым қабылдайды. 18+.",
      compliance: "Сайт Қазақстан пайдаланушыларына арналған ақпараттық CPA-витрина.",
      contact: "Байланыс: support@loanmarket.kz",
    },
    lang: { kk: "Қазақша", ru: "Русский" },
  },
  ru: {
    metaTitle: "LoanMarket KZ — витрина онлайн-займов",
    metaDescription: "Быстрый подбор предложений МФО по сумме и сроку.",
    brand: "LoanMarket KZ",
    nav: { offers: "Займы", howItWorks: "Как это работает", faq: "FAQ" },
    hero: {
      title: "Займы онлайн в Казахстане",
      subtitle: "Выберите сумму и срок — покажем подходящие предложения",
      amountLabel: "Сумма займа",
      termLabel: "Срок займа",
      amountOptions: ["до 50 000 ₸", "50 000–100 000 ₸", "100 000–200 000 ₸", "200 000+ ₸"],
      termOptions: ["до 7 дней", "7–14 дней", "14–30 дней", "30+ дней"],
      cta: "Подобрать займ",
    },
    offers: {
      title: "Лучшие предложения",
      personalizedPrefix: "Предложения на сумму",
      personalizedSuffix: "",
      showMore: "Показать ещё",
      maxAmount: "До",
      term: "Срок",
      days: "дней",
      openOffer: "Получить деньги",
      promoLabel: "Промо",
    },
    howItWorks: {
      title: "Как это работает",
      steps: [
        "Выберите сумму и срок",
        "Сравните предложения",
        "Перейдите на сайт МФО и подайте заявку",
      ],
    },
    benefits: {
      title: "Почему через нас удобно",
      items: [
        "Быстрый подбор",
        "Проверенные предложения",
        "Без лишних анкет",
        "Бесплатно для пользователя",
      ],
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "Как подать заявку?", a: "Выберите предложение и перейдите на сайт МФО, где заполняется анкета." },
        { q: "Это бесплатно?", a: "Да, сервис бесплатный. Мы не берем плату за подбор." },
        { q: "Какие требования к заемщику?", a: "Обычно требуются 18+, документ и действующий номер телефона. Условия зависят от МФО." },
        { q: "Как быстро можно получить деньги?", a: "Во многих случаях ответ приходит быстро, но срок зависит от кредитора." },
      ],
    },
    footer: {
      disclaimer: "Мы не являемся кредитором и не выдаем займы. Решение принимает кредитная организация. 18+.",
      compliance: "Сайт является информационной CPA-витриной для пользователей Казахстана.",
      contact: "Контакты: support@loanmarket.kz",
    },
    lang: { kk: "Қазақша", ru: "Русский" },
  },
};
