import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type CoverPhase = 'sealed' | 'opening' | 'opened';

function WaxSeal() {
  return (
    <div
      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#b02c24] shadow-[inset_0_2px_5px_rgba(0,0,0,0.35),0_4px_10px_rgba(0,0,0,0.5)]"
      aria-hidden="true"
    >
      <div className="absolute inset-[3px] rounded-full border border-[#8e211a]/70" />
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#e63b32]" fill="currentColor">
        <path d="M12 21 C 6 16.5, 2 11.8, 2 7.3 C 2 3.8, 4.5 1.8, 7.5 1.8 C 9.6 1.8, 11.2 2.9, 12 4.9 C 12.8 2.9, 14.4 1.8, 16.5 1.8 C 19.5 1.8, 22 3.8, 22 7.3 C 22 11.8, 18 16.5, 12 21 Z" />
      </svg>
    </div>
  );
}

function Letter({ opening }: { opening: boolean }) {
  return (
    <motion.div
      animate={
        opening ? { scale: 1.06, opacity: 0.5, y: -16 } : { scale: 1, opacity: 1, y: 0 }
      }
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className="relative aspect-[4/3] w-[min(84vw,400px)] rounded-2xl bg-[linear-gradient(145deg,#f8d6dd,#efb7c4)] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]">
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 0 L200 180 L400 0" fill="none" stroke="#e7a8b6" strokeWidth="3" />
          <path d="M0 300 L200 120 L400 300" fill="none" stroke="#e7a8b6" strokeWidth="3" />
        </svg>

        <div className="absolute inset-x-0 top-[28%] flex flex-col items-center px-10 text-center">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-[#9d5662]">
            Para:
          </span>
          <span className="mt-3 font-display text-lg italic leading-snug text-[#5d2b34] sm:text-2xl">
            Priscila Elizabeth Luzardo Mujica
          </span>
        </div>

        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
          <WaxSeal />
        </div>
      </div>
    </motion.div>
  );
}

export function Cover() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<CoverPhase>('sealed');
  const [flashing, setFlashing] = useState(false);

  const handleOpen = useCallback(() => {
    setPhase((prev) => (prev === 'sealed' ? 'opening' : prev));
  }, []);

  useEffect(() => {
    if (phase !== 'opening') return;
    const openMs = reduced ? 220 : 700;
    const peakMs = reduced ? 120 : 300;

    const t1 = window.setTimeout(() => setFlashing(true), openMs);
    const t2 = window.setTimeout(() => setPhase('opened'), openMs + peakMs);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [phase, reduced]);

  useEffect(() => {
    if (phase !== 'opened' || !flashing) return;
    const fadeMs = reduced ? 220 : 700;
    const t = window.setTimeout(() => setFlashing(false), fadeMs);
    return () => window.clearTimeout(t);
  }, [phase, flashing, reduced]);

  if (phase === 'opened' && !flashing) return null;

  return (
    <>
      {phase !== 'opened' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black px-6">
          <button
            type="button"
            aria-label="Carta sellada para Priscila Elizabeth Luzardo Mujica. Tócala para abrirla."
            onClick={handleOpen}
            className="group relative outline-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-gold"
          >
            <Letter opening={phase === 'opening'} />
          </button>
        </div>
      )}

      {flashing && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[60] bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: reduced ? 0.35 : 0.95,
            times: [0, 0.3, 1],
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}