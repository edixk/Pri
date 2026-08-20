import { useMemo } from 'react';
import type { CSSProperties } from 'react';

interface StarfieldProps {
  active: boolean;
}

type MotionKind = 'a' | 'b' | 'c' | 'd';
type Layer = 'far' | 'mid' | 'near';

interface StarSpec {
  style: CSSProperties;
  motionClass: string;
  tierClass: string;
}

const STAR_COUNT = 56;

function pickMotion(layer: Layer): MotionKind {
  const r = Math.random();
  if (layer === 'far') return r < 0.55 ? 'd' : r < 0.85 ? 'c' : 'a';
  if (layer === 'mid') return r < 0.4 ? 'a' : r < 0.75 ? 'd' : 'c';
  return r < 0.5 ? 'a' : 'b';
}

export function Starfield({ active }: StarfieldProps) {
  const stars = useMemo<StarSpec[]>(() => {
    return Array.from({ length: STAR_COUNT }, () => {
      const roll = Math.random();
      const layer: Layer = roll < 0.5 ? 'far' : roll < 0.82 ? 'mid' : 'near';

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const gold = layer !== 'far' && Math.random() < 0.16;

      let size: number;
      let tierClass: string;
      let dur: number;
      let dx: number;
      let dy: number;

      if (layer === 'far') {
        size = 1 + Math.random() * 0.6;
        tierClass = Math.random() < 0.5 ? 'star--lo' : 'star--md';
        dur = 20 + Math.random() * 14;
        dx = Math.random() * 5 - 2.5;
        dy = Math.random() * 5 - 2.5;
      } else if (layer === 'mid') {
        size = 1.4 + Math.random() * 0.8;
        tierClass = Math.random() < 0.3 ? 'star--lo' : 'star--md';
        dur = 14 + Math.random() * 8;
        dx = Math.random() * 7 - 3.5;
        dy = Math.random() * 7 - 3.5;
      } else {
        size = 2.2 + Math.random() * 1.2;
        tierClass = 'star--hi';
        dur = 9 + Math.random() * 7;
        dx = Math.random() * 9 - 4.5;
        dy = Math.random() * 9 - 4.5;
      }

      const motion = pickMotion(layer);
      const delay = Math.random() * 8;

      const style = {
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: gold ? '#f5d47a' : '#eef1fb',
        animationDuration: `${dur}s`,
        animationDelay: `${delay}s`,
      } as Record<string, string | number> & CSSProperties;

      if (motion === 'a' || motion === 'c') {
        style['--dx'] = `${dx}px`;
        style['--dy'] = `${dy}px`;
        style['--dx2'] = `${-dx * 0.6}px`;
        style['--dy2'] = `${-dy * 0.4}px`;
      }
      if (motion === 'b') {
        style['--s1'] = 1.5;
        style['--s2'] = 0.72;
      }
      if (layer === 'near') {
        style.boxShadow = gold
          ? '0 0 7px 1px rgba(245,212,122,0.22)'
          : '0 0 7px 1px rgba(238,241,251,0.2)';
      }

      return {
        style,
        motionClass: `star--${motion}`,
        tierClass,
      };
    });
  }, []);

  return (
    <div
      className={active ? 'starfield' : 'starfield starfield--paused'}
      aria-hidden="true"
    >
      {stars.map((star, index) => (
        <span
          key={index}
          className={`star ${star.motionClass} ${star.tierClass}`}
          style={star.style}
        />
      ))}
    </div>
  );
}
