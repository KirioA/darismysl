// Single source of truth for the operator's details shown in the footer, policy and consent.
export const COMPANY = {
  name: 'ООО «ДариСмысл»',
  brand: 'ДариСмысл',
  // Canonical address of the site: canonical links, sitemap, Open Graph, structured data.
  site: 'https://darismysl.by',
  unp: '193961427',
  address: 'г. Минск, Ленинский район, ул. Якубова, д. 10',
  phone: '+375447444153',
  phoneView: '+375 44 744-41-53',
  instagram: 'darismysl.by',
  // Fill in when available; the footer and documents show these only if they are set.
  email: null as string | null,
  tradeRegister: null as string | null, // e.g. 'В Торговом реестре с 01.07.2025, № 000000'
  // Shown on the site only when set, e.g. 'от 20 наборов' / 'от 25 BYN за набор'.
  minOrder: 'от 1 набора' as string | null,
  priceFrom: null as string | null,
  // Confirmed by the owner (2026-10-10): see knowledge base facts.md.
  orderDeadline: '20 декабря',
  instagramUrl: 'https://www.instagram.com/darismysl.by/',
  // Site verification codes from Yandex Webmaster and Google Search Console (content of their meta tags).
  verifyYandex: null as string | null,
  verifyGoogle: null as string | null,
  // Yandex Metrika counter; analytics loads only after the visitor accepts cookies.
  metrikaId: null as number | null,
  // Google Ads tag (gtag.js); also loads only after consent.
  googleAdsId: 'AW-18506339080' as string | null,
  // Google Ads conversion labels (Goals → Conversions → action → tag setup); fill in when created.
  adsLeadLabel: 'zwraCPPs1JgdEImwfhE' as string | null,
  cookiePolicyVersion: '2026-10-11',
  // Versions of the legal texts; sent with every request as proof of consent.
  consentVersion: '2026-10-10',
  policyDate: '11 октября 2026 г.',
  // The site's server: requests pass through it and are not stored there.
  serverCountry: 'Республике Беларусь',
} as const;

export const AUTHORITY = {
  name: 'Национальный центр защиты персональных данных Республики Беларусь',
  address: '220004, г. Минск, ул. К. Цеткин, д. 24, пом. 3',
  phone: '+375 (17) 367-07-90',
  email: 'info@cpd.by',
  site: 'cpd.by',
} as const;

// Authorised persons (processors) that receive every site request, abroad: hence the cross-border consent.
export const PROCESSORS = [
  {
    name: 'Telegram Messenger Inc.',
    country: 'Британские Виргинские острова',
    // Telegram does not publish a street address; registration and operational base per public sources.
    address: 'Британские Виргинские острова (место регистрации); операционный центр — г. Дубай, Объединённые Арабские Эмираты',
    service: 'мессенджер Telegram',
    does: 'доставка уведомления о заявке в чат Оператора и хранение сообщения в истории чата',
    states: 'на Британских Виргинских островах, в ОАЭ и иных странах размещения серверов Telegram',
  },
  {
    name: 'Google LLC',
    country: 'США',
    address: '1600 Amphitheatre Parkway, Mountain View, California 94043, USA',
    service: 'почтовый сервис Gmail',
    does: 'приём, хранение и обработка электронных писем с заявками с сайта и последующей переписки',
    states: 'в США и иных странах размещения серверов Google',
  },
] as const;

// "Telegram Messenger Inc. (Британские Виргинские острова) и Google LLC (США)"
export const PROCESSORS_TEXT = PROCESSORS.map(p => `${p.name} (${p.country})`).join(' и ');
