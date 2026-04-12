# Tengimarket KZ SEO task (implemented)

## Приоритетные страницы
1. `/ru/zaim-online`
2. `/ru/zaim-na-kartu`
3. `/kk/mikroqaryz-online`

## App Router paths

Маршруты генерируются в `src/app/[locale]/[slug]/page.tsx` через `generateStaticParams` на основе `landingPageConfigs`.

### RU
- `/ru/zaim-online`
- `/ru/zaim-na-kartu`
- `/ru/mikrozaim-online`
- `/ru/mikrozaim-bez-otkaza`
- `/ru/mikrozaim-srochno`

### KK
- `/kk/mikroqaryz-online`
- `/kk/karta-mikrokredit`
- `/kk/onlain-nesie`
- `/kk/zhedel-mikroqaryz`
- `/kk/zhalakyga-deiin-karyz`

## Sitemap / robots
- Добавлен `src/app/sitemap.ts` с приоритетом `0.95` для 3 приоритетных страниц.
- Добавлен `src/app/robots.ts` с `sitemap` и запретом на `/go/`.
- В `middleware.ts` добавлены исключения для `/robots.txt` и `/sitemap.xml`.

## Mermaid (логика генерации SEO-страниц)

```mermaid
flowchart TD
    A[Keyword table RU/KK] --> B[landingPageConfigs]
    B --> C[generateStaticParams]
    C --> D[/[locale]/[slug] routes]
    B --> E[generateMetadata title/description]
    B --> F[LandingPage h1/intro/brief/faq]
    B --> G[sitemap.xml priorities]
    H[middleware] --> I[Skip robots/sitemap redirects]
```

## Контент по фразам

Для каждой фразы в `landingPageConfigs` заданы:
- `title`
- `description`
- `h1`
- `seoIntro`
- `seoBody` (brief ~150–300 слов)
- `faqOverrides` (4 вопроса/ответа)

Источник данных: `src/lib/landingConfigs.ts`.
