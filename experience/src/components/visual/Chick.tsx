import { useId } from 'react';

interface ChickProps {
  blink: boolean;
  happy: boolean;
}

export function Chick({ blink, happy }: ChickProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '');
  const g = (name: string) => `${rawId}-${name}`;

  return (
    <svg viewBox="0 0 120 130" className="h-auto w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={g('body')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffdf7e" />
          <stop offset="100%" stopColor="#ffb347" />
        </linearGradient>
        <linearGradient id={g('wing')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd166" />
          <stop offset="100%" stopColor="#f0a038" />
        </linearGradient>
      </defs>

      <ellipse cx="58" cy="82" rx="39" ry="35" fill={`url(#${g('body')})`} />
      <ellipse cx="60" cy="94" rx="26" ry="17" fill="#ffe9a6" />
      <ellipse
        cx="30"
        cy="90"
        rx="14"
        ry="22"
        fill={`url(#${g('wing')})`}
        transform="rotate(-12 30 90)"
      />
      <path d="M50 52 L54 36 L60 50 Z" fill="#ffd166" />
      <path d="M62 50 L68 34 L72 50 Z" fill="#ffd166" />

      {happy ? (
        <path d="M68 63 Q74 56 80 63" stroke="#1c2030" strokeWidth="4" strokeLinecap="round" fill="none" />
      ) : blink ? (
        <line x1="70" y1="62" x2="78" y2="62" stroke="#1c2030" strokeWidth="4" strokeLinecap="round" />
      ) : (
        <circle cx="74" cy="62" r="5" fill="#1c2030" />
      )}

      <circle cx="86" cy="74" r="4.5" fill="#ff8a5c" opacity="0.55" />
      <path d="M78 70 L94 74 L78 80 Z" fill="#ff9a3d" />
    </svg>
  );
}