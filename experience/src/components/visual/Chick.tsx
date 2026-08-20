import { useId } from 'react';

interface ChickProps {
  blink: boolean;
  happy: boolean;
}

export function Chick({ blink, happy }: ChickProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const g = (name: string) => `${rawId}-${name}`;

  const eyeY = 42;

  return (
    <svg viewBox="0 0 120 140" className="h-auto w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={g('body')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe08a" />
          <stop offset="100%" stopColor="#ffb347" />
        </linearGradient>
        <linearGradient id={g('wing')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd166" />
          <stop offset="100%" stopColor="#f0a038" />
        </linearGradient>
      </defs>

      <path
        d="M42 118 C 42 122, 44 126, 48 126 L 50 126 C 56 126, 58 120, 57 114 L 54 108 Z"
        fill="#ff9a3d"
      />
      <path
        d="M62 118 C 62 122, 64 126, 68 126 L 70 126 C 76 126, 78 120, 77 114 L 74 108 Z"
        fill="#ff9a3d"
      />

      <ellipse cx="60" cy="92" rx="38" ry="34" fill={`url(#${g('body')})`} />
      <ellipse cx="60" cy="100" rx="26" ry="17" fill="#ffe9a6" />

      <path
        d="M18 78 C 16 60, 30 52, 39 58 C 41 72, 35 86, 23 88 Z"
        fill={`url(#${g('wing')})`}
      />
      <path
        d="M102 78 C 104 60, 90 52, 81 58 C 79 72, 85 86, 97 88 Z"
        fill={`url(#${g('wing')})`}
      />

      <circle cx="60" cy="44" r="27" fill={`url(#${g('body')})`} />

      <path d="M48 24 L52 12 L58 22 Z" fill="#ffd166" />
      <path d="M62 22 L66 12 L72 24 Z" fill="#ffd166" />

      {happy ? (
        <>
          <path d="M45 44 Q50 37 55 44" stroke="#1c2030" strokeWidth="3.6" strokeLinecap="round" fill="none" />
          <path d="M65 44 Q70 37 75 44" stroke="#1c2030" strokeWidth="3.6" strokeLinecap="round" fill="none" />
          <path d="M55 52 Q60 58 65 52" stroke="#1c2030" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      ) : blink ? (
        <>
          <path d="M45 44 L55 44" stroke="#1c2030" strokeWidth="3.6" strokeLinecap="round" />
          <path d="M65 44 L75 44" stroke="#1c2030" strokeWidth="3.6" strokeLinecap="round" />
          <path d="M54 51 L60 55 L66 51" fill="#ff9a3d" />
        </>
      ) : (
        <>
          <circle cx="50" cy={eyeY} r="5" fill="#1c2030" />
          <circle cx="70" cy={eyeY} r="5" fill="#1c2030" />
          <circle cx="52" cy={eyeY - 1.6} r="1.7" fill="#ffffff" />
          <circle cx="72" cy={eyeY - 1.6} r="1.7" fill="#ffffff" />
          <path d="M54 51 L60 55 L66 51" fill="#ff9a3d" />
        </>
      )}

      <ellipse cx="43" cy="52" rx="4" ry="2.6" fill="#ff8a5c" opacity="0.5" />
      <ellipse cx="77" cy="52" rx="4" ry="2.6" fill="#ff8a5c" opacity="0.5" />
    </svg>
  );
}
