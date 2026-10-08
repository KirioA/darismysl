import { GIFT_TYPES } from '../../lead-types';

// Sends a site request to the operator's Telegram chat.
// Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in the environment (see .env.example).

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return Response.json({ error: 'not configured' }, { status: 503 });

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

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Plain text, no parse_mode: user input cannot inject markup.
    body: JSON.stringify({ chat_id: chatId, text: lines.join('\n') }),
  });
  if (!res.ok) return Response.json({ error: 'telegram failed' }, { status: 502 });
  return Response.json({ ok: true });
}
