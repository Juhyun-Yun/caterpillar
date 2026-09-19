/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudentInfo, FutureVehicleDesign } from './types';
import { HeaderInfo } from './components/HeaderInfo';
import { Activity1Matching } from './components/Activity1Matching';
import { Activity2FillBlanks } from './components/Activity2FillBlanks';
import { Activity3Quiz } from './components/Activity3Quiz';
import { Activity4Drawing } from './components/Activity4Drawing';
import { WorksheetControls } from './components/WorksheetControls';
import { ScoreModal } from './components/ScoreModal';
import { MATCHING_KEY, BLANK_QUESTIONS, OX_QUIZZES, CHOSUNG_QUIZZES } from './data/worksheetData';
import { Heart, Compass, Sparkles } from 'lucide-react';

export default function App() {
  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  })();

  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    school: '',
    grade: '3',
    classNum: '',
    studentNum: '',
    name: '',
    date: todayStr,
  });

  const [userMatches, setUserMatches] = useState<Record<string, string>>({});
  const [blankAnswers, setBlankAnswers] = useState<Record<number, string>>({});
  const [oxAnswers, setOxAnswers] = useState<Record<number, boolean | null>>({});
  const [chosungAnswers, setChosungAnswers] = useState<Record<number, string>>({});

  const [futureDesign, setFutureDesign] = useState<FutureVehicleDesign>({
    name: '',
    energyType: 'solar',
    features: ['', '', ''],
    drawingDataUrl: '',
    creatorPromise: '',
  });

  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  // Handlers
  const handleInfoChange = (key: keyof StudentInfo, val: string) => {
    setStudentInfo((prev) => ({ ...prev, [key]: val }));
  };

  const handleMatch = (pastId: string, presentId: string) => {
    setUserMatches((prev) => {
      const next = { ...prev };
      // if already assigned to another, reassign
      next[pastId] = presentId;
      return next;
    });
  };

  const handleBlankAnswerChange = (id: number, val: string) => {
    setBlankAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleOxAnswerChange = (id: number, val: boolean) => {
    setOxAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleChosungAnswerChange = (id: number, val: string) => {
    setChosungAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleFutureDesignChange = (key: keyof FutureVehicleDesign, val: any) => {
    setFutureDesign((prev) => ({ ...prev, [key]: val }));
  };

  // Grading calculation
  const calculateScores = () => {
    // Act 1: 4 pairs, 5 pts each = 20 pts
    let act1 = 0;
    Object.entries(MATCHING_KEY).forEach(([pastId, correctPresentId]) => {
      if (userMatches[pastId] === correctPresentId) {
        act1 += 5;
      }
    });

    // Act 2: 5 blanks, 5 pts each = 25 pts
    let act2 = 0;
    BLANK_QUESTIONS.forEach((q) => {
      const userText = (blankAnswers[q.id] || '').trim().replace(/\s+/g, ' ');
      const targetText = q.answer.trim().replace(/\s+/g, ' ');
      if (userText === targetText) {
        act2 += 5;
      }
    });

    // Act 3: OX 15 pts (4 items), Chosung 15 pts (3 items) = 30 pts
    let act3Ox = 0;
    OX_QUIZZES.forEach((q) => {
      if (oxAnswers[q.id] === q.answer) {
        act3Ox += 3.75;
      }
    });

    let act3Chosung = 0;
    CHOSUNG_QUIZZES.forEach((q) => {
      const userChosung = (chosungAnswers[q.id] || '').trim().replace(/\s+/g, '');
      const targetChosung = q.answer.trim().replace(/\s+/g, '');
      if (userChosung === targetChosung) {
        act3Chosung += 5;
      }
    });
    const act3 = Math.round(act3Ox + act3Chosung);

    // Act 4: Creative design completion = 25 pts
    let act4 = 10; // basic effort points
    if (futureDesign.name.trim().length > 0) act4 += 5;
    if (futureDesign.features.some((f) => f.trim().length > 0)) act4 += 5;
    if (futureDesign.creatorPromise.trim().length > 0 || futureDesign.drawingDataUrl) act4 += 5;

    const total = act1 + act2 + act3 + act4;
    return { act1, act2, act3, act4, total };
  };

  const scores = calculateScores();

  const handleGrade = () => {
    setShowResults(true);
    setIsScoreModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm('입력한 내용을 모두 지우고 처음부터 다시 시작하시겠습니까?')) {
      setUserMatches({});
      setBlankAnswers({});
      setOxAnswers({});
      setChosungAnswers({});
      setFutureDesign({
        name: '',
        energyType: 'solar',
        features: ['', '', ''],
        drawingDataUrl: '',
        creatorPromise: '',
      });
      setShowResults(false);
      setIsTeacherMode(false);
    }
  };

  const handleToggleTeacherMode = () => {
    setIsTeacherMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-4 px-2 sm:px-4 md:px-6 lg:px-8 text-slate-800">
      <div className="max-w-4xl mx-auto">
        {/* Fixed or Sticky Controls Bar (hidden during print) */}
        <WorksheetControls
          onPrint={handlePrint}
          onGrade={handleGrade}
          onReset={handleReset}
          isTeacherMode={isTeacherMode}
          onToggleTeacherMode={handleToggleTeacherMode}
          showResults={showResults}
        />

        {/* The Printable Worksheet Paper Container */}
        <main className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-md border border-slate-200 print-card print:border-none print:shadow-none print:p-0">
          {/* Header & Student Profile */}
          <HeaderInfo
            info={studentInfo}
            onChange={handleInfoChange}
            score={showResults ? { earned: scores.total, total: 100 } : null}
            isTeacherMode={isTeacherMode}
          />

          {/* Activity 1: Matching and Power Source Comparison */}
          <Activity1Matching
            userMatches={userMatches}
            onMatch={handleMatch}
            isTeacherMode={isTeacherMode}
            showResults={showResults}
          />

          {/* Activity 2: Fill in the Blanks with Word Bank */}
          <Activity2FillBlanks
            answers={blankAnswers}
            onAnswerChange={handleBlankAnswerChange}
            isTeacherMode={isTeacherMode}
            showResults={showResults}
          />

          {/* Page break marker for 2-page printouts */}
          <div className="print-page-break my-4 border-t border-dashed border-slate-200 no-print" />

          {/* Activity 3: OX & Chosung Quiz */}
          <Activity3Quiz
            oxAnswers={oxAnswers}
            onOxChange={handleOxAnswerChange}
            chosungAnswers={chosungAnswers}
            onChosungChange={handleChosungAnswerChange}
            isTeacherMode={isTeacherMode}
            showResults={showResults}
          />

          {/* Activity 4: Future Vehicle Design Workshop & Canvas */}
          <Activity4Drawing
            design={futureDesign}
            onChange={handleFutureDesignChange}
            isTeacherMode={isTeacherMode}
          />

          {/* Printable Learning Summary Footer */}
          <footer className="mt-8 pt-4 border-t-2 border-dashed border-amber-200 text-center text-xs text-slate-500">
            <div className="flex flex-wrap items-center justify-center gap-2 font-medium mb-1">
              <span className="flex items-center gap-1 text-amber-700">
                <Compass className="w-3.5 h-3.5" /> 2022 개정 교육과정 연계
              </span>
              <span>•</span>
              <span>초등 3학년 사회과 탐구 학습지</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-rose-600">
                <Heart className="w-3.5 h-3.5 fill-rose-500" /> 참다운 배움과 성장
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              교통수단의 발전 덕분에 생활이 편리해진 만큼, 환경을 보호하고 교통안전 규칙을 잘 지키는 어린이가 됩시다!
            </p>
          </footer>
        </main>
      </div>

      {/* Result & Evaluation Stamp Modal */}
      <ScoreModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        scores={scores}
        studentName={studentInfo.name}
      />
    </div>
  );
}
