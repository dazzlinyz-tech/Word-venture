import React from 'react';
import { AvatarId } from '../types';
import { AVATARS } from '../data/avatars';

interface AvatarDisplayProps {
  avatarId: AvatarId;
  state: 'trapped' | 'danger' | 'cheering' | 'rescued' | 'idle' | 'failed' | 'crying';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSpeechBubble?: boolean;
  customSpeechText?: string;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  avatarId,
  state,
  size = 'md',
  showSpeechBubble = true,
  customSpeechText
}) => {
  const avatar = AVATARS[avatarId] || AVATARS.leo;

  // Size configurations
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44'
  };

  const bubbleText = customSpeechText || (
    state === 'crying' ? '흑흑... 아쉬워! 💧' :
    state === 'trapped' ? '영단어 몬스터를 물리쳐줘! ⚔️' :
    state === 'danger' ? '조심해! 몬스터가 다가오고 있어! ⚠️' :
    state === 'cheering' ? '나이스! 정말 멋져, 계속 가자! 🌟' :
    state === 'rescued' ? '모험 대성공! 넌 최고의 영웅이야! 🎉' :
    state === 'failed' ? '앗, 시간이 부족했어! 다시 힘내보자! 💪' :
    '모험 출발 준비 완료! ✨'
  );

  return (
    <div className="relative flex flex-col items-center select-none" id={`avatar-display-${avatarId}`}>
      {/* Adventure Speech Bubble */}
      {showSpeechBubble && (
        <div 
          className={`mb-2 px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md border-2 transition-all duration-300 z-20 ${
            state === 'crying'
              ? 'bg-blue-50 text-blue-800 border-blue-400 scale-105 ring-2 ring-blue-300 animate-bounce'
              : state === 'danger' || state === 'failed'
              ? 'bg-red-50 text-red-600 border-red-300 animate-bounce' 
              : state === 'cheering' 
              ? 'bg-amber-50 text-amber-800 border-amber-300 scale-105 ring-2 ring-yellow-300'
              : state === 'rescued'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 scale-110 font-black'
              : 'bg-white text-slate-800 border-amber-200 animate-pulse'
          }`}
        >
          {bubbleText}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit border-r-2 border-b-2 border-inherit rotate-45" />
        </div>
      )}

      {/* Avatar Container (NO CAGE - purely lively cheering adventure partner!) */}
      <div className={`relative ${sizeMap[size]} flex items-center justify-center`}>
        
        {/* Rescued / Victory Sparkling Glow Aura */}
        {(state === 'rescued' || state === 'cheering') && (
          <div className="absolute -inset-3 bg-radial from-amber-300/60 via-yellow-200/30 to-transparent rounded-full animate-spin duration-1000 -z-10" />
        )}

        {/* Animated Tears & Frustrated Splash Overlay on wrong answer */}
        {state === 'crying' && (
          <div className="absolute inset-0 pointer-events-none z-30 overflow-visible flex items-center justify-center">
            {/* Left Stream Tears */}
            <div className="absolute top-[28%] left-[20%] flex flex-col items-center">
              <span className="text-xl sm:text-2xl animate-tear-1 select-none drop-shadow-md">💧</span>
              <span className="text-xs select-none animate-ping text-blue-400">💦</span>
            </div>

            {/* Right Stream Tears */}
            <div className="absolute top-[28%] right-[20%] flex flex-col items-center">
              <span className="text-xl sm:text-2xl animate-tear-2 select-none drop-shadow-md">💧</span>
              <span className="text-xs select-none animate-ping [animation-delay:200ms] text-blue-400">💦</span>
            </div>

            {/* Frustration sweat / tear splashes on head */}
            <div className="absolute -top-1.5 right-1 animate-bounce select-none">
              <span className="text-base sm:text-lg">💦</span>
            </div>
            <div className="absolute -top-1.5 left-1 animate-bounce select-none [animation-delay:150ms]">
              <span className="text-base sm:text-lg">💧</span>
            </div>

            {/* Crying subtitle badge */}
            <div className="absolute -bottom-2 bg-blue-600/90 text-white font-title text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full shadow-md animate-pulse">
              흑흑... 😢
            </div>
          </div>
        )}

        {/* The Avatar Character SVG/Graphics */}
        <div 
          className={`w-full h-full rounded-3xl p-2.5 flex items-center justify-center transition-transform duration-300 shadow-lg ${
            state === 'crying' ? 'animate-sob bg-blue-50/95 border-2 border-blue-400 shadow-blue-200' :
            state === 'danger' || state === 'failed' ? 'animate-shake bg-red-100/90 border-2 border-red-300' :
            state === 'cheering' ? 'animate-bounce bg-amber-100/90 border-2 border-yellow-400 ring-2 ring-yellow-300/50' :
            state === 'rescued' ? 'scale-110 bg-linear-to-tr from-yellow-200 to-amber-100 shadow-amber-300/50 ring-4 ring-amber-400' :
            'animate-float bg-white/95 border-2 border-amber-200'
          }`}
        >
          {avatarId === 'leo' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="leoManeGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </radialGradient>
                <radialGradient id="leoFaceGrad" cx="45%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#FEF3C7" />
                  <stop offset="100%" stopColor="#FDE68A" />
                </radialGradient>
              </defs>

              {/* Fluffy Round Lion Mane Petals (Fluffy cloud feel) */}
              <circle cx="50" cy="50" r="44" fill="#F59E0B" opacity="0.95" />
              {/* Mane rounded puffs */}
              <circle cx="20" cy="28" r="14" fill="#D97706" />
              <circle cx="80" cy="28" r="14" fill="#D97706" />
              <circle cx="14" cy="50" r="13" fill="#D97706" />
              <circle cx="86" cy="50" r="13" fill="#D97706" />
              <circle cx="22" cy="72" r="13" fill="#D97706" />
              <circle cx="78" cy="72" r="13" fill="#D97706" />
              <circle cx="50" cy="14" r="13" fill="#D97706" />
              <circle cx="50" cy="85" r="12" fill="#D97706" />

              {/* Lion Round Chubby Face */}
              <circle cx="50" cy="52" r="33" fill="url(#leoFaceGrad)" />

              {/* Cute Round Ears */}
              <circle cx="26" cy="28" r="9" fill="#F59E0B" />
              <circle cx="74" cy="28" r="9" fill="#F59E0B" />
              <circle cx="26" cy="28" r="5" fill="#FDA4AF" />
              <circle cx="74" cy="28" r="5" fill="#FDA4AF" />

              {/* Rosy Cheeks (볼터치) */}
              <ellipse cx="32" cy="61" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.65" />
              <ellipse cx="68" cy="61" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.65" />
              {/* Cute cheek sparkles */}
              <circle cx="30" cy="60" r="1" fill="#FFFFFF" />
              <circle cx="70" cy="60" r="1" fill="#FFFFFF" />

              {/* Eyes based on state */}
              {state === 'rescued' || state === 'cheering' ? (
                // Happy curved eyes (^_^) with cute eyelashes
                <>
                  <path d="M 31 48 Q 39 38 47 48" stroke="#1F2937" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  <path d="M 53 48 Q 61 38 69 48" stroke="#1F2937" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  {/* Cheerful star spark */}
                  <polygon points="50,42 51.5,45 54,45 52,47 53,50 50,48 47,50 48,47 46,45 48.5,45" fill="#F59E0B" />
                </>
              ) : state === 'danger' || state === 'trapped' ? (
                // Teary worried anime puppy eyes (T_T)
                <>
                  <ellipse cx="38" cy="48" rx="6.5" ry="7.5" fill="#1F2937" />
                  <ellipse cx="62" cy="48" rx="6.5" ry="7.5" fill="#1F2937" />
                  {/* Huge anime light reflections */}
                  <circle cx="36" cy="45" r="3" fill="#FFFFFF" />
                  <circle cx="60" cy="45" r="3" fill="#FFFFFF" />
                  <circle cx="41" cy="51" r="1.5" fill="#FFFFFF" />
                  <circle cx="65" cy="51" r="1.5" fill="#FFFFFF" />
                  {/* Wobbly worried eyebrows */}
                  <path d="M 31 38 Q 38 43 44 40" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M 56 40 Q 62 43 69 38" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  {/* Cute tear drops */}
                  <path d="M 33 55 Q 30 62 35 64 Q 40 62 38 55 Z" fill="#60A5FA" />
                  <circle cx="35" cy="59" r="1" fill="#FFFFFF" />
                </>
              ) : (
                // Big sparkling anime lion eyes (초롱초롱한 눈망울)
                <>
                  <ellipse cx="38" cy="48" rx="6.5" ry="7.5" fill="#1F2937" />
                  <ellipse cx="62" cy="48" rx="6.5" ry="7.5" fill="#1F2937" />
                  {/* Iris color gradient hint */}
                  <ellipse cx="38" cy="50" rx="5" ry="4.5" fill="#92400E" opacity="0.7" />
                  <ellipse cx="62" cy="50" rx="5" ry="4.5" fill="#92400E" opacity="0.7" />
                  {/* Big primary sparkle */}
                  <circle cx="36" cy="45" r="2.8" fill="#FFFFFF" />
                  <circle cx="60" cy="45" r="2.8" fill="#FFFFFF" />
                  {/* Secondary sparkle */}
                  <circle cx="41" cy="51" r="1.5" fill="#FFFFFF" />
                  <circle cx="65" cy="51" r="1.5" fill="#FFFFFF" />
                  {/* Cute little highlight dot */}
                  <circle cx="35" cy="51" r="0.9" fill="#FFFFFF" />
                  <circle cx="59" cy="51" r="0.9" fill="#FFFFFF" />
                  {/* Gentle eyebrows */}
                  <path d="M 33 39 Q 39 36 44 39" stroke="#92400E" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M 56 39 Q 61 36 67 39" stroke="#92400E" strokeWidth="2" strokeLinecap="round" fill="none" />
                </>
              )}

              {/* Cute Heart-shaped Little Nose */}
              <path d="M 50 56 C 48 53 45 54 45 56 C 45 58 50 61 50 61 C 50 61 55 58 55 56 C 55 54 52 53 50 56 Z" fill="#B45309" />

              {/* Cat/Lion W-shaped cute mouth (:3) */}
              {state === 'rescued' || state === 'cheering' ? (
                // Open smiling happy mouth
                <g>
                  <path d="M 43 62 Q 50 72 57 62 Z" fill="#F43F5E" />
                  <path d="M 45 66 Q 50 69 55 66" fill="#FDA4AF" />
                  <path d="M 43 62 Q 50 72 57 62" stroke="#92400E" strokeWidth="2" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                // Cute cat mouth line :3
                <path d="M 44 62 Q 47 65 50 62 Q 53 65 56 62" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              )}

              {/* Little Knight Crown / Crest (황금 기사 왕관) */}
              <polygon points="50,11 43,21 57,21" fill="#F59E0B" />
              <polygon points="50,11 41,20 46,20 50,13 54,20 59,20" fill="#FDE047" />
              <circle cx="50" cy="11" r="2.5" fill="#EF4444" />
              <rect x="41" y="20" width="18" height="5" rx="2" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
              <circle cx="50" cy="22.5" r="1.5" fill="#3B82F6" />
            </svg>
          )}

          {avatarId === 'mina' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="minaSkinGrad" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#FFF1F2" />
                  <stop offset="100%" stopColor="#FED7AA" />
                </radialGradient>
              </defs>

              {/* Mina Bouncy Twintails / Pigtails with ribbons */}
              <circle cx="16" cy="52" r="15" fill="#92400E" />
              <circle cx="84" cy="52" r="15" fill="#92400E" />
              <circle cx="14" cy="62" r="11" fill="#92400E" />
              <circle cx="86" cy="62" r="11" fill="#92400E" />
              {/* Pink Ribbon Bows */}
              <ellipse cx="22" cy="44" rx="5" ry="3.5" fill="#F43F5E" transform="rotate(-20 22 44)" />
              <ellipse cx="78" cy="44" rx="5" ry="3.5" fill="#F43F5E" transform="rotate(20 78 44)" />
              <circle cx="22" cy="44" r="2" fill="#FEE2E2" />
              <circle cx="78" cy="44" r="2" fill="#FEE2E2" />

              {/* Round Chubby Face */}
              <circle cx="50" cy="54" r="30" fill="url(#minaSkinGrad)" />

              {/* Cute Explorer Hat with Safari Leaf Badge */}
              <path d="M 20 36 Q 50 14 80 36" fill="#D97706" />
              <ellipse cx="50" cy="36" rx="34" ry="7" fill="#F59E0B" />
              {/* Hat band & gold star pin */}
              <path d="M 27 34 Q 50 24 73 34" stroke="#92400E" strokeWidth="3" fill="none" />
              <circle cx="50" cy="27" r="4.5" fill="#10B981" />
              <polygon points="50,24 51,26.5 54,26.5 51.5,28 52.5,30.5 50,29 47.5,30.5 48.5,28 46,26.5 49,26.5" fill="#FEF08A" />

              {/* Soft Baby Bangs (앞머리) */}
              <path d="M 30 36 Q 40 45 48 37 Q 56 45 70 36" fill="#92400E" />

              {/* Peach Pink Rosy Cheeks with Heart Highlights (발그레한 볼) */}
              <ellipse cx="32" cy="62" rx="6" ry="4" fill="#FDA4AF" opacity="0.8" />
              <ellipse cx="68" cy="62" rx="6" ry="4" fill="#FDA4AF" opacity="0.8" />
              <path d="M 31 61 C 30 59.5 28 60 28 61 C 28 62 31 63.5 31 63.5 C 31 63.5 34 62 34 61 C 34 60 32 59.5 31 61 Z" fill="#FFFFFF" />
              <path d="M 69 61 C 68 59.5 66 60 66 61 C 66 62 69 63.5 69 63.5 C 69 63.5 72 62 72 61 C 72 60 70 59.5 69 61 Z" fill="#FFFFFF" />

              {/* Eyes */}
              {state === 'rescued' || state === 'cheering' ? (
                // Happy twinkling anime curved smile eyes
                <>
                  <path d="M 33 50 Q 41 40 49 50" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 51 50 Q 59 40 67 50" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" fill="none" />
                  {/* Little lashes */}
                  <path d="M 47 44 L 50 41" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 65 44 L 68 41" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
                </>
              ) : state === 'danger' || state === 'trapped' ? (
                // Teary rescue-me eyes with tear drops
                <>
                  <ellipse cx="40" cy="50" rx="6.5" ry="7.5" fill="#1F2937" />
                  <ellipse cx="60" cy="50" rx="6.5" ry="7.5" fill="#1F2937" />
                  <circle cx="38" cy="47" r="2.8" fill="#FFFFFF" />
                  <circle cx="58" cy="47" r="2.8" fill="#FFFFFF" />
                  <circle cx="42" cy="53" r="1.5" fill="#FFFFFF" />
                  <circle cx="62" cy="53" r="1.5" fill="#FFFFFF" />
                  <path d="M 34 58 Q 32 65 37 67 Q 42 65 40 58 Z" fill="#60A5FA" />
                  <circle cx="37" cy="62" r="1.2" fill="#FFFFFF" />
                </>
              ) : (
                // Giant sparkling anime girl eyes (초롱초롱 큰 눈)
                <>
                  <ellipse cx="40" cy="50" rx="6.5" ry="7.5" fill="#1F2937" />
                  <ellipse cx="60" cy="50" rx="6.5" ry="7.5" fill="#1F2937" />
                  {/* Warm amber iris reflection */}
                  <ellipse cx="40" cy="52" rx="5" ry="4.5" fill="#B45309" opacity="0.6" />
                  <ellipse cx="60" cy="52" rx="5" ry="4.5" fill="#B45309" opacity="0.6" />
                  {/* Big white main sparkle */}
                  <circle cx="38" cy="47" r="2.8" fill="#FFFFFF" />
                  <circle cx="58" cy="47" r="2.8" fill="#FFFFFF" />
                  {/* Second lower sparkle */}
                  <circle cx="43" cy="53" r="1.6" fill="#FFFFFF" />
                  <circle cx="63" cy="53" r="1.6" fill="#FFFFFF" />
                  {/* Eyelash flicks */}
                  <path d="M 45 45 L 48 43" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 65 45 L 68 43" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Cute Eyebrows */}
                  <path d="M 34 40 Q 40 37 46 40" stroke="#92400E" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M 54 40 Q 60 37 66 40" stroke="#92400E" strokeWidth="2" strokeLinecap="round" fill="none" />
                </>
              )}

              {/* Tiny cute nose */}
              <circle cx="50" cy="57" r="1.2" fill="#F97316" />

              {/* Happy Open Smile */}
              {state === 'rescued' || state === 'cheering' ? (
                <g>
                  <path d="M 44 63 Q 50 73 56 63 Z" fill="#E11D48" />
                  <path d="M 46 68 Q 50 71 54 68" fill="#FDA4AF" />
                  <path d="M 44 63 Q 50 73 56 63" stroke="#881337" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                <path d="M 46 64 Q 50 68 54 64" stroke="#881337" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              )}
            </svg>
          )}

          {avatarId === 'tori' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="toriSkinGrad" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#FAF5FF" />
                  <stop offset="100%" stopColor="#EDE9FE" />
                </radialGradient>
                <linearGradient id="toriHatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#6D28D9" />
                </linearGradient>
              </defs>

              {/* Tori Star Mage Fairy Ears (Elven/Fairy Pointy Ears) */}
              <path d="M 22 52 Q 10 46 16 58 Z" fill="#DDD6FE" />
              <path d="M 78 52 Q 90 46 84 58 Z" fill="#DDD6FE" />
              <path d="M 22 53 Q 13 49 18 56 Z" fill="#F472B6" opacity="0.6" />
              <path d="M 78 53 Q 87 49 82 56 Z" fill="#F472B6" opacity="0.6" />

              {/* Round Cute Head */}
              <circle cx="50" cy="55" r="29" fill="url(#toriSkinGrad)" />

              {/* Lavender Cute Hair Bangs */}
              <circle cx="28" cy="46" r="8" fill="#C4B5FD" />
              <circle cx="72" cy="46" r="8" fill="#C4B5FD" />
              <path d="M 32 38 Q 42 46 50 40 Q 58 46 68 38" fill="#C4B5FD" />

              {/* Star Wizard Cone Hat with Floating Bobble */}
              <polygon points="50,4 22,37 78,37" fill="url(#toriHatGrad)" />
              <ellipse cx="50" cy="37" rx="34" ry="7" fill="#5B21B6" />
              {/* Gold Hat Ribbon */}
              <path d="M 28 35 Q 50 27 72 35" stroke="#FDE047" strokeWidth="2.5" fill="none" />
              {/* Big Sparkling Magic Star on Hat */}
              <polygon points="50,12 52.5,17 58,17 53.5,21 55.5,26 50,23 44.5,26 46.5,21 42,17 47.5,17" fill="#FDE047" />
              <circle cx="50" cy="19" r="1.5" fill="#FFFFFF" />

              {/* Lavender-Pink Cheeks with Tiny Star Stardust */}
              <circle cx="34" cy="63" r="5" fill="#E879F9" opacity="0.6" />
              <circle cx="66" cy="63" r="5" fill="#E879F9" opacity="0.6" />
              <polygon points="34,61 34.5,62.5 36,62.5 34.8,63.5 35.2,65 34,64 32.8,65 33.2,63.5 32,62.5 33.5,62.5" fill="#FFFFFF" />
              <polygon points="66,61 66.5,62.5 68,62.5 66.8,63.5 67.2,65 66,64 64.8,65 65.2,63.5 64,62.5 65.5,62.5" fill="#FFFFFF" />

              {/* Eyes */}
              {state === 'rescued' || state === 'cheering' ? (
                // Magical ecstatic smile eyes (^_^)
                <>
                  <path d="M 35 52 Q 42 42 49 52" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 51 52 Q 58 42 65 52" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" fill="none" />
                  {/* Magic sparkles above eyes */}
                  <circle cx="42" cy="42" r="1.5" fill="#F472B6" />
                  <circle cx="58" cy="42" r="1.5" fill="#F472B6" />
                </>
              ) : state === 'danger' || state === 'trapped' ? (
                // Worried magical fairy eyes with water droplets
                <>
                  <ellipse cx="42" cy="52" rx="6.5" ry="7.5" fill="#3B0764" />
                  <ellipse cx="58" cy="52" rx="6.5" ry="7.5" fill="#3B0764" />
                  <circle cx="40" cy="49" r="2.8" fill="#FFFFFF" />
                  <circle cx="56" cy="49" r="2.8" fill="#FFFFFF" />
                  <circle cx="44" cy="55" r="1.5" fill="#FFFFFF" />
                  <circle cx="60" cy="55" r="1.5" fill="#FFFFFF" />
                  <path d="M 36 60 Q 34 66 38 68 Q 42 66 40 60 Z" fill="#93C5FD" />
                </>
              ) : (
                // Mystical sparkling anime fairy eyes with violet galaxy depth
                <>
                  <ellipse cx="42" cy="52" rx="6.5" ry="7.5" fill="#3B0764" />
                  <ellipse cx="58" cy="52" rx="6.5" ry="7.5" fill="#3B0764" />
                  {/* Violet iris gradient */}
                  <ellipse cx="42" cy="54" rx="5" ry="4.5" fill="#7C3AED" opacity="0.75" />
                  <ellipse cx="58" cy="54" rx="5" ry="4.5" fill="#7C3AED" opacity="0.75" />
                  {/* Big main sparkling light reflection */}
                  <circle cx="40" cy="49" r="2.8" fill="#FFFFFF" />
                  <circle cx="56" cy="49" r="2.8" fill="#FFFFFF" />
                  {/* Secondary star twinkle */}
                  <circle cx="45" cy="55" r="1.6" fill="#FFFFFF" />
                  <circle cx="61" cy="55" r="1.6" fill="#FFFFFF" />
                  {/* Cute Eyebrows */}
                  <path d="M 36 43 Q 42 40 47 43" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M 53 43 Q 58 40 64 43" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" fill="none" />
                </>
              )}

              {/* Tiny button fairy nose */}
              <circle cx="50" cy="58" r="1" fill="#8B5CF6" />

              {/* Sweet smile mouth */}
              {state === 'rescued' || state === 'cheering' ? (
                <g>
                  <path d="M 45 64 Q 50 73 55 64 Z" fill="#EC4899" />
                  <path d="M 47 68 Q 50 71 53 68" fill="#FBCFE8" />
                  <path d="M 45 64 Q 50 73 55 64" stroke="#831843" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                <path d="M 46 64 Q 50 68 54 64" stroke="#6D28D9" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              )}
            </svg>
          )}

          {avatarId === 'pupu' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="pupuBodyGrad" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#F87171" />
                  <stop offset="100%" stopColor="#DC2626" />
                </radialGradient>
              </defs>

              {/* Baby Dragon Wings */}
              <path d="M 16 38 Q 4 45 10 58 Q 20 54 22 46 Z" fill="#FBBF24" />
              <path d="M 84 38 Q 96 45 90 58 Q 80 54 78 46 Z" fill="#FBBF24" />

              {/* Golden Dragon Horns */}
              <polygon points="26,14 34,30 20,28" fill="#FBBF24" />
              <polygon points="74,14 66,30 80,28" fill="#FBBF24" />

              {/* Chubby Dragon Head */}
              <circle cx="50" cy="54" r="32" fill="url(#pupuBodyGrad)" />

              {/* Rosy Dragon Cheeks */}
              <ellipse cx="30" cy="62" rx="6" ry="4" fill="#FEF08A" opacity="0.8" />
              <ellipse cx="70" cy="62" rx="6" ry="4" fill="#FEF08A" opacity="0.8" />

              {/* Eyes */}
              {state === 'rescued' || state === 'cheering' ? (
                <>
                  <path d="M 32 48 Q 40 38 48 48" stroke="#450A0A" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  <path d="M 52 48 Q 60 38 68 48" stroke="#450A0A" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                </>
              ) : state === 'danger' || state === 'trapped' || state === 'failed' ? (
                <>
                  <ellipse cx="40" cy="48" rx="6.5" ry="7.5" fill="#450A0A" />
                  <ellipse cx="60" cy="48" rx="6.5" ry="7.5" fill="#450A0A" />
                  <circle cx="38" cy="45" r="2.8" fill="#FFFFFF" />
                  <circle cx="58" cy="45" r="2.8" fill="#FFFFFF" />
                  <path d="M 34 56 Q 32 63 37 65 Q 42 63 40 56 Z" fill="#60A5FA" />
                </>
              ) : (
                <>
                  <ellipse cx="40" cy="48" rx="6.5" ry="7.5" fill="#450A0A" />
                  <ellipse cx="60" cy="48" rx="6.5" ry="7.5" fill="#450A0A" />
                  <ellipse cx="40" cy="50" rx="4.5" ry="4" fill="#F59E0B" opacity="0.8" />
                  <ellipse cx="60" cy="50" rx="4.5" ry="4" fill="#F59E0B" opacity="0.8" />
                  <circle cx="38" cy="45" r="2.8" fill="#FFFFFF" />
                  <circle cx="58" cy="45" r="2.8" fill="#FFFFFF" />
                  <circle cx="43" cy="51" r="1.5" fill="#FFFFFF" />
                  <circle cx="63" cy="51" r="1.5" fill="#FFFFFF" />
                </>
              )}

              {/* Dragon Snout & Cute Baby Fangs */}
              <ellipse cx="50" cy="62" rx="14" ry="9" fill="#FCA5A5" />
              <circle cx="46" cy="60" r="1.5" fill="#991B1B" />
              <circle cx="54" cy="60" r="1.5" fill="#991B1B" />

              {state === 'rescued' || state === 'cheering' ? (
                <path d="M 44 65 Q 50 74 56 65 Z" fill="#991B1B" />
              ) : (
                <path d="M 45 64 Q 50 67 55 64" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" fill="none" />
              )}
              {/* Cute little flame on top */}
              <path d="M 50 18 Q 55 24 50 28 Q 45 24 50 18 Z" fill="#FDE047" />
            </svg>
          )}

          {avatarId === 'robi' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="robiHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>

              {/* Robot Antenna with Lightning Light */}
              <rect x="48" y="10" width="4" height="14" fill="#64748B" />
              <circle cx="50" cy="10" r="5" fill="#FDE047" />
              <polygon points="50,7 52,10 50,11 51,13 48,10 50,9" fill="#EF4444" />

              {/* Side Bolt Ears */}
              <rect x="14" y="46" width="8" height="12" rx="3" fill="#94A3B8" />
              <rect x="78" y="46" width="8" height="12" rx="3" fill="#94A3B8" />

              {/* Robot Cube Head with Rounded Corners */}
              <rect x="20" y="24" width="60" height="56" rx="16" fill="url(#robiHeadGrad)" />

              {/* Screen Display Face */}
              <rect x="26" y="32" width="48" height="40" rx="10" fill="#0F172A" />

              {/* LED Cheeks */}
              <rect x="30" y="60" width="6" height="3" rx="1.5" fill="#38BDF8" opacity="0.8" />
              <rect x="64" y="60" width="6" height="3" rx="1.5" fill="#38BDF8" opacity="0.8" />

              {/* Digital Eyes */}
              {state === 'rescued' || state === 'cheering' ? (
                <>
                  <path d="M 34 48 Q 40 40 46 48" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 54 48 Q 60 40 66 48" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
                </>
              ) : state === 'danger' || state === 'trapped' || state === 'failed' ? (
                <>
                  <text x="36" y="52" fill="#F87171" fontSize="14" fontWeight="bold">X</text>
                  <text x="56" y="52" fill="#F87171" fontSize="14" fontWeight="bold">X</text>
                </>
              ) : (
                <>
                  <circle cx="40" cy="48" r="6" fill="#38BDF8" />
                  <circle cx="60" cy="48" r="6" fill="#38BDF8" />
                  <circle cx="38" cy="46" r="2" fill="#FFFFFF" />
                  <circle cx="58" cy="46" r="2" fill="#FFFFFF" />
                </>
              )}

              {/* Digital Pixel Smile */}
              {state === 'rescued' || state === 'cheering' ? (
                <path d="M 42 61 Q 50 67 58 61" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" fill="none" />
              ) : (
                <path d="M 44 62 L 56 62" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
              )}
            </svg>
          )}

          {avatarId === 'luna' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="lunaGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E2E8F0" />
                </radialGradient>
              </defs>
              {/* Long Bunny Ears */}
              <ellipse cx="36" cy="22" rx="7" ry="20" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
              <ellipse cx="36" cy="22" rx="4" ry="15" fill="#F472B6" opacity="0.6" />
              <ellipse cx="64" cy="22" rx="7" ry="20" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1" />
              <ellipse cx="64" cy="22" rx="4" ry="15" fill="#F472B6" opacity="0.6" />
              {/* Flower Accessory */}
              <circle cx="28" cy="30" r="5" fill="#34D399" />
              <circle cx="28" cy="30" r="2" fill="#FEF08A" />
              {/* Fluffy Round Face */}
              <circle cx="50" cy="58" r="30" fill="url(#lunaGrad)" />
              {/* Cheeks */}
              <ellipse cx="32" cy="66" rx="6" ry="3.5" fill="#F472B6" opacity="0.5" />
              <ellipse cx="68" cy="66" rx="6" ry="3.5" fill="#F472B6" opacity="0.5" />
              {/* Big Cute Eyes */}
              {state === 'rescued' || state === 'cheering' ? (
                <>
                  <path d="M 35 55 Q 41 47 47 55" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 53 55 Q 59 47 65 55" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <ellipse cx="40" cy="54" rx="5" ry="6.5" fill="#047857" />
                  <ellipse cx="60" cy="54" rx="5" ry="6.5" fill="#047857" />
                  <circle cx="38" cy="51" r="2.2" fill="#FFFFFF" />
                  <circle cx="58" cy="51" r="2.2" fill="#FFFFFF" />
                </>
              )}
              {/* Nose & Mouth */}
              <polygon points="50,62 47,65 53,65" fill="#F472B6" />
              <path d="M 46 67 Q 50 71 54 67" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          )}

          {avatarId === 'chichi' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="chichiGrad" cx="50%" cy="45%" r="55%">
                  <stop offset="0%" stopColor="#FB923C" />
                  <stop offset="100%" stopColor="#C2410C" />
                </radialGradient>
              </defs>
              {/* Round Squirrel Ears */}
              <circle cx="26" cy="30" r="11" fill="#C2410C" />
              <circle cx="26" cy="30" r="7" fill="#FED7AA" />
              <circle cx="74" cy="30" r="11" fill="#C2410C" />
              <circle cx="74" cy="30" r="7" fill="#FED7AA" />
              {/* Squirrel Head */}
              <circle cx="50" cy="54" r="30" fill="url(#chichiGrad)" />
              {/* White Muzzle */}
              <ellipse cx="50" cy="64" rx="15" ry="10" fill="#FFF7ED" />
              {/* Cheeks */}
              <circle cx="30" cy="62" r="5" fill="#F97316" opacity="0.6" />
              <circle cx="70" cy="62" r="5" fill="#F97316" opacity="0.6" />
              {/* Eyes */}
              {state === 'rescued' || state === 'cheering' ? (
                <>
                  <path d="M 34 50 Q 40 42 46 50" stroke="#7C2D12" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 54 50 Q 60 42 66 50" stroke="#7C2D12" strokeWidth="4" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <circle cx="39" cy="50" r="5.5" fill="#431407" />
                  <circle cx="61" cy="50" r="5.5" fill="#431407" />
                  <circle cx="37" cy="48" r="2.2" fill="#FFFFFF" />
                  <circle cx="59" cy="48" r="2.2" fill="#FFFFFF" />
                </>
              )}
              {/* Nose & Cute Tooth */}
              <circle cx="50" cy="60" r="2.5" fill="#7C2D12" />
              <rect x="48" y="66" width="4" height="4" rx="1" fill="#FFFFFF" stroke="#7C2D12" strokeWidth="0.8" />
              <path d="M 44 65 Q 50 68 56 65" stroke="#7C2D12" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </svg>
          )}

          {avatarId === 'kaya' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <linearGradient id="griffinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
              {/* Griffin Wings on sides */}
              <path d="M 12 36 Q 4 48 18 64 Q 24 50 20 40 Z" fill="#93C5FD" />
              <path d="M 88 36 Q 96 48 82 64 Q 76 50 80 40 Z" fill="#93C5FD" />
              {/* Feather crest on head */}
              <polygon points="50,14 45,30 55,30" fill="#3B82F6" />
              <polygon points="40,18 38,32 46,30" fill="#60A5FA" />
              <polygon points="60,18 54,30 62,32" fill="#60A5FA" />
              {/* Griffin Head */}
              <circle cx="50" cy="52" r="30" fill="url(#griffinGrad)" />
              {/* Golden Beak */}
              <polygon points="42,56 58,56 50,74" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
              <circle cx="47" cy="58" r="1.5" fill="#78350F" />
              <circle cx="53" cy="58" r="1.5" fill="#78350F" />
              {/* Eyes */}
              {state === 'rescued' || state === 'cheering' ? (
                <>
                  <path d="M 33 46 Q 39 38 45 46" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 55 46 Q 61 38 67 46" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <circle cx="38" cy="46" r="6" fill="#FEF08A" stroke="#1E3A8A" strokeWidth="1.5" />
                  <circle cx="62" cy="46" r="6" fill="#FEF08A" stroke="#1E3A8A" strokeWidth="1.5" />
                  <circle cx="39" cy="46" r="3" fill="#1E3A8A" />
                  <circle cx="61" cy="46" r="3" fill="#1E3A8A" />
                  <circle cx="37" cy="44" r="1.2" fill="#FFFFFF" />
                  <circle cx="59" cy="44" r="1.2" fill="#FFFFFF" />
                </>
              )}
            </svg>
          )}

          {avatarId === 'coco' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <defs>
                <radialGradient id="polarBearGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="90%" stopColor="#E0F2FE" />
                  <stop offset="100%" stopColor="#BAE6FD" />
                </radialGradient>
              </defs>
              {/* Polar Bear Ears */}
              <circle cx="28" cy="28" r="10" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="1" />
              <circle cx="28" cy="28" r="5" fill="#38BDF8" opacity="0.4" />
              <circle cx="72" cy="28" r="10" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="1" />
              <circle cx="72" cy="28" r="5" fill="#38BDF8" opacity="0.4" />
              {/* Polar Bear Head */}
              <circle cx="50" cy="54" r="31" fill="url(#polarBearGrad)" />
              {/* Cute Ice Crystal Tiara */}
              <polygon points="50,22 53,28 47,28" fill="#38BDF8" />
              <polygon points="44,24 47,29 42,29" fill="#7DD3FC" />
              <polygon points="56,24 53,29 58,29" fill="#7DD3FC" />
              {/* Chubby Snout */}
              <ellipse cx="50" cy="62" rx="14" ry="10" fill="#FFFFFF" stroke="#E0F2FE" strokeWidth="1" />
              <ellipse cx="50" cy="58" rx="4" ry="2.8" fill="#0C4A6E" />
              <path d="M 46 64 Q 50 67 54 64" stroke="#0C4A6E" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Cheeks */}
              <circle cx="32" cy="62" r="4.5" fill="#38BDF8" opacity="0.4" />
              <circle cx="68" cy="62" r="4.5" fill="#38BDF8" opacity="0.4" />
              {/* Eyes */}
              {state === 'rescued' || state === 'cheering' ? (
                <>
                  <path d="M 34 50 Q 40 42 46 50" stroke="#0C4A6E" strokeWidth="4" strokeLinecap="round" fill="none" />
                  <path d="M 54 50 Q 60 42 66 50" stroke="#0C4A6E" strokeWidth="4" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <circle cx="38" cy="49" r="4.5" fill="#0F172A" />
                  <circle cx="62" cy="49" r="4.5" fill="#0F172A" />
                  <circle cx="36" cy="47" r="1.8" fill="#FFFFFF" />
                  <circle cx="60" cy="47" r="1.8" fill="#FFFFFF" />
                </>
              )}
            </svg>
          )}

          {avatarId === 'sol' && (
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
              <defs>
                <radialGradient id="phoenixSunGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#E11D48" />
                </radialGradient>
              </defs>
              {/* Sunbeam Crown Halo */}
              <circle cx="50" cy="50" r="42" fill="#FEF08A" opacity="0.4" />
              <polygon points="50,6 54,18 46,18" fill="#F59E0B" />
              <polygon points="80,20 72,28 68,22" fill="#F59E0B" />
              <polygon points="20,20 28,28 32,22" fill="#F59E0B" />
              {/* Phoenix Body */}
              <circle cx="50" cy="54" r="30" fill="url(#phoenixSunGrad)" />
              {/* Master Crown */}
              <polygon points="40,24 45,34 50,22 55,34 60,24 58,38 42,38" fill="#FEF08A" stroke="#B45309" strokeWidth="1" />
              <circle cx="50" cy="22" r="2.5" fill="#E11D48" />
              {/* Golden Phoenix Beak */}
              <polygon points="44,58 56,58 50,72" fill="#FEF08A" stroke="#D97706" strokeWidth="1.2" />
              {/* Majestic Eyes */}
              {state === 'rescued' || state === 'cheering' ? (
                <>
                  <path d="M 33 48 Q 40 40 47 48" stroke="#4C0519" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  <path d="M 53 48 Q 60 40 67 48" stroke="#4C0519" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                </>
              ) : (
                <>
                  <ellipse cx="38" cy="48" rx="5" ry="6.5" fill="#881337" />
                  <ellipse cx="62" cy="48" rx="5" ry="6.5" fill="#881337" />
                  <circle cx="36" cy="46" r="2" fill="#FEF08A" />
                  <circle cx="60" cy="46" r="2" fill="#FEF08A" />
                  <circle cx="39" cy="50" r="1" fill="#FFFFFF" />
                  <circle cx="63" cy="50" r="1" fill="#FFFFFF" />
                </>
              )}
            </svg>
          )}
        </div>
      </div>

      {/* Name and Title under avatar */}
      <div className="mt-1 text-center">
        <span className="text-xs font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
          {avatar.name}
        </span>
      </div>
    </div>
  );
};
