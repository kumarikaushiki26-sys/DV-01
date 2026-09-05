import React, { useState } from 'react';
import { Clock, Award, Sparkles, Calendar, BookOpen, Star } from 'lucide-react';
import { DISNEY_HISTORY } from '../data/disneyData';
import { DisneyHistoryMilestone, DayNightMode } from '../types';
import { soundFx } from '../utils/audio';

interface HistorySectionProps {
  mode: DayNightMode;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ mode }) => {
  const isDay = mode === 'day';
  const [selectedDecade, setSelectedDecade] = useState<string>('All');
  const [activeMilestone, setActiveMilestone] = useState<DisneyHistoryMilestone>(
    DISNEY_HISTORY.find((h) => h.year === 1994) || DISNEY_HISTORY[0]
  );

  const decades = ['All', '1980s-1990s', '1920s-1940s', '1950s-1970s', '2000s-Present'];

  const filteredHistory = DISNEY_HISTORY.filter((item) =>
    selectedDecade === 'All' ? true : item.decade === selectedDecade
  );

  return (
    <section id="history" className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      isDay ? 'bg-sky-50/80' : 'bg-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            isDay ? 'bg-indigo-100 text-indigo-900 border border-indigo-200' : 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
          }`}>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Centennial Disney Chronicles</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black font-disney-title tracking-tight ${
            isDay ? 'text-slate-900' : 'text-white'
          }`}>
            100+ YEARS OF MAGIC & 90s RENAISSANCE
          </h2>
          <p className={`mt-2 text-sm sm:text-base font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
            From Walt's 1923 garage studio to the glorious Broadway-inspired 1989-1999 Renaissance that redefined global animation.
          </p>
        </div>

        {/* Decades Filter */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 mb-6 no-scrollbar">
          {decades.map((dec) => (
            <button
              key={dec}
              id={`decade-filter-${dec.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                soundFx.playPixieChime();
                setSelectedDecade(dec);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedDecade === dec
                  ? dec === '1980s-1990s'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-lg shadow-amber-400/30 ring-2 ring-amber-300'
                    : isDay
                    ? 'bg-indigo-900 text-white shadow-md'
                    : 'bg-amber-400 text-slate-950 font-black shadow-md'
                  : isDay
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700'
              }`}
            >
              {dec === '1980s-1990s' ? '★ 90s Renaissance Era ★' : dec}
            </button>
          ))}
        </div>

        {/* Highlight Banner on Active Milestone */}
        <div className={`mb-12 p-6 sm:p-8 rounded-3xl border transition-all shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center ${
          isDay 
            ? 'bg-white border-sky-200 text-slate-900' 
            : 'bg-slate-950 border-amber-400/30 text-slate-100'
        }`}>
          <div className="md:col-span-4 h-56 rounded-2xl overflow-hidden shadow-md">
            <img 
              src={activeMilestone.image} 
              alt={activeMilestone.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md text-xs font-black uppercase bg-amber-400 text-slate-950">
                Year {activeMilestone.year}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {activeMilestone.decade}
              </span>
              {activeMilestone.isRenaissanceHighlight && (
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>90s Golden Renaissance</span>
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-disney-title">
              {activeMilestone.title}
            </h3>

            <p className="text-sm sm:text-base leading-relaxed opacity-90">
              {activeMilestone.description}
            </p>

            <div className={`p-3.5 rounded-xl border-l-4 border-l-amber-400 text-xs sm:text-sm font-medium ${
              isDay ? 'bg-amber-50 text-amber-900' : 'bg-amber-950/20 text-amber-200'
            }`}>
              <span className="font-bold text-amber-500">Historical Significance: </span>
              {activeMilestone.significance}
            </div>
          </div>
        </div>

        {/* Interactive Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => {
            const isSelected = item.id === activeMilestone.id;
            return (
              <div
                key={item.id}
                id={`milestone-${item.id}`}
                onClick={() => {
                  soundFx.playPixieChime();
                  setActiveMilestone(item);
                }}
                className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 ${
                  isSelected
                    ? isDay
                      ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300 shadow-md'
                      : 'bg-slate-900 border-amber-400 ring-2 ring-amber-400/50 shadow-xl'
                    : isDay
                    ? 'bg-white border-slate-200 hover:border-sky-300'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xl font-black font-disney-title ${
                    item.isRenaissanceHighlight ? 'text-amber-400' : isDay ? 'text-indigo-900' : 'text-sky-400'
                  }`}>
                    {item.year}
                  </span>
                  {item.isRenaissanceHighlight && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                      Renaissance
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold font-disney-title group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h4>
                <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500">{item.decade}</span>
                  <span className="font-bold text-amber-500 text-xs">
                    {isSelected ? 'Viewing' : 'Inspect →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
