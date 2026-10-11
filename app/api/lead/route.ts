import nodemailer from 'nodemailer';
import { GIFT_TYPES } from '../../lead-types';

// Sends a site request to the operator's Telegram chat and Gmail inbox, in parallel.
// Env (server: /etc/darismysl.env): TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID and/or
// GMAIL_USER + GMAIL_APP_PASSWORD (+ optional LEAD_EMAIL_TO, defaults to GMAIL_USER).
// The request counts as accepted when at least one configured channel delivered it.

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const hasTelegram = Boolean(token && chatId);
  const hasMail = Boolean(gmailUser && gmailPass);
  if (!hasTelegram && !hasMail) return Response.json({ error: 'not configured' }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'bad json' }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success so they do not retry.
  if (str(body.website, 200)) return Response.json({ ok: true });

  const name = str(body.name, 100);
  const contact = str(body.contact, 100);
  // Both consents are required by the form; reject requests that bypass it.
  if (!name || !contact || body.consent_processing !== 'да' || body.consent_transfer !== 'да') {
    return Response.json({ error: 'missing fields' }, { status: 400 });
  }

  const type = GIFT_TYPES.find(([id]) => id === body.type)?.[1] ?? '—';
  const lines = [
    'Новая заявка с сайта ДариСмысл',
    `Кому: ${type}`,
    `Наборов: ${str(body.quantity, 20) || '—'}`,
    `Бюджет на набор: ${str(body.budget, 40) || '—'} BYN`,
    `К дате: ${str(body.date, 20) || '—'}`,
    `Логотип: ${body.logo === 'да' ? 'да' : 'нет'}`,
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    `Компания: ${str(body.company, 150) || '—'}`,
    `Комментарий: ${str(body.message, 2000) || '—'}`,
    `Согласия: обработка и трансграничная передача, версия ${str(body.consentVersion, 20)}, ${str(body.acceptedAt, 40)}`,
  ];

  const text = lines.join('\n');
  const sends: Promise<unknown>[] = [];
  if (hasTelegram) {
    sends.push(
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Plain text, no parse_mode: user input cannot inject markup.
        body: JSON.stringify({ chat_id: chatId, text }),
      }).then(r => { if (!r.ok) throw new Error(`telegram ${r.status}`); }),
    );
  }
  if (hasMail) {
    const mailer = nodemailer.createTransport({ host: 'smtp.gmail.com', port: 465, secure: true, auth: { user: gmailUser, pass: gmailPass } });
    const quantity = str(body.quantity, 20);
    sends.push(
      mailer.sendMail({
        from: `"Сайт ДариСмысл" <${gmailUser}>`,
        to: process.env.LEAD_EMAIL_TO || gmailUser,
        // Header-safe subject: strip line breaks from user input.
        subject: `Заявка: ${type}${quantity ? `, ${quantity} наб.` : ''} — ${name}`.replace(/[\r\n]+/g, ' '),
        text,
        // "Reply" in Gmail goes straight to the client when they left an e-mail.
        replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) ? contact : undefined,
      }),
    );
  }

  const results = await Promise.allSettled(sends);
  results.forEach(r => { if (r.status === 'rejected') console.error('lead delivery failed:', String(r.reason)); });
  if (!results.some(r => r.status === 'fulfilled')) return Response.json({ error: 'delivery failed' }, { status: 502 });
  return Response.json({ ok: true });
}
