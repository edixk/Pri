import { motion } from 'framer-motion';

import { useChick } from '../../features/chick/ChickFeature';
import pollitoUrl from '../../../Pollito.svg';

export function InteractiveChick() {
  const chick = useChick();

  return (
    <div className="chick-anchor fixed bottom-[calc(env(safe-area-inset-bottom)+0.25rem)] right-[calc(env(safe-area-inset-right)+0.75rem)] z-30">
      <button
        type="button"
        aria-label="Un pollito que te espera en el jardín. Tócalo."
        onClick={chick.handleTap}
        className="relative block outline-none focus-visible:outline-2 focus-visible:outline-gold"
      >
        <motion.img
          src={pollitoUrl}
          alt=""
          draggable={false}
          className="h-auto w-full select-none"
          animate={{ scale: [1, 1.018, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          whileTap={{ scale: 0.95 }}
        />
      </button>
    </div>
  );
}