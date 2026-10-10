import LeadForm from './lead-form';
import { Wordmark } from './decor';
import SiteFooter from './site-footer';
import { COMPANY } from './company';
import Motion from './motion';
import Gifts2D from './gifts-2d';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const SCENARIOS = [
  { id: 'corporate', tone: 'pine', eyebrow: 'Для компаний', title: 'Сотрудникам и партнёрам', text: 'Состав под повод и бюджет, ваш логотип на упаковке.', cta: 'Собрать набор' },
  { id: 'kids', tone: 'berry', eyebrow: 'Для профсоюзов', title: 'Детям сотрудников', text: 'Сладкие подарки для профсоюзов — состав под возраст.', cta: 'Собрать подарки' },
] as const;

// Stamp outline carries the state: dashed = the visitor's move, solid = what we take on.
const STEPS = [
  { title: 'Заявка', text: 'Количество, бюджет и дата.', stamp: 'Ваш ход', yours: true },
  { title: 'Состав и цена', text: 'Подбираем и согласуем с вами.', stamp: 'Согласуем' },
  { title: 'Сборка', text: 'Закупаем и собираем сами.', stamp: 'Соберём' },
  { title: 'Доставка', text: 'По Беларуси к вашей дате.', stamp: 'Отгрузим' },
];

const PRICE = [
  ['Конфеты и наполнение', 'под бюджет'],
  ['Упаковка', 'под повод'],
  ['Логотип', 'по желанию'],
  ['Сборка', 'своими силами'],
  ['Доставка', 'бесплатно по Беларуси'],
] as const;
const PAPERS = [
  ['Договор', 'есть'],
  ['Оплата', 'безналичная'],
  ['Документы', 'закрывающие'],
  ['Отгрузка', 'к вашей дате'],
] as const;

// Round seal that spins; the text runs along a circle.
function Seal() {
  return (
    <svg className="seal" viewBox="0 0 200 200" aria-hidden="true">
      <defs><path id="seal-path" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1 -156 0" /></defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text><textPath href="#seal-path">ДАРИМ СМЫСЛ · СОБИРАЕМ ПРАЗДНИК · </textPath></text>
      <path d="M100 76l6 18h19l-15 11 6 18-16-11-16 11 6-18-15-11h19z" fill="currentColor" />
    </svg>
  );
}

// Also published as FAQPage structured data: keep answers factual (owner-confirmed, 2026-10-10).
const FAQ = [
  { q: 'Какой минимальный заказ?', a: 'От 1 набора. Собираем и для небольшой команды, и для крупного предприятия.' },
  { q: 'До какого числа можно заказать?', a: `Заказы на Новый год принимаем до ${COMPANY.orderDeadline}. Чем раньше заявка, тем шире выбор состава и упаковки.` },
  { q: 'Соберёте под наш бюджет?', a: 'Да. Назовите бюджет на один набор и количество — пришлём коммерческое предложение с подробным составом и упаковкой.' },
  { q: 'Что можно положить в набор?', a: 'Сладости, а также любые продукты и напитки, кроме алкоголя. Упаковка — от картонной коробки до жестяной банки и мягкой игрушки.' },
  { q: 'Как нанести логотип?', a: 'Наносим на упаковку. Вариант и макет согласуем до сборки.' },
  { q: 'Как оплатить?', a: 'Только безналичный расчёт по договору, с закрывающими документами.' },
  { q: 'Сколько стоит доставка?', a: 'Доставка по Минску и по всей Беларуси бесплатная.' },
  { q: 'Сколько стоит набор?', a: 'Считаем после заявки: состав, упаковка, логотип, сборка — каждой строкой в коммерческом предложении.' },
];

const NAV = [
  ['#scenarios', 'Наборы'],
  ['#steps', 'Как работаем'],
  ['#terms', 'Условия'],
  ['#faq', 'Вопросы'],
] as const;

// Floating decor around the hero: our stickers drifting with the cursor at different depths.
const FLOATERS = [
  { src: 'candy-cane', x: 40, y: 84, s: 70, r: -18, d: 0.6 },
  { src: 'snowflake', x: 46, y: 10, s: 46, r: 0, d: 1.2 },
  { src: 'tangerine', x: 55, y: 7, s: 52, r: 14, d: 0.9 },
  { src: 'bell', x: 91, y: 8, s: 58, r: 12, d: 1.5 },
  { src: 'mitten', x: 94, y: 68, s: 62, r: -18, d: 0.7 },
  { src: 'snowflake', x: 3, y: 74, s: 40, r: 20, d: 1.3 },
] as const;

function Floater({ src, x, y, s, r, d }: (typeof FLOATERS)[number]) {
  return (
    <img className="floater" data-depth={d} src={`${base}/kit/${src}.webp`} alt="" aria-hidden="true"
      style={{ left: `${x}%`, top: `${y}%`, width: s, '--r': `${r}deg` } as React.CSSProperties} />
  );
}

// Giant outlined words that slide sideways as the page scrolls.
function Marquee({ words, dir = 1 }: { words: string; dir?: 1 | -1 }) {
  return (
    <div className="marquee" data-dir={dir} aria-hidden="true">
      <span>{words} · {words} · {words} · </span>
    </div>
  );
}

// Structured data for search engines: only facts from company.ts.
// Structured data for search engines: the company, the site and the FAQ shown on the page.
const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${COMPANY.site}/#org`,
      name: COMPANY.brand,
      legalName: COMPANY.name,
      url: COMPANY.site,
      logo: `${COMPANY.site}/logo.svg`,
      telephone: COMPANY.phone,
      taxID: COMPANY.unp,
      address: { '@type': 'PostalAddress', streetAddress: 'ул. Якубова, д. 10', addressLocality: 'Минск', addressCountry: 'BY' },
      areaServed: { '@type': 'Country', name: 'Беларусь' },
      sameAs: [COMPANY.instagramUrl],
      description: 'Новогодние подарочные наборы оптом для компаний и профсоюзов: от 1 набора, логотип на упаковке, бесплатная доставка по Беларуси.',
    },
    { '@type': 'WebSite', '@id': `${COMPANY.site}/#site`, url: COMPANY.site, name: COMPANY.brand, inLanguage: 'ru-BY', publisher: { '@id': `${COMPANY.site}/#org` } },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD).replace(/</g, '\\u003c') }} />
      <div className="wipe" aria-hidden="true" />

      <header className="nav">
        <a href="#top" className="nav-logo" aria-label={`${COMPANY.brand} — наверх`}><Wordmark tone="dark" /></a>
        <nav className="nav-links" aria-label="Разделы">
          {NAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="nav-phone" href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a>
        <a className="btn btn-berry nav-cta" href="#contact">Заявка</a>
        <span className="nav-progress" aria-hidden="true" />
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="floaters">{FLOATERS.map((f, i) => <Floater key={i} {...f} />)}</div>
          <div className="wrap hero-in">
            <div className="hero-copy">
              <h1 id="hero-title" className="hero-title">
                {/* Search engines read the h1: the plain-words offer goes first, the slogan follows. */}
                <span className="h1-kicker">Новогодние подарочные наборы оптом</span>
                <span className="l1 split">Дарим смысл.</span>
                <span className="h1-pill" aria-hidden="true">
                  <img src={`${base}/kit/gift-box.webp`} alt="" />
                </span>
                <span className="l2 split">Собираем праздник.</span>
              </h1>
              <p className="hero-lead">
                Подарочные наборы оптом для компаний и профсоюзов — с вашим логотипом и доставкой по Беларуси.
              </p>
              <div className="hero-actions">
                <a className="btn btn-berry" href="#contact">Рассчитать набор</a>
                <a className="link-arrow" href="#steps">Как мы работаем</a>
              </div>
            </div>

            <div className="parcel" aria-hidden="true">
              <div className="parcel-box">
                <div className="parcel-window">
                  <img className="win-st" src={`${base}/kit/fir-tree.webp`} alt="" data-depth="0.5" style={{ left: '8%', bottom: '4%', height: '86%' }} />
                  <img className="win-st" src={`${base}/kit/gingerbread.webp`} alt="" data-depth="1.1" style={{ left: '56%', bottom: '6%', height: '52%' }} />
                  <img className="win-st" src={`${base}/kit/cocoa-mug.webp`} alt="" data-depth="1.4" style={{ left: '40%', bottom: '2%', height: '34%' }} />
                  <img className="win-st" src={`${base}/kit/snowflake.webp`} alt="" data-depth="0.3" style={{ left: '70%', top: '8%', height: '20%' }} />
                </div>
                <span className="parcel-flap" />
                <span className="parcel-ribbon parcel-ribbon-top" />
                <span className="parcel-ribbon parcel-ribbon-v" />
                <span className="parcel-ribbon parcel-ribbon-h" />
                <svg className="parcel-bow" viewBox="0 0 120 70">
                  <path d="M60 35C44 10 14 4 10 22s26 22 50 13zM60 35c16-25 46-31 50-13s-26 22-50 13z" fill="#c8423a" stroke="#a8352e" strokeWidth="3" />
                  <path d="M56 38l-18 30h12l10-18 10 18h12L64 38z" fill="#a8352e" />
                  <rect x="52" y="27" width="16" height="16" rx="4" fill="#a8352e" />
                </svg>
              </div>
              <div className="parcel-tag">
                <span>Получатель</span>
                <strong>ваша команда</strong>
                <span>Отправитель</span>
                <strong>{COMPANY.brand}</strong>
              </div>
              <span className="stamp stamp-hero">Соберём<br />под вас</span>
            </div>
          </div>
        </section>

        <section className="scenarios" id="scenarios" aria-labelledby="scenarios-title">
          <div className="wrap">
            <h2 id="scenarios-title" className="title fill">Какие подарки собираем</h2>
            <div className="scenario-grid">
              {SCENARIOS.map(s => (
                <article key={s.id} className={`gift-card gift-${s.tone}`}>
                  <Gifts2D scene={s.id} />
                  <div className="gift-text">
                    <span className="eyebrow">{s.eyebrow}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <a className="link-arrow" href={`?type=${s.id}#contact`}>{s.cta}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Marquee words="Подарки с логотипом" />

        <section className="reel" id="steps" aria-labelledby="steps-title">
          <div className="reel-pin">
            <div className="wrap reel-head">
              <h2 id="steps-title" className="title fill">Как работаем</h2>
              <span className="reel-bar" aria-hidden="true"><i /></span>
            </div>
            <ol className="reel-track">
              {STEPS.map(({ title, text, stamp, yours }, i) => (
                <li key={title} className="reel-card">
                  <span className="reel-n">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className={`stamp${yours ? ' stamp-yours' : ''}`} aria-hidden="true">{stamp}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="terms-sec" id="terms" aria-labelledby="terms-title">
          <div className="wrap">
            <h2 id="terms-title" className="title fill">Условия</h2>
            <div className="terms">
              <div className="terms-col" data-rise>
                <h3>Из чего цена</h3>
                <ul className="pricelist">{PRICE.map(([k, v]) => <li key={k}><span>{k}</span><i aria-hidden="true" /><em>{v}</em></li>)}</ul>
                <p className="terms-note">
                  {COMPANY.priceFrom ? `Набор ${COMPANY.priceFrom}. ` : ''}
                  {COMPANY.minOrder ? `Партия ${COMPANY.minOrder}. ` : ''}
                  Точный расчёт — после заявки.
                </p>
              </div>
              <div className="terms-col" data-rise>
                <h3>Для бухгалтерии</h3>
                <ul className="pricelist">{PAPERS.map(([k, v]) => <li key={k}><span>{k}</span><i aria-hidden="true" /><em>{v}</em></li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <Marquee words="Собираем праздник" dir={-1} />

        <section className="faq-sec" id="faq" aria-labelledby="faq-title">
          <div className="wrap faq-in">
            <div className="faq-side">
              <h2 id="faq-title" className="title fill">Вопросы</h2>
              {/* Fills the empty column: a direct line for questions the list does not answer. */}
              <aside className="ask-card" aria-label="Задать вопрос" data-rise>
                <img className="ask-phone" src={`${base}/kit/phone.webp`} alt="" aria-hidden="true" />
                <h3>Не нашли ответ?</h3>
                <p>Спросите напрямую — подскажем состав, упаковку и сроки под вашу задачу.</p>
                <ul className="ask-facts">
                  <li>от 1 набора</li>
                  <li>заказы до {COMPANY.orderDeadline}</li>
                  <li>доставка по РБ бесплатно</li>
                </ul>
                <div className="ask-actions">
                  <a className="btn btn-berry" href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a>
                  <a className="btn btn-line" href={COMPANY.instagramUrl} target="_blank" rel="noopener noreferrer">Написать в Instagram</a>
                </div>
              </aside>
            </div>
            <div className="faq">
              {FAQ.map(item => (
                <details key={item.q} data-rise>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap contact-in">
            <div className="contact-intro" data-rise>
              <Seal />
              <h2 id="contact-title" className="title">Заявка</h2>
              <p>Ответим с составом, ценой и сроками.</p>
              <p><a href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a></p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
      <SiteFooter home />
    </>
  );
}
