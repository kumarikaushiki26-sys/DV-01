import React from 'react';
import { X, Award, Music, Film, Star, Clock, Ticket, Sparkles, Disc } from 'lucide-react';
import { DisneyMovie, DayNightMode } from '../types';
import { soundFx } from '../utils/audio';

interface MovieModalProps {
  movie: DisneyMovie | null;
  onClose: () => void;
  mode: DayNightMode;
}

export const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose, mode }) => {
  if (!movie) return null;
  const isDay = mode === 'day';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className={`relative w-full max-w-3xl my-8 rounded-3xl border shadow-2xl overflow-hidden transition-all ${
          isDay 
            ? 'bg-white text-slate-900 border-sky-200' 
            : 'bg-slate-950 text-slate-100 border-amber-400/40 shadow-amber-500/10'
        }`}
      >
        {/* Banner with close button */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden">
          <img 
            src={movie.bannerImage} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Close button */}
          <button
            id="close-movie-modal-btn"
            onClick={() => {
              soundFx.playPop();
              onClose();
            }}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Movie Title Banner Overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                {movie.era} • {movie.year}
              </span>
              <h3 className="text-2xl sm:text-4xl font-black font-disney-title text-white mt-1 drop-shadow-md">
                {movie.title}
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-amber-400 font-black text-lg bg-black/60 px-3 py-1.5 rounded-xl border border-amber-400/30">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>{movie.rating}/10</span>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Key Facts Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
            <div className={`p-3 rounded-2xl border ${isDay ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <div className="text-slate-400 font-bold flex items-center gap-1.5 mb-1">
                <Film className="w-3.5 h-3.5 text-sky-500" />
                <span>Director</span>
              </div>
              <div className="font-semibold">{movie.director}</div>
            </div>

            <div className={`p-3 rounded-2xl border ${isDay ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <div className="text-slate-400 font-bold flex items-center gap-1.5 mb-1">
                <Music className="w-3.5 h-3.5 text-amber-500" />
                <span>Composer</span>
              </div>
              <div className="font-semibold">{movie.composer}</div>
            </div>

            <div className={`p-3 rounded-2xl border ${isDay ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <div className="text-slate-400 font-bold flex items-center gap-1.5 mb-1">
                <Ticket className="w-3.5 h-3.5 text-emerald-500" />
                <span>Box Office</span>
              </div>
              <div className="font-semibold text-emerald-600 dark:text-emerald-400">{movie.boxOffice}</div>
            </div>

            <div className={`p-3 rounded-2xl border ${isDay ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
              <div className="text-slate-400 font-bold flex items-center gap-1.5 mb-1">
                <Award className="w-3.5 h-3.5 text-purple-500" />
                <span>Oscars</span>
              </div>
              <div className="font-semibold">{movie.oscars}</div>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-500 mb-2">
              Storyline Synopsis
            </h4>
            <p className="text-sm sm:text-base leading-relaxed opacity-90">
              {movie.synopsis}
            </p>
          </div>

          {/* Featured Quote */}
          <div className={`p-4 rounded-2xl border-l-4 border-l-amber-400 ${
            isDay ? 'bg-amber-50 border-slate-200 text-slate-800' : 'bg-amber-950/20 border-slate-800 text-amber-200'
          }`}>
            <span className="text-xs font-black uppercase text-amber-500 tracking-wider">Iconic Line:</span>
            <p className="font-disney-serif text-base italic mt-1">"{movie.featuredQuote}"</p>
          </div>

          {/* Legendary Soundtrack Tracklist */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Disc className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-500">
                Iconic 90s Soundtrack Tracklist
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {movie.songs.map((song, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm ${
                    isDay ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-500 font-bold flex items-center justify-center text-xs">
                      {i + 1}
                    </span>
                    <div>
                      <div className="font-bold">{song.title}</div>
                      <div className="text-[11px] text-slate-400">{song.singer}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{song.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Production Trivia Vault */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-500">
                Behind the Magic: Animation Vault Trivia
              </h4>
            </div>
            <ul className="space-y-2">
              {movie.trivia.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed opacity-90">
                  <span className="text-amber-400 font-bold mt-0.5">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t flex justify-end ${
          isDay ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <button
            onClick={() => {
              soundFx.playPixieChime();
              onClose();
            }}
            className="px-6 py-2 rounded-xl font-bold text-sm bg-amber-400 hover:bg-amber-500 text-slate-950 transition-colors shadow-md"
          >
            Close Vault Record
          </button>
        </div>
      </div>
    </div>
  );
};
