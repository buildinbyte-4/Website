'use client';

import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [role="button"], [role="link"], [data-cursor="interactive"]';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!cursor || !finePointer.matches || reducedMotion.matches) return undefined;

    const root = document.documentElement;
    let frame = 0;
    let x = -50;
    let y = -50;
    let scale = 1;

    const paint = () => {
      cursor.style.transform = `translate3d(${x - 3}px, ${y - 2}px, 0) rotate(-5deg) scale(${scale})`;
      frame = 0;
    };

    const schedulePaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      const interactive = Boolean(event.target.closest?.(INTERACTIVE_SELECTOR));
      cursor.classList.toggle('custom-cursor--interactive', interactive);
      cursor.classList.add('custom-cursor--visible');
      scale = interactive ? 1.12 : 1;
      schedulePaint();
    };

    const handlePointerDown = () => {
      cursor.classList.add('custom-cursor--pressed');
      scale = 0.9;
      schedulePaint();
    };

    const handlePointerUp = (event) => {
      cursor.classList.remove('custom-cursor--pressed');
      scale = event.target.closest?.(INTERACTIVE_SELECTOR) ? 1.12 : 1;
      schedulePaint();
    };

    const hideCursor = () => cursor.classList.remove('custom-cursor--visible');

    root.classList.add('custom-cursor-active');
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', hideCursor);
    window.addEventListener('blur', hideCursor);

    return () => {
      root.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('blur', hideCursor);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <svg viewBox="0 0 34 40" focusable="false">
        <path
          className="custom-cursor__glow"
          d="M5 3.5 29 15.2c1.8.9 1.5 3.5-.5 4l-9.2 2.1-4.1 11.1c-.7 2-3.5 2.1-4.3.1L3 6.2C2.4 4.3 3.3 2.7 5 3.5Z"
        />
        <path
          className="custom-cursor__shape"
          d="M5 3.5 29 15.2c1.8.9 1.5 3.5-.5 4l-9.2 2.1-4.1 11.1c-.7 2-3.5 2.1-4.3.1L3 6.2C2.4 4.3 3.3 2.7 5 3.5Z"
        />
      </svg>
    </div>
  );
}
