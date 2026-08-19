import { motion } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

import { interactionConfig } from '../../data/interaction.config';
import { useHaptics } from '../../hooks/useHaptics';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { HintPulse } from '../feedback/HintPulse';

interface DiscoverableProps {
  label: string;
  resolved: boolean;
  onReveal: () => void;
  children: ReactNode;
  className?: string;
}

export function Discoverable({
  label,
  resolved,
  onReveal,
  children,
  className,
}: DiscoverableProps) {
  const haptic = useHaptics();
  const reduced = usePrefersReducedMotion();
  const lastTap = useRef(0);

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < interactionConfig.discovery.cooldownMs) return;
    lastTap.current = now;
    haptic(interactionConfig.haptics.light);
    onReveal();
  };

  return (
    <div className={`absolute ${className ?? ''}`}>
      <button
        type="button"
        aria-label={label}
        onClick={handleTap}
        className="pointer-events-auto relative flex h-11 w-11 items-center justify-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-gold"
      >
        <HintPulse show={!resolved && !reduced} />
        <motion.span
          className="relative flex items-center justify-center"
          whileTap={resolved ? undefined : { scale: 1.25 }}
        >
          {children}
        </motion.span>
      </button>
    </div>
  );
}