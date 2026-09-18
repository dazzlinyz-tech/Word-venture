import React, { useState, useEffect } from 'react';
import { AvatarId, GameMode, GameScreen, GameStats, WordItem } from './types';
import { getGameRoundWords } from './data/words';
import { StartScreen } from './components/StartScreen';
import { BattleScreen } from './components/BattleScreen';
import { ResultScreen } from './components/ResultScreen';
import { FailedScreen } from './components/FailedScreen';
import { AVATARS } from './data/avatars';
import { playLevelUpSound } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('start');
  const [selectedAvatarId, setSelectedAvatarId] = useState<AvatarId>('leo');
  const [selectedMode, setSelectedMode] = useState<GameMode>('mix');
  const [gameWords, setGameWords] = useState<WordItem[]>([]);
  
  // Highest unlocked level (saved in localStorage)
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState<number>(() => {
    try {
      const savedMax = localStorage.getItem('wordventure_max_level');
      if (savedMax) return Math.max(1, parseInt(savedMax, 10));
      const saved = localStorage.getItem('wordventure_level');
      return saved ? Math.max(1, parseInt(saved, 10)) : 1;
    } catch {
      return 1;
    }
  });

  // Current selected level to play
  const [level, setLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('wordventure_level');
      const savedMax = localStorage.getItem('wordventure_max_level');
      const val = saved || savedMax;
      return val ? Math.max(1, parseInt(val, 10)) : 1;
    } catch {
      return 1;
    }
  });

  // Save level and maxUnlockedLevel on change
  useEffect(() => {
    try {
      localStorage.setItem('wordventure_level', level.toString());
    } catch {
      // ignore
    }
  }, [level]);

  useEffect(() => {
    try {
      localStorage.setItem('wordventure_max_level', maxUnlockedLevel.toString());
    } catch {
      // ignore
    }
  }, [maxUnlockedLevel]);

  // Failure state tracking
  const [failedData, setFailedData] = useState<{
    failedWord?: WordItem;
    defeatedCount: number;
    totalQuestions: number;
    elapsedSeconds: number;
  } | null>(null);

  const [lastStats, setLastStats] = useState<GameStats>({
    score: 0,
    combo: 0,
    maxCombo: 0,
    totalQuestions: 10,
    defeatedCount: 10,
    wrongWords: [],
    cleared: true,
    elapsedSeconds: 0,
    avatarId: 'leo',
    level: 1,
    rewardUnlocked: AVATARS.leo.reward
  });

  // Start round for current level
  const handleStartGame = () => {
    const words = getGameRoundWords(selectedMode);
    setGameWords(words);
    setCurrentScreen('battle');
  };

  // Finish battle round (Victory!)
  const handleFinishBattle = (stats: {
    score: number;
    combo: number;
    maxCombo: number;
    defeatedCount: number;
    totalQuestions: number;
    wrongWords: WordItem[];
    elapsedSeconds: number;
  }) => {
    const currentAvatar = AVATARS[selectedAvatarId] || AVATARS.leo;
    const clearedStage = level;
    const nextStage = Math.min(100, clearedStage + 1);

    // Save stats with the stage that was JUST completed
    setLastStats({
      ...stats,
      cleared: true,
      avatarId: selectedAvatarId,
      level: clearedStage,
      rewardUnlocked: currentAvatar.reward
    });

    // Advance maxUnlockedLevel and current level immediately!
    // So even if the player doesn't click "다음 스테이지 도전" right now and returns home or reloads,
    // they are already at the next stage!
    setMaxUnlockedLevel(prev => Math.max(prev, nextStage));
    setLevel(nextStage);

    setCurrentScreen('result');
  };

  // Battle round Failed (Time out or monster reached avatar)
  const handleFailGame = (data: {
    failedWord?: WordItem;
    defeatedCount: number;
    totalQuestions: number;
    elapsedSeconds: number;
  }) => {
    setFailedData(data);
    setCurrentScreen('failed');
  };

  // Proceed to next level
  const handleNextLevel = () => {
    playLevelUpSound();
    const words = getGameRoundWords(selectedMode);
    setGameWords(words);
    setCurrentScreen('battle');
  };

  // Restart the level that was just cleared or failed
  const handleRestartClearedLevel = () => {
    setLevel(lastStats.level);
    const words = getGameRoundWords(selectedMode);
    setGameWords(words);
    setCurrentScreen('battle');
  };

  // Restart current level
  const handleRestartCurrentLevel = () => {
    const words = getGameRoundWords(selectedMode);
    setGameWords(words);
    setCurrentScreen('battle');
  };

  // Retry only wrong words from review notebook
  const handleRetryWrongWords = (wrongList: WordItem[]) => {
    if (wrongList.length === 0) {
      handleRestartCurrentLevel();
      return;
    }
    // If fewer than 10 wrong words, supplement with new words to make a fun round
    let roundWords = [...wrongList];
    if (roundWords.length < 10) {
      const extra = getGameRoundWords(selectedMode).filter(
        w => !roundWords.some(rw => rw.id === w.id)
      );
      roundWords = [...roundWords, ...extra.slice(0, 10 - roundWords.length)];
    }
    setGameWords(roundWords.slice(0, 10));
    setCurrentScreen('battle');
  };

  // Return to start screen
  const handleGoHome = () => {
    setCurrentScreen('start');
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-800 antialiased font-sans">
      {currentScreen === 'start' && (
        <StartScreen
          selectedAvatarId={selectedAvatarId}
          onSelectAvatar={setSelectedAvatarId}
          selectedMode={selectedMode}
          onSelectMode={setSelectedMode}
          onStartGame={handleStartGame}
          level={level}
          maxUnlockedLevel={maxUnlockedLevel}
          onSelectLevel={setLevel}
        />
      )}

      {currentScreen === 'battle' && (
        <BattleScreen
          avatarId={selectedAvatarId}
          questionWords={gameWords}
          level={level}
          onFinishGame={handleFinishBattle}
          onFailGame={handleFailGame}
          onExitToHome={handleGoHome}
        />
      )}

      {currentScreen === 'result' && (
        <ResultScreen
          stats={lastStats}
          onNextLevel={handleNextLevel}
          onRestartCurrentLevel={handleRestartClearedLevel}
          onRetryWrongWords={handleRetryWrongWords}
          onGoHome={handleGoHome}
        />
      )}

      {currentScreen === 'failed' && (
        <FailedScreen
          avatarId={selectedAvatarId}
          failedWord={failedData?.failedWord}
          level={level}
          defeatedCount={failedData?.defeatedCount ?? 0}
          totalQuestions={failedData?.totalQuestions ?? 10}
          onRetryLevel={handleRestartCurrentLevel}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}
