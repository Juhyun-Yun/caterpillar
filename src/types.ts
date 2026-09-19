export interface StudentInfo {
  school: string;
  grade: string;
  classNum: string;
  studentNum: string;
  name: string;
  date: string;
}

export interface TransportItem {
  id: string;
  name: string;
  era: 'past' | 'present'; // 옛날 vs 오늘날
  type: 'land' | 'water' | 'air'; // 육상, 해상, 항공
  powerSource: string; // 사람, 동물, 자연(바람/물), 화석연료, 전기/모터
  iconName: string;
  emoji: string;
  description: string;
}

export interface MatchingPair {
  pastId: string;
  presentId: string;
}

export interface BlankQuestion {
  id: number;
  prefix: string;
  answer: string;
  suffix: string;
  explanation: string;
}

export interface OXQuiz {
  id: number;
  question: string;
  answer: boolean;
  explanation: string;
}

export interface ChosungQuiz {
  id: number;
  chosung: string;
  hint: string;
  answer: string;
  explanation: string;
}

export interface FutureVehicleDesign {
  name: string;
  energyType: string;
  features: string[];
  drawingDataUrl?: string;
  creatorPromise: string;
}
