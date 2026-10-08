'use client';

import { useEffect, useRef } from 'react';
import gazeFrames from './gaze-frames.json';

const TAU = Math.PI * 2;
const wrappedAngle = (angle: number) => (angle % TAU + TAU) % TAU;

// These angles were measured from the actual pupil positions in the clip's
// first complete orbit. Match direction, rather than assuming constant speed.
function timeForAngle(angle: number) {
  const target = wrappedAngle(angle);
  let nearestTime = gazeFrames[0][1];
  let nearestDistance = Infinity;
  for (const [sampleAngle, time] of gazeFrames) {
    const difference = Math.abs(target - sampleAngle);
    const distance = Math.min(difference, TAU - difference);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestTime = time;
    }
  }
  return nearestTime + 1 / 240;
}

// Santa hat drawn in the video's own 1920 × 1080 pixel space; the stage is
// scaled with the same object-fit: cover factor as the video.
function Hat() {
  return (
    <svg className="hat" viewBox="0 0 1920 1080" aria-hidden="true">
      <defs>
        <filter id="fuzz" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="9" />
        </filter>
        <linearGradient id="felt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d3202a" />
          <stop offset="1" stopColor="#9b0f17" />
        </linearGradient>
      </defs>
      <g filter="url(#fuzz)">
        <path d="M792 300 C802 248 870 192 974 184 C1070 178 1150 206 1214 268 L1142 300 Z" fill="url(#felt)" />
        <path d="M1060 192 C1130 200 1184 232 1214 268 L1142 300 L1060 300 C1100 266 1100 228 1060 192 Z" fill="#7d0b12" opacity=".35" />
        <g transform="rotate(-2.5 962 304)">
          <rect x="738" y="274" width="448" height="62" rx="31" fill="#fffdf8" />
          <rect x="738" y="274" width="448" height="62" rx="31" fill="none" stroke="#efe6d6" strokeWidth="4" />
        </g>
        <circle cx="1220" cy="278" r="42" fill="#fffdf8" />
        <circle cx="1208" cy="266" r="13" fill="#fff" opacity=".7" />
      </g>
    </svg>
  );
}

export default function FooterBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current!;
    const stage = stageRef.current!;
    let frame = 0;
    let desiredTime = 0;
    let pointer: { x: number; y: number } | null = null;
    let disposed = false;
    const mobile = window.matchMedia('(max-width: 700px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const fitStage = () => {
      const rect = video.getBoundingClientRect();
      stage.style.setProperty('--s', String(Math.max(rect.width / 1920, rect.height / 1080)));
    };
    const resizeObserver = new ResizeObserver(fitStage);
    resizeObserver.observe(video);
    fitStage();

    const seek = () => {
      frame = 0;
      if (disposed || mobile.matches || video.readyState < 2 || video.seeking) return;
      if (Math.abs(video.currentTime - desiredTime) > 1 / 48) {
        video.currentTime = Math.min(desiredTime, video.duration - 1 / 24);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(seek);
    };
    const updateTarget = () => {
      if (mobile.matches || !pointer) return;
      const rect = video.getBoundingClientRect();
      const scale = Math.max(rect.width / 1920, rect.height / 1080);
      // Match the exact object-fit: cover positioning, including mobile crops.
      const eyeX = rect.left + rect.width / 2 + (948 - 960) * scale;
      const eyeY = rect.top + rect.height / 2 + (418 - 540) * scale;
      const dx = pointer.x - eyeX;
      const dy = pointer.y - eyeY;
      // Avoid unstable angles directly between the eyes.
      if (Math.hypot(dx, dy) > 8) {
        desiredTime = timeForAngle(Math.atan2(dy, dx));
        schedule();
      }
    };
    const move = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      updateTarget();
    };
    const ready = () => {
      video.loop = mobile.matches;
      if (mobile.matches && !reducedMotion.matches) {
        void video.play().catch(() => { /* Keep the first frame if autoplay is unavailable. */ });
      } else {
        video.pause();
        if (!mobile.matches) { updateTarget(); schedule(); }
      }
    };
    // Coalesce fast pointer movements while a frame is decoding. When it
    // finishes, seek immediately to the latest requested gaze direction.
    video.addEventListener('seeked', schedule);
    video.addEventListener('loadeddata', ready);
    mobile.addEventListener('change', ready);
    reducedMotion.addEventListener('change', ready);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('resize', updateTarget);
    window.addEventListener('scroll', updateTarget, { passive: true });
    if (video.readyState >= 2) ready();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      video.removeEventListener('seeked', schedule);
      video.removeEventListener('loadeddata', ready);
      mobile.removeEventListener('change', ready);
      reducedMotion.removeEventListener('change', ready);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('resize', updateTarget);
      window.removeEventListener('scroll', updateTarget);
    };
  }, []);

  return (
    <div className="footer-background" aria-hidden="true">
      {/* Phones only loop the clip, so they get a light encode; desktop needs the all-intra file for instant seeks. */}
      <video ref={videoRef} muted playsInline preload="auto" poster="/hero-poster.jpg">
        <source src="/hero-loop.mp4" type="video/mp4" media="(max-width: 700px)" />
        <source src="/footer-scrub.mp4" type="video/mp4" />
      </video>
      <div className="stage" ref={stageRef}><Hat /></div>
    </div>
  );
}
