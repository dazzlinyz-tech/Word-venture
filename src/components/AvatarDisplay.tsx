import React, { useState } from 'react';
import { AvatarId } from '../types';
import { AVATARS } from '../data/avatars';
import { Sparkles, Star } from 'lucide-react';

interface AvatarDisplayProps {
  avatarId: AvatarId;
  state: 'trapped' | 'danger' | 'cheering' | 'rescued' | 'idle' | 'failed' | 'crying';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showSpeechBubble?: boolean;
  customSpeechText?: string;
  isLocked?: boolean;
  className?: string;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  avatarId,
  state,
  size = 'md',
  showSpeechBubble = true,
  customSpeechText,
  isLocked = false,
  className = ''
}) => {
  const avatar = AVATARS[avatarId] || AVATARS.leo;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Size mapping for the 3D figurine box
  const sizeConfig = {
    sm: {
      box: 'w-16 h-16 sm:w-20 sm:h-20',
      img: 'w-14 h-14 sm:w-16 sm:h-16',
      shadow: 'w-12 h-2.5',
      bubble: 'text-[11px] px-2 py-0.5'
    },
    md: {
      box: 'w-24 h-24 sm:w-28 sm:h-28',
      img: 'w-20 h-20 sm:w-24 sm:h-24',
      shadow: 'w-16 h-3',
      bubble: 'text-xs px-2.5 py-1'
    },
    lg: {
      box: 'w-32 h-32 sm:w-36 sm:h-36',
      img: 'w-28 h-28 sm:w-32 sm:h-32',
      shadow: 'w-24 h-3.5',
      bubble: 'text-xs sm:text-sm px-3 py-1.5'
    },
    xl: {
      box: 'w-40 h-40 sm:w-48 sm:h-48',
      img: 'w-36 h-36 sm:w-44 sm:h-44',
      shadow: 'w-32 h-4',
      bubble: 'text-sm sm:text-base px-4 py-2'
    },
    hero: {
      box: 'w-48 h-48 sm:w-56 sm:h-56',
      img: 'w-44 h-44 sm:w-52 sm:h-52',
      shadow: 'w-40 h-5',
      bubble: 'text-base sm:text-lg px-5 py-2.5'
    }
  };

  const currentSize = sizeConfig[size];

  const bubbleText = customSpeechText || (
    isLocked ? `Lv.${avatar.unlockLevel ?? avatar.requiredLevel}에 만나요!` :
    state === 'crying' ? '흑흑... 아쉬워! 💧' :
    state === 'trapped' ? '영단어 몬스터를 물리쳐줘! ⚔️' :
    state === 'danger' ? '조심해! 몬스터가 다가오고 있어! ⚠️' :
    state === 'cheering' ? '나이스! 정답이야, 최고! 🌟' :
    state === 'rescued' ? '모험 대성공! 넌 최고의 마스터야! 👑' :
    state === 'failed' ? '괜찮아! 다시 도전해보자! 💪' :
    '모험 출발 준비 완료! ✨'
  );

  // Dynamic animation classes based on state
  const animationClass = isLocked
    ? 'opacity-85'
    : state === 'crying'
    ? 'animate-sob'
    : state === 'danger'
    ? 'animate-shake'
    : state === 'cheering'
    ? 'animate-joy-jump'
    : state === 'rescued'
    ? 'animate-joy-jump'
    : state === 'failed'
    ? 'animate-sob'
    : 'animate-breathe';

  return (
    <div 
      className={`relative flex flex-col items-center select-none ${className}`}
      id={`avatar-display-${avatarId}`}
    >
      {/* Adventure Speech Bubble */}
      {showSpeechBubble && (
        <div 
          className={`mb-2 rounded-2xl font-black shadow-md border-2 transition-all duration-300 z-20 flex items-center gap-1.5 ${currentSize.bubble} ${
            isLocked
              ? 'bg-slate-100 text-slate-600 border-slate-300'
              : state === 'crying'
              ? 'bg-blue-50 text-blue-800 border-blue-400 ring-2 ring-blue-300 animate-bounce'
              : state === 'danger' || state === 'failed'
              ? 'bg-red-50 text-red-700 border-red-300 animate-bounce' 
              : state === 'cheering' 
              ? 'bg-amber-50 text-amber-900 border-amber-400 ring-2 ring-yellow-300 scale-105'
              : state === 'rescued'
              ? 'bg-linear-to-r from-amber-100 to-yellow-100 text-amber-950 border-amber-400 shadow-amber-300/60 ring-2 ring-amber-300 scale-105'
              : 'bg-white/95 text-slate-800 border-amber-300'
          }`}
        >
          <span>{bubbleText}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit border-r-2 border-b-2 border-inherit rotate-45" />
        </div>
      )}

      {/* Main 3D Figurine Vessel */}
      <div className={`relative ${currentSize.box} flex flex-col items-center justify-center`}>
        
        {/* Rescued / Victory Sparkling Radiant Ring */}
        {(state === 'rescued' || state === 'cheering') && (
          <div className="absolute -inset-4 bg-radial from-amber-300/40 via-yellow-200/20 to-transparent rounded-full animate-pulse -z-10 pointer-events-none" />
        )}

        {/* Floating Star Particles on Victory */}
        {state === 'rescued' && (
          <div className="absolute inset-0 pointer-events-none z-30">
            <Sparkles className="absolute -top-3 -right-2 w-6 h-6 text-amber-400 animate-spin" />
            <Star className="absolute top-2 -left-3 w-5 h-5 text-yellow-400 fill-yellow-400 animate-bounce" />
            <Sparkles className="absolute -bottom-2 right-1 w-5 h-5 text-amber-500 animate-pulse" />
          </div>
        )}

        {/* Crying Tears & Rain Drops Overlay */}
        {state === 'crying' && (
          <div className="absolute inset-0 pointer-events-none z-30 overflow-visible flex items-center justify-center">
            {/* Left Stream Tears */}
            <div className="absolute top-[32%] left-[18%] flex flex-col items-center">
              <span className="text-xl sm:text-2xl animate-tear-1 select-none drop-shadow-md">💧</span>
              <span className="text-xs select-none animate-ping text-blue-400">💦</span>
            </div>

            {/* Right Stream Tears */}
            <div className="absolute top-[32%] right-[18%] flex flex-col items-center">
              <span className="text-xl sm:text-2xl animate-tear-2 select-none drop-shadow-md">💧</span>
              <span className="text-xs select-none animate-ping [animation-delay:200ms] text-blue-400">💦</span>
            </div>
          </div>
        )}

        {/* 3D Character Figurine Card / Image */}
        <div 
          className={`relative ${currentSize.img} transition-all duration-300 flex items-center justify-center ${animationClass}`}
        >
          {/* Figurine Glow Ring behind character */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-30 blur-md -z-10"
            style={{ backgroundColor: avatar.themeColor }}
          />

          {/* 3D Kawaii Figurine Image */}
          {!imageError ? (
            <img
              src={avatar.image3d}
              alt={avatar.name}
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover rounded-2xl sm:rounded-3xl shadow-lg border-2 border-white/80 transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-80 scale-95'
              } ${isLocked ? 'grayscale-[40%] contrast-90' : ''}`}
            />
          ) : (
            /* Styled CSS Fallback Container if image fails */
            <div 
              className={`w-full h-full rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center text-center p-2 shadow-inner border-2 border-white bg-linear-to-b ${avatar.bgGradient}`}
            >
              <span className="text-3xl sm:text-4xl drop-shadow-md">{avatar.emoji}</span>
              <span className="text-[10px] font-black text-white mt-1 drop-shadow-xs truncate max-w-full">
                {avatar.name.split(' ')[0]}
              </span>
            </div>
          )}

          {/* Glossy highlight sheen on the figurine */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-linear-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />
        </div>

        {/* 3D Pedestal Floor Shadow */}
        <div 
          className={`${currentSize.shadow} bg-slate-900/25 rounded-full blur-[2px] mt-1.5 transition-all duration-300 ${
            state === 'cheering' || state === 'rescued'
              ? 'scale-x-75 opacity-20'
              : 'animate-pedestal-shadow'
          }`} 
        />
      </div>
    </div>
  );
};
