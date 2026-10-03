'use client';
import { useEffect, useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (typeof window !== 'undefined' && window.location.pathname.startsWith('/Jagriti-Birthday') ? '/Jagriti-Birthday' : '');
    const audio = new Audio(`${basePath}/tum-tak.mp3`);
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setPlaying(true);
          cleanupListeners();
        }).catch(() => {
          // Will retry on next interaction
        });
      }
    };

    // 1. Attempt immediate autoplay on load
    startAudio();

    // 2. Fallback listeners for strict mobile browser autoplay policies
    const events = ['touchstart', 'pointerdown', 'click', 'scroll', 'wheel', 'keydown', 'play-music'];
    const onUserInteraction = () => {
      startAudio();
    };

    const cleanupListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, onUserInteraction);
        document.removeEventListener(evt, onUserInteraction);
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, onUserInteraction, { passive: true, once: true });
      document.addEventListener(evt, onUserInteraction, { passive: true, once: true });
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
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => {
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
          <VolumeX size={15} color="#94a3b8" />
          <span>Play Tum Tak 🎵</span>
        </>
      )}
    </button>
  );
}
