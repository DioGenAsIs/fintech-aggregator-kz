# Tengimarket KZ SEO task (executive summary)

## Что реализовано
- Добавлены **10 SEO-страниц** (5 RU + 5 KK) как копии текущей посадочной логики с индивидуальными SEO-блоками.
- Приоритетные URL:
  1. `/ru/zaim-online`
  2. `/ru/zaim-na-kartu`
  3. `/kk/mikroqaryz-online`
- Источники спроса зафиксированы как референсы: **Keyword Planner / Wordstat / GSC**, объёмы трактуются как оценочные диапазоны.

## Параметры
- Гео: **KZ**
- Языки: **/ru** и **/kk**
- Интенты: преимущественно **T** (transactional), частично **C/T**

## App Router paths

Маршруты генерируются динамически в `src/app/[locale]/[slug]/page.tsx` через `generateStaticParams()` на основе `landingPageConfigs`.

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

## Контентная матрица (по каждой фразе)

Для каждой из 10 фраз в `src/lib/landingConfigs.ts` заданы:
- `title`
- `description`
- `h1`
- `seoIntro`
- `seoBody` (brief 150–300 слов)
- `faqOverrides` (4 вопроса и 4 ответа)

### RU фразы
1. займ онлайн → `zaim-online`
2. займ на карту → `zaim-na-kartu`
3. микрозайм онлайн → `mikrozaim-online`
4. микрозайм без отказа → `mikrozaim-bez-otkaza`
5. микрозайм срочно → `mikrozaim-srochno`

### KK фразы
1. микроқарыз онлайн → `mikroqaryz-online`
2. картаға онлайн микрокредит → `karta-mikrokredit`
3. онлайн несие → `onlain-nesie`
4. жедел микроқарыз → `zhedel-mikroqaryz`
5. жалақыға дейін қарыз → `zhalakyga-deiin-karyz`

## Sitemap / robots
- `src/app/sitemap.xml/route.ts`
  - В sitemap включены `/`, `/ru`, `/kk` и все 10 SEO-страниц.
  - Для приоритетных страниц (`zaim-online`, `zaim-na-kartu`, `mikroqaryz-online`) выставлен `priority=0.95`.
- `src/app/robots.ts`
  - Указан sitemap: `/sitemap.xml`
  - Разрешены индексируемые языковые разделы
  - Запрещён трекинговый маршрут `/go/`
- `middleware.ts`
  - Добавлены исключения для `robots.txt` и `sitemap.xml`, чтобы не ломать SEO-системные маршруты редиректом локали.

## Mermaid (архитектура генерации)

```mermaid
flowchart TD
    A[Keyword table RU/KK] --> B[landingPageConfigs]
    B --> C[generateStaticParams()]
    C --> D[/[locale]/[slug] pages]
    B --> E[generateMetadata title/description]
    B --> F[LandingPage h1/intro/brief/faq]
    B --> G[sitemap.xml priorities]
    H[middleware locale redirect] --> I[Skip robots/sitemap routes]
```
