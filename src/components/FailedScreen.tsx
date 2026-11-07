import React, { useEffect, useState } from 'react';
import { AvatarId, WordItem, SentenceTapStat } from '../types';
import { AVATARS } from '../data/avatars';
import { AvatarDisplay } from './AvatarDisplay';
import { playGameOverDefeatSound, playClickSound, speakWord } from '../utils/audio';
import { RotateCcw, Home, Volume2, Clock, AlertTriangle, Sparkles, FileSpreadsheet } from 'lucide-react';
import { GoogleSheetsModal } from './GoogleSheetsModal';
import { getStudentName, GOOGLE_SHEET_URL, getPlayCount } from '../services/googleSheets';

interface FailedScreenProps {
  avatarId: AvatarId;
  failedWord?: WordItem;
  level: number;
  defeatedCount: number;
  totalQuestions: number;
  sentenceStats?: SentenceTapStat[];
  averageTapCount?: number;
  totalTapCount?: number;
  onRetryLevel: () => void;
  onGoHome: () => void;
}

export const FailedScreen: React.FC<FailedScreenProps> = ({
  avatarId,
  failedWord,
  level,
  defeatedCount,
  totalQuestions,
  sentenceStats,
  averageTapCount,
  totalTapCount,
  onRetryLevel,
  onGoHome
}) => {
  const avatar = AVATARS[avatarId] || AVATARS.robi;
  const [showSheetsModal, setShowSheetsModal] = useState(false);
  const studentName = getStudentName();
  const wrongCount = Math.max(0, totalQuestions - defeatedCount);

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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 min-w-0 w-full">
              <div className="min-w-0 max-w-full text-center sm:text-left">
                <span className="font-game text-xl sm:text-3xl font-black text-slate-800 tracking-wide break-words">
                  {failedWord.word}
                </span>
                <span className="text-xs text-slate-500 ml-2 font-mono whitespace-nowrap">{failedWord.phonetic}</span>
              </div>
              <div className="text-sm sm:text-base font-extrabold text-amber-900 bg-white px-3 py-1.5 rounded-xl border border-amber-200 max-w-full break-words text-center">
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

      {/* Google Sheets Sync Card */}
      <div className="w-full max-w-2xl mx-auto my-2 bg-linear-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <FileSpreadsheet className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-blue-900">
                구글 시트 학습 기록 연동
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">
                {getPlayCount()}회차 기록됨
              </span>
            </div>
            <p className="text-[11px] text-slate-600 truncate mt-0.5">
              탐험가 <strong className="text-blue-700">{studentName}</strong> | 맞힌 단어: <strong className="text-emerald-700">{defeatedCount}개</strong> | 틀린 단어: <strong className="text-rose-600">{wrongCount}개</strong>
            </p>
            <p className="text-[10px] text-indigo-700 font-bold mt-0.5 flex items-center gap-1">
              <span>문장별 평균 탭: <strong className="text-indigo-900">{averageTapCount != null ? `${averageTapCount}회` : '1회'}</strong> (시트에 문장별 탭 통계 전송됨)</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setShowSheetsModal(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-xs active:scale-95 transition-all"
          >
            기록 관리
          </button>
          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold transition-all hidden sm:inline-block"
          >
            시트 열기 ↗
          </a>
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

      {/* Google Sheets Modal */}
      <GoogleSheetsModal
        isOpen={showSheetsModal}
        onClose={() => setShowSheetsModal(false)}
      />

    </div>
  );
};
