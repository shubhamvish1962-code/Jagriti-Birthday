'use client';
import { useEffect, useRef, useState } from 'react';
import { Music, Volume2 } from 'lucide-react';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);

  useEffect(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (typeof window !== 'undefined' && window.location.pathname.startsWith('/Jagriti-Birthday') ? '/Jagriti-Birthday' : '');
    const audio = new Audio(`${basePath}/tum-tak.mp3`);
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = 'auto';
    audioRef.current = audio;

    const cleanupListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, onUserInteraction);
        document.removeEventListener(evt, onUserInteraction);
      });
    };

    const startAudio = () => {
      if (audioRef.current && !playingRef.current) {
        audioRef.current.play().then(() => {
          playingRef.current = true;
          setPlaying(true);
          cleanupListeners();
        }).catch(() => {
          // Keep listeners active until browser allows playback on user gesture
        });
      }
    };

    const onUserInteraction = () => {
      startAudio();
    };

    const events = ['click', 'pointerdown', 'touchstart', 'scroll', 'wheel', 'keydown', 'play-music'];

    // 1. Attempt immediate autoplay as soon as webpage opens
    startAudio();

    // 2. Persistent listeners on both window and document without once:true
    // Handlers will stay active until startAudio() succeeds!
    events.forEach((evt) => {
      window.addEventListener(evt, onUserInteraction, { passive: true });
      document.addEventListener(evt, onUserInteraction, { passive: true });
    });

    return () => {
      cleanupListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      playingRef.current = false;
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        playingRef.current = true;
        setPlaying(true);
      }).catch(() => {});
    }
  };

  return (
    <button
      className="music-toggle"
      onClick={toggle}
      aria-label="Toggle Tum Tak background music"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        cursor: 'pointer',
        animation: !playing ? 'pulseGlow 2s infinite' : 'none',
        border: !playing ? '1px solid rgba(244, 114, 182, 0.65)' : '1px solid rgba(249, 168, 212, 0.35)',
        boxShadow: !playing ? '0 4px 20px rgba(244, 114, 182, 0.45)' : 'none',
      }}
    >
      {playing ? (
        <>
          <Music size={15} color="#f472b6" style={{ animation: 'bounceY 1.2s infinite' }} />
          <span style={{ color: '#fbcfe8', fontWeight: 600 }}>Tum Tak 🎵</span>
          {/* Animated sound bars */}
          <span style={{ display: 'inline-flex', gap: '2px', alignItems: 'flex-end', height: '12px' }}>
            <span style={{ width: '2px', height: '100%', background: '#f472b6', animation: 'bounceY 0.8s infinite alternate' }} />
            <span style={{ width: '2px', height: '60%', background: '#74c69d', animation: 'bounceY 0.6s infinite alternate 0.2s' }} />
            <span style={{ width: '2px', height: '80%', background: '#fbbf24', animation: 'bounceY 0.7s infinite alternate 0.4s' }} />
          </span>
        </>
      ) : (
        <>
          <Volume2 size={15} color="#f472b6" style={{ animation: 'bounceY 1.4s infinite' }} />
          <span style={{ color: '#fbcfe8', fontWeight: 600 }}>Play Tum Tak 🎵</span>
        </>
      )}
    </button>
  );
}
