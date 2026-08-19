import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface PetalSpec {
  x: number;
  y: number;
  size: number;
  distance: number;
  sway: number;
  rotate: number;
  base: number;
  delay: number;
  duration: number;
}

interface PetalFieldProps {
  active: boolean;
}

const PETAL_COUNT = 10;

export function PetalField({ active }: PetalFieldProps) {
  const petals = useMemo<PetalSpec[]>(() => {
    return Array.from({ length: PETAL_COUNT }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 70,
      size: 8 + Math.random() * 8,
      distance: 90 + Math.random() * 70,
      sway: 12 + Math.random() * 18,
      rotate: 60 + Math.random() * 160,
      base: 0.3 + Math.random() * 0.4,
      delay: Math.random() * 6,
      duration: 12 + Math.random() * 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            width: petal.size,
            height: petal.size * 0.72,
            background: 'linear-gradient(135deg, #7fb4ff 0%, #4f8cff 100%)',
            opacity: petal.base,
          }}
          animate={
            active
              ? {
                  y: [0, petal.distance],
                  x: [0, petal.sway, 0],
                  rotate: [0, petal.rotate],
                  opacity: [petal.base, petal.base * 0.15],
                }
              : { y: 0, x: 0, rotate: 0, opacity: petal.base }
          }
          transition={
            active
              ? { duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: 'easeInOut' }
              : { duration: 0 }
          }
        />
      ))}
    </div>
  );
}