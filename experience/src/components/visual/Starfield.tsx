import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface StarSpec {
  x: number;
  y: number;
  size: number;
  base: number;
  delay: number;
  duration: number;
}

interface StarfieldProps {
  active: boolean;
}

const STAR_COUNT = 40;

export function Starfield({ active }: StarfieldProps) {
  const stars = useMemo<StarSpec[]>(() => {
    return Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      base: 0.35 + Math.random() * 0.6,
      delay: Math.random() * 4,
      duration: 2.5 + Math.random() * 3.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-mid-100"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: star.base }}
          animate={
            active ? { opacity: [star.base, star.base * 0.2, star.base] } : { opacity: star.base }
          }
          transition={
            active
              ? { duration: star.duration, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }
              : { duration: 0 }
          }
        />
      ))}
    </div>
  );
}