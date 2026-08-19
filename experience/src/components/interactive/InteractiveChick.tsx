import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { useChick } from '../../features/chick/ChickFeature';
import type { ChickState } from '../../types/interaction';
import { Chick } from '../visual/Chick';

const PEEK_OFFSET: Record<ChickState, number> = {
  initial: 58,
  peek: 38,
  noticed: 24,
  interaction: 14,
  reaction: 4,
};

export function InteractiveChick() {
  const chick = useChick();
  const controls = useAnimationControls();
  const prevReaction = useRef(chick.reaction);

  useEffect(() => {
    if (chick.reaction === prevReaction.current) return;
    prevReaction.current = chick.reaction;

    if (chick.reaction === 'jump' || chick.reaction === 'bounce') {
      void controls.start({
        y: [0, -18, 0],
        scale: [1, 1.08, 1],
        transition: { duration: 0.5, ease: 'easeOut' },
      });
      return;
    }
    if (chick.reaction === 'tilt') {
      void controls.start({
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.45, ease: 'easeInOut' },
      });
    }
  }, [chick.reaction, controls]);

  return (
    <div className="chick-anchor fixed bottom-[calc(env(safe-area-inset-bottom)+0.5rem)] left-[calc(env(safe-area-inset-left)+0.75rem)] z-30 overflow-hidden">
      <button
        type="button"
        aria-label="Un pollito que se asoma solo por ti. Tócalo."
        onClick={chick.handleTap}
        className="absolute inset-0 outline-none focus-visible:outline-2 focus-visible:outline-gold"
      />
      <motion.div
        className="absolute inset-x-0 bottom-0"
        animate={{ y: PEEK_OFFSET[chick.state] }}
        transition={{ type: 'spring', stiffness: 160, damping: 20 }}
      >
        <motion.div animate={controls} className="w-full">
          <Chick blink={chick.reaction === 'blink'} happy={chick.reaction === 'jump' || chick.reaction === 'bounce'} />
        </motion.div>
      </motion.div>
    </div>
  );
}