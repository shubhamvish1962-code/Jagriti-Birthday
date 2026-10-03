'use client';

interface MarqueeDividerProps {
  text?: string;
  color?: string;
  direction?: 'left' | 'right';
}

const DEFAULT_ITEMS = ['✦', 'Happy Birthday', '🎂', 'Jagriti', '🌸', 'Special Girl', '✨', 'With Love', '💗', 'Stay Cute'];

export default function MarqueeDivider({
  text,
  color = '#a78bfa',
  direction = 'left',
}: MarqueeDividerProps) {
  const items = text ? [text, '✦', text, '✦'] : DEFAULT_ITEMS;
  const doubled = [...items, ...items]; // duplicate for seamless loop

  return (
    <div className="marquee-container" style={{ position: 'relative', zIndex: 5, overflow: 'hidden' }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: 120, height: '100%', zIndex: 2,
        background: 'linear-gradient(90deg, #0B0A10, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 120, height: '100%', zIndex: 2,
        background: 'linear-gradient(270deg, #0B0A10, transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex', gap: '3rem', whiteSpace: 'nowrap',
        animation: `marqueeScroll${direction === 'right' ? 'Rev' : ''} 20s linear infinite`,
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            letterSpacing: '0.2em',
            color: i % 2 === 0 ? color : 'rgba(255,255,255,0.3)',
            fontStyle: i % 3 === 1 ? 'italic' : 'normal',
            flexShrink: 0,
          }}>
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScrollRev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
