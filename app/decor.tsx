const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// Brand wordmark: the gift-with-heart-bow mark (public/logo.svg) + «ДариСмысл».
export function Wordmark({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <span className={`wordmark${tone === 'dark' ? ' dark' : ''}`}>
      <img src={`${base}/logo.svg`} alt="" aria-hidden="true" />
      <span>Дари<b>Смысл</b></span>
    </span>
  );
}
