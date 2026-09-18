import React, { useState } from 'react';
import { AvatarId, GameMode } from '../types';
import { AVATARS } from '../data/avatars';
import { AvatarDisplay } from './AvatarDisplay';
import { playClickSound, setSoundMuted, getSoundMuted, playWrongAnswerSound } from '../utils/audio';
import { Volume2, VolumeX, Sparkles, Play, Shield, Compass, Wand2, Info, Lock, Gift, Trophy } from 'lucide-react';

interface StartScreenProps {
  selectedAvatarId: AvatarId;
  onSelectAvatar: (id: AvatarId) => void;
  selectedMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  onStartGame: () => void;
  level: number;
  maxUnlockedLevel?: number;
  onSelectLevel?: (lvl: number) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  selectedAvatarId,
  onSelectAvatar,
  selectedMode,
  onSelectMode,
  onStartGame,
  level,
  maxUnlockedLevel = 1,
  onSelectLevel
}) => {
  const [isMuted, setIsMuted] = useState(getSoundMuted());
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [lockAlertMsg, setLockAlertMsg] = useState<string | null>(null);

  const highestReached = Math.max(level, maxUnlockedLevel);

  const handleToggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    setSoundMuted(next);
    if (!next) playClickSound();
  };

  const handleAvatarClick = (id: AvatarId) => {
    const av = AVATARS[id];
    const unlockReq = av.unlockLevel ?? av.requiredLevel ?? 1;
    const isLocked = unlockReq > 1 ? highestReached < unlockReq : false;

    if (isLocked) {
      playWrongAnswerSound();
      setLockAlertMsg(`🔒 ${av.name}는 ${unlockReq - 1}레벨을 클리어(Lv.${unlockReq} 도달)해야 해금돼요!`);
      setTimeout(() => setLockAlertMsg(null), 3000);
      return;
    }

    playClickSound();
    onSelectAvatar(id);
  };

  const handleModeClick = (mode: GameMode) => {
    playClickSound();
    onSelectMode(mode);
  };

  const currentAvatar = AVATARS[selectedAvatarId] || AVATARS.leo;
  const allAvatarIds: AvatarId[] = ['leo', 'mina', 'tori', 'pupu', 'robi', 'luna', 'chichi', 'kaya', 'coco', 'sol'];

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-sky-400 via-amber-200 to-emerald-300 flex flex-col justify-between items-center p-3 sm:p-6 select-none overflow-x-hidden">
      
      {/* Top Header with Level badge, sound toggle & info */}
      <header className="w-full max-w-3xl flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-amber-300 shadow-xs">
            <span className="text-[11px] sm:text-xs font-black text-amber-900">🎒 초등 저학년 CEFR A1</span>
          </div>

          {/* Interactive Stage Selector with Next / Prev and Max Level Indicator */}
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xs p-1 rounded-full border-2 border-amber-300 shadow-md">
            <button
              type="button"
              id="btn-prev-stage"
              disabled={level <= 1}
              onClick={() => {
                playClickSound();
                if (onSelectLevel) onSelectLevel(Math.max(1, level - 1));
              }}
              className="w-6 h-6 rounded-full bg-amber-100 hover:bg-amber-200 active:scale-90 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-amber-900 font-black text-xs transition-all"
              title="이전 스테이지 선택"
            >
              ◀
            </button>

            <div className="flex items-center gap-1 bg-linear-to-r from-amber-500 to-orange-500 text-white font-title text-xs sm:text-sm font-black px-2.5 py-0.5 rounded-full shadow-xs border border-yellow-300">
              <Trophy className="w-3.5 h-3.5 text-yellow-200" />
              <span>STAGE {level}</span>
            </div>

            <button
              type="button"
              id="btn-next-stage"
              disabled={level >= highestReached || level >= 100}
              onClick={() => {
                playClickSound();
                if (onSelectLevel) onSelectLevel(Math.min(highestReached, level + 1));
              }}
              className="w-6 h-6 rounded-full bg-amber-100 hover:bg-amber-200 active:scale-90 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-amber-900 font-black text-xs transition-all"
              title="다음 스테이지 선택"
            >
              ▶
            </button>

            {highestReached > 1 && (
              <span className="text-[10px] sm:text-[11px] font-extrabold text-amber-900 pl-1 pr-1.5 whitespace-nowrap">
                (도달: Lv.{highestReached})
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            id="btn-how-to-play"
            onClick={() => {
              playClickSound();
              setShowHowToPlay(!showHowToPlay);
            }}
            className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 shadow-md border border-amber-300 active:scale-95 transition-all"
            title="게임 방법"
          >
            <Info className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="btn-start-sound-toggle"
            onClick={handleToggleSound}
            className="p-2 rounded-xl bg-white/90 hover:bg-white text-amber-800 shadow-md border border-amber-300 active:scale-95 transition-all"
            title={isMuted ? '소리 켜기' : '소리 끄기'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Center Content */}
      <main className="w-full max-w-3xl flex flex-col items-center my-auto py-2">
        
        {/* Game Title Logo (WORDVENTURE / 워드벤처) */}
        <div className="text-center mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/90 text-amber-950 text-xs font-black mb-1 shadow-xs animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            단어 몬스터를 물리치며 100단계 모험을 정복하자!
          </div>

          <h1 className="font-title text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2">
            <span className="text-amber-300">WORD</span>
            <span className="text-rose-500">VENTURE</span>
          </h1>

          <p className="font-title text-base sm:text-lg font-bold text-amber-950 drop-shadow-xs">
            워드벤처 : 영단어 대모험 & 동료 캐릭터 컬렉션!
          </p>
        </div>

        {/* Locked Character Alert Toast */}
        {lockAlertMsg && (
          <div className="w-full bg-red-500 text-white text-xs sm:text-sm font-bold p-2.5 rounded-2xl shadow-lg border-2 border-yellow-300 text-center mb-2 animate-bounce flex items-center justify-center gap-1.5">
            <Lock className="w-4 h-4" />
            <span>{lockAlertMsg}</span>
          </div>
        )}

        {/* How to play modal if opened */}
        {showHowToPlay && (
          <div className="w-full bg-white/95 backdrop-blur-sm rounded-2xl p-4 border-2 border-amber-400 shadow-xl mb-3 animate-in fade-in duration-200">
            <h3 className="font-title text-base font-bold text-amber-900 mb-1 flex items-center gap-1.5">
              🗺️ 워드벤처 모험 규칙 & 100단계 도전!
            </h3>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 font-medium list-disc list-inside">
              <li>함께 모험할 <span className="font-bold text-amber-700">파트너 캐릭터</span>를 선택하세요! 게임 중 위에서 끊임없이 응원해줍니다!</li>
              <li>제시된 한글 뜻을 보고 <span className="font-bold text-red-600">18초 제한 시간 내</span>에 올바른 단어 몬스터를 터치하세요!</li>
              <li>10마리의 몬스터를 모두 이기면 <span className="font-bold text-amber-700">다음 레벨로 넘어가며</span>, 캐릭터별 <span className="font-bold text-purple-700">전용 보상</span>을 획득해요!</li>
              <li>레벨이 올라갈 때마다 <span className="font-bold text-emerald-700">새로운 동료 캐릭터가 해금</span>됩니다! (Lv.11, 21, 31, 41, 61, 81, 100)</li>
              <li><span className="font-bold text-rose-600">최대 100단계</span>를 정복하고 모든 캐릭터를 모으면 모험의 최종 우승자가 됩니다! 👑</li>
            </ul>
          </div>
        )}

        {/* 1. Avatar Selection Section (모험 파트너 선택: 100레벨까지 캐릭터 해금) */}
        <div className="w-full bg-white/95 backdrop-blur-sm rounded-3xl p-3 sm:p-5 border-3 border-amber-300 shadow-xl mb-3">
          
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-amber-100">
            <div className="flex items-center gap-1.5 font-title text-sm sm:text-base font-bold text-slate-800">
              <span>🦸</span>
              <span>모험을 함께할 파트너 캐릭터를 선택하세요!</span>
            </div>
            <span className="text-[11px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
              100레벨 전원 해금 도전!
            </span>
          </div>

          {/* 10 Avatars Selection Grid (2 rows x 5 cols) */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {allAvatarIds.map(id => {
              const av = AVATARS[id];
              const isSelected = selectedAvatarId === id;
              const unlockReq = av.unlockLevel ?? av.requiredLevel ?? 1;
              const isLocked = unlockReq > 1 ? highestReached < unlockReq : false;

              return (
                <button
                  key={id}
                  type="button"
                  id={`btn-select-avatar-${id}`}
                  onClick={() => handleAvatarClick(id)}
                  className={`group relative flex flex-col items-center p-1 sm:p-2 rounded-2xl transition-all duration-200 border-2 text-center ${
                    isLocked
                      ? 'bg-slate-100/80 border-slate-300 opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-100/95 border-amber-500 scale-105 shadow-md ring-3 ring-amber-300'
                      : 'bg-white/90 border-slate-200 hover:border-amber-300 hover:bg-amber-50/60'
                  }`}
                >
                  {/* Lock Overlay */}
                  {isLocked && (
                    <div className="absolute -top-1.5 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md z-10">
                      <Lock className="w-3 h-3" />
                    </div>
                  )}

                  <div className="scale-75 sm:scale-90 mb-0.5">
                    <AvatarDisplay
                      avatarId={id}
                      state={isLocked ? 'failed' : isSelected ? 'cheering' : 'idle'}
                      size="sm"
                      showSpeechBubble={false}
                    />
                  </div>

                  <span className="font-title text-[11px] sm:text-xs font-bold text-slate-800 truncate w-full">
                    {av.name.split(' ')[0]}
                  </span>

                  {isLocked ? (
                    <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1 py-0.2 rounded mt-0.5">
                      Lv.{unlockReq}
                    </span>
                  ) : isSelected ? (
                    <span className="mt-0.5 text-[8px] sm:text-[9px] font-black px-1.5 py-0.2 rounded-full bg-amber-500 text-white shadow-xs">
                      선택됨 ✨
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-500 font-semibold truncate w-full">
                      {av.reward?.emoji} {av.reward?.name.split(' ')[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Avatar & Reward Teaser Box */}
          <div className="mt-3 bg-linear-to-r from-amber-50 via-yellow-100/60 to-orange-50 border border-amber-200 rounded-xl p-2.5 flex items-center justify-between gap-2">
            <div className="text-left">
              <p className="text-xs sm:text-sm font-bold text-amber-950">
                "{currentAvatar.tagline}"
              </p>
              {currentAvatar.reward && (
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 mt-0.5">
                  <Gift className="w-3 h-3 text-amber-600" />
                  <span>스테이지 클리어 보상: <span className="text-slate-800 font-extrabold">{currentAvatar.reward.name}</span> ({currentAvatar.reward.emoji})</span>
                </div>
              )}
            </div>
            <span className="text-2xl shrink-0">{currentAvatar.emoji}</span>
          </div>
        </div>

        {/* 2. Game Mode Selection (단어 팩 선택: 2개 이상의 뜻을 가진 단어 포함!) */}
        <div className="w-full bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border-2 border-amber-300 shadow-md mb-3">
          <div className="text-xs font-bold text-slate-600 mb-2 flex items-center justify-between">
            <span>🎯 학습 모드 선택</span>
            <span className="text-purple-700 font-extrabold">🌟 다의어(2가지 뜻) 완벽 지원!</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              id="btn-mode-mix"
              onClick={() => handleModeClick('mix')}
              className={`p-2 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                selectedMode === 'mix'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md font-black'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
              }`}
            >
              <div>💥 모험 믹스</div>
              <div className="text-[10px] opacity-90 font-medium">기본 + 다의어</div>
            </button>

            <button
              type="button"
              id="btn-mode-polysemy"
              onClick={() => handleModeClick('polysemy')}
              className={`p-2 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                selectedMode === 'polysemy'
                  ? 'bg-purple-600 text-white border-purple-700 shadow-md font-black'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50'
              }`}
            >
              <div>🌟 2가지 뜻 스페셜</div>
              <div className="text-[10px] opacity-90 font-medium">다의어 집중 마스터</div>
            </button>

            <button
              type="button"
              id="btn-mode-standard"
              onClick={() => handleModeClick('standard10')}
              className={`p-2 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                selectedMode === 'standard10'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md font-black'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
              }`}
            >
              <div>⭐️ 필수 기초 단어</div>
              <div className="text-[10px] opacity-90 font-medium">초등 1~2학년 기본</div>
            </button>
          </div>
        </div>

        {/* 3. Big Central Start Button (게임 시작) */}
        <button
          type="button"
          id="btn-start-game-main"
          onClick={() => {
            playClickSound();
            onStartGame();
          }}
          className="w-full max-w-md py-3.5 sm:py-4 px-6 sm:px-8 rounded-3xl bg-linear-to-r from-rose-500 via-amber-500 to-orange-500 hover:from-rose-600 hover:via-amber-600 hover:to-orange-600 text-white font-title text-2xl sm:text-3xl font-black shadow-2xl hover:shadow-orange-500/40 active:scale-95 transition-all transform border-4 border-yellow-300 flex items-center justify-center gap-3 animate-pulse"
        >
          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
          <span>STAGE {level} 모험 출발! ⚔️</span>
        </button>

      </main>

      {/* Bottom info */}
      <footer className="w-full max-w-3xl text-center text-xs font-bold text-amber-950/80">
        초등학교 저학년을 위한 신나는 100단계 영어 모험 웹앱
      </footer>

    </div>
  );
};
