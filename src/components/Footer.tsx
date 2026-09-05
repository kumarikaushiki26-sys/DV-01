import React from 'react';
import { Sparkles, Heart, Sun, Moon, Film, Tv, ShieldAlert } from 'lucide-react';
import { DayNightMode } from '../types';
import { soundFx } from '../utils/audio';

interface FooterProps {
  mode: DayNightMode;
  onNavigate: (sectionId: string) => void;
  onToggleMode: () => void;
}

export const Footer: React.FC<FooterProps> = ({ mode, onNavigate, onToggleMode }) => {
  const isDay = mode === 'day';

  return (
    <footer className={`border-t transition-colors duration-500 relative overflow-hidden ${
      isDay ? 'bg-sky-100/90 border-sky-200 text-slate-800' : 'bg-slate-950 border-amber-400/20 text-slate-300'
    }`}>
      {/* 90s Gold Decorative Arched Top Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow">
                🏰
              </div>
              <span className="text-2xl font-black font-disney-title tracking-tight text-amber-400">
                DISNEY<span className={isDay ? 'text-sky-600' : 'text-sky-400'}>VERSE</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              A tribute to the golden age of animation, celebrating the legendary 1989–1999 Disney Renaissance, 
              timeless characters, behind-the-scenes imagineering facts, interactive arcade games, and vintage Disney Store vault memories.
            </p>

            <div className="pt-2 text-xs italic font-disney-serif text-amber-500">
              "Laughter is timeless, imagination has no age, and dreams are forever." — Walt Disney
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-500 mb-3">
              Explore The Magic
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <button
                  onClick={() => {
                    soundFx.playPixieChime();
                    onNavigate('characters');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Interactive Characters
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFx.playVhsClick();
                    onNavigate('movies');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  90s Renaissance Movies & VHS
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFx.playPixieChime();
                    onNavigate('games');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Disney Arcade Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFx.playPixieChime();
                    onNavigate('facts');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Animation Secrets & Facts
                </button>
              </li>
            </ul>
          </div>

          {/* Retro Vault & Day/Night */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-500 mb-3">
              Kingdom Magic
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <button
                  onClick={() => {
                    soundFx.playPixieChime();
                    onNavigate('history');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  100+ Years Timeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFx.playPixieChime();
                    onNavigate('merch');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  90s Disney Store Merch
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    soundFx.playPixieChime();
                    onNavigate('updates');
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Park & Vault Updates
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onToggleMode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-amber-400 text-xs font-bold text-amber-300 transition-colors"
                >
                  {isDay ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                  <span>Switch to {isDay ? 'Enchanted Night' : 'Daylight Kingdom'}</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Nostalgia Note */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Disneyverse • Crafted with love & pixie dust</span>
            <span className="text-amber-400">✨</span>
          </div>

          <p className="text-center sm:text-right text-[11px] text-slate-500 max-w-md">
            Fan tribute celebrating Disney classics and the 90s Renaissance. All character names, movies, and associated marks are trademarks of The Walt Disney Company.
          </p>
        </div>
      </div>
    </footer>
  );
};
