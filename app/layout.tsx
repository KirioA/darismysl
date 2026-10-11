import type { Metadata, Viewport } from 'next';
import '@fontsource/unbounded/cyrillic-700.css';
import '@fontsource/unbounded/latin-700.css';
import '@fontsource/golos-text/cyrillic-400.css';
import '@fontsource/golos-text/cyrillic-600.css';
import '@fontsource/golos-text/latin-400.css';
import '@fontsource/golos-text/latin-600.css';
import 'lenis/dist/lenis.css';
import './globals.css';
import { COMPANY } from './company';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const title = 'Новогодние подарочные наборы оптом в Минске и Беларуси — ДариСмысл';
const description =
  'Корпоративные новогодние подарки для сотрудников, клиентов и детей сотрудников. От 1 набора, логотип на упаковке, состав под бюджет, бесплатная доставка по Беларуси. Заказы до 20 декабря.';

export const metadata: Metadata = {
  // Absolute URLs (canonical, og:image) always point at the main domain, so copies of the site do not compete with it.
  metadataBase: new URL(COMPANY.site),
  title: { default: title, template: `%s — ${COMPANY.brand}` },
  description,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: { icon: `${base}/logo.svg` },
  openGraph: {
    type: 'website',
    locale: 'ru_BY',
    url: '/',
    siteName: COMPANY.brand,
    title,
    description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'ДариСмысл — новогодние подарочные наборы оптом' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
  // Fill in after adding the site to Yandex Webmaster / Google Search Console.
  verification: { yandex: COMPANY.verifyYandex ?? undefined, google: COMPANY.verifyGoogle ?? undefined },
};

export const viewport: Viewport = { themeColor: '#f6f8f5' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
