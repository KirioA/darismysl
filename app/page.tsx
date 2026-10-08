import FooterBackground from './footer-background';
import LeadForm from './lead-form';
import { Wordmark } from './decor';
import SiteFooter from './site-footer';
import { IconBox, IconCandy, IconCheck, IconForm, IconTruck } from './art';
import { COMPANY } from './company';
import Motion from './motion';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

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
    tone: 'berry',
    title: 'Детские сладкие подарки',
    text: 'Сладкие новогодние подарки для детей сотрудников — для профсоюзов и организаций. Подберём состав под возраст и бюджет.',
    cta: 'Собрать детские подарки',
  },
] as const;

// Quick starts under the hero: each one opens the request form pre-filled.
const QUICK = [
  ['?type=corporate', 'Подарки сотрудникам'],
  ['?type=partners', 'Клиентам и партнёрам'],
  ['?type=kids', 'Детям сотрудников'],
  ['?type=corporate&logo=1', 'С логотипом компании'],
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

const NAV = [
  ['#scenarios', 'Наборы'],
  ['#order', 'Как заказать'],
  ['#price', 'Цена'],
  ['#faq', 'Вопросы'],
] as const;

const TAPE = ['Подарочные наборы оптом', 'Логотип на упаковке', 'Детские сладкие подарки', 'Доставка по Беларуси', 'Договор и безнал'];

// Endless tape strip; the text is doubled so the loop is seamless.
function Tape({ tone = 'berry' }: { tone?: 'berry' | 'honey' }) {
  const items = [...TAPE, ...TAPE];
  return (
    <div className={`tape tape-${tone}`} aria-hidden="true">
      <div className="tape-track">
        {items.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

// Floating decor around the hero: candies and stars that drift with the cursor.
const FLOATERS = [
  { kind: 'candy', tone: '#c8423a', x: 40, y: 88, s: 64, r: -18, d: 0.6 },
  { kind: 'star', tone: '#e8b654', x: 46, y: 12, s: 34, r: 0, d: 1.2 },
  { kind: 'candy', tone: '#22453c', x: 55, y: 8, s: 54, r: 24, d: 0.9 },
  { kind: 'star', tone: '#c8423a', x: 92, y: 10, s: 26, r: 0, d: 1.5 },
  { kind: 'candy', tone: '#e8b654', x: 94, y: 70, s: 58, r: -30, d: 0.7 },
  { kind: 'star', tone: '#22453c', x: 3, y: 74, s: 30, r: 0, d: 1.3 },
] as const;

function Floater({ kind, tone, x, y, s, r, d }: (typeof FLOATERS)[number]) {
  const style = { left: `${x}%`, top: `${y}%`, width: s, '--r': `${r}deg` } as React.CSSProperties;
  return kind === 'candy' ? (
    <svg className="floater" data-depth={d} style={style} viewBox="0 0 120 60" aria-hidden="true">
      <path d="M30 30L4 8v44zM90 30l26-22v44z" fill={tone} opacity=".75" />
      <rect x="26" y="12" width="68" height="36" rx="18" fill={tone} />
      <path d="M44 14v32M60 13v34M76 14v32" stroke="#fff" strokeOpacity=".35" strokeWidth="5" />
    </svg>
  ) : (
    <svg className="floater" data-depth={d} style={style} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 0l5 15 15 5-15 5-5 15-5-15L0 20l15-5z" fill={tone} />
    </svg>
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
                <span className="l1 split">Дарим смысл.</span>
                <span className="h1-pill" aria-hidden="true">
                  <video muted loop playsInline autoPlay preload="metadata" poster={`${base}/hero-poster.jpg`} src={`${base}/hero-loop.mp4`} />
                </span>
                <span className="l2 split">Собираем праздник.</span>
              </h1>
              <p className="hero-lead">
                Новогодние подарочные наборы оптом для компаний и профсоюзов: состав под задачу,
                логотип на упаковке, доставка по Беларуси.
              </p>
              <div className="hero-actions">
                <a className="btn btn-berry" href="?type=corporate#contact">Оставить заявку</a>
                <a className="btn btn-ghost" href="#scenarios">Смотреть наборы</a>
              </div>
              <ul className="quick" aria-label="Быстрый старт">
                {QUICK.map(([q, label]) => <li key={q}><a href={`${q}#contact`}>{label}</a></li>)}
              </ul>
            </div>

            <div className="parcel" aria-hidden="true">
              <div className="parcel-box">
                <div className="parcel-window"><FooterBackground /></div>
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
          <p className="wrap hero-deadline">К Новому 2027 году: чем раньше заявка, тем больше выбор состава и упаковки.</p>
        </section>

        <Tape />

        <section className="scenarios" id="scenarios" aria-labelledby="scenarios-title">
          <div className="wrap">
            <h2 id="scenarios-title" className="title split">Два вида наборов — один подход</h2>
            <div className="scenario-grid">
              {SCENARIOS.map(s => (
                <article key={s.id} className={`wrapper wrapper-${s.tone}`}>
                  <div className="wrapper-print">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <a className="btn btn-ink" href={`?type=${s.id}#contact`}>{s.cta}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Marquee words="Подарки с логотипом" />

        <section className="reel" id="order" aria-labelledby="order-title">
          <div className="reel-pin">
            <div className="wrap reel-head">
              <h2 id="order-title" className="title split">Накладная на праздник</h2>
              <p>Пять шагов от заявки до отгрузки. Каждый — у нас в руках.</p>
              <span className="reel-bar" aria-hidden="true"><i /></span>
            </div>
            <ol className="reel-track">
              {ORDER.map(({ title, text, Icon, stamp, yours }, i) => (
                <li key={title} className="reel-card">
                  <span className="reel-n">{String(i + 1).padStart(2, '0')}</span>
                  <Icon className="reel-icon" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className={`stamp stamp-row${yours ? ' stamp-yours' : ''}`} aria-hidden="true">{stamp}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="price" id="price" aria-labelledby="price-title">
          <div className="wrap price-in">
            <div>
              <h2 id="price-title" className="title split">Из чего складывается цена</h2>
              <p className="lead" data-rise>
                Не «цена от» без расшифровки. В расчёте — каждая позиция: понятно, за что вы платите и где можно сэкономить.
              </p>
              {(COMPANY.minOrder || COMPANY.priceFrom) && (
                <p className="price-facts">
                  {COMPANY.minOrder && <span>Минимальная партия: {COMPANY.minOrder}</span>}
                  {COMPANY.priceFrom && <span>Цена набора: {COMPANY.priceFrom}</span>}
                </p>
              )}
            </div>
            <ul className="receipt">
              {PRICE.map(p => (
                <li key={p.item}><span>{p.item}</span><i aria-hidden="true" /><em>{p.note}</em></li>
              ))}
              <li className="receipt-total"><span>Итого</span><i aria-hidden="true" /><em>пришлём после заявки</em></li>
            </ul>
          </div>
        </section>

        <Marquee words="Собираем праздник" dir={-1} />

        <section className="papers" aria-labelledby="papers-title">
          <div className="wrap">
            <h2 id="papers-title" className="title split">Для бухгалтерии и профкома</h2>
            <ul className="paper-stack">
              {PAPERS.map(p => (
                <li key={p.title}>
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

        <Tape tone="honey" />

        <section className="faq-sec" id="faq" aria-labelledby="faq-title">
          <div className="wrap faq-in">
            <div>
              <h2 id="faq-title" className="title split">Вопросы и ответы</h2>
              <p className="lead" data-rise>
                {COMPANY.brand} — белорусская компания. Мы сами закупаем конфеты, упаковку и наполнение, собираем наборы и отгружаем их оптом.
              </p>
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
            <div className="contact-intro">
              <h2 id="contact-title" className="title split">Бланк заявки</h2>
              <p data-rise>Заполните за минуту — вернёмся с составом, стоимостью и сроками.</p>
              <p data-rise>Удобнее голосом? <a href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a></p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>
      <SiteFooter home />
    </>
  );
}
