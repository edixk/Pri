import { useId } from 'react';

import type { RoseState } from '../../types/interaction';

const OUTER_PETAL =
  'M120 54.24 C 88.68 58.56, 66 88.8, 68.16 119.04 C 70.32 147.12, 93 162.24, 120 168.72 C 147 162.24, 169.68 147.12, 171.84 119.04 C 174 88.8, 151.32 58.56, 120 54.24 Z';

const MID_PETAL =
  'M120 65.76 C 93.32 69.44, 74 95.2, 75.84 120.96 C 77.68 144.88, 97 157.76, 120 163.28 C 143 157.76, 162.32 144.88, 164.16 120.96 C 166 95.2, 146.68 69.44, 120 65.76 Z';

const INNER_PETAL =
  'M120 84.48 C 100.86 87.12, 87 105.6, 88.32 124.08 C 89.64 141.24, 103.5 150.48, 120 154.44 C 136.5 150.48, 150.36 141.24, 151.68 124.08 C 153 105.6, 139.14 87.12, 120 84.48 Z';

const OUTER_ANGLES = [-84, -48, -12, 12, 48, 84];
const OUTER_BLOOM_ANGLES = [-98, -62, -22, 22, 62, 98];
const MID_ANGLES = [-120, -72, -24, 24, 72, 120];
const INNER_ANGLES = [-75, -25, 25, 75, 165, 255];

interface RoseProps {
  state: RoseState;
}

export function Rose({ state }: RoseProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const g = (name: string) => `${rawId}-${name}`;
  const bloom = state === 'revealing' || state === 'revealed';
  const outerAngles = bloom ? OUTER_BLOOM_ANGLES : OUTER_ANGLES;

  return (
    <svg
      viewBox="0 0 240 300"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={g('glow')} cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#7fb4ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7fb4ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g('petal-deep')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f8cff" />
          <stop offset="100%" stopColor="#2f6bff" />
        </linearGradient>
        <linearGradient id={g('petal-mid')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fb4ff" />
          <stop offset="100%" stopColor="#3f7bff" />
        </linearGradient>
        <linearGradient id={g('petal-inner')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b9d2ff" />
          <stop offset="100%" stopColor="#5b96ff" />
        </linearGradient>
        <linearGradient id={g('stem')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e4a5f" />
          <stop offset="100%" stopColor="#1d2f40" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="124" r="92" fill={`url(#${g('glow')})`} />

      <path
        d="M120 172 C 120 200, 118 240, 116 288"
        stroke={`url(#${g('stem')})`}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M120 236 C 146 228, 164 232, 180 246"
        stroke={`url(#${g('stem')})`}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M118 238 C 136 220, 162 216, 182 230 C 172 248, 146 254, 118 246 Z" fill="#1f3d33" />
      <path d="M122 260 C 108 274, 88 278, 72 272 C 78 256, 100 246, 122 248 Z" fill="#1a352c" />

      {outerAngles.map((angle) => (
        <path
          key={`o${angle}`}
          d={OUTER_PETAL}
          transform={`rotate(${angle} 120 132)`}
          fill={`url(#${g('petal-deep')})`}
          opacity="0.95"
        />
      ))}
      {MID_ANGLES.map((angle) => (
        <path
          key={`m${angle}`}
          d={MID_PETAL}
          transform={`rotate(${angle} 120 132)`}
          fill={`url(#${g('petal-mid')})`}
        />
      ))}
      {INNER_ANGLES.map((angle) => (
        <path
          key={`i${angle}`}
          d={INNER_PETAL}
          transform={`rotate(${angle} 120 132)`}
          fill={`url(#${g('petal-inner')})`}
        />
      ))}

      <path
        d="M108 94 C 116 82, 128 82, 134 94 C 136 102, 128 112, 120 114 C 112 112, 104 102, 108 94 Z"
        fill={`url(#${g('petal-inner')})`}
      />
      <circle cx="120" cy="102" r="4.5" fill="#f5d47a" opacity="0.9" />
      <circle cx="120" cy="102" r="9" fill="none" stroke="#f5d47a" strokeWidth="0.8" opacity="0.55" />
    </svg>
  );
}