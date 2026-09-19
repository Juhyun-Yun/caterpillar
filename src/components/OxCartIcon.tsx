import React from 'react';

interface OxCartIconProps {
  className?: string;
  size?: number;
  flipHorizontal?: boolean;
}

/**
 * 소(황소)가 나무 달구지(수레바퀴와 짐칸)를 끌고 가는 소달구지 (Ox cart) 아이콘
 * 기본 방향: 다른 교통수단(🚗, 🚚, 🐎)과 동일하게 왼쪽(←)을 향해 전진하는 방향
 */
export const OxCartIcon: React.FC<OxCartIconProps> = ({
  className = 'w-10 h-8',
  size,
  flipHorizontal = true, // 왼쪽 방향(기본 이모지들과 통일)
}) => {
  return (
    <svg
      viewBox="0 0 54 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        ...(size ? { width: size, height: size } : {}),
        ...(flipHorizontal ? { transform: 'scaleX(-1)' } : {}),
      }}
      aria-label="소가 끄는 나무 달구지"
      role="img"
    >
      {/* 1. 달구지(수레) 몸체 및 짐 */}
      {/* 실린 짐 (볏짚/곡식 가마니 포대) */}
      <ellipse cx="14" cy="14" rx="7" ry="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
      <ellipse cx="10" cy="11" rx="5" ry="3.5" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
      <ellipse cx="16" cy="11" rx="5.5" ry="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
      {/* 짐 묶는 끈 */}
      <line x1="9" y1="8" x2="15" y2="17" stroke="#a16207" strokeWidth="0.7" />
      <line x1="16" y1="8" x2="10" y2="17" stroke="#a16207" strokeWidth="0.7" />

      {/* 달구지 나무 평상 (짐칸 바닥) */}
      <rect x="2" y="16.5" width="22" height="3" rx="0.8" fill="#78350f" stroke="#451a03" strokeWidth="0.8" />
      {/* 달구지 난간 살 */}
      <line x1="3.5" y1="13.5" x2="3.5" y2="17" stroke="#92400e" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="21.5" y1="13.5" x2="21.5" y2="17" stroke="#92400e" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="2" y1="13.5" x2="23" y2="13.5" stroke="#92400e" strokeWidth="1" strokeLinecap="round" />

      {/* 달구지 대형 나무 수레바퀴 (나무 살 바퀴) */}
      <g id="cart-wheel">
        {/* 바퀴 테두리 */}
        <circle cx="12" cy="25" r="7.5" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
        <circle cx="12" cy="25" r="6" fill="#fef3c7" stroke="#78350f" strokeWidth="0.8" />
        {/* 바퀴 축 및 중심 허브 */}
        <circle cx="12" cy="25" r="1.8" fill="#451a03" />
        {/* 바퀴 살 (Spokes) */}
        <line x1="12" y1="19" x2="12" y2="31" stroke="#78350f" strokeWidth="1" />
        <line x1="6" y1="25" x2="18" y2="25" stroke="#78350f" strokeWidth="1" />
        <line x1="7.8" y1="20.8" x2="16.2" y2="29.2" stroke="#78350f" strokeWidth="1" />
        <line x1="7.8" y1="29.2" x2="16.2" y2="20.8" stroke="#78350f" strokeWidth="1" />
      </g>

      {/* 2. 소와 달구지를 연결하는 긴 끌채(멍에대 & 고삐) */}
      {/* 나무 끌채 (샤프트) */}
      <line x1="18" y1="18" x2="38" y2="19" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
      {/* 소의 목에 얹힌 멍에 (U자형 가죽/목재) */}
      <path d="M37 15.5 C38.5 17, 38.5 21, 37 23" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" />

      {/* 3. 황소 */}
      <g id="ox">
        {/* 소 꼬리 */}
        <path d="M30 18 C28 20, 27.5 24, 28.5 26" stroke="#9a3412" strokeWidth="1" strokeLinecap="round" />
        <circle cx="28.5" cy="26" r="1" fill="#7c2d12" />

        {/* 뒷다리 */}
        <path d="M31 23 L31 31.5 L33 31.5 L33 24" fill="#9a3412" />
        <rect x="31" y="30.5" width="2" height="1.5" rx="0.3" fill="#1c1917" /> {/* 발굽 */}

        {/* 앞다리 */}
        <path d="M41 23 L41 31.5 L43 31.5 L43 23" fill="#9a3412" />
        <rect x="41" y="30.5" width="2" height="1.5" rx="0.3" fill="#1c1917" /> {/* 발굽 */}

        {/* 소 몸통 및 등 (튼튼한 황소) */}
        <path
          d="M29 19 C29 16.5, 34 14.5, 41 15.5 C43.5 16, 44.5 17, 44 23 C43 25, 30 25, 29 20 Z"
          fill="#c2410c"
          stroke="#9a3412"
          strokeWidth="0.8"
        />

        {/* 소 목과 머리 */}
        <path
          d="M41 16 C43 14, 47 13.5, 49 15.5 C51 17.5, 50.5 21, 48 22 C45.5 23, 42 22, 41 19 Z"
          fill="#c2410c"
          stroke="#9a3412"
          strokeWidth="0.8"
        />

        {/* 소 뿔 */}
        <path
          d="M45.5 14 C45 10, 48 9, 49.5 9.5 C48.5 11, 47 12.5, 46.5 14 Z"
          fill="#e2e8f0"
          stroke="#475569"
          strokeWidth="0.7"
        />

        {/* 소 귀 */}
        <ellipse cx="44.5" cy="16" rx="2" ry="1.2" fill="#9a3412" transform="rotate(-20 44.5 16)" />

        {/* 소 눈 & 코/입 */}
        <circle cx="48" cy="16.5" r="0.8" fill="#1e293b" />
        <path d="M48.5 20 C49.5 19.5, 51 20.5, 50 21.5 Z" fill="#fbcfe8" />
        {/* 코뚜레 링 */}
        <circle cx="50" cy="21.5" r="1.2" stroke="#eab308" strokeWidth="0.7" fill="none" />
      </g>

      {/* 지면 바닥선 */}
      <line x1="1" y1="33" x2="52" y2="33" stroke="#cbd5e1" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="3 2" />
    </svg>
  );
};
