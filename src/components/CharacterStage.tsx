import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, Volume2, Wand2, Info, Star } from 'lucide-react';
import { DISNEY_CHARACTERS } from '../data/disneyData';
import { DisneyCharacter, DayNightMode } from '../types';
import { DisneyCharacterAvatar } from './CharacterAvatars';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CharacterStageProps {
  mode: DayNightMode;
  activeCharacterId: string;
  onSelectCharacter: (id: string) => void;
}

export const CharacterStage: React.FC<CharacterStageProps> = ({
  mode,
  activeCharacterId,
  onSelectCharacter,
}) => {
  const isDay = mode === 'day';
  const currentCharacter = DISNEY_CHARACTERS.find((c) => c.id === activeCharacterId) || DISNEY_CHARACTERS[0];
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isPerformingAction, setIsPerformingAction] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const handleAction = () => {
    setIsPerformingAction(true);

    if (currentCharacter.id === 'mickey') {
      soundFx.playMagicSpell();
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      setActionMessage("✨ Mickey waves his sorcerer wand! Starlight swirls around the room!");
    } else if (currentCharacter.id === 'genie') {
      soundFx.playPixieChime();
      confetti({ particleCount: 60, spread: 90, colors: ['#06B6D4', '#3B82F6', '#FACC15'] });
      setActionMessage("🧞 Genie bursts from his lamp: 'POOF! You've got three wishes, kid!'");
    } else if (currentCharacter.id === 'simba') {
      soundFx.playFireworkBoom();
      setActionMessage("🦁 Simba stands tall upon Pride Rock and gives a majestic roar: ROAAAR!");
    } else if (currentCharacter.id === 'tinkerbell') {
      soundFx.playPixieChime();
      confetti({ particleCount: 40, spread: 100, colors: ['#10B981', '#FACC15', '#FFFFFF'] });
      setActionMessage("✨ Tinker Bell flutters in circles showering shimmering gold pixie dust!");
    } else if (currentCharacter.id === 'stitch') {
      soundFx.playPop();
      setActionMessage("🎸 Stitch strums a Hawaiian ukulele and dances a goofy hula spin!");
    } else if (currentCharacter.id === 'ariel') {
      soundFx.playPop();
      setActionMessage("🌊 Ariel sings an ethereal melody as ocean bubbles float upward!");
    }

    setTimeout(() => {
      setIsPerformingAction(false);
    }, 2000);
  };

  const handleNextDialogue = () => {
    soundFx.playPop();
    setDialogueIndex((prev) => (prev + 1) % currentCharacter.dialogues.length);
  };

  return (
    <section id="characters" className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      isDay ? 'bg-white/80' : 'bg-slate-900/90'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            isDay ? 'bg-sky-100 text-sky-800 border border-sky-200' : 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Animated Cast</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black font-disney-title tracking-tight ${
            isDay ? 'text-slate-900' : 'text-white'
          }`}>
            MEET THE CHARACTERS
          </h2>
          <p className={`mt-3 text-base sm:text-lg font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
            Select any Disney legend below to speak with them, activate their signature animated magic, and discover rare animation vault secrets!
          </p>
        </div>

        {/* Character Selector Pills Grid */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto pb-4 no-scrollbar">
          {DISNEY_CHARACTERS.map((char) => {
            const isSelected = char.id === currentCharacter.id;
            return (
              <button
                key={char.id}
                id={`char-pill-${char.id}`}
                onClick={() => {
                  soundFx.playPixieChime();
                  onSelectCharacter(char.id);
                  setDialogueIndex(0);
                  setActionMessage(null);
                }}
                className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                  isSelected
                    ? isDay
                      ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg shadow-sky-600/30 scale-105 ring-2 ring-sky-400'
                      : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg shadow-amber-400/30 scale-105 ring-2 ring-amber-300'
                    : isDay
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-slate-800/80 hover:bg-slate-850 text-slate-300 border border-slate-700/60'
                }`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-950/20 p-0.5 flex items-center justify-center">
                  <DisneyCharacterAvatar id={char.id} className="w-full h-full" />
                </div>
                <span>{char.name}</span>
                {isSelected && <span className="text-xs">✨</span>}
              </button>
            );
          })}
        </div>

        {/* Interactive Main Character Spotlight Stage */}
        <div className={`mt-8 rounded-3xl p-6 sm:p-10 border transition-all duration-500 shadow-xl relative overflow-hidden ${
          isDay
            ? 'bg-gradient-to-br from-sky-50 via-white to-indigo-50/50 border-sky-200'
            : 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 border-amber-400/30 shadow-2xl'
        }`}>
          {/* Subtle 90s decorative background starburst */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left: Animated Character Avatar & Special Action Trigger */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              {/* Character Floating Stage Base */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative cursor-pointer group"
                onClick={handleAction}
                title="Click character to trigger signature magic!"
              >
                {/* Glow ring */}
                <div 
                  className="absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: currentCharacter.accentColor }}
                />

                {/* Pedestal circle */}
                <div className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105 ${
                  isDay
                    ? 'bg-white border-sky-300 shadow-sky-300/40'
                    : 'bg-slate-900 border-amber-400/60 shadow-black/80'
                }`}>
                  <DisneyCharacterAvatar
                    id={currentCharacter.id}
                    className="w-36 h-36 sm:w-44 sm:h-44"
                    isActionActive={isPerformingAction}
                  />

                  {/* Little click hint badge */}
                  <div className="absolute -bottom-2 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Tap to Animate</span>
                  </div>
                </div>
              </motion.div>

              {/* Action Button */}
              <button
                id={`char-action-btn-${currentCharacter.id}`}
                onClick={handleAction}
                disabled={isPerformingAction}
                className={`mt-6 flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm tracking-wide transition-all shadow-lg active:scale-95 ${
                  isDay
                    ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/30'
                    : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 shadow-amber-400/30'
                }`}
              >
                <Wand2 className={`w-4 h-4 ${isPerformingAction ? 'animate-spin' : ''}`} />
                <span>{currentCharacter.actionName}</span>
              </button>

              {/* Real-time action feedback */}
              <AnimatePresence>
                {actionMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 text-xs font-bold text-amber-500 font-disney-fun max-w-xs"
                  >
                    {actionMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Dialogue, Lore, Famous Quote & Animation Vault Fact */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-400/20 text-amber-500 border border-amber-400/30 uppercase tracking-widest">
                  {currentCharacter.era}
                </span>
                <span className={`text-xs font-semibold ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  • {currentCharacter.movie}
                </span>
              </div>

              <h3 className={`text-3xl sm:text-4xl font-black font-disney-title mt-2 ${
                isDay ? 'text-slate-900' : 'text-white'
              }`}>
                {currentCharacter.name}
              </h3>
              <p className="text-sm font-semibold text-amber-500 mt-0.5">
                {currentCharacter.role}
              </p>

              {/* Interactive Speech Dialogue Box with Next Button */}
              <div className={`mt-6 p-5 rounded-2xl border relative ${
                isDay 
                  ? 'bg-sky-100/70 border-sky-300 text-slate-800' 
                  : 'bg-slate-900/90 border-amber-400/40 text-slate-100'
              }`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-500">
                        {currentCharacter.name} says:
                      </div>
                      <p className="mt-1 text-base sm:text-lg font-medium font-disney-fun leading-snug">
                        "{currentCharacter.dialogues[dialogueIndex]}"
                      </p>
                    </div>
                  </div>

                  <button
                    id="next-dialogue-btn"
                    onClick={handleNextDialogue}
                    title="Hear another quote"
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      isDay
                        ? 'bg-white hover:bg-sky-50 text-sky-700 border-sky-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-600'
                    }`}
                  >
                    Next Line 💬
                  </button>
                </div>
              </div>

              {/* Famous Trademark Quote */}
              <div className="mt-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                <span className={`text-sm italic font-disney-serif ${isDay ? 'text-slate-700' : 'text-slate-300'}`}>
                  "{currentCharacter.quote}"
                </span>
              </div>

              {/* Animation Vault Secret Card */}
              <div className={`mt-6 p-4 rounded-2xl border flex items-start gap-3 ${
                isDay 
                  ? 'bg-amber-50 border-amber-200 text-amber-900' 
                  : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
              }`}>
                <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-amber-500">
                    Vault Animation Secret:
                  </div>
                  <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                    {currentCharacter.funFact}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
