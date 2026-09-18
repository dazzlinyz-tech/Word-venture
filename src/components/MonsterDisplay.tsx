import React from 'react';
import { BattleMonster } from '../types';
import { Volume2 } from 'lucide-react';
import { speakWord } from '../utils/audio';

interface MonsterDisplayProps {
  monster: BattleMonster;
  onClick: () => void;
  disabled?: boolean;
  showSpeakBtn?: boolean;
}

export const MonsterDisplay: React.FC<MonsterDisplayProps> = ({
  monster,
  onClick,
  disabled = false,
  showSpeakBtn = true
}) => {
  const { word, visualType, isDefeated, isWrong } = monster;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakWord(word.word);
  };

  // Render monster SVG face and body
  const renderMonsterCreature = () => {
    switch (visualType) {
      case 'slime':
        return (
          <svg viewBox="0 0 100 90" className="w-20 h-18 sm:w-24 sm:h-20 drop-shadow-md">
            {/* Slime body */}
            <path
              d="M 50 15 C 25 15 15 35 15 60 C 15 78 30 85 50 85 C 70 85 85 78 85 60 C 85 35 75 15 50 15 Z"
              fill={isWrong ? '#EF4444' : '#10B981'}
            />
            {/* Gloss highlight */}
            <ellipse cx="38" cy="30" rx="8" ry="4" fill="#6EE7B7" opacity="0.6" transform="rotate(-20 38 30)" />
            
            {/* Eyes */}
            {isDefeated ? (
              // X_X defeated eyes
              <>
                <path d="M 33 45 L 43 55 M 43 45 L 33 55" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" />
                <path d="M 57 45 L 67 55 M 67 45 L 57 55" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="50" cy="68" rx="7" ry="5" fill="#064E3B" />
              </>
            ) : isWrong ? (
              // ㅋ_ㅋ giggling wrong eyes
              <>
                <path d="M 33 48 Q 38 42 43 48" stroke="#7F1D1D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 57 48 Q 62 42 67 48" stroke="#7F1D1D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 45 60 Q 50 67 55 60" stroke="#7F1D1D" strokeWidth="3" strokeLinecap="round" fill="#991B1B" />
              </>
            ) : (
              // Normal big anime monster eyes
              <>
                <circle cx="38" cy="48" r="7" fill="#FFFFFF" />
                <circle cx="62" cy="48" r="7" fill="#FFFFFF" />
                <circle cx="40" cy="49" r="4" fill="#064E3B" />
                <circle cx="64" cy="49" r="4" fill="#064E3B" />
                <circle cx="42" cy="47" r="1.5" fill="#FFFFFF" />
                <circle cx="66" cy="47" r="1.5" fill="#FFFFFF" />
                {/* Cute small mouth */}
                <path d="M 47 62 Q 50 66 53 62" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}
          </svg>
        );

      case 'bat':
        return (
          <svg viewBox="0 0 110 90" className="w-22 h-18 sm:w-26 sm:h-20 drop-shadow-md">
            {/* Bat Wings */}
            <path d="M 25 45 Q 5 25 5 50 Q 20 65 30 55 Z" fill="#6B21A8" />
            <path d="M 85 45 Q 105 25 105 50 Q 90 65 80 55 Z" fill="#6B21A8" />

            {/* Bat Body */}
            <ellipse cx="55" cy="52" rx="26" ry="24" fill={isWrong ? '#EF4444' : '#9333EA'} />

            {/* Bat Ears */}
            <polygon points="40,32 35,12 48,26" fill="#7E22CE" />
            <polygon points="70,32 75,12 62,26" fill="#7E22CE" />
            <polygon points="40,28 37,16 46,24" fill="#F472B6" />
            <polygon points="70,28 73,16 64,24" fill="#F472B6" />

            {/* Eyes */}
            {isDefeated ? (
              <>
                <path d="M 43 47 L 51 55 M 51 47 L 43 55" stroke="#3B0764" strokeWidth="3" strokeLinecap="round" />
                <path d="M 59 47 L 67 55 M 67 47 L 59 55" stroke="#3B0764" strokeWidth="3" strokeLinecap="round" />
                <ellipse cx="55" cy="65" rx="5" ry="4" fill="#3B0764" />
              </>
            ) : isWrong ? (
              <>
                <path d="M 44 50 Q 48 44 52 50" stroke="#7F1D1D" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 58 50 Q 62 44 66 50" stroke="#7F1D1D" strokeWidth="3" strokeLinecap="round" fill="none" />
                <polygon points="50,60 55,68 60,60" fill="#FCA5A5" />
              </>
            ) : (
              <>
                <circle cx="46" cy="48" r="6" fill="#FDE047" />
                <circle cx="64" cy="48" r="6" fill="#FDE047" />
                <circle cx="47" cy="48" r="3.5" fill="#3B0764" />
                <circle cx="65" cy="48" r="3.5" fill="#3B0764" />
                {/* Tiny fangs */}
                <polygon points="51,60 53,65 55,60" fill="#FFFFFF" />
                <polygon points="55,60 57,65 59,60" fill="#FFFFFF" />
              </>
            )}
          </svg>
        );

      case 'flame':
        return (
          <svg viewBox="0 0 100 90" className="w-20 h-18 sm:w-24 sm:h-20 drop-shadow-md">
            {/* Fire body */}
            <path
              d="M 50 10 Q 75 35 75 60 Q 75 85 50 85 Q 25 85 25 60 Q 25 40 40 30 Q 30 50 50 35 Q 40 20 50 10 Z"
              fill={isWrong ? '#991B1B' : '#EA580C'}
            />
            {/* Inner flame */}
            <path
              d="M 50 30 Q 65 45 65 65 Q 65 80 50 80 Q 35 80 35 65 Q 35 50 50 30 Z"
              fill="#FBBF24"
            />
            {/* Eyes */}
            {isDefeated ? (
              <>
                <path d="M 39 52 L 47 60 M 47 52 L 39 60" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
                <path d="M 53 52 L 61 60 M 61 52 L 53 60" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
                <circle cx="50" cy="68" r="5" fill="#7C2D12" />
              </>
            ) : isWrong ? (
              <>
                <path d="M 39 55 Q 43 49 47 55" stroke="#7F1D1D" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 53 55 Q 57 49 61 55" stroke="#7F1D1D" strokeWidth="3" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <circle cx="43" cy="54" r="5" fill="#7C2D12" />
                <circle cx="57" cy="54" r="5" fill="#7C2D12" />
                <circle cx="44" cy="52" r="1.5" fill="#FFFFFF" />
                <circle cx="58" cy="52" r="1.5" fill="#FFFFFF" />
                <path d="M 47 64 Q 50 67 53 64" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}
          </svg>
        );

      case 'rock':
        return (
          <svg viewBox="0 0 100 90" className="w-20 h-18 sm:w-24 sm:h-20 drop-shadow-md">
            {/* Rock body */}
            <polygon
              points="30,20 70,18 85,45 80,82 20,85 15,48"
              fill={isWrong ? '#B91C1C' : '#64748B'}
            />
            {/* Spikes / Crystals */}
            <polygon points="45,18 50,6 55,18" fill="#38BDF8" />
            <polygon points="28,24 24,14 36,22" fill="#38BDF8" />

            {/* Eyes */}
            {isDefeated ? (
              <>
                <path d="M 36 45 L 46 55 M 46 45 L 36 55" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                <path d="M 54 45 L 64 55 M 64 45 L 54 55" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                <rect x="42" y="66" width="16" height="5" rx="2" fill="#1E293B" />
              </>
            ) : (
              <>
                <circle cx="41" cy="48" r="6" fill="#38BDF8" />
                <circle cx="59" cy="48" r="6" fill="#38BDF8" />
                <circle cx="42" cy="48" r="3" fill="#0F172A" />
                <circle cx="60" cy="48" r="3" fill="#0F172A" />
                <path d="M 45 64 L 55 64" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
              </>
            )}
          </svg>
        );

      default: // jelly / cyclops
        return (
          <svg viewBox="0 0 100 90" className="w-20 h-18 sm:w-24 sm:h-20 drop-shadow-md">
            <ellipse cx="50" cy="50" rx="35" ry="32" fill={isWrong ? '#DC2626' : '#EC4899'} />
            <polygon points="50,18 42,4 58,4" fill="#F43F5E" />
            {isDefeated ? (
              <>
                <path d="M 42 45 L 58 59 M 58 45 L 42 59" stroke="#831843" strokeWidth="4" strokeLinecap="round" />
                <ellipse cx="50" cy="68" rx="8" ry="6" fill="#831843" />
              </>
            ) : (
              <>
                <circle cx="50" cy="46" r="14" fill="#FFFFFF" />
                <circle cx="50" cy="46" r="8" fill="#831843" />
                <circle cx="52" cy="43" r="3" fill="#FFFFFF" />
                <path d="M 44 65 Q 50 72 56 65" stroke="#831843" strokeWidth="2.5" strokeLinecap="round" fill="#FBCFE8" />
              </>
            )}
          </svg>
        );
    }
  };

  return (
    <div
      id={`monster-card-${monster.id}`}
      onClick={() => {
        if (!disabled && !isDefeated) {
          onClick();
        }
      }}
      className={`group relative flex flex-col items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-300 transform select-none ${
        isDefeated
          ? 'animate-defeated pointer-events-none'
          : isWrong
          ? 'animate-shake bg-red-100/90 border-4 border-red-500 shadow-xl'
          : 'bg-white/95 hover:bg-amber-50/90 hover:scale-105 active:scale-95 border-3 border-amber-300 hover:border-amber-500 shadow-md hover:shadow-xl'
      } ${disabled ? 'opacity-80 cursor-not-allowed' : ''}`}
    >
      {/* Monster Creature Avatar */}
      <div className={`transition-transform duration-200 ${isDefeated ? 'scale-75' : 'group-hover:-translate-y-1'}`}>
        {renderMonsterCreature()}
      </div>

      {/* Monster English Word Plaque / Button */}
      <div className="w-full mt-2 flex flex-col items-center">
        <div className="w-full bg-linear-to-r from-amber-50 via-yellow-100 to-amber-50 border-2 border-amber-400 rounded-xl px-3 py-2 shadow-inner flex items-center justify-between gap-2">
          
          {/* Audio TTS button */}
          {showSpeakBtn && (
            <button
              type="button"
              onClick={handleSpeak}
              id={`btn-speak-${word.id}`}
              className="p-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 active:scale-90 transition-transform"
              title="발음 듣기"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}

          {/* Word text */}
          <span className="font-game text-xl sm:text-2xl font-bold tracking-wide text-slate-800 flex-1 text-center">
            {word.word}
          </span>

          {/* Polysemy Star Badge if multi-meaning word */}
          {word.isPolysemy && (
            <span
              className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-xs animate-pulse"
              title="2가지 뜻을 가진 단어!"
            >
              2뜻!
            </span>
          )}
        </div>

        {/* Attack hint / tap guide */}
        <span className="mt-1 text-[11px] font-bold text-amber-800 opacity-80 group-hover:opacity-100">
          💥 터치해서 물리치기!
        </span>
      </div>
    </div>
  );
};
