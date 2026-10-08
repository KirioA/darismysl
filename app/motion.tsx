'use client';

import { useEffect } from 'react';

// One motion driver for the page: reveals [data-reveal] blocks as they enter the viewport
// and feeds scroll progress to the top-bar ribbon. Content stays visible without JS.
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');

    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -12% 0px' },
    );
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = root.scrollHeight - root.clientHeight;
        root.style.setProperty('--p', String(max > 0 ? root.scrollTop / max : 0));
        root.classList.toggle('scrolled', root.scrollTop > 8);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
