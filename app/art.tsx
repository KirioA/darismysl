// Decorative New Year illustrations (inline SVG, no external assets).
// Shared gradients live in <ArtDefs/>, rendered once per page.

type P = { className?: string; style?: React.CSSProperties };

export function ArtDefs() {
  const ball = (id: string, hi: string, mid: string, lo: string) => (
    <radialGradient id={id} cx="35%" cy="30%" r="80%">
      <stop offset="0" stopColor={hi} />
      <stop offset=".45" stopColor={mid} />
      <stop offset="1" stopColor={lo} />
    </radialGradient>
  );
  const glow = (id: string, c: string) => (
    <radialGradient id={id}>
      <stop offset="0" stopColor={c} stopOpacity=".95" />
      <stop offset=".3" stopColor={c} stopOpacity=".42" />
      <stop offset="1" stopColor={c} stopOpacity="0" />
    </radialGradient>
  );
  const lin = (id: string, a: string, b: string) => (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor={a} />
      <stop offset="1" stopColor={b} />
    </linearGradient>
  );
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {ball('bRed', '#ff6b6f', '#c4161c', '#6e0910')}
        {ball('bGold', '#fff0b0', '#e8b44a', '#9a6a14')}
        {ball('bGreen', '#6fcf9d', '#1f7a4d', '#0b3b25')}
        {ball('bBulbRed', '#ffd1c8', '#ff3b3b', '#a30f14')}
        {ball('bBulbGold', '#fffbe0', '#ffd24a', '#d28a10')}
        {ball('bBulbGreen', '#e1ffe9', '#3ddc84', '#128043')}
        {glow('gRed', '#ff3b3b')}
        {glow('gGold', '#ffc83d')}
        {glow('gGreen', '#3ddc84')}
        {glow('gWarm', '#ffb35c')}
        {lin('lRed', '#e0343b', '#8f0d14')}
        {lin('lRedLid', '#f0505a', '#b01720')}
        {lin('lGreen', '#2f9a66', '#0e4a2f')}
        {lin('lGreenLid', '#45b27c', '#1a6a44')}
        {lin('lCream', '#fffaf0', '#e8dcc4')}
        {lin('lCreamLid', '#ffffff', '#f1e6cf')}
        {lin('lGold', '#f6d98c', '#c8942a')}
        {lin('lNeedleA', '#2f8a5c', '#14543a')}
        {lin('lNeedleB', '#46a672', '#1f6b48')}
      </defs>
    </svg>
  );
}

const BOX = {
  red: { body: 'url(#lRed)', lid: 'url(#lRedLid)', rib: 'url(#lGold)' },
  green: { body: 'url(#lGreen)', lid: 'url(#lGreenLid)', rib: 'url(#lGold)' },
  cream: { body: 'url(#lCream)', lid: 'url(#lCreamLid)', rib: 'url(#lRed)' },
};

export function GiftBox({ tone = 'red', className, style }: P & { tone?: keyof typeof BOX }) {
  const c = BOX[tone];
  return (
    <svg className={className} style={style} viewBox="0 0 120 126" aria-hidden="true">
      <ellipse cx="60" cy="118" rx="50" ry="6" fill="#000" opacity=".16" />
      <rect x="12" y="54" width="96" height="62" rx="7" fill={c.body} />
      <rect x="52" y="54" width="16" height="62" fill={c.rib} />
      <rect x="6" y="38" width="108" height="22" rx="6" fill={c.lid} />
      <rect x="52" y="38" width="16" height="22" fill={c.rib} />
      <path d="M60 38 C40 4 14 14 26 30 C34 40 52 38 60 38 Z" fill={c.rib} />
      <path d="M60 38 C80 4 106 14 94 30 C86 40 68 38 60 38 Z" fill={c.rib} />
      <path d="M60 38 C44 18 30 20 34 28 C38 34 52 36 60 38 Z" fill="#000" opacity=".1" />
      <circle cx="60" cy="38" r="8" fill={c.rib} />
      <rect x="14" y="58" width="8" height="52" rx="4" fill="#fff" opacity=".14" />
    </svg>
  );
}

export function CandyCane({ className, style }: P) {
  const d = 'M16 150 V48 a26 26 0 0 1 52 0';
  return (
    <svg className={className} style={style} viewBox="0 0 84 156" aria-hidden="true">
      <path d={d} fill="none" stroke="#000" strokeOpacity=".14" strokeWidth="20" strokeLinecap="round" transform="translate(3 4)" />
      <path d={d} fill="none" stroke="#fffaf0" strokeWidth="18" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#d11a22" strokeWidth="18" strokeDasharray="11 13" strokeDashoffset="4" />
      <path d={d} fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="4" transform="translate(-4 0)" />
    </svg>
  );
}

export function WrappedCandy({ tone = 'red', className, style }: P & { tone?: 'red' | 'green' | 'gold' }) {
  const body = { red: 'url(#bRed)', green: 'url(#bGreen)', gold: 'url(#bGold)' }[tone];
  const wrap = { red: '#e8434b', green: '#2f9a66', gold: '#f2c35f' }[tone];
  return (
    <svg className={className} style={style} viewBox="0 0 100 60" aria-hidden="true">
      <path d="M26 30 L4 12 Q10 30 4 48 Z" fill={wrap} />
      <path d="M74 30 L96 12 Q90 30 96 48 Z" fill={wrap} />
      <path d="M26 30 L4 12 Q10 30 4 48 Z" fill="#fff" opacity=".18" />
      <ellipse cx="50" cy="30" rx="27" ry="21" fill={body} />
      <path d="M32 18 Q50 10 68 18" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 46 Q50 50 62 46" fill="none" stroke="#000" strokeOpacity=".15" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function spiral() {
  const pts: string[] = [];
  for (let i = 0; i <= 90; i++) {
    const a = i * 0.28;
    const r = 1.2 + a * 1.32;
    pts.push(`${(35 + Math.cos(a) * r).toFixed(1)} ${(35 + Math.sin(a) * r).toFixed(1)}`);
  }
  return `M${pts.join(' L')}`;
}

export function Lollipop({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 70 140" aria-hidden="true">
      <rect x="32" y="60" width="6" height="76" rx="3" fill="#f3ead8" />
      <circle cx="35" cy="35" r="31" fill="#000" opacity=".12" transform="translate(2 3)" />
      <circle cx="35" cy="35" r="31" fill="#fffaf0" />
      <path d={spiral()} fill="none" stroke="#d11a22" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="35" cy="35" r="31" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
      <path d="M16 20 Q22 10 32 7" fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Sparkle({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="-12 -12 24 24" aria-hidden="true">
      <path d="M0 -11 Q1 -1.5 11 0 Q1 1.5 0 11 Q-1 1.5 -11 0 Q-1 -1.5 0 -11Z" fill="currentColor" />
    </svg>
  );
}

export function Star({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 3l5.6 14 15 1.2-11.4 9.8 3.6 14.8L24 34.4 11.2 42.8l3.6-14.8L3.4 18.2l15-1.2z" fill="url(#lGold)" stroke="#b9821f" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function Snowflake({ className, style }: P) {
  const arm = (
    <g>
      <path d="M0 0 V-40 M0 -14 L-8 -22 M0 -14 L8 -22 M0 -27 L-6 -33 M0 -27 L6 -33" />
    </g>
  );
  return (
    <svg className={className} style={style} viewBox="-44 -44 88 88" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {[0, 60, 120, 180, 240, 300].map(a => (
          <g key={a} transform={`rotate(${a})`}>{arm}</g>
        ))}
      </g>
    </svg>
  );
}

// Fir branch growing to the right; flip with CSS for the other side.
export function FirBranch({ className, style, baubles = true }: P & { baubles?: boolean }) {
  const needles: React.ReactNode[] = [];
  const stem = (t: number) => ({ x: 14 + t * 300, y: 80 - Math.sin(t * Math.PI) * 14 });
  const n = 17;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const { x, y } = stem(t);
    const len = 52 - t * 28;
    [-1, 1].forEach(side => {
      [0, 1, 2].forEach(k => {
        const rad = ((side * (32 + k * 20)) * Math.PI) / 180;
        const l = len * (1 - k * 0.13);
        const ex = x + Math.cos(rad) * l;
        const ey = y + Math.sin(rad) * l;
        needles.push(
          <path
            key={`${i}-${side}-${k}`}
            d={`M${x.toFixed(1)} ${y.toFixed(1)} L${ex.toFixed(1)} ${ey.toFixed(1)}`}
            stroke={k % 2 ? '#2f8a5c' : '#17603f'}
            strokeWidth={7.5 - t * 2.5}
            strokeLinecap="round"
            fill="none"
          />,
        );
      });
    });
  }
  return (
    <svg className={className} style={style} viewBox="0 0 340 160" aria-hidden="true">
      <path d="M0 80 Q150 52 318 78" fill="none" stroke="#5a3a22" strokeWidth="5" strokeLinecap="round" />
      {needles}
      {baubles && (
        <>
          <g>
            <rect x="82" y="40" width="8" height="7" rx="1.5" fill="#e8b44a" />
            <circle cx="86" cy="58" r="13" fill="url(#bRed)" />
            <ellipse cx="82" cy="53" rx="3.5" ry="2.2" fill="#fff" opacity=".6" />
          </g>
          <g>
            <rect x="176" y="92" width="8" height="7" rx="1.5" fill="#e8b44a" />
            <circle cx="180" cy="110" r="12" fill="url(#bGold)" />
            <ellipse cx="176" cy="105" rx="3.2" ry="2" fill="#fff" opacity=".7" />
          </g>
          <g fill="#d11a22">
            <circle cx="238" cy="64" r="5" />
            <circle cx="248" cy="70" r="5" />
            <circle cx="241" cy="75" r="5" />
          </g>
        </>
      )}
      <g fill="#fff" opacity=".9">
        <ellipse cx="60" cy="52" rx="9" ry="3" />
        <ellipse cx="130" cy="44" rx="10" ry="3" />
        <ellipse cx="210" cy="50" rx="9" ry="3" />
        <ellipse cx="270" cy="58" rx="8" ry="2.6" />
      </g>
    </svg>
  );
}

// ----- Line icons (gold, 64×64) -----
const ico = { fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export function IconForm({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g {...ico}>
        <rect x="14" y="10" width="30" height="44" rx="4" />
        <path d="M21 22h16M21 30h16M21 38h9" />
        <path d="M50 24l-14 15-2 8 8-2 14-15z" />
      </g>
    </svg>
  );
}
export function IconCandy({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g {...ico}>
        <ellipse cx="32" cy="32" rx="14" ry="11" />
        <path d="M18 32L6 22v20zM46 32l12-10v20z" />
        <path d="M24 26q8-4 16 0" />
      </g>
    </svg>
  );
}
export function IconCheck({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g {...ico}>
        <circle cx="32" cy="32" r="22" />
        <path d="M21 33l8 8 15-17" />
      </g>
    </svg>
  );
}
export function IconBox({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g {...ico}>
        <rect x="10" y="26" width="44" height="28" rx="3" />
        <rect x="7" y="18" width="50" height="10" rx="3" />
        <path d="M32 18v36" />
        <path d="M32 18c-6-12-18-10-14-4 2 3 9 4 14 4zM32 18c6-12 18-10 14-4-2 3-9 4-14 4z" />
      </g>
    </svg>
  );
}
export function IconStack({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g {...ico}>
        <rect x="8" y="36" width="22" height="18" rx="2" />
        <rect x="34" y="36" width="22" height="18" rx="2" />
        <rect x="21" y="14" width="22" height="18" rx="2" />
        <path d="M19 36v18M45 36v18M32 14v18" />
      </g>
    </svg>
  );
}
export function IconTruck({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g {...ico}>
        <path d="M6 18h30v28H6zM36 28h12l10 10v8H36z" />
        <circle cx="18" cy="48" r="5" fill="#0f3b2d" />
        <circle cx="46" cy="48" r="5" fill="#0f3b2d" />
      </g>
    </svg>
  );
}
export function IconDoc({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g {...ico}>
        <path d="M16 8h22l12 12v36H16z" />
        <path d="M38 8v12h12" />
        <path d="M24 30h18M24 38h18M24 46h10" />
      </g>
    </svg>
  );
}
export function IconCart({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g {...ico}>
        <path d="M8 12h8l6 28h28l5-20H18" />
        <circle cx="26" cy="50" r="3.5" />
        <circle cx="46" cy="50" r="3.5" />
      </g>
    </svg>
  );
}
export function IconBow({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g {...ico}>
        <path d="M32 32C20 14 6 18 10 28c3 8 16 6 22 4zM32 32c12-18 26-14 22-4-3 8-16 6-22 4z" />
        <circle cx="32" cy="32" r="4" />
        <path d="M30 36L22 54M34 36l8 18" />
      </g>
    </svg>
  );
}
