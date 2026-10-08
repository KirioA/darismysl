import type { Metadata, Viewport } from 'next';
import '@fontsource/unbounded/cyrillic-800.css';
import '@fontsource/unbounded/latin-800.css';
import '@fontsource/golos-text/cyrillic-400.css';
import '@fontsource/golos-text/cyrillic-600.css';
import '@fontsource/golos-text/latin-400.css';
import '@fontsource/golos-text/latin-600.css';
import 'lenis/dist/lenis.css';
import './globals.css';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const description = 'Новогодние подарочные наборы оптом для компаний и профсоюзов: состав под задачу, логотип на упаковке, детские сладкие подарки, доставка по Беларуси.';

export const metadata: Metadata = {
  title: 'ДариСмысл — новогодние подарочные наборы оптом в Беларуси',
  description,
  icons: { icon: `${base}/logo.svg` },
  openGraph: { title: 'ДариСмысл — подарочные наборы оптом', description, locale: 'ru_BY', type: 'website', images: [`${base}/hero-poster.jpg`] },
};

export const viewport: Viewport = { themeColor: '#eef3f0' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
