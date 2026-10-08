import { Sparkle } from './art';

// Purely decorative New Year elements: glowing bulb garland, falling snow, snow-drift divider.

const BULBS = [
  { fill: 'url(#bBulbRed)', glow: 'url(#gRed)' },
  { fill: 'url(#bBulbGold)', glow: 'url(#gGold)' },
  { fill: 'url(#bBulbGreen)', glow: 'url(#gGreen)' },
  { fill: 'url(#bBulbGold)', glow: 'url(#gGold)' },
];

const ARCS = 4;
const PER_ARC = 5;
const SPAN = 1440 / ARCS;
const TOP = 8;
const CTRL = 100;

// Wire and bulbs are computed from the same quadratic curve, so every bulb sits exactly on the wire.
function garland() {
  let wire = `M${-SPAN} ${TOP}`;
  for (let a = -1; a <= ARCS; a++) wire += ` Q${a * SPAN + SPAN / 2} ${CTRL} ${(a + 1) * SPAN} ${TOP}`;
  const bulbs: { x: number; y: number; i: number }[] = [];
  let i = 0;
  for (let a = 0; a < ARCS; a++) {
    const x0 = a * SPAN, x1 = x0 + SPAN, cx = x0 + SPAN / 2;
    for (let k = 0; k < PER_ARC; k++) {
      const t = (k + 0.5) / PER_ARC;
      const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t ** 2 * x1;
      const y = (1 - t) ** 2 * TOP + 2 * (1 - t) * t * CTRL + t ** 2 * TOP;
      bulbs.push({ x, y, i: i++ });
    }
  }
  return { wire, bulbs };
}

export function Garland({ className = '' }: { className?: string }) {
  const { wire, bulbs } = garland();
  return (
    <svg className={`garland ${className}`} viewBox="0 0 1440 150" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d={wire} fill="none" stroke="#1d1410" strokeWidth="4.5" strokeLinecap="round" />
      <path d={wire} fill="none" stroke="#6b4e34" strokeWidth="1.6" strokeLinecap="round" transform="translate(0 -1)" />
      {Array.from({ length: ARCS + 1 }, (_, a) => (
        <g key={a} transform={`translate(${a * SPAN} ${TOP})`}>
          <circle r="7" fill="#c8942a" />
          <circle r="3" fill="#6b4e34" />
        </g>
      ))}
      {bulbs.map(b => {
        const c = BULBS[b.i % BULBS.length];
        return (
          <g key={b.i} transform={`translate(${b.x.toFixed(1)} ${b.y.toFixed(1)})`}>
            <circle className={`halo ${b.i % 2 ? 'halo-b' : 'halo-a'}`} cx="0" cy="28" r="40" fill={c.glow} style={{ animationDelay: `${(b.i % 7) * 0.37}s` }} />
            <rect x="-5.5" y="-3" width="11" height="14" rx="2.5" fill="#2a2018" />
            <rect x="-5.5" y="2" width="11" height="2" fill="#6b4e34" />
            <rect x="-5.5" y="6" width="11" height="2" fill="#6b4e34" />
            <path className="bulb-glass" d="M-8.5 10 C-11 22 -12 31 0 40 C12 31 11 22 8.5 10 Z" fill={c.fill} style={{ animationDelay: `${(b.i % 7) * 0.37}s` }} />
            <ellipse cx="-3.5" cy="20" rx="2.4" ry="6" fill="#fff" opacity=".7" />
          </g>
        );
      })}
    </svg>
  );
}

// Deterministic values so server and client markup match.
const FLAKES = Array.from({ length: 38 }, (_, i) => ({
  left: (i * 29.7 + (i % 5) * 7) % 100,
  size: 3 + ((i * 7) % 6),
  dur: 11 + ((i * 5) % 9),
  delay: -((i * 3.1) % 18),
  sway: 12 + ((i * 11) % 28),
  opacity: 0.5 + ((i * 13) % 5) / 10,
}));

export function Snow({ className = '' }: { className?: string }) {
  return (
    <div className={`snow ${className}`} aria-hidden="true">
      {FLAKES.map((f, i) => (
        <i
          key={i}
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
            ['--sway' as string]: `${f.sway}px`,
          }}
        />
      ))}
    </div>
  );
}

export function Drift({ fill }: { fill: string }) {
  return (
    <svg className="drift" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 60 L0 30 C120 0 240 60 360 30 S600 0 720 30 S960 60 1080 30 S1320 0 1440 30 L1440 60 Z" fill={fill} />
    </svg>
  );
}

// Twinkling sparkles at fixed positions (percent of the container).
export function Sparkles({ points, className = '' }: { points: [number, number, number][]; className?: string }) {
  return (
    <div className={`sparkles ${className}`} aria-hidden="true">
      {points.map(([x, y, s], i) => (
        <Sparkle key={i} className="sparkle" style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${(i % 5) * 0.6}s` }} />
      ))}
    </div>
  );
}

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
