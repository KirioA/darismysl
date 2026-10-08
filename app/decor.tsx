export function Wordmark({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <span className={`wordmark${tone === 'dark' ? ' dark' : ''}`}>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="19" y="2" width="10" height="8" rx="2" fill="#e8b44a" />
        <circle cx="24" cy="28" r="18" fill="#b3121b" />
        <path d="M24 16l3.3 6.8 7.5 1-5.4 5.2 1.3 7.4L24 32.8l-6.7 3.6 1.3-7.4-5.4-5.2 7.5-1z" fill="#e8b44a" />
      </svg>
      <span>Дари<b>Смысл</b></span>
    </span>
  );
}
