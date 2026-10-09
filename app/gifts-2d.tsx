'use client';

import { useEffect, useRef } from 'react';

// Our own flat stickers (public/kit) layered with depth: they bob, follow the cursor
// (nearer layers move more) and drift with the scroll; the card tilts toward the cursor.
type Item = { src: string; x: number; y: number; h: number; r: number; d: number };

export const SCENES: Record<'corporate' | 'kids', Item[]> = {
  corporate: [
    { src: 'bell', x: 70, y: 10, h: 44, r: 10, d: 0.5 },
    { src: 'cocoa-mug', x: 4, y: 30, h: 50, r: -8, d: 0.8 },
    { src: 'gift-box', x: 36, y: 18, h: 74, r: 0, d: 1.2 },
    { src: 'candy-cane', x: 78, y: 40, h: 54, r: 14, d: 1.5 },
  ],
  kids: [
    { src: 'snowflake', x: 72, y: 6, h: 34, r: 0, d: 0.4 },
    { src: 'tangerine', x: 6, y: 46, h: 36, r: -10, d: 1.4 },
    { src: 'gingerbread', x: 34, y: 16, h: 76, r: -4, d: 1.1 },
    { src: 'mitten', x: 70, y: 34, h: 56, r: 12, d: 0.8 },
  ],
};

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function Gifts2D({ scene }: { scene: keyof typeof SCENES }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current!;
    const card = el.closest<HTMLElement>('.gift-card') ?? el;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onLeave = () => { target.x = 0; target.y = 0; };
    let frame = 0, running = false;
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      const r = el.getBoundingClientRect();
      const scroll = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      el.style.setProperty('--mx', cur.x.toFixed(3));
      el.style.setProperty('--my', cur.y.toFixed(3));
      el.style.setProperty('--sc', scroll.toFixed(3));
      card.style.setProperty('--rx', `${(-cur.y * 4).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${(cur.x * 6).toFixed(2)}deg`);
      frame = requestAnimationFrame(loop);
    };
    // Only animate while the card is on screen.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; loop(); }
      else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(frame); }
    });
    io.observe(el);
    card.addEventListener('pointermove', onMove, { passive: true });
    card.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="gift-stage" ref={host} aria-hidden="true">
      {SCENES[scene].map((it, i) => (
        <img key={it.src} className="gift-sticker" src={`${base}/kit/${it.src}.webp`} alt=""
          style={{ left: `${it.x}%`, top: `${it.y}%`, height: `${it.h}%`, '--r': `${it.r}deg`, '--d': it.d, animationDelay: `${-i * 1.3}s` } as React.CSSProperties} />
      ))}
    </div>
  );
}
