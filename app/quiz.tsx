'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { COMPANY, PROCESSORS } from './company';
import { GIFT_TYPES } from './lead-types';
import { goal } from './analytics';

// "Соберите набор" quiz: any element with data-quiz opens it (data-quiz="kids" preselects the recipient).
// Answers go to /api/lead as one request, like the form.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

type Answers = { type: string; quantity: string; budget: string; contents: string[]; packaging: string; logo: string };
const EMPTY: Answers = { type: '', quantity: '', budget: '', contents: [], packaging: '', logo: '' };

const TYPE_ART: Record<string, string> = { corporate: 'kit/gift-box.webp', partners: 'kit/bell.webp', kids: 'kit/gingerbread.webp' };
const QUANTITIES = ['до 20', '20–50', '50–100', '100+'];
const BUDGETS = ['до 20 BYN', '20–40 BYN', '40–70 BYN', '70+ BYN', 'Пока не знаю'];
const CONTENTS: [string, string][] = [
  ['Сладости', 'kit/chocolate.webp'], ['Чай', 'kit/tin-can.webp'], ['Кофе', 'kit/coffee-bag.webp'],
  ['Мёд', 'kit/honey-jar.webp'], ['Фрукты', 'kit/tangerine.webp'], ['Ёлочные игрушки', 'kit/bauble.webp'],
];
const PACKAGING: [string, string][] = [
  ['Коробка', 'photos/box-santa-green.webp'], ['Жестяная банка', 'kit/tin-can.webp'], ['Сумка', 'photos/bag-owls.webp'],
  ['Мягкая игрушка', 'photos/toy-sheep.webp'], ['Подберите сами', 'kit/box-open.webp'],
];
const STEPS = ['Кому подарки?', 'Сколько наборов?', 'Бюджет на один набор', 'Что положить?', 'Упаковка', 'Логотип на упаковке?', 'Куда прислать предложение'];

export default function Quiz() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.('[data-quiz]');
      if (!el) return;
      e.preventDefault();
      const preset = el.getAttribute('data-quiz') ?? '';
      const known = GIFT_TYPES.some(([id]) => id === preset);
      setA({ ...EMPTY, type: known ? preset : '' });
      setStep(known ? 1 : 0);
      setStatus('idle');
      dialog.current?.showModal();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const pick = (key: keyof Answers, value: string, advance = true) => {
    setA(prev => ({ ...prev, [key]: value }));
    if (advance) setStep(s => Math.min(s + 1, STEPS.length - 1));
  };
  const toggle = (value: string) =>
    setA(prev => ({ ...prev, contents: prev.contents.includes(value) ? prev.contents.filter(v => v !== value) : [...prev.contents, value] }));

  const typeLabel = GIFT_TYPES.find(([id]) => id === a.type)?.[1] ?? '';
  const summary = [typeLabel, a.quantity && `${a.quantity} наб.`, a.budget, a.packaging, a.logo === 'да' ? 'с логотипом' : a.logo === 'нет' ? 'без логотипа' : '']
    .filter(Boolean).join(' · ');

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setStatus('sending');
    try {
      const res = await fetch(`${base}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          type: a.type,
          quantity: a.quantity,
          budget: a.budget === 'Пока не знаю' ? '' : a.budget.replace(' BYN', ''),
          logo: a.logo,
          contents: a.contents.join(', '),
          packaging: a.packaging,
          source: 'квиз',
          consentVersion: COMPANY.consentVersion,
          acceptedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      goal('quiz_submit');
    } catch {
      setStatus('error');
    }
  };

  const Option = ({ label, art, active, onClick }: { label: string; art?: string; active: boolean; onClick: () => void }) => (
    <button type="button" className={`q-opt${active ? ' on' : ''}`} aria-pressed={active} onClick={onClick}>
      {art && <img src={`${base}/${art}`} alt="" aria-hidden="true" />}
      <span>{label}</span>
    </button>
  );

  return (
    <dialog ref={dialog} className="quiz" aria-labelledby="quiz-title" onClick={e => e.target === e.currentTarget && dialog.current?.close()}>
      <div className="q-card">
        <div className="q-top">
          <span className="q-count">{status === 'sent' ? 'Готово' : `Шаг ${step + 1} из ${STEPS.length}`}</span>
          <button type="button" className="q-close" aria-label="Закрыть" onClick={() => dialog.current?.close()}>×</button>
        </div>
        <div className="q-bar" aria-hidden="true"><i style={{ width: `${status === 'sent' ? 100 : ((step + 1) / STEPS.length) * 100}%` }} /></div>

        {status === 'sent' ? (
          <div className="q-done">
            <img src={`${base}/kit/gift-box.webp`} alt="" aria-hidden="true" />
            <h2 id="quiz-title">Заявка у нас!</h2>
            <p>{summary}</p>
            <p className="q-muted">Свяжемся с вами и пришлём коммерческое предложение с составом, упаковкой и ценой.</p>
            <a className="btn btn-berry" href={`https://www.instagram.com/${COMPANY.instagram}/`} target="_blank" rel="noopener noreferrer">Примеры наборов в Instagram</a>
            <button type="button" className="btn btn-line" onClick={() => dialog.current?.close()}>Закрыть</button>
          </div>
        ) : (
          <>
            <h2 id="quiz-title" className="q-title">{STEPS[step]}</h2>

            {step === 0 && (
              <div className="q-grid q-3">
                {GIFT_TYPES.map(([id, label]) => <Option key={id} label={label} art={TYPE_ART[id]} active={a.type === id} onClick={() => pick('type', id)} />)}
              </div>
            )}

            {step === 1 && (
              <>
                <div className="q-grid q-4">{QUANTITIES.map(q => <Option key={q} label={q} active={a.quantity === q} onClick={() => pick('quantity', q)} />)}</div>
                <label className="q-own" htmlFor="q-qty">Или точное число
                  <input id="q-qty" type="number" inputMode="numeric" min={1} placeholder="35"
                    value={QUANTITIES.includes(a.quantity) ? '' : a.quantity} onChange={e => pick('quantity', e.target.value, false)} />
                </label>
              </>
            )}

            {step === 2 && (
              <>
                <div className="q-grid q-3">{BUDGETS.map(b => <Option key={b} label={b} active={a.budget === b} onClick={() => pick('budget', b)} />)}</div>
                <label className="q-own" htmlFor="q-budget">Или своя сумма, BYN
                  <input id="q-budget" type="text" inputMode="decimal" placeholder="45"
                    value={BUDGETS.includes(a.budget) ? '' : a.budget} onChange={e => pick('budget', e.target.value, false)} />
                </label>
              </>
            )}

            {step === 3 && (
              <>
                <p className="q-muted">Можно выбрать несколько. Алкоголь не кладём.</p>
                <div className="q-grid q-3">{CONTENTS.map(([c, art]) => <Option key={c} label={c} art={art} active={a.contents.includes(c)} onClick={() => toggle(c)} />)}</div>
              </>
            )}

            {step === 4 && (
              <div className="q-grid q-3">{PACKAGING.map(([p, art]) => <Option key={p} label={p} art={art} active={a.packaging === p} onClick={() => pick('packaging', p)} />)}</div>
            )}

            {step === 5 && (
              <div className="q-grid q-2">
                <Option label="Да, с логотипом" active={a.logo === 'да'} onClick={() => pick('logo', 'да')} />
                <Option label="Нет, без логотипа" active={a.logo === 'нет'} onClick={() => pick('logo', 'нет')} />
              </div>
            )}

            {step === 6 && (
              <form className="q-form" onSubmit={submit}>
                {summary && <p className="q-summary">{summary}</p>}
                <label htmlFor="q-name">Имя<input id="q-name" name="name" type="text" autoComplete="name" required maxLength={100} /></label>
                <label htmlFor="q-contact">Телефон или e-mail<input id="q-contact" name="contact" type="text" autoComplete="tel" required maxLength={100} placeholder="+375" /></label>
                <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <label className="q-check" htmlFor="q-c1">
                  <input id="q-c1" type="checkbox" name="consent_processing" value="да" required />
                  <span>Согласен(на) на <Link href="/consent" target="_blank">обработку персональных данных</Link>, с <Link href="/privacy" target="_blank">политикой</Link> ознакомлен(а).</span>
                </label>
                <label className="q-check" htmlFor="q-c2">
                  <input id="q-c2" type="checkbox" name="consent_transfer" value="да" required />
                  <span>Согласен(на) на <Link href="/consent#transfer" target="_blank">трансграничную передачу</Link> данных ({PROCESSORS.map(p => `${p.service.split(' ').pop()} — ${p.country}`).join('; ')}).</span>
                </label>
                <button type="submit" className="btn btn-berry" disabled={status === 'sending'}>{status === 'sending' ? 'Отправляем…' : 'Получить предложение'}</button>
                {status === 'error' && <p className="q-err" role="alert">Не отправилось. Позвоните: {COMPANY.phoneView}</p>}
              </form>
            )}

            <div className="q-nav">
              {step > 0 && <button type="button" className="q-back" onClick={() => setStep(s => s - 1)}>← Назад</button>}
              {[1, 2, 3].includes(step) && (
                <button type="button" className="btn btn-berry q-next" onClick={() => setStep(s => s + 1)}
                  disabled={(step === 1 && !a.quantity) || (step === 3 && a.contents.length === 0)}>
                  {step === 2 && !a.budget ? 'Пропустить' : 'Дальше'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
