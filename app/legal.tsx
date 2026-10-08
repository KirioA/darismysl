import Link from 'next/link';
import { Wordmark } from './decor';
import SiteFooter from './site-footer';

export function LegalPage({ title, edition, children }: { title: string; edition: string; children: React.ReactNode }) {
  return (
    <>
      <div className="legal-page">
        <header className="legal-top">
          <div className="wrap legal-top-in">
            <Link href="/" aria-label="ДариСмысл — на главную"><Wordmark tone="dark" /></Link>
            <Link href="/" className="legal-back">← На главную</Link>
          </div>
        </header>
        <main className="wrap legal">
          <h1 className="title">{title}</h1>
          <p className="legal-edition">{edition}</p>
          <div className="legal-body">{children}</div>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}

export function Clause({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="clause">
      <span className="clause-n">{n}</span>
      <span>{children}</span>
    </p>
  );
}

export function Purpose({ title, rows }: { title: string; rows: [string, React.ReactNode][] }) {
  return (
    <article className="purpose">
      <h3>{title}</h3>
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
