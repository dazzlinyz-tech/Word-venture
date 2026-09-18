import React, { useEffect } from 'react';
import { AvatarId, WordItem } from '../types';
import { AVATARS } from '../data/avatars';
import { AvatarDisplay } from './AvatarDisplay';
import { playGameOverDefeatSound, playClickSound, speakWord } from '../utils/audio';
import { RotateCcw, Home, Volume2, Clock, AlertTriangle, Sparkles } from 'lucide-react';

interface FailedScreenProps {
  avatarId: AvatarId;
  failedWord?: WordItem;
  level: number;
  defeatedCount: number;
  totalQuestions: number;
  onRetryLevel: () => void;
  onGoHome: () => void;
}

export const FailedScreen: React.FC<FailedScreenProps> = ({
  avatarId,
  failedWord,
  level,
  defeatedCount,
  totalQuestions,
  onRetryLevel,
  onGoHome
}) => {
  const avatar = AVATARS[avatarId] || AVATARS.leo;

  useEffect(() => {
    playGameOverDefeatSound();
  }, []);

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-rose-100 via-orange-50 to-amber-100 flex flex-col items-center justify-between p-3 sm:p-6 select-none overflow-x-hidden">
      
      {/* Top Header */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center mt-2">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-500 text-white font-black text-xs sm:text-sm shadow-md mb-2 animate-bounce">
          <Clock className="w-4 h-4" />
          시간 초과! 탐험 일시 중단
        </div>

        <h1 className="font-title text-3xl sm:text-4xl font-black text-slate-800 tracking-wide drop-shadow-xs">
          앗! 몬스터가 너무 가까워졌어요!
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
          제한 시간 내에 정답을 고르지 못해 모험이 잠시 멈췄어요 😢
        </p>
      </div>

      {/* Main Avatar Sad Box */}
      <div className="w-full max-w-2xl mx-auto my-3 bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border-4 border-red-300 shadow-xl flex flex-col items-center">
        
        {/* Avatar Encouraging Partner */}
        <div className="mb-2">
          <AvatarDisplay
            avatarId={avatarId}
            state="failed"
            size="xl"
            showSpeechBubble={true}
            customSpeechText="괜찮아! 영단어 다시 확인하고 한 번 더 가보자! 💪"
          />
        </div>

        {/* Failure Encouraging Message */}
        <div className="w-full bg-red-50 border-2 border-red-200 rounded-2xl p-3 sm:p-4 text-center my-2">
          <div className="font-title text-base sm:text-lg font-bold text-red-900 mb-1 flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>포기하지 마세요! 100단계 대모험은 계속됩니다!</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-700">
            {avatar.name}가 친구의 손길을 간절히 기다리고 있어요. 다시 한번 도전하면 몬스터를 쉽게 물리칠 수 있어요!
          </p>
        </div>

        {/* Failed Word Hint & Learning Card */}
        {failedWord && (
          <div className="w-full bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-3 sm:p-4 mt-2">
            <div className="flex items-center justify-between border-b border-amber-200 pb-1.5 mb-2">
              <span className="text-xs font-black text-amber-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                놓쳤던 단어를 확인해봐요!
              </span>
              <button
                type="button"
                id="btn-failed-word-listen"
                onClick={() => speakWord(failedWord.word)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 shadow-xs active:scale-95 transition-transform"
              >
                <Volume2 className="w-3.5 h-3.5" />
                발음 듣기
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                <span className="font-game text-2xl sm:text-3xl font-black text-slate-800 tracking-wide">
                  {failedWord.word}
                </span>
                <span className="text-xs text-slate-500 ml-2 font-mono">{failedWord.phonetic}</span>
              </div>
              <div className="text-sm sm:text-base font-extrabold text-amber-900 bg-white px-3 py-1.5 rounded-xl border border-amber-200">
                뜻: {failedWord.meanings.join(' / ')}
              </div>
            </div>

            <div className="mt-2 text-[11px] sm:text-xs text-slate-600 bg-white/60 p-2 rounded-xl border border-amber-200/60">
              <p className="font-semibold">💬 예문: {failedWord.exampleSentence}</p>
              <p className="text-slate-500">{failedWord.exampleTranslation}</p>
            </div>
          </div>
        )}

        {/* Progress summary before defeat */}
        <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500 mt-3 px-2">
          <span>도전 레벨: Level {level}</span>
          <span>물리친 몬스터: {defeatedCount} / {totalQuestions}마리</span>
        </div>

      </div>

      {/* Action Buttons: 다시 도전하기 / 홈으로 */}
      <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 my-3">
        <button
          type="button"
          id="btn-retry-failed-level"
          onClick={() => {
            playClickSound();
            onRetryLevel();
          }}
          className="w-full sm:w-1/2 py-3.5 px-6 rounded-2xl bg-linear-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-title text-lg font-black shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-yellow-300 animate-pulse"
        >
          <RotateCcw className="w-5 h-5" />
          다시 힘내서 재도전! 💪
        </button>

        <button
          type="button"
          id="btn-failed-go-home"
          onClick={() => {
            playClickSound();
            onGoHome();
          }}
          className="w-full sm:w-1/2 py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-title text-lg font-bold border-2 border-slate-300 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5 text-slate-600" />
          처음으로 (아바타 선택)
        </button>
      </div>

    </div>
  );
};
