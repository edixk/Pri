import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import { content } from '../../data/content';
import { useInteraction } from '../../features/interactions/InteractionContext';

export function CompletionBadge() {
  const { completed } = useInteraction();

  return (
    <div className="flex justify-center">
      <AnimatePresence>
        {completed && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-2 rounded-full border border-gold/40 bg-night-800/80 px-4 py-2 text-sm text-gold"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>{content.completion.badge}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}