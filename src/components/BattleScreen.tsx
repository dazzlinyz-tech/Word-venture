import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AvatarId, WordItem, BattleMonster, MonsterVisualType } from '../types';
import { AvatarDisplay } from './AvatarDisplay';
import { MonsterDisplay } from './MonsterDisplay';
import { ELEMENTARY_WORDS, getDistractorChoices } from '../data/words';
import {
  playMonsterDefeatSound,
  playWrongAnswerSound,
  playClickSound,
  speakWord,
  playAdvanceWarningSound
} from '../utils/audio';
import { Volume2, VolumeX, ArrowLeft, Zap, ShieldAlert, Sparkles, Heart, Clock } from 'lucide-react';
import { setSoundMuted, getSoundMuted } from '../utils/audio';

interface BattleScreenProps {
  avatarId: AvatarId;
  questionWords: WordItem[]; // exactly 10 words
  level: number;
  onFinishGame: (stats: {
    score: number;
    combo: number;
    maxCombo: number;
    defeatedCount: number;
    totalQuestions: number;
    wrongWords: WordItem[];
    elapsedSeconds: number;
  }) => void;
  onFailGame: (info: {
    failedWord: WordItem;
    defeatedCount: number;
    totalQuestions: number;
    elapsedSeconds: number;
  }) => void;
  onExitToHome: () => void;
}

const MONSTER_TYPES: MonsterVisualType[] = ['slime', 'bat', 'flame', 'rock', 'jelly', 'cyclops'];
const QUESTION_TIME_LIMIT = 18; // 18 seconds per question for elementary students

export const BattleScreen: React.FC<BattleScreenProps> = ({
  avatarId,
  questionWords,
  level,
  onFinishGame,
  onFailGame,
  onExitToHome
}) => {
  // Current question index (0 to 9)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [defeatedCount, setDefeatedCount] = useState(0);
  const [wrongWords, setWrongWords] = useState<WordItem[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(getSoundMuted());

  // Question countdown timer in seconds
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);

  // Monster advance distance (0 = safe far away, 100 = right in front of avatar)
  const [advanceProgress, setAdvanceProgress] = useState(25);
  const [isAvatarCheering, setIsAvatarCheering] = useState(false);
  const [isAvatarCrying, setIsAvatarCrying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  // Monsters currently active for this question
  const [currentMonsters, setCurrentMonsters] = useState<BattleMonster[]>([]);

  const targetWord = questionWords[currentIndex] || questionWords[0];
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cryingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (cryingTimerRef.current) clearTimeout(cryingTimerRef.current);
    };
  }, []);

  // Setup monsters for current question
  const setupMonstersForIndex = useCallback((index: number) => {
    if (index >= questionWords.length) return;
    const target = questionWords[index];
    const choices = getDistractorChoices(target, ELEMENTARY_WORDS);

    const monsters: BattleMonster[] = choices.map((choiceWord, i) => {
      // Pick a fun visual type
      const vType = MONSTER_TYPES[(index + i) % MONSTER_TYPES.length];
      return {
        id: `monster-${index}-${choiceWord.id}-${i}`,
        word: choiceWord,
        visualType: vType,
        colorScheme: '',
        isDefeated: false,
        isHit: false,
        isWrong: false
      };
    });

    setCurrentMonsters(monsters);
  }, [questionWords]);

  // Initial load
  useEffect(() => {
    setupMonstersForIndex(0);
  }, [setupMonstersForIndex]);

  // Overall play timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle failure condition (시간 초과 또는 몬스터 도달)
  const handleFailure = useCallback((reason: 'timeout' | 'monster_caught') => {
    if (hasFailed || isProcessing) return;
    setHasFailed(true);
    setIsProcessing(true);

    if (timerRef.current) clearInterval(timerRef.current);
    if (advanceTimerRef.current) clearInterval(advanceTimerRef.current);
    if (questionTimerRef.current) clearInterval(questionTimerRef.current);

    setAdvanceProgress(100);

    setTimeout(() => {
      onFailGame({
        failedWord: targetWord,
        defeatedCount,
        totalQuestions: questionWords.length,
        elapsedSeconds
      });
    }, 450);
  }, [hasFailed, isProcessing, targetWord, defeatedCount, questionWords.length, elapsedSeconds, onFailGame]);

  // Question countdown timer (18 seconds per question)
  useEffect(() => {
    if (hasFailed) return;
    setTimeLeft(QUESTION_TIME_LIMIT);

    if (questionTimerRef.current) clearInterval(questionTimerRef.current);

    questionTimerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (questionTimerRef.current) clearInterval(questionTimerRef.current);
          handleFailure('timeout');
          return 0;
        }
        if (prev <= 5) {
          playAdvanceWarningSound();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (questionTimerRef.current) clearInterval(questionTimerRef.current);
    };
  }, [currentIndex, hasFailed, handleFailure]);

  // Monster creeping advance timer (every 4.5 seconds advances a bit toward avatar)
  useEffect(() => {
    if (hasFailed) return;
    advanceTimerRef.current = setInterval(() => {
      setAdvanceProgress(prev => {
        const next = Math.min(prev + 7, 100);
        if (next >= 100) {
          handleFailure('monster_caught');
          return 100;
        }
        if (next >= 80 && prev < 80) {
          playAdvanceWarningSound();
        }
        return next;
      });
    }, 4500);

    return () => {
      if (advanceTimerRef.current) clearInterval(advanceTimerRef.current);
    };
  }, [hasFailed, handleFailure]);

  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setSoundMuted(nextMuted);
    if (!nextMuted) {
      playClickSound();
    }
  };

  // When player clicks a monster
  const handleSelectMonster = (clickedMonster: BattleMonster) => {
    if (isProcessing || clickedMonster.isDefeated || hasFailed) return;

    if (clickedMonster.word.id === targetWord.id) {
      // CORRECT ANSWER!
      setIsProcessing(true);
      playMonsterDefeatSound();

      // Clear crying state if any, and celebrate
      if (cryingTimerRef.current) clearTimeout(cryingTimerRef.current);
      setIsAvatarCrying(false);
      setIsAvatarCheering(true);

      // Update monster state to defeated
      setCurrentMonsters(prev =>
        prev.map(m =>
          m.id === clickedMonster.id
            ? { ...m, isDefeated: true }
            : m
        )
      );

      // Repel the monster advance (push back)
      setAdvanceProgress(prev => Math.max(15, prev - 25));

      // Update score & combo
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      const comboBonus = newCombo > 1 ? newCombo * 20 : 0;
      setScore(prev => prev + 100 + comboBonus);

      const nextDefeated = defeatedCount + 1;
      setDefeatedCount(nextDefeated);

      // Transition to next question or finish
      setTimeout(() => {
        setIsAvatarCheering(false);
        setIsProcessing(false);

        if (currentIndex + 1 >= questionWords.length) {
          // Game Completed!
          if (timerRef.current) clearInterval(timerRef.current);
          if (advanceTimerRef.current) clearInterval(advanceTimerRef.current);
          if (questionTimerRef.current) clearInterval(questionTimerRef.current);

          onFinishGame({
            score: score + 100 + comboBonus,
            combo: newCombo,
            maxCombo: Math.max(maxCombo, newCombo),
            defeatedCount: nextDefeated,
            totalQuestions: questionWords.length,
            wrongWords: wrongWords,
            elapsedSeconds: elapsedSeconds
          });
        } else {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          setupMonstersForIndex(nextIndex);
        }
      }, 700);

    } else {
      // WRONG ANSWER!
      playWrongAnswerSound();

      // Trigger Avatar Crying & Frustrated reaction (흑흑 눈물 흘리기)
      setIsAvatarCrying(true);
      if (cryingTimerRef.current) clearTimeout(cryingTimerRef.current);
      cryingTimerRef.current = setTimeout(() => {
        setIsAvatarCrying(false);
      }, 1600);

      // Shake the wrong monster and show giggle face
      setCurrentMonsters(prev =>
        prev.map(m =>
          m.id === clickedMonster.id
            ? { ...m, isWrong: true }
            : m
        )
      );

      // Record wrong word for review notebook
      setWrongWords(prev => {
        if (prev.some(w => w.id === targetWord.id)) return prev;
        return [...prev, targetWord];
      });

      // Reset combo
      setCombo(0);

      // Monster marches 1 step closer!
      setAdvanceProgress(prev => {
        const next = Math.min(prev + 14, 100);
        if (next >= 100) {
          handleFailure('monster_caught');
          return 100;
        }
        if (next >= 80) playAdvanceWarningSound();
        return next;
      });

      // Clear the shake after 500ms
      setTimeout(() => {
        setCurrentMonsters(prev =>
          prev.map(m =>
            m.id === clickedMonster.id
              ? { ...m, isWrong: false }
              : m
          )
        );
      }, 600);
    }
  };

  const isDanger = advanceProgress >= 75;

  return (
    <div className="relative w-full min-h-screen bg-linear-to-b from-sky-300 via-amber-100 to-emerald-200 flex flex-col justify-between overflow-x-hidden p-2 sm:p-4">
      
      {/* Top HUD Header */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-xs px-2.5 sm:px-5 py-2 rounded-2xl shadow-md border-2 border-amber-300 z-20">
        
        {/* Left: Home, Sound, Level Badge */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            id="btn-back-home"
            onClick={onExitToHome}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="처음으로"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <button
            type="button"
            id="btn-toggle-sound"
            onClick={handleToggleSound}
            className="p-1.5 sm:p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
            title={isMuted ? '소리 켜기' : '소리 끄기'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Level Badge */}
          <div className="px-2.5 py-1 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 text-white font-title text-xs sm:text-sm font-black shadow-xs flex items-center gap-1 border border-yellow-300">
            <span>🏆</span>
            <span>Lv.{level}</span>
          </div>
        </div>

        {/* Center: Stage Progress (10 Monsters) */}
        <div className="flex flex-col items-center flex-1 max-w-[140px] sm:max-w-xs px-1 sm:px-2">
          <div className="flex items-center justify-between w-full text-[11px] sm:text-xs font-bold text-slate-700 mb-0.5">
            <span className="flex items-center gap-1 text-purple-700 font-game">
              👾 처치: <span className="font-extrabold text-amber-600">{defeatedCount}</span>/10
            </span>
            <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
              {currentIndex + 1}단계
            </span>
          </div>
          
          {/* Progress Bar with Monster icons */}
          <div className="w-full bg-slate-200 h-2.5 sm:h-3 rounded-full overflow-hidden p-0.5 border border-slate-300">
            <div
              className="bg-linear-to-r from-amber-400 via-orange-500 to-rose-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${((defeatedCount) / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Right: Timer Countdown & Score */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Question Countdown Timer Pill */}
          <div
            className={`px-2 sm:px-2.5 py-1 rounded-xl font-black text-xs sm:text-sm flex items-center gap-1 border-2 shadow-xs transition-colors ${
              timeLeft <= 5
                ? 'bg-red-500 text-white border-yellow-300 animate-bounce'
                : timeLeft <= 10
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}
            title="남은 시간"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{timeLeft}초</span>
          </div>

          {combo > 1 && (
            <div className="hidden md:flex items-center gap-1 px-2 py-0.5 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full text-xs font-black animate-bounce shadow-xs">
              <Zap className="w-3 h-3 fill-current" />
              {combo}
            </div>
          )}
          
          <div className="text-right">
            <div className="text-[9px] sm:text-[10px] font-semibold text-slate-500">점수</div>
            <div className="font-game text-sm sm:text-lg font-black text-amber-700">
              {score}
            </div>
          </div>
        </div>
      </header>

      {/* Main Battle Field Area */}
      <main className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-between my-2 sm:my-3">
        
        {/* Monster Advance Danger Bar */}
        <div className="w-full bg-white/80 backdrop-blur-xs rounded-xl p-2 sm:p-2.5 border border-amber-200 shadow-xs mb-2">
          <div className="flex items-center justify-between text-xs font-bold mb-1">
            <span className={`flex items-center gap-1 ${isDanger ? 'text-red-600 animate-pulse font-black' : 'text-slate-700'}`}>
              <ShieldAlert className="w-4 h-4" />
              {isDanger ? '⚠️ 경고! 몬스터가 너무 가까이 왔어요! 어서 처치하세요!' : '🐾 몬스터가 탐험대를 향해 다가오고 있어요!'}
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              거리 위험도: {Math.round(advanceProgress)}%
            </span>
          </div>

          {/* Track Visual from Avatar to Monsters */}
          <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
            {/* Safe zone to Danger zone gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-emerald-300 via-amber-300 to-rose-400 opacity-60" />
            
            {/* Monster marching position indicator */}
            <div
              className="absolute top-0 bottom-0 flex items-center transition-all duration-700"
              style={{ left: `${Math.max(5, Math.min(92, advanceProgress))}%` }}
            >
              <div className="w-4 h-4 -ml-2 rounded-full bg-red-600 border-2 border-white shadow-md animate-ping absolute" />
              <div className="w-4 h-4 -ml-2 rounded-full bg-red-600 border-2 border-white shadow-md flex items-center justify-center text-[8px] text-white">
                👾
              </div>
            </div>
          </div>
        </div>

        {/* Arena Stage: Left Adventuring Partner Avatar Cheering, Right Marching Word Monsters */}
        <div className="relative w-full flex-1 min-h-[220px] sm:min-h-[260px] bg-linear-to-b from-sky-100/90 to-emerald-100/90 rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 border-3 sm:border-4 border-amber-300/80 shadow-lg flex flex-col justify-between overflow-hidden">
          
          {/* Background whimsical landscape clouds/hills */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-xl" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-emerald-400 rounded-t-full" />
          </div>

          {/* Upper Combat Zone */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Adventuring Partner Avatar Cheering/Crying to the Player */}
            <div className="flex flex-col items-center">
              <AvatarDisplay
                avatarId={avatarId}
                state={isAvatarCrying ? 'crying' : isAvatarCheering ? 'cheering' : isDanger ? 'danger' : 'cheering'}
                size="lg"
                showSpeechBubble={true}
                customSpeechText={
                  isAvatarCrying
                    ? '흑흑... 아쉬워! 💧'
                    : isAvatarCheering
                    ? '나이스! 정답이야! 🌟'
                    : isDanger
                    ? '조심해! 몬스터가 다가오고 있어! ⚠️'
                    : undefined
                }
              />
            </div>

            {/* Target Meaning Question Card (한글 뜻 제시) */}
            <div className="flex-1 w-full max-w-md mx-auto text-center bg-white/95 backdrop-blur-sm rounded-2xl p-2.5 sm:p-4 border-3 border-amber-400 shadow-md min-w-0">
              
              {/* Question Countdown Bar */}
              <div className="w-full mb-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-0.5 px-1">
                  <span className="flex items-center gap-1">
                    <Clock className={`w-3.5 h-3.5 ${timeLeft <= 5 ? 'text-red-500 animate-spin' : 'text-amber-500'}`} />
                    <span>선택 제한 시간</span>
                  </span>
                  <span className={`font-mono font-black ${timeLeft <= 5 ? 'text-red-600 animate-pulse text-xs' : 'text-slate-700'}`}>
                    {timeLeft}초
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-300">
                  <div
                    className={`h-full transition-all duration-1000 rounded-full ${
                      timeLeft <= 5
                        ? 'bg-red-500 animate-pulse'
                        : timeLeft <= 10
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${(timeLeft / QUESTION_TIME_LIMIT) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                <span className="text-xs sm:text-sm font-extrabold text-amber-800">
                  이 뜻을 가진 몬스터를 처치하세요!
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              </div>

              {/* Polysemy Multi-meaning Badge & Presentation (학습 목표 2) */}
              {targetWord.isPolysemy ? (
                <div className="mt-1">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 text-white text-[11px] sm:text-xs font-black shadow-xs mb-1.5 animate-pulse">
                    🌟 2가지 뜻을 가진 특별 단어!
                  </div>
                  
                  {/* Meanings shown clearly */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 my-1">
                    {targetWord.meanings.map((meaning, idx) => (
                      <div
                        key={idx}
                        className="bg-purple-50 border-2 border-purple-300 text-purple-900 px-2.5 py-1 rounded-xl text-sm sm:text-lg font-black shadow-xs max-w-full break-words"
                      >
                        <span className="text-purple-600 text-xs mr-1 font-bold">뜻 {idx + 1}.</span>
                        {meaning}
                      </div>
                    ))}
                  </div>

                  {targetWord.polysemyHint && (
                    <p className="text-[11px] sm:text-xs text-purple-700 font-semibold mt-1">
                      💡 힌트: {targetWord.polysemyHint}
                    </p>
                  )}
                </div>
              ) : (
                /* Standard single meaning */
                <div className="my-1 px-1">
                  <div className="inline-block max-w-full break-words [overflow-wrap:anywhere] bg-amber-50 border-2 border-amber-300 text-slate-800 px-3 py-1.5 sm:px-5 sm:py-2 rounded-2xl text-lg sm:text-2xl font-black shadow-inner">
                    {targetWord.meanings.join(' / ')}
                  </div>
                </div>
              )}

              {/* Pronunciation audio prompt button */}
              <div className="mt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  id="btn-hear-hint-sound"
                  onClick={() => speakWord(targetWord.word)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold border border-sky-300 active:scale-95 transition-transform"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  소리 힌트 듣기 (영어 발음)
                </button>
              </div>

            </div>
          </div>

          {/* 3 Word Monsters to Choose From (선택지 몬스터 3마리) */}
          <div className="relative z-10 mt-3 pt-2 border-t-2 border-amber-200/60">
            <div className="text-center text-xs font-extrabold text-amber-900 mb-2">
              👇 알맞은 영어 단어 몬스터를 터치하세요!
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-4 max-w-2xl mx-auto w-full">
              {currentMonsters.map(monster => (
                <MonsterDisplay
                  key={monster.id}
                  monster={monster}
                  onClick={() => handleSelectMonster(monster)}
                  disabled={isProcessing}
                />
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* Bottom Status Tips Bar */}
      <footer className="w-full max-w-4xl mx-auto flex items-center justify-between text-[11px] sm:text-xs font-bold text-slate-600 bg-white/70 px-3 py-1.5 rounded-xl border border-amber-200">
        <span>⏱️ 플레이 시간: {Math.floor(elapsedSeconds / 60)}분 {elapsedSeconds % 60}초</span>
        <span className="text-amber-800">🎯 10마리를 모두 물리치면 아바타가 완전히 구출돼요!</span>
        <span className="hidden sm:inline">❤️ 콤보: {combo}연속</span>
      </footer>

    </div>
  );
};
