import { TransportItem, BlankQuestion, OXQuiz, ChosungQuiz } from '../types';

export const PAST_TRANSPORTS: TransportItem[] = [
  {
    id: 'p1',
    name: '가마',
    era: 'past',
    type: 'land',
    powerSource: '사람의 힘',
    iconName: 'UserCheck',
    emoji: '🏮',
    description: '사람들이 양쪽에서 어깨에 메고 걸어가는 이동 수단이에요.'
  },
  {
    id: 'p2',
    name: '소달구지 (달구지)',
    era: 'past',
    type: 'land',
    powerSource: '동물의 힘 (소)',
    iconName: 'Boxes',
    emoji: '🐂',
    description: '소가 무거운 짐과 사람을 싣고 끌던 수레예요.'
  },
  {
    id: 'p3',
    name: '뗏목과 돛단배',
    era: 'past',
    type: 'water',
    powerSource: '자연의 힘 (바람, 물결)',
    iconName: 'Sailboat',
    emoji: '⛵',
    description: '통나무를 엮거나 천으로 돛을 달아 물길을 따라 이동했어요.'
  },
  {
    id: 'p4',
    name: '말과 나귀',
    era: 'past',
    type: 'land',
    powerSource: '동물의 힘',
    iconName: 'Sparkles',
    emoji: '🐎',
    description: '먼 길을 빠르게 가거나 편지를 전할 때 탔어요.'
  }
];

export const PRESENT_TRANSPORTS: TransportItem[] = [
  {
    id: 'm1',
    name: '전기 승용차 / 택시',
    era: 'present',
    type: 'land',
    powerSource: '전기 배터리 / 모터',
    iconName: 'Car',
    emoji: '🚗',
    description: '매연이 적고 전기로 부드럽게 달리는 편리한 자동차예요.'
  },
  {
    id: 'm2',
    name: '화물 트럭',
    era: 'present',
    type: 'land',
    powerSource: '엔진 (디젤/수소)',
    iconName: 'Truck',
    emoji: '🚚',
    description: '무거운 짐을 전국 곳곳으로 하루 만에 배송해요.'
  },
  {
    id: 'm3',
    name: '고속 여객선 (크루즈)',
    era: 'present',
    type: 'water',
    powerSource: '대형 선박 엔진',
    iconName: 'Ship',
    emoji: '🛳️',
    description: '수천 명의 사람과 자동차를 싣고 바다를 안전하게 건너요.'
  },
  {
    id: 'm4',
    name: '고속철도 (KTX/SRT)',
    era: 'present',
    type: 'land',
    powerSource: '전기 고속 모터',
    iconName: 'Train',
    emoji: '🚄',
    description: '시속 300km가 넘는 속도로 서울에서 부산까지 2시간대에 가요.'
  },
  {
    id: 'm5',
    name: '비행기 (여객기)',
    era: 'present',
    type: 'air',
    powerSource: '제트 제트엔진',
    iconName: 'Plane',
    emoji: '✈️',
    description: '하늘을 날아 지구 반대편 나라까지 빠르게 갈 수 있어요.'
  }
];

export const MATCHING_KEY: Record<string, string> = {
  p1: 'm1', // 가마 -> 승용차/택시
  p2: 'm2', // 소달구지 -> 화물 트럭
  p3: 'm3', // 뗏목/돛단배 -> 여객선
  p4: 'm4', // 말 -> 고속철도
};

export const BLANK_WORD_BANK = [
  '반일 생활권',
  '신선한',
  '지구촌',
  '교류',
  '환경 오염'
];

export const BLANK_QUESTIONS: BlankQuestion[] = [
  {
    id: 1,
    prefix: '1. 고속철도와 고속도로가 발달하여 전국 어디든 4~5시간 안에 오갈 수 있는 ( ',
    answer: '반일 생활권',
    suffix: ' )이 가능해졌습니다.',
    explanation: '하루의 반나절(4~5시간)이면 전국 어디든 이동할 수 있는 생활 범위를 뜻해요.'
  },
  {
    id: 2,
    prefix: '2. 냉장 트럭과 고속 배송 덕분에 제주도나 바닷가의 수산물을 식탁에서 ( ',
    answer: '신선한',
    suffix: ' ) 상태로 맛있게 먹을 수 있게 되었습니다.',
    explanation: '빠른 교통수단 덕분에 상하기 쉬운 음식도 원래의 싱싱함을 유지할 수 있어요.'
  },
  {
    id: 3,
    prefix: '3. 비행기로 다른 나라를 빠르게 오가며 전 세계가 하나의 마을처럼 가까워진 ( ',
    answer: '지구촌',
    suffix: ' ) 시대를 살아가고 있습니다.',
    explanation: '지구 전체가 이웃 마을처럼 서로 긴밀하게 연결되었다는 뜻의 단어예요.'
  },
  {
    id: 4,
    prefix: '4. 서로 다른 지역 간에 농산물과 공산품을 사고팔며 사람들의 ( ',
    answer: '교류',
    suffix: ' )가 훨씬 더 활발해졌습니다.',
    explanation: '지역이나 나라 사이에 물건이나 문화를 서로 주고받는 것을 말해요.'
  },
  {
    id: 5,
    prefix: '5. 하지만 자동차가 급증하면서 교통체증뿐만 아니라 매연과 소음으로 인한 ( ',
    answer: '환경 오염',
    suffix: ' ) 문제가 나타나 대중교통 이용이 중요해졌습니다.',
    explanation: '교통수단 발달에 따른 문제점을 극복하기 위해 친환경 교통수단 개발이 필요해요.'
  }
];

export const OX_QUIZZES: OXQuiz[] = [
  {
    id: 1,
    question: '옛날의 교통수단은 주로 사람이나 동물의 힘, 또는 바람이나 물결 같은 자연의 힘을 이용했다.',
    answer: true,
    explanation: '맞아요! 옛날에는 엔진이나 전기가 없어 사람(가마, 지게), 동물(소, 말), 자연(돛단배, 뗏목)을 이용했어요.'
  },
  {
    id: 2,
    question: '교통수단이 발달하면서 먼 거리를 이동할 때 걸리는 시간은 옛날보다 훨씬 더 늘어났다.',
    answer: false,
    explanation: '틀려요! 교통수단이 발전하면서 이동 시간은 며칠~몇 달에서 몇 시간으로 크게 단축되었어요.'
  },
  {
    id: 3,
    question: '오늘날의 고속철도와 비행기는 날씨와 지형의 영향을 옛날 교통수단보다 적게 받는다.',
    answer: true,
    explanation: '맞아요! 튼튼한 기술과 정밀한 시스템 덕분에 눈이나 비, 험한 산길의 영향을 훨씬 덜 받아요.'
  },
  {
    id: 4,
    question: '교통수단이 발달하면 우리 생활에 좋은 점만 있고 문제점이나 환경 문제는 전혀 생기지 않는다.',
    answer: false,
    explanation: '틀려요! 매연, 소음, 온실가스 배출, 교통사고, 도로 혼잡 등의 문제점이 함께 발생하여 해결 노력이 필요해요.'
  }
];

export const CHOSUNG_QUIZZES: ChosungQuiz[] = [
  {
    id: 1,
    chosung: 'ㄱ ㅁ',
    hint: '옛날에 높은 양반이나 신부가 타고 사람이 어깨에 메고 나르던 이동 수단',
    answer: '가마',
    explanation: '사람의 힘으로 메고 걷던 옛날의 대표적인 육상 교통수단이에요.'
  },
  {
    id: 2,
    chosung: 'ㄱ ㅅ ㅊ ㄷ',
    hint: '시속 300km 이상으로 빠르고 안전하게 전국을 잇는 기차 (KTX, SRT 등)',
    answer: '고속철도',
    explanation: '전국을 일일/반일 생활권으로 만들어준 현대의 고속 열차 시스템이에요.'
  },
  {
    id: 3,
    chosung: 'ㅎ ㅇ ㅍ ㄹ ㅍ',
    hint: '진공 튜브 속을 음속에 가까운 속도로 달리는 미래형 초고속 열차',
    answer: '하이퍼루프',
    explanation: '공기 저항을 없앤 진공 터널 속을 자기부상으로 날아가듯 달리는 미래 교통수단이에요.'
  }
];

export const FUTURE_ENERGY_OPTIONS = [
  { id: 'solar', label: '태양광 에너지 ☀️', desc: '햇빛을 모아 깨끗한 전기를 만들어요' },
  { id: 'hydrogen', label: '수소 에너지 💧', desc: '물을 분해해 얻은 수소로 물방울만 배출해요' },
  { id: 'wind', label: '공기 & 풍력 🌬️', desc: '바람과 공기 압력을 추진력으로 삼아요' },
  { id: 'magnet', label: '초전도 자기부상 🧲', desc: '공중에 떠서 마찰 없이 음속으로 달려요' },
  { id: 'ai', label: 'AI 인공지능 자율운항 🤖', desc: '사고 없이 안전하게 목적지까지 안내해요' },
];
