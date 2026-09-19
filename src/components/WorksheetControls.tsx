import React, { useState } from 'react';
import { Printer, CheckSquare, Eye, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface WorksheetControlsProps {
  onPrint: () => void;
  onGrade: () => void;
  onReset: () => void;
  isTeacherMode: boolean;
  onToggleTeacherMode: () => void;
  showResults: boolean;
}

export const WorksheetControls: React.FC<WorksheetControlsProps> = ({
  onPrint,
  onGrade,
  onReset,
  isTeacherMode,
  onToggleTeacherMode,
  showResults,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleReadGuide = () => {
    if (!('speechSynthesis' in window)) {
      alert('사용하시는 브라우저가 음성 읽기를 지원하지 않습니다.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const text = 
      '초등학교 3학년 사회, 교통수단의 발달 활동지입니다. ' +
      '옛날에는 가마나 소달구지처럼 사람이나 동물의 힘, 자연의 힘을 이용했지만, ' +
      '오늘날에는 자동차, 고속철도, 비행기처럼 엔진과 전기의 힘을 이용합니다. ' +
      '활동을 차례대로 풀고 미래의 멋진 교통수단도 상상해 보세요!';

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  return (
    <div className="no-print sticky top-3 z-30 mb-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-200 shadow-md flex flex-wrap items-center justify-between gap-2.5">
      {/* Left side actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrint}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 text-white rounded-xl text-xs md:text-sm font-bold hover:bg-slate-900 transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <Printer className="w-4 h-4 text-amber-300" />
          <span>학습지 인쇄 (A4) / PDF 저장</span>
        </button>

        <button
          type="button"
          onClick={onToggleTeacherMode}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
            isTeacherMode
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>{isTeacherMode ? '학생 풀이 모드로' : '선생님용 정답 모드'}</span>
        </button>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleReadGuide}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            isPlayingAudio
              ? 'bg-indigo-600 text-white border-indigo-600 animate-pulse'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50 hover:text-indigo-600'
          }`}
          title="친절한 학습 음성 안내"
        >
          {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-indigo-500" />}
          <span>{isPlayingAudio ? '듣기 중지' : '음성 안내'}</span>
        </button>

        <button
          type="button"
          onClick={onGrade}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs md:text-sm font-black hover:from-emerald-700 hover:to-teal-700 transition-all shadow-sm cursor-pointer active:scale-95"
        >
          <CheckSquare className="w-4 h-4" />
          <span>{showResults ? '점수 다시 확인' : '채점하기 & 도장 받기'}</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          title="새로 풀기 (입력 초기화)"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
