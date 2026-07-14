'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'hover'>('default');
  const [hoverText, setHoverText] = useState('EXPLORE');

  // Check for touch device
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouch(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Hide default cursor globally
  useEffect(() => {
    if (isTouch) return;

    const style = document.createElement('style');
    style.id = 'custom-cursor-style';
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById('custom-cursor-style');
      el?.remove();
    };
  }, [isTouch]);

  // Mouse tracking with lerp
  const animate = useCallback(() => {
    const lerp = 0.15;
    posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
    posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        const state = target.getAttribute('data-cursor');
        if (state === 'hover') {
          setCursorState('hover');
          const text = target.getAttribute('data-cursor-text');
          setHoverText(text || 'EXPLORE');
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, animate]);

  if (isTouch) return null;

  const isHover = cursorState === 'hover';

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ willChange: 'transform' }}
    >
      {/* Outer ring */}
      <div
        className="absolute rounded-full border transition-all duration-300 ease-out flex items-center justify-center"
        style={{
          width: isHover ? 80 : 20,
          height: isHover ? 80 : 20,
          marginLeft: isHover ? -40 : -10,
          marginTop: isHover ? -40 : -10,
          borderColor: isHover ? 'var(--red, #E64648)' : 'var(--burgundy, #2D070B)',
          backgroundColor: isHover ? 'rgba(230, 70, 72, 0.08)' : 'transparent',
        }}
      >
        <span
          ref={textRef}
          className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.2em] uppercase transition-opacity duration-200"
          style={{
            opacity: isHover ? 1 : 0,
            color: 'var(--red, #E64648)',
          }}
        >
          {hoverText}
        </span>
      </div>
      {/* Inner dot */}
      <div
        className="absolute rounded-full transition-all duration-300 ease-out"
        style={{
          width: isHover ? 4 : 4,
          height: isHover ? 4 : 4,
          marginLeft: -2,
          marginTop: -2,
          backgroundColor: isHover ? 'var(--red, #E64648)' : 'var(--burgundy, #2D070B)',
        }}
      />
    </div>
  );
}
