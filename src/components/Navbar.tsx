import React from 'react';
import { Sun, Moon, Volume2, VolumeX, Sparkles, Tv, ShoppingBag } from 'lucide-react';
import { DayNightMode } from '../types';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  mode: DayNightMode;
  onToggleMode: () => void;
  vhsMode: boolean;
  onToggleVhs: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  onToggleMode,
  vhsMode,
  onToggleVhs,
  soundEnabled,
  onToggleSound,
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate
}) => {
  const isDay = mode === 'day';

  const navItems = [
    { id: 'characters', label: 'Characters' },
    { id: 'movies', label: 'Movies & VHS' },
    { id: 'facts', label: 'Facts' },
    { id: 'games', label: 'Games' },
    { id: 'updates', label: 'Updates' },
    { id: 'history', label: 'History' },
    { id: 'merch', label: '90s Vault Merch' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-500 backdrop-blur-md border-b ${
      isDay 
        ? 'bg-sky-100/90 border-sky-200/80 text-slate-800 shadow-sm' 
        : 'bg-slate-950/85 border-amber-500/20 text-slate-100 shadow-xl shadow-black/40'
    }`}>
      {/* 90s VHS Tracking Header Bar if VHS mode is active */}
      {vhsMode && (
        <div className="bg-black text-emerald-400 font-mono text-xs px-4 py-0.5 flex items-center justify-between border-b border-emerald-900/50 select-none">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>PLAY ► SP 0:42:18</span>
          </span>
          <span className="tracking-widest hidden sm:inline">DISNEY MASTERPIECE COLLECTION • HI-FI STEREO</span>
          <span className="text-amber-400">CH 03 [AUTO-TRACKING]</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => onNavigate('hero')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          {/* Arched Castle Crest */}
          <div className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-md ${
            isDay 
              ? 'bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-sky-500/25' 
              : 'bg-gradient-to-tr from-amber-500 via-purple-700 to-indigo-900 text-amber-200 border border-amber-400/40 shadow-amber-500/20'
          }`}>
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 text-xs">✨</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-2xl sm:text-3xl font-black tracking-tight font-disney-title ${
                isDay 
                  ? 'text-indigo-950' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-500 drop-shadow-sm'
              }`}>
                DISNEY<span className={isDay ? 'text-sky-600' : 'text-sky-400'}>VERSE</span>
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded ${
                isDay ? 'bg-sky-200 text-sky-900' : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
              }`}>
                90s Era
              </span>
            </div>
            <p className={`text-xs font-medium ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
              The Golden Magic Kingdom
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  soundFx.playPixieChime();
                  onNavigate(item.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? isDay
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                      : 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : isDay
                      ? 'text-slate-700 hover:text-sky-600 hover:bg-sky-200/60'
                      : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Controls: Day/Night Toggle, VHS Mode, Sound, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Day / Night Toggle Button */}
          <button
            id="day-night-toggle-btn"
            onClick={onToggleMode}
            title={isDay ? "Switch to Enchanted Night (Midnight Castle & Fireworks)" : "Switch to Magic Kingdom Daylight"}
            className={`relative flex items-center gap-2 px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm border transition-all duration-300 shadow-md ${
              isDay
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300 shadow-amber-200/50'
                : 'bg-indigo-950/80 hover:bg-indigo-900 text-amber-200 border-amber-400/40 shadow-purple-950/50'
            }`}
          >
            {isDay ? (
              <>
                <Sun className="w-4 h-4 text-amber-600 animate-spin-slow" />
                <span className="hidden sm:inline">Day</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-amber-300" />
                <span className="hidden sm:inline">Night</span>
              </>
            )}
          </button>

          {/* 90s VHS Aesthetic Toggle */}
          <button
            id="vhs-mode-btn"
            onClick={onToggleVhs}
            title="Toggle authentic 1990s VHS scanline nostalgia"
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-2xl text-xs font-bold border transition-colors ${
              vhsMode
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-mono shadow-md shadow-emerald-500/25'
                : isDay
                  ? 'bg-white/80 hover:bg-white text-slate-700 border-slate-300'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="hidden md:inline">VHS 90s</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            id="sound-fx-toggle-btn"
            onClick={onToggleSound}
            title={soundEnabled ? "Mute fairy chimes & audio effects" : "Enable magical sounds"}
            className={`p-2 rounded-2xl border transition-colors ${
              soundEnabled
                ? isDay
                  ? 'bg-sky-200 text-sky-800 border-sky-300'
                  : 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                : 'bg-transparent text-slate-400 border-slate-500/40'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Magic Merch Bag / Cart */}
          <button
            id="open-cart-drawer-btn"
            onClick={onOpenCart}
            title="Open 90s Disney Merch Bag"
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md ${
              isDay
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:brightness-105'
                : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 hover:brightness-110'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Magic Bag</span>
            {cartCount > 0 && (
              <span className="ml-0.5 inline-flex items-center justify-center w-5 h-5 text-xs font-black rounded-full bg-white text-slate-900 shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Scrolling Strip */}
      <div className={`lg:hidden flex items-center gap-2 px-4 py-2 overflow-x-auto no-scrollbar border-t ${
        isDay ? 'bg-sky-200/50 border-sky-200' : 'bg-slate-900/60 border-slate-800'
      }`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            id={`mobile-nav-${item.id}`}
            onClick={() => {
              soundFx.playPixieChime();
              onNavigate(item.id);
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeSection === item.id
                ? isDay
                  ? 'bg-sky-600 text-white'
                  : 'bg-amber-400 text-slate-950 font-bold'
                : isDay
                  ? 'text-slate-700 bg-sky-100/80'
                  : 'text-slate-300 bg-slate-800/80'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
