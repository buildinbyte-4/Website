'use client';

import { useEffect, useRef, useState } from 'react';

const FLIGHT_PATH = 'M974 1410 C1080 1370 1098 1240 1030 1228 C946 1210 989 1387 1115 1318 C1190 1280 1225 1190 1240 1145';

export default function BrandIntro() {
  const [finished, setFinished] = useState(false);
  const trail = useRef(null);
  const plane = useRef(null);

  useEffect(() => {
    if (finished) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) { setFinished(true); return; }
    const content = document.getElementById('site-content');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (content) content.inert = true;
    let frame;
    let start;
    // Always release the page even when the logo cannot load or animation fails.
    const timeout = window.setTimeout(() => setFinished(true), 2800);
    const stop = () => setFinished(true);
    const onKey = event => { if (event.key === 'Escape') stop(); };
    media.addEventListener('change', stop);
    document.addEventListener('keydown', onKey);
    const path = trail.current;
    const length = path.getTotalLength();
    const animate = timestamp => {
      if (start === undefined) start = timestamp;
      const progress = Math.min((timestamp - start) / 2200, 1);
      const distance = length * (progress * progress * (3 - 2 * progress));
      const point = path.getPointAtLength(distance);
      const before = path.getPointAtLength(Math.max(0, distance - 1));
      const after = path.getPointAtLength(Math.min(length, distance + 1));
      const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI + 90;
      plane.current.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle}) scale(${0.22 + progress * 0.55})`);
      path.style.strokeDashoffset = String(1 - progress);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      media.removeEventListener('change', stop);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      if (content) content.inert = false;
    };
  }, [finished]);

  if (finished) return null;

  return (
    <div className="brand-intro" aria-label="BuildInByte introduction">
      <svg className="brand-intro-art" viewBox="240 320 1185 1185" aria-hidden="true">
        <defs><clipPath id="intro-art-interior"><circle cx="835" cy="912" r="542" /></clipPath></defs>
        <image href="/brand-source.png" width="1600" height="1600" />
        {/* Clear only the original stationary plane and trail for the moving layers. */}
        <path d="M1106 1094 L1318 789 L1364 1072 L1280 1072 L1269 1130 L1196 1080 Z" fill="white" clipPath="url(#intro-art-interior)" />
        <path d={FLIGHT_PATH} stroke="white" strokeWidth="42" fill="none" strokeLinecap="round" />
        <path d={FLIGHT_PATH} stroke="#111110" strokeOpacity="0.12" strokeWidth="6" strokeDasharray="15 17" fill="none" />
        <path ref={trail} d={FLIGHT_PATH} pathLength="1" className="brand-flight-trail" stroke="#111110" strokeWidth="6" fill="none" strokeLinecap="round" />
        <g ref={plane} transform="translate(974 1410) scale(.22)">
          <path d="M0 -150 L-112 90 L-35 65 L10 112 L24 60 L94 60 Z M0 -150 L-35 65 L10 112 L24 60 Z M24 60 L0 -150" fill="white" stroke="#111110" strokeWidth="6" strokeLinejoin="round" />
        </g>
      </svg>
      <p className="brand-intro-caption">Ideas taking flight.</p>
      <button className="brand-intro-skip" type="button" onClick={() => setFinished(true)}>Skip intro</button>
    </div>
  );
}
