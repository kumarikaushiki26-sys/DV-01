import React, { useState } from 'react';
import { Newspaper, Bell, Sparkles, Send, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { DISNEY_UPDATES } from '../data/disneyData';
import { DisneyNewsUpdate, DayNightMode } from '../types';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface UpdatesSectionProps {
  mode: DayNightMode;
}

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({ mode }) => {
  const isDay = mode === 'day';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    soundFx.playFanfare();
    confetti({ particleCount: 50, spread: 70 });
    setSubscribed(true);
  };

  return (
    <section id="updates" className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      isDay ? 'bg-white' : 'bg-slate-950'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* News Ticker Strip */}
        <div className={`mb-10 p-3 rounded-2xl border flex items-center gap-3 overflow-hidden ${
          isDay ? 'bg-sky-50 border-sky-200 text-slate-800' : 'bg-slate-900 border-amber-400/30 text-amber-300'
        }`}>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase shrink-0">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span>DISNEY DISPATCH</span>
          </div>
          <div className="text-xs sm:text-sm font-semibold truncate animate-pulse">
            ✨ Breaking: 35th Anniversary Retro 90s Clamshell Vault box sets and nighttime drone symphony now premiering worldwide!
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
              isDay ? 'bg-sky-100 text-sky-800 border border-sky-200' : 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
            }`}>
              <Newspaper className="w-3.5 h-3.5 text-amber-400" />
              <span>Parks, Studio Vault & Premieres</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black font-disney-title tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}>
              DISNEY UPDATES & NEWS
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-xl font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
              Stay in touch with park celebrations, upcoming theatrical anniversaries, vault reissues, and rare Imagineering stories.
            </p>
          </div>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DISNEY_UPDATES.map((item) => (
            <div
              key={item.id}
              id={`news-card-${item.id}`}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between ${
                isDay
                  ? 'bg-slate-50 border-slate-200 text-slate-900'
                  : 'bg-slate-900 border-slate-800 text-white hover:border-amber-400/40'
              }`}
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                    {item.badge}
                  </span>

                  <span className="absolute bottom-2 left-3 text-[11px] font-medium text-slate-300">
                    {item.date} • {item.readTime}
                  </span>
                </div>

                <div className="p-5">
                  <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
                    {item.category}
                  </div>
                  <h3 className="text-base font-bold font-disney-title group-hover:text-amber-400 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {item.snippet}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs border-t border-slate-200 dark:border-slate-800/80 mt-4">
                <span className="text-slate-400 italic text-[11px]">
                  Via {item.source}
                </span>
                <span className="font-bold text-amber-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* The Disney Courier Newsletter Subscription Box */}
        <div className={`mt-12 p-8 rounded-3xl border text-center max-w-2xl mx-auto ${
          isDay
            ? 'bg-gradient-to-br from-sky-50 via-white to-amber-50 border-sky-200'
            : 'bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border-amber-400/30 shadow-xl'
        }`}>
          <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>

          <h3 className="text-2xl font-black font-disney-title">
            Join the Disneyverse Courier
          </h3>
          <p className={`text-xs sm:text-sm mt-1 mb-6 max-w-md mx-auto ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
            Receive secret Disney vault drops, trivia challenges, and park updates directly to your inbox.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your royal email address..."
                className={`w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium border focus:outline-none transition-colors ${
                  isDay
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-sky-500'
                    : 'bg-slate-950 border-slate-700 text-white focus:border-amber-400'
                }`}
              />
              <button
                type="submit"
                id="subscribe-newsletter-btn"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md hover:brightness-105 active:scale-95 transition-all shrink-0 flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Subscribe</span>
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold text-sm bg-emerald-500/10 py-3 px-6 rounded-2xl border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
              <span>Welcome to the Disneyverse family! Pixie dust sent to {email}!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
