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
import Quiz from './quiz';
import Analytics from './analytics';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
// Kept under 60 chars so Google shows it as is instead of rewriting it.
const title = 'ДариСмысл — новогодние подарочные наборы оптом';
const description =
  'Подарки сотрудникам, клиентам и детям сотрудников. От 1 набора, логотип на упаковке, бесплатная доставка по Беларуси. Заказы до 20 декабря.';

export const metadata: Metadata = {
  // Absolute URLs (canonical, og:image) always point at the main domain, so copies of the site do not compete with it.
  metadataBase: new URL(COMPANY.site),
  title: { default: title, template: `%s — ${COMPANY.brand}` },
  description,
  alternates: { canonical: '/' },
  // Large image previews let Google use our branded thumbnail.
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    type: 'website',
    locale: 'ru_BY',
    url: '/',
    siteName: COMPANY.brand,
    title,
    description,
    images: [
      { url: '/og.jpg', width: 1200, height: 630, alt: 'ДариСмысл — новогодние подарочные наборы оптом' },
      { url: '/og-square.jpg', width: 1200, height: 1200, alt: 'ДариСмысл' },
    ],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
  // Fill in after adding the site to Yandex Webmaster / Google Search Console.
  verification: { yandex: COMPANY.verifyYandex ?? undefined, google: COMPANY.verifyGoogle ?? undefined },
};

export const viewport: Viewport = { themeColor: '#f6f8f5' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}<Quiz /><Analytics /></body></html>;
}
