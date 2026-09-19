import React from 'react';
import { StudentInfo } from '../types';
import { BookOpen, Sparkles, Award } from 'lucide-react';

interface HeaderInfoProps {
  info: StudentInfo;
  onChange: (key: keyof StudentInfo, val: string) => void;
  score: { earned: number; total: number } | null;
  isTeacherMode: boolean;
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
  info,
  onChange,
  score,
  isTeacherMode,
}) => {
  return (
    <header className="border-b-2 border-dashed border-amber-300 pb-5 mb-6">
      {/* Top Banner & Grade Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold tracking-wide shadow-xs">
            <BookOpen className="w-3.5 h-3.5" />
            초등 3학년 사회
          </span>
          <span className="text-xs md:text-sm font-semibold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md">
            2단원 우리가 알아보는 이동과 소통
          </span>
          {isTeacherMode && (
            <span className="text-xs font-bold text-red-600 bg-red-100 border border-red-300 px-2 py-0.5 rounded-full animate-pulse">
              [선생님 지도용 정답 모드]
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>활동 주제: 옛날과 오늘날의 교통수단 비교 및 미래 상상하기</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <span>🚗 슝슝! 교통수단의 발달 탐구 활동지</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            옛날과 오늘날 교통수단의 특징을 비교하고, 우리 생활이 어떻게 달라졌는지 함께 알아봐요!
          </p>
        </div>

        {/* Teacher Evaluation / Score Stamp Box */}
        <div className="flex items-center gap-3">
          <div className="border-2 border-dashed border-amber-400 bg-amber-50/70 rounded-xl p-2.5 text-center min-w-[130px] relative">
            <span className="text-[11px] font-bold text-amber-700 block">선생님 확인 & 칭찬</span>
            {score !== null ? (
              <div className="mt-0.5 flex flex-col items-center">
                <span className="text-lg font-black text-rose-600 tracking-tight">
                  {score.earned} / {score.total} 점
                </span>
                <span className="text-[10px] text-amber-800 font-semibold flex items-center gap-0.5">
                  <Award className="w-3 h-3 text-amber-600" />
                  {score.earned === score.total ? '최고예요! 완벽해요 🌟' : '참 잘했어요! 👍'}
                </span>
              </div>
            ) : (
              <div className="text-slate-400 text-xs py-1 flex items-center justify-center gap-1">
                <span>( 도장 꾹 💮 )</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Identification Table */}
      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
        <label className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="text-slate-500 whitespace-nowrap">학교:</span>
          <input
            id="student-school"
            type="text"
            placeholder="OO초등학교"
            value={info.school}
            onChange={(e) => onChange('school', e.target.value)}
            className="w-full bg-white px-2 py-1 rounded border border-slate-300 focus:outline-none focus:border-amber-500 font-semibold"
          />
        </label>

        <label className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="text-slate-500 whitespace-nowrap">학년:</span>
          <input
            id="student-grade"
            type="text"
            placeholder="3"
            value={info.grade}
            onChange={(e) => onChange('grade', e.target.value)}
            className="w-full bg-white px-2 py-1 rounded border border-slate-300 focus:outline-none focus:border-amber-500 font-semibold text-center"
          />
        </label>

        <label className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="text-slate-500 whitespace-nowrap">반:</span>
          <input
            id="student-class"
            type="text"
            placeholder="1"
            value={info.classNum}
            onChange={(e) => onChange('classNum', e.target.value)}
            className="w-full bg-white px-2 py-1 rounded border border-slate-300 focus:outline-none focus:border-amber-500 font-semibold text-center"
          />
        </label>

        <label className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="text-slate-500 whitespace-nowrap">번호:</span>
          <input
            id="student-number"
            type="text"
            placeholder="15"
            value={info.studentNum}
            onChange={(e) => onChange('studentNum', e.target.value)}
            className="w-full bg-white px-2 py-1 rounded border border-slate-300 focus:outline-none focus:border-amber-500 font-semibold text-center"
          />
        </label>

        <label className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="text-slate-500 whitespace-nowrap">이름:</span>
          <input
            id="student-name"
            type="text"
            placeholder="홍길동"
            value={info.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full bg-white px-2 py-1 rounded border border-slate-300 focus:outline-none focus:border-amber-500 font-bold text-slate-900"
          />
        </label>

        <label className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="text-slate-500 whitespace-nowrap">날짜:</span>
          <input
            id="student-date"
            type="text"
            value={info.date}
            onChange={(e) => onChange('date', e.target.value)}
            className="w-full bg-white px-2 py-1 rounded border border-slate-300 focus:outline-none focus:border-amber-500 font-medium text-center"
          />
        </label>
      </div>
    </header>
  );
};
