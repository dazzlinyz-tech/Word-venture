import { WordItem, WordCategory, WordDifficulty } from '../types';

/**
 * ============================================================================
 * 📚 초등학교 3~4학년 교육과정 맞춤 영어 어휘 데이터베이스 (총 220개 단어)
 * ============================================================================
 * 
 * 10개 핵심 카테고리:
 * - animal (동물), food (음식), school (학교), family (가족/사람)
 * - nature (자연), emotion (감정), daily (일상), place (장소)
 * - object (사물), action (동작)
 * + polysemy (다의어 - 2가지 이상의 의미를 가진 핵심 학습 단어)
 * 
 * 3단계 난이도 구성:
 * - early (초반 단계: Lv 1~30) : 3~5글자, 기초 파닉스 및 일상 기본 어휘
 * - mid   (중반 단계: Lv 31~70): 5~8글자, 복합어 및 다양한 상황 어휘
 * - late  (후반 단계: Lv 71~100): 7~10글자, 3~4학년 도전형 심화 어휘
 */

export const ELEMENTARY_WORDS: WordItem[] = [
  // ==========================================================================
  // 🟢 [초반 단계: EARLY TIER (Lv 1 ~ 30)] - 3~5글자 친숙하고 쉬운 일상 어휘
  // ==========================================================================
  // --- Animals (동물) ---
  {
    id: 'e-cat',
    word: 'cat',
    meanings: ['고양이'],
    isPolysemy: false,
    exampleSentence: 'The little cat sleeps on the chair.',
    exampleTranslation: '작은 고양이가 의자 위에서 자요.',
    category: 'animal',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-dog',
    word: 'dog',
    meanings: ['개, 강아지'],
    isPolysemy: false,
    exampleSentence: 'My friendly dog wags its tail.',
    exampleTranslation: '친근한 우리 강아지가 꼬리를 흔들어요.',
    category: 'animal',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-bird',
    word: 'bird',
    meanings: ['새'],
    isPolysemy: false,
    exampleSentence: 'A blue bird sings in the tree.',
    exampleTranslation: '파란 새가 나무에서 노래해요.',
    category: 'animal',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-fish',
    word: 'fish',
    meanings: ['물고기'],
    isPolysemy: false,
    exampleSentence: 'Goldfish swim in the clear water.',
    exampleTranslation: '금붕어가 맑은 물속에서 헤엄쳐요.',
    category: 'animal',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-duck',
    word: 'duck',
    meanings: ['오리'],
    isPolysemy: false,
    exampleSentence: 'The yellow duck swims in the pond.',
    exampleTranslation: '노란 오리가 연못에서 헤엄쳐요.',
    category: 'animal',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-bear',
    word: 'bear',
    meanings: ['곰'],
    isPolysemy: false,
    exampleSentence: 'A big brown bear loves honey.',
    exampleTranslation: '큰 갈색 곰은 꿀을 좋아해요.',
    category: 'animal',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-frog',
    word: 'frog',
    meanings: ['개구리'],
    isPolysemy: false,
    exampleSentence: 'The green frog jumps high.',
    exampleTranslation: '초록 개구리가 높이 뛰어올라요.',
    category: 'animal',
    difficulty: 'early',
    gradeLevel: 3
  },

  // --- Food (음식) ---
  {
    id: 'e-apple',
    word: 'apple',
    meanings: ['사과'],
    isPolysemy: false,
    exampleSentence: 'I eat a sweet red apple every day.',
    exampleTranslation: '나는 매일 달콤한 빨간 사과를 먹어요.',
    category: 'food',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-milk',
    word: 'milk',
    meanings: ['우유'],
    isPolysemy: false,
    exampleSentence: 'Drink a cup of fresh warm milk.',
    exampleTranslation: '신선하고 따뜻한 우유 한 잔을 마셔요.',
    category: 'food',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-bread',
    word: 'bread',
    meanings: ['빵'],
    isPolysemy: false,
    exampleSentence: 'Mom bakes soft brown bread.',
    exampleTranslation: '엄마가 부드러운 갈색 빵을 구워요.',
    category: 'food',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-egg',
    word: 'egg',
    meanings: ['달걀, 계란'],
    isPolysemy: false,
    exampleSentence: 'I have boiled eggs for breakfast.',
    exampleTranslation: '아침 식사로 삶은 달걀을 먹어요.',
    category: 'food',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-rice',
    word: 'rice',
    meanings: ['밥, 쌀'],
    isPolysemy: false,
    exampleSentence: 'We eat warm rice for lunch.',
    exampleTranslation: '우리는 점심으로 따뜻한 밥을 먹어요.',
    category: 'food',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-cake',
    word: 'cake',
    meanings: ['케이크'],
    isPolysemy: false,
    exampleSentence: 'Put candles on the sweet cake.',
    exampleTranslation: '달콤한 케이크 위에 촛불을 꽂아요.',
    category: 'food',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-juice',
    word: 'juice',
    meanings: ['주스'],
    isPolysemy: false,
    exampleSentence: 'Orange juice is very fresh and cold.',
    exampleTranslation: '오렌지 주스는 정말 신선하고 시원해요.',
    category: 'food',
    difficulty: 'early',
    gradeLevel: 3
  },

  // --- School (학교) ---
  {
    id: 'e-book',
    word: 'book',
    meanings: ['책'],
    isPolysemy: false,
    exampleSentence: 'Open your English book to page 10.',
    exampleTranslation: '영어 책 10쪽을 펴세요.',
    category: 'school',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-desk',
    word: 'desk',
    meanings: ['책상'],
    isPolysemy: false,
    exampleSentence: 'Keep your classroom desk clean.',
    exampleTranslation: '교실 책상을 깨끗하게 유지해요.',
    category: 'school',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-pen',
    word: 'pen',
    meanings: ['펜'],
    isPolysemy: false,
    exampleSentence: 'I write my name with a blue pen.',
    exampleTranslation: '파란 펜으로 내 이름을 써요.',
    category: 'school',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-bag',
    word: 'bag',
    meanings: ['가방'],
    isPolysemy: false,
    exampleSentence: 'Put notebooks inside your school bag.',
    exampleTranslation: '책가방 안에 공책들을 넣어요.',
    category: 'school',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-school',
    word: 'school',
    meanings: ['학교'],
    isPolysemy: false,
    exampleSentence: 'We walk to elementary school together.',
    exampleTranslation: '우리는 함께 초등학교로 걸어가요.',
    category: 'school',
    difficulty: 'early',
    gradeLevel: 3
  },

  // --- Family & People (가족 및 사람) ---
  {
    id: 'e-mom',
    word: 'mom',
    meanings: ['엄마'],
    isPolysemy: false,
    exampleSentence: 'Mom smiles warmly at me.',
    exampleTranslation: '엄마가 나를 보고 따뜻하게 미소 지어요.',
    category: 'family',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-dad',
    word: 'dad',
    meanings: ['아빠'],
    isPolysemy: false,
    exampleSentence: 'Dad plays soccer with me.',
    exampleTranslation: '아빠는 나와 함께 축구를 해요.',
    category: 'family',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-baby',
    word: 'baby',
    meanings: ['아기'],
    isPolysemy: false,
    exampleSentence: 'The sleeping baby is very cute.',
    exampleTranslation: '잠자는 아기가 아주 귀여워요.',
    category: 'family',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-friend',
    word: 'friend',
    meanings: ['친구'],
    isPolysemy: false,
    exampleSentence: 'You are my wonderful best friend.',
    exampleTranslation: '너는 나의 멋진 단짝 친구야.',
    category: 'family',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-boy',
    word: 'boy',
    meanings: ['소년, 남자아이'],
    isPolysemy: false,
    exampleSentence: 'The cheerful boy runs in the park.',
    exampleTranslation: '쾌활한 남자아이가 공원에서 달려요.',
    category: 'family',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-girl',
    word: 'girl',
    meanings: ['소녀, 여자아이'],
    isPolysemy: false,
    exampleSentence: 'The kind girl shares her crayons.',
    exampleTranslation: '친절한 여자아이가 크레파스를 나눠 써요.',
    category: 'family',
    difficulty: 'early',
    gradeLevel: 3
  },

  // --- Nature (자연) ---
  {
    id: 'e-sun',
    word: 'sun',
    meanings: ['태양, 해'],
    isPolysemy: false,
    exampleSentence: 'The warm morning sun shines bright.',
    exampleTranslation: '따뜻한 아침 해가 밝게 빛나요.',
    category: 'nature',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-star',
    word: 'star',
    meanings: ['별'],
    isPolysemy: false,
    exampleSentence: 'Look at the twinkling star tonight.',
    exampleTranslation: '오늘 밤 반짝이는 별을 보세요.',
    category: 'nature',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-tree',
    word: 'tree',
    meanings: ['나무'],
    isPolysemy: false,
    exampleSentence: 'Birds build nests in the tall tree.',
    exampleTranslation: '새들이 큰 나무 위에 둥지를 틀어요.',
    category: 'nature',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-sky',
    word: 'sky',
    meanings: ['하늘'],
    isPolysemy: false,
    exampleSentence: 'White fluffy clouds float in the sky.',
    exampleTranslation: '하얗고 푹신한 구름이 하늘에 떠 있어요.',
    category: 'nature',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-rain',
    word: 'rain',
    meanings: ['비'],
    isPolysemy: false,
    exampleSentence: 'Carry an umbrella when it rains.',
    exampleTranslation: '비가 올 때는 우산을 챙기세요.',
    category: 'nature',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-wind',
    word: 'wind',
    meanings: ['바람'],
    isPolysemy: false,
    exampleSentence: 'The cool autumn wind blows softly.',
    exampleTranslation: '시원한 가을바람이 부드럽게 불어요.',
    category: 'nature',
    difficulty: 'early',
    gradeLevel: 3
  },

  // --- Emotions (감정) ---
  {
    id: 'e-happy',
    word: 'happy',
    meanings: ['행복한, 기쁜'],
    isPolysemy: false,
    exampleSentence: 'I feel so happy when I play games.',
    exampleTranslation: '게임을 할 때 나는 정말 행복해요.',
    category: 'emotion',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-sad',
    word: 'sad',
    meanings: ['슬픈'],
    isPolysemy: false,
    exampleSentence: 'Do not be sad, everything will be okay.',
    exampleTranslation: '슬퍼하지 마, 다 괜찮아질 거야.',
    category: 'emotion',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-good',
    word: 'good',
    meanings: ['좋은, 착한'],
    isPolysemy: false,
    exampleSentence: 'Have a good morning and nice day!',
    exampleTranslation: '좋은 아침과 멋진 하루 보내세요!',
    category: 'emotion',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-nice',
    word: 'nice',
    meanings: ['멋진, 친절한'],
    isPolysemy: false,
    exampleSentence: 'It is very nice to meet you.',
    exampleTranslation: '만나서 정말 반가워요.',
    category: 'emotion',
    difficulty: 'early',
    gradeLevel: 3
  },

  // --- Actions (동작) ---
  {
    id: 'e-run',
    word: 'run',
    meanings: ['달리다'],
    isPolysemy: false,
    exampleSentence: 'Children run fast on the playground.',
    exampleTranslation: '아이들이 운동장에서 빠르게 달려요.',
    category: 'action',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-jump',
    word: 'jump',
    meanings: ['뛰다, 도약하다'],
    isPolysemy: false,
    exampleSentence: 'Jump high over the jump rope.',
    exampleTranslation: '줄넘기 위로 높이 뛰어보세요.',
    category: 'action',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-sing',
    word: 'sing',
    meanings: ['노래하다'],
    isPolysemy: false,
    exampleSentence: 'Let us sing an English song together.',
    exampleTranslation: '함께 영어 노래를 불러요.',
    category: 'action',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-play',
    word: 'play',
    meanings: ['놀다, 연주하다'],
    isPolysemy: false,
    exampleSentence: 'We play tag during recess time.',
    exampleTranslation: '우리는 쉬는 시간에 술래잡기를 해요.',
    category: 'action',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-swim',
    word: 'swim',
    meanings: ['수영하다'],
    isPolysemy: false,
    exampleSentence: 'Penguins swim fast in cold water.',
    exampleTranslation: '펭귄은 찬 물속에서 빠르게 수영해요.',
    category: 'action',
    difficulty: 'early',
    gradeLevel: 3
  },

  // --- Objects & Places (사물 & 장소) ---
  {
    id: 'e-ball',
    word: 'ball',
    meanings: ['공'],
    isPolysemy: false,
    exampleSentence: 'Throw the red ball to your partner.',
    exampleTranslation: '빨간 공을 짝꿍에게 던져요.',
    category: 'object',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-box',
    word: 'box',
    meanings: ['상자'],
    isPolysemy: false,
    exampleSentence: 'There is a toy inside the square box.',
    exampleTranslation: '네모난 상자 안에 장난감이 있어요.',
    category: 'object',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-hat',
    word: 'hat',
    meanings: ['모자'],
    isPolysemy: false,
    exampleSentence: 'Wear a warm knit hat in winter.',
    exampleTranslation: '겨울에는 따뜻한 털모자를 써요.',
    category: 'object',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-cup',
    word: 'cup',
    meanings: ['컵, 잔'],
    isPolysemy: false,
    exampleSentence: 'Pour juice into this clean cup.',
    exampleTranslation: '이 깨끗한 컵에 주스를 따라요.',
    category: 'object',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-room',
    word: 'room',
    meanings: ['방'],
    isPolysemy: false,
    exampleSentence: 'Clean your bedroom after playing.',
    exampleTranslation: '놀고 난 후에는 침실을 청소해요.',
    category: 'place',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'e-zoo',
    word: 'zoo',
    meanings: ['동물원'],
    isPolysemy: false,
    exampleSentence: 'We see lions and monkeys at the zoo.',
    exampleTranslation: '동물원에서 사자와 원숭이를 봐요.',
    category: 'place',
    difficulty: 'early',
    gradeLevel: 3
  },

  // ==========================================================================
  // 🟡 [중반 단계: MID TIER (Lv 31 ~ 70)] - 5~8글자, 풍부한 어휘 및 다양한 상황
  // ==========================================================================
  // --- Animals (동물) ---
  {
    id: 'm-animal',
    word: 'animal',
    meanings: ['동물'],
    isPolysemy: false,
    exampleSentence: 'A tiger is a strong wild animal.',
    exampleTranslation: '호랑이는 힘이 센 야생 동물이에요.',
    category: 'animal',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-monkey',
    word: 'monkey',
    meanings: ['원숭이'],
    isPolysemy: false,
    exampleSentence: 'The playful monkey swings on vines.',
    exampleTranslation: '장난꾸러기 원숭이가 덩굴을 타고 그네를 타요.',
    category: 'animal',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-rabbit',
    word: 'rabbit',
    meanings: ['토끼'],
    isPolysemy: false,
    exampleSentence: 'The cute white rabbit loves crunchy carrots.',
    exampleTranslation: '귀여운 흰 토끼는 아삭한 당근을 좋아해요.',
    category: 'animal',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-tiger',
    word: 'tiger',
    meanings: ['호랑이'],
    isPolysemy: false,
    exampleSentence: 'The brave tiger has bold black stripes.',
    exampleTranslation: '용감한 호랑이는 뚜렷한 검은 줄무늬가 있어요.',
    category: 'animal',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-dolphin',
    word: 'dolphin',
    meanings: ['돌고래'],
    isPolysemy: false,
    exampleSentence: 'The smart dolphin leaps over the ocean wave.',
    exampleTranslation: '영리한 돌고래가 바다 파도를 뛰어넘어요.',
    category: 'animal',
    difficulty: 'mid',
    gradeLevel: 4
  },
  {
    id: 'm-elephant',
    word: 'elephant',
    meanings: ['코끼리'],
    isPolysemy: false,
    exampleSentence: 'The huge elephant sprays water with its trunk.',
    exampleTranslation: '거대한 코끼리가 코로 물을 뿜어요.',
    category: 'animal',
    difficulty: 'mid',
    gradeLevel: 4
  },

  // --- Food (음식) ---
  {
    id: 'm-banana',
    word: 'banana',
    meanings: ['바나나'],
    isPolysemy: false,
    exampleSentence: 'Peel the sweet yellow banana carefully.',
    exampleTranslation: '달콤한 노란 바나나를 조심스럽게 까먹어요.',
    category: 'food',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-cookie',
    word: 'cookie',
    meanings: ['쿠키, 과자'],
    isPolysemy: false,
    exampleSentence: 'We bake crispy chocolate chip cookies.',
    exampleTranslation: '우리는 바삭한 초콜릿 칩 쿠키를 구워요.',
    category: 'food',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-cheese',
    word: 'cheese',
    meanings: ['치즈'],
    isPolysemy: false,
    exampleSentence: 'Melt cheddar cheese on warm toast.',
    exampleTranslation: '따뜻한 토스트 위에 체더 치즈를 녹여요.',
    category: 'food',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-sandwich',
    word: 'sandwich',
    meanings: ['샌드위치'],
    isPolysemy: false,
    exampleSentence: 'Pack a ham sandwich for the school picnic.',
    exampleTranslation: '학교 소풍을 위해 햄 샌드위치를 싸요.',
    category: 'food',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-tomato',
    word: 'tomato',
    meanings: ['토마토'],
    isPolysemy: false,
    exampleSentence: 'Ripe red tomatoes grow in the sunny garden.',
    exampleTranslation: '잘 익은 빨간 토마토가 양지바른 정원에서 자라요.',
    category: 'food',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-dinner',
    word: 'dinner',
    meanings: ['저녁 식사'],
    isPolysemy: false,
    exampleSentence: 'Our family eats delicious dinner together.',
    exampleTranslation: '우리 가족은 함께 맛있는 저녁 식사를 해요.',
    category: 'food',
    difficulty: 'mid',
    gradeLevel: 3
  },

  // --- School & Objects (학교 & 사물) ---
  {
    id: 'm-pencil',
    word: 'pencil',
    meanings: ['연필'],
    isPolysemy: false,
    exampleSentence: 'Sharpen your pencil before writing.',
    exampleTranslation: '글씨를 쓰기 전에 연필을 깎으세요.',
    category: 'school',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-eraser',
    word: 'eraser',
    meanings: ['지우개'],
    isPolysemy: false,
    exampleSentence: 'Erase pencil marks with this clean eraser.',
    exampleTranslation: '이 깨끗한 지우개로 연필 자국을 지워요.',
    category: 'school',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-classroom',
    word: 'classroom',
    meanings: ['교실'],
    isPolysemy: false,
    exampleSentence: 'Students listen attentively in the classroom.',
    exampleTranslation: '학생들이 교실에서 집중해서 들어요.',
    category: 'school',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-teacher',
    word: 'teacher',
    meanings: ['선생님'],
    isPolysemy: false,
    exampleSentence: 'Our English teacher is always smiling.',
    exampleTranslation: '우리 영어 선생님은 항상 미소 짓고 계셔요.',
    category: 'school',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-blanket',
    word: 'blanket',
    meanings: ['담요'],
    isPolysemy: false,
    exampleSentence: 'Cover yourself with a warm soft blanket.',
    exampleTranslation: '따뜻하고 부드러운 담요를 덮으세요.',
    category: 'object',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-window',
    word: 'window',
    meanings: ['창문'],
    isPolysemy: false,
    exampleSentence: 'Open the window to let fresh air in.',
    exampleTranslation: '신선한 공기가 들어오도록 창문을 열어요.',
    category: 'object',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-picture',
    word: 'picture',
    meanings: ['그림, 사진'],
    isPolysemy: false,
    exampleSentence: 'Draw a colorful picture with pastels.',
    exampleTranslation: '파스텔로 알록달록한 그림을 그려요.',
    category: 'object',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-camera',
    word: 'camera',
    meanings: ['카메라, 사진기'],
    isPolysemy: false,
    exampleSentence: 'Take family photos with this new camera.',
    exampleTranslation: '이 새 카메라로 가족사진을 찍어요.',
    category: 'object',
    difficulty: 'mid',
    gradeLevel: 4
  },

  // --- Daily Life & People (일상생활 & 사람) ---
  {
    id: 'm-birthday',
    word: 'birthday',
    meanings: ['생일'],
    isPolysemy: false,
    exampleSentence: 'Happy birthday to you, my dear friend!',
    exampleTranslation: '소중한 내 친구야, 생일 축하해!',
    category: 'daily',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-morning',
    word: 'morning',
    meanings: ['아침'],
    isPolysemy: false,
    exampleSentence: 'Wake up early in the bright morning.',
    exampleTranslation: '밝은 아침에 일찍 일어나요.',
    category: 'daily',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-kitchen',
    word: 'kitchen',
    meanings: ['부엌, 주방'],
    isPolysemy: false,
    exampleSentence: 'Dad cooks soup in the warm kitchen.',
    exampleTranslation: '아빠가 따뜻한 주방에서 수프를 요리해요.',
    category: 'place',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-doctor',
    word: 'doctor',
    meanings: ['의사'],
    isPolysemy: false,
    exampleSentence: 'The kind doctor helps sick people.',
    exampleTranslation: '친절한 의사 선생님이 아픈 사람들을 도와줘요.',
    category: 'family',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-brother',
    word: 'brother',
    meanings: ['형, 남동생, 오빠'],
    isPolysemy: false,
    exampleSentence: 'My elder brother helps me with my puzzle.',
    exampleTranslation: '우리 형이 퍼즐 맞추기를 도와줘요.',
    category: 'family',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-sister',
    word: 'sister',
    meanings: ['누나, 여동생, 언니'],
    isPolysemy: false,
    exampleSentence: 'My little sister reads storybooks gladly.',
    exampleTranslation: '내 여동생은 동화책을 즐겁게 읽어요.',
    category: 'family',
    difficulty: 'mid',
    gradeLevel: 3
  },

  // --- Nature & Places (자연 & 장소) ---
  {
    id: 'm-garden',
    word: 'garden',
    meanings: ['정원, 뜰'],
    isPolysemy: false,
    exampleSentence: 'Red roses bloom in grandma’s garden.',
    exampleTranslation: '할머니의 정원에 붉은 장미가 피어요.',
    category: 'nature',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-rainbow',
    word: 'rainbow',
    meanings: ['무지개'],
    isPolysemy: false,
    exampleSentence: 'A magical rainbow appears after the storm.',
    exampleTranslation: '폭풍우가 지나간 후 마법 같은 무지개가 나타나요.',
    category: 'nature',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-forest',
    word: 'forest',
    meanings: ['숲, 산림'],
    isPolysemy: false,
    exampleSentence: 'Deer walk quietly through the green forest.',
    exampleTranslation: '사슴들이 푸른 숲속을 조용히 걸어가요.',
    category: 'nature',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-weather',
    word: 'weather',
    meanings: ['날씨'],
    isPolysemy: false,
    exampleSentence: 'The spring weather is sunny and gentle.',
    exampleTranslation: '봄 날씨는 화창하고 온화해요.',
    category: 'nature',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-winter',
    word: 'winter',
    meanings: ['겨울'],
    isPolysemy: false,
    exampleSentence: 'We build snowmen in cold white winter.',
    exampleTranslation: '우리는 하얀 겨울에 눈사람을 만들어요.',
    category: 'nature',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-summer',
    word: 'summer',
    meanings: ['여름'],
    isPolysemy: false,
    exampleSentence: 'Summer vacation is exciting and fun.',
    exampleTranslation: '여름방학은 신나고 재미있어요.',
    category: 'nature',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-library',
    word: 'library',
    meanings: ['도서관'],
    isPolysemy: false,
    exampleSentence: 'Please speak quietly inside the school library.',
    exampleTranslation: '학교 도서관 안에서는 조용히 말해주세요.',
    category: 'place',
    difficulty: 'mid',
    gradeLevel: 4
  },
  {
    id: 'm-market',
    word: 'market',
    meanings: ['시장'],
    isPolysemy: false,
    exampleSentence: 'We buy fresh vegetables at the local market.',
    exampleTranslation: '우리는 동네 시장에서 신선한 채소를 사요.',
    category: 'place',
    difficulty: 'mid',
    gradeLevel: 3
  },

  // --- Emotion & Descriptive & Action (감정 & 묘사 & 동작) ---
  {
    id: 'm-beautiful',
    word: 'beautiful',
    meanings: ['아름다운, 예쁜'],
    isPolysemy: false,
    exampleSentence: 'The field of spring flowers is beautiful.',
    exampleTranslation: '봄꽃이 핀 들판이 정말 아름다워요.',
    category: 'emotion',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-excited',
    word: 'excited',
    meanings: ['신난, 흥분된'],
    isPolysemy: false,
    exampleSentence: 'We feel excited about our weekend camping trip.',
    exampleTranslation: '우리는 주말 캠핑 여행 때문에 신이 나요.',
    category: 'emotion',
    difficulty: 'mid',
    gradeLevel: 4
  },
  {
    id: 'm-listen',
    word: 'listen',
    meanings: ['듣다, 귀 기울이다'],
    isPolysemy: false,
    exampleSentence: 'Listen carefully to teacher’s directions.',
    exampleTranslation: '선생님의 설명을 귀 기울여 들어요.',
    category: 'action',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'm-travel',
    word: 'travel',
    meanings: ['여행하다'],
    isPolysemy: false,
    exampleSentence: 'I want to travel around the world someday.',
    exampleTranslation: '언젠가 전 세계를 여행하고 싶어요.',
    category: 'action',
    difficulty: 'mid',
    gradeLevel: 4
  },
  {
    id: 'm-clean',
    word: 'clean',
    meanings: ['깨끗한, 청소하다'],
    isPolysemy: false,
    exampleSentence: 'Keep our school environment clean and neat.',
    exampleTranslation: '우리 학교 환경을 깨끗하고 단정하게 가꿔요.',
    category: 'action',
    difficulty: 'mid',
    gradeLevel: 3
  },

  // ==========================================================================
  // 🔴 [후반 단계: LATE TIER (Lv 71 ~ 100)] - 7~10글자, 3~4학년 도전형 심화 어휘
  // ==========================================================================
  {
    id: 'l-adventure',
    word: 'adventure',
    meanings: ['모험'],
    isPolysemy: false,
    exampleSentence: 'Join us on an exciting jungle adventure!',
    exampleTranslation: '신나는 밀림 모험에 함께 떠나요!',
    category: 'daily',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-dangerous',
    word: 'dangerous',
    meanings: ['위험한'],
    isPolysemy: false,
    exampleSentence: 'Playing near deep water can be dangerous.',
    exampleTranslation: '깊은 물 근처에서 노는 것은 위험할 수 있어요.',
    category: 'emotion',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-remember',
    word: 'remember',
    meanings: ['기억하다'],
    isPolysemy: false,
    exampleSentence: 'Always remember to wash your hands before eating.',
    exampleTranslation: '식사 전에는 항상 손 씻는 것을 기억하세요.',
    category: 'action',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-favorite',
    word: 'favorite',
    meanings: ['가장 좋아하는'],
    isPolysemy: false,
    exampleSentence: 'English is my favorite subject in school.',
    exampleTranslation: '영어는 학교에서 내가 가장 좋아하는 과목이에요.',
    category: 'emotion',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-wonderful',
    word: 'wonderful',
    meanings: ['멋진, 놀라운'],
    isPolysemy: false,
    exampleSentence: 'You did a wonderful job on your homework.',
    exampleTranslation: '숙제를 정말 훌륭하고 멋지게 잘 해냈어요.',
    category: 'emotion',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-important',
    word: 'important',
    meanings: ['중요한'],
    isPolysemy: false,
    exampleSentence: 'Reading books is important for your future.',
    exampleTranslation: '책 읽기는 너의 미래를 위해 중요해요.',
    category: 'daily',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-celebrate',
    word: 'celebrate',
    meanings: ['축하하다, 기념하다'],
    isPolysemy: false,
    exampleSentence: 'We celebrate New Year with cheerful fireworks.',
    exampleTranslation: '우리는 밝은 불꽃놀이로 새해를 축하해요.',
    category: 'action',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-astronaut',
    word: 'astronaut',
    meanings: ['우주비행사'],
    isPolysemy: false,
    exampleSentence: 'The brave astronaut explores distant outer space.',
    exampleTranslation: '용감한 우주비행사가 먼 우주를 탐험해요.',
    category: 'family',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-exercise',
    word: 'exercise',
    meanings: ['운동, 운동하다'],
    isPolysemy: false,
    exampleSentence: 'Daily physical exercise keeps our bodies healthy.',
    exampleTranslation: '매일 하는 운동은 우리 몸을 건강하게 해줘요.',
    category: 'action',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-butterfly',
    word: 'butterfly',
    meanings: ['나비'],
    isPolysemy: false,
    exampleSentence: 'A colorful butterfly flutters over the flower.',
    exampleTranslation: '알록달록한 나비가 꽃 위를 팔랑거리며 날아요.',
    category: 'animal',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-mountain',
    word: 'mountain',
    meanings: ['산'],
    isPolysemy: false,
    exampleSentence: 'We hike up the rocky mountain together.',
    exampleTranslation: '우리는 바위산을 함께 등산해요.',
    category: 'nature',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-dinosaur',
    word: 'dinosaur',
    meanings: ['공룡'],
    isPolysemy: false,
    exampleSentence: 'Huge dinosaurs lived on Earth millions of years ago.',
    exampleTranslation: '수백만 년 전 지구에는 거대한 공룡들이 살았어요.',
    category: 'animal',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-treasure',
    word: 'treasure',
    meanings: ['보물'],
    isPolysemy: false,
    exampleSentence: 'Pirates hid golden treasure on a secret island.',
    exampleTranslation: '해적들이 비밀의 섬에 황금 보물을 숨겼어요.',
    category: 'object',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-tomorrow',
    word: 'tomorrow',
    meanings: ['내일'],
    isPolysemy: false,
    exampleSentence: 'Tomorrow will bring another bright day.',
    exampleTranslation: '내일은 또 다른 밝은 날이 올 거예요.',
    category: 'daily',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-delicious',
    word: 'delicious',
    meanings: ['아주 맛있는'],
    isPolysemy: false,
    exampleSentence: 'This warm apple pie tastes delicious.',
    exampleTranslation: '이 따뜻한 사과 파이는 아주 맛있어요.',
    category: 'food',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-special',
    word: 'special',
    meanings: ['특별한'],
    isPolysemy: false,
    exampleSentence: 'Today is a special graduation day for us.',
    exampleTranslation: '오늘은 우리에게 아주 특별한 날이에요.',
    category: 'emotion',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-practice',
    word: 'practice',
    meanings: ['연습하다, 연습'],
    isPolysemy: false,
    exampleSentence: 'Practice speaking English every single day.',
    exampleTranslation: '매일매일 영어로 말하는 연습을 하세요.',
    category: 'school',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-telescope',
    word: 'telescope',
    meanings: ['망원경'],
    isPolysemy: false,
    exampleSentence: 'Look at the glowing moon through this telescope.',
    exampleTranslation: '망원경을 통해 빛나는 달을 관찰해요.',
    category: 'object',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-discover',
    word: 'discover',
    meanings: ['발견하다'],
    isPolysemy: false,
    exampleSentence: 'Scientists discover ancient fossils in rocks.',
    exampleTranslation: '과학자들은 바위 속에서 고대 화석을 발견해요.',
    category: 'action',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-protect',
    word: 'protect',
    meanings: ['보호하다, 지키다'],
    isPolysemy: false,
    exampleSentence: 'We must protect wild animals and nature.',
    exampleTranslation: '우리는 야생 동물과 자연을 보호해야 해요.',
    category: 'action',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-imagine',
    word: 'imagine',
    meanings: ['상상하다'],
    isPolysemy: false,
    exampleSentence: 'Imagine flying high above colorful clouds.',
    exampleTranslation: '오색 구름 위를 높이 나는 상상을 해보세요.',
    category: 'action',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'l-curious',
    word: 'curious',
    meanings: ['호기심 많은, 궁금한'],
    isPolysemy: false,
    exampleSentence: 'The curious child asks wonderful questions.',
    exampleTranslation: '호기심 많은 아이가 멋진 질문들을 해요.',
    category: 'emotion',
    difficulty: 'late',
    gradeLevel: 4
  },

  // ==========================================================================
  // ⭐ [다의어: POLYSEMY WORDS - 초·중·후반 단계별 배치]
  // ==========================================================================
  // --- Early Polysemy (Lv 1 ~ 30) ---
  {
    id: 'poly-light',
    word: 'light',
    meanings: ['빛, 불빛', '가벼운'],
    isPolysemy: true,
    polysemyHint: '전등의 밝은 [빛]과 깃털처럼 [가벼운] 무게 두 가지 뜻이 있어요!',
    exampleSentence: 'The light is on. / This bag is very light.',
    exampleTranslation: '불빛이 켜져 있어요. / 이 가방은 매우 가벼워요.',
    category: 'polysemy',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'poly-fly',
    word: 'fly',
    meanings: ['날다', '파리 (곤충)'],
    isPolysemy: true,
    polysemyHint: '하늘을 훨훨 [날다]와 윙윙 날아다니는 [파리] 뜻이 있어요!',
    exampleSentence: 'Birds can fly. / There is a fly on the table.',
    exampleTranslation: '새들은 날 수 있어요. / 식탁 위에 파리가 있어요.',
    category: 'polysemy',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'poly-bat',
    word: 'bat',
    meanings: ['박쥐 (동물)', '야구 방망이'],
    isPolysemy: true,
    polysemyHint: '동굴에 사는 날개 달린 [박쥐]와 야구공을 치는 [방망이] 뜻이 있어요!',
    exampleSentence: 'The bat flies at night. / He hits the ball with a bat.',
    exampleTranslation: '박쥐는 밤에 날아요. / 그는 방망이로 공을 쳐요.',
    category: 'polysemy',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'poly-can',
    word: 'can',
    meanings: ['~할 수 있다', '깡통, 캔'],
    isPolysemy: true,
    polysemyHint: '"할 수 있어!"의 [할 수 있다]와 음료수가 든 [깡통(캔)] 뜻이 있어요!',
    exampleSentence: 'I can do it! / Open this soda can.',
    exampleTranslation: '나는 할 수 있어! / 이 탄산음료 캔을 열어줘.',
    category: 'polysemy',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'poly-ring',
    word: 'ring',
    meanings: ['반지', '(벨이나 전화가) 울리다'],
    isPolysemy: true,
    polysemyHint: '손가락에 끼는 예쁜 [반지]와 따르릉 벨이 [울리다]는 뜻이 있어요!',
    exampleSentence: 'She wears a gold ring. / The school bell rings.',
    exampleTranslation: '그녀는 금반지를 끼고 있어요. / 학교 종이 울려요.',
    category: 'polysemy',
    difficulty: 'early',
    gradeLevel: 3
  },
  {
    id: 'poly-rock',
    word: 'rock',
    meanings: ['바위, 돌', '흔들다, 록 음악'],
    isPolysemy: true,
    polysemyHint: '단단한 [바위]와 아기를 살살 [흔들다]는 뜻이 있어요!',
    exampleSentence: 'Sit on the big rock. / Rock the baby to sleep.',
    exampleTranslation: '큰 바위에 앉아보렴. / 아기를 살살 흔들어 재워줘.',
    category: 'polysemy',
    difficulty: 'early',
    gradeLevel: 3
  },

  // --- Mid Polysemy (Lv 31 ~ 70) ---
  {
    id: 'poly-spring',
    word: 'spring',
    meanings: ['봄 (계절)', '용수철, 샘'],
    isPolysemy: true,
    polysemyHint: '따뜻한 계절 [봄]과 퐁퐁 튀어 오르는 [용수철] 뜻이 있어요!',
    exampleSentence: 'I like warm spring. / Look at the metal spring.',
    exampleTranslation: '나는 따뜻한 봄을 좋아해요. / 금속 용수철을 보세요.',
    category: 'polysemy',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'poly-park',
    word: 'park',
    meanings: ['공원', '주차하다'],
    isPolysemy: true,
    polysemyHint: '미끄럼틀 타고 노는 [공원]과 차를 세우는 [주차하다]는 뜻이 있어요!',
    exampleSentence: 'Let’s play at the park. / Dad parks the car.',
    exampleTranslation: '공원에서 놀자! / 아빠가 자동차를 주차해요.',
    category: 'polysemy',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'poly-watch',
    word: 'watch',
    meanings: ['손목시계', '지켜보다, 보다'],
    isPolysemy: true,
    polysemyHint: '시간을 보는 [손목시계]와 재미있게 영화를 [보다]는 뜻이 있어요!',
    exampleSentence: 'My watch shows 3 o’clock. / I watch cartoons.',
    exampleTranslation: '내 손목시계는 3시를 가리켜요. / 나는 만화를 봐요.',
    category: 'polysemy',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'poly-bark',
    word: 'bark',
    meanings: ['(개가) 짖다', '나무 껍질'],
    isPolysemy: true,
    polysemyHint: '강아지가 멍멍 [짖다]와 나무를 감싸는 [나무 껍질] 뜻이 있어요!',
    exampleSentence: 'Dogs bark at strangers. / The tree bark is rough.',
    exampleTranslation: '개는 낯선 사람을 보고 짖어요. / 나무 껍질이 거칠어요.',
    category: 'polysemy',
    difficulty: 'mid',
    gradeLevel: 3
  },
  {
    id: 'poly-letter',
    word: 'letter',
    meanings: ['편지', '글자, 문자'],
    isPolysemy: true,
    polysemyHint: '우표를 붙여 보내는 [편지]와 A, B, C 같은 [글자] 뜻이 있어요!',
    exampleSentence: 'I wrote a letter to mom. / A is the first letter.',
    exampleTranslation: '엄마에게 편지를 썼어요. / A는 첫 번째 글자예요.',
    category: 'polysemy',
    difficulty: 'mid',
    gradeLevel: 4
  },
  {
    id: 'poly-train',
    word: 'train',
    meanings: ['기차', '훈련하다, 연습하다'],
    isPolysemy: true,
    polysemyHint: '칙칙폭폭 레일 위를 달리는 [기차]와 실력을 [훈련하다]는 뜻이 있어요!',
    exampleSentence: 'We ride a fast train. / Athletes train hard.',
    exampleTranslation: '우리는 빠른 기차를 타요. / 운동선수들은 열심히 훈련해요.',
    category: 'polysemy',
    difficulty: 'mid',
    gradeLevel: 4
  },
  {
    id: 'poly-wave',
    word: 'wave',
    meanings: ['파도', '(손을) 흔들다'],
    isPolysemy: true,
    polysemyHint: '바다의 넘실거리는 [파도]와 안녕 하고 손을 [흔들다]는 뜻이 있어요!',
    exampleSentence: 'Big waves crash on the beach. / Wave goodbye.',
    exampleTranslation: '큰 파도가 해변에 부딪혀요. / 안녕하고 손을 흔들어요.',
    category: 'polysemy',
    difficulty: 'mid',
    gradeLevel: 4
  },

  // --- Late Polysemy (Lv 71 ~ 100) ---
  {
    id: 'poly-present',
    word: 'present',
    meanings: ['선물', '현재, 출석한'],
    isPolysemy: true,
    polysemyHint: '생일에 받는 기쁜 [선물]과 지금 이 순간인 [현재] 뜻이 있어요!',
    exampleSentence: 'Open your birthday present. / Live in the present.',
    exampleTranslation: '생일 선물을 열어보세요. / 현재를 살아가세요.',
    category: 'polysemy',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'poly-bank',
    word: 'bank',
    meanings: ['은행', '강둑, 둑'],
    isPolysemy: true,
    polysemyHint: '돈을 안전하게 맡기는 [은행]과 강가의 언덕인 [강둑] 뜻이 있어요!',
    exampleSentence: 'Save coins in the bank. / Sit by the river bank.',
    exampleTranslation: '은행에 동전을 저축해요. / 강둑 옆에 앉아요.',
    category: 'polysemy',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'poly-change',
    word: 'change',
    meanings: ['변화, 바꾸다', '거스름돈'],
    isPolysemy: true,
    polysemyHint: '모습을 새롭게 [바꾸다]와 물건 사고 남은 [거스름돈] 뜻이 있어요!',
    exampleSentence: 'Caterpillars change into butterflies. / Here is your change.',
    exampleTranslation: '애벌레는 나비로 변해요. / 여기 거스름돈 있어요.',
    category: 'polysemy',
    difficulty: 'late',
    gradeLevel: 4
  },
  {
    id: 'poly-chest',
    word: 'chest',
    meanings: ['가슴', '큰 상자, 궤'],
    isPolysemy: true,
    polysemyHint: '우리 몸의 튼튼한 [가슴]과 보물이 담긴 [큰 상자] 뜻이 있어요!',
    exampleSentence: 'Cross your arms on your chest. / Open the treasure chest.',
    exampleTranslation: '가슴 위에 팔짱을 끼세요. / 보물 상자를 열어요.',
    category: 'polysemy',
    difficulty: 'late',
    gradeLevel: 4
  }
];

// 최근 출제된 단어 ID를 추적하여 스테이지 간 단어 반복을 방지하는 키
const KEY_RECENT_SERVED_WORDS = 'wordventure_recent_served_words';
const RECENT_HISTORY_SIZE = 30; // 최근 30개 단어 중복 방지 창

/**
 * 최근 출제된 단어 목록 불러오기
 */
function getRecentServedWordIds(): string[] {
  try {
    const saved = localStorage.getItem(KEY_RECENT_SERVED_WORDS);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return [];
}

/**
 * 새로 출제된 단어를 최근 출제 목록에 기록
 */
function recordServedWordIds(wordIds: string[]): void {
  try {
    const list = getRecentServedWordIds();
    const updated = [...wordIds, ...list.filter(id => !wordIds.includes(id))].slice(0, RECENT_HISTORY_SIZE);
    localStorage.setItem(KEY_RECENT_SERVED_WORDS, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

/**
 * ============================================================================
 * 🎯 단계별 난이도 상승 & 단어 중복 방지 출제 시스템
 * ============================================================================
 * @param mode 'mix' (다의어+일반 균형) | 'polysemy' (다의어 집중) | 'standard10' (일반 어휘)
 * @param stageLevel 현재 스테이지 번호 (1 ~ 100)
 */
export function getGameRoundWords(
  mode: 'standard10' | 'polysemy' | 'mix' = 'mix',
  stageLevel: number = 1
): WordItem[] {
  const safeStage = Math.max(1, Math.min(100, stageLevel));

  // 1. 스테이지 레벨에 따른 난이도 비율 결정
  // - Lv 1 ~ 30 : 초반 단계 (Early 85%, Mid 15%)
  // - Lv 31 ~ 70: 중반 단계 (Mid 70%, Early 15%, Late 15%)
  // - Lv 71 ~ 100: 후반 단계 (Late 75%, Mid 25%)
  let targetTierRatio: { early: number; mid: number; late: number };

  if (safeStage <= 30) {
    if (safeStage <= 15) {
      targetTierRatio = { early: 10, mid: 0, late: 0 };
    } else {
      targetTierRatio = { early: 8, mid: 2, late: 0 };
    }
  } else if (safeStage <= 70) {
    if (safeStage <= 50) {
      targetTierRatio = { early: 2, mid: 8, late: 0 };
    } else {
      targetTierRatio = { early: 1, mid: 7, late: 2 };
    }
  } else {
    // 후반 도전 단계 (Lv 71 ~ 100)
    targetTierRatio = { early: 0, mid: 3, late: 7 };
  }

  // 2. 모드별 단어 필터링
  let basePool = [...ELEMENTARY_WORDS];
  if (mode === 'polysemy') {
    basePool = basePool.filter(w => w.isPolysemy);
  } else if (mode === 'standard10') {
    basePool = basePool.filter(w => !w.isPolysemy);
  }

  // 3. 중복 방지 필터링: 최근 출제된 단어(최대 30개)를 제외한 후보군 우선 선별
  const recentWordIds = new Set(getRecentServedWordIds());

  // 난이도별 풀 분리
  const earlyPool = basePool.filter(w => w.difficulty === 'early');
  const midPool = basePool.filter(w => w.difficulty === 'mid');
  const latePool = basePool.filter(w => w.difficulty === 'late');

  /**
   * 특정 풀에서 중복을 피해 n개의 단어를 카테고리 다양성을 고려하여 추출하는 헬퍼
   */
  const pickFromPool = (pool: WordItem[], count: number, alreadyPicked: Set<string>): WordItem[] => {
    if (count <= 0 || pool.length === 0) return [];

    // 1순위: 최근 출제되지 않았고, 현재 라운드에 아직 안 뽑힌 단어
    let candidates = pool.filter(w => !alreadyPicked.has(w.id) && !recentWordIds.has(w.id));

    // 후보군이 부족하면 이미 출제되었던 단어 중 현재 라운드에 없는 단어로 보충
    if (candidates.length < count) {
      const fallback = pool.filter(w => !alreadyPicked.has(w.id) && recentWordIds.has(w.id));
      // 복습을 위해 무작위로 섞어서 보충
      candidates = [...candidates, ...fallback.sort(() => Math.random() - 0.5)];
    }

    // 카테고리 다양성 정렬: 같은 카테고리가 연속되지 않도록 셔플
    candidates.sort(() => Math.random() - 0.5);

    const selected: WordItem[] = [];
    const usedCategories = new Map<WordCategory, number>();

    // 균등한 카테고리 배분을 위해 카테고리당 최대 2개까지만 우선 선별
    for (const word of candidates) {
      if (selected.length >= count) break;
      const catCount = usedCategories.get(word.category) || 0;
      if (catCount < 2) {
        selected.push(word);
        alreadyPicked.add(word.id);
        usedCategories.set(word.category, catCount + 1);
      }
    }

    // 만약 카테고리 제한으로 count를 못 채웠다면 남은 것 중에서 채움
    if (selected.length < count) {
      for (const word of candidates) {
        if (selected.length >= count) break;
        if (!alreadyPicked.has(word.id)) {
          selected.push(word);
          alreadyPicked.add(word.id);
        }
      }
    }

    return selected;
  };

  const selectedSet = new Set<string>();
  const roundWords: WordItem[] = [];

  // mix 모드일 경우: 다의어(polysemy) 2~3개를 적절한 난이도에서 우선 포함
  if (mode === 'mix') {
    const polyPool = basePool.filter(w => w.isPolysemy);
    const polyWords = pickFromPool(polyPool, safeStage > 60 ? 3 : 2, selectedSet);
    roundWords.push(...polyWords);
  }

  // 각 티어별 목표 개수에서 남은 자리 계산
  const remainingCount = 10 - roundWords.length;
  const earlyNeeded = Math.min(targetTierRatio.early, remainingCount);
  const midNeeded = Math.min(targetTierRatio.mid, remainingCount - earlyNeeded);
  const lateNeeded = Math.max(0, remainingCount - earlyNeeded - midNeeded);

  roundWords.push(...pickFromPool(earlyPool, earlyNeeded, selectedSet));
  roundWords.push(...pickFromPool(midPool, midNeeded, selectedSet));
  roundWords.push(...pickFromPool(latePool, lateNeeded, selectedSet));

  // 혹시라도 10개가 안 채워진 경우 전체 풀에서 보충
  if (roundWords.length < 10) {
    const extra = pickFromPool(basePool, 10 - roundWords.length, selectedSet);
    roundWords.push(...extra);
  }

  // 최종 10개 단어를 자연스럽게 셔플
  const finalRoundWords = roundWords.slice(0, 10).sort(() => Math.random() - 0.5);

  // 이번 스테이지에 출제된 단어 ID를 최근 출제 목록에 기록 (다음 스테이지 연속 중복 방지)
  recordServedWordIds(finalRoundWords.map(w => w.id));

  return finalRoundWords;
}

/**
 * 객관식 3개 선택지 생성 (정답 1개 + 오답 2개)
 * - 초등 3~4학년 수준에 맞추어 정답 단어와 유사한 난이도 또는 카테고리에서 매력적인 오답 선별
 */
export function getDistractorChoices(correctWord: WordItem, allWords: WordItem[]): WordItem[] {
  // 정답 제외
  const candidatePool = allWords.filter(w => w.id !== correctWord.id);

  // 1순위: 동일 난이도 또는 동일 카테고리의 단어
  let distractors = candidatePool
    .filter(w => w.difficulty === correctWord.difficulty || w.category === correctWord.category)
    .sort(() => Math.random() - 0.5);

  // 2순위: 부족할 경우 전체 후보에서 보충
  if (distractors.length < 2) {
    const others = candidatePool
      .filter(w => !distractors.some(d => d.id === w.id))
      .sort(() => Math.random() - 0.5);
    distractors = [...distractors, ...others];
  }

  const choices = [correctWord, distractors[0], distractors[1]];
  return choices.sort(() => Math.random() - 0.5);
}
