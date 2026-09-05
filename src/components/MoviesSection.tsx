import React, { useState } from 'react';
import { Film, Tv, Star, Play, Sparkles, Search, Music, Award, ExternalLink } from 'lucide-react';
import { DISNEY_MOVIES } from '../data/disneyData';
import { DisneyMovie, DayNightMode } from '../types';
import { MovieModal } from './MovieModal';
import { soundFx } from '../utils/audio';

interface MoviesSectionProps {
  mode: DayNightMode;
  vhsMode: boolean;
}

export const MoviesSection: React.FC<MoviesSectionProps> = ({ mode, vhsMode }) => {
  const isDay = mode === 'day';
  const [activeEra, setActiveEra] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewStyle, setViewStyle] = useState<'stream' | 'vhs'>('vhs'); // Default to 90s VHS for nostalgia!
  const [selectedMovie, setSelectedMovie] = useState<DisneyMovie | null>(null);

  const eras = ['All', 'Renaissance (90s)', 'Modern Classics'];

  const filteredMovies = DISNEY_MOVIES.filter((movie) => {
    const matchesEra =
      activeEra === 'All'
        ? true
        : activeEra === 'Renaissance (90s)'
        ? movie.era === 'Renaissance (90s)'
        : movie.era !== 'Renaissance (90s)';

    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.songs.some((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesEra && matchesSearch;
  });

  const handleOpenMovie = (movie: DisneyMovie) => {
    soundFx.playVhsClick();
    setSelectedMovie(movie);
  };

  return (
    <section id="movies" className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      isDay ? 'bg-sky-50/70' : 'bg-slate-950'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header with Title & VHS View Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
              isDay ? 'bg-sky-200 text-sky-900 border border-sky-300' : 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
            }`}>
              <Film className="w-3.5 h-3.5 text-amber-400" />
              <span>The Walt Disney Masterpiece Collection</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black font-disney-title tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}>
              90s RENAISSANCE & MOVIES
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-xl font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
              Relive the greatest decade in animation history. Experience each film through modern streaming cards or authentic 1990s white clamshell VHS tapes!
            </p>
          </div>

          {/* View Toggle: Stream vs 90s VHS Clamshell */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-900/60 p-1.5 rounded-2xl border border-slate-700/60">
            <button
              id="view-vhs-btn"
              onClick={() => {
                soundFx.playVhsClick();
                setViewStyle('vhs');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewStyle === 'vhs'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-mono'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tv className="w-4 h-4 text-emerald-500" />
              <span>90s VHS Clamshell</span>
            </button>

            <button
              id="view-stream-btn"
              onClick={() => {
                soundFx.playPop();
                setViewStyle('stream');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewStyle === 'stream'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Modern Stream</span>
            </button>
          </div>
        </div>

        {/* Search & Era Filtering Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Era Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {eras.map((era) => (
              <button
                key={era}
                id={`era-filter-${era.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  soundFx.playPixieChime();
                  setActiveEra(era);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeEra === era
                    ? isDay
                      ? 'bg-indigo-900 text-white shadow-md'
                      : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md'
                    : isDay
                      ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      : 'bg-slate-900 hover:bg-slate-850 text-slate-400 border border-slate-800'
                }`}
              >
                {era}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movie or song..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none transition-colors ${
                isDay
                  ? 'bg-white border-slate-300 text-slate-900 focus:border-sky-500 shadow-sm'
                  : 'bg-slate-900 border-slate-700 text-slate-100 focus:border-amber-400'
              }`}
            />
          </div>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-base font-semibold">No Disney movie found matching "{searchQuery}".</p>
          </div>
        ) : viewStyle === 'vhs' ? (
          // ================= 90s VHS Clamshell Grid =================
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                id={`vhs-card-${movie.id}`}
                onClick={() => handleOpenMovie(movie)}
                className="group relative cursor-pointer"
              >
                {/* 3D Clamshell White Plastic Case Outer Container */}
                <div className="relative rounded-2xl bg-gradient-to-br from-slate-100 via-white to-slate-200 p-2.5 shadow-2xl border-2 border-slate-300/80 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-amber-500/20">
                  
                  {/* VHS Clamshell Spine Indentation */}
                  <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-slate-400/40 to-transparent rounded-l-xl pointer-events-none" />

                  {/* Gold Foil Top Header Header */}
                  <div className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 text-slate-950 px-2 py-1 rounded-t-lg flex items-center justify-between text-[10px] font-black tracking-widest font-disney-title">
                    <span>WALT DISNEY</span>
                    <span>MASTERPIECE</span>
                  </div>

                  {/* VHS Cover Artwork Image */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md my-1.5 bg-slate-900">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* VHS Plastic Reflection Gloss */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    {/* Classic 90s VHS Diamond / Star Emblem */}
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg border border-amber-300">
                      ★
                    </div>

                    {/* Year badge */}
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-amber-300 text-[10px] font-mono font-bold">
                      {movie.year} • VHS
                    </div>
                  </div>

                  {/* VHS Bottom Label Strip */}
                  <div className="bg-slate-950 text-white p-2.5 rounded-b-lg flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xs truncate max-w-[150px] text-amber-200">
                        {movie.title}
                      </h3>
                      <div className="text-[10px] text-slate-400 truncate">
                        {movie.songs[0]?.title || 'Classic Soundtrack'}
                      </div>
                    </div>

                    {/* Play Rewind Button */}
                    <button
                      title="Inspect VHS Tape"
                      className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center transition-transform group-hover:scale-110"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950 ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // ================= Modern Stream Grid =================
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                id={`stream-card-${movie.id}`}
                onClick={() => handleOpenMovie(movie)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-900 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-white shadow-md'
                }`}
              >
                {/* Poster Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={movie.bannerImage}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded-md text-amber-400 text-xs font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{movie.rating}</span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-xs font-bold bg-indigo-600/90 px-2 py-0.5 rounded">
                      {movie.year}
                    </span>
                    <span className="text-[11px] text-slate-300 truncate max-w-[140px]">
                      {movie.songs.length} Hit Songs
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="font-bold text-base font-disney-title group-hover:text-amber-500 transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {movie.synopsis}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">{movie.boxOffice}</span>
                    <span className="text-amber-500 font-bold flex items-center gap-1">
                      <span>Explore</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Movie Modal */}
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            mode={mode}
          />
        )}
      </div>
    </section>
  );
};
