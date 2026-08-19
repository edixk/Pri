import { motion } from 'framer-motion';

import { content } from '../../data/content';
import { useInteraction } from '../interactions/InteractionContext';

export function Introduction() {
  const { experienceState } = useInteraction();
  const started = experienceState !== 'init';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center"
    >
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold/90 sm:text-sm">
        {content.intro.eyebrow}
      </p>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        className="mt-3 font-display text-3xl italic text-mid-100 sm:text-5xl"
      >
        {content.intro.title}
      </motion.h1>
    </motion.div>
  );
}