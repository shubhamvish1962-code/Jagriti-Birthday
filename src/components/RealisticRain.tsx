'use client';
import { useEffect, useRef } from 'react';

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  thickness: number;
  opacity: number;
  layer: number; // 0: background mist, 1: midground rain, 2: foreground heavy
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angularSpeed: number;
  opacity: number;
}

interface Splash {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export default function RealisticRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollVelocityRef = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const lastScrollTime = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;

      const dt = Math.max(1, now - lastScrollTime.current);
      const dy = Math.abs(currentY - lastScrollY.current);
      scrollVelocityRef.current = Math.min(dy / dt, 4.5);

      lastScrollY.current = currentY;
      lastScrollTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const isMobile = width < 768;
    const dropCount = isMobile ? 380 : 850;

    // ── 1. Realistic Multi-Layer Raindrops ──
    const drops: RainDrop[] = [];
    for (let i = 0; i < dropCount; i++) {
      const layer = Math.random() < 0.2 ? 2 : Math.random() < 0.65 ? 1 : 0;
      let speed: number;
      let length: number;
      let thickness: number;
      let opacity: number;

      if (layer === 2) {
        speed = 22 + Math.random() * 12;
        length = 24 + Math.random() * 22;
        thickness = 1.6 + Math.random() * 0.8;
        opacity = 0.6 + Math.random() * 0.35;
      } else if (layer === 1) {
        speed = 15 + Math.random() * 9;
        length = 15 + Math.random() * 15;
        thickness = 1.0 + Math.random() * 0.5;
        opacity = 0.35 + Math.random() * 0.3;
      } else {
        speed = 9 + Math.random() * 6;
        length = 8 + Math.random() * 8;
        thickness = 0.6 + Math.random() * 0.4;
        opacity = 0.15 + Math.random() * 0.2;
      }

      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length,
        speed,
        thickness,
        opacity,
        layer,
      });
    }

    // ── 2. Drifting Baby Pink Blossoms / Petals ──
    const petalCount = isMobile ? 18 : 36;
    const petals: Petal[] = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 5 + Math.random() * 7,
        speedY: 1.2 + Math.random() * 1.8,
        speedX: 0.8 + Math.random() * 1.2,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.04,
        opacity: 0.5 + Math.random() * 0.4,
      });
    }

    // ── 3. Ground Splash Ripples ──
    const splashes: Splash[] = [];
    const windAngle = 0.12;

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      scrollVelocityRef.current *= 0.94;
      const speedBoost = 1.0 + scrollVelocityRef.current * 1.6;

      // ── Render Rain Streaks ──
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const currentSpeed = d.speed * speedBoost;

        d.y += currentSpeed;
        d.x += windAngle * currentSpeed;

        if (d.y > height) {
          if (d.layer >= 1 && splashes.length < 35 && Math.random() < 0.3) {
            splashes.push({
              x: d.x,
              y: height - Math.random() * 15,
              radius: 1,
              maxRadius: d.layer === 2 ? 14 : 8,
              opacity: 0.6,
            });
          }
          d.y = -d.length - Math.random() * 30;
          d.x = Math.random() * (width + 100) - 50;
        }

        const endX = d.x + windAngle * d.length;
        const endY = d.y + d.length;

        const grad = ctx.createLinearGradient(d.x, d.y, endX, endY);
        grad.addColorStop(0, 'rgba(251, 207, 232, 0)');
        grad.addColorStop(0.7, `rgba(183, 228, 199, ${d.opacity * 0.5})`);
        grad.addColorStop(1, `rgba(252, 231, 243, ${d.opacity})`);

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = d.thickness;
        ctx.lineCap = 'round';
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // ── Render Drifting Baby Pink Petals ──
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY * (1 + scrollVelocityRef.current * 0.8);
        p.x += Math.sin(p.angle) * p.speedX + windAngle * 2;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * (width + 80) - 40;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Draw soft baby pink petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 168, 212, ${p.opacity})`;
        ctx.shadowColor = 'rgba(244, 114, 182, 0.4)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      // ── Render Ground Splash Ripples ──
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.radius += 0.6;
        s.opacity -= 0.03;

        if (s.opacity <= 0) {
          splashes.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.ellipse(s.x, s.y, s.radius, s.radius * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249, 168, 212, ${s.opacity * 0.8})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
