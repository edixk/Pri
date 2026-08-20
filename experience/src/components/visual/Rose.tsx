import { useId } from 'react';
import type { CSSProperties } from 'react';

import type { RoseState } from '../../types/interaction';

/*
 * Ramo «Jardín de Medianoche».
 *
 * Un ramo completo construido por capas: tallos, hojas, papel de envoltura,
 * cinta y varias flores (la rosa azul central florece con el estado).
 * Cada parte es animable de forma independiente mediante micro-animaciones CSS
 * desincronizadas (transform/opacity únicamente).
 */

interface RoseProps {
  state: RoseState;
}

type Tone = 'main' | 'deep' | 'mid' | 'light';

interface ToneColors {
  outer: [string, string];
  mid: [string, string];
  inner: [string, string];
  core: [string, string];
}

const TONES: Record<Tone, ToneColors> = {
  main: {
    outer: ['#2f6bff', '#1e4fd6'],
    mid: ['#4f8cff', '#2f6bff'],
    inner: ['#7fb4ff', '#4f8cff'],
    core: ['#b9d2ff', '#7fb4ff'],
  },
  deep: {
    outer: ['#1c47c9', '#14359f'],
    mid: ['#2f6bff', '#1f4bd6'],
    inner: ['#4f8cff', '#2f6bff'],
    core: ['#7fb4ff', '#4f8cff'],
  },
  mid: {
    outer: ['#2f6bff', '#1e4fd6'],
    mid: ['#4f8cff', '#2f6bff'],
    inner: ['#7fb4ff', '#4f8cff'],
    core: ['#a9c8ff', '#7fb4ff'],
  },
  light: {
    outer: ['#4f8cff', '#2f6bff'],
    mid: ['#7fb4ff', '#4f8cff'],
    inner: ['#9cc3ff', '#7fb4ff'],
    core: ['#cfe0ff', '#9cc3ff'],
  },
};

const P_OUTER =
  'M0 -56 C 21 -52, 40 -30, 42 -4 C 43 22, 26 46, 0 54 C -26 46, -43 22, -42 -4 C -40 -30, -21 -52, 0 -56 Z';
const P_MID =
  'M0 -46 C 18 -43, 33 -25, 35 -3 C 36 18, 21 38, 0 45 C -21 38, -36 18, -35 -3 C -33 -25, -18 -43, 0 -46 Z';
const P_INNER =
  'M0 -37 C 14 -35, 26 -20, 27 -2 C 28 15, 16 31, 0 37 C -16 31, -28 15, -27 -2 C -26 -20, -14 -35, 0 -37 Z';
const P_CORE =
  'M0 -27 C 10 -25, 19 -14, 19 -1 C 19 11, 11 23, 0 27 C -11 23, -19 11, -19 -1 C -19 -14, -10 -25, 0 -27 Z';

const FULL_OUTER = [-66, -40, -13, 13, 40, 66];
const FULL_OUTER_BLOOM = [-88, -58, -27, 27, 58, 88];
const FULL_MID = [-96, -58, -20, 20, 58, 96];
const FULL_INNER = [-60, -20, 20, 60, 150, 210];
const FULL_CORE = [-32, 0, 32];

const TIGHT_OUTER = [-52, -31, -11, 11, 31, 52];
const TIGHT_MID = [-72, -44, -15, 15, 44, 72];
const TIGHT_INNER = [-42, -14, 14, 42];
const TIGHT_CORE = [-20, 0, 20];

const BUD_OUTER = [-40, -23, -8, 8, 23, 40];
const BUD_INNER = [-28, -9, 9, 28];

const LEAF =
  'M0 0 C 7 -20, 26 -38, 50 -44 C 43 -21, 29 -4, 0 0 Z';
const LEAF_VEIN = 'M2 -2 C 16 -16, 32 -30, 47 -41';

interface FlowerProps {
  cx: number;
  cy: number;
  scale: number;
  rotate: number;
  opacity: number;
  tone: Tone;
  variant: 'full' | 'tight' | 'bud';
  bloom?: boolean;
  breatheClass: string;
  dur: number;
  delay: number;
}

function Flower({
  cx,
  cy,
  scale,
  rotate,
  opacity,
  tone,
  variant,
  bloom = false,
  breatheClass,
  dur,
  delay,
}: FlowerProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const g = (name: string) => `${rawId}-${name}`;
  const c = TONES[tone];

  const outer = bloom
    ? FULL_OUTER_BLOOM
    : variant === 'bud'
      ? BUD_OUTER
      : variant === 'tight'
        ? TIGHT_OUTER
        : FULL_OUTER;
  const mid = variant === 'bud' ? [] : variant === 'tight' ? TIGHT_MID : FULL_MID;
  const inner = variant === 'bud' ? BUD_INNER : variant === 'tight' ? TIGHT_INNER : FULL_INNER;
  const core = variant === 'bud' ? [] : variant === 'tight' ? TIGHT_CORE : FULL_CORE;

  const breatheStyle: CSSProperties = {
    animationDuration: `${dur}s`,
    animationDelay: `${delay}s`,
  };

  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`} opacity={opacity}>
      <defs>
        <radialGradient id={g('glow')} cx="50%" cy="46%" r="55%">
          <stop offset="0%" stopColor="#7fb4ff" stopOpacity={bloom ? 0.55 : 0.28} />
          <stop offset="100%" stopColor="#7fb4ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g('outer')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.outer[0]} />
          <stop offset="100%" stopColor={c.outer[1]} />
        </linearGradient>
        <linearGradient id={g('mid')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.mid[0]} />
          <stop offset="100%" stopColor={c.mid[1]} />
        </linearGradient>
        <linearGradient id={g('inner')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.inner[0]} />
          <stop offset="100%" stopColor={c.inner[1]} />
        </linearGradient>
        <linearGradient id={g('core')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.core[0]} />
          <stop offset="100%" stopColor={c.core[1]} />
        </linearGradient>
      </defs>

      <circle cx="0" cy="6" r={bloom ? 76 : 62} fill={`url(#${g('glow')})`} />

      <g className={breatheClass} style={breatheStyle}>
        {outer.map((angle, index) => (
          <path
            key={`o${index}`}
            d={P_OUTER}
            transform={`rotate(${angle} 0 0)`}
            fill={`url(#${g('outer')})`}
            opacity="0.96"
          />
        ))}
        {mid.map((angle, index) => (
          <path
            key={`m${index}`}
            d={P_MID}
            transform={`rotate(${angle} 0 0)`}
            fill={`url(#${g('mid')})`}
            opacity="0.96"
          />
        ))}
        {inner.map((angle, index) => (
          <path
            key={`in${index}`}
            d={P_INNER}
            transform={`rotate(${angle} 0 0)`}
            fill={`url(#${g('inner')})`}
          />
        ))}
        {core.map((angle, index) => (
          <path
            key={`c${index}`}
            d={P_CORE}
            transform={`rotate(${angle} 0 0)`}
            fill={`url(#${g('core')})`}
          />
        ))}
        <circle cx="0" cy="4" r="4.6" fill="#f5d47a" opacity="0.95" />
        <circle cx="0" cy="4" r="8" fill="none" stroke="#f5d47a" strokeWidth="0.8" opacity="0.5" />
      </g>
    </g>
  );
}

interface LeafProps {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  flip?: boolean;
  fill: string;
  dur: number;
  delay: number;
}

function Leaf({ x, y, rotate, scale, flip = false, fill, dur, delay }: LeafProps) {
  const swayStyle: CSSProperties = {
    animationDuration: `${dur}s`,
    animationDelay: `${delay}s`,
  };

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <g transform={`scale(${flip ? -1 : 1} 1) scale(${scale})`}>
        <g className="bq-leaf" style={swayStyle}>
          <path d={LEAF} fill={fill} />
          <path d={LEAF_VEIN} stroke="#2c5a49" strokeWidth="1.2" fill="none" opacity="0.5" />
        </g>
      </g>
    </g>
  );
}

const STEMS: string[] = [
  'M160 420 C 160 330, 160 220, 160 126',
  'M160 420 C 153 350, 133 255, 118 150',
  'M160 420 C 167 350, 189 255, 204 148',
  'M160 420 C 147 370, 111 285, 96 200',
  'M160 420 C 173 370, 211 285, 226 198',
  'M160 420 C 159 360, 158 295, 158 228',
  'M160 420 C 137 390, 97 325, 76 252',
  'M160 420 C 183 390, 223 325, 248 248',
];

export function Rose({ state }: RoseProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const g = (name: string) => `${rawId}-${name}`;
  const bloom = state === 'revealing' || state === 'revealed';

  return (
    <svg
      viewBox="0 0 320 460"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={g('stem')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#31526b" />
          <stop offset="100%" stopColor="#1c2f42" />
        </linearGradient>
        <linearGradient id={g('paper-back')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#18214a" />
          <stop offset="100%" stopColor="#0e1430" />
        </linearGradient>
        <linearGradient id={g('paper-left')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#202a58" />
          <stop offset="100%" stopColor="#161d3e" />
        </linearGradient>
        <linearGradient id={g('paper-right')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#24305f" />
          <stop offset="100%" stopColor="#182047" />
        </linearGradient>
        <linearGradient id={g('ribbon')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffdf8e" />
          <stop offset="100%" stopColor="#e6b44c" />
        </linearGradient>
      </defs>

      <ellipse cx="160" cy="452" rx="88" ry="9" fill="#000000" opacity="0.22" />

      <g stroke={`url(#${g('stem')})`} fill="none" strokeLinecap="round">
        {STEMS.map((d, index) => (
          <path key={index} d={d} strokeWidth={index === 0 || index === 5 ? 5.5 : 4.5} />
        ))}
      </g>

      <Leaf x={200} y={176} rotate={-40} scale={0.62} fill="#183329" dur={6.4} delay={1.2} />
      <Leaf x={122} y={174} rotate={132} scale={0.6} fill="#183329" dur={5.8} delay={2.6} />
      <Leaf x={172} y={236} rotate={-16} scale={1} fill="#1f4438" dur={5.2} delay={0.4} />
      <Leaf x={146} y={242} rotate={166} scale={0.92} fill="#183329" dur={6.6} delay={3.1} />
      <Leaf x={196} y={212} rotate={-30} scale={0.78} fill="#1f4438" dur={5.6} delay={1.8} />
      <Leaf x={122} y={216} rotate={150} scale={0.76} fill="#183329" dur={6.2} delay={4.2} />
      <Leaf x={184} y={272} rotate={-6} scale={0.88} fill="#1f4438" dur={7.0} delay={0.9} />
      <Leaf x={134} y={278} rotate={176} scale={0.84} fill="#183329" dur={6.8} delay={2.2} />

      <g
        className="bq-paper"
        style={{ animationDuration: '11s', animationDelay: '0.6s' } as CSSProperties}
      >
        <path
          d="M160 420 C 120 400, 84 362, 74 318 C 122 306, 198 306, 246 318 C 238 362, 202 402, 160 420 Z"
          fill={`url(#${g('paper-back')})`}
        />
        <path
          d="M160 418 C 128 402, 96 368, 90 326 C 130 318, 168 316, 182 320 C 172 354, 164 388, 160 418 Z"
          fill={`url(#${g('paper-left')})`}
        />
        <path
          d="M160 418 C 192 402, 224 368, 230 326 C 190 318, 152 316, 138 320 C 148 354, 156 388, 160 418 Z"
          fill={`url(#${g('paper-right')})`}
        />
        <path
          d="M152 324 C 122 330, 96 342, 86 356 C 102 344, 130 330, 158 322 Z"
          fill="#232c5c"
        />
        <path
          d="M168 324 C 198 330, 224 342, 234 356 C 218 344, 190 330, 162 322 Z"
          fill="#283366"
        />
        <path
          d="M150 328 C 142 360, 136 386, 132 406"
          stroke="#2e3a72"
          strokeWidth="1.2"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M170 328 C 178 360, 184 386, 188 406"
          stroke="#2e3a72"
          strokeWidth="1.2"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M160 324 C 157 356, 154 386, 152 408"
          stroke="#2e3a72"
          strokeWidth="1"
          fill="none"
          opacity="0.35"
        />
        <path
          d="M160 324 C 163 356, 166 386, 168 408"
          stroke="#2e3a72"
          strokeWidth="1"
          fill="none"
          opacity="0.35"
        />
      </g>

      <g
        className="bq-ribbon"
        style={{ animationDuration: '7s', animationDelay: '1.4s' } as CSSProperties}
      >
        <path
          d="M152 416 C 116 394, 92 426, 128 436 C 143 440, 158 428, 152 416 Z"
          fill={`url(#${g('ribbon')})`}
        />
        <path
          d="M168 416 C 204 394, 228 426, 192 436 C 177 440, 162 428, 168 416 Z"
          fill={`url(#${g('ribbon')})`}
        />
        <path
          d="M142 422 C 124 418, 114 426, 128 430"
          stroke="#c9a64f"
          strokeWidth="1.4"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M178 422 C 196 418, 206 426, 192 430"
          stroke="#c9a64f"
          strokeWidth="1.4"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M150 426 C 142 440, 136 448, 140 454"
          stroke="#f5d47a"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M170 426 C 178 440, 184 448, 180 454"
          stroke="#f5d47a"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M150 426 C 142 440, 136 448, 140 454"
          stroke="#ffe9a6"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M170 426 C 178 440, 184 448, 180 454"
          stroke="#ffe9a6"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <ellipse cx="160" cy="420" rx="16" ry="10" fill={`url(#${g('ribbon')})`} />
        <path
          d="M150 420 Q 160 428 170 420"
          stroke="#c9a64f"
          strokeWidth="1.6"
          fill="none"
          opacity="0.55"
        />
      </g>

      <Flower
        cx={160}
        cy={112}
        scale={0.82}
        rotate={-8}
        opacity={0.96}
        tone="deep"
        variant="tight"
        breatheClass="bq-breathe"
        dur={9.6}
        delay={0.8}
      />
      <Flower
        cx={116}
        cy={132}
        scale={0.7}
        rotate={14}
        opacity={0.96}
        tone="deep"
        variant="tight"
        breatheClass="bq-breathe"
        dur={8.4}
        delay={2.1}
      />
      <Flower
        cx={206}
        cy={130}
        scale={0.72}
        rotate={-13}
        opacity={0.96}
        tone="deep"
        variant="tight"
        breatheClass="bq-breathe"
        dur={8.8}
        delay={3.4}
      />
      <Flower
        cx={94}
        cy={182}
        scale={0.82}
        rotate={22}
        opacity={1}
        tone="mid"
        variant="full"
        breatheClass="bq-breathe"
        dur={7.8}
        delay={1.5}
      />
      <Flower
        cx={228}
        cy={180}
        scale={0.84}
        rotate={-20}
        opacity={1}
        tone="mid"
        variant="full"
        breatheClass="bq-breathe"
        dur={8.2}
        delay={2.9}
      />
      <Flower
        cx={158}
        cy={212}
        scale={1.02}
        rotate={-5}
        opacity={1}
        tone="main"
        variant="full"
        bloom={bloom}
        breatheClass="bq-breathe-sm"
        dur={7}
        delay={0.3}
      />
      <Flower
        cx={72}
        cy={236}
        scale={0.5}
        rotate={-28}
        opacity={0.98}
        tone="light"
        variant="bud"
        breatheClass="bq-breathe-sm"
        dur={9.2}
        delay={4.1}
      />
      <Flower
        cx={250}
        cy={230}
        scale={0.52}
        rotate={24}
        opacity={0.98}
        tone="light"
        variant="bud"
        breatheClass="bq-breathe-sm"
        dur={8.6}
        delay={1.9}
      />

      <Leaf x={150} y={248} rotate={24} scale={0.62} fill="#1f4438" dur={5.4} delay={3.8} />
      <Leaf x={176} y={250} rotate={-122} scale={0.58} fill="#1f4438" dur={6.0} delay={1.1} />
    </svg>
  );
}