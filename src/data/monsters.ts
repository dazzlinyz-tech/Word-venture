import { MonsterVisualType, MonsterTier } from '../types';

export interface MonsterSpeciesInfo {
  type: MonsterVisualType;
  name: string;
  nameEn: string;
  element: 'slime' | 'flame' | 'ice' | 'forest' | 'magic' | 'dark' | 'electric' | 'boss';
  tier: MonsterTier;
  title: string;
  textureDesc: string;
  image3d: string;
  themeColor: string;
  glowColor: string;
  bgGradient: string;
  borderClass: string;
  particleEmoji: string[];
  ambientParticleColor: string;
  attackMotion: string;
  defeatQuote: string;
}

export const MONSTER_SPECIES: Record<string, MonsterSpeciesInfo> = {
  slime: {
    type: 'slime',
    name: '아쿠아 젤리몬',
    nameEn: 'Aqua Jellymon',
    element: 'slime',
    tier: 'early',
    title: '말랑말랑 젤리 슬라임',
    textureDesc: '투명하고 말랑말랑한 에메랄드 젤리 몸체와 은은한 탄산 거품',
    image3d: '/src/assets/images/monster_slime_3d_1793327241680.jpg',
    themeColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    bgGradient: 'from-cyan-100 via-teal-50 to-emerald-100',
    borderClass: 'border-cyan-300 hover:border-cyan-400',
    particleEmoji: ['🫧', '💧', '✨'],
    ambientParticleColor: '#22d3ee',
    attackMotion: '물방울 젤리 통통 어택!',
    defeatQuote: '퐁퐁~ 말랑하게 정화되었어요!'
  },
  flame: {
    type: 'flame',
    name: '플레임 폭스',
    nameEn: 'Flame Fox',
    element: 'flame',
    tier: 'early',
    title: '따스한 불꽃 여우',
    textureDesc: '복슬복슬 따뜻한 불꽃 털과 작은 작열 뿔, 타오르는 꼬리',
    image3d: '/src/assets/images/monster_flame_3d_1793327254668.jpg',
    themeColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.5)',
    bgGradient: 'from-amber-100 via-orange-50 to-rose-100',
    borderClass: 'border-orange-300 hover:border-orange-400',
    particleEmoji: ['🔥', '✨', '🌟'],
    ambientParticleColor: '#fb923c',
    attackMotion: '아기 불꽃 회오리!',
    defeatQuote: '타오르던 장난기가 얌전해졌어요!'
  },
  ice: {
    type: 'ice',
    name: '프로스트 핑구',
    nameEn: 'Frost Pingu',
    element: 'ice',
    tier: 'early',
    title: '얼음 결정 아기 펭귄',
    textureDesc: '투명한 얼음 결정 왕관과 빛나는 다이아몬드 눈송이 질감',
    image3d: '/src/assets/images/monster_ice_3d_1793327267938.jpg',
    themeColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    bgGradient: 'from-sky-100 via-blue-50 to-indigo-100',
    borderClass: 'border-sky-300 hover:border-sky-400',
    particleEmoji: ['❄️', '💎', '✨'],
    ambientParticleColor: '#7dd3fc',
    attackMotion: '반짝이는 눈꽃 아이스!',
    defeatQuote: '꽁꽁 언 마음이 사르르 녹았어요!'
  },
  forest: {
    type: 'forest',
    name: '포레스트 머쉬룸',
    nameEn: 'Forest Mushroom',
    element: 'forest',
    tier: 'mid',
    title: '숲의 버섯 요정',
    textureDesc: '빨간 버섯 갓과 흰 점박이, 싱그러운 덩굴 스카프와 부드러운 이끼 바디',
    image3d: '/src/assets/images/monster_forest_3d_1793327283488.jpg',
    themeColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    bgGradient: 'from-emerald-100 via-lime-50 to-teal-100',
    borderClass: 'border-emerald-300 hover:border-emerald-400',
    particleEmoji: ['🍄', '🍃', '🌱'],
    ambientParticleColor: '#34d399',
    attackMotion: '통통 버섯 포자 댄스!',
    defeatQuote: '숲의 향기를 남기고 착해졌어요!'
  },
  magic: {
    type: 'magic',
    name: '아케인 룬냥이',
    nameEn: 'Arcane Runecat',
    element: 'magic',
    tier: 'mid',
    title: '신비의 별빛 마법냥',
    textureDesc: '신비로운 보석 구슬과 빛나는 별 티아라, 우주를 담은 벨벳 보라빛 털',
    image3d: '/src/assets/images/monster_magic_3d_1793327300713.jpg',
    themeColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    bgGradient: 'from-purple-100 via-violet-50 to-fuchsia-100',
    borderClass: 'border-purple-300 hover:border-purple-400',
    particleEmoji: ['🔮', '✨', '⭐'],
    ambientParticleColor: '#a78bfa',
    attackMotion: '별빛 아케인 오브 발사!',
    defeatQuote: '신비로운 마법으로 정화되었어요!'
  },
  dark: {
    type: 'dark',
    name: '섀도우 드래고니',
    nameEn: 'Shadow Dragoni',
    element: 'dark',
    tier: 'late',
    title: '어둠의 꼬마 드래곤',
    textureDesc: '벨벳 밤하늘빛 비늘과 귀여운 작은 뿔, 반짝이는 황금 눈과 박쥐 날개',
    image3d: '/src/assets/images/monster_dark_3d_1793327313729.jpg',
    themeColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.5)',
    bgGradient: 'from-indigo-100 via-slate-50 to-purple-100',
    borderClass: 'border-indigo-300 hover:border-indigo-400',
    particleEmoji: ['🦇', '🌙', '💜'],
    ambientParticleColor: '#818cf8',
    attackMotion: '날개 파닥 그림자 브레스!',
    defeatQuote: '귀여운 아기 드래곤 친구가 되었어요!'
  },
  electric: {
    type: 'electric',
    name: '볼트 햄찌',
    nameEn: 'Volt Hammy',
    element: 'electric',
    tier: 'late',
    title: '전광석화 썬더 햄찌',
    textureDesc: '빛나는 번개 모양 꼬리와 번쩍이는 전기 볼따구, 복슬복슬 황금 털',
    image3d: '/src/assets/images/monster_elec_3d_1793327326432.jpg',
    themeColor: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.55)',
    bgGradient: 'from-yellow-100 via-amber-50 to-orange-100',
    borderClass: 'border-yellow-400 hover:border-yellow-500',
    particleEmoji: ['⚡', '✨', '💛'],
    ambientParticleColor: '#facc15',
    attackMotion: '짜릿짜릿 백만볼트 스파크!',
    defeatQuote: '찌릿찌릿 기운이 평화로워졌어요!'
  },
  boss: {
    type: 'boss',
    name: '드래곤 킹 (대보스)',
    nameEn: 'Golden Dragon King',
    element: 'boss',
    tier: 'boss',
    title: '황금 왕관 드래곤 킹',
    textureDesc: '화려한 황금 왕관과 수정 뿔, 찬란한 깃털 날개와 눈부신 왕가의 오라',
    image3d: '/src/assets/images/monster_boss_3d_1793327341591.jpg',
    themeColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.75)',
    bgGradient: 'from-amber-200 via-yellow-100 to-amber-300',
    borderClass: 'border-amber-500 hover:border-yellow-400 ring-2 ring-yellow-400',
    particleEmoji: ['👑', '⭐', '✨', '💫'],
    ambientParticleColor: '#fbbf24',
    attackMotion: '대보스의 제왕 오라 충격파!',
    defeatQuote: '대보스 격파! 전설의 왕국 평화를 되찾았습니다!'
  },
  // Backward compatibility aliases
  bat: {
    type: 'bat',
    name: '섀도우 드래고니',
    nameEn: 'Shadow Dragoni',
    element: 'dark',
    tier: 'late',
    title: '어둠의 꼬마 날개몬',
    textureDesc: '귀여운 작은 박쥐 날개와 보랏빛 벨벳 털',
    image3d: '/src/assets/images/monster_dark_3d_1793327313729.jpg',
    themeColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.5)',
    bgGradient: 'from-indigo-100 via-slate-50 to-purple-100',
    borderClass: 'border-indigo-300 hover:border-indigo-400',
    particleEmoji: ['🦇', '🌙', '💜'],
    ambientParticleColor: '#818cf8',
    attackMotion: '날개 파닥 그림자 브레스!',
    defeatQuote: '귀여운 아기 드래곤 친구가 되었어요!'
  },
  rock: {
    type: 'rock',
    name: '프로스트 핑구',
    nameEn: 'Frost Pingu',
    element: 'ice',
    tier: 'early',
    title: '단단한 크리스탈 얼음몬',
    textureDesc: '단단한 결정 보석과 투명한 얼음 뿔',
    image3d: '/src/assets/images/monster_ice_3d_1793327267938.jpg',
    themeColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    bgGradient: 'from-sky-100 via-blue-50 to-indigo-100',
    borderClass: 'border-sky-300 hover:border-sky-400',
    particleEmoji: ['❄️', '💎', '✨'],
    ambientParticleColor: '#7dd3fc',
    attackMotion: '반짝이는 눈꽃 아이스!',
    defeatQuote: '꽁꽁 언 마음이 사르르 녹았어요!'
  },
  jelly: {
    type: 'jelly',
    name: '아쿠아 젤리몬',
    nameEn: 'Aqua Jellymon',
    element: 'slime',
    tier: 'early',
    title: '핑크 젤리 몬스터',
    textureDesc: '투명하고 말랑말랑한 젤리 몸체',
    image3d: '/src/assets/images/monster_slime_3d_1793327241680.jpg',
    themeColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    bgGradient: 'from-pink-100 via-rose-50 to-fuchsia-100',
    borderClass: 'border-pink-300 hover:border-pink-400',
    particleEmoji: ['🫧', '💖', '✨'],
    ambientParticleColor: '#f472b6',
    attackMotion: '물방울 젤리 통통 어택!',
    defeatQuote: '퐁퐁~ 말랑하게 정화되었어요!'
  },
  cyclops: {
    type: 'cyclops',
    name: '아케인 룬냥이',
    nameEn: 'Arcane Runecat',
    element: 'magic',
    tier: 'mid',
    title: '별빛 아케인 몬스터',
    textureDesc: '신비로운 보석과 별빛 룬 문양',
    image3d: '/src/assets/images/monster_magic_3d_1793327300713.jpg',
    themeColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    bgGradient: 'from-purple-100 via-violet-50 to-fuchsia-100',
    borderClass: 'border-purple-300 hover:border-purple-400',
    particleEmoji: ['🔮', '✨', '⭐'],
    ambientParticleColor: '#a78bfa',
    attackMotion: '별빛 아케인 오브 발사!',
    defeatQuote: '신비로운 마법으로 정화되었어요!'
  }
};

/**
 * Returns stage-appropriate monster visual types based on question stage index (0..9)
 * Stage index 0-2 (Stages 1-3): Early monsters (Slime, Flame, Ice)
 * Stage index 3-6 (Stages 4-7): Mid monsters (Forest, Magic, Electric)
 * Stage index 7-8 (Stages 8-9): Late monsters (Dark, Magic, Electric)
 * Stage index 9 (Stage 10): Boss monster! (Golden Dragon King)
 */
export function getMonsterTypeForStage(questionIndex: number, choiceIndex: number): {
  visualType: MonsterVisualType;
  isBoss: boolean;
  tier: MonsterTier;
} {
  // Final stage 10 is ALWAYS Boss battle!
  if (questionIndex >= 9) {
    return { visualType: 'boss', isBoss: true, tier: 'boss' };
  }

  // Stages 1-3: Early tier
  if (questionIndex <= 2) {
    const earlyPool: MonsterVisualType[] = ['slime', 'flame', 'ice'];
    const vType = earlyPool[(questionIndex + choiceIndex) % earlyPool.length];
    return { visualType: vType, isBoss: false, tier: 'early' };
  }

  // Stages 4-7: Mid tier
  if (questionIndex <= 6) {
    const midPool: MonsterVisualType[] = ['forest', 'magic', 'electric', 'flame'];
    const vType = midPool[(questionIndex + choiceIndex) % midPool.length];
    return { visualType: vType, isBoss: false, tier: 'mid' };
  }

  // Stages 8-9: Late tier
  const latePool: MonsterVisualType[] = ['dark', 'magic', 'electric', 'ice'];
  const vType = latePool[(questionIndex + choiceIndex) % latePool.length];
  return { visualType: vType, isBoss: false, tier: 'late' };
}
