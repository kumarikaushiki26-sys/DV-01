import React, { useState } from 'react';
import { ShoppingBag, Star, Sparkles, Tag, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { DISNEY_MERCH } from '../data/disneyData';
import { DisneyMerchItem, DayNightMode } from '../types';
import { soundFx } from '../utils/audio';

interface MerchSectionProps {
  mode: DayNightMode;
  onAddToCart: (item: DisneyMerchItem) => void;
  onOpenCart: () => void;
}

export const MerchSection: React.FC<MerchSectionProps> = ({ mode, onAddToCart, onOpenCart }) => {
  const isDay = mode === 'day';
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});

  const categories = ['All', 'VHS Vault', 'Vintage Apparel', 'Collectibles', 'Plush & Toys', 'Accessories'];

  const filteredMerch = DISNEY_MERCH.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  const handleAdd = (item: DisneyMerchItem) => {
    soundFx.playPixieChime();
    onAddToCart(item);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="merch" className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      isDay ? 'bg-sky-50/50' : 'bg-slate-950'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
              isDay ? 'bg-pink-100 text-pink-900 border border-pink-200' : 'bg-pink-500/10 text-pink-300 border border-pink-500/30'
            }`}>
              <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
              <span>90s Disney Store Mall Nostalgia</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black font-disney-title tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}>
              RETRO VAULT & 90s MERCH
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-xl font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
              Step back into the 1990s Disney Store. Relive the glory of authentic clamshell VHS cassettes, varsity bomber jackets, Beanie plush, and moving-hand watches.
            </p>
          </div>

          {/* Quick Bag Button */}
          <button
            id="view-magic-bag-btn"
            onClick={onOpenCart}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all self-start md:self-auto ${
              isDay
                ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                : 'bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-400/40'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Open Magic Bag</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`merch-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                soundFx.playPixieChime();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? isDay
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black shadow-md'
                  : isDay
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-400 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Merch Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMerch.map((item) => {
            const isAdded = addedIds[item.id];
            return (
              <div
                key={item.id}
                id={`merch-card-${item.id}`}
                className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-900'
                    : 'bg-slate-900 border-slate-800 text-white hover:border-amber-400/50'
                }`}
              >
                <div>
                  {/* Image Container with Badge */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-950/20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Vintage Tag Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow">
                      {item.badge}
                    </div>

                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white">
                      Circa {item.originalYear}
                    </div>

                    <div className="absolute bottom-2 left-2.5 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-[11px] text-amber-300 font-bold">
                      <Star className="w-3 h-3 fill-amber-300" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {item.category} • {item.condition}
                    </div>
                    <h3 className="font-bold text-sm sm:text-base font-disney-title leading-snug group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer with Price & Add to Bag */}
                <div className="p-5 pt-0 border-t border-slate-200 dark:border-slate-800/80 mt-2 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Price</div>
                    <div className="text-lg font-black text-amber-500 font-mono">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <button
                    id={`add-merch-${item.id}`}
                    onClick={() => handleAdd(item)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : isDay
                        ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/20'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>In Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
