'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Calm motion: smooth scroll and short reveals (y 16, 0.6s); only the mascot moves on its own.
// Content is visible without JS; reduced motion keeps only the nav behaviour.
export default function Motion() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.nav')!;
    const navTrigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => {
        nav.classList.toggle('hide', self.direction === 1 && self.scroll() > 400);
        nav.classList.toggle('scrolled', self.scroll() > 8);
      },
    });

    const mm = gsap.matchMedia();
    let lenis: Lenis | null = null;

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      lenis = new Lenis({ lerp: 0.1, anchors: { offset: -90 } });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      gsap.from('.hero-title .split, .hero-lead, .hero-actions, .parcel', { y: 16, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out', delay: 0.1 });

      gsap.utils.toArray<HTMLElement>('[data-rise]').forEach(el => {
        gsap.from(el, { y: 16, opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      });

      return () => {
        gsap.ticker.remove(raf);
        lenis?.destroy();
        lenis = null;
      };
    });

    // Deep links like ?type=kids#contact: scroll once fonts have settled the layout.
    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
      const target = location.hash.length > 1 ? document.querySelector<HTMLElement>(location.hash) : null;
      if (target) {
        if (lenis) lenis.scrollTo(target, { immediate: true, offset: -90, force: true });
        else target.scrollIntoView();
      }
    });

    return () => {
      mm.revert();
      navTrigger.kill();
    };
  }, []);

  return null;
}
