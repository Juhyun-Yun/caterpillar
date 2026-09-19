import React from 'react';

interface GamaIconProps {
  className?: string;
  size?: number;
}

/**
 * 사람이 타고 두 명 이상이 어깨에 메고 가는 전통 한국 가마(Palanquin / Sedan chair) 아이콘
 */
export const GamaIcon: React.FC<GamaIconProps> = ({ className = 'w-9 h-9', size }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="사람이 타는 전통 가마"
      role="img"
    >
      {/* 1. 앞뒤로 길게 뻗은 가마채 (들채/메는 막대기) */}
      {/* 뒤쪽/앞쪽 가마채 막대 (사람들이 어깨에 메는 긴 나무 봉) */}
      <line
        x1="2"
        y1="25"
        x2="46"
        y2="25"
        stroke="#78350f"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* 가마채 손잡이 가죽/끈 마감 장식 */}
      <line x1="5" y1="23.5" x2="5" y2="26.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="23.5" x2="8" y2="26.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="40" y1="23.5" x2="40" y2="26.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="43" y1="23.5" x2="43" y2="26.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />

      {/* 2. 가마 바닥 받침대 및 발 */}
      <rect x="14" y="37" width="3.5" height="3" rx="0.8" fill="#451a03" />
      <rect x="30.5" y="37" width="3.5" height="3" rx="0.8" fill="#451a03" />
      <rect x="12" y="35" width="24" height="2.5" rx="1" fill="#78350f" />

      {/* 3. 가마 본체 (사람이 탑승하는 몸체 방) */}
      <rect
        x="12.5"
        y="15"
        width="23"
        height="21"
        rx="2"
        fill="#991b1b"
        stroke="#7f1d1d"
        strokeWidth="1.2"
      />
      {/* 본체 금빛 테두리 몰딩 장식 */}
      <rect
        x="13.5"
        y="16"
        width="21"
        height="19"
        rx="1.5"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="0.8"
        strokeDasharray="2 1"
      />

      {/* 4. 가마 창문 및 탑승한 사람(승객)의 모습 */}
      {/* 창문 틀 */}
      <rect
        x="16.5"
        y="18.5"
        width="15"
        height="13.5"
        rx="1.5"
        fill="#fef3c7"
        stroke="#b45309"
        strokeWidth="1.2"
      />
      {/* 창문 안: 사람이 타고 있는 모습 (갓을 쓴 선비/승객) */}
      <g id="passenger">
        {/* 옷 (한복) */}
        <path d="M19 32 C19 28, 29 28, 29 32 Z" fill="#2563eb" />
        <path d="M22 28 L24 32 L26 28 Z" fill="#ffffff" />
        {/* 얼굴 */}
        <circle cx="24" cy="24.5" r="2.8" fill="#fed7aa" />
        {/* 갓 (전통 모자) 챙과 모자 */}
        <ellipse cx="24" cy="22.2" rx="4.8" ry="1.2" fill="#0f172a" />
        <rect x="22.2" y="19.2" width="3.6" height="3" rx="0.5" fill="#0f172a" />
      </g>

      {/* 창살/발(주렴) 가림선 (열려있는 창문 표현) */}
      <line x1="24" y1="18.5" x2="24" y2="32" stroke="#d97706" strokeWidth="0.8" opacity="0.4" />
      <line x1="16.5" y1="24.5" x2="31.5" y2="24.5" stroke="#d97706" strokeWidth="0.8" opacity="0.4" />

      {/* 5. 가마 지붕 (곡선 처마와 덮개) */}
      <path
        d="M8.5 15.5 C12 14.5, 17 11.5, 24 8 C31 11.5, 36 14.5, 39.5 15.5 C36 17, 30 16.2, 24 16.2 C18 16.2, 12 17, 8.5 15.5 Z"
        fill="#b91c1c"
        stroke="#7f1d1d"
        strokeWidth="1.2"
      />
      {/* 지붕 금색 처마선 */}
      <path
        d="M9.5 15 C13 14, 18 11.2, 24 8.5 C30 11.2, 35 14, 38.5 15"
        stroke="#fbbf24"
        strokeWidth="1"
        fill="none"
      />
      {/* 지붕 꼭대기 보주 (둥근 꼭지 장식) */}
      <circle cx="24" cy="6.8" r="2.2" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
      <circle cx="24" cy="6.2" r="0.8" fill="#fef08a" />

      {/* 6. 가마 좌우 장식 술 (태슬) */}
      <path d="M13 32 L11 36 M13 32 L13 36.5 M13 32 L15 36" stroke="#dc2626" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M35 32 L33 36 M35 32 L35 36.5 M35 32 L37 36" stroke="#dc2626" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
};
