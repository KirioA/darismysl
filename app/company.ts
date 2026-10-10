// Single source of truth for the operator's details shown in the footer, policy and consent.
export const COMPANY = {
  name: 'ООО «ДариСмысл»',
  brand: 'ДариСмысл',
  unp: '193961427',
  address: 'г. Минск, Ленинский район, ул. Якубова, д. 10',
  phone: '+375447444153',
  phoneView: '+375 44 744-41-53',
  instagram: 'darismysl.by',
  // Fill in when available; the footer and documents show these only if they are set.
  email: null as string | null,
  tradeRegister: null as string | null, // e.g. 'В Торговом реестре с 01.07.2025, № 000000'
  // Shown on the site only when set, e.g. 'от 20 наборов' / 'от 25 BYN за набор'.
  minOrder: null as string | null,
  priceFrom: null as string | null,
  // Versions of the legal texts; sent with every request as proof of consent.
  consentVersion: '2026-10-10',
  policyDate: '10 октября 2026 г.',
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
