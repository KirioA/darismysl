'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { COMPANY, PROCESSOR } from './company';
import { GIFT_TYPES } from './lead-types';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function LeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [type, setType] = useState<string>('corporate');

  // Scenario buttons link here with ?type=…, so the request starts pre-filled.
  useEffect(() => {
    const preset = new URLSearchParams(window.location.search).get('type');
    if (GIFT_TYPES.some(([id]) => id === preset)) setType(preset!);
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Proof of consent: the operator must be able to prove it (Law No. 99-Z, art. 5),
        // so the version and time of the accepted text travel with every request.
        body: JSON.stringify({ ...data, consentVersion: COMPANY.consentVersion, acceptedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className={`lead-form${status === 'sent' ? ' is-sent' : ''}`} onSubmit={onSubmit} data-reveal>
      <fieldset className="wide gift-type">
        <legend><b>1</b>Кому подарки</legend>
        <div className="chips">
          {GIFT_TYPES.map(([id, label]) => (
            <label key={id} className="chip">
              <input type="radio" name="type" value={id} checked={type === id} onChange={() => setType(id)} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label>
        <span><b>2</b>Сколько наборов</span>
        <input name="quantity" type="number" inputMode="numeric" min={1} required placeholder="например, 50" />
      </label>
      <label>
        <span><b>3</b>Бюджет на 1 набор, BYN <em>необязательно</em></span>
        <input name="budget" type="text" inputMode="decimal" placeholder="например, 40" />
      </label>
      <label>
        <span><b>4</b>К какой дате</span>
        <input name="date" type="date" />
      </label>
      <label className="check logo-check">
        <input type="checkbox" name="logo" value="да" />
        <span>Нужен логотип на упаковке</span>
      </label>

      <label>
        <span><b>5</b>Ваше имя</span>
        <input name="name" type="text" autoComplete="name" required maxLength={100} />
      </label>
      <label>
        <span><b>6</b>Телефон или e-mail</span>
        <input name="contact" type="text" autoComplete="tel" required maxLength={100} placeholder="+375 __ ___-__-__" />
      </label>
      <label className="wide">
        <span><b>7</b>Компания <em>необязательно</em></span>
        <input name="company" type="text" autoComplete="organization" maxLength={150} />
      </label>
      <label className="wide">
        <span><b>8</b>Комментарий <em>необязательно</em></span>
        <textarea name="message" rows={3} maxLength={2000} placeholder="Пожелания к составу, упаковке, возрасту детей" />
      </label>
      {/* Honeypot: hidden from people, bots fill it and get dropped server-side. */}
      <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="wide operator-note">
        <strong>Кому и зачем вы передаёте данные.</strong> Оператор: {COMPANY.name}, УНП {COMPANY.unp}, {COMPANY.address}.
        Цель: рассмотрение заявки и связь с вами. Данные: имя, телефон или e-mail, компания, текст заявки. Срок согласия: 1 год.
        Согласие можно отозвать в любой момент.
      </div>

      <label className="wide check">
        <input type="checkbox" name="consent_processing" value="да" required />
        <span>
          Даю <Link href="/consent" target="_blank">согласие на обработку моих персональных данных</Link> для рассмотрения заявки и связи со мной.
          С <Link href="/privacy" target="_blank">Политикой в отношении обработки персональных данных</Link> ознакомлен(а).
        </span>
      </label>
      <label className="wide check">
        <input type="checkbox" name="consent_transfer" value="да" required />
        <span>
          Даю согласие на <Link href="/consent#transfer" target="_blank">трансграничную передачу</Link> моих данных ({PROCESSOR.country}, {PROCESSOR.service}, {PROCESSOR.name})
          и ознакомлен(а) с рисками такой передачи.
        </span>
      </label>

      <div className="wide form-actions">
        <button type="submit" className="btn btn-tape" disabled={status === 'sending'}>
          {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
        </button>
        <p className="check-hint">Без обеих отметок заявка не принимается.</p>
      </div>
      <p className="wide form-status" role="status" aria-live="polite">
        {status === 'sent' && 'Заявка принята. Свяжемся с вами в рабочее время.'}
        {status === 'error' && <>Заявка не отправилась. Позвоните нам: <a href={`tel:${COMPANY.phone}`}>{COMPANY.phoneView}</a> — или попробуйте ещё раз.</>}
      </p>
      <span className="stamp stamp-sent" aria-hidden="true">Принято</span>
    </form>
  );
}
