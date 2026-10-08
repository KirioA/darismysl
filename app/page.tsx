import FooterBackground from './footer-background';
import LeadForm from './lead-form';
import { Wordmark } from './decor';
import SiteFooter from './site-footer';
import { COMPANY } from './company';
import Motion from './motion';

const SCENARIOS = [
  {
    id: 'corporate',
    eyebrow: 'Для компаний',
    title: 'Сотрудникам и партнёрам',
    text: 'Состав под повод и бюджет, ваш логотип на упаковке.',
    cta: 'Собрать набор',
  },
  {
    id: 'kids',
    eyebrow: 'Для профсоюзов',
    title: 'Детям сотрудников',
    text: 'Сладкие подарки для профсоюзов — состав под возраст.',
    cta: 'Собрать подарки',
  },
] as const;

const STEPS = [
  { title: 'Заявка', text: 'Количество, бюджет и дата.' },
  { title: 'Состав и цена', text: 'Подбираем и согласуем с вами.' },
  { title: 'Сборка', text: 'Закупаем и собираем сами.' },
  { title: 'Доставка', text: 'По Беларуси к вашей дате.' },
];

const PRICE = ['Конфеты и наполнение', 'Упаковка', 'Логотип, если нужен', 'Сборка', 'Доставка'];
const PAPERS = ['Договор', 'Безналичная оплата', 'Закрывающие документы', 'Доставка по Беларуси'];

const FAQ = [
  { q: 'Соберёте под наш бюджет?', a: 'Да. Назовите бюджет на один набор и количество — предложим состав.' },
  { q: 'Как нанести логотип?', a: 'Наносим на упаковку. Вариант и макет согласуем до сборки.' },
  { q: 'Какие сроки?', a: 'Зависят от состава и объёма — назовём после заявки. Перед Новым годом лучше заказывать заранее.' },
  { q: 'Сколько стоит?', a: 'Считаем после заявки: состав, упаковка, логотип, сборка и доставка — каждой строкой.' },
];

const NAV = [
  ['#scenarios', 'Наборы'],
  ['#steps', 'Как работаем'],
  ['#terms', 'Условия'],
  ['#faq', 'Вопросы'],
] as const;

// Structured data for search engines: only facts from company.ts.
const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY.name,
  alternateName: COMPANY.brand,
  telephone: COMPANY.phone,
  taxID: COMPANY.unp,
  address: { '@type': 'PostalAddress', streetAddress: COMPANY.address, addressCountry: 'BY' },
  areaServed: 'BY',
};

export default function Home() {
  return (
    <>
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />

      <header className="nav">
        <a href="#top" className="nav-logo" aria-label={`${COMPANY.brand} — наверх`}><Wordmark tone="dark" /></a>
        <nav className="nav-links" aria-label="Разделы">
          {NAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="nav-phone" href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a>
        <a className="btn btn-berry nav-cta" href="#contact">Заявка</a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-in">
            <div className="hero-copy">
              <h1 id="hero-title" className="hero-title">
                <span className="split">Дарим смысл.</span>{' '}
                <span className="split l2">Собираем праздник.</span>
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
                <div className="parcel-window"><FooterBackground /></div>
                <span className="parcel-ribbon parcel-ribbon-top" />
                <span className="parcel-ribbon parcel-ribbon-v" />
                <span className="parcel-ribbon parcel-ribbon-h" />
                <svg className="parcel-bow" viewBox="0 0 120 70">
                  <path d="M60 35C44 10 14 4 10 22s26 22 50 13zM60 35c16-25 46-31 50-13s-26 22-50 13z" fill="#c8423a" stroke="#a8352e" strokeWidth="3" />
                  <path d="M56 38l-18 30h12l10-18 10 18h12L64 38z" fill="#a8352e" />
                  <rect x="52" y="27" width="16" height="16" rx="4" fill="#a8352e" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="scenarios" id="scenarios" aria-labelledby="scenarios-title">
          <div className="wrap">
            <h2 id="scenarios-title" className="title" data-rise>Какие подарки собираем</h2>
            <div className="scenario-grid">
              {SCENARIOS.map(s => (
                <article key={s.id} className="card" data-rise>
                  <span className="eyebrow">{s.eyebrow}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <a className="link-arrow" href={`?type=${s.id}#contact`}>{s.cta}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="steps-sec" id="steps" aria-labelledby="steps-title">
          <div className="wrap">
            <h2 id="steps-title" className="title" data-rise>Как работаем</h2>
            <ol className="steps">
              {STEPS.map(({ title, text }, i) => (
                <li key={title} data-rise style={{ '--i': i } as React.CSSProperties}>
                  <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="terms-sec" id="terms" aria-labelledby="terms-title">
          <div className="wrap">
            <h2 id="terms-title" className="title" data-rise>Условия</h2>
            <div className="terms">
              <div className="terms-col" data-rise>
                <h3>Из чего цена</h3>
                <ul className="hairlist">{PRICE.map(p => <li key={p}>{p}</li>)}</ul>
                <p className="terms-note">
                  {COMPANY.priceFrom ? `Набор ${COMPANY.priceFrom}. ` : ''}
                  {COMPANY.minOrder ? `Партия ${COMPANY.minOrder}. ` : ''}
                  Точный расчёт — после заявки.
                </p>
              </div>
              <div className="terms-col" data-rise>
                <h3>Для бухгалтерии</h3>
                <ul className="hairlist">{PAPERS.map(p => <li key={p}>{p}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-sec" id="faq" aria-labelledby="faq-title">
          <div className="wrap faq-in">
            <h2 id="faq-title" className="title" data-rise>Вопросы</h2>
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
