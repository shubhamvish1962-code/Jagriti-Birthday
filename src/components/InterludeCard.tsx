'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Option {
  label: string;
  emoji?: string;
}

interface InterludeCardProps {
  question: string;
  options: Option[];
  runaway?: boolean;
  onAnswer?: (idx: number) => void;
  id?: string;
}

export default function InterludeCard({
  question,
  options,
  runaway = false,
  onAnswer,
  id,
}: InterludeCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [runCount, setRunCount] = useState<number>(0);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 60,
          rotateX: 15,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 75%',
          },
        }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (i: number) => {
    // If runaway is active on option 0 or button 0
    if (!runaway || selected !== null) return;
    const btn = btnRefs.current[i];
    if (!btn) return;

    // Run away randomly
    const dx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 140 + 90);
    const dy = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 90 + 50);

    setRunCount((prev) => prev + 1);

    gsap.to(btn, {
      x: `+=${dx}`,
      y: `+=${dy}`,
      duration: 0.35,
      ease: 'power3.out',
    });
  };

  const handleClick = (i: number) => {
    setSelected(i);
    if (onAnswer) onAnswer(i);
    btnRefs.current.forEach((btn) => {
      if (btn) gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  };

  return (
    <div
      ref={wrapRef}
      id={id}
      style={{
        minHeight: '65vh',
        padding: '4rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div
        ref={cardRef}
        className="glass-card"
        style={{
          maxWidth: '640px',
          width: '100%',
          padding: 'clamp(2.5rem, 5vw, 3.8rem)',
          textAlign: 'center',
          position: 'relative',
          borderRadius: '30px',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
          border: '1px solid rgba(212,168,83,0.3)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212,168,83,0.12)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          overflow: 'hidden',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1.2rem' }}>💭</div>

        <p
          style={{
            fontSize: '0.78rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#D4A853',
            marginBottom: '0.8rem',
            fontWeight: 600,
          }}
        >
          Interactive Checkpoint
        </p>

        <h3
          className="font-display"
          style={{
            fontSize: 'clamp(1.25rem, 2.8vw, 1.85rem)',
            fontWeight: 700,
            color: '#FFF0F5',
            marginBottom: '2.5rem',
            lineHeight: 1.45,
          }}
        >
          {question}
        </h3>

        {runaway && runCount > 0 && selected === null && (
          <p
            style={{
              fontSize: '0.82rem',
              color: '#f9a8d4',
              marginBottom: '1rem',
              fontStyle: 'italic',
              animation: 'bounceY 1s infinite',
            }}
          >
            {runCount > 3 ? "Arey pakad nahi paa rahi? 😂 Option 2 choose kar lo!" : "Haha button bhaag raha hai! Try again 👀"}
          </p>
        )}

        {selected === null ? (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.2rem',
              justifyContent: 'center',
              position: 'relative',
              minHeight: '70px',
              alignItems: 'center',
            }}
          >
            {options.map((opt, i) => (
              <button
                key={i}
                ref={(el) => {
                  btnRefs.current[i] = el;
                }}
                className="interlude-btn"
                onMouseEnter={() => (runaway && i === 0 ? handleMouseEnter(i) : null)}
                onClick={() => handleClick(i)}
                style={{
                  padding: '0.85rem 1.8rem',
                  borderRadius: '50px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#D4A853';
                  e.currentTarget.style.background = 'rgba(212,168,83,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                {opt.emoji && <span style={{ marginRight: '0.6rem' }}>{opt.emoji}</span>}
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ animation: 'badgeIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.8rem' }}>🎉✨</div>
            <p
              className="font-cormorant"
              style={{
                fontSize: '1.6rem',
                color: '#F5D78E',
                fontWeight: 600,
                fontStyle: 'italic',
              }}
            >
              {options[selected].emoji} {options[selected].label}
            </p>
            <p
              style={{
                marginTop: '0.6rem',
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.65)',
              }}
            >
              100% accurate! Certified by your senior. 😌💗
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
