'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor           from '@/components/CustomCursor';
import MusicToggle            from '@/components/MusicToggle';
import ProgressBar            from '@/components/ProgressBar';
import HeroSection            from '@/components/HeroSection';
import ChapterSection         from '@/components/ChapterSection';
import InterludeCard          from '@/components/InterludeCard';
import GrandFinale            from '@/components/GrandFinale';
import MarqueeDivider         from '@/components/MarqueeDivider';

// 2D Palettes, Dark Cloud, Greenery & Baby Pink Blossoms
const CloudGreeneryBackground = dynamic(() => import('@/components/CloudGreeneryBackground'), { ssr: false });
// Realistic Multi-Layer Rain + Drifting Baby Pink Petals
const RealisticRain           = dynamic(() => import('@/components/RealisticRain'), { ssr: false });
// Persistent 3D Raindrop, Blooming Pink Petals & Emerald Leaves Sculpture (Travels down across all chapters)
const DynamicNature3D         = dynamic(() => import('@/components/DynamicNature3D'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const init = async () => {
      const Lenis = (await import('lenis')).default;
      const lenis = new Lenis({
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on('scroll', () => ScrollTrigger.update());
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    };
    init();
  }, []);

  return (
    <main style={{ background: '#070c09', position: 'relative', overflow: 'hidden', minHeight: '100vh', width: '100%' }}>
      {/* Fixed global UI */}
      <CustomCursor />
      <ProgressBar />
      <MusicToggle />

      {/* 2D Palettes + Dark Cloud + Lush Greenery + Baby Pink Blossoms with Parallax Depth */}
      <CloudGreeneryBackground />

      {/* Realistic Multi-Layer Falling Rain + Floating Baby Pink Petals */}
      <RealisticRain />

      {/* Persistent 3D Nature Sculpture (Descends smoothly across the entire scroll path) */}
      <DynamicNature3D />

      {/* ══ HERO ══════════════════════════════════ */}
      <HeroSection />

      {/* ══ MARQUEE DIVIDER ═══════════════════════ */}
      <MarqueeDivider color="#f9a8d4" text="Baby Pink Petals ✦ Rain on Green Leaves ✦ Happy Birthday Jagriti ✦ 🌸 ✦" />

      {/* ══ CH 1: Pehli Baarish ════════════════════ */}
      <ChapterSection
        id="ch1"
        chapterNum="01"
        label="Rain on Leaves"
        emoji="🌸"
        accentColor="#f9a8d4"
        textGradient="linear-gradient(135deg, #fff0f5 0%, #fbcfe8 45%, #74c69d 100%)"
        reactions={['Baby Pink 🌸', 'Petrichor 🍃', 'Aww 🥹']}
        lines={[
          'Happy Birthday Jagriti! 🌸🌧️',
          'Dark clouds ke neeche jab baarish fresh green leaves aur baby pink blossoms pe girti hai na… waisi hi peaceful aur calming ho tum.',
          'Bas aise hi cute, happy aur thodi si pagal rehna hamesha. 🫶🏻💗',
        ]}
      />

      <MarqueeDivider
        color="#52b788"
        direction="right"
        text="Warm Lantern In Rain ✦ That Warm Smile ✦ ☕ ✦ Greenery & Pink Petals ✦"
      />

      {/* ══ CH 2: Warmth on a Rainy Day ════════════ */}
      <ChapterSection
        id="ch2"
        chapterNum="02"
        label="The Warmth"
        emoji="☕"
        accentColor="#fbbf24"
        textGradient="linear-gradient(135deg, #fef08a 0%, #f9a8d4 50%, #fbbf24 100%)"
        reactions={['Hot Coffee ☕', 'Haha facts 😂', 'Pure Warmth 💛']}
        lines={[
          'Thandi baarish aur wet green foliage ke beech jaise ek warm coffee ya lantern light comfort deti hai…',
          'Honestly, tumhari smile bhi bilkul waisi hi warmth spread karti hai. Iska koi competition ho hi nahi sakta! 😌😂',
          'Keep smiling, Jagriti. That warm smile suits you the most. ☕✨',
        ]}
      />

      {/* ══ INTERLUDE 1: Rain Dilemma ══════════════ */}
      <InterludeCard
        id="interlude1"
        question="Dark clouds roll in aur tez baarish hone lagi… ab kya plan hai? ☁️🌧️"
        runaway
        options={[
          { label: 'Warm Chai + Pakore with senior ☕🧆', emoji: '☕' },
          { label: 'Baarish mein bheegna like a pagal 😂☔', emoji: '☔' },
        ]}
      />

      <MarqueeDivider
        color="#fbcfe8"
        text="Pink Umbrella ✦ Green Canopy ✦ 🌸 ✦ Always Safe & Happy ✦"
      />

      {/* ══ CH 3: The Pink Shelter ════════════════ */}
      <ChapterSection
        id="ch3"
        chapterNum="03"
        label="Pink Shelter"
        emoji="☔"
        accentColor="#f472b6"
        textGradient="linear-gradient(135deg, #fff0f5 0%, #f9a8d4 60%, #52b788 100%)"
        reactions={['Thank you! 🥹', 'Touchwood 🌸', 'Sweetest wish 💗']}
        lines={[
          'Birthday pe ek pyari si wish hai meri…',
          'Life mein chahe kitne bhi stormy clouds aayein, tumhare paas hamesha peace, genuine happiness aur achhe logon ka shelter rahe. 🌸✨',
        ]}
      />

      <MarqueeDivider
        color="#52b788"
        direction="right"
        text="Hot Chocolate ✦ 🍫 ✦ Unlimited Care & Bakchodi ✦ 🌧️ ✦"
      />

      {/* ══ CH 4: Hot Chocolate & Bakchodi ═════════ */}
      <ChapterSection
        id="ch4"
        chapterNum="04"
        label="Extra Dose"
        emoji="🍫"
        accentColor="#f9a8d4"
        textGradient="linear-gradient(135deg, #fff0f5 0%, #f9a8d4 50%, #fbbf24 100%)"
        reactions={['Hot Chocolate 🍫', 'Bakchodi ready 😂', 'Best senior! 🫶🏻']}
        lines={[
          'Cake toh sab tumhe khilayenge… 🎂',
          'Par rainy weather mein meri taraf se hot chocolate, extra dose of care, aur thodi si non-stop bakchodi milegi. 😂🫶🏻',
          'Happy Birthday, pretty girl! 💗',
        ]}
      />

      {/* ══ INTERLUDE 2: Rainy Treat ═══════════════ */}
      <InterludeCard
        id="interlude2"
        question="Rainy Birthday Treat selection for senior: 🌧️😋"
        options={[
          { label: 'Hot Chocolate & Warm Brownie', emoji: '☕🍫' },
          { label: 'Steaming Pizza in the rain', emoji: '🍕🌧️' },
          { label: 'Treat pending with 100% interest', emoji: '📈' },
        ]}
      />

      <MarqueeDivider
        color="#74c69d"
        text="Sunlight Through Leaves ✦ Rare & Special ✦ 🌿 ✦ One of a Kind ✦"
      />

      {/* ══ CH 5: Sunlight Through Leaves ═══════════ */}
      <ChapterSection
        id="ch5"
        chapterNum="05"
        label="Sunlight"
        emoji="✨"
        accentColor="#fbcfe8"
        textGradient="linear-gradient(135deg, #fff0f5 0%, #fbcfe8 50%, #74c69d 100%)"
        reactions={['Sunlight ✨', 'Blushing 😊', 'Genuinely special 🌸']}
        lines={[
          'Pata nahi tumhe realize hai ya nahi,',
          'Baarish ke baad green leaves ke beech se aane wali pehli gentle dhoop jaisi ho tum — genuinely different & kaafi special. 🍃✨',
          'So today, smile a little extra… because it\'s your day. 🫶🏻',
        ]}
      />

      <MarqueeDivider
        color="#f9a8d4"
        direction="right"
        text="Favourite Junior ✦ 🎀 ✦ Cute Simple Unpredictable ✦ 🌧️ ✦"
      />

      {/* ══ CH 6: Favourite Junior ═════════════════ */}
      <ChapterSection
        id="ch6"
        chapterNum="06"
        label="Favourite Junior"
        emoji="🎀"
        accentColor="#f472b6"
        textGradient="linear-gradient(135deg, #fff0f5 0%, #f9a8d4 60%, #fbbf24 100%)"
        reactions={['Favourite junior 😌', 'Hahaha true 😂', 'Always the same 🎀']}
        lines={[
          'College mein juniors toh bahut hain…',
          'Par meri favourite junior ki baat hi alag hai! 👀😂',
          'Happy Birthday, Jagriti! 🎂💗 Stay the same — cute, simple & unpredictable. ✨',
        ]}
      />

      <MarqueeDivider
        color="#52b788"
        text="Fresh Clear Skies ✦ Golden Memories ✦ 💫 ✦ Genuine Happiness ✦"
      />

      {/* ══ CH 7: Fresh Clear Skies ════════════════ */}
      <ChapterSection
        id="ch7"
        chapterNum="07"
        label="Clear Skies"
        emoji="💫"
        accentColor="#fbcfe8"
        textGradient="linear-gradient(135deg, #fff0f5 0%, #fbcfe8 50%, #74c69d 100%)"
        reactions={['Fresh Skies 💫', 'Amen 🌸', 'Special Memories 💖']}
        lines={[
          'Aaj birthday hai, isliye zyada lecture nahi dunga… 😌',
          'Baarish ke baad ka aasmaan aur fresh foliage hamesha sabse peaceful hota hai — aur meri wish hai ki tumhari life aane wale saare saal beautiful memories aur genuine happiness se bhare rahein. 🫶🏻🌸',
        ]}
      />

      {/* ══ GRAND FINALE: Candle in the Greenery ════ */}
      <GrandFinale />
    </main>
  );
}
