import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sun, Moon, Play, Film, Gamepad2, ShoppingBag, Wand2, Compass } from 'lucide-react';
import { DayNightMode } from '../types';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface HeroProps {
  mode: DayNightMode;
  onToggleMode: () => void;
  onNavigate: (sectionId: string) => void;
  onTriggerCharacterAction: (charId: string) => void;
}

interface FireworkBurst {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const Hero: React.FC<HeroProps> = ({
  mode,
  onToggleMode,
  onNavigate,
  onTriggerCharacterAction,
}) => {
  const isDay = mode === 'day';
  const [fireworks, setFireworks] = useState<FireworkBurst[]>([]);
  const [activeSpeech, setActiveSpeech] = useState<string>(
    isDay 
      ? "Welcome to Disneyverse! It's a glorious day in the Magic Kingdom!"
      : "Welcome to the Midnight Gala! Click the night sky to launch fireworks!"
  );
  const skyRef = useRef<HTMLDivElement>(null);

  // Update speech when day/night switches
  useEffect(() => {
    setActiveSpeech(
      isDay 
        ? "☀️ Rise and shine! Explore our 90s Renaissance classics and park wonders!"
        : "✨ Gaze at the stars! The castle fireworks spectacular has begun!"
    );
  }, [isDay]);

  // Handle clicking on sky to launch fireworks in night mode or sparkles in day mode
  const handleSkyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!skyRef.current) return;
    const rect = skyRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!isDay) {
      soundFx.playFireworkBoom();
      const colors = ['#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#EC4899', '#A855F7', '#FDE047'];
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      const newBurst: FireworkBurst = {
        id: Date.now(),
        x,
        y,
        color: chosenColor,
      };
      setFireworks((prev) => [...prev.slice(-6), newBurst]);

      // Trigger mini confetti burst from click position
      const clientXRatio = e.clientX / window.innerWidth;
      const clientYRatio = e.clientY / window.innerHeight;
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x: clientXRatio, y: clientYRatio },
        colors: ['#F59E0B', '#38BDF8', '#F43F5E', '#A855F7', '#FFFFFF'],
        ticks: 80,
      });

      setTimeout(() => {
        setFireworks((prev) => prev.filter((b) => b.id !== newBurst.id));
      }, 1500);
    } else {
      soundFx.playPixieChime();
      setActiveSpeech("✨ Sunshine sparkles! You just summoned extra pixie dust!");
    }
  };

  const handleMickeyClick = () => {
    soundFx.playMagicSpell();
    onTriggerCharacterAction('mickey');
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.7, x: 0.85 },
      colors: ['#EF4444', '#F59E0B', '#3B82F6', '#FFFFFF'],
    });
    setActiveSpeech("Mickey: 'Oh boy! That's real Disney magic right there!'");
  };

  const handleTinkClick = () => {
    soundFx.playPixieChime();
    onTriggerCharacterAction('tinkerbell');
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.3, x: 0.5 },
      colors: ['#10B981', '#FACC15', '#E0F2FE'],
    });
    setActiveSpeech("Tinker Bell: 'Faith, trust, and a shower of golden pixie dust!'");
  };

  return (
    <section 
      ref={skyRef}
      id="hero"
      onClick={handleSkyClick}
      className={`relative min-h-[620px] md:min-h-[700px] overflow-hidden transition-all duration-700 select-none flex flex-col justify-between ${
        isDay
          ? 'bg-gradient-to-b from-sky-400 via-sky-200 to-indigo-100 text-slate-900'
          : 'bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950 text-slate-100'
      }`}
    >
      {/* Background Ambience: Day Sun vs Night Moon & Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isDay ? (
          // Day Sun with gentle radiant glow
          <>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 md:left-24 md:translate-x-0 w-36 h-36 rounded-full bg-amber-300/80 blur-2xl animate-pulse" />
            <div className="absolute top-14 left-1/2 -translate-x-1/2 md:left-28 md:translate-x-0 w-24 h-24 rounded-full bg-amber-200 border-4 border-amber-100/80 shadow-lg shadow-amber-300/50 flex items-center justify-center">
              <Sun className="w-12 h-12 text-amber-500 animate-spin-slow" />
            </div>

            {/* Drifting Cartoon Fluffy Clouds */}
            <motion.div 
              animate={{ x: [-40, 40, -40] }} 
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-20 right-16 w-44 h-16 bg-white/70 backdrop-blur-xs rounded-full shadow-md"
            >
              <div className="absolute -top-8 left-6 w-20 h-20 bg-white/70 rounded-full" />
              <div className="absolute -top-5 left-18 w-16 h-16 bg-white/70 rounded-full" />
            </motion.div>

            <motion.div 
              animate={{ x: [30, -30, 30] }} 
              transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-44 left-12 w-52 h-18 bg-white/60 backdrop-blur-xs rounded-full shadow-sm hidden md:block"
            >
              <div className="absolute -top-10 left-10 w-24 h-24 bg-white/60 rounded-full" />
              <div className="absolute -top-6 left-24 w-18 h-18 bg-white/60 rounded-full" />
            </motion.div>
          </>
        ) : (
          // Night Glowing Moon & Sparkling Starfield
          <>
            <div className="absolute top-10 right-14 md:right-28 w-28 h-28 rounded-full bg-amber-100/10 blur-xl" />
            <div className="absolute top-12 right-16 md:right-32 w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-300/40 shadow-xl shadow-amber-200/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-indigo-950/20 relative overflow-hidden">
                <div className="absolute top-2 left-4 w-4 h-4 rounded-full bg-amber-300/30" />
                <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-amber-300/30" />
              </div>
            </div>

            {/* Twinkling CSS Stars */}
            {[...Array(35)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  top: `${(i * 17) % 75}%`,
                  left: `${(i * 29) % 96}%`,
                  width: `${(i % 3) + 2}px`,
                  height: `${(i % 3) + 2}px`,
                  opacity: 0.3 + ((i % 7) * 0.1),
                  animationDuration: `${2 + (i % 4)}s`,
                }}
              />
            ))}
          </>
        )}

        {/* Dynamic Fireworks Rendering on Sky */}
        {!isDay && fireworks.map((fw) => (
          <div
            key={fw.id}
            className="absolute pointer-events-none"
            style={{ left: fw.x, top: fw.y }}
          >
            <div 
              className="w-4 h-4 rounded-full animate-ping"
              style={{ backgroundColor: fw.color }}
            />
            {/* 8 radiant burst sparks */}
            {[...Array(8)].map((_, idx) => {
              const angle = (idx * Math.PI * 2) / 8;
              const dist = 35;
              const ox = Math.cos(angle) * dist;
              const oy = Math.sin(angle) * dist;
              return (
                <div
                  key={idx}
                  className="absolute w-2 h-2 rounded-full transition-all duration-700 opacity-90"
                  style={{
                    backgroundColor: fw.color,
                    transform: `translate(${ox}px, ${oy}px)`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Hero Central Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 w-full flex-1 flex flex-col justify-between">
        
        {/* Top Control Badge: Interactive Day / Night Dynamic Mood Switch */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              id="hero-day-night-pill"
              onClick={(e) => {
                e.stopPropagation();
                onToggleMode();
                soundFx.playPixieChime();
              }}
              className={`group flex items-center gap-2.5 px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-md ${
                isDay
                  ? 'bg-white/90 hover:bg-white text-indigo-950 border border-sky-300 shadow-sky-400/20'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-400/40 shadow-purple-950/60'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform group-hover:rotate-45 ${
                isDay ? 'bg-amber-400 text-amber-950' : 'bg-indigo-600 text-amber-200'
              }`}>
                {isDay ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </div>
              <span>
                {isDay ? 'Switch to Midnight Fireworks 🌙' : 'Switch to Daylight Kingdom ☀️'}
              </span>
            </button>
            <span className={`text-xs hidden sm:inline-block font-semibold ${isDay ? 'text-sky-900/80' : 'text-amber-200/80'}`}>
              {isDay ? 'Day Mode: Sunny Park Ambience' : 'Night Mode: Tap Sky For Fireworks'}
            </span>
          </div>

          {/* Interactive Tinker Bell flying launcher */}
          <button
            id="summon-tink-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleTinkClick();
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
              isDay
                ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300'
                : 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border-emerald-500/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
            <span>Tinker Bell: Summon Pixie Dust</span>
          </button>
        </div>

        {/* Main Title & Arched Disney Crest */}
        <div className="text-center my-6 md:my-10 max-w-4xl mx-auto">
          {/* Arched Fairytale Star Arc Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase mb-4 shadow-sm border backdrop-blur-sm ${
            isDay 
              ? 'bg-sky-200/80 border-sky-300 text-indigo-950' 
              : 'bg-amber-400/10 border-amber-400/30 text-amber-300'
          }">
            <span className="text-amber-400">★</span>
            <span>Welcome to the Ultimate 90s & Modern Disney Portal</span>
            <span className="text-amber-400">★</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight font-disney-title uppercase leading-none drop-shadow-md">
            <span className={isDay ? 'text-indigo-950' : 'text-white'}>
              DISNEY
            </span>
            <span className={`inline-block ml-3 sm:ml-4 ${
              isDay 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-700' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500'
            }`}>
              VERSE
            </span>
          </h1>

          <p className={`mt-4 text-base sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed ${
            isDay ? 'text-slate-700' : 'text-slate-300'
          }`}>
            Step through the magical portal of classic <span className="font-bold underline decoration-amber-400">90s Renaissance</span> cinema, 
            interactive animated characters, mind-blowing facts, retro arcade games, park updates, and rare vintage vault merchandise.
          </p>

          {/* Interactive Dialogue Speech Bubble */}
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border text-sm font-semibold backdrop-blur-md shadow-lg transition-all animate-fade-in ${
            isDay
              ? 'bg-white/90 border-sky-200 text-indigo-950 shadow-sky-300/30'
              : 'bg-slate-900/90 border-amber-400/40 text-amber-200 shadow-black/60'
          }">
            <span className="text-lg">💬</span>
            <span className="font-disney-fun tracking-wide">{activeSpeech}</span>
          </div>

          {/* Core Action Navigation Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-explore-movies-btn"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playVhsClick();
                onNavigate('movies');
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-600 hover:brightness-110 shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
            >
              <Film className="w-5 h-5" />
              <span>90s Movies & VHS Vault</span>
            </button>

            <button
              id="hero-play-games-btn"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playPixieChime();
                onNavigate('games');
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-105 shadow-lg shadow-amber-400/30 transition-transform active:scale-95"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Play Disney Games</span>
            </button>

            <button
              id="hero-shop-merch-btn"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playPixieChime();
                onNavigate('merch');
              }}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base border transition-all ${
                isDay
                  ? 'bg-white/80 hover:bg-white text-indigo-950 border-sky-300 shadow-md'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-100 border-slate-700 shadow-md'
              }`}
            >
              <ShoppingBag className="w-5 h-5 text-pink-500" />
              <span>90s Retro Merch</span>
            </button>
          </div>
        </div>

        {/* Castle Illustration Stage with Interactive Characters Standing Below */}
        <div className="relative w-full max-w-5xl mx-auto pt-4 pb-2">
          {/* Castle Silhouette & Spire Artwork */}
          <div className="relative mx-auto w-full max-w-2xl h-44 sm:h-52 flex items-end justify-center">
            
            {/* The Classic Disney Arched Star Shooting Over Castle */}
            <svg 
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-xl h-40 pointer-events-none" 
              viewBox="0 0 500 160"
            >
              <path
                d="M 40 140 Q 250 -40 460 140"
                fill="none"
                stroke={isDay ? "url(#dayStarGrad)" : "url(#nightStarGrad)"}
                strokeWidth="3.5"
                strokeDasharray="6 6"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="dayStarGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#2563EB" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="nightStarGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#FACC15" stopOpacity="1" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              {/* Star at Apex */}
              <circle cx="250" cy="50" r="4" fill="#FACC15" className="animate-ping" />
              <polygon points="250,42 253,48 259,48 254,52 256,58 250,54 244,58 246,52 241,48 247,48" fill="#FEF08A" />
            </svg>

            {/* Fairytale Castle Architecture */}
            <div className="relative flex items-end justify-center w-full">
              {/* Left Outer Tower */}
              <div className={`w-14 sm:w-18 h-32 sm:h-40 rounded-t-lg border-t-2 relative ${
                isDay 
                  ? 'bg-gradient-to-t from-sky-300 to-indigo-200 border-indigo-400' 
                  : 'bg-gradient-to-t from-indigo-900 to-slate-800 border-amber-400/40'
              }`}>
                {/* Turret Cone */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[28px] border-l-transparent border-r-[28px] border-r-transparent border-b-[48px] border-b-sky-600">
                  <div className="absolute top-1 -left-2 w-4 h-2 bg-amber-400 rounded-sm" />
                </div>
                {/* Castle Window */}
                <div className={`w-4 h-8 mx-auto mt-6 rounded-t-full ${
                  isDay ? 'bg-sky-900' : 'bg-amber-300 shadow-md shadow-amber-300/50'
                }`} />
              </div>

              {/* Central Main Keep Tower */}
              <div className={`w-28 sm:w-36 h-44 sm:h-52 rounded-t-xl border-t-2 mx-2 relative z-10 ${
                isDay 
                  ? 'bg-gradient-to-t from-sky-200 to-indigo-100 border-indigo-500 shadow-lg' 
                  : 'bg-gradient-to-t from-slate-900 to-indigo-950 border-amber-400/60 shadow-2xl'
              }`}>
                {/* Tallest Center Spire */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[36px] border-l-transparent border-r-[36px] border-r-transparent border-b-[64px] border-b-blue-700">
                  <div className="absolute -top-4 -left-1 w-2 h-4 bg-amber-400 animate-bounce" />
                </div>
                {/* Arched Gate */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-20 rounded-t-full bg-slate-950/80 border-t-4 border-amber-400 flex items-center justify-center">
                  <div className="w-8 h-12 rounded-t-full border border-amber-300/40 bg-amber-400/10" />
                </div>
                {/* Illuminated Stained Glass Windows */}
                <div className="flex justify-center gap-2 mt-8">
                  <div className={`w-3.5 h-7 rounded-t-full ${isDay ? 'bg-sky-800' : 'bg-amber-300 shadow-md shadow-amber-300'}`} />
                  <div className={`w-3.5 h-7 rounded-t-full ${isDay ? 'bg-sky-800' : 'bg-amber-300 shadow-md shadow-amber-300'}`} />
                </div>
              </div>

              {/* Right Outer Tower */}
              <div className={`w-14 sm:w-18 h-32 sm:h-40 rounded-t-lg border-t-2 relative ${
                isDay 
                  ? 'bg-gradient-to-t from-sky-300 to-indigo-200 border-indigo-400' 
                  : 'bg-gradient-to-t from-indigo-900 to-slate-800 border-amber-400/40'
              }`}>
                {/* Turret Cone */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[28px] border-l-transparent border-r-[28px] border-r-transparent border-b-[48px] border-b-sky-600" />
                {/* Castle Window */}
                <div className={`w-4 h-8 mx-auto mt-6 rounded-t-full ${
                  isDay ? 'bg-sky-900' : 'bg-amber-300 shadow-md shadow-amber-300/50'
                }`} />
              </div>
            </div>

            {/* Clickable Mickey Mouse Host on Castle Forecourt */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleMickeyClick();
              }}
              className="absolute -bottom-4 right-4 sm:right-16 z-20 cursor-pointer bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-2xl border border-amber-400/50 shadow-xl flex items-center gap-2.5 backdrop-blur-md"
            >
              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-black text-sm text-white">
                🏰
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <span>Mickey Host</span>
                  <Wand2 className="w-3 h-3 text-amber-400" />
                </div>
                <div className="text-[11px] text-slate-300">Tap to cast spell!</div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
