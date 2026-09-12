'use client';

import { useEffect, useState } from 'react';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event) => setReduced(event.matches);
    setReduced(mediaQuery.matches);
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return reduced;
}

function Face({ x, y, mood, color = '#111217', scale = 1 }) {
  const watchingOffset = mood === 'watching' ? 4 : 0;
  const isShy = mood === 'shy';
  const isSmiling = mood === 'smiling';

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke={color} strokeLinecap="round">
      {isShy ? (
        <>
          <path d="M-21 0 Q-14 8 -7 0" strokeWidth="5" />
          <path d="M7 0 Q14 8 21 0" strokeWidth="5" />
        </>
      ) : (
        <>
          <circle cx={-14 + watchingOffset} cy="0" r="4.2" fill={color} stroke="none" />
          <circle cx={14 + watchingOffset} cy="0" r="4.2" fill={color} stroke="none" />
        </>
      )}
      {isSmiling ? (
        <path d="M-9 18 Q0 27 9 18" strokeWidth="4" />
      ) : (
        <path d="M-7 20 H7" strokeWidth="4" />
      )}
    </g>
  );
}

export default function LoginCharacters({ mood }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const effectiveMood = prefersReducedMotion ? 'idle' : mood;

  return (
    <svg
      aria-hidden="true"
      className="login-characters"
      viewBox="0 0 440 330"
      role="presentation"
    >
      <defs>
        <filter id="character-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#1b1722" floodOpacity="0.14" />
        </filter>
      </defs>

      <g filter="url(#character-shadow)">
        <g className="login-character login-character--purple">
          <rect x="97" y="42" width="94" height="224" rx="12" fill="#6127F5" transform="rotate(-7 144 266)" />
          <path d="M99 62 186 48" stroke="#BCA9FF" strokeWidth="8" opacity="0.7" />
          <Face x={143} y={132} mood={effectiveMood} />
        </g>

        <g className="login-character login-character--black">
          <rect x="184" y="139" width="104" height="147" rx="16" fill="#111217" transform="rotate(-2 236 286)" />
          <Face x={236} y={197} mood={effectiveMood} color="#F8F7F4" scale={0.92} />
        </g>

        <g className="login-character login-character--orange">
          <path d="M34 286 A103 103 0 0 1 240 286 Z" fill="#FF6B2C" />
          <Face x={137} y={229} mood={effectiveMood} scale={1.06} />
        </g>

        <g className="login-character login-character--yellow">
          <path d="M270 286 V221 A60 60 0 0 1 390 221 V286 Z" fill="#FFD21A" />
          <Face x={330} y={233} mood={effectiveMood} scale={0.9} />
        </g>
      </g>

      <path d="M26 287 H406" stroke="#D8D4DE" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
