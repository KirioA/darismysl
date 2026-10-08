import type { Metadata, Viewport } from 'next';
import '@fontsource/unbounded/cyrillic-800.css';
import '@fontsource/unbounded/latin-800.css';
import '@fontsource/golos-text/cyrillic-400.css';
import '@fontsource/golos-text/cyrillic-600.css';
import '@fontsource/golos-text/latin-400.css';
import '@fontsource/golos-text/latin-600.css';
import './globals.css';

const description = 'Новогодние подарочные наборы оптом для компаний и профсоюзов: состав под задачу, логотип на упаковке, детские сладкие подарки, доставка по Беларуси.';

export const metadata: Metadata = {
  title: 'ДариСмысл — новогодние подарочные наборы оптом в Беларуси',
  description,
  icons: { icon: '/logo.svg' },
  openGraph: { title: 'ДариСмысл — подарочные наборы оптом', description, locale: 'ru_BY', type: 'website', images: ['/hero-poster.jpg'] },
};

export const viewport: Viewport = { themeColor: '#c58f55' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
