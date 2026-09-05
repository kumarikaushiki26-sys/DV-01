import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Share2, Copy, RefreshCw, BookmarkCheck, Lightbulb } from 'lucide-react';
import { DISNEY_FACTS } from '../data/disneyData';
import { DisneyFact, DayNightMode } from '../types';
import { soundFx } from '../utils/audio';

interface FactsSectionProps {
  mode: DayNightMode;
}

export const FactsSection: React.FC<FactsSectionProps> = ({ mode }) => {
  const isDay = mode === 'day';
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [randomFact, setRandomFact] = useState<DisneyFact | null>(DISNEY_FACTS[0]);

  const categories = ['All', '90s Renaissance', 'Animation Secrets', 'Theme Parks', 'Voice Legends'];

  const filteredFacts = DISNEY_FACTS.filter((fact) =>
    activeCategory === 'All' ? true : fact.category === activeCategory
  );

  const handleCopyFact = (fact: DisneyFact) => {
    soundFx.playPop();
    navigator.clipboard.writeText(`Disneyverse Fact: ${fact.title} — ${fact.fact}`);
    setCopiedId(fact.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRandomize = () => {
    soundFx.playMagicSpell();
    const otherFacts = DISNEY_FACTS.filter((f) => f.id !== randomFact?.id);
    const chosen = otherFacts[Math.floor(Math.random() * otherFacts.length)];
    setRandomFact(chosen);
  };

  return (
    <section id="facts" className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      isDay ? 'bg-white' : 'bg-slate-950'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
              isDay ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
            }`}>
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Animation Vault & Imagineering</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black font-disney-title tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}>
              MIND-BLOWING DISNEY FACTS
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-xl font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
              Uncover the legendary behind-the-scenes secrets of Robin Williams' voice improvisations, sound-design wizardry, and hidden park details.
            </p>
          </div>

          {/* Randomizer Fact Button */}
          <button
            id="random-fact-btn"
            onClick={handleRandomize}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all self-start md:self-auto ${
              isDay
                ? 'bg-sky-50 hover:bg-sky-100 text-sky-900 border-sky-300'
                : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-400/40'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
            <span>Generate Random Fact ✨</span>
          </button>
        </div>

        {/* Featured Spotlight Fact Banner */}
        {randomFact && (
          <div className={`mb-12 p-6 sm:p-8 rounded-3xl border transition-all shadow-xl relative overflow-hidden ${
            isDay
              ? 'bg-gradient-to-r from-amber-50 via-white to-sky-50 border-amber-200'
              : 'bg-gradient-to-r from-amber-950/30 via-slate-900 to-indigo-950/40 border-amber-400/40'
          }`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                    Featured Vault Secret
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {randomFact.category} • {randomFact.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-disney-title">
                  {randomFact.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed opacity-90 max-w-3xl">
                  {randomFact.fact}
                </p>
              </div>

              <button
                id={`copy-fact-${randomFact.id}`}
                onClick={() => handleCopyFact(randomFact)}
                className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 hover:border-amber-400 transition-colors"
              >
                {copiedId === randomFact.id ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Share Fact</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                soundFx.playPixieChime();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? isDay
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-amber-400 text-slate-950 font-black shadow-md'
                  : isDay
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-400 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacts.map((fact) => (
            <div
              key={fact.id}
              id={`fact-card-${fact.id}`}
              className={`group rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                isDay
                  ? 'bg-slate-50 border-slate-200 text-slate-900'
                  : 'bg-slate-900/80 border-slate-800 text-slate-100 hover:border-amber-400/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-400/15 text-amber-500 border border-amber-400/20">
                    {fact.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {fact.yearHint}
                  </span>
                </div>

                <h3 className="text-base font-bold font-disney-title group-hover:text-amber-400 transition-colors">
                  {fact.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {fact.fact}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-amber-500 font-semibold flex items-center gap-1">
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>{fact.tag}</span>
                </span>

                <button
                  id={`copy-btn-${fact.id}`}
                  onClick={() => handleCopyFact(fact)}
                  className="p-1.5 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-white transition-colors"
                  title="Copy Fact"
                >
                  {copiedId === fact.id ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
