import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Trophy, RotateCcw, Sparkles, CheckCircle2, XCircle, Timer, Star, Flame, Eye } from 'lucide-react';
import { TRIVIA_QUESTIONS, HIDDEN_MICKEY_TARGETS, DISNEY_CHARACTERS } from '../data/disneyData';
import { DayNightMode } from '../types';
import { DisneyCharacterAvatar } from './CharacterAvatars';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface GamesSectionProps {
  mode: DayNightMode;
}

type GameTab = 'fireworks' | 'trivia' | 'mickeys' | 'memory';

interface FloatingTarget {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speed: number;
  points: number;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ mode }) => {
  const isDay = mode === 'day';
  const [activeTab, setActiveTab] = useState<GameTab>('fireworks');

  // ================= 1. FIREWORKS CATCHER STATE =================
  const [fireworkGameActive, setFireworkGameActive] = useState(false);
  const [fireworkScore, setFireworkScore] = useState(0);
  const [fireworkHigh, setFireworkHigh] = useState(() => {
    return parseInt(localStorage.getItem('disneyverse_fw_high') || '0', 10);
  });
  const [fireworkTimeLeft, setFireworkTimeLeft] = useState(30);
  const [targets, setTargets] = useState<FloatingTarget[]>([]);

  // Fireworks countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (fireworkGameActive && fireworkTimeLeft > 0) {
      timer = setInterval(() => {
        setFireworkTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (fireworkGameActive && fireworkTimeLeft === 0) {
      setFireworkGameActive(false);
      soundFx.playFanfare();
      confetti({ particleCount: 70, spread: 80 });
      if (fireworkScore > fireworkHigh) {
        setFireworkHigh(fireworkScore);
        localStorage.setItem('disneyverse_fw_high', fireworkScore.toString());
      }
    }
    return () => clearInterval(timer);
  }, [fireworkGameActive, fireworkTimeLeft, fireworkScore, fireworkHigh]);

  // Spawn fireworks targets
  useEffect(() => {
    let spawner: NodeJS.Timeout;
    if (fireworkGameActive) {
      spawner = setInterval(() => {
        setTargets((prev) => {
          if (prev.length >= 6) return prev;
          const colors = ['#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#EC4899', '#A855F7', '#FDE047'];
          const newTarget: FloatingTarget = {
            id: Math.random(),
            x: 10 + Math.random() * 80,
            y: 90,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 32 + Math.random() * 24,
            speed: 1.2 + Math.random() * 1.5,
            points: 10,
          };
          return [...prev, newTarget];
        });
      }, 700);
    }
    return () => clearInterval(spawner);
  }, [fireworkGameActive]);

  // Target floating animation frame
  useEffect(() => {
    let animFrame: number;
    if (fireworkGameActive) {
      const updateTargets = () => {
        setTargets((prev) =>
          prev
            .map((t) => ({ ...t, y: t.y - t.speed }))
            .filter((t) => t.y > -5)
        );
        animFrame = requestAnimationFrame(updateTargets);
      };
      animFrame = requestAnimationFrame(updateTargets);
    }
    return () => cancelAnimationFrame(animFrame);
  }, [fireworkGameActive]);

  const handleStartFireworks = () => {
    soundFx.playPixieChime();
    setFireworkScore(0);
    setFireworkTimeLeft(30);
    setTargets([]);
    setFireworkGameActive(true);
  };

  const handleCatchTarget = (targetId: number, points: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playPop();
    setFireworkScore((prev) => prev + points);
    setTargets((prev) => prev.filter((t) => t.id !== targetId));
  };

  // ================= 2. TRIVIA QUIZ STATE =================
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [triviaCompleted, setTriviaCompleted] = useState(false);

  const handleAnswerSelect = (optionIdx: number) => {
    if (isAnswerRevealed) return;
    setSelectedAnswer(optionIdx);
    setIsAnswerRevealed(true);

    const isCorrect = optionIdx === TRIVIA_QUESTIONS[currentQIndex].correctIndex;
    if (isCorrect) {
      soundFx.playPixieChime();
      setTriviaScore((prev) => prev + 1);
    } else {
      soundFx.playPop();
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < TRIVIA_QUESTIONS.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
    } else {
      setTriviaCompleted(true);
      soundFx.playFanfare();
      confetti({ particleCount: 60, spread: 70 });
    }
  };

  const handleResetTrivia = () => {
    setCurrentQIndex(0);
    setTriviaScore(0);
    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setTriviaCompleted(false);
  };

  // ================= 3. HIDDEN MICKEYS STATE =================
  const [foundMickeys, setFoundMickeys] = useState<string[]>([]);
  const [showClues, setShowClues] = useState(false);

  const handleMickeyClick = (targetId: string) => {
    if (foundMickeys.includes(targetId)) return;
    soundFx.playMagicSpell();
    const updated = [...foundMickeys, targetId];
    setFoundMickeys(updated);

    if (updated.length === HIDDEN_MICKEY_TARGETS.length) {
      soundFx.playFanfare();
      confetti({ particleCount: 80, spread: 100 });
    }
  };

  // ================= 4. MEMORY MATCH STATE =================
  interface MemoryCard {
    uid: number;
    charId: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const initialDeck = [
    'mickey', 'simba', 'genie', 'tinkerbell', 'stitch', 'ariel',
    'mickey', 'simba', 'genie', 'tinkerbell', 'stitch', 'ariel'
  ];

  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>(() => {
    return initialDeck
      .sort(() => Math.random() - 0.5)
      .map((charId, idx) => ({
        uid: idx,
        charId,
        isFlipped: false,
        isMatched: false,
      }));
  });

  const [flippedUids, setFlippedUids] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryMatches, setMemoryMatches] = useState(0);

  const handleCardClick = (uid: number) => {
    if (flippedUids.length === 2) return;
    const card = memoryCards.find((c) => c.uid === uid);
    if (!card || card.isFlipped || card.isMatched) return;

    soundFx.playPop();
    const updatedCards = memoryCards.map((c) =>
      c.uid === uid ? { ...c, isFlipped: true } : c
    );
    setMemoryCards(updatedCards);

    const newFlipped = [...flippedUids, uid];
    setFlippedUids(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves((prev) => prev + 1);
      const firstCard = memoryCards.find((c) => c.uid === newFlipped[0]);
      const secondCard = memoryCards.find((c) => c.uid === newFlipped[1]);

      if (firstCard && secondCard && firstCard.charId === secondCard.charId) {
        soundFx.playPixieChime();
        setMemoryCards((prev) =>
          prev.map((c) =>
            c.uid === newFlipped[0] || c.uid === newFlipped[1]
              ? { ...c, isMatched: true }
              : c
          )
        );
        setMemoryMatches((m) => {
          const newMatches = m + 1;
          if (newMatches === 6) {
            soundFx.playFanfare();
            confetti({ particleCount: 75, spread: 80 });
          }
          return newMatches;
        });
        setFlippedUids([]);
      } else {
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.uid === newFlipped[0] || c.uid === newFlipped[1]
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedUids([]);
        }, 1000);
      }
    }
  };

  const handleResetMemory = () => {
    soundFx.playPixieChime();
    setMemoryCards(
      initialDeck
        .sort(() => Math.random() - 0.5)
        .map((charId, idx) => ({
          uid: idx,
          charId,
          isFlipped: false,
          isMatched: false,
        }))
    );
    setFlippedUids([]);
    setMemoryMoves(0);
    setMemoryMatches(0);
  };

  return (
    <section id="games" className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      isDay ? 'bg-sky-100/50' : 'bg-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            isDay ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
          }`}>
            <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Disney Arcade Pavilion</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black font-disney-title tracking-tight ${
            isDay ? 'text-slate-900' : 'text-white'
          }`}>
            PLAYABLE DISNEY GAMES
          </h2>
          <p className={`mt-2 text-sm sm:text-base font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
            Test your reflexes catching fireworks, ace the 90s Renaissance trivia quiz, hunt for hidden Mickeys, and match legendary characters!
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8">
          <button
            id="tab-fireworks-btn"
            onClick={() => {
              soundFx.playPixieChime();
              setActiveTab('fireworks');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'fireworks'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg shadow-amber-400/20'
                : isDay
                  ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Fireworks Catcher</span>
          </button>

          <button
            id="tab-trivia-btn"
            onClick={() => {
              soundFx.playPixieChime();
              setActiveTab('trivia');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'trivia'
                ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-500/20'
                : isDay
                  ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>90s Renaissance Trivia</span>
          </button>

          <button
            id="tab-mickeys-btn"
            onClick={() => {
              soundFx.playPixieChime();
              setActiveTab('mickeys');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'mickeys'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : isDay
                  ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Find Hidden Mickeys</span>
          </button>

          <button
            id="tab-memory-btn"
            onClick={() => {
              soundFx.playPixieChime();
              setActiveTab('memory');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'memory'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/20'
                : isDay
                  ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Character Memory Match</span>
          </button>
        </div>

        {/* Game Container Card */}
        <div className={`rounded-3xl p-6 sm:p-8 border shadow-xl transition-all ${
          isDay
            ? 'bg-white border-slate-200 text-slate-900 shadow-sky-100'
            : 'bg-slate-950 border-amber-400/30 text-slate-100 shadow-2xl'
        }`}>

          {/* ================= TAB 1: FIREWORKS CATCHER ================= */}
          {activeTab === 'fireworks' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-xl font-bold font-disney-title flex items-center gap-2">
                    <span>Sorcerer Mickey's Starlight Fireworks Catcher</span>
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click rising sparks and fireworks before they vanish into the night sky!
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm font-bold">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Trophy className="w-4 h-4" />
                    <span>Score: {fireworkScore}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>Best: {fireworkHigh}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sky-500">
                    <Timer className="w-4 h-4" />
                    <span>{fireworkTimeLeft}s</span>
                  </div>
                </div>
              </div>

              {/* Game Stage Canvas Area */}
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-900 border border-slate-800 flex items-center justify-center select-none cursor-crosshair">
                {!fireworkGameActive ? (
                  <div className="text-center p-6 space-y-4 max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-300 mx-auto flex items-center justify-center text-2xl animate-bounce">
                      🎆
                    </div>
                    <h4 className="text-xl font-bold text-white font-disney-title">
                      {fireworkTimeLeft === 0 ? "Spectacular Show Finished!" : "Ready for the Fireworks?"}
                    </h4>
                    {fireworkTimeLeft === 0 && (
                      <p className="text-sm text-amber-400 font-bold">
                        Final Score: {fireworkScore} points!
                      </p>
                    )}
                    <button
                      id="start-fireworks-btn"
                      onClick={handleStartFireworks}
                      className="px-8 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-lg shadow-amber-400/30 hover:brightness-110 active:scale-95 transition-all"
                    >
                      {fireworkTimeLeft === 0 ? "Play Again" : "Launch Fireworks Show"}
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Floating Target Fireworks */}
                    {targets.map((target) => (
                      <button
                        key={target.id}
                        id={`target-${target.id}`}
                        onClick={(e) => handleCatchTarget(target.id, target.points, e)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-bold text-xs cursor-pointer active:scale-125 transition-transform animate-pulse shadow-lg"
                        style={{
                          left: `${target.x}%`,
                          top: `${target.y}%`,
                          width: `${target.size}px`,
                          height: `${target.size}px`,
                          backgroundColor: target.color,
                          boxShadow: `0 0 20px ${target.color}`,
                        }}
                      >
                        ✨
                      </button>
                    ))}

                    <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-400 pointer-events-none">
                      Tap rapidly on the glowing orbs!
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 2: TRIVIA QUIZ ================= */}
          {activeTab === 'trivia' && (
            <div className="space-y-6">
              {!triviaCompleted ? (
                <>
                  <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                        Question {currentQIndex + 1} of {TRIVIA_QUESTIONS.length}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold font-disney-title mt-0.5">
                        90s Disney Renaissance Quiz
                      </h3>
                    </div>
                    <div className="text-sm font-bold bg-amber-400/20 text-amber-400 px-3 py-1 rounded-xl border border-amber-400/30">
                      Score: {triviaScore}
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className={`p-6 rounded-2xl border text-lg sm:text-xl font-semibold leading-relaxed ${
                    isDay ? 'bg-sky-50 border-sky-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
                  }`}>
                    {TRIVIA_QUESTIONS[currentQIndex].question}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TRIVIA_QUESTIONS[currentQIndex].options.map((option, idx) => {
                      const isChosen = selectedAnswer === idx;
                      const isCorrect = idx === TRIVIA_QUESTIONS[currentQIndex].correctIndex;

                      let btnStyle = isDay
                        ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-200';

                      if (isAnswerRevealed) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-600 text-white border-emerald-500 font-bold';
                        } else if (isChosen && !isCorrect) {
                          btnStyle = 'bg-rose-600 text-white border-rose-500 font-bold';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          id={`trivia-opt-${idx}`}
                          disabled={isAnswerRevealed}
                          onClick={() => handleAnswerSelect(idx)}
                          className={`p-4 rounded-2xl border text-left text-sm sm:text-base font-semibold transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{option}</span>
                          {isAnswerRevealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                          {isAnswerRevealed && isChosen && !isCorrect && <XCircle className="w-5 h-5 text-white" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation and Next Button */}
                  {isAnswerRevealed && (
                    <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in ${
                      selectedAnswer === TRIVIA_QUESTIONS[currentQIndex].correctIndex
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                        : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                    }`}>
                      <p className="text-xs sm:text-sm">
                        {TRIVIA_QUESTIONS[currentQIndex].explanation}
                      </p>
                      <button
                        id="next-trivia-btn"
                        onClick={handleNextQuestion}
                        className="px-6 py-2 rounded-xl font-bold text-xs sm:text-sm bg-amber-400 text-slate-950 shrink-0 shadow-md hover:bg-amber-300"
                      >
                        {currentQIndex + 1 === TRIVIA_QUESTIONS.length ? "See Final Score" : "Next Question →"}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                // Final Results Card
                <div className="text-center py-10 space-y-4 max-w-md mx-auto">
                  <div className="w-20 h-20 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto text-4xl shadow-lg">
                    🏰
                  </div>
                  <h4 className="text-2xl font-black font-disney-title">
                    Trivia Quest Completed!
                  </h4>
                  <p className="text-base text-slate-300">
                    You scored <span className="font-bold text-amber-400 text-xl">{triviaScore}</span> out of {TRIVIA_QUESTIONS.length}!
                  </p>
                  <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm font-bold">
                    {triviaScore >= 7
                      ? "👑 Official Disney Renaissance Master! Your 90s knowledge is legendary!"
                      : triviaScore >= 5
                      ? "✨ Certified Mouseketeer! Great job exploring the magic!"
                      : "🍿 Time to rewatch the 90s VHS classics on movie night!"}
                  </div>
                  <button
                    id="retry-trivia-btn"
                    onClick={handleResetTrivia}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 mx-auto shadow-md"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: FIND HIDDEN MICKEYS ================= */}
          {activeTab === 'mickeys' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-xl font-bold font-disney-title flex items-center gap-2">
                    <span>Find the 5 Hidden Mickeys</span>
                    <Eye className="w-5 h-5 text-emerald-400" />
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Search the illustration canvas below to spot 5 subtly hidden three-circle Mickey silhouettes!
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    id="toggle-clues-btn"
                    onClick={() => setShowClues(!showClues)}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800"
                  >
                    {showClues ? "Hide Clues" : "Show Clues 💡"}
                  </button>
                  <div className="text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Found: {foundMickeys.length} / {HIDDEN_MICKEY_TARGETS.length}
                  </div>
                </div>
              </div>

              {/* Clues Box */}
              {showClues && (
                <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {HIDDEN_MICKEY_TARGETS.map((t) => (
                    <div key={t.id} className="flex items-start gap-1.5">
                      <span className="font-bold">{t.name}:</span>
                      <span className="text-slate-300">{t.clue}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Interactive Spotting Canvas Scene */}
              <div className="relative h-96 sm:h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 border-2 border-amber-400/30 select-none">
                
                {/* Fairytale Background Elements */}
                <div className="absolute top-10 left-1/4 w-32 h-16 bg-white/10 rounded-full blur-sm" />
                <div className="absolute top-20 right-1/4 w-44 h-20 bg-white/10 rounded-full blur-sm" />

                {/* Central Castle Outline in Scene */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-60 border-t-2 border-amber-400/20 bg-indigo-950/40 rounded-t-3xl flex items-end justify-center">
                  <div className="w-16 h-40 bg-indigo-900/40 rounded-t-xl" />
                </div>

                {/* The 5 Clickable Hidden Mickey Spots */}
                {HIDDEN_MICKEY_TARGETS.map((target) => {
                  const isFound = foundMickeys.includes(target.id);
                  return (
                    <button
                      key={target.id}
                      id={`hidden-mickey-${target.id}`}
                      onClick={() => handleMickeyClick(target.id)}
                      style={{ left: `${target.x}%`, top: `${target.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
                        isFound
                          ? 'bg-amber-400 ring-4 ring-amber-300/80 scale-125 shadow-lg shadow-amber-400/50'
                          : 'opacity-40 hover:opacity-90'
                      }`}
                      title={isFound ? `Found: ${target.name}` : "Inspect mystery shadow"}
                    >
                      {/* Mickey Silhouette Ears SVG */}
                      <svg viewBox="0 0 40 40" className="w-6 h-6 sm:w-7 sm:h-7" fill={isFound ? "#0F172A" : "#64748B"}>
                        <circle cx="10" cy="12" r="8" />
                        <circle cx="30" cy="12" r="8" />
                        <circle cx="20" cy="24" r="12" />
                      </svg>
                    </button>
                  );
                })}

                {/* Win Overlay */}
                {foundMickeys.length === HIDDEN_MICKEY_TARGETS.length && (
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                    <span className="text-5xl mb-2">🎉</span>
                    <h4 className="text-2xl font-black text-amber-300 font-disney-title">
                      MASTER IMAGINEER BADGE UNLOCKED!
                    </h4>
                    <p className="text-sm text-slate-200 mt-2 max-w-sm">
                      You spotted all 5 disguised Hidden Mickeys in the kingdom!
                    </p>
                    <button
                      id="reset-mickeys-btn"
                      onClick={() => setFoundMickeys([])}
                      className="mt-4 px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-400 text-slate-950 shadow-md"
                    >
                      Play Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 4: MEMORY MATCH ================= */}
          {activeTab === 'memory' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-xl font-bold font-disney-title flex items-center gap-2">
                    <span>Hakuna Matata Character Memory Match</span>
                    <Star className="w-5 h-5 text-pink-400" />
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Flip cards to match all 6 Disney legendary pairs!
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs sm:text-sm font-bold">
                  <span className="text-slate-400">Moves: {memoryMoves}</span>
                  <span className="text-pink-400">Matches: {memoryMatches} / 6</span>
                  <button
                    id="reset-memory-btn"
                    onClick={handleResetMemory}
                    className="p-1.5 rounded-lg border hover:bg-slate-800 text-slate-300"
                    title="Restart Deck"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Memory Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 max-w-4xl mx-auto">
                {memoryCards.map((card) => {
                  const isVisible = card.isFlipped || card.isMatched;
                  return (
                    <button
                      key={card.uid}
                      id={`mem-card-${card.uid}`}
                      onClick={() => handleCardClick(card.uid)}
                      disabled={isVisible}
                      className={`aspect-square rounded-2xl border-2 transition-all duration-300 flex items-center justify-center p-2 shadow-md ${
                        card.isMatched
                          ? 'bg-emerald-950/40 border-emerald-500 opacity-80'
                          : card.isFlipped
                          ? isDay
                            ? 'bg-white border-sky-400'
                            : 'bg-slate-900 border-amber-400'
                          : isDay
                          ? 'bg-gradient-to-tr from-sky-400 to-indigo-500 border-sky-300 hover:brightness-105'
                          : 'bg-gradient-to-tr from-indigo-950 to-slate-900 border-slate-700 hover:border-amber-400/50'
                      }`}
                    >
                      {isVisible ? (
                        <DisneyCharacterAvatar id={card.charId} className="w-14 h-14" />
                      ) : (
                        <div className="text-2xl sm:text-3xl text-amber-300/80 font-disney-title font-black">
                          🏰
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {memoryMatches === 6 && (
                <div className="text-center p-6 bg-emerald-950/30 border border-emerald-500/40 rounded-2xl">
                  <h4 className="text-xl font-bold text-emerald-300 font-disney-title">
                    ✨ Perfectly Matched in {memoryMoves} Moves!
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    "Hakuna Matata! You’ve brought the Disney family together!"
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
