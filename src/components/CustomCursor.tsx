import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on pointer-fine devices
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
      return;
    }

    setEnabled(true);
    document.body.classList.add('custom-cursor');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest('a, button, input, textarea, select, [role="button"], .card, .clickable');
      if (ringRef.current) {
        if (isInteractive) {
          ringRef.current.classList.add('cur-hover');
        } else {
          ringRef.current.classList.remove('cur-hover');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handlePointerOver, { passive: true });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(animateRing);
    };

    animId = requestAnimationFrame(animateRing);

    return () => {
      document.body.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handlePointerOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cur-dot pointer-events-none" aria-hidden="true" />
      <div ref={ringRef} className="cur-ring pointer-events-none" aria-hidden="true" />
    </>
  );
};
