export type AvatarId = 'leo' | 'mina' | 'tori' | 'pupu' | 'robi' | 'luna' | 'chichi' | 'kaya' | 'coco' | 'sol';

export interface CharacterReward {
  id: string;
  name: string;
  description: string;
  iconType: 'sword' | 'map' | 'wand' | 'orb' | 'wrench' | 'potion' | 'bell' | 'feather' | 'crystal' | 'crown';
  emoji: string;
  quote: string;
}

export interface AvatarInfo {
  id: AvatarId;
  name: string;
  title: string;
  tagline: string;
  emoji: string;
  themeColor: string;
  bgGradient: string;
  cheerMsg: string;
  rescueMsg: string;
  requiredLevel: number; // Level required to unlock (1, 11, 21...)
  unlockLevel?: number;
  reward: CharacterReward;
}

export interface WordItem {
  id: string;
  word: string;
  meanings: string[];
  phonetic?: string;
  isPolysemy: boolean;
  polysemyHint?: string;
  exampleSentence: string;
  exampleTranslation: string;
  category: 'daily' | 'polysemy' | 'nature' | 'action';
}

export type MonsterVisualType = 'slime' | 'bat' | 'flame' | 'rock' | 'jelly' | 'cyclops';

export interface BattleMonster {
  id: string;
  word: WordItem;
  visualType: MonsterVisualType;
  colorScheme: string;
  isDefeated: boolean;
  isHit: boolean;
  isWrong: boolean;
}

export type GameScreen = 'start' | 'battle' | 'result' | 'failed';
export type GameMode = 'standard10' | 'polysemy' | 'mix';

export interface GameStats {
  score: number;
  combo: number;
  maxCombo: number;
  totalQuestions: number;
  defeatedCount: number;
  wrongWords: WordItem[];
  cleared: boolean;
  elapsedSeconds: number;
  avatarId: AvatarId;
  level: number;
  rewardUnlocked?: CharacterReward;
  newLevelUnlocked?: number;
  failedWord?: WordItem;
  failReason?: 'timeout' | 'monster_caught';
}

export interface PlayerProgress {
  currentLevel: number;
  maxClearedLevel: number;
  unlockedRewards: string[]; // array of reward IDs
}
