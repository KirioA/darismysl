'use client';

import Link from 'next/link';
import { useState } from 'react';
import { COMPANY } from './company';

export default function LeadForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Proof of consent: the operator must be able to prove it (Law No. 99-Z, art. 5),
    // so the version and time of the accepted text travel with every request.
    const consent = {
      version: COMPANY.consentVersion,
      acceptedAt: new Date().toISOString(),
      processing: true,
      crossBorderTransfer: true,
    };
    void consent;
    // TODO: отправка заявки пока не подключена (настроим позже: почта / Telegram / CRM).
    setSent(true);
  };

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <label>
        <span>Ваше имя</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label>
        <span>Телефон или e-mail</span>
        <input name="contact" type="text" autoComplete="tel" required />
      </label>
      <label>
        <span>Компания</span>
        <input name="company" type="text" autoComplete="organization" />
      </label>
      <label className="wide">
        <span>Что нужно: количество наборов, бюджет, срок</span>
        <textarea name="message" rows={4} />
      </label>

      <div className="wide operator-note">
        <strong>Кому и зачем вы передаёте данные.</strong> Оператор: {COMPANY.name}, УНП {COMPANY.unp}, {COMPANY.address}.
        Цель: рассмотрение заявки и связь с вами. Данные: имя, телефон или e-mail, компания, текст заявки. Срок согласия: 1 год.
        Согласие можно отозвать в любой момент.
      </div>

      <label className="wide check">
        <input type="checkbox" name="consent_processing" required />
        <span>
          Даю <Link href="/consent" target="_blank">согласие на обработку моих персональных данных</Link> для рассмотрения заявки и связи со мной.
          С <Link href="/privacy" target="_blank">Политикой в отношении обработки персональных данных</Link> ознакомлен(а).
        </span>
      </label>
      <label className="wide check">
        <input type="checkbox" name="consent_transfer" required />
        <span>
          Даю согласие на <Link href="/consent#transfer" target="_blank">трансграничную передачу</Link> моих данных в США (почтовый сервис Gmail, Google LLC)
          и ознакомлен(а) с рисками такой передачи.
        </span>
      </label>
      <p className="wide check-hint">Без обеих отметок заявка не принимается. Вы всегда можете позвонить: {COMPANY.phoneView}.</p>

      <div className="wide form-actions">
        <button type="submit">Отправить заявку</button>
      </div>
      <p className="wide form-status" role="status" aria-live="polite">
        {sent ? 'Спасибо! Мы получили вашу заявку и скоро свяжемся с вами.' : ''}
      </p>
    </form>
  );
}
