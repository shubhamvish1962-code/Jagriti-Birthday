'use client';
import { useRef, useEffect, useState, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ChapterSectionProps {
  id?: string;
  chapterNum: string;
  label: string;
  emoji: string;
  lines: string[];
  accentColor?: string;
  textGradient?: string;
  bgOrb1?: string;
  bgOrb2?: string;
  reactions?: string[];
  children?: ReactNode;
}

export default function ChapterSection({
  id,
  chapterNum,
  label,
  emoji,
  lines,
  accentColor = '#52b788',
  textGradient = 'linear-gradient(135deg, #e8f5e9 0%, #74c69d 55%, #52b788 100%)',
  reactions = ['Petrichor 🍃', 'Warm Chai ☕', 'Greenery vibe 🌿', 'Aww 🥹'],
  children,
}: ChapterSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const glareRef = useRef<HTMLDivElement>(null);

  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Scroll Reveal with Perspective Depth ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 25%',
          scrub: 1,
        },
      });

      // Giant chapter numeral slides from depth
      if (numRef.current) {
        tl.fromTo(
          numRef.current,
          { opacity: 0, x: -60, scale: 0.85, rotateZ: -6 },
          { opacity: 0.7, x: 0, scale: 1, rotateZ: 0, ease: 'power2.out' },
          0
        );
      }

      // Card rotates smoothly into view like looking through rain-washed leaves
      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          {
            opacity: 0,
            y: 80,
            rotateX: 16,
            rotateY: -6,
            scale: 0.94,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            ease: 'power3.out',
          },
          0.12
        );
      }

      // Text lines entrance
      linesRef.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, y: 25, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out' },
          0.26 + i * 0.14
        );
      });

      // ── Continuous Scroll Parallax ──
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          if (cardRef.current) {
            const tilt = (p - 0.5) * 7;
            gsap.set(cardRef.current, {
              rotateX: -tilt,
              translateZ: Math.sin(p * Math.PI) * 20,
            });
          }
          if (numRef.current) {
            gsap.set(numRef.current, {
              y: (p - 0.5) * -85,
            });
          }
        },
      });
    }, sectionRef);

    // ── Mouse 3D Tilt & Specular Glare ──
    const card = cardRef.current;
    const glare = glareRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 14,
        rotateX: -y * 10,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power1.out',
        overwrite: 'auto',
      });

      if (glare) {
        gsap.to(glare, {
          x: (x + 0.5) * rect.width,
          y: (y + 0.5) * rect.height,
          opacity: 0.2,
          duration: 0.2,
        });
      }
    };

    const handleMouseLeave = () => {
      if (!card) return;
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
      if (glare) {
        gsap.to(glare, { opacity: 0, duration: 0.5 });
      }
    };

    card?.addEventListener('mousemove', handleMouseMove);
    card?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ctx.revert();
      card?.removeEventListener('mousemove', handleMouseMove);
      card?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4rem, 8vw, 6.5rem) 1.25rem',
        perspective: '1200px',
        zIndex: 5,
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '820px',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Giant glowing background numeral */}
        <div
          ref={numRef}
          className="font-display"
          style={{
            position: 'absolute',
            top: '-3.2rem',
            left: '4%',
            fontSize: 'clamp(4.5rem, 13vw, 10.5rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: `1.5px ${accentColor}35`,
            pointerEvents: 'none',
            zIndex: 1,
            userSelect: 'none',
          }}
        >
          {chapterNum}
        </div>

        {/* Section Header Indicator */}
        <div
          ref={headerRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.7rem',
            marginBottom: '1.6rem',
            padding: '0.4rem 1.2rem',
            background: 'rgba(14, 26, 20, 0.75)',
            border: `1px solid ${accentColor}40`,
            borderRadius: '50px',
            backdropFilter: 'blur(14px)',
            zIndex: 2,
            boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 15px ${accentColor}15`,
          }}
        >
          <span style={{ fontSize: '0.95rem' }}>{emoji}</span>
          <span
            style={{
              fontSize: 'clamp(0.7rem, 2vw, 0.78rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: accentColor,
              fontWeight: 600,
            }}
          >
            Chapter {chapterNum} · {label}
          </span>
        </div>

        {/* Rainy Foliage Frosted Glass Card */}
        <div
          ref={cardRef}
          className="glass-card"
          style={{
            position: 'relative',
            width: '100%',
            padding: 'clamp(2rem, 5.5vw, 3.8rem)',
            borderRadius: '26px',
            background: 'linear-gradient(150deg, rgba(14, 26, 20, 0.8), rgba(7, 15, 11, 0.9))',
            border: `1px solid ${accentColor}35`,
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            boxShadow: `0 20px 50px rgba(0, 0, 0, 0.7), 0 0 40px ${accentColor}12, inset 0 1px 0 rgba(255,255,255,0.12)`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          {/* Interactive Mouse Glare */}
          <div
            ref={glareRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '400px',
              height: '400px',
              background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              opacity: 0,
              mixBlendMode: 'screen',
              filter: 'blur(40px)',
              zIndex: 3,
            }}
          />

          {/* Leaf Spark Indicator */}
          <div
            style={{
              position: 'absolute',
              top: '1.4rem',
              right: '1.6rem',
              fontSize: '1.1rem',
              opacity: 0.65,
              color: accentColor,
            }}
          >
            🍃
          </div>

          {/* Text Line 0 (Gradient Lead) */}
          {lines[0] && (
            <p
              ref={(el) => {
                linesRef.current[0] = el;
              }}
              className="font-cormorant"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                fontWeight: 600,
                lineHeight: 1.45,
                marginBottom: '1.6rem',
                background: textGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {lines[0]}
            </p>
          )}

          {/* Text Line 1 */}
          {lines[1] && (
            <p
              ref={(el) => {
                linesRef.current[1] = el;
              }}
              className="font-cormorant"
              style={{
                fontSize: 'clamp(1.1rem, 2.3vw, 1.65rem)',
                fontWeight: 300,
                lineHeight: 1.65,
                color: 'rgba(232, 245, 233, 0.92)',
                marginBottom: lines[2] ? '1.3rem' : '0',
              }}
            >
              {lines[1]}
            </p>
          )}

          {/* Text Line 2 */}
          {lines[2] && (
            <p
              ref={(el) => {
                linesRef.current[2] = el;
              }}
              className="font-cormorant"
              style={{
                fontSize: 'clamp(1.05rem, 2.1vw, 1.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.65,
                color: 'rgba(183, 228, 199, 0.85)',
              }}
            >
              {lines[2]}
            </p>
          )}

          {children && <div style={{ marginTop: '1.8rem' }}>{children}</div>}

          {/* Interactive Reactions Bar */}
          <div
            style={{
              marginTop: '2.2rem',
              paddingTop: '1.6rem',
              borderTop: '1px solid rgba(82, 183, 136, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.8rem',
            }}
          >
            <span
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                color: 'rgba(183, 228, 199, 0.5)',
                textTransform: 'uppercase',
              }}
            >
              Greenery Vibe Check:
            </span>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {reactions.map((react, idx) => {
                const isSelected = selectedReaction === react;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedReaction(react)}
                    style={{
                      padding: '0.4rem 0.95rem',
                      borderRadius: '50px',
                      background: isSelected
                        ? accentColor
                        : 'rgba(14, 26, 20, 0.7)',
                      border: isSelected
                        ? `1px solid ${accentColor}`
                        : '1px solid rgba(82, 183, 136, 0.25)',
                      color: isSelected ? '#070c09' : '#e8f5e9',
                      fontWeight: isSelected ? 600 : 400,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                      boxShadow: isSelected
                        ? `0 6px 18px ${accentColor}45`
                        : 'none',
                    }}
                  >
                    {react}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dewy bottom accent */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '15%',
              right: '15%',
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
