import FooterBackground from './footer-background';
import LeadForm from './lead-form';
import { Wordmark } from './decor';
import SiteFooter from './site-footer';
import { IconBox, IconCandy, IconCheck, IconForm, IconTruck } from './art';
import { COMPANY } from './company';
import Motion from './motion';

const SCENARIOS = [
  {
    id: 'corporate',
    tone: 'pine',
    title: 'Сотрудникам, клиентам и партнёрам',
    text: 'Состав под повод и бюджет, ваш логотип на упаковке. Один набор для всех или разные — для команды и для партнёров.',
    cta: 'Собрать корпоративный набор',
  },
  {
    id: 'kids',
    tone: 'ribbon',
    title: 'Детские сладкие подарки',
    text: 'Сладкие новогодние подарки для детей сотрудников — для профсоюзов и организаций. Подберём состав под возраст и бюджет.',
    cta: 'Собрать детские подарки',
  },
] as const;

// Stamp outline carries the state: dashed = the visitor's move, solid = what we take on.
const ORDER = [
  { title: 'Заявка', text: 'Пишете, кому подарки, сколько наборов, бюджет на один набор и к какой дате.', Icon: IconForm, stamp: 'Ваш ход', yours: true },
  { title: 'Состав', text: 'Подбираем конфеты, упаковку и наполнение под повод, получателей и бюджет.', Icon: IconCandy, stamp: 'Подберём' },
  { title: 'Согласование', text: 'Показываем состав и стоимость, согласуем логотип на упаковке и сроки.', Icon: IconCheck, stamp: 'Согласуем' },
  { title: 'Сборка', text: 'Сами закупаем, собираем и упаковываем наборы — без посредников.', Icon: IconBox, stamp: 'Соберём' },
  { title: 'Отгрузка', text: 'Отгружаем к согласованной дате с доставкой по Беларуси.', Icon: IconTruck, stamp: 'Отгрузим' },
];

const PRICE = [
  { item: 'Конфеты и наполнение', note: 'вес и состав под бюджет' },
  { item: 'Упаковка', note: 'вид и размер под повод' },
  { item: 'Логотип на упаковке', note: 'если нужен' },
  { item: 'Сборка наборов', note: 'своими силами' },
  { item: 'Доставка', note: 'по всей Беларуси' },
];

const PAPERS = [
  { title: 'Договор', text: 'Работаем с организациями по договору.' },
  { title: 'Безналичная оплата', text: 'Оплата по счёту от юридического лица.' },
  { title: 'Закрывающие документы', text: 'Комплект документов для бухгалтерии и профкома.' },
  { title: 'Доставка по Беларуси', text: 'Отгружаем в любой город к согласованной дате.' },
];

const FAQ = [
  { q: 'Что вы продаёте?', a: 'Подарочные наборы оптом. Конфеты, упаковку и наполнение мы закупаем сами и собираем в наборы под задачу заказчика.' },
  { q: 'Можно ли собрать набор под наш бюджет?', a: 'Да. Назовите бюджет на один набор и количество — предложим подходящий состав.' },
  { q: 'Можно нанести наш логотип?', a: 'Да, нанесём логотип на упаковку. Вариант нанесения и макет согласуем до сборки.' },
  { q: 'Собираете детские подарки для профсоюза?', a: 'Да, собираем сладкие новогодние подарки для детей сотрудников и подбираем состав под возраст.' },
  { q: 'Доставляете по Беларуси?', a: 'Да, отгружаем по всей Беларуси к согласованной дате.' },
  { q: 'Как быстро можно получить заказ?', a: 'Срок зависит от состава и объёма, назовём его после заявки. Перед Новым годом спрос высокий, поэтому лучше оформить заказ заранее.' },
  { q: 'Как рассчитывается стоимость?', a: 'Цена складывается из состава, упаковки, нанесения логотипа, сборки и доставки. Расчёт пришлём после заявки.' },
];

const TAPE = ['Подарочные наборы оптом', 'Логотип на упаковке', 'Детские сладкие подарки', 'Доставка по Беларуси', 'Договор и безнал'];

// Endless tape strip; the text is doubled so the loop is seamless.
function Tape({ tone = 'red' }: { tone?: 'red' | 'gold' }) {
  const items = [...TAPE, ...TAPE];
  return (
    <div className={`tape tape-${tone}`} aria-hidden="true">
      <div className="tape-track">
        {items.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

const NAV = [
  ['#scenarios', 'Наборы'],
  ['#order', 'Как заказать'],
  ['#price', 'Цена'],
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
      <header className="topbar">
        <div className="wrap topbar-in">
          <a href="#top" className="topbar-logo" aria-label={`${COMPANY.brand} — наверх`}><Wordmark tone="dark" /></a>
          <nav className="topbar-nav" aria-label="Разделы">
            {NAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <a className="topbar-phone" href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a>
          <a className="btn btn-tape topbar-cta" href="#contact">Заявка</a>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-in">
            <div className="hero-copy">
              <h1 id="hero-title" className="hero-title"><span className="l1">Дарим смысл.</span> <span className="l2">Собираем праздник.</span></h1>
              <p className="hero-lead">
                Новогодние подарочные наборы оптом для компаний и профсоюзов: состав под задачу,
                логотип на упаковке, доставка по Беларуси.
              </p>
              <div className="hero-actions">
                <a className="btn btn-tape" href="?type=corporate#contact">Сотрудникам и клиентам</a>
                <a className="btn btn-ink" href="?type=kids#contact">Детям сотрудников</a>
              </div>
              <p className="hero-deadline">К Новому 2027 году: чем раньше заявка, тем больше выбор состава и упаковки.</p>
            </div>

            <div className="parcel" aria-hidden="true">
              <div className="parcel-box">
                <div className="parcel-window"><FooterBackground /></div>
                <span className="parcel-flap" />
                <span className="parcel-ribbon parcel-ribbon-top" />
                <span className="parcel-ribbon parcel-ribbon-v" />
                <span className="parcel-ribbon parcel-ribbon-h" />
                <svg className="parcel-bow" viewBox="0 0 120 70">
                  <path d="M60 35C44 10 14 4 10 22s26 22 50 13zM60 35c16-25 46-31 50-13s-26 22-50 13z" fill="#d4152b" stroke="#a90f20" strokeWidth="3" />
                  <path d="M56 38l-18 30h12l10-18 10 18h12L64 38z" fill="#a90f20" />
                  <rect x="52" y="27" width="16" height="16" rx="4" fill="#a90f20" />
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

        <Tape />

        <section className="scenarios" id="scenarios" aria-labelledby="scenarios-title">
          <div className="wrap">
            <h2 id="scenarios-title" className="title" data-reveal>Два вида наборов — один подход</h2>
            <div className="scenario-grid">
              {SCENARIOS.map((s, i) => (
                <article key={s.id} className={`wrapper wrapper-${s.tone}`} data-reveal style={{ '--i': i } as React.CSSProperties}>
                  <div className="wrapper-print">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <a className="btn btn-paper" href={`?type=${s.id}#contact`}>{s.cta}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="order" id="order" aria-labelledby="order-title">
          <div className="wrap">
            <div className="sheet" data-reveal>
              <div className="sheet-head">
                <h2 id="order-title" className="title">Накладная на праздник</h2>
                <span className="sheet-no" aria-hidden="true">№ НГ-2027 <i className="barcode" /></span>
                <p>Пять шагов от заявки до отгрузки. Каждый — у нас в руках.</p>
              </div>
              <ol className="order-rows">
                {ORDER.map(({ title, text, Icon, stamp, yours }, i) => (
                  <li key={title} data-reveal style={{ '--i': i } as React.CSSProperties}>
                    <span className="order-n">{i + 1}</span>
                    <Icon className="order-icon" />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                    <span className={`stamp stamp-row${yours ? ' stamp-yours' : ''}`} aria-hidden="true">{stamp}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="price" id="price" aria-labelledby="price-title">
          <div className="wrap price-in">
            <div>
              <h2 id="price-title" className="title" data-reveal>Из чего складывается цена</h2>
              <p className="lead">
                Не «цена от» без расшифровки. В расчёте — каждая позиция: понятно, за что вы платите и где можно сэкономить.
              </p>
              {(COMPANY.minOrder || COMPANY.priceFrom) && (
                <p className="price-facts">
                  {COMPANY.minOrder && <span>Минимальная партия: {COMPANY.minOrder}</span>}
                  {COMPANY.priceFrom && <span>Цена набора: {COMPANY.priceFrom}</span>}
                </p>
              )}
            </div>
            <ul className="receipt" data-reveal>
              {PRICE.map((p, i) => (
                <li key={p.item} style={{ '--i': i } as React.CSSProperties}><span>{p.item}</span><i aria-hidden="true" /><em>{p.note}</em></li>
              ))}
              <li className="receipt-total"><span>Итого</span><i aria-hidden="true" /><em>пришлём после заявки</em></li>
            </ul>
          </div>
        </section>

        <section className="papers" aria-labelledby="papers-title">
          <div className="wrap">
            <h2 id="papers-title" className="title" data-reveal>Для бухгалтерии и профкома</h2>
            <ul className="paper-stack" data-reveal>
              {PAPERS.map((p, i) => (
                <li key={p.title} style={{ '--i': i } as React.CSSProperties}>
                  <span className="tick" aria-hidden="true" />
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Tape tone="gold" />

        <section className="faq-sec" id="faq" aria-labelledby="faq-title">
          <div className="wrap faq-in">
            <div>
              <h2 id="faq-title" className="title" data-reveal>Вопросы и ответы</h2>
              <p className="lead">
                {COMPANY.brand} — белорусская компания. Мы сами закупаем конфеты, упаковку и наполнение, собираем наборы и отгружаем их оптом.
              </p>
            </div>
            <div className="faq" data-reveal>
              {FAQ.map((item, i) => (
                <details key={item.q} style={{ '--i': i } as React.CSSProperties}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap contact-in">
            <div className="contact-intro" data-reveal>
              <h2 id="contact-title" className="title">Бланк заявки</h2>
              <p>Заполните за минуту — вернёмся с составом, стоимостью и сроками.</p>
              <p>Удобнее голосом? <a href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a></p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
      <SiteFooter home />
    </>
  );
}
