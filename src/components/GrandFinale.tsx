'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

export default function GrandFinale() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [candlesLit, setCandlesLit] = useState(true);
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const blowCandlesAndCelebrate = () => {
    setCandlesLit(false);
    setCelebrated(true);

    // Auto send celebration notification in the background
    try {
      fetch('https://formsubmit.co/ajax/shubhamvish1962@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: '🎂 Jagriti just burst the birthday cake & blew the candles!',
          event: 'Cake Burst Celebration',
          celebrant: 'Jagriti',
          time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          message: 'Jagriti completed the birthday journey and celebrated by bursting the cake! 🎉🌧️🌸',
        }),
      }).catch(() => {});
    } catch {
      // safe fallback
    }

    // Multi-stage confetti celebration
    const duration = 4500;
    const end = Date.now() + duration;
    const colors = ['#f472b6', '#fbcfe8', '#52b788', '#74c69d', '#fbbf24', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.65 },
        colors,
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.65 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // Central high-velocity burst
    confetti({
      particleCount: 220,
      spread: 120,
      origin: { x: 0.5, y: 0.5 },
      colors,
      startVelocity: 45,
      gravity: 0.8,
    });

    // Golden & Emerald stars burst
    confetti({
      particleCount: 90,
      spread: 360,
      origin: { x: 0.5, y: 0.45 },
      colors: ['#fbbf24', '#74c69d', '#ffffff'],
      shapes: ['star'],
      ticks: 250,
    });

    if (btnRef.current) {
      gsap.to(btnRef.current, {
        scale: 1.2,
        duration: 0.15,
        yoyo: true,
        repeat: 3,
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="finale"
      style={{
        minHeight: '110vh',
        padding: '6rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 5,
        width: '100%',
      }}
    >
      <div
        ref={cardRef}
        style={{
          maxWidth: '780px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          className="glass-card"
          style={{
            padding: 'clamp(2.2rem, 5.5vw, 4.2rem)',
            borderRadius: '32px',
            background: 'linear-gradient(150deg, rgba(14, 26, 20, 0.88), rgba(7, 15, 11, 0.95))',
            border: '1px solid rgba(82, 183, 136, 0.4)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 50px rgba(82, 183, 136, 0.18)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top Badge */}
          <div style={{ marginBottom: '1.8rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.45rem 1.4rem',
                background: 'linear-gradient(135deg, rgba(45,106,79,0.35), rgba(251,191,36,0.2))',
                border: '1px solid rgba(116,198,157,0.45)',
                borderRadius: '50px',
                fontSize: 'clamp(0.7rem, 2vw, 0.76rem)',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#b7e4c7',
              }}
            >
              ✦ Candle In The Greenery ✦
            </span>
          </div>

          {/* Interactive Birthday Cake with Blowable Candles */}
          <div
            style={{
              position: 'relative',
              width: '160px',
              height: '130px',
              margin: '0 auto 2.5rem auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {/* 3 Candles */}
            <div style={{ display: 'flex', gap: '22px', marginBottom: '8px' }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Flame */}
                  {candlesLit ? (
                    <div
                      style={{
                        width: '10px',
                        height: '16px',
                        background: 'linear-gradient(180deg, #ffedd5 0%, #f59e0b 60%, #ef4444 100%)',
                        borderRadius: '50% 50% 35% 35%',
                        boxShadow: '0 0 16px #f59e0b, 0 0 30px #ef4444',
                        animation: `flickerFlame ${0.8 + i * 0.2}s infinite alternate ease-in-out`,
                        marginBottom: '2px',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.4)',
                        marginBottom: '6px',
                        animation: 'smokePuff 1s forwards ease-out',
                      }}
                    />
                  )}
                  {/* Candle Wick & Body */}
                  <div
                    style={{
                      width: '8px',
                      height: '32px',
                      borderRadius: '4px',
                      background: i === 1 ? 'linear-gradient(180deg, #f472b6, #db2777)' : 'linear-gradient(180deg, #D4A853, #b45309)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Cake Tiers */}
            <div
              style={{
                width: '120px',
                height: '35px',
                borderRadius: '12px 12px 6px 6px',
                background: 'linear-gradient(180deg, #fce7f3, #fbcfe8)',
                border: '1.5px solid rgba(249,168,212,0.6)',
                boxShadow: '0 4px 14px rgba(244,114,182,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
              }}
            >
              🍓 🌸 🍓
            </div>
            <div
              style={{
                width: '150px',
                height: '42px',
                borderRadius: '10px 10px 16px 16px',
                background: 'linear-gradient(180deg, #1b4332, #0f2419)',
                border: '1.5px solid rgba(249,168,212,0.4)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                color: '#fbcfe8',
              }}
            >
              🌸 Jagriti 🌿
            </div>
          </div>

          {/* Heartfelt Finale Message */}
          <p
            className="font-cormorant"
            style={{
              fontSize: 'clamp(1.3rem, 3.2vw, 2.1rem)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #fff0f5 0%, #fbcfe8 45%, #74c69d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            "And lastly… Happy Birthday to the girl who somehow became a little more special than just a junior. 🌸❤️"
          </p>

          <p
            className="font-cormorant"
            style={{
              fontSize: 'clamp(1.1rem, 2.4vw, 1.65rem)',
              lineHeight: 1.65,
              color: 'rgba(252, 231, 243, 0.88)',
              fontWeight: 300,
              marginBottom: '2.5rem',
            }}
          >
            Enjoy your day to the fullest, keep that warm unbeatable smile, aur haan… birthday treat pending hai with interest! 😌☕
          </p>

          {/* Action Button */}
          {!celebrated ? (
            <button
              ref={btnRef}
              onClick={blowCandlesAndCelebrate}
              className="celebrate-btn"
              style={{
                cursor: 'pointer',
                padding: '1.1rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #f472b6 0%, #D4A853 50%, #fbbf24 100%)',
                color: '#0B0A10',
                border: 'none',
                boxShadow: '0 10px 40px rgba(244, 114, 182, 0.4), 0 0 30px rgba(212, 168, 83, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 55px rgba(212, 168, 83, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(244, 114, 182, 0.4)';
              }}
            >
              🎂 Make A Wish & Blow The Candles ✨
            </button>
          ) : (
            <div
              style={{
                animation: 'badgeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                background: 'rgba(212, 168, 83, 0.12)',
                border: '1px solid rgba(212, 168, 83, 0.5)',
                borderRadius: '24px',
                padding: '2.2rem',
                marginTop: '1rem',
              }}
            >
              <div style={{ fontSize: '3.8rem', marginBottom: '0.8rem' }}>🎊🎂✨</div>
              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
                  fontWeight: 800,
                  marginBottom: '0.6rem',
                  color: '#F5D78E',
                }}
              >
                Wish Made & Candles Blown!
              </h3>
              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.6,
                  maxWidth: '520px',
                  margin: '0 auto',
                }}
              >
                Happy Birthday once again, Jagriti! 💖<br />
                May this year bring you limitless happiness, good people, and unforgettable moments. 🌸✨
              </p>

              <button
                onClick={blowCandlesAndCelebrate}
                style={{
                  marginTop: '1.8rem',
                  padding: '0.6rem 1.6rem',
                  background: 'transparent',
                  border: '1px solid rgba(212, 168, 83, 0.4)',
                  borderRadius: '50px',
                  color: '#F5D78E',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(212,168,83,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                ✨ Burst More Confetti! ✨
              </button>
            </div>
          )}
        </div>

        {/* Celebration blessing after cake cut */}
        {celebrated && (
          <div
            style={{
              marginTop: '2.5rem',
              padding: 'clamp(1.5rem, 4vw, 2.4rem)',
              borderRadius: '24px',
              background: 'linear-gradient(145deg, rgba(20, 36, 27, 0.88), rgba(10, 18, 14, 0.94))',
              border: '1.5px solid rgba(244, 114, 182, 0.4)',
              boxShadow: '0 16px 45px rgba(0,0,0,0.5), 0 0 25px rgba(244, 114, 182, 0.15)',
              textAlign: 'center',
              animation: 'badgeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h3
              className="font-display"
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 2rem)',
                color: '#fce7f3',
                marginBottom: '0.6rem',
                textShadow: '0 0 25px rgba(244, 114, 182, 0.45)',
              }}
            >
              🎂 Wish Made & Sent to the Stars! ✨
            </h3>
            <p
              className="font-cormorant"
              style={{
                fontSize: 'clamp(1.1rem, 2.2vw, 1.55rem)',
                color: 'rgba(232, 245, 233, 0.92)',
                maxWidth: '580px',
                margin: '0 auto',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              &ldquo;May this year bring you endless happiness, soothing rain petrichor, and all the magical blessings in the world. Keep smiling and staying your wonderful self. Happy Birthday, Jagriti! 🌸🍃&rdquo;
            </p>
          </div>
        )}

        {/* Footer Note */}
        <p
          style={{
            marginTop: '3rem',
            fontSize: '0.82rem',
            color: 'rgba(255, 255, 255, 0.35)',
            letterSpacing: '0.12em',
          }}
        >
          Crafted with care & admiration · October {new Date().getFullYear()} 💗
        </p>
      </div>

      <style>{`
        @keyframes flickerFlame {
          0% { transform: scale(1) rotate(-2deg); opacity: 0.9; }
          100% { transform: scale(1.15) rotate(3deg); opacity: 1; filter: drop-shadow(0 0 10px #f59e0b); }
        }
        @keyframes smokePuff {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-30px) scale(3); opacity: 0; filter: blur(4px); }
        }
      `}</style>
    </section>
  );
}
