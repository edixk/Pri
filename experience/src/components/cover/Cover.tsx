import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type CoverPhase = 'sealed' | 'opening' | 'opened';

function WaxSeal() {
  return (
    <div
      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#d64a3d,#b02c24_55%,#8e211a)] shadow-[inset_0_2px_6px_rgba(0,0,0,0.4),0_4px_12px_rgba(0,0,0,0.55)]"
      aria-hidden="true"
    >
      <div className="absolute inset-[3px] rounded-full border border-[#7e1c16]/60" />
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#ef3b35]" fill="currentColor">
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
      <div className="relative aspect-[4/3] w-[min(84vw,400px)] overflow-hidden rounded-xl bg-[linear-gradient(150deg,#f9dde3_0%,#f1c1cd_100%)] shadow-[0_26px_60px_-18px_rgba(0,0,0,0.85)]">
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* solapa doblada desde arriba (triángulo, sin líneas cruzadas) */}
          <path d="M0 0 L200 120 L400 0 Z" fill="#ecb6c4" />
          {/* bordes de la solapa */}
          <path d="M0 0 L200 120" stroke="#e0a4b4" strokeWidth="1.5" fill="none" opacity="0.85" />
          <path d="M400 0 L200 120" stroke="#e0a4b4" strokeWidth="1.5" fill="none" opacity="0.85" />
          {/* pliegue superior de la solapa */}
          <path d="M0 0 L400 0" stroke="#d99faf" strokeWidth="1" fill="none" opacity="0.6" />
          {/* borde de papel (luz sutil en el contorno) */}
          <rect
            x="1.5"
            y="1.5"
            width="397"
            height="297"
            rx="11"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1"
          />
        </svg>

        {/* sello de cera en la punta de la solapa */}
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2">
          <WaxSeal />
        </div>

        {/* destinatario */}
        <div className="absolute inset-x-0 top-[54%] flex flex-col items-center px-10 text-center">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-[#9d5662]">
            Para:
          </span>
          <span className="mt-3 font-display text-lg italic leading-snug text-[#5d2b34] sm:text-2xl">
            Priscila Elizabeth Luzardo Mujica
          </span>
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