import React, { useEffect, useRef } from 'react';

interface HeroCanvasProps {
  isActive: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isOrange: boolean;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0;
    let H = 0;
    let d = 1;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, px: -999, py: -999 };
    let smoothX = 0;
    let smoothY = 0;

    const phi = (1 + Math.sqrt(5)) / 2;
    const vertices: [number, number, number][] = [];
    for (const a of [-1, 1]) {
      for (const b of [-phi, phi]) {
        vertices.push([0, a, b], [a, b, 0], [b, 0, a]);
      }
    }

    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dist = Math.hypot(
          vertices[i][0] - vertices[j][0],
          vertices[i][1] - vertices[j][1],
          vertices[i][2] - vertices[j][2]
        );
        if (dist < 2.1) {
          edges.push([i, j]);
        }
      }
    }

    const handleResize = () => {
      d = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.width = window.innerWidth * d;
      H = canvas.height = (canvas.offsetHeight || window.innerHeight) * d;

      const n = Math.min(100, Math.max(30, Math.floor(window.innerWidth / 12)));
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4 * d,
        vy: (Math.random() - 0.5) * 0.4 * d,
        isOrange: Math.random() < 0.22,
      }));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.px = (e.clientX - rect.left) * d;
      mouse.py = (e.clientY - rect.top) * d;
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener('pointermove', handlePointerMove);

    const rotate = (
      v: [number, number, number],
      ax: number,
      ay: number
    ): [number, number, number] => {
      const [X, Y, Z] = v;
      const c1 = Math.cos(ay);
      const s1 = Math.sin(ay);
      const x1 = X * c1 + Z * s1;
      const z1 = -X * s1 + Z * c1;
      const c2 = Math.cos(ax);
      const s2 = Math.sin(ax);
      return [x1, Y * c2 - z1 * s2, Y * s2 + z1 * c2];
    };

    const renderSolid = (
      scale: number,
      ax: number,
      ay: number,
      cx: number,
      cy: number,
      colorTemplate: string,
      lineWidth: number,
      renderNodes: boolean
    ) => {
      const projected = vertices.map((v) => {
        const r = rotate(v, ax, ay);
        const f = 4 / (r[2] * 0.45 + 5);
        return {
          x: cx + r[0] * scale * f,
          y: cy + r[1] * scale * f,
          z: r[2],
        };
      });

      ctx.lineWidth = lineWidth * d;

      for (const [i, j] of edges) {
        const a = projected[i];
        const b = projected[j];
        const alpha = 0.25 + (0.55 * ((a.z + b.z) / 2 + phi)) / (2 * phi);
        ctx.strokeStyle = colorTemplate.replace('ALPHA', alpha.toFixed(2));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      if (renderNodes) {
        ctx.fillStyle = 'rgba(255, 90, 31, 0.95)';
        for (const pt of projected) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.6 * d, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = (timestamp: number) => {
      if (!isActive) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      // 1. Draw and update particles
      for (const p of particles) {
        const dx = p.x - mouse.px;
        const dy = p.y - mouse.py;
        const dist = Math.hypot(dx, dy);
        const repulseRadius = 200 * d;

        if (dist < repulseRadius && dist > 0) {
          const force = (1 - dist / repulseRadius) * 0.4;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.fillStyle = p.isOrange
          ? 'rgba(255, 90, 31, 0.85)'
          : 'rgba(25, 227, 208, 0.7)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, (p.isOrange ? 2.2 : 1.5) * d, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connect particles with faint cyan lines
      const maxConnectDist = 95 * d;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const len = Math.hypot(a.x - b.x, a.y - b.y);
          if (len < maxConnectDist) {
            const alpha = 0.15 * (1 - len / maxConnectDist);
            ctx.strokeStyle = `rgba(25, 227, 208, ${alpha})`;
            ctx.lineWidth = d;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // 2. Smooth mouse tracking
      smoothX += (mouse.x - smoothX) * 0.05;
      smoothY += (mouse.y - smoothY) * 0.05;

      const isWide = window.innerWidth > 860;
      const baseScale = Math.min(W, H) * (isWide ? 0.17 : 0.13);
      const cx = W * (isWide ? 0.74 : 0.5);
      const cy = H * (isWide ? 0.5 : 0.28);

      ctx.globalAlpha = isWide ? 1 : 0.65;

      // Outer cyan icosahedron with orange vertex nodes
      renderSolid(
        baseScale,
        timestamp * 0.0003 + smoothY * 2,
        timestamp * 0.0004 + smoothX * 2.5,
        cx,
        cy,
        'rgba(25, 227, 208, ALPHA)',
        1.4,
        true
      );

      // Inner inverted orange rotating icosahedron
      renderSolid(
        baseScale * 0.52,
        -timestamp * 0.0005 + smoothY,
        -timestamp * 0.0006 + smoothX,
        cx,
        cy,
        'rgba(255, 90, 31, ALPHA)',
        1.2,
        false
      );

      ctx.globalAlpha = 1;

      if (!isReduced) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
