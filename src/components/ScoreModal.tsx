import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, Sparkles, X } from 'lucide-react';

interface ScoreBreakdown {
  act1: number;
  act2: number;
  act3: number;
  act4: number;
  total: number;
}

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  scores: ScoreBreakdown;
  studentName: string;
}

export const ScoreModal: React.FC<ScoreModalProps> = ({
  isOpen,
  onClose,
  scores,
  studentName,
}) => {
  useEffect(() => {
    if (isOpen) {
      // celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // graceful ignore if confetti fails
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const displayName = studentName.trim() || '우리 3학년 친구';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-amber-300 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badge */}
        <div className="text-center mb-4">
          <div className="inline-flex p-3 bg-amber-100 text-amber-600 rounded-full mb-2">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-slate-900">
            {displayName}, 활동을 멋지게 마쳤어요!
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            초등학교 3학년 사회: 교통수단의 발달 활동 결과표
          </p>
        </div>

        {/* Score Stamp Display */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-dashed border-amber-400 rounded-2xl p-4 text-center mb-5">
          <span className="text-xs font-bold text-amber-700 block mb-1">최종 종합 점수</span>
          <div className="text-4xl font-black text-rose-600 tracking-tight">
            {scores.total} <span className="text-xl font-bold text-slate-700">/ 100점</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-extrabold text-amber-800 border border-amber-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {scores.total >= 90
              ? '🌟 최고의 교통 탐구 박사!'
              : scores.total >= 70
              ? '👍 참 잘했어요! 사회 실력이 쑥쑥!'
              : '🌱 조금만 더 다듬으면 100점이에요!'}
          </div>
        </div>

        {/* Breakdown List */}
        <div className="space-y-2 mb-5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <div className="flex justify-between items-center">
            <span>[활동 1] 옛날과 오늘날 교통수단 짝짓기</span>
            <span className="font-bold text-emerald-700">{scores.act1} / 20점</span>
          </div>
          <div className="flex justify-between items-center">
            <span>[활동 2] 빈칸 쏙쏙! 달라진 우리 생활</span>
            <span className="font-bold text-amber-700">{scores.act2} / 25점</span>
          </div>
          <div className="flex justify-between items-center">
            <span>[활동 3] 알쏭달쏭 OX & 초성 퀴즈</span>
            <span className="font-bold text-indigo-700">{scores.act3} / 30점</span>
          </div>
          <div className="flex justify-between items-center">
            <span>[활동 4] 미래 교통수단 발명 연구소</span>
            <span className="font-bold text-purple-700">{scores.act4} / 25점</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          학습지로 돌아가기
        </button>
      </div>
    </div>
  );
};
