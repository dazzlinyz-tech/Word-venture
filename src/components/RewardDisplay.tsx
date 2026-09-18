import React from 'react';
import { CharacterReward } from '../types';

interface RewardDisplayProps {
  reward: CharacterReward;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGlow?: boolean;
}

export const RewardDisplay: React.FC<RewardDisplayProps> = ({
  reward,
  size = 'md',
  showGlow = true
}) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44'
  };

  return (
    <div className="relative flex items-center justify-center select-none" id={`reward-display-${reward.id}`}>
      {/* Background Magical Sunburst Glow */}
      {showGlow && (
        <div className="absolute -inset-3 bg-radial from-amber-300/60 via-yellow-200/30 to-transparent rounded-full animate-spin duration-700 -z-10" />
      )}

      <div className={`relative ${sizeMap[size]} flex items-center justify-center p-1`}>
        {reward.iconType === 'sword' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="swordBlade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>
            {/* Golden Shield in Background */}
            <path
              d="M 50 15 C 68 15 78 22 78 45 C 78 72 50 88 50 88 C 50 88 22 72 22 45 C 22 22 32 15 50 15 Z"
              fill="url(#shieldGrad)"
              stroke="#FBBF24"
              strokeWidth="3"
            />
            {/* Inner Shield Lion Emblem */}
            <path
              d="M 50 25 C 62 25 68 30 68 45 C 68 62 50 74 50 74 C 50 74 32 62 32 45 C 32 30 38 25 50 25 Z"
              fill="#FEF3C7"
              opacity="0.85"
            />
            <circle cx="50" cy="45" r="10" fill="#D97706" />
            <polygon points="50,38 52,43 57,43 53,46 55,51 50,48 45,51 47,46 43,43 48,43" fill="#FDE047" />

            {/* Crossed Golden Lion Sword in Foreground */}
            <g transform="rotate(25 50 50)">
              {/* Blade */}
              <polygon points="50,8 54,62 50,68 46,62" fill="url(#swordBlade)" />
              <line x1="50" y1="12" x2="50" y2="62" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Guard */}
              <rect x="36" y="66" width="28" height="5" rx="2" fill="#D97706" stroke="#FEF3C7" strokeWidth="1" />
              <circle cx="50" cy="68.5" r="3" fill="#EF4444" />
              {/* Grip */}
              <rect x="47" y="71" width="6" height="15" rx="1" fill="#78350F" />
              {/* Pommel */}
              <circle cx="50" cy="88" r="4.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            </g>
          </svg>
        )}

        {reward.iconType === 'map' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="parchment" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            {/* Scroll Parchment Map */}
            <path
              d="M 18 25 Q 45 18 78 24 Q 82 55 76 80 Q 48 86 16 78 Q 20 50 18 25 Z"
              fill="url(#parchment)"
              stroke="#D97706"
              strokeWidth="2.5"
            />
            {/* Map terrain curves */}
            <path d="M 28 35 Q 36 30 46 38 Q 58 45 68 36" fill="none" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 32 60 Q 48 50 56 68" fill="none" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Red Treasure X mark */}
            <line x1="56" y1="36" x2="66" y2="46" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
            <line x1="66" y1="36" x2="56" y2="46" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />

            {/* Shiny Brass Compass on bottom right */}
            <circle cx="68" cy="68" r="18" fill="#F59E0B" stroke="#92400E" strokeWidth="2.5" />
            <circle cx="68" cy="68" r="14" fill="#FEF3C7" />
            {/* Compass Needle */}
            <polygon points="68,58 72,68 64,68" fill="#EF4444" />
            <polygon points="68,78 72,68 64,68" fill="#3B82F6" />
            <circle cx="68" cy="68" r="2.5" fill="#B45309" />
          </svg>
        )}

        {reward.iconType === 'wand' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="wandShaft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
            {/* Magical Glowing Wand Handle */}
            <g transform="rotate(-30 50 50)">
              {/* Wand shaft */}
              <polygon points="48,32 52,32 54,88 46,88" fill="url(#wandShaft)" stroke="#4C1D95" strokeWidth="1" />
              {/* Spiral Golden Ribbons on Shaft */}
              <line x1="48" y1="44" x2="52" y2="48" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
              <line x1="48" y1="58" x2="52" y2="62" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
              <line x1="48" y1="72" x2="52" y2="76" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />

              {/* Wand Pommel Orb */}
              <circle cx="50" cy="90" r="4.5" fill="#F472B6" />

              {/* Big Glowing Star on Wand Top */}
              <circle cx="50" cy="24" r="18" fill="#FEF08A" opacity="0.4" />
              <polygon
                points="50,6 54,18 67,18 57,25 61,37 50,30 39,37 43,25 33,18 46,18"
                fill="#FDE047"
                stroke="#D97706"
                strokeWidth="1.5"
              />
              <circle cx="50" cy="23" r="5" fill="#FFFFFF" />
            </g>
            {/* Floating stardust sparks */}
            <circle cx="28" cy="24" r="3" fill="#F472B6" className="animate-ping" />
            <circle cx="75" cy="30" r="2.5" fill="#38BDF8" className="animate-ping" />
            <circle cx="72" cy="74" r="2" fill="#FDE047" />
          </svg>
        )}

        {reward.iconType === 'orb' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <defs>
              <radialGradient id="dragonOrbGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="35%" stopColor="#F87171" />
                <stop offset="75%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </radialGradient>
            </defs>
            {/* Dragon Claws holding orb */}
            <path d="M 22 75 Q 36 82 50 82 Q 64 82 78 75" fill="none" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
            <path d="M 28 85 L 26 72" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
            <path d="M 72 85 L 74 72" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
            <path d="M 50 88 L 50 78" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />

            {/* Glowing Dragon Sphere */}
            <circle cx="50" cy="48" r="32" fill="url(#dragonOrbGrad)" />
            {/* Inner flame swirl */}
            <path d="M 45 62 Q 35 48 50 34 Q 60 48 45 62 Z" fill="#FEF08A" opacity="0.85" />
            <path d="M 47 56 Q 42 46 50 38 Q 54 46 47 56 Z" fill="#FFFFFF" />

            {/* Outer flame sparks */}
            <circle cx="50" cy="14" r="3" fill="#EF4444" />
            <circle cx="20" cy="38" r="2.5" fill="#F59E0B" />
            <circle cx="80" cy="38" r="2.5" fill="#F59E0B" />
          </svg>
        )}

        {reward.iconType === 'wrench' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="wrenchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
            </defs>
            <g transform="rotate(45 50 50)">
              <rect x="44" y="32" width="12" height="42" rx="3" fill="url(#wrenchGrad)" stroke="#0F172A" strokeWidth="2" />
              <line x1="50" y1="36" x2="50" y2="70" stroke="#38BDF8" strokeWidth="2" />
              <path
                d="M 36 26 C 36 14 64 14 64 26 C 64 30 60 34 56 34 L 54 26 L 46 26 L 44 34 C 40 34 36 30 36 26 Z"
                fill="#FDE047"
                stroke="#0F172A"
                strokeWidth="2"
              />
              <circle cx="50" cy="78" r="10" fill="#FDE047" stroke="#0F172A" strokeWidth="2" />
              <circle cx="50" cy="78" r="5" fill="#FFFFFF" />
            </g>
            <polygon points="52,18 64,18 58,30 68,30 46,50 52,36 44,36" fill="#FDE047" stroke="#EA580C" strokeWidth="1" />
            <polygon points="34,60 42,60 38,68 44,68 30,82 34,72 28,72" fill="#38BDF8" />
          </svg>
        )}

        {reward.iconType === 'potion' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="potionLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
            {/* Glass Bottle */}
            <path d="M 44 20 L 56 20 L 56 32 L 74 65 C 78 74 74 84 64 88 C 55 91 45 91 36 88 C 26 84 22 74 26 65 L 44 32 Z" fill="#E6FFFA" stroke="#065F46" strokeWidth="2.5" opacity="0.95" />
            {/* Cork */}
            <rect x="42" y="12" width="16" height="8" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
            {/* Magical Liquid */}
            <path d="M 44 42 L 56 42 L 70 66 C 74 73 70 82 62 85 C 54 88 46 88 38 85 C 30 82 26 73 30 66 Z" fill="url(#potionLiquid)" />
            {/* Bubbles */}
            <circle cx="50" cy="65" r="3.5" fill="#A7F3D0" className="animate-ping" />
            <circle cx="42" cy="74" r="2.5" fill="#FFFFFF" />
            <circle cx="58" cy="76" r="2" fill="#FFFFFF" />
            {/* Sparkles */}
            <polygon points="50,48 52,53 57,53 53,56 55,61 50,58 45,61 47,56 43,53 48,53" fill="#FEF08A" />
          </svg>
        )}

        {reward.iconType === 'bell' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="goldBellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>
            {/* Bell Loop */}
            <circle cx="50" cy="20" r="8" fill="none" stroke="#D97706" strokeWidth="4" />
            {/* Bell Dome */}
            <path d="M 50 24 C 34 24 28 46 24 68 C 22 76 28 80 50 80 C 72 80 78 76 76 68 C 72 46 66 24 50 24 Z" fill="url(#goldBellGrad)" stroke="#78350F" strokeWidth="2.5" />
            {/* Clapper */}
            <circle cx="50" cy="85" r="6" fill="#78350F" />
            {/* Decorative Ribbon */}
            <ellipse cx="40" cy="26" rx="7" ry="4" fill="#EF4444" transform="rotate(-20 40 26)" />
            <ellipse cx="60" cy="26" rx="7" ry="4" fill="#EF4444" transform="rotate(20 60 26)" />
            <circle cx="50" cy="26" r="3" fill="#FDE047" />
          </svg>
        )}

        {reward.iconType === 'feather' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="featherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#67E8F9" />
                <stop offset="40%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
            </defs>
            <g transform="rotate(30 50 50)">
              {/* Feather Quill Shaft */}
              <line x1="50" y1="10" x2="50" y2="92" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
              {/* Feather Vanes */}
              <path d="M 50 14 C 28 32 30 65 50 78 C 70 65 72 32 50 14 Z" fill="url(#featherGrad)" stroke="#1E40AF" strokeWidth="1.5" />
              {/* Inner detail slits */}
              <line x1="50" y1="30" x2="38" y2="40" stroke="#93C5FD" strokeWidth="1.5" />
              <line x1="50" y1="42" x2="34" y2="54" stroke="#93C5FD" strokeWidth="1.5" />
              <line x1="50" y1="30" x2="62" y2="40" stroke="#93C5FD" strokeWidth="1.5" />
              <line x1="50" y1="42" x2="66" y2="54" stroke="#93C5FD" strokeWidth="1.5" />
              {/* Golden Nib */}
              <polygon points="47,82 53,82 50,94" fill="#F59E0B" />
            </g>
          </svg>
        )}

        {reward.iconType === 'crystal' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="45%" stopColor="#38BDF8" />
                <stop offset="75%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
            </defs>
            {/* Diamond Cut Crystal */}
            <polygon points="50,12 80,36 68,88 32,88 20,36" fill="url(#crystalGrad)" stroke="#0284C7" strokeWidth="2" />
            <polygon points="50,12 36,36 64,36" fill="#F0F9FF" opacity="0.75" />
            <polygon points="36,36 50,88 64,36" fill="#0284C7" opacity="0.3" />
            <line x1="20" y1="36" x2="32" y2="88" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="80" y1="36" x2="68" y2="88" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Star Sparkle */}
            <polygon points="50,30 52,38 60,38 54,43 56,51 50,46 44,51 46,43 40,38 48,38" fill="#FFFFFF" />
          </svg>
        )}

        {reward.iconType === 'crown' && (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg animate-bounce">
            <defs>
              <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>
            {/* Crown Base Rim */}
            <ellipse cx="50" cy="80" rx="36" ry="8" fill="#B45309" />
            <rect x="14" y="74" width="72" height="10" rx="3" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
            {/* Crown Peaks */}
            <path d="M 16 74 L 16 38 L 34 56 L 50 20 L 66 56 L 84 38 L 84 74 Z" fill="url(#crownGrad)" stroke="#78350F" strokeWidth="2" />
            {/* Jewels on Peaks */}
            <circle cx="16" cy="36" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="50" cy="18" r="6" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="84" cy="36" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Center Royal Crest Diamond */}
            <polygon points="50,50 58,62 50,72 42,62" fill="#EF4444" stroke="#FDE047" strokeWidth="1.5" />
            <circle cx="32" cy="79" r="2.5" fill="#3B82F6" />
            <circle cx="50" cy="79" r="3" fill="#10B981" />
            <circle cx="68" cy="79" r="2.5" fill="#EF4444" />
          </svg>
        )}
      </div>
    </div>
  );
};
