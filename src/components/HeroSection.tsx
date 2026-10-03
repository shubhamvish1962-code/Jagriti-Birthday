'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NATURE_BADGES = [
  { text: '🌸 Baby Pink Blossoms', top: '15%', left: '6%' },
  { text: '🌿 Rain-Soaked Leaves', top: '22%', right: '7%' },
  { text: '☕ Warm Lantern Glow', bottom: '24%', left: '7%' },
  { text: '💗 Cute, Pagal & Special', bottom: '16%', right: '8%' },
];

export default function HeroSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollBadgeRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Eyebrow badge
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out' }
      );

      // Title line 1
      tl.fromTo(
        title1Ref.current,
        { opacity: 0, y: 35, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out' },
        '-=0.5'
      );

      // Title line 2 (Jagriti)
      tl.fromTo(
        title2Ref.current,
        { opacity: 0, y: 50, scale: 0.94, filter: 'blur(12px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.3, ease: 'expo.out' },
        '-=0.7'
      );

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'expo.out' },
        '-=0.6'
      );

      // Badges
      badgesRef.current.forEach((badge, i) => {
        if (!badge) return;
        tl.fromTo(
          badge,
          { opacity: 0, scale: 0.75, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: 'back.out(2)' },
          0.7 + i * 0.12
        );
      });

      // Scroll CTA
      tl.fromTo(
        scrollBadgeRef.current,
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(2)' },
        '-=0.3'
      );

      // ── Scroll Parallax Depth ──
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.7,
        onUpdate: (self) => {
          const p = self.progress;
          if (title1Ref.current) {
            gsap.set(title1Ref.current, { y: -p * 90, opacity: 1 - p * 1.5 });
          }
          if (title2Ref.current) {
            gsap.set(title2Ref.current, { y: -p * 140, scale: 1 - p * 0.1, opacity: 1 - p * 1.4 });
          }
          if (subtitleRef.current) {
            gsap.set(subtitleRef.current, { y: -p * 60, opacity: 1 - p * 2 });
          }
          if (scrollBadgeRef.current) {
            gsap.set(scrollBadgeRef.current, { y: p * 40, opacity: 1 - p * 3 });
          }
          badgesRef.current.forEach((b, i) => {
            if (!b) return;
            const mult = (i % 2 === 0 ? 1 : -1) * (90 + i * 30);
            gsap.set(b, { y: -p * mult, opacity: 1 - p * 2 });
          });
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 7vw, 6rem) 1.5rem',
        overflow: 'hidden',
        zIndex: 5,
        width: '100%',
      }}
    >
      {/* Floating nature badges (desktop only for clean mobile) */}
      {NATURE_BADGES.map((b, i) => (
        <div
          key={i}
          ref={(el) => {
            badgesRef.current[i] = el;
          }}
          className="hidden lg:block"
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            padding: '0.5rem 1.25rem',
            background: 'rgba(16, 26, 20, 0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(249, 168, 212, 0.35)',
            borderRadius: '50px',
            fontSize: '0.8rem',
            color: '#fbcfe8',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(249, 168, 212, 0.15)',
            pointerEvents: 'none',
            opacity: 0,
            zIndex: 6,
          }}
        >
          {b.text}
        </div>
      ))}

      {/* Main Content Container */}
      <div
        ref={containerRef}
        style={{
          maxWidth: '920px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Eyebrow badge */}
        <div ref={eyebrowRef} style={{ marginBottom: '1.8rem', opacity: 0 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1.4rem',
              background: 'linear-gradient(135deg, rgba(249,168,212,0.25), rgba(45,106,79,0.35))',
              border: '1px solid rgba(249,168,212,0.45)',
              borderRadius: '50px',
              fontSize: 'clamp(0.7rem, 2vw, 0.78rem)',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#fbcfe8',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span>🌸</span>
            <span>Rain, Dark Clouds & Baby Pink</span>
            <span>🌿</span>
          </span>
        </div>

        {/* Headings */}
        <h2
          ref={title1Ref}
          className="font-display"
          style={{
            fontSize: 'clamp(1.5rem, 3.8vw, 2.8rem)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            color: 'rgba(252, 231, 243, 0.92)',
            marginBottom: '0.2rem',
            lineHeight: 1.2,
          }}
        >
          Happy Birthday
        </h2>

        <h1
          ref={title2Ref}
          className="font-display"
          style={{
            fontSize: 'clamp(3.2rem, 9.5vw, 8rem)',
            fontWeight: 900,
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
            marginBottom: '1.6rem',
            background: 'linear-gradient(135deg, #fff0f5 0%, #fbcfe8 30%, #f9a8d4 60%, #74c69d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 50px rgba(249, 168, 212, 0.45)',
          }}
        >
          Jagriti 🌸🌧️
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-cormorant"
          style={{
            fontSize: 'clamp(1.15rem, 2.5vw, 1.85rem)',
            color: 'rgba(252, 231, 243, 0.85)',
            maxWidth: '660px',
            margin: '0 auto 2.8rem auto',
            lineHeight: 1.55,
            fontWeight: 300,
            padding: '0 1rem',
          }}
        >
          Soft baby pink blossoms in the rainy greenery — fresh, gentle, and bringing warmth to the gloomiest stormy skies. 🌸🍃
        </p>

        {/* ── EXPLICIT PROMINENT "SCROLL" BUTTON ── */}
        <div ref={scrollBadgeRef} style={{ display: 'inline-block' }}>
          <a
            href="#ch1"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.95rem 2.8rem',
              background: 'linear-gradient(135deg, rgba(249,168,212,0.25), rgba(18,30,24,0.92))',
              border: '1.5px solid rgba(249, 168, 212, 0.55)',
              borderRadius: '50px',
              color: '#fce7f3',
              textDecoration: 'none',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 30px rgba(249, 168, 212, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f472b6';
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 16px 55px rgba(244, 114, 182, 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(249, 168, 212, 0.55)';
              e.currentTarget.style.transform = 'translateY(0px) scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.6)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fbcfe8' }}>
                Scroll
              </span>
              <span style={{ animation: 'bounceY 1.4s infinite', display: 'inline-block', fontSize: '1.2rem', color: '#f472b6' }}>
                ↓
              </span>
            </div>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: 'rgba(252, 231, 243, 0.7)', textTransform: 'uppercase' }}>
              Travel down through the chapters
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
