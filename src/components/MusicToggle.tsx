'use client';
import { useEffect, useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/tum-tak.mp3');
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    // Browser policy: start on first user click anywhere if not yet playing
    const handleFirstClick = () => {
      if (audioRef.current && !playing) {
        audioRef.current.play().then(() => {
          setPlaying(true);
        }).catch(() => {});
      }
      window.removeEventListener('click', handleFirstClick);
      window.removeEventListener('touchstart', handleFirstClick);
    };

    window.addEventListener('click', handleFirstClick, { once: true });
    window.addEventListener('touchstart', handleFirstClick, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstClick);
      window.removeEventListener('touchstart', handleFirstClick);
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
