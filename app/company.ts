// Single source of truth for the operator's details shown in the footer, policy and consent.
export const COMPANY = {
  name: 'ООО «ДариСмысл»',
  brand: 'ДариСмысл',
  unp: '193961427',
  address: 'г. Минск, Ленинский район, ул. Якубова, д. 10',
  phone: '+375445900578',
  phoneView: '+375 44 590-05-78',
  // Fill in when available; the footer and documents show these only if they are set.
  email: null as string | null,
  tradeRegister: null as string | null, // e.g. 'В Торговом реестре с 01.07.2025, № 000000'
  // Versions of the legal texts; sent with every request as proof of consent.
  consentVersion: '2026-10-08',
  policyDate: '8 октября 2026 г.',
} as const;

export const AUTHORITY = {
  name: 'Национальный центр защиты персональных данных Республики Беларусь',
  address: '220004, г. Минск, ул. К. Цеткин, д. 24, пом. 3',
  phone: '+375 (17) 367-07-90',
  email: 'info@cpd.by',
  site: 'cpd.by',
} as const;

export const PROCESSOR = {
  name: 'Google LLC',
  country: 'США',
  address: '1600 Amphitheatre Parkway, Mountain View, California 94043, USA',
  service: 'почтовый сервис Gmail',
} as const;
