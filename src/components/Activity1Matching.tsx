import React from 'react';
import { PAST_TRANSPORTS, PRESENT_TRANSPORTS, MATCHING_KEY } from '../data/worksheetData';
import { ArrowRight, CheckCircle2, XCircle, Zap, Users, Info } from 'lucide-react';
import { GamaIcon } from './GamaIcon';
import { OxCartIcon } from './OxCartIcon';

interface Activity1MatchingProps {
  userMatches: Record<string, string>; // pastId -> presentId
  onMatch: (pastId: string, presentId: string) => void;
  isTeacherMode: boolean;
  showResults: boolean;
}

export const Activity1Matching: React.FC<Activity1MatchingProps> = ({
  userMatches,
  onMatch,
  isTeacherMode,
  showResults,
}) => {
  const [selectedPastId, setSelectedPastId] = React.useState<string | null>(null);

  const handleSelectPast = (id: string) => {
    setSelectedPastId(id === selectedPastId ? null : id);
  };

  const handleSelectPresent = (presentId: string) => {
    if (selectedPastId) {
      onMatch(selectedPastId, presentId);
      setSelectedPastId(null);
    }
  };

  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-6 print-card">
      {/* Activity Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
            1
          </span>
          <h2 className="text-lg font-bold text-slate-800">
            [활동 1] 옛날과 오늘날의 교통수단 짝짓기 & 동력 비교하기
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
          배점: 20점 (각 5점)
        </span>
      </div>

      <p className="text-xs md:text-sm text-slate-600 mb-4 flex items-start gap-1.5">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <span>
          옛날의 교통수단과 그 역할을 이어받아 오늘날 발달한 교통수단을 알맞게 짝지어 보세요.
          <span className="text-emerald-700 font-semibold ml-1">
            (왼쪽 옛날 수단을 누른 뒤 오른쪽의 오늘날 수단을 누르거나 선택하세요)
          </span>
        </span>
      </p>

      {/* Concept Comparison Box (Curriculum essential) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-start gap-2 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200">
          <Users className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-900 block text-sm">옛날의 동력 (움직이는 힘)</span>
            <p className="text-slate-700 mt-0.5">
              주로 <strong className="text-amber-800">사람의 힘(두 발, 어깨)</strong>이나 <strong className="text-amber-800">동물의 힘(소, 말)</strong>, 
              바람과 물결 같은 <strong className="text-amber-800">자연의 힘</strong>을 이용했어요. 속도가 느리고 지형이나 날씨의 영향을 많이 받았어요.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 bg-blue-50/80 p-2.5 rounded-lg border border-blue-200">
          <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-blue-900 block text-sm">오늘날의 동력 (움직이는 힘)</span>
            <p className="text-slate-700 mt-0.5">
              <strong className="text-blue-800">엔진, 모터, 전기 배터리</strong> 등 기계의 힘을 이용해요. 
              힘이 세고 훨씬 빠르며, 날씨와 험한 지형의 영향을 적게 받아 먼 곳도 안전하게 갈 수 있어요.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Matching Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Left: Past Transports */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-center font-bold text-xs text-amber-800 bg-amber-100 py-1 rounded-md mb-2">
            📜 옛날의 교통수단 (누르고 선택)
          </div>
          {PAST_TRANSPORTS.map((past) => {
            const isSelected = selectedPastId === past.id;
            const currentMatch = userMatches[past.id];
            const matchedPresent = PRESENT_TRANSPORTS.find((p) => p.id === currentMatch);
            const isCorrect = MATCHING_KEY[past.id] === currentMatch;
            const targetAnswer = PRESENT_TRANSPORTS.find((p) => p.id === MATCHING_KEY[past.id]);

            return (
              <div
                key={past.id}
                onClick={() => handleSelectPast(past.id)}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-left relative ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-200'
                    : currentMatch
                    ? 'border-slate-300 bg-white hover:border-slate-400'
                    : 'border-dashed border-amber-300 bg-amber-50/30 hover:border-amber-400'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center shrink-0 w-9 h-8">
                      {past.id === 'p1' ? (
                        <GamaIcon className="w-8 h-8" />
                      ) : past.id === 'p2' ? (
                        <OxCartIcon className="w-9 h-8" />
                      ) : (
                        <span className="text-2xl leading-none">{past.emoji}</span>
                      )}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        {past.name}
                        <span className="text-[10px] font-normal px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
                          {past.powerSource}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{past.description}</p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  {showResults && currentMatch && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </div>
                  )}
                </div>

                {/* Connected Pair Badge */}
                {currentMatch && matchedPresent && (
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">연결됨:</span>
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
                      {matchedPresent.emoji} {matchedPresent.name}
                      <ArrowRight className="w-3 h-3 text-blue-400" />
                    </span>
                  </div>
                )}

                {/* Teacher Mode Answer Reveal */}
                {(isTeacherMode || (showResults && !isCorrect)) && targetAnswer && (
                  <div className="mt-2 text-[11px] font-bold text-red-600 bg-red-50 p-1.5 rounded border border-red-200">
                    [정답]: {targetAnswer.emoji} {targetAnswer.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Center: Connect Guide Arrow */}
        <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center text-slate-400 text-xs text-center py-4">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-slate-600 font-bold">
            VS
          </div>
          <span className="text-[11px] font-medium text-slate-500">역할 계승 & 발달</span>
          <ArrowRight className="w-5 h-5 text-emerald-500 mt-1 animate-pulse" />
        </div>

        {/* Right: Modern Transports */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-center font-bold text-xs text-blue-800 bg-blue-100 py-1 rounded-md mb-2">
            🚀 오늘날의 교통수단 (짝을 눌러 연결)
          </div>
          {PRESENT_TRANSPORTS.slice(0, 4).map((present) => {
            const isConnected = Object.values(userMatches).includes(present.id);

            return (
              <div
                key={present.id}
                onClick={() => handleSelectPresent(present.id)}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer text-left ${
                  selectedPastId
                    ? 'hover:border-emerald-500 hover:bg-emerald-50/40 border-dashed border-blue-300 bg-blue-50/20'
                    : isConnected
                    ? 'border-blue-300 bg-blue-50/30'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{present.emoji}</span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        {present.name}
                        <span className="text-[10px] font-normal px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800">
                          {present.powerSource}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">{present.description}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white font-semibold shrink-0 transition-colors"
                  >
                    연결하기
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clean Print Fallback View (shows neat line-matching table on paper) */}
      <div className="hidden print:block mt-4 pt-3 border-t border-slate-300 text-xs">
        <div className="text-slate-600 font-bold mb-2">
          [인쇄용 줄 긋기]: 왼쪽의 옛날 교통수단과 알맞은 오늘날의 교통수단을 자를 대고 곧게 이어 보세요.
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            {PAST_TRANSPORTS.map((p, i) => (
              <div key={p.id} className="border border-slate-300 p-2 rounded flex justify-between items-center">
                <span>{i + 1}. {p.name} ({p.powerSource})</span>
                <span className="w-2.5 h-2.5 rounded-full border border-black inline-block"></span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {PRESENT_TRANSPORTS.slice(0, 4).map((p, i) => (
              <div key={p.id} className="border border-slate-300 p-2 rounded flex justify-between items-center">
                <span className="w-2.5 h-2.5 rounded-full border border-black inline-block"></span>
                <span>({String.fromCharCode(65 + i)}) {p.name} ({p.powerSource})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
