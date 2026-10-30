import React, { useState } from 'react';
import { BattleMonster } from '../types';
import { Volume2, Sparkles, Crown } from 'lucide-react';
import { speakWord } from '../utils/audio';
import { MONSTER_SPECIES } from '../data/monsters';

interface MonsterDisplayProps {
  monster: BattleMonster;
  onClick: () => void;
  disabled?: boolean;
  showSpeakBtn?: boolean;
}

// Compute responsive font size so long words never spill out of the plaque on small mobile screens
const getWordFontSize = (text: string) => {
  const len = text.length;
  if (len <= 4) return 'text-xs xs:text-sm sm:text-lg md:text-xl';
  if (len <= 6) return 'text-[11px] xs:text-xs sm:text-base md:text-lg';
  if (len <= 8) return 'text-[10px] xs:text-[11px] sm:text-sm md:text-base';
  return 'text-[9px] xs:text-[10px] sm:text-xs md:text-sm';
};

export const MonsterDisplay: React.FC<MonsterDisplayProps> = ({
  monster,
  onClick,
  disabled = false,
  showSpeakBtn = true
}) => {
  const { word, visualType, isDefeated, isWrong, isBoss } = monster;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get species info, fallback to slime
  const species = MONSTER_SPECIES[visualType] || MONSTER_SPECIES.slime;
  const isBossMonster = isBoss || species.tier === 'boss';

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakWord(word.word);
  };

  // Determine current active animation state
  const monsterAnimationClass = isDefeated
    ? 'animate-defeated pointer-events-none'
    : isWrong
    ? 'animate-monster-giggle'
    : isBossMonster
    ? 'animate-boss-aura'
    : 'animate-breathe';

  return (
    <div
      id={`monster-card-${monster.id}`}
      onClick={() => {
        if (!disabled && !isDefeated) {
          onClick();
        }
      }}
      className={`group relative flex flex-col items-center justify-between p-1.5 xs:p-2 sm:p-3 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 transform select-none min-w-0 max-w-full overflow-hidden ${
        isDefeated
          ? 'animate-defeated pointer-events-none'
          : isWrong
          ? 'animate-shake bg-red-100/95 border-3 sm:border-4 border-red-500 shadow-xl'
          : isBossMonster
          ? 'bg-linear-to-b from-amber-100/95 via-yellow-50/95 to-amber-200/95 hover:scale-105 active:scale-95 border-3 sm:border-4 border-amber-500 shadow-xl hover:shadow-2xl'
          : 'bg-white/95 hover:bg-amber-50/90 hover:scale-105 active:scale-95 border-2 sm:border-3 border-amber-300 hover:border-amber-500 shadow-md hover:shadow-xl'
      } ${disabled ? 'opacity-85 cursor-not-allowed' : ''}`}
    >
      {/* Boss Special Crown Header Banner */}
      {isBossMonster && (
        <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 px-2 py-0.5 rounded-full bg-linear-to-r from-amber-500 via-yellow-400 to-orange-500 text-white font-title text-[9px] xs:text-[10px] font-black shadow-md flex items-center gap-1 border border-yellow-200 animate-pulse whitespace-nowrap">
          <Crown className="w-2.5 h-2.5 text-yellow-100 fill-yellow-200" />
          <span>대보스 등장!</span>
        </div>
      )}

      {/* Element & Species Badge (Top Left) */}
      <div
        className="absolute top-1 left-1 sm:top-1.5 sm:left-1.5 z-20 px-1.5 py-0.5 rounded-lg bg-black/40 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-bold shadow-xs flex items-center gap-1 border border-white/20"
        title={species.title}
      >
        <span>{species.particleEmoji[0]}</span>
        <span className="hidden xs:inline">{species.name.split(' ')[0]}</span>
      </div>

      {/* Audio Pronunciation Speaker Button (Top Right) */}
      {showSpeakBtn && (
        <button
          type="button"
          onClick={handleSpeak}
          id={`btn-speak-${word.id}`}
          className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 z-20 p-1 sm:p-1.5 rounded-full bg-amber-100/90 hover:bg-amber-200 text-amber-900 border border-amber-300 shadow-xs active:scale-90 transition-transform"
          title="발음 듣기"
        >
          <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      )}

      {/* Polysemy Star Badge if multi-meaning word */}
      {word.isPolysemy && (
        <div
          className="absolute top-6 left-1 sm:top-7 sm:left-1.5 z-20 px-1.5 py-0.5 rounded-full bg-linear-to-r from-purple-600 to-pink-500 text-white text-[8px] sm:text-[9px] font-black shadow-xs animate-pulse"
          title="2가지 뜻을 가진 특별 단어!"
        >
          2뜻!
        </div>
      )}

      {/* Ambient Floating Element Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <span
          className="absolute top-3 right-4 text-xs select-none opacity-70 animate-element-mote"
          style={{ animationDelay: '0s' }}
        >
          {species.particleEmoji[1] || '✨'}
        </span>
        <span
          className="absolute bottom-12 left-2 text-[10px] select-none opacity-60 animate-element-mote"
          style={{ animationDelay: '1.1s' }}
        >
          {species.particleEmoji[0]}
        </span>
      </div>

      {/* 3D Monster Figurine Stage */}
      <div className="relative w-full flex flex-col items-center justify-center pt-5 sm:pt-6 pb-1">
        
        {/* Soft Ambient Radial Backlight in Elemental Color */}
        <div
          className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full blur-xl pointer-events-none -z-10 opacity-60 transition-opacity"
          style={{ backgroundColor: species.themeColor }}
        />

        {/* 3D Figurine Frame & Graphic */}
        <div
          className={`relative w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 transition-transform duration-300 flex items-center justify-center ${monsterAnimationClass}`}
        >
          {/* Main 3D Figurine Image */}
          {!imageError ? (
            <img
              src={species.image3d}
              alt={species.name}
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-contain filter drop-shadow-md transition-all duration-300 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
              } ${isDefeated ? 'brightness-150 rotate-12 scale-75' : ''} ${
                isWrong ? 'brightness-110 saturate-150' : ''
              }`}
            />
          ) : (
            /* Pristine High-Detail Vector Creature Fallback */
            <div
              className={`w-full h-full rounded-2xl flex flex-col items-center justify-center p-2 bg-linear-to-b ${species.bgGradient} border-2 border-white shadow-inner`}
            >
              <span className="text-3xl sm:text-4xl drop-shadow-md">{species.particleEmoji[0]}</span>
              <span className="text-[10px] font-black text-slate-800 mt-1 truncate max-w-full">
                {species.name}
              </span>
            </div>
          )}

          {/* Interactive Emotion Overlays */}
          {/* Wrong Answer: Cheeky giggling face overlay (ㅋ_ㅋ 😝) */}
          {isWrong && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-500/20 backdrop-blur-[0.5px] rounded-2xl pointer-events-none z-20">
              <span className="text-2xl sm:text-3xl animate-bounce drop-shadow-md select-none">😝</span>
              <span className="text-[10px] sm:text-xs font-black text-red-700 bg-white/90 px-1.5 py-0.5 rounded-full shadow-xs mt-0.5">
                헤헤! 틀렸지롱~
              </span>
            </div>
          )}

          {/* Defeated: X_X eyes & dizzy stars overlay */}
          {isDefeated && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl pointer-events-none z-20">
              <span className="text-2xl sm:text-3xl animate-spin drop-shadow-md select-none">💫</span>
              <span className="text-xs sm:text-sm font-black text-amber-900 bg-white/90 px-2 py-0.5 rounded-full shadow-md mt-1">
                정화 완료! ✨
              </span>
            </div>
          )}

          {/* Specular sheen highlight across 3D figurine */}
          <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
        </div>

        {/* Soft Organic Elliptical Ground Shadow beneath feet */}
        <div
          className={`w-16 sm:w-24 h-2 sm:h-2.5 bg-slate-900/25 rounded-full blur-[2px] mt-1 transition-all duration-300 ${
            isDefeated
              ? 'scale-0 opacity-0'
              : isWrong
              ? 'scale-110 opacity-40'
              : 'animate-pedestal-shadow'
          }`}
        />
      </div>

      {/* Monster English Word Plaque / Attack Target */}
      <div className="w-full mt-1 sm:mt-1.5 flex flex-col items-center min-w-0 max-w-full z-20">
        <div
          className={`w-full border-2 rounded-xl sm:rounded-2xl px-1 py-1 sm:px-2.5 sm:py-1.5 shadow-sm flex items-center justify-center min-w-0 max-w-full overflow-hidden transition-colors ${
            isBossMonster
              ? 'bg-linear-to-r from-amber-200 via-yellow-100 to-amber-200 border-amber-500 shadow-md'
              : 'bg-linear-to-r from-amber-50 via-yellow-100 to-amber-50 border-amber-400 group-hover:border-amber-500'
          }`}
        >
          <span
            title={word.word}
            className={`font-game font-black tracking-tight text-slate-800 text-center w-full min-w-0 break-words [overflow-wrap:anywhere] leading-tight ${getWordFontSize(
              word.word
            )}`}
          >
            {word.word}
          </span>
        </div>

        {/* Attack hint / tap guide */}
        <div className="mt-1 flex items-center justify-center gap-1 text-[9px] xs:text-[10px] sm:text-[11px] font-extrabold text-amber-900 opacity-90 group-hover:opacity-100 text-center leading-tight truncate w-full">
          {isBossMonster ? (
            <span className="text-orange-700 flex items-center gap-0.5">
              <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
              <span>대보스 격파 도전!</span>
            </span>
          ) : (
            <span>
              <span className="hidden sm:inline">💥 터치해서 물리치기!</span>
              <span className="sm:hidden">💥 터치 공격!</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
