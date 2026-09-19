import React from 'react';
import { BLANK_QUESTIONS, BLANK_WORD_BANK } from '../data/worksheetData';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface Activity2FillBlanksProps {
  answers: Record<number, string>;
  onAnswerChange: (id: number, value: string) => void;
  isTeacherMode: boolean;
  showResults: boolean;
}

export const Activity2FillBlanks: React.FC<Activity2FillBlanksProps> = ({
  answers,
  onAnswerChange,
  isTeacherMode,
  showResults,
}) => {
  const [activeBlankId, setActiveBlankId] = React.useState<number>(1);

  const handleWordChipClick = (word: string) => {
    if (activeBlankId) {
      onAnswerChange(activeBlankId, word);
      // automatically move to next empty blank
      const nextId = BLANK_QUESTIONS.find(
        (q) => q.id > activeBlankId && (!answers[q.id] || answers[q.id].trim() === '')
      )?.id;
      if (nextId) setActiveBlankId(nextId);
    }
  };

  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-6 print-card">
      {/* Activity Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-amber-500 text-white font-black text-sm flex items-center justify-center">
            2
          </span>
          <h2 className="text-lg font-bold text-slate-800">
            [활동 2] 빈칸 쏙쏙! 교통수단의 발달로 달라진 우리 생활
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
          배점: 25점 (각 5점)
        </span>
      </div>

      <p className="text-xs md:text-sm text-slate-600 mb-4">
        아래 &lt;보기&gt;의 알맞은 낱말을 찾아 각 문장의 빈칸에 알맞게 넣어 완성해 보세요.
      </p>

      {/* Word Bank Box */}
      <div className="mb-5 p-3.5 bg-amber-50/70 border border-amber-300 rounded-xl">
        <div className="text-xs font-bold text-amber-900 mb-2 flex items-center gap-1">
          <span>&lt; 보기 &gt; (클릭하면 선택된 빈칸에 쏙 들어갑니다!)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {BLANK_WORD_BANK.map((word) => {
            const isUsed = Object.values(answers).includes(word);
            return (
              <button
                key={word}
                type="button"
                onClick={() => handleWordChipClick(word)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  isUsed
                    ? 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                    : 'bg-white text-amber-950 border-amber-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 shadow-xs active:scale-95'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3.5">
        {BLANK_QUESTIONS.map((q) => {
          const userAns = (answers[q.id] || '').trim();
          const isCorrect = userAns === q.answer;
          const isActive = activeBlankId === q.id;

          return (
            <div
              key={q.id}
              onClick={() => setActiveBlankId(q.id)}
              className={`p-3 rounded-xl border transition-colors ${
                isActive ? 'bg-amber-50/40 border-amber-400' : 'bg-slate-50/50 border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm leading-relaxed text-slate-800">
                <div className="flex-1 flex flex-wrap items-center gap-1.5">
                  <span>{q.prefix}</span>
                  <div className="relative inline-flex items-center">
                    <input
                      id={`blank-input-${q.id}`}
                      type="text"
                      value={userAns}
                      onFocus={() => setActiveBlankId(q.id)}
                      onChange={(e) => onAnswerChange(q.id, e.target.value)}
                      placeholder="단어 입력"
                      className={`font-bold px-2 py-0.5 text-center text-sm rounded border-b-2 transition-all outline-none min-w-[120px] ${
                        isTeacherMode
                          ? 'border-red-500 text-red-600 bg-red-50'
                          : showResults
                          ? isCorrect
                            ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                            : 'border-rose-500 text-rose-700 bg-rose-50'
                          : 'border-amber-400 bg-white focus:bg-amber-50 focus:border-amber-600'
                      }`}
                    />
                  </div>
                  <span>{q.suffix}</span>
                </div>

                {/* Feedback Icons */}
                {showResults && (
                  <div className="shrink-0 flex items-center gap-1 text-xs">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> 정답!
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-600 font-bold">
                        <XCircle className="w-4 h-4" /> 오답
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Teacher Mode or Post-Check Explanation */}
              {(isTeacherMode || (showResults && !isCorrect)) && (
                <div className="mt-2 text-xs text-rose-700 bg-rose-50/80 p-2 rounded-lg border border-rose-200 flex items-start gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold mr-1">[정답: {q.answer}]</span>
                    <span>{q.explanation}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
