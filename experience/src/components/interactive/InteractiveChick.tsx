import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { useChick } from '../../features/chick/ChickFeature';
import { Chick } from '../visual/Chick';

export function InteractiveChick() {
  const chick = useChick();
  const controls = useAnimationControls();
  const prevReaction = useRef(chick.reaction);

  useEffect(() => {
    if (chick.reaction === prevReaction.current) return;
    prevReaction.current = chick.reaction;

    if (chick.reaction === 'jump' || chick.reaction === 'bounce') {
      void controls.start({
        y: [0, -16, 0],
        scale: [1, 1.06, 1],
        transition: { duration: 0.5, ease: 'easeOut' },
      });
      return;
    }
    if (chick.reaction === 'tilt') {
      void controls.start({
        rotate: [0, -8, 8, 0],
        transition: { duration: 0.45, ease: 'easeInOut' },
      });
    }
  }, [chick.reaction, controls]);

  const hidden = chick.state === 'initial';

  return (
    <div className="chick-anchor fixed bottom-[calc(env(safe-area-inset-bottom)+0.25rem)] left-[calc(env(safe-area-inset-left)+0.75rem)] z-30">
      <button
        type="button"
        aria-label="Un pollito que te espera de pie en el jardín. Tócalo."
        onClick={chick.handleTap}
        className="absolute inset-0 outline-none focus-visible:outline-2 focus-visible:outline-gold"
      />
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.9 }}
        animate={hidden ? { opacity: 0, y: 14, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 18 }}
      >
        <motion.div animate={controls} className="w-full">
          <Chick
            blink={chick.reaction === 'blink'}
            happy={chick.reaction === 'jump' || chick.reaction === 'bounce'}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
