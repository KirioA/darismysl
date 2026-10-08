import type { Metadata } from 'next';
import '@fontsource/nunito/900.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/600.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'ДариСмысл — подарочные наборы оптом',
  description: 'Собираем подарочные наборы оптом под ваш заказ: конфеты, упаковка и наполнение. Новогодние подарки для компаний.',
  icons: { icon: '/logo.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
