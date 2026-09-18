import { WordItem } from '../types';

export const ELEMENTARY_WORDS: WordItem[] = [
  // --- 2개 이상의 뜻을 가진 단어 (Polysemy Words - 핵심 학습 목표!) ---
  {
    id: 'poly-light',
    word: 'light',
    meanings: ['빛, 불빛', '가벼운'],
    isPolysemy: true,
    polysemyHint: '전등의 밝은 [빛]과 깃털처럼 [가벼운] 무게 두 가지 뜻이 있어요!',
    exampleSentence: 'The light is on. / This bag is very light.',
    exampleTranslation: '불빛이 켜져 있어요. / 이 가방은 매우 가벼워요.',
    category: 'polysemy'
  },
  {
    id: 'poly-spring',
    word: 'spring',
    meanings: ['봄 (계절)', '용수철, 샘'],
    isPolysemy: true,
    polysemyHint: '따뜻한 계절 [봄]과 퐁퐁 튀어 오르는 [용수철] 뜻이 있어요!',
    exampleSentence: 'I like warm spring. / Look at the metal spring.',
    exampleTranslation: '나는 따뜻한 봄을 좋아해요. / 금속 용수철을 보세요.',
    category: 'polysemy'
  },
  {
    id: 'poly-fly',
    word: 'fly',
    meanings: ['날다', '파리 (곤충)'],
    isPolysemy: true,
    polysemyHint: '하늘을 훨훨 [날다]와 윙윙 날아다니는 [파리] 뜻이 있어요!',
    exampleSentence: 'Birds can fly. / There is a fly on the table.',
    exampleTranslation: '새들은 날 수 있어요. / 식탁 위에 파리가 있어요.',
    category: 'polysemy'
  },
  {
    id: 'poly-bat',
    word: 'bat',
    meanings: ['박쥐 (동물)', '야구 방망이'],
    isPolysemy: true,
    polysemyHint: '동굴에 사는 날개 달린 [박쥐]와 야구공을 치는 [방망이] 뜻이 있어요!',
    exampleSentence: 'The bat flies at night. / He hits the ball with a bat.',
    exampleTranslation: '박쥐는 밤에 날아요. / 그는 방망이로 공을 쳐요.',
    category: 'polysemy'
  },
  {
    id: 'poly-book',
    word: 'book',
    meanings: ['책', '예약하다'],
    isPolysemy: true,
    polysemyHint: '우리가 읽는 재미있는 [책]과 비행기나 식당을 [예약하다]는 뜻이 있어요!',
    exampleSentence: 'I read an English book. / We book a train ticket.',
    exampleTranslation: '나는 영어 책을 읽어요. / 우리는 기차표를 예약해요.',
    category: 'polysemy'
  },
  {
    id: 'poly-ring',
    word: 'ring',
    meanings: ['반지', '(벨이나 전화가) 울리다'],
    isPolysemy: true,
    polysemyHint: '손가락에 끼는 예쁜 [반지]와 따르릉 벨이 [울리다]는 뜻이 있어요!',
    exampleSentence: 'She wears a gold ring. / The school bell rings.',
    exampleTranslation: '그녀는 금반지를 끼고 있어요. / 학교 종이 울려요.',
    category: 'polysemy'
  },
  {
    id: 'poly-park',
    word: 'park',
    meanings: ['공원', '주차하다'],
    isPolysemy: true,
    polysemyHint: '미끄럼틀 타고 노는 [공원]과 차를 세우는 [주차하다]는 뜻이 있어요!',
    exampleSentence: 'Let’s play at the park. / Dad parks the car.',
    exampleTranslation: '공원에서 놀자! / 아빠가 자동차를 주차해요.',
    category: 'polysemy'
  },
  {
    id: 'poly-watch',
    word: 'watch',
    meanings: ['손목시계', '지켜보다, 보다'],
    isPolysemy: true,
    polysemyHint: '시간을 보는 [손목시계]와 재미있게 영화를 [보다]는 뜻이 있어요!',
    exampleSentence: 'My watch shows 3 o’clock. / I watch cartoons.',
    exampleTranslation: '내 손목시계는 3시를 가리켜요. / 나는 만화를 봐요.',
    category: 'polysemy'
  },
  {
    id: 'poly-can',
    word: 'can',
    meanings: ['~할 수 있다', '깡통, 캔'],
    isPolysemy: true,
    polysemyHint: '"할 수 있어!"의 [할 수 있다]와 음료수가 든 [깡통(캔)] 뜻이 있어요!',
    exampleSentence: 'I can do it! / Open this soda can.',
    exampleTranslation: '나는 할 수 있어! / 이 탄산음료 캔을 열어줘.',
    category: 'polysemy'
  },
  {
    id: 'poly-rock',
    word: 'rock',
    meanings: ['바위, 돌', '흔들다, 록 음악'],
    isPolysemy: true,
    polysemyHint: '단단한 [바위]와 아기를 살살 [흔들다]는 뜻이 있어요!',
    exampleSentence: 'Sit on the big rock. / Rock the baby to sleep.',
    exampleTranslation: '큰 바위에 앉아보렴. / 아기를 살살 흔들어 재워줘.',
    category: 'polysemy'
  },
  {
    id: 'poly-bark',
    word: 'bark',
    meanings: ['(개가) 짖다', '나무 껍질'],
    isPolysemy: true,
    polysemyHint: '강아지가 멍멍 [짖다]와 나무를 감싸는 [나무 껍질] 뜻이 있어요!',
    exampleSentence: 'Dogs bark at strangers. / The tree bark is rough.',
    exampleTranslation: '개는 낯선 사람을 보고 짖어요. / 나무 껍질이 거칠어요.',
    category: 'polysemy'
  },
  {
    id: 'poly-letter',
    word: 'letter',
    meanings: ['편지', '글자, 문자'],
    isPolysemy: true,
    polysemyHint: '우표를 붙여 보내는 [편지]와 A, B, C 같은 [글자] 뜻이 있어요!',
    exampleSentence: 'I wrote a letter to mom. / A is the first letter.',
    exampleTranslation: '엄마에게 편지를 썼어요. / A는 첫 번째 글자예요.',
    category: 'polysemy'
  },

  // --- 초등 저학년 필수 기본 단어 (CEFR A1 Core Words) ---
  {
    id: 'core-apple',
    word: 'apple',
    meanings: ['사과'],
    isPolysemy: false,
    exampleSentence: 'I eat a sweet red apple.',
    exampleTranslation: '나는 달콤한 빨간 사과를 먹어요.',
    category: 'daily'
  },
  {
    id: 'core-friend',
    word: 'friend',
    meanings: ['친구'],
    isPolysemy: false,
    exampleSentence: 'You are my best friend.',
    exampleTranslation: '너는 나의 가장 친한 친구야.',
    category: 'daily'
  },
  {
    id: 'core-water',
    word: 'water',
    meanings: ['물'],
    isPolysemy: false,
    exampleSentence: 'Please drink clean water.',
    exampleTranslation: '깨끗한 물을 마시세요.',
    category: 'daily'
  },
  {
    id: 'core-happy',
    word: 'happy',
    meanings: ['행복한, 기쁜'],
    isPolysemy: false,
    exampleSentence: 'Today is a happy day!',
    exampleTranslation: '오늘은 행복한 날이에요!',
    category: 'daily'
  },
  {
    id: 'core-school',
    word: 'school',
    meanings: ['학교'],
    isPolysemy: false,
    exampleSentence: 'We go to school together.',
    exampleTranslation: '우리는 함께 학교에 가요.',
    category: 'daily'
  },
  {
    id: 'core-star',
    word: 'star',
    meanings: ['별'],
    isPolysemy: false,
    exampleSentence: 'Look at the bright star in the sky.',
    exampleTranslation: '밤하늘의 밝은 별을 보세요.',
    category: 'nature'
  },
  {
    id: 'core-family',
    word: 'family',
    meanings: ['가족'],
    isPolysemy: false,
    exampleSentence: 'I love my lovely family.',
    exampleTranslation: '나는 사랑스러운 우리 가족을 사랑해요.',
    category: 'daily'
  },
  {
    id: 'core-rainbow',
    word: 'rainbow',
    meanings: ['무지개'],
    isPolysemy: false,
    exampleSentence: 'Seven colors in the rainbow.',
    exampleTranslation: '무지개 속의 일곱 가지 색깔.',
    category: 'nature'
  },
  {
    id: 'core-rabbit',
    word: 'rabbit',
    meanings: ['토끼'],
    isPolysemy: false,
    exampleSentence: 'The cute white rabbit hops.',
    exampleTranslation: '귀여운 흰 토끼가 깡총깡총 뛰어요.',
    category: 'nature'
  },
  {
    id: 'core-sun',
    word: 'sun',
    meanings: ['태양, 해'],
    isPolysemy: false,
    exampleSentence: 'The morning sun is warm.',
    exampleTranslation: '아침 해가 따스해요.',
    category: 'nature'
  }
];

// Helper to get 10 questions for a game round
export function getGameRoundWords(mode: 'standard10' | 'polysemy' | 'mix' = 'mix'): WordItem[] {
  let pool: WordItem[] = [];

  if (mode === 'polysemy') {
    pool = [...ELEMENTARY_WORDS.filter(w => w.isPolysemy)];
  } else if (mode === 'standard10') {
    pool = [...ELEMENTARY_WORDS.filter(w => !w.isPolysemy)];
  } else {
    // mix: guarantees at least 4 polysemic words and 6 core words
    const poly = [...ELEMENTARY_WORDS.filter(w => w.isPolysemy)].sort(() => Math.random() - 0.5);
    const core = [...ELEMENTARY_WORDS.filter(w => !w.isPolysemy)].sort(() => Math.random() - 0.5);
    pool = [...poly.slice(0, 5), ...core.slice(0, 5)];
  }

  // Shuffle the pool
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  // Return exactly 10 words (or up to 10)
  return shuffled.slice(0, 10);
}

// Generate 3 choices (1 correct + 2 distractors) for a target word
export function getDistractorChoices(correctWord: WordItem, allWords: WordItem[]): WordItem[] {
  const others = allWords.filter(w => w.id !== correctWord.id).sort(() => Math.random() - 0.5);
  const choices = [correctWord, others[0], others[1]];
  return choices.sort(() => Math.random() - 0.5);
}
