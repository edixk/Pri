import { motion } from 'framer-motion';

interface HintPulseProps {
  show: boolean;
}

export function HintPulse({ show }: HintPulseProps) {
  if (!show) return null;

  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-full border border-gold/50"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: [0, 0.7, 0], scale: [0.85, 1.15] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}