import React, { useState } from 'react';
import { AvatarId, GameMode } from '../types';
import { AVATARS } from '../data/avatars';
import { AVATAR_PUBLIC_FALLBACKS } from '../utils/assetHelper';
import { AvatarDisplay } from './AvatarDisplay';
import { SmartImage } from './SmartImage';
import { playClickSound, setSoundMuted, getSoundMuted, playWrongAnswerSound } from '../utils/audio';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Play,
  Info,
  Lock,
  Gift,
  Trophy,
  Star,
  Check,
  Wand2,
  Sword,
  Compass,
  Wrench,
  FlaskConical,
  Bell,
  Feather,
  Gem,
  Crown,
  FileSpreadsheet,
  User
} from 'lucide-react';
import { GoogleSheetsModal } from './GoogleSheetsModal';
import { getStudentName } from '../services/googleSheets';

export const RewardMiniIcon: React.FC<{ iconType: string; emoji: string; className?: string }> = ({
  iconType,
  emoji,
  className = 'w-3 h-3'
}) => {
  switch (iconType) {
    case 'wand':
      return <Wand2 className={`${className} text-purple-600 inline shrink-0`} />;
    case 'sword':
      return <Sword className={`${className} text-amber-600 inline shrink-0`} />;
    case 'map':
      return <Compass className={`${className} text-rose-500 inline shrink-0`} />;
    case 'orb':
      return <Sparkles className={`${className} text-red-500 inline shrink-0`} />;
    case 'wrench':
      return <Wrench className={`${className} text-cyan-600 inline shrink-0`} />;
    case 'potion':
      return <FlaskConical className={`${className} text-emerald-600 inline shrink-0`} />;
    case 'bell':
      return <Bell className={`${className} text-amber-600 inline shrink-0`} />;
    case 'feather':
      return <Feather className={`${className} text-blue-600 inline shrink-0`} />;
    case 'crystal':
      return <Gem className={`${className} text-cyan-500 inline shrink-0`} />;
    case 'crown':
      return <Crown className={`${className} text-yellow-500 inline shrink-0`} />;
    default:
      return <span className="inline text-xs">{emoji}</span>;
  }
};

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
  const [showSheetsModal, setShowSheetsModal] = useState(false);
  const [studentName, setStudentNameState] = useState(getStudentName());

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
      setTimeout(() => setLockAlertMsg(null), 3500);
      return;
    }

    playClickSound();
    onSelectAvatar(id);
  };

  const handleModeClick = (mode: GameMode) => {
    playClickSound();
    onSelectMode(mode);
  };

  const currentAvatar = AVATARS[selectedAvatarId] || AVATARS.robi;
  const allAvatarIds: AvatarId[] = ['robi', 'chichi', 'coco', 'mina', 'luna', 'pupu', 'leo', 'kaya', 'tori', 'sol'];

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-sky-200 via-amber-50/90 to-emerald-100 flex flex-col justify-between items-center p-3 sm:p-6 select-none overflow-x-hidden relative">
      
      {/* Whimsical background aesthetic decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <div className="absolute -top-12 left-10 w-72 h-72 bg-sky-300 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-amber-200 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 left-1/4 w-96 h-96 bg-emerald-200 rounded-full blur-3xl" />
      </div>

      {/* Top Header with Level badge, sound toggle & info */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border-2 border-amber-300 shadow-sm">
            <span className="text-sm">🎒</span>
            <span className="text-xs font-black text-amber-950">초등 저학년 CEFR A1 영단어</span>
          </div>

          {/* Interactive Stage Selector with Next / Prev */}
          <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-2xl border-2 border-amber-300 shadow-sm">
            <button
              type="button"
              id="btn-prev-stage"
              disabled={level <= 1}
              onClick={() => {
                playClickSound();
                if (onSelectLevel) onSelectLevel(Math.max(1, level - 1));
              }}
              className="w-7 h-7 rounded-xl bg-amber-100 hover:bg-amber-200 active:scale-90 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-amber-900 font-black text-xs transition-all shadow-xs"
              title="이전 스테이지 선택"
            >
              ◀
            </button>

            <div className="flex items-center gap-1.5 bg-linear-to-r from-amber-500 to-orange-500 text-white font-title text-xs sm:text-sm font-black px-3 py-1 rounded-xl shadow-xs border border-yellow-300">
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
              className="w-7 h-7 rounded-xl bg-amber-100 hover:bg-amber-200 active:scale-90 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-amber-900 font-black text-xs transition-all shadow-xs"
              title="다음 스테이지 선택"
            >
              ▶
            </button>

            {highestReached > 1 && (
              <span className="text-[11px] font-extrabold text-amber-900 px-1 whitespace-nowrap">
                (최고 Lv.{highestReached})
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            id="btn-sheets-modal"
            onClick={() => {
              playClickSound();
              setShowSheetsModal(true);
            }}
            className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-white/95 hover:bg-white text-blue-800 shadow-sm border-2 border-blue-400 active:scale-95 transition-all flex items-center gap-1.5"
            title="구글 시트 연동 및 학생 기록 관리"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="hidden sm:inline text-xs font-black text-blue-900">구글 시트</span>
            <span className="text-[11px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-lg font-extrabold max-w-[75px] truncate">
              {studentName}
            </span>
          </button>

          <button
            type="button"
            id="btn-how-to-play"
            onClick={() => {
              playClickSound();
              setShowHowToPlay(!showHowToPlay);
            }}
            className="p-2.5 rounded-2xl bg-white/95 hover:bg-white text-slate-700 shadow-sm border-2 border-amber-300 active:scale-95 transition-all flex items-center gap-1"
            title="게임 방법"
          >
            <Info className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline text-xs font-black text-amber-950">게임방법</span>
          </button>

          <button
            type="button"
            id="btn-start-sound-toggle"
            onClick={handleToggleSound}
            className="p-2.5 rounded-2xl bg-white/95 hover:bg-white text-amber-900 shadow-sm border-2 border-amber-300 active:scale-95 transition-all"
            title={isMuted ? '소리 켜기' : '소리 끄기'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
          </button>
        </div>
      </header>

      {/* Main Center Content */}
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center my-auto py-2">
        
        {/* Game Title Logo (WORD VENTURE) */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 text-amber-900 text-xs font-black mb-1.5 shadow-sm border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
            <span>프리미엄 3D 캐릭터 컬렉션과 함께하는 100단계 영단어 대모험!</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
          </div>

          <h1 className="font-title text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_10px_rgba(180,83,9,0.45)] flex items-center justify-center gap-2">
            <span className="bg-linear-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent filter drop-shadow-sm">WORD</span>
            <span className="bg-linear-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent filter drop-shadow-sm">VENTURE</span>
          </h1>

          <p className="font-title text-sm sm:text-base font-bold text-amber-950 drop-shadow-xs mt-0.5">
            워드벤처 : 사랑스러운 3D 동료 캐릭터를 모두 모아 100단계를 정복하세요!
          </p>
        </div>

        {/* Locked Character Alert Toast */}
        {lockAlertMsg && (
          <div className="w-full max-w-md bg-linear-to-r from-rose-500 to-red-600 text-white text-xs sm:text-sm font-black p-3 rounded-2xl shadow-xl border-2 border-yellow-300 text-center mb-3 animate-bounce flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-yellow-200" />
            <span>{lockAlertMsg}</span>
          </div>
        )}

        {/* How to play modal if opened */}
        {showHowToPlay && (
          <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border-3 border-amber-400 shadow-2xl mb-3 animate-in fade-in duration-200 text-left">
            <h3 className="font-title text-base sm:text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
              <span>🗺️</span>
              <span>워드벤처 모험 규칙 & 100단계 도전!</span>
            </h3>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 font-medium list-disc list-inside">
              <li>함께 모험할 <span className="font-bold text-amber-700">3D 파트너 캐릭터</span>를 선택하세요! 게임 중 입체적인 피규어 동료가 힘차게 응원해줍니다.</li>
              <li>제시된 한글 뜻을 보고 <span className="font-bold text-red-600">제한 시간 18초 내</span>에 올바른 영어 단어 몬스터를 터치하세요!</li>
              <li>10마리의 몬스터를 모두 이기면 <span className="font-bold text-amber-700">다음 단계로 이동</span>하며, 캐릭터별 <span className="font-bold text-purple-700">전용 보물 보상</span>을 획득해요!</li>
              <li>모험을 진행하며 레벨이 올라갈 때마다 <span className="font-bold text-emerald-700">새로운 3D 캐릭터가 해금</span>됩니다! (Lv.11, 21, 31, 41, 61, 81, 100)</li>
              <li><span className="font-bold text-rose-600">최대 100단계</span>를 정복하고 모든 캐릭터를 모으면 모험의 최종 우승자가 됩니다! 👑</li>
            </ul>
          </div>
        )}

        {/* 1. 3D Character Selection Section (캐릭터 선택 화면 전면 개선) */}
        <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-3.5 sm:p-5 border-3 border-amber-300/90 shadow-xl mb-3">
          
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-100">
            <div className="flex items-center gap-2 font-title text-sm sm:text-base font-bold text-slate-800">
              <span className="text-lg">🦸</span>
              <span>모험을 함께할 3D 파트너 캐릭터를 선택하세요!</span>
            </div>
            <span className="text-[11px] font-black text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200">
              100단계 해결 도전!
            </span>
          </div>

          {/* 10 3D Collectible Figurine Grid (2 rows x 5 cols) */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
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
                  className={`group relative flex flex-col items-center p-2 sm:p-2.5 rounded-2xl transition-all duration-300 text-center ${
                    isSelected
                      ? 'bg-linear-to-b from-amber-100 to-yellow-50 border-3 border-amber-400 -translate-y-1 sm:-translate-y-1.5 shadow-[0_10px_20px_-5px_rgba(245,158,11,0.45)] ring-3 ring-amber-300/80'
                      : isLocked
                      ? 'bg-slate-100/70 border-2 border-slate-200/90 hover:border-slate-300 hover:bg-slate-100 cursor-pointer backdrop-blur-xs'
                      : 'bg-white/90 border-2 border-amber-100 hover:border-amber-300 hover:bg-amber-50/70 hover:scale-103 hover:-translate-y-0.5 shadow-sm'
                  }`}
                >
                  {/* Selected Shiny Check Badge */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-1 bg-amber-500 text-white rounded-full p-1 shadow-md z-20 ring-2 ring-white animate-pulse">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  {/* Locked Translucent Overlay with Level Teaser */}
                  {isLocked && (
                    <div className="absolute -top-1.5 -right-1 bg-linear-to-r from-slate-700 to-slate-900 text-yellow-300 rounded-full px-1.5 py-0.5 text-[9px] font-black shadow-md z-20 flex items-center gap-0.5 border border-yellow-300/50">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Lv.{unlockReq}</span>
                    </div>
                  )}

                  {/* 3D Figurine Vessel with Pedestal */}
                  <div className="relative w-full aspect-square flex flex-col items-center justify-center mb-1">
                    <SmartImage
                      src={av.image3d}
                      alt={av.name}
                      fallbackSrcs={AVATAR_PUBLIC_FALLBACKS[id]}
                      className="w-full h-full rounded-xl"
                      imgClassName={`w-full h-full object-cover rounded-xl transition-all duration-300 ${
                        isSelected
                          ? 'animate-joy-jump scale-105 filter drop-shadow-md'
                          : isLocked
                          ? 'opacity-70 grayscale-[35%] group-hover:opacity-85 group-hover:grayscale-0'
                          : 'group-hover:scale-105'
                      }`}
                      fallbackComponent={
                        <div className={`w-full h-full rounded-xl flex items-center justify-center bg-linear-to-b ${av.bgGradient}`}>
                          <span className="text-2xl sm:text-3xl">{av.emoji}</span>
                        </div>
                      }
                    />

                    {/* Figurine Pedestal Shadow */}
                    <div className="w-3/4 h-1.5 bg-slate-800/20 rounded-full blur-[1px] mt-0.5" />
                  </div>

                  {/* Character Name */}
                  <span className={`font-title text-[11px] sm:text-xs font-black truncate w-full mt-0.5 ${
                    isSelected ? 'text-amber-950' : isLocked ? 'text-slate-500' : 'text-slate-700'
                  }`}>
                    {av.name.split(' ')[0]}
                  </span>

                  {/* Status Indicator */}
                  {isLocked ? (
                    <span className="text-[9px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded-md mt-0.5">
                      잠김 🔒
                    </span>
                  ) : isSelected ? (
                    <span className="text-[9px] font-black text-amber-900 bg-amber-300/90 px-1.5 py-0.2 rounded-full mt-0.5 shadow-xs">
                      선택됨 ✨
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-600 font-semibold truncate w-full mt-0.5 inline-flex items-center justify-center gap-1">
                      <RewardMiniIcon iconType={av.reward.iconType} emoji={av.reward.emoji} className="w-2.5 h-2.5" />
                      <span className="truncate">{av.reward.name.split(' ')[0]}</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Avatar Spotlight Showcase Card */}
          <div className="mt-3.5 bg-linear-to-r from-amber-100/90 via-yellow-50 to-orange-100/90 border-2 border-amber-300 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md">
                <SmartImage
                  src={currentAvatar.image3d}
                  alt={currentAvatar.name}
                  fallbackSrcs={AVATAR_PUBLIC_FALLBACKS[selectedAvatarId]}
                  className="w-full h-full rounded-2xl"
                  imgClassName="w-full h-full object-cover"
                  fallbackComponent={
                    <div className={`w-full h-full flex items-center justify-center bg-linear-to-b ${currentAvatar.bgGradient}`}>
                      <span className="text-2xl">{currentAvatar.emoji}</span>
                    </div>
                  }
                />
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-title text-sm sm:text-base font-black text-amber-950">
                    {currentAvatar.name}
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
                    {currentAvatar.title}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">
                  {currentAvatar.personality || currentAvatar.tagline}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900 mt-1 flex-wrap">
                  <Gift className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>클리어 보상:</span>
                  <span className="inline-flex items-center gap-1 bg-amber-200/80 px-2 py-0.5 rounded-lg text-slate-900 font-black shadow-xs">
                    <RewardMiniIcon iconType={currentAvatar.reward.iconType} emoji={currentAvatar.reward.emoji} className="w-3.5 h-3.5" />
                    <span>{currentAvatar.reward.name}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-white/90 px-3 py-1.5 rounded-xl border border-amber-200 shadow-xs shrink-0">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span className="text-xs font-black text-amber-950">{currentAvatar.emoji} 준비 완료!</span>
            </div>
          </div>
        </div>

        {/* 2. Game Mode Selection (단어 팩 선택: 2개 이상의 뜻을 가진 단어 포함!) */}
        <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border-2 border-amber-300 shadow-md mb-3">
          <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span>🎯</span>
              <span>학습 모드 선택</span>
            </span>
            <span className="text-purple-700 font-black">🌟 다의어(2가지 뜻) 완벽 지원!</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              id="btn-mode-mix"
              onClick={() => handleModeClick('mix')}
              className={`p-2.5 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                selectedMode === 'mix'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md font-black translate-y-[-2px]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
              }`}
            >
              <div className="font-title text-sm">💥 모험 믹스</div>
              <div className="text-[10px] opacity-90 font-medium">기본 + 다의어 균형</div>
            </button>

            <button
              type="button"
              id="btn-mode-polysemy"
              onClick={() => handleModeClick('polysemy')}
              className={`p-2.5 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                selectedMode === 'polysemy'
                  ? 'bg-purple-600 text-white border-purple-700 shadow-md font-black translate-y-[-2px]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50'
              }`}
            >
              <div className="font-title text-sm">🌟 2가지 뜻 스페셜</div>
              <div className="text-[10px] opacity-90 font-medium">다의어 집중 마스터</div>
            </button>

            <button
              type="button"
              id="btn-mode-standard"
              onClick={() => handleModeClick('standard10')}
              className={`p-2.5 rounded-xl text-xs font-bold border-2 transition-all text-center ${
                selectedMode === 'standard10'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md font-black translate-y-[-2px]'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
              }`}
            >
              <div className="font-title text-sm">⭐️ 필수 기초 단어</div>
              <div className="text-[10px] opacity-90 font-medium">초등 1~2학년 기본</div>
            </button>
          </div>
        </div>

        {/* 3. Big Tactile 3D Start Button (게임 시작) */}
        <button
          type="button"
          id="btn-start-game-main"
          onClick={() => {
            playClickSound();
            onStartGame();
          }}
          className="w-full max-w-md py-4 sm:py-4.5 px-6 sm:px-8 rounded-3xl bg-linear-to-r from-rose-500 via-amber-500 to-orange-500 hover:from-rose-600 hover:via-amber-600 hover:to-orange-600 text-white font-title text-2xl sm:text-3xl font-black shadow-[0_6px_0_#9a3412] hover:shadow-[0_4px_0_#9a3412] active:translate-y-1 active:shadow-[0_2px_0_#9a3412] transition-all transform border-3 border-yellow-300 flex items-center justify-center gap-3"
        >
          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
          <span>STAGE {level} 모험 출발! ⚔️</span>
        </button>

      </main>

      {/* Bottom info */}
      <footer className="relative z-10 w-full max-w-4xl text-center text-xs font-bold text-amber-950/80 mt-2">
        초등학교 저학년을 위한 프리미엄 3D 캐릭터 100단계 영어 모험
      </footer>

      {/* Google Sheets CRUD & Apps Script Modal */}
      <GoogleSheetsModal
        isOpen={showSheetsModal}
        onClose={() => setShowSheetsModal(false)}
        onNameChange={newName => setStudentNameState(newName)}
      />

    </div>
  );
};
