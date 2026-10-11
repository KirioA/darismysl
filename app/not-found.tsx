import type { Metadata } from 'next';
import Link from 'next/link';
import { Wordmark } from './decor';
import SiteFooter from './site-footer';
import { COMPANY } from './company';
import { LANDINGS } from './landings';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = { title: 'Страница не найдена', robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <>
      <header className="legal-top">
        <div className="wrap legal-top-in">
          <Link href="/" aria-label={`${COMPANY.brand} — на главную`}><Wordmark tone="dark" /></Link>
          <a className="nav-phone" href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a>
        </div>
      </header>
      <main className="nf">
        <div className="wrap nf-in">
          <div className="nf-art" aria-hidden="true">
            <span className="nf-code">404</span>
            <img className="nf-box" src={`${base}/kit/box-open.webp`} alt="" />
            <img className="nf-flake" src={`${base}/kit/snowflake.webp`} alt="" />
          </div>
          <div className="nf-copy">
            <h1 className="lp-h1">Здесь пусто, как в&nbsp;коробке до&nbsp;сборки</h1>
            <p className="lp-lead">Такой страницы нет. Зато наборы есть — выберите, что вы искали:</p>
            <ul className="nf-links">
              {LANDINGS.map(l => <li key={l.slug}><Link href={`/${l.slug}`}>{l.nav} →</Link></li>)}
            </ul>
            <div className="hero-actions">
              <Link className="btn btn-berry" href="/">На главную</Link>
              <a className="link-arrow" href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
