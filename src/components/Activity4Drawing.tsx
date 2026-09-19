import React, { useRef, useState, useEffect } from 'react';
import { FutureVehicleDesign } from '../types';
import { FUTURE_ENERGY_OPTIONS } from '../data/worksheetData';
import { Paintbrush, Eraser, RotateCcw, Sparkles, Wand2 } from 'lucide-react';

interface Activity4DrawingProps {
  design: FutureVehicleDesign;
  onChange: (key: keyof FutureVehicleDesign, val: any) => void;
  isTeacherMode: boolean;
}

const COLORS = ['#1e293b', '#2563eb', '#dc2626', '#16a34a', '#eab308', '#ea580c', '#9333ea'];
const STICKERS = ['🚀', '🛸', '🪽', '⚡', '☀️', '🌊', '🤖', '✨'];

export const Activity4Drawing: React.FC<Activity4DrawingProps> = ({
  design,
  onChange,
  isTeacherMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [lineWidth, setLineWidth] = useState(4);
  const [isEraser, setIsEraser] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set background to white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Drawing helpers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.lineWidth = isEraser ? 18 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#ffffff' : activeColor;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      onChange('drawingDataUrl', canvas.toDataURL());
    }
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    onChange('drawingDataUrl', '');
  };

  const handleAddSticker = (emoji: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // draw random near center
    const x = canvas.width / 2 + (Math.random() * 160 - 80);
    const y = canvas.height / 2 + (Math.random() * 100 - 50);
    ctx.fillText(emoji, x, y);
    onChange('drawingDataUrl', canvas.toDataURL());
  };

  const handleFeatureChange = (index: number, val: string) => {
    const nextFeatures = [...design.features];
    nextFeatures[index] = val;
    onChange('features', nextFeatures);
  };

  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-6 print-card">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-purple-600 text-white font-black text-sm flex items-center justify-center">
            4
          </span>
          <h2 className="text-lg font-bold text-slate-800">
            [활동 4] 상상 쑥쑥! 내가 발명하는 미래의 교통수단 연구소
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
          배점: 25점 (창의적 설계 및 글·그림)
        </span>
      </div>

      <p className="text-xs md:text-sm text-slate-600 mb-4">
        미래에는 환경을 지키고 더욱 빠르고 안전한 교통수단이 등장할 거예요. 내가 직접 발명가가 되어 멋진 미래 교통수단을 디자인해 보세요!
      </p>

      {/* Design Specifications Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Left: Spec Inputs */}
        <div className="space-y-3.5 bg-slate-50/70 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              ① 내가 만든 미래 교통수단의 이름:
            </label>
            <input
              id="future-vehicle-name"
              type="text"
              placeholder="예: 바다와 하늘을 누비는 씽씽 돌고래호"
              value={design.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full bg-white px-3 py-2 rounded-lg border border-slate-300 font-bold text-purple-900 focus:outline-none focus:border-purple-500 text-sm"
            />
            {isTeacherMode && (
              <span className="text-[11px] text-red-600 mt-1 block">
                [예시]: 하늘을 나는 무공해 태양광 플라잉 버스
              </span>
            )}
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              ② 움직이는 친환경 에너지 선택:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {FUTURE_ENERGY_OPTIONS.map((opt) => {
                const isSelected = design.energyType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChange('energyType', opt.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              ③ 우리 미래 교통수단만의 특별한 기능 3가지:
            </label>
            <div className="space-y-1.5">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 font-bold text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    id={`future-feature-${idx}`}
                    type="text"
                    placeholder={`특징 ${idx + 1} 적기`}
                    value={design.features[idx] || ''}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    className="w-full bg-white px-2.5 py-1.5 rounded-md border border-slate-300 focus:outline-none focus:border-purple-500"
                  />
                </div>
              ))}
            </div>
            {isTeacherMode && (
              <div className="text-[11px] text-red-600 mt-1.5 bg-red-50 p-1.5 rounded">
                [예시 특징]: 1. 교통체증 시 하늘로 수직 이착륙 비행 / 2. 매연이 전혀 없고 공기 청정 기능 / 3. AI 자율운항으로 졸음운전 및 사고 예방
              </div>
            )}
          </div>
        </div>

        {/* Right: Interactive Drawing Canvas */}
        <div className="flex flex-col bg-slate-50/70 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
              <Paintbrush className="w-3.5 h-3.5 text-purple-600" />
              미래 교통수단 스케치 캔버스
            </span>
            <span className="text-[11px] text-slate-500">인쇄 시 손으로 그릴 수 있어요!</span>
          </div>

          {/* Canvas Toolbar (no-print) */}
          <div className="no-print flex flex-wrap items-center justify-between gap-1.5 pb-2 border-b border-slate-200 text-xs">
            {/* Colors */}
            <div className="flex items-center gap-1">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setActiveColor(c);
                    setIsEraser(false);
                  }}
                  className={`w-5 h-5 rounded-full transition-transform ${
                    !isEraser && activeColor === c ? 'scale-125 ring-2 ring-purple-400' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            {/* Brush Width & Eraser */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsEraser(false)}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  !isEraser ? 'bg-purple-100 text-purple-800 font-bold' : 'text-slate-600 hover:bg-slate-200'
                }`}
                title="붓 그리기"
              >
                <Paintbrush className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsEraser(true)}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  isEraser ? 'bg-purple-100 text-purple-800 font-bold' : 'text-slate-600 hover:bg-slate-200'
                }`}
                title="지우개"
              >
                <Eraser className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleClearCanvas}
                className="p-1.5 rounded text-xs text-rose-600 hover:bg-rose-50"
                title="캔버스 초기화"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stickers row */}
          <div className="no-print flex items-center gap-1 py-1 text-xs">
            <span className="text-[10px] text-slate-500 font-semibold">스티커:</span>
            {STICKERS.map((stk) => (
              <button
                key={stk}
                type="button"
                onClick={() => handleAddSticker(stk)}
                className="hover:scale-125 transition-transform p-0.5"
                title="클릭하여 스티커 찍기"
              >
                {stk}
              </button>
            ))}
          </div>

          {/* The Actual Canvas */}
          <div className="relative flex-1 min-h-[220px] bg-white rounded-lg border-2 border-dashed border-slate-300 overflow-hidden cursor-crosshair">
            <canvas
              ref={canvasRef}
              width={450}
              height={260}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full block touch-none"
            />
          </div>
        </div>
      </div>

      {/* Summary Promise Statement */}
      <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 text-xs text-slate-700">
        <label className="font-bold text-purple-900 block mb-1 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          발명가 나의 한 줄 다짐:
        </label>
        <input
          id="future-creator-promise"
          type="text"
          placeholder="예: 자연을 아끼고 사람들을 안전하게 지켜주는 친환경 교통수단을 연구하겠습니다!"
          value={design.creatorPromise}
          onChange={(e) => onChange('creatorPromise', e.target.value)}
          className="w-full bg-white px-3 py-1.5 rounded-lg border border-purple-300 focus:outline-none focus:border-purple-600 font-medium"
        />
      </div>
    </section>
  );
};
