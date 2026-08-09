import React, { useState, useEffect } from 'react';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mediaQuery.matches);
    const listener = (e) => setReduced(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  return reduced;
}

function CharacterSemicircle({ mood }) {
  const bodyPath = "M 10 70 A 30 30 0 0 1 70 70 Z";

  const isSmile = mood === 'smiling';
  const isClosedEyes = mood === 'shy';
  const isWatching = mood === 'watching';

  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className="shrink-0">
      {/* Semicircle Body */}
      <path d={bodyPath} fill="#FFFFFF" stroke="#000000" strokeWidth="3" />

      {/* Eyes and Mouth - always rendered */}
      <>
        {/* Eyes */}
        {isClosedEyes ? (
          <>
            <line x1="28" y1="52" x2="34" y2="52" stroke="#000000" strokeWidth="2.5" strokeLinecap="square" />
            <line x1="46" y1="52" x2="52" y2="52" stroke="#000000" strokeWidth="2.5" strokeLinecap="square" />
          </>
        ) : (
          <>
            <circle cx={isWatching ? 34 : 31} cy="52" r="3" fill="#000000" />
            <circle cx={isWatching ? 52 : 49} cy="52" r="3" fill="#000000" />
          </>
        )}

        {/* Mouth */}
        {isSmile ? (
          <path d="M 35 60 Q 40 66 45 60" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="square" />
        ) : (
          <line x1="35" y1="62" x2="45" y2="62" stroke="#000000" strokeWidth="2.5" strokeLinecap="square" />
        )}
      </>
    </svg>
  );
}

function CharacterArch({ mood }) {
  const bodyPath = "M 15 70 L 15 30 L 40 10 L 65 30 L 65 70 Z";

  const isSmile = mood === 'smiling';
  const isClosedEyes = mood === 'shy';
  const isWatching = mood === 'watching';

  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className="shrink-0">
      {/* Arch Body */}
      <path d={bodyPath} fill="#1D4FF7" stroke="#000000" strokeWidth="2.5" />

      {/* Eyes and Mouth - always rendered */}
      <>
        {/* Eyes */}
        {isClosedEyes ? (
          <>
            <line x1="29" y1="42" x2="35" y2="42" stroke="#000000" strokeWidth="2.5" strokeLinecap="square" />
            <line x1="45" y1="42" x2="51" y2="42" stroke="#000000" strokeWidth="2.5" strokeLinecap="square" />
          </>
        ) : (
          <>
            <circle cx={isWatching ? 35 : 32} cy="42" r="3" fill="#000000" />
            <circle cx={isWatching ? 51 : 48} cy="42" r="3" fill="#000000" />
          </>
        )}

        {/* Mouth */}
        {isSmile ? (
          <path d="M 35 52 Q 40 57 45 52" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="square" />
        ) : (
          <line x1="35" y1="54" x2="45" y2="54" stroke="#000000" strokeWidth="2.5" strokeLinecap="square" />
        )}
      </>
    </svg>
  );
}

function CharacterRect({ mood }) {
  const isSmile = mood === 'smiling';
  const isClosedEyes = mood === 'shy';
  const isWatching = mood === 'watching';

  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className="shrink-0">
      {/* Rectangle Body */}
      <rect x="15" y="25" width="50" height="45" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />

      {/* Eyes and Mouth - always rendered */}
      <>
        {/* Eyes */}
        {isClosedEyes ? (
          <>
            <line x1="29" y1="44" x2="35" y2="44" stroke="#000000" strokeWidth="2.5" strokeLinecap="square" />
            <line x1="45" y1="44" x2="51" y2="44" stroke="#000000" strokeWidth="2.5" strokeLinecap="square" />
          </>
        ) : (
          <>
            <circle cx={isWatching ? 35 : 32} cy="44" r="3" fill="#000000" />
            <circle cx={isWatching ? 51 : 48} cy="44" r="3" fill="#000000" />
          </>
        )}

        {/* Mouth */}
        {isSmile ? (
          <path d="M 35 54 Q 40 59 45 54" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="square" />
        ) : (
          <line x1="35" y1="56" x2="45" y2="56" stroke="#000000" strokeWidth="2.5" strokeLinecap="square" />
        )}
      </>
    </svg>
  );
}

export default function LoginCharacters({ mood }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // CSS transform translation and rotation for shy mood
  const shyTransform = mood === 'shy' && !prefersReducedMotion
    ? 'translateX(-12px) rotate(-15deg)'
    : 'none';

  return (
    <div
      aria-hidden="true"
      className="flex md:flex-col items-center justify-center w-full"
      style={{
        transform: shyTransform,
        transition: prefersReducedMotion ? 'none' : 'transform 50ms linear',
        pointerEvents: 'none',
      }}
    >
      <CharacterSemicircle mood={mood} />
      <CharacterArch
        mood={mood}
        style={{ marginTop: '-8px' }}
      />
      <CharacterRect
        mood={mood}
        style={{ marginTop: '-8px' }}
      />
    </div>
  );
}