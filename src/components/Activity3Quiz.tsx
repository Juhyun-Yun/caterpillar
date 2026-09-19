import React from 'react';
import { OX_QUIZZES, CHOSUNG_QUIZZES } from '../data/worksheetData';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

interface Activity3QuizProps {
  oxAnswers: Record<number, boolean | null>;
  onOxChange: (id: number, val: boolean) => void;
  chosungAnswers: Record<number, string>;
  onChosungChange: (id: number, val: string) => void;
  isTeacherMode: boolean;
  showResults: boolean;
}

export const Activity3Quiz: React.FC<Activity3QuizProps> = ({
  oxAnswers,
  onOxChange,
  chosungAnswers,
  onChosungChange,
  isTeacherMode,
  showResults,
}) => {
  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-6 print-card">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-sm flex items-center justify-center">
            3
          </span>
          <h2 className="text-lg font-bold text-slate-800">
            [활동 3] 알쏭달쏭 OX 퀴즈 & 초성 퀴즈
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
          배점: 30점 (OX 15점 + 초성 15점)
        </span>
      </div>

      {/* Part A: OX Quiz */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-indigo-950 flex items-center gap-1.5 mb-3">
          <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-xs">Part A</span>
          문장을 읽고 맞으면 O, 틀리면 X를 골라보세요.
        </h3>

        <div className="space-y-3">
          {OX_QUIZZES.map((quiz) => {
            const userChoice = oxAnswers[quiz.id];
            const isAnswered = userChoice !== undefined && userChoice !== null;
            const isCorrect = userChoice === quiz.answer;

            return (
              <div
                key={quiz.id}
                className="p-3 bg-slate-50/70 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs md:text-sm"
              >
                <div className="flex items-start gap-2 flex-1">
                  <span className="font-bold text-indigo-700 shrink-0 mt-0.5">{quiz.id}번.</span>
                  <p className="text-slate-800 leading-relaxed">{quiz.question}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => onOxChange(quiz.id, true)}
                    className={`w-9 h-9 rounded-xl font-black text-base flex items-center justify-center transition-all cursor-pointer ${
                      userChoice === true
                        ? 'bg-blue-600 text-white shadow-xs scale-105'
                        : 'bg-white text-blue-600 border border-slate-300 hover:bg-blue-50'
                    }`}
                  >
                    O
                  </button>
                  <button
                    type="button"
                    onClick={() => onOxChange(quiz.id, false)}
                    className={`w-9 h-9 rounded-xl font-black text-base flex items-center justify-center transition-all cursor-pointer ${
                      userChoice === false
                        ? 'bg-rose-600 text-white shadow-xs scale-105'
                        : 'bg-white text-rose-600 border border-slate-300 hover:bg-rose-50'
                    }`}
                  >
                    X
                  </button>

                  {/* Result badge */}
                  {showResults && isAnswered && (
                    <div className="ml-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </div>
                  )}
                </div>

                {/* Teacher Explanation */}
                {(isTeacherMode || (showResults && !isCorrect)) && (
                  <div className="w-full text-xs text-indigo-900 bg-indigo-50 p-2 rounded-md mt-1 border border-indigo-200">
                    <span className="font-bold text-red-600 mr-1">
                      [정답: {quiz.answer ? 'O' : 'X'}]
                    </span>
                    {quiz.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Part B: Chosung Quiz */}
      <div>
        <h3 className="text-sm font-bold text-indigo-950 flex items-center gap-1.5 mb-3">
          <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-xs">Part B</span>
          초성을 보고 힌트를 읽은 뒤 어떤 교통수단인지 적어보세요.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CHOSUNG_QUIZZES.map((q) => {
            const userText = (chosungAnswers[q.id] || '').trim();
            const isCorrect = userText === q.answer;

            return (
              <div
                key={q.id}
                className="p-3.5 bg-gradient-to-b from-indigo-50/40 to-slate-50 border border-indigo-200 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-indigo-600">문제 {q.id}</span>
                    <span className="px-2 py-0.5 bg-indigo-600 text-white font-black text-sm tracking-widest rounded-md">
                      {q.chosung}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    💡 <strong className="text-slate-700">힌트:</strong> {q.hint}
                  </p>
                </div>

                <div className="mt-2">
                  <div className="flex items-center gap-1.5">
                    <input
                      id={`chosung-input-${q.id}`}
                      type="text"
                      placeholder="단어 입력"
                      value={userText}
                      onChange={(e) => onChosungChange(q.id, e.target.value)}
                      className={`w-full text-center font-bold px-2 py-1.5 text-sm rounded-lg border outline-none transition-all ${
                        isTeacherMode
                          ? 'border-red-400 bg-red-50 text-red-700'
                          : showResults
                          ? isCorrect
                            ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                            : 'border-rose-400 bg-rose-50 text-rose-700'
                          : 'border-slate-300 bg-white focus:border-indigo-500'
                      }`}
                    />
                    {showResults && (
                      <div className="shrink-0">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {(isTeacherMode || (showResults && !isCorrect)) && (
                    <div className="mt-2 text-[11px] text-red-600 bg-red-50 p-1.5 rounded border border-red-200">
                      <strong>[정답]:</strong> {q.answer}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
