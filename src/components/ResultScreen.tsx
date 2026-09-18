import React, { useEffect, useState } from 'react';
import { AvatarId, WordItem, GameStats } from '../types';
import { AVATARS } from '../data/avatars';
import { AvatarDisplay } from './AvatarDisplay';
import { RewardDisplay } from './RewardDisplay';
import { playVictoryFanfare, playClickSound, speakWord, playItemAcquireSound } from '../utils/audio';
import {
  RotateCcw,
  Home,
  Volume2,
  Trophy,
  Star,
  CheckCircle2,
  Sparkles,
  Zap,
  BookOpen,
  ArrowRight,
  Gift,
  LockOpen
} from 'lucide-react';

interface ResultScreenProps {
  stats: GameStats;
  onNextLevel: () => void;
  onRestartCurrentLevel: () => void;
  onRetryWrongWords: (wrongList: WordItem[]) => void;
  onGoHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  stats,
  onNextLevel,
  onRestartCurrentLevel,
  onRetryWrongWords,
  onGoHome
}) => {
  const avatar = AVATARS[stats.avatarId] || AVATARS.leo;
  const reward = avatar.reward;

  useEffect(() => {
    // Play victory fanfare upon arriving at result screen!
    playVictoryFanfare();
    const timer = setTimeout(() => {
      playItemAcquireSound();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const hasWrongWords = stats.wrongWords.length > 0;
  
  // Milestones where a new avatar is unlocked (Level 10, 20, 30, 40, 60, 80, 100)
  const unlockMilestone = (() => {
    switch (stats.level) {
      case 10: return { name: '아기 불꽃 드래곤 푸푸', emoji: '🐲', nextLevel: 11 };
      case 20: return { name: '천재 발명로봇 로비', emoji: '🤖', nextLevel: 21 };
      case 30: return { name: '숲의 요정 달토끼 루나', emoji: '🐰', nextLevel: 31 };
      case 40: return { name: '도토리 궁수 다람쥐 치치', emoji: '🐿️', nextLevel: 41 };
      case 60: return { name: '하늘의 수호신 그리핀 카야', emoji: '🦅', nextLevel: 61 };
      case 80: return { name: '얼음왕국 백곰 코코', emoji: '🐻‍❄️', nextLevel: 81 };
      case 100: return { name: '전설의 태양새 솔', emoji: '👑', nextLevel: 100, isFinal: true };
      default: return null;
    }
  })();

  const isGameCompleted = stats.level >= 100;

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-amber-100 via-yellow-50 to-emerald-100 flex flex-col items-center justify-between p-3 sm:p-6 select-none overflow-x-hidden">
      
      {/* Celebration Header */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center mt-2">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-linear-to-r from-amber-400 to-yellow-500 text-amber-950 font-black text-xs sm:text-sm shadow-md mb-2 animate-bounce border border-yellow-300">
          <Trophy className="w-4 h-4 text-yellow-900" />
          <span>STAGE {stats.level} 클리어 & 워드 몬스터 격파 완료!</span>
        </div>

        <h1 className="font-title text-3xl sm:text-4xl font-black text-slate-800 tracking-wide drop-shadow-xs">
          {isGameCompleted ? '🎉 100단계 대모험 최종 클리어! 🎉' : '스테이지 탐험 대성공! 🎉'}
        </h1>
        <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
          {isGameCompleted 
            ? '모든 단어 몬스터를 물리치고 전설의 워드벤처 마스터가 되었습니다!' 
            : `${avatar.name}와 함께 훌륭하게 단어를 맞추며 몬스터들을 이겨냈어요!`}
        </p>
      </div>

      {/* Character Unlock Special Notice if milestone reached */}
      {unlockMilestone && (
        <div className="w-full max-w-2xl mx-auto my-2 p-3 bg-linear-to-r from-purple-600 via-pink-600 to-amber-500 rounded-2xl text-white shadow-xl flex items-center justify-between border-2 border-yellow-300 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              {unlockMilestone.emoji}
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-yellow-200 flex items-center gap-1">
                <LockOpen className="w-3.5 h-3.5" />
                {unlockMilestone.isFinal ? '👑 최종 영웅 해금!' : '새로운 동료 캐릭터 해금!'}
              </div>
              <div className="text-sm font-extrabold">
                {stats.level}단계 돌파! [{unlockMilestone.name}] 해금!
              </div>
            </div>
          </div>
          <span className="text-xs bg-white text-purple-900 font-black px-2.5 py-1 rounded-xl shadow-xs">
            동료 획득!
          </span>
        </div>
      )}

      {/* Partner Avatar & Character Special Reward Box */}
      <div className="w-full max-w-2xl mx-auto my-2 bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border-4 border-amber-300 shadow-xl flex flex-col items-center">
        
        {/* Partner Avatar Visual */}
        <div className="mb-2">
          <AvatarDisplay
            avatarId={stats.avatarId}
            state="cheering"
            size="xl"
            showSpeechBubble={false}
          />
        </div>

        {/* Partner Avatar Encouraging Cheer Message */}
        <div className="w-full bg-linear-to-r from-amber-50 via-yellow-100 to-amber-50 border-2 border-amber-300 rounded-2xl p-3 sm:p-4 text-center shadow-inner my-2">
          <div className="font-title text-base sm:text-lg font-bold text-amber-900 flex items-center justify-center gap-1.5 mb-1">
            <span>{avatar.emoji}</span>
            <span>{avatar.name}의 승리 응원 메시지</span>
            <span>✨</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
            "{avatar.rescueMsg}"
          </p>
        </div>

        {/* Character-Specific Special Reward Item Card */}
        {reward && (
          <div className="w-full mt-3 bg-linear-to-br from-amber-50 via-yellow-100/70 to-orange-50 border-3 border-amber-400 rounded-2xl p-3.5 sm:p-4 shadow-md flex flex-col sm:flex-row items-center gap-3">
            <div className="relative shrink-0">
              <RewardDisplay reward={reward} size="md" showGlow={true} />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-black text-[11px] shadow-xs mb-1">
                <Gift className="w-3.5 h-3.5" />
                <span>{avatar.name}의 특별 모험 보상 획득!</span>
              </div>
              <h3 className="font-title text-base sm:text-lg font-black text-slate-800">
                {reward.name} {reward.emoji}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {reward.description}
              </p>
              <div className="mt-1 text-[11px] font-bold text-amber-800 italic bg-white/70 px-2 py-1 rounded-lg border border-amber-200 inline-block">
                💬 "{reward.quote}"
              </div>
            </div>
          </div>
        )}

        {/* Game Stats Summary Grid */}
        <div className="w-full grid grid-cols-3 gap-2 sm:gap-3 mt-3">
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2 sm:p-3 text-center">
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-500">최종 점수</div>
            <div className="font-game text-lg sm:text-2xl font-black text-amber-700 flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              {stats.score}
            </div>
          </div>

          <div className="bg-orange-50/80 border border-orange-200 rounded-xl p-2 sm:p-3 text-center">
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-500">최고 콤보</div>
            <div className="font-game text-lg sm:text-2xl font-black text-orange-600 flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 fill-orange-400 text-orange-500" />
              {stats.maxCombo}
            </div>
          </div>

          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-2 sm:p-3 text-center">
            <div className="text-[10px] sm:text-[11px] font-bold text-slate-500">처치 몬스터</div>
            <div className="font-game text-lg sm:text-2xl font-black text-emerald-600 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              10 / 10
            </div>
          </div>
        </div>

      </div>

      {/* Review Notebook Section (학습 목표 3: 틀린 단어는 게임이 끝난 후 다시 복습할 수 있다) */}
      <div className="w-full max-w-2xl mx-auto my-2 bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-5 border-3 border-amber-300 shadow-lg flex flex-col">
        
        <div className="flex items-center justify-between border-b-2 border-amber-100 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h2 className="font-title text-lg sm:text-xl font-bold text-slate-800">
              단어 복습 수첩
            </h2>
          </div>

          {hasWrongWords && (
            <span className="text-xs font-bold px-2.5 py-1 bg-red-100 text-red-700 border border-red-200 rounded-full">
              틀린 단어 {stats.wrongWords.length}개
            </span>
          )}
        </div>

        {/* If player made some mistakes */}
        {hasWrongWords ? (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm font-semibold text-slate-600">
                💡 게임 중 헷갈렸던 단어예요. 소리를 듣고 뜻을 확인해보세요!
              </p>
              
              <button
                type="button"
                id="btn-retry-wrong-words"
                onClick={() => {
                  playClickSound();
                  onRetryWrongWords(stats.wrongWords);
                }}
                className="px-3 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-extrabold shadow-sm active:scale-95 transition-all flex items-center gap-1 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                틀린 단어만 재도전!
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2 max-h-60 overflow-y-auto pr-1">
              {stats.wrongWords.map((word) => (
                <div
                  key={word.id}
                  className="bg-amber-50/70 border-2 border-amber-200 rounded-2xl p-3 flex flex-col justify-between shadow-xs hover:border-amber-400 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-game text-xl font-bold text-slate-800">
                          {word.word}
                        </span>
                        {word.isPolysemy && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-600 text-white font-black">
                            2가지 뜻!
                          </span>
                        )}
                      </div>
                      
                      {/* Meanings */}
                      <div className="mt-1 text-xs font-extrabold text-amber-900">
                        {word.isPolysemy ? (
                          <div className="space-y-0.5">
                            {word.meanings.map((m, idx) => (
                              <div key={idx} className="text-purple-900">
                                🌟 {idx + 1}. {m}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span>뜻: {word.meanings.join(' / ')}</span>
                        )}
                      </div>
                    </div>

                    {/* Listen Button */}
                    <button
                      type="button"
                      id={`btn-listen-result-${word.id}`}
                      onClick={() => speakWord(word.word)}
                      className="p-2 rounded-xl bg-white hover:bg-amber-100 text-amber-800 border border-amber-300 shadow-xs active:scale-90 transition-transform"
                      title="발음 듣기"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Kid-friendly example sentence */}
                  <div className="mt-2 pt-1.5 border-t border-amber-200/70 text-[11px] text-slate-600">
                    <p className="font-medium">💬 {word.exampleSentence}</p>
                    <p className="text-slate-500 font-normal">{word.exampleTranslation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Perfect Score! */
          <div className="py-6 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="font-title text-xl font-bold text-emerald-800 mb-1">
              우와! 만점이에요! 완벽한 영어 마스터! 🎉
            </h3>
            <p className="text-sm font-semibold text-slate-600">
              10마리의 몬스터를 단 한 번도 실수 없이 완벽하게 물리쳤어요!
            </p>
          </div>
        )}

      </div>

      {/* Action Buttons: 다음 레벨 도전 / 다시 하기 / 처음으로 */}
      <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2.5 my-3">
        {!isGameCompleted ? (
          <button
            type="button"
            id="btn-next-level"
            onClick={() => {
              playClickSound();
              onNextLevel();
            }}
            className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-linear-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-title text-base sm:text-lg font-black shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-yellow-300 animate-pulse"
          >
            <span>다음 스테이지 도전! (Lv.{stats.level + 1})</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-linear-to-r from-amber-500 to-orange-500 text-white font-title text-base font-black shadow-lg text-center border-2 border-yellow-300">
            👑 최고 단계 100레벨 도달 완료! 👑
          </div>
        )}

        <button
          type="button"
          id="btn-restart-current-level"
          onClick={() => {
            playClickSound();
            onRestartCurrentLevel();
          }}
          className="w-full sm:w-auto py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-title text-sm sm:text-base font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5 border-2 border-amber-300"
        >
          <RotateCcw className="w-4 h-4" />
          <span>현재 레벨 다시하기</span>
        </button>

        <button
          type="button"
          id="btn-go-home"
          onClick={() => {
            playClickSound();
            onGoHome();
          }}
          className="w-full sm:w-auto py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-title text-sm sm:text-base font-bold border-2 border-slate-300 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <Home className="w-4 h-4 text-slate-600" />
          <span>홈으로</span>
        </button>
      </div>

    </div>
  );
};
