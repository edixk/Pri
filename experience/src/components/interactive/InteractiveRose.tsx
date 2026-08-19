import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { useRose } from '../../features/rose/RoseFeature';
import { HintPulse } from '../feedback/HintPulse';
import { Rose } from '../visual/Rose';

export function InteractiveRose() {
  const rose = useRose();
  const controls = useAnimationControls();
  const reduced = useReducedMotion();
  const prevSway = useRef(rose.swaySignal);

  useEffect(() => {
    if (rose.swaySignal === prevSway.current) return;
    prevSway.current = rose.swaySignal;
    void controls.start({
      rotate: [0, 3, -3, 2, -2, 0],
      transition: { duration: 0.9, ease: 'easeInOut' },
    });
  }, [rose.swaySignal, controls]);

  const bloomPulse = rose.state === 'pressed' || rose.state === 'revealing';
  const revealed = rose.state === 'revealed';

  return (
    <button
      type="button"
      aria-label="La rosa azul. Tócala para hacerla florecer."
      aria-pressed={revealed}
      onClick={rose.handleClick}
      onPointerDown={rose.handlePointerDown}
      onPointerUp={rose.handlePointerUp}
      onPointerEnter={rose.handlePointerEnter}
      onPointerLeave={rose.handlePointerLeave}
      className="relative rounded-full p-2 outline-none focus-visible:outline-2 focus-visible:outline-gold"
    >
      <HintPulse show={!revealed && !reduced} />
      <motion.div
        className="rose-frame"
        animate={bloomPulse ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <motion.div animate={controls}>
          <Rose state={rose.state} />
        </motion.div>
      </motion.div>
    </button>
  );
}