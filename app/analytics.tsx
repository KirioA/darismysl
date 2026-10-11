'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { COMPANY } from './company';

// Cookie consent + Yandex Metrika + Google Ads tag. Nothing is loaded until the visitor presses «Принять»;
// the choice (and the policy version it was given for) lives in localStorage, not in a cookie.
const KEY = 'ds-cookie-consent';
type Choice = 'accepted' | 'declined';
type Ym = ((id: number, method: string, ...args: unknown[]) => void) & { a?: unknown[][]; l?: number };
type Gtag = (...args: unknown[]) => void;
declare global { interface Window { ym?: Ym; dataLayer?: unknown[]; gtag?: Gtag } }

const METRIKA = COMPANY.metrikaId;
const ADS = COMPANY.googleAdsId;
/** Services that actually run on the site: the banner and /cookies name only these. */
export const TRACKERS = [METRIKA && 'Яндекс Метрики', ADS && 'Google Рекламы'].filter(Boolean) as string[];

const readChoice = (): Choice | null => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    return saved?.v === COMPANY.cookiePolicyVersion ? saved.choice : null;
  } catch { return null; }
};
const saveChoice = (choice: Choice) => {
  try { localStorage.setItem(KEY, JSON.stringify({ choice, v: COMPANY.cookiePolicyVersion, at: new Date().toISOString() })); } catch { /* private mode: ask again next visit */ }
};

/** Report a goal to Metrika and, for leads, a conversion to Google Ads; no-op without consent. */
export function goal(id: 'lead_submit' | 'quiz_submit' | 'phone_click' | 'instagram_click') {
  if (METRIKA && window.ym) window.ym(METRIKA, 'reachGoal', id);
  if (ADS && window.gtag && COMPANY.adsLeadLabel && (id === 'lead_submit' || id === 'quiz_submit')) {
    window.gtag('event', 'conversion', { send_to: `${ADS}/${COMPANY.adsLeadLabel}` });
  }
}

function loadGtag(id: string) {
  if (window.gtag) return;
  // Official Google tag snippet, injected only after consent.
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer!.push(arguments); } as Gtag;
  window.gtag('js', new Date());
  window.gtag('config', id);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
}

function loadMetrika(id: number) {
  if (window.ym) return;
  // Official Yandex Metrika loader (queues calls until tag.js arrives).
  const ym: Ym = (...args) => { (ym.a = ym.a || []).push(args); };
  ym.l = Date.now();
  window.ym = ym;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.appendChild(s);
  ym(id, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false });
}

export default function Analytics() {
  const id = METRIKA;
  const [choice, setChoice] = useState<Choice | null | 'unknown'>('unknown');
  const pathname = usePathname();

  useEffect(() => {
    setChoice(readChoice());
    // «Настройки cookie» in the footer reopens the banner.
    const reopen = () => setChoice(null);
    window.addEventListener('ds-cookie-settings', reopen);
    return () => window.removeEventListener('ds-cookie-settings', reopen);
  }, []);

  useEffect(() => {
    if (choice !== 'accepted') return;
    if (id) loadMetrika(id);
    if (ADS) loadGtag(ADS);
  }, [id, choice]);

  // Client-side navigation between pages: count the new page view.
  useEffect(() => {
    if (id && window.ym) window.ym(id, 'hit', window.location.href);
    if (ADS && window.gtag) window.gtag('event', 'page_view', { page_location: window.location.href });
  }, [id, pathname]);

  // Goals for every phone and Instagram link on the site, wherever it is.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      if (href.startsWith('tel:')) goal('phone_click');
      else if (href.includes('instagram.com')) goal('instagram_click');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!TRACKERS.length || choice !== null) return null;

  const decide = (c: Choice) => {
    const wasAccepted = readChoice() === 'accepted';
    saveChoice(c);
    setChoice(c);
    // Withdrawing consent: reload so the already-running counter stops.
    if (c === 'declined' && wasAccepted) window.location.reload();
  };

  return (
    <div className="cookie-bar" role="region" aria-label="Согласие на cookie">
      <p>
        Мы используем cookie {TRACKERS.join(' и ')}, чтобы понимать, какие страницы и объявления полезны. Без вашего согласия они не включаются.{' '}
        <Link href="/cookies">Подробнее</Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="btn btn-berry" onClick={() => decide('accepted')}>Принять</button>
        <button type="button" className="btn btn-line" onClick={() => decide('declined')}>Отклонить</button>
      </div>
    </div>
  );
}

/** Footer button: lets the visitor change or withdraw the choice at any time. */
export function CookieSettingsButton() {
  if (!TRACKERS.length) return null;
  return (
    <button type="button" className="f-cookie" onClick={() => window.dispatchEvent(new Event('ds-cookie-settings'))}>
      Настройки cookie
    </button>
  );
}
