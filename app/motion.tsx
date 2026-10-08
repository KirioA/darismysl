'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Page motion, one grammar: the parcel is packed, stamped and shipped.
// Everything is visible without JS; with reduced motion only the nav behaviour runs.
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const nav = document.querySelector<HTMLElement>('.nav')!;
    const wipe = document.querySelector<HTMLElement>('.wipe')!;

    // Nav: hide while scrolling down, show on the way up; ribbon shows page progress.
    const navTrigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => {
        nav.classList.toggle('hide', self.direction === 1 && self.scroll() > 400);
        nav.classList.toggle('scrolled', self.scroll() > 8);
        root.style.setProperty('--p', self.progress.toFixed(4));
      },
    });

    const mm = gsap.matchMedia();
    let lenis: Lenis | null = null;

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Smooth scroll driven by GSAP's ticker so ScrollTrigger stays in sync.
      lenis = new Lenis({ lerp: 0.1, anchors: { offset: -90 } });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // Intro: berry circle opens on the page, then the hero assembles.
      const intro = gsap.timeline({ delay: 0.1 });
      intro
        .fromTo(wipe, { clipPath: 'circle(150% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)', duration: 1, ease: 'power4.inOut' })
        .set(wipe, { display: 'none' });

      SplitText.create('.hero-title .split', {
        type: 'words,chars',
        mask: 'chars',
        onSplit: self => {
          intro.from(self.chars, { yPercent: 110, rotate: 8, duration: 0.9, stagger: 0.022, ease: 'expo.out' }, 0.55);
        },
      });
      intro
        .from('.h1-pill', { scale: 0, rotate: -25, duration: 0.8, ease: 'back.out(2)' }, 0.95)
        .from('.hero-lead, .hero-actions', { y: 26, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' }, 1.05)
        .from('.parcel-box', { y: -120, rotate: -8, opacity: 0, duration: 1.1, ease: 'bounce.out' }, 0.7)
        .from('.parcel-ribbon-h', { scaleX: 0, transformOrigin: 'left', duration: 0.5, ease: 'power3.out' }, 1.6)
        .from('.parcel-ribbon-v, .parcel-ribbon-top', { scaleY: 0, transformOrigin: 'top', duration: 0.4, ease: 'power3.out' }, 1.75)
        .from('.parcel-bow', { scale: 0, rotate: -40, duration: 0.6, ease: 'back.out(2.4)' }, 2)
        .from('.parcel-tag', { y: 40, rotate: 14, opacity: 0, duration: 0.7, ease: 'back.out(1.6)' }, 1.9)
        .from('.stamp-hero', { scale: 2.6, rotate: -180, opacity: 0, duration: 0.8, ease: 'back.out(1.8)' }, 2.2);

      // Hero decor drifts against the cursor, each piece at its own depth.
      const floaters = gsap.utils.toArray<HTMLElement>('.floater').map(el => ({
        depth: Number(el.dataset.depth),
        x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3.out' }),
      }));
      const onMove = (e: PointerEvent) => {
        const dx = e.clientX / window.innerWidth - 0.5;
        const dy = e.clientY / window.innerHeight - 0.5;
        floaters.forEach(f => { f.x(dx * -60 * f.depth); f.y(dy * -40 * f.depth); });
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      intro.from('.floater', { scale: 0, opacity: 0, rotate: -90, duration: 0.8, stagger: 0.08, ease: 'back.out(2)' }, 1.2);

      // Giant outlined words slide sideways with the scroll.
      gsap.utils.toArray<HTMLElement>('.marquee').forEach(m => {
        const dir = Number(m.dataset.dir);
        gsap.fromTo(m.querySelector('span'), { xPercent: dir > 0 ? 0 : -33 }, { xPercent: dir > 0 ? -33 : 0, ease: 'none', scrollTrigger: { trigger: m, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      // Parallax: the parcel floats slower than the copy.
      gsap.to('.parcel', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

      // Section headings: characters rise from a mask as they enter.
      document.querySelectorAll<HTMLElement>('.title.split').forEach(h => {
        SplitText.create(h, {
          type: 'words,chars',
          mask: 'words',
          onSplit: self => gsap.from(self.chars, {
            yPercent: 115, rotate: 6, duration: 1, stagger: 0.016, ease: 'expo.out',
            scrollTrigger: { trigger: h, start: 'top 85%' },
          }),
        });
      });

      // Generic rise for blocks.
      gsap.utils.toArray<HTMLElement>('[data-rise]').forEach(el => {
        gsap.from(el, { y: 60, rotate: 1.2, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });

      // Waybill reel: pinned horizontal travel on wide screens, stacked cards on phones.
      const reel = gsap.matchMedia();
      reel.add('(min-width: 1001px)', () => {
        const track = document.querySelector<HTMLElement>('.reel-track')!;
        const distance = () => track.scrollWidth - window.innerWidth + 48;
        const travel = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: { trigger: '.reel', start: 'top top', end: () => '+=' + distance(), pin: '.reel-pin', scrub: 1, invalidateOnRefresh: true, refreshPriority: 1 },
        });
        gsap.to('.reel-bar i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.reel', start: 'top top', end: () => '+=' + distance(), scrub: true } });
        gsap.utils.toArray<HTMLElement>('.reel-card').forEach(card => {
          gsap.from(card, { rotate: 4, scale: 0.9, opacity: 0.35, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: travel, start: 'left right', end: 'center center', scrub: true } });
          // Cards already on screen when the reel pins get their stamp as the section arrives.
          const onScreen = card.offsetLeft + card.offsetWidth / 2 < window.innerWidth * 0.8;
          gsap.from(card.querySelector('.stamp'), {
            scale: 2.4, rotate: -40, opacity: 0, duration: 0.5, ease: 'back.out(2)',
            delay: onScreen ? 0.3 + card.offsetLeft / 2000 : 0,
            scrollTrigger: onScreen ? { trigger: '.reel', start: 'top 40%' } : { trigger: card, containerAnimation: travel, start: 'left 75%' },
          });
        });
      });
      reel.add('(max-width: 1000px)', () => {
        gsap.utils.toArray<HTMLElement>('.reel-card').forEach(card => {
          gsap.from(card, { y: 50, opacity: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 88%' } });
          gsap.from(card.querySelector('.stamp'), { scale: 2.4, rotate: -40, opacity: 0, duration: 0.5, delay: 0.3, ease: 'back.out(2)', scrollTrigger: { trigger: card, start: 'top 80%' } });
        });
      });

      // Candy wrappers swing in from opposite sides.
      gsap.utils.toArray<HTMLElement>('.wrapper').forEach((w, i) => {
        gsap.from(w, { x: i ? 140 : -140, rotate: i ? 10 : -10, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: w, start: 'top 85%' } });
      });

      return () => {
        window.removeEventListener('pointermove', onMove);
        reel.revert();
        gsap.ticker.remove(raf);
        lenis?.destroy();
        lenis = null;
      };
    });

    // Without the intro the wipe must never cover the page.
    mm.add('(prefers-reduced-motion: reduce)', () => { wipe.style.display = 'none'; });

    // Fonts change glyph metrics: re-measure once they are in. Pins shift the layout,
    // so a deep link like ?type=kids#contact is honoured only after that.
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
