'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Calm motion: smooth scroll, a soft hero entrance and gentle reveals.
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

      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
      SplitText.create('.hero-title .split', {
        type: 'words',
        mask: 'words',
        onSplit: self => { intro.from(self.words, { yPercent: 100, duration: 1.1, stagger: 0.06 }, 0); },
      });
      intro
        .from('.hero-lead, .hero-actions', { y: 20, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.35)
        .from('.parcel', { y: 40, opacity: 0, duration: 1.2 }, 0.2);

      gsap.utils.toArray<HTMLElement>('[data-rise]').forEach(el => {
        gsap.from(el, { y: 32, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
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
