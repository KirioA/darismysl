'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { COMPANY, PROCESSORS } from './company';
import { GIFT_TYPES } from './lead-types';

type Status = 'idle' | 'sending' | 'sent' | 'error';

// 1 набор, 2 набора, 5 наборов
const sets = (n: number) => {
  const d = n % 10, h = n % 100;
  return d === 1 && h !== 11 ? 'набор' : d >= 2 && d <= 4 && (h < 12 || h > 14) ? 'набора' : 'наборов';
};

export default function LeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [type, setType] = useState<string>('corporate');
  const [logo, setLogo] = useState(false);
  const [sent, setSent] = useState<{ type: string; quantity: string } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  // Scenario buttons link here with ?type=…, so the request starts pre-filled.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preset = params.get('type');
    if (GIFT_TYPES.some(([id]) => id === preset)) setType(preset!);
    if (params.get('logo') === '1') setLogo(true);
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Proof of consent: the operator must be able to prove it (Law No. 99-Z, art. 5),
        // so the version and time of the accepted text travel with every request.
        body: JSON.stringify({ ...data, consentVersion: COMPANY.consentVersion, acceptedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setLogo(false);
      setStatus('sent');
      setSent({ type: GIFT_TYPES.find(([id]) => id === data.type)?.[1] ?? '', quantity: String(data.quantity ?? '') });
      dialog.current?.showModal();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className={`lead-form${status === 'sent' ? ' is-sent' : ''}`} onSubmit={onSubmit} data-rise>
      <fieldset className="wide gift-type">
        <legend>Кому подарки</legend>
        <div className="chips">
          {GIFT_TYPES.map(([id, label]) => (
            <label key={id} className="chip">
              <input type="radio" name="type" value={id} checked={type === id} onChange={() => setType(id)} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="wide row3">
        <label>
          <span>Наборов</span>
          <input name="quantity" type="number" inputMode="numeric" min={1} required placeholder="50" />
        </label>
        <label>
          <span>Бюджет на набор, BYN</span>
          <input name="budget" type="text" inputMode="decimal" placeholder="40" />
        </label>
        <label>
          <span>К дате</span>
          <input name="date" type="date" />
        </label>
      </div>

      <label>
        <span>Имя</span>
        <input name="name" type="text" autoComplete="name" required maxLength={100} />
      </label>
      <label>
        <span>Телефон или e-mail</span>
        <input name="contact" type="text" autoComplete="tel" required maxLength={100} placeholder="+375" />
      </label>
      <label className="wide">
        <span>Комментарий</span>
        <textarea name="message" rows={2} maxLength={2000} placeholder="Компания, пожелания к составу, возраст детей" />
      </label>
      <label className="wide check">
        <input type="checkbox" name="logo" value="да" checked={logo} onChange={e => setLogo(e.target.checked)} />
        <span>Нужен логотип на упаковке</span>
      </label>
      {/* Honeypot: hidden from people, bots fill it and get dropped server-side. */}
      <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="wide consents">
        <label className="check">
          <input type="checkbox" name="consent_processing" value="да" required />
          <span>
            Согласен(на) на <Link href="/consent" target="_blank">обработку персональных данных</Link>,
            с <Link href="/privacy" target="_blank">политикой</Link> ознакомлен(а).
          </span>
        </label>
        <label className="check">
          <input type="checkbox" name="consent_transfer" value="да" required />
          <span>
            Согласен(на) на <Link href="/consent#transfer" target="_blank">трансграничную передачу</Link> данных ({PROCESSORS.map(p => `${p.service.split(' ').pop()} — ${p.country}`).join('; ')}).
          </span>
        </label>
        <details className="operator-note">
          <summary>Кому и зачем передаём данные</summary>
          Оператор: {COMPANY.name}, УНП {COMPANY.unp}, {COMPANY.address}. Цель: рассмотрение заявки и связь с вами.
          Данные: имя, телефон или e-mail, текст заявки. Срок согласия: 1 год, отозвать можно в любой момент.
        </details>
      </div>

      <div className="wide form-actions">
        <button type="submit" className="btn btn-berry" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          {status === 'sending' ? <><span className="spinner" aria-hidden="true" />Отправляем заявку…</> : 'Отправить заявку'}
        </button>
      </div>
      <p className="wide form-status" role="status" aria-live="polite">
        {status === 'sent' && 'Заявка принята. Скоро свяжемся.'}
        {status === 'error' && <>Не отправилось. Позвоните: <a href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a></>}
      </p>

      {/* Native <dialog>: Esc, focus trap and backdrop come from the browser. */}
      <dialog ref={dialog} className="sent-dialog" aria-labelledby="sent-title" onClick={e => e.target === e.currentTarget && dialog.current?.close()}>
        <div className="sent-card">
          <div className="sent-art" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties} />)}
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/kit/gift-box.webp`} alt="" />
          </div>
          <h3 id="sent-title">Заявка у нас!</h3>
          <p>
            Свяжемся с вами по указанному контакту и подберём состав
            {sent?.quantity ? <> на <b>{sent.quantity} {sets(Number(sent.quantity))}</b></> : null}
            {sent?.type ? <> — {sent.type.toLowerCase()}</> : null}.
          </p>
          <p className="sent-ig-note">Пока ждёте — загляните в наш Instagram: там наборы, идеи и как мы работаем.</p>
          <div className="sent-actions">
            <a className="btn btn-berry" href={`https://www.instagram.com/${COMPANY.instagram}/`} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              @{COMPANY.instagram}
            </a>
            <button type="button" className="btn btn-line" onClick={() => dialog.current?.close()}>Закрыть</button>
          </div>
        </div>
      </dialog>
    </form>
  );
}
