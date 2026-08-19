import { AnimatePresence, motion } from 'framer-motion';

import { useInteraction } from '../../features/interactions/InteractionContext';
import { MessageCard } from './MessageCard';

export function MessageReveal() {
  const { latestMessage } = useInteraction();

  return (
    <section
      aria-label="Mensajes revelados"
      aria-live="polite"
      className="flex min-h-20 w-full items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {latestMessage && (
          <motion.div
            key={latestMessage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full max-w-xl"
          >
            <MessageCard message={latestMessage} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}