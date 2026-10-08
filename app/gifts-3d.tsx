'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Low-poly holiday models by Kenney (Holiday Kit, CC0), served from /public/models.
type Item = { model: string; x: number; y: number; z: number; s: number; ry: number };

export const SCENES: Record<'corporate' | 'kids', Item[]> = {
  corporate: [
    { model: 'present-a-cube', x: -0.9, y: -0.15, z: 0.3, s: 1.5, ry: 0.5 },
    { model: 'present-b-rectangle', x: 0.75, y: -0.25, z: -0.2, s: 1.4, ry: -0.6 },
    { model: 'present-a-round', x: 0.05, y: 0.35, z: -0.8, s: 1.1, ry: 0.2 },
    { model: 'candy-cane-red', x: 1.3, y: 0.1, z: 0.4, s: 1.3, ry: -0.3 },
  ],
  kids: [
    { model: 'gingerbread-man', x: -0.85, y: -0.2, z: 0.3, s: 1.6, ry: 0.4 },
    { model: 'present-b-round', x: 0.6, y: -0.25, z: -0.1, s: 1.3, ry: -0.5 },
    { model: 'sock-red-cane', x: 1.3, y: 0.15, z: -0.6, s: 1.2, ry: -0.2 },
    { model: 'candy-cane-green', x: -1.4, y: 0.1, z: -0.4, s: 1.2, ry: 0.6 },
  ],
};

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const loader = new GLTFLoader();
const cache = new Map<string, Promise<THREE.Group>>();
const load = (name: string) => {
  if (!cache.has(name)) cache.set(name, loader.loadAsync(`${base}/models/${name}.glb`).then(g => g.scene));
  return cache.get(name)!.then(s => s.clone(true));
};

export default function Gifts3D({ scene }: { scene: keyof typeof SCENES }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current!;
    const card = el.closest<HTMLElement>('.gift-card');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    el.appendChild(renderer.domElement);

    const scn = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    camera.position.set(0, 0.8, 4.6);
    camera.lookAt(0, 0.2, 0);
    scn.add(new THREE.HemisphereLight(0xffffff, 0xdfe6e1, 2.2));
    const sun = new THREE.DirectionalLight(0xfff4e0, 2.4);
    sun.position.set(3, 5, 4);
    scn.add(sun);

    const rig = new THREE.Group();
    scn.add(rig);
    const items: { obj: THREE.Object3D; item: Item; phase: number }[] = [];
    SCENES[scene].forEach((item, i) => {
      load(item.model).then(obj => {
        obj.scale.setScalar(item.s * 1.35);
        obj.position.set(item.x, item.y, item.z);
        obj.rotation.y = item.ry;
        rig.add(obj);
        items.push({ obj, item, phase: i * 1.7 });
        if (still) render();
      });
    });

    const size = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(() => { size(); if (still) render(); });
    ro.observe(el);
    size();

    // Pointer target (−1..1) eased every frame; scroll offset from the card's position.
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = THREE.MathUtils.clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1.5, 1.5);
      target.y = THREE.MathUtils.clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1.5, 1.5);
    };
    const onLeave = () => { target.x = 0; target.y = 0; };

    const clock = new THREE.Clock();
    const render = () => {
      const t = clock.getElapsedTime();
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      const r = el.getBoundingClientRect();
      const scroll = still ? 0 : (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      rig.rotation.y = cur.x * 0.35;
      rig.rotation.x = cur.y * 0.15;
      for (const { obj, item, phase } of items) {
        // Nearer models (larger z) move more: depth parallax for cursor and scroll.
        const depth = 1 + item.z * 0.6;
        obj.position.x = item.x + cur.x * 0.12 * depth;
        obj.position.y = item.y + (still ? 0 : Math.sin(t * 1.2 + phase) * 0.08) - scroll * 0.5 * depth;
        obj.rotation.y = item.ry + (still ? 0 : Math.sin(t * 0.8 + phase) * 0.18) + cur.x * 0.3 * depth;
        obj.rotation.z = still ? 0 : Math.sin(t + phase) * 0.06;
      }
      renderer.render(scn, camera);
      if (card) {
        card.style.setProperty('--rx', `${(-cur.y * 4).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(cur.x * 6).toFixed(2)}deg`);
      }
    };

    // Run the loop only while the card is on screen.
    let frame = 0;
    const loop = () => { render(); frame = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(frame);
      if (e.isIntersecting && !still) loop();
    });
    io.observe(el);

    if (!still) {
      (card ?? el).addEventListener('pointermove', onMove, { passive: true });
      card?.addEventListener('pointerleave', onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      (card ?? el).removeEventListener('pointermove', onMove);
      card?.removeEventListener('pointerleave', onLeave);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [scene]);

  return <div className="gift-stage" ref={host} aria-hidden="true" />;
}
