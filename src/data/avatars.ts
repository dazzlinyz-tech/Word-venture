import { AvatarId, AvatarInfo } from '../types';

export const AVATARS: Record<AvatarId, AvatarInfo> = {
  leo: {
    id: 'leo',
    name: '레오 (Leo)',
    title: '용감한 아기사자 기사',
    tagline: '정의의 황금 망토를 두른 용기백배 사자!',
    emoji: '🦁',
    themeColor: '#f59e0b',
    bgGradient: 'from-amber-400 to-orange-500',
    cheerMsg: '으르렁! 힘내, 조금만 더 맞추면 탈출할 수 있어!',
    rescueMsg: '우와아! 네 덕분에 10마리 워드 몬스터를 모두 물리치고 구출되었어! 정말 최고야, 고마워 친구야! 🦁✨',
    requiredLevel: 1,
    reward: {
      id: 'reward-leo-sword',
      name: '황금 용기의 검 & 방패',
      description: '용감하게 몬스터를 물리친 최고의 기사에게만 주어지는 빛나는 황금 사자 무구 세트!',
      iconType: 'sword',
      emoji: '⚔️',
      quote: '사자 기사의 용기 있는 마음이 깃든 황금 검과 방패를 선물할게!'
    }
  },
  mina: {
    id: 'mina',
    name: '미나 (Mina)',
    title: '꼬마 모험 탐험가',
    tagline: '나침반과 돋보기로 비밀을 파헤치는 명탐정!',
    emoji: '👧',
    themeColor: '#ec4899',
    bgGradient: 'from-pink-400 to-rose-500',
    cheerMsg: '대단해! 네가 영단어를 맞출 때마다 몬스터가 물러나고 있어!',
    rescueMsg: '야호! 구해줘서 정말 고마워! 너처럼 멋진 영어 영웅과 함께라면 어떤 모험도 두렵지 않아! 💖🎒',
    requiredLevel: 1,
    reward: {
      id: 'reward-mina-map',
      name: '전설의 황금 보물지도 & 비밀 나침반',
      description: '세상 모든 숨겨진 지혜와 보물을 찾아낼 수 있는 신비로운 탐험가의 양피지 지도!',
      iconType: 'map',
      emoji: '🗺️',
      quote: '모험가의 소중한 보물지도와 나침반을 선물할게! 다음 모험도 함께 떠나자!'
    }
  },
  tori: {
    id: 'tori',
    name: '토리 (Tori)',
    title: '별빛 아기 마법사',
    tagline: '신비한 마법 지팡이로 별빛 마법을 부리는 요정!',
    emoji: '🧙',
    themeColor: '#8b5cf6',
    bgGradient: 'from-purple-400 to-indigo-600',
    cheerMsg: '반짝반짝! 마법 같은 실력이야, 계속 몬스터를 공격해줘!',
    rescueMsg: '마법처럼 날 구해줬구나! 감사의 별빛 마법을 가득 선물할게! 고마워 최고야! 🌟🪄',
    requiredLevel: 1,
    reward: {
      id: 'reward-tori-wand',
      name: '신비의 별빛 요술봉',
      description: '은하수 별가루로 만들어져 어둠을 환하게 밝히고 몬스터를 착하게 정화하는 마법 요술봉!',
      iconType: 'wand',
      emoji: '🪄',
      quote: '내 소중한 별빛 요술봉을 너에게 줄게! 반짝이는 마법의 힘을 느껴봐!'
    }
  },
  pupu: {
    id: 'pupu',
    name: '푸푸 (Pupu)',
    title: '아기 불꽃 드래곤',
    tagline: '따스한 용기의 불꽃을 뿜는 귀여운 수호 드래곤!',
    emoji: '🐲',
    themeColor: '#ef4444',
    bgGradient: 'from-red-400 to-rose-600',
    cheerMsg: '쿠아앙! 내 불꽃 브레스보다 네 영어 실력이 훨씬 더 강력해!',
    rescueMsg: '푸푸를 구해줘서 정말 고마워! 이제 든든한 드래곤 친구가 되어 평생 지켜줄게! 🔥🐉',
    requiredLevel: 11, // 10레벨 돌파 시 해금
    reward: {
      id: 'reward-pupu-orb',
      name: '용의 불꽃 여의주 (드래곤 오브)',
      description: '푸푸의 가슴속 따뜻한 불꽃과 끝없는 에너지가 응축된 찬란한 붉은 수정 구슬!',
      iconType: 'orb',
      emoji: '🔮',
      quote: '드래곤의 가장 소중한 보물인 불꽃 여의주야! 너의 모험을 항상 비춰줄 거야!'
    }
  },
  robi: {
    id: 'robi',
    name: '로비 (Robi)',
    title: '천재 발명로봇',
    tagline: '번개 에너지로 무엇이든 뚝딱 고쳐내는 꼬마 로봇!',
    emoji: '🤖',
    themeColor: '#0284c7',
    bgGradient: 'from-cyan-400 to-blue-600',
    cheerMsg: '삐리삐리! 완벽한 계산이야, 몬스터의 방어막이 파괴되고 있어!',
    rescueMsg: '삐리릭! 시스템 복구 완료! 너의 뛰어난 두뇌에 진심으로 감탄했어, 고마워 파트너! ⚡🔩',
    requiredLevel: 21, // 20레벨 돌파 시 해금 (Lv.21)
    reward: {
      id: 'reward-robi-wrench',
      name: '황금 번개 스패너 & 볼트',
      description: '천재적인 영감과 무한한 전기를 공급하여 무엇이든 조립하고 수리하는 만능 도구!',
      iconType: 'wrench',
      emoji: '⚡',
      quote: '최고의 파트너에게 내 보물 1호 황금 번개 스패너를 수여할게! 치익~ 최고야!'
    }
  },
  luna: {
    id: 'luna',
    name: '루나 (Luna)',
    title: '달빛 연금술사 토끼',
    tagline: '달빛 이슬을 모아 신비한 마법 물약을 빚는 숲의 요정!',
    emoji: '🐰',
    themeColor: '#10b981',
    bgGradient: 'from-emerald-400 to-teal-600',
    cheerMsg: '깡총깡총! 네 정답 덕분에 달빛 마법 물약이 완성되고 있어!',
    rescueMsg: '달빛 숲을 함께 지켜줘서 고마워! 반짝이는 달빛 마법을 언제나 선물할게! 🌿✨',
    requiredLevel: 31, // 30레벨 돌파 시 해금 (Lv.31)
    reward: {
      id: 'reward-luna-potion',
      name: '신비의 달빛 무지개 물약',
      description: '모든 피로를 씻어내고 영원한 집중력을 불어넣는 숲속 전설의 달빛 물약!',
      iconType: 'potion',
      emoji: '🧪',
      quote: '루나가 정성껏 빚은 달빛 물약이야! 마시면 영단어가 쏙쏙 기억날 거야!'
    }
  },
  chichi: {
    id: 'chichi',
    name: '치치 (Chichi)',
    title: '장난꾸러기 다람쥐 궁수',
    tagline: '도토리 황금 종을 울리며 숲을 수호하는 쾌속 다람쥐!',
    emoji: '🐿️',
    themeColor: '#ea580c',
    bgGradient: 'from-orange-400 to-amber-600',
    cheerMsg: '찌르르! 도토리 화살보다 네 단어 실력이 백배는 빠르고 정확해!',
    rescueMsg: '야호! 숲의 영웅이 나타났다! 맛있는 황금 도토리를 가득 나눌게, 최고야! 🌰🎯',
    requiredLevel: 41, // 40레벨 돌파 시 해금 (Lv.41)
    reward: {
      id: 'reward-chichi-bell',
      name: '황금 도토리 수호 방울',
      description: '어떤 위험도 미리 감지하고 숲속 동물들을 지켜주는 황금빛 청아한 방울!',
      iconType: 'bell',
      emoji: '🔔',
      quote: '딸랑딸랑~ 숲을 울리는 행운의 황금 방울이야! 널 든든히 지켜줄게!'
    }
  },
  kaya: {
    id: 'kaya',
    name: '카야 (Kaya)',
    title: '푸른 바람의 그리핀',
    tagline: '하늘 구름 위를 가르며 순풍을 불어넣는 하늘의 수호자!',
    emoji: '🦅',
    themeColor: '#3b82f6',
    bgGradient: 'from-blue-400 to-indigo-600',
    cheerMsg: '끼에엑! 날카로운 눈빛과 엄청난 단어 실력이야, 몬스터가 도망쳐!',
    rescueMsg: '푸른 하늘 끝까지 너와 함께 비행하고 싶어! 최고의 영어 챔피언, 멋져! 🪶☁️',
    requiredLevel: 61, // 60레벨 돌파 시 해금 (Lv.61)
    reward: {
      id: 'reward-kaya-feather',
      name: '바람의 폭풍 깃털 펜',
      description: '구름 위를 날아오르듯 막힘없이 영어 문장을 써내려가게 돕는 신비의 깃털 펜!',
      iconType: 'feather',
      emoji: '🪶',
      quote: '그리핀의 가장 굳센 날개 깃털이야! 어떤 도전 앞에서도 당당히 날아올라!'
    }
  },
  coco: {
    id: 'coco',
    name: '코코 (Coco)',
    title: '북극 오로라 꼬마 곰',
    tagline: '얼음 수정구 속에 오로라의 빛을 담고 다니는 귀염둥이 북극곰!',
    emoji: '🐻‍❄️',
    themeColor: '#06b6d4',
    bgGradient: 'from-cyan-400 to-teal-500',
    cheerMsg: '쿠웅! 차가운 몬스터도 네 따스한 열정 앞에서는 얼어붙어!',
    rescueMsg: '포근포근~ 널 만나서 정말 행복해! 영원한 얼음 나라 친구가 되어줄게! ❄️🤍',
    requiredLevel: 81, // 80레벨 돌파 시 해금 (Lv.81)
    reward: {
      id: 'reward-coco-crystal',
      name: '영원한 오로라 빙하 수정',
      description: '신비로운 칠색 오로라 빛깔을 뿜어내며 마음을 평온하게 해주는 마법 얼음 수정!',
      iconType: 'crystal',
      emoji: '💎',
      quote: '북극의 밤하늘을 수놓은 오로라 조각이야! 네 꿈처럼 찬란하게 빛나!'
    }
  },
  sol: {
    id: 'sol',
    name: '솔 (Sol)',
    title: '태양의 전설 피닉스 (마스터)',
    tagline: '100레벨의 시련을 모두 돌파한 자만이 만날 수 있는 태양의 불새!',
    emoji: '👑',
    themeColor: '#f43f5e',
    bgGradient: 'from-rose-500 via-amber-500 to-yellow-400',
    cheerMsg: '화려한 태양의 빛이여! 워드벤처의 모든 영단어를 완벽히 정복했다!',
    rescueMsg: '경배하라! 100레벨을 돌파하고 워드벤처의 모든 동료를 모은 진정한 대마스터! 온 세상이 너의 영광을 찬양하리라! 👑☀️🌟',
    requiredLevel: 100, // 100레벨 최종 해금!
    reward: {
      id: 'reward-sol-crown',
      name: '태양의 영원한 마스터 황금 관',
      description: '100단계 최대 레벨을 정복하고 모든 캐릭터를 해제한 위대한 영웅에게 수여되는 최고 존귀의 관!',
      iconType: 'crown',
      emoji: '👑',
      quote: '그대야말로 워드벤처의 진정한 전설! 이 영원한 황금 관의 주인이 될 자격이 있도다!'
    }
  }
};
