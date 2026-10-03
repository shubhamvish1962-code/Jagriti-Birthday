'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CloudGreeneryBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cloudLayerRef = useRef<HTMLDivElement>(null);
  const topGreeneryRef = useRef<HTMLDivElement>(null);
  const bottomGreeneryRef = useRef<HTMLDivElement>(null);
  const firefliesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Scroll Parallax Depth ──
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;

          // Layer 1: Dark Clouds drift slowly downward & sideways
          if (cloudLayerRef.current) {
            gsap.set(cloudLayerRef.current, {
              y: p * 120,
              x: Math.sin(p * Math.PI) * -30,
              opacity: 0.88 - p * 0.25,
            });
          }

          // Layer 2: Top hanging greenery & pink blossoms sway with scroll
          if (topGreeneryRef.current) {
            gsap.set(topGreeneryRef.current, {
              y: -p * 80,
              scale: 1 + p * 0.04,
            });
          }

          // Layer 3: Bottom ferns rise with parallax
          if (bottomGreeneryRef.current) {
            gsap.set(bottomGreeneryRef.current, {
              y: -p * 140,
            });
          }

          // Layer 4: Ambient fireflies & pink sparkles drift through the rain
          firefliesRef.current.forEach((el, i) => {
            if (!el) return;
            const speed = (i % 2 === 0 ? 1 : -1) * (60 + i * 20);
            gsap.set(el, {
              y: -p * speed,
            });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* ── 1. 2D BASE PALETTE: Deep Atmospheric Forest Sky with Baby Pink Aura ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 12%, #182a20 0%, #0c1812 40%, #070c09 100%)
          `,
        }}
      />

      {/* Atmospheric rain mist with soft baby pink & emerald tint */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 50% at 30% 25%, rgba(249, 168, 212, 0.08) 0%, transparent 65%),
            radial-gradient(ellipse 80% 50% at 50% 30%, rgba(82, 183, 136, 0.08) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(251, 191, 36, 0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── 2. THE LITTLE BLACK CLOUD (Dark Storm Clouds at Top) ── */}
      <div
        ref={cloudLayerRef}
        style={{
          position: 'absolute',
          top: '-5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(320px, 90vw, 980px)',
          height: 'clamp(140px, 24vw, 240px)',
          opacity: 0.88,
          transition: 'transform 0.1s linear',
        }}
      >
        <svg
          viewBox="0 0 800 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.85)) drop-shadow(0 5px 15px rgba(10,20,15,0.6))',
          }}
        >
          <defs>
            <linearGradient id="darkStormGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#223027" />
              <stop offset="50%" stopColor="#151e19" />
              <stop offset="100%" stopColor="#0b110e" />
            </linearGradient>
            <linearGradient id="darkStormGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2a3a30" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#141d18" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#090e0b" stopOpacity="0.98" />
            </linearGradient>
            <linearGradient id="cloudRimLining" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#74c69d" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#141d18" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Deep back cloud puff */}
          <path
            d="M 120 160 Q 90 90 170 80 Q 230 30 340 60 Q 420 20 520 50 Q 610 30 680 90 Q 750 120 710 180 Q 660 210 520 200 Q 350 220 200 200 Z"
            fill="url(#darkStormGrad1)"
            opacity="0.85"
            style={{ animation: 'cloudDrift 14s ease-in-out infinite' }}
          />

          {/* Main heavy dark rain cloud with subtle pink-emerald rim */}
          <path
            d="M 160 170 Q 130 110 210 95 Q 260 45 370 70 Q 450 35 550 65 Q 630 50 680 110 Q 730 150 680 190 Q 580 210 440 195 Q 290 215 190 185 Z"
            fill="url(#darkStormGrad2)"
            stroke="url(#cloudRimLining)"
            strokeWidth="1.6"
            style={{ animation: 'cloudDrift 18s ease-in-out infinite reverse' }}
          />

          {/* Core darker rain puffs */}
          <ellipse cx="360" cy="120" rx="90" ry="50" fill="#0d1410" opacity="0.75" />
          <ellipse cx="490" cy="115" rx="85" ry="45" fill="#0e1612" opacity="0.7" />
          <ellipse cx="270" cy="130" rx="75" ry="40" fill="#0c120f" opacity="0.65" />
        </svg>

        {/* Rain vapor aura directly under the cloud */}
        <div
          style={{
            position: 'absolute',
            bottom: '-25px',
            left: '10%',
            right: '10%',
            height: '45px',
            background: 'radial-gradient(ellipse 70% 80% at 50% 0%, rgba(249,168,212,0.15), rgba(82,183,136,0.15), transparent 70%)',
            filter: 'blur(16px)',
          }}
        />
      </div>

      {/* ── 3. TOP HANGING LUSH GREENERY WITH BABY PINK BLOSSOMS ── */}
      <div
        ref={topGreeneryRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {/* Top-Left Hanging Rain Leaves + Pink Cherry Blossom */}
        <div
          style={{
            width: 'clamp(140px, 30vw, 360px)',
            transformOrigin: 'top left',
            animation: 'leafSway 7s ease-in-out infinite',
            filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.7))',
            position: 'relative',
          }}
        >
          <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
            <defs>
              <linearGradient id="leafGradLeft1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1b4332" />
                <stop offset="60%" stopColor="#2d6a4f" />
                <stop offset="100%" stopColor="#52b788" />
              </linearGradient>
              <linearGradient id="leafGradLeft2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f2419" />
                <stop offset="60%" stopColor="#1b4332" />
                <stop offset="100%" stopColor="#40916c" />
              </linearGradient>
              <radialGradient id="pinkBlossomGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff0f5" />
                <stop offset="45%" stopColor="#fbcfe8" />
                <stop offset="85%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#db2777" />
              </radialGradient>
            </defs>

            {/* Background vine leaf */}
            <path
              d="M -20 -10 Q 80 50 140 140 Q 120 180 80 170 Q 20 140 -20 80 Z"
              fill="url(#leafGradLeft2)"
              opacity="0.85"
            />
            {/* Main large monstera/tropical leaf */}
            <path
              d="M -30 -20 Q 110 30 210 130 C 230 155 190 190 145 180 C 105 170 70 195 40 175 C 10 155 -10 120 -30 60 Z"
              fill="url(#leafGradLeft1)"
            />
            {/* Dewdrops */}
            <circle cx="120" cy="115" r="3.5" fill="#fbcfe8" opacity="0.9" />
            <circle cx="160" cy="140" r="2.5" fill="#fbcfe8" opacity="0.8" />
            <circle cx="75" cy="85" r="3" fill="#e0f2fe" opacity="0.85" />

            {/* Baby Pink Blossom nestled in green leaves */}
            <g transform="translate(185, 140)">
              {/* 5 Petals */}
              {[0, 72, 144, 216, 288].map((angle, idx) => (
                <ellipse
                  key={idx}
                  cx="0"
                  cy="-12"
                  rx="7"
                  ry="12"
                  fill="url(#pinkBlossomGrad)"
                  transform={`rotate(${angle})`}
                  opacity="0.95"
                />
              ))}
              {/* Blossom center */}
              <circle cx="0" cy="0" r="4" fill="#fbbf24" filter="drop-shadow(0 0 3px #f59e0b)" />
            </g>
          </svg>
        </div>

        {/* Top-Right Hanging Vine with Baby Pink Flower & Cozy Lantern */}
        <div
          style={{
            width: 'clamp(140px, 30vw, 360px)',
            transformOrigin: 'top right',
            animation: 'leafSway 8.5s ease-in-out infinite reverse',
            filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.7))',
            position: 'relative',
          }}
        >
          <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
            <defs>
              <linearGradient id="leafGradRight1" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1b4332" />
                <stop offset="55%" stopColor="#2d6a4f" />
                <stop offset="100%" stopColor="#74c69d" />
              </linearGradient>
            </defs>

            {/* Right cascading leaves */}
            <path
              d="M 340 -20 Q 220 40 130 140 C 110 165 150 195 190 185 C 230 175 260 200 290 175 C 320 150 335 110 340 50 Z"
              fill="url(#leafGradRight1)"
            />
            {/* Glistening dewdrops */}
            <circle cx="180" cy="130" r="3.5" fill="#fbcfe8" opacity="0.9" />
            <circle cx="230" cy="155" r="2.5" fill="#e0f2fe" opacity="0.8" />

            {/* Baby Pink Blossom on right branch */}
            <g transform="translate(135, 145)">
              {[0, 72, 144, 216, 288].map((angle, idx) => (
                <ellipse
                  key={idx}
                  cx="0"
                  cy="-10"
                  rx="6"
                  ry="10"
                  fill="url(#pinkBlossomGrad)"
                  transform={`rotate(${angle})`}
                  opacity="0.95"
                />
              ))}
              <circle cx="0" cy="0" r="3.5" fill="#fbbf24" />
            </g>
          </svg>

          {/* Warm Cozy Lantern with soft pink-amber glow */}
          <div
            style={{
              position: 'absolute',
              top: '85px',
              right: '25%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '1.5px', height: '22px', background: 'rgba(249,168,212,0.6)' }} />
            <div
              style={{
                width: '18px',
                height: '26px',
                background: 'linear-gradient(180deg, #fef08a, #f472b6)',
                borderRadius: '6px',
                boxShadow: '0 0 25px #f472b6, 0 0 45px rgba(249,168,212,0.6)',
                border: '1px solid rgba(254,240,138,0.8)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── 4. BOTTOM LUSH FOREST FERNS & MOSSY GREENERY ── */}
      <div
        ref={bottomGreeneryRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'clamp(120px, 20vw, 220px)',
          pointerEvents: 'none',
        }}
      >
        <svg
          viewBox="0 0 1200 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 -8px 20px rgba(0,0,0,0.6))' }}
        >
          <defs>
            <linearGradient id="bottomFernGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#070c09" />
              <stop offset="60%" stopColor="#142a1e" />
              <stop offset="100%" stopColor="#2d6a4f" />
            </linearGradient>
            <linearGradient id="bottomFernGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#050806" />
              <stop offset="50%" stopColor="#0f2419" />
              <stop offset="100%" stopColor="#40916c" />
            </linearGradient>
          </defs>

          {/* Background layer ferns */}
          <path
            d="M 0 220 L 0 120 Q 90 70 180 130 Q 300 60 420 140 Q 560 50 700 130 Q 840 70 980 120 Q 1100 80 1200 140 L 1200 220 Z"
            fill="url(#bottomFernGrad1)"
            opacity="0.75"
          />

          {/* Foreground detailed wet fern silhouettes */}
          <path
            d="M 0 220 L 0 160 Q 80 110 160 170 Q 270 90 380 165 Q 500 100 630 170 Q 760 110 880 165 Q 1020 95 1140 160 L 1200 180 L 1200 220 Z"
            fill="url(#bottomFernGrad2)"
          />
        </svg>
      </div>

      {/* ── 5. GENTLE WARM FIREFLIES & PINK DEW SPARKLES ── */}
      {[
        { t: '35%', l: '18%', s: 5, col: '#fbcfe8', d: 0 },
        { t: '55%', r: '22%', s: 4, col: '#fbbf24', d: 1.2 },
        { t: '72%', l: '28%', s: 6, col: '#f9a8d4', d: 2.4 },
        { t: '40%', r: '14%', s: 4, col: '#74c69d', d: 0.8 },
      ].map((f, i) => (
        <div
          key={i}
          ref={(el) => {
            firefliesRef.current[i] = el;
          }}
          style={{
            position: 'absolute',
            top: f.t,
            left: f.l,
            right: f.r,
            width: f.s,
            height: f.s,
            borderRadius: '50%',
            background: f.col,
            boxShadow: `0 0 14px ${f.col}, 0 0 24px ${f.col}`,
            animation: `bounceY ${3 + i}s ease-in-out infinite ${f.d}s`,
            opacity: 0.75,
          }}
        />
      ))}
    </div>
  );
}
