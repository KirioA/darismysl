import type { Metadata } from 'next';
import Link from 'next/link';
import { Wordmark } from './decor';
import LeadForm from './lead-form';
import SiteFooter from './site-footer';
import { COMPANY } from './company';
import { LANDINGS, type Landing } from './landings';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const STEPS = [
  ['Заявка', 'Количество, бюджет и дата'],
  ['Коммерческое предложение', 'Подробный состав и упаковка'],
  ['Сборка', 'Логотип, упаковка, состав'],
  ['Доставка', 'Бесплатно по всей Беларуси'],
] as const;

export function landingMetadata(l: Landing): Metadata {
  return {
    title: { absolute: `${l.metaTitle} — ${COMPANY.brand}` },
    description: l.metaDescription,
    alternates: { canonical: `/${l.slug}` },
    openGraph: { type: 'website', locale: 'ru_BY', url: `/${l.slug}`, siteName: COMPANY.brand, title: l.metaTitle, description: l.metaDescription, images: ['/instagram/post1-cover.jpg'] },
  };
}

export default function LandingPage({ l }: { l: Landing }) {
  const url = `${COMPANY.site}/${l.slug}`;
  // Service + breadcrumbs + this page's FAQ, tied to the Organization defined on the home page.
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', name: l.h1, description: l.lead, url, areaServed: { '@type': 'Country', name: 'Беларусь' }, provider: { '@id': `${COMPANY.site}/#org` } },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: COMPANY.site },
          { '@type': 'ListItem', position: 2, name: l.nav, item: url },
        ],
      },
      { '@type': 'FAQPage', mainEntity: l.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <header className="legal-top">
        <div className="wrap legal-top-in">
          <Link href="/" aria-label={`${COMPANY.brand} — на главную`}><Wordmark tone="dark" /></Link>
          <div className="lp-top-actions">
            <a className="nav-phone" href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a>
            <a className="btn btn-berry lp-top-btn" href="#form">Рассчитать</a>
          </div>
        </div>
      </header>

      <main>
        <section className="lp-hero">
          <div className="wrap lp-hero-in">
            <div>
              <nav className="lp-crumbs" aria-label="Хлебные крошки"><Link href="/">Главная</Link> / <span>{l.nav}</span></nav>
              <span className="h1-kicker">{l.kicker}</span>
              <h1 className="lp-h1">{l.h1}</h1>
              <p className="lp-lead">{l.lead}</p>
              <ul className="ask-facts lp-facts">
                <li>от 1 набора</li>
                <li>заказы до {COMPANY.orderDeadline}</li>
                <li>доставка по РБ бесплатно</li>
              </ul>
              <div className="hero-actions">
                <a className="btn btn-berry" href="#form">Получить предложение</a>
                <a className="link-arrow" href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a>
              </div>
            </div>
            <div className="lp-art" aria-hidden="true">
              {l.stickers.map((s, i) => <img key={s} className={`lp-st lp-st-${i}`} src={`${base}/kit/${s}.webp`} alt="" />)}
            </div>
          </div>
        </section>

        <section className="lp-sec">
          <div className="wrap">
            <h2 className="title">Что вы получаете</h2>
            <div className="lp-points">
              {l.points.map(([t, d]) => <article key={t} className="lp-point"><h3>{t}</h3><p>{d}</p></article>)}
            </div>
          </div>
        </section>

        {l.photos && (
          <section className="lp-sec lp-band">
            <div className="wrap">
              <h2 className="title">Так выглядят подарки</h2>
              <div className="lp-photos">
                {l.photos.map(p => (
                  <figure key={p.src} className="lp-photo">
                    <img src={`${base}/photos/${p.src}.webp`} alt={p.alt} loading="lazy" />
                    <figcaption>{p.caption}</figcaption>
                  </figure>
                ))}
              </div>
              <p className="lp-note">Внутри каждой упаковки — конфеты и наполнение под ваш бюджет.</p>
            </div>
          </section>
        )}

        <section className="lp-sec">
          <div className="wrap">
            <h2 className="title">Как заказать</h2>
            <ol className="lp-steps">
              {STEPS.map(([t, d], i) => <li key={t}><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="lp-sec lp-band">
          <div className="wrap faq-in">
            <h2 className="title">Вопросы</h2>
            <div className="faq">
              {l.faq.map(item => (
                <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="form" aria-labelledby="form-title">
          <div className="wrap contact-in">
            <div className="contact-intro">
              <h2 id="form-title" className="title">Заявка</h2>
              <p>Опишите задачу — пришлём коммерческое предложение с составом и упаковкой.</p>
              <p><a href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a></p>
            </div>
            <LeadForm defaultType={l.formType} />
          </div>
        </section>

        <nav className="lp-sec lp-related" aria-label="Другие подарки">
          <div className="wrap">
            <h2 className="title">Ещё по теме</h2>
            <ul>
              {LANDINGS.filter(x => x.slug !== l.slug).map(x => <li key={x.slug}><Link href={`/${x.slug}`}>{x.nav} →</Link></li>)}
              <li><Link href="/">Главная страница →</Link></li>
            </ul>
          </div>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
