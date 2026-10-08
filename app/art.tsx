// Line icons (inline SVG, stroke = currentColor).

type P = { className?: string; style?: React.CSSProperties };

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
