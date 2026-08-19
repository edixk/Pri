import { createContext, useContext } from 'react';

import type { ExperienceState } from '../../types/experience';
import type { InteractionId } from '../../types/interaction';
import type { Message } from '../../types/message';

export interface InteractionContextValue {
  isResolved: (id: InteractionId) => boolean;
  resolve: (id: InteractionId, message?: Message) => void;
  emit: (message: Message) => void;
  totalCount: number;
  resolvedCount: number;
  allResolved: boolean;
  completed: boolean;
  latestMessage: Message | null;
  experienceState: ExperienceState;
}

export const InteractionContext = createContext<InteractionContextValue | null>(null);

export function useInteraction(): InteractionContextValue {
  const ctx = useContext(InteractionContext);
  if (!ctx) {
    throw new Error('useInteraction debe usarse dentro de ExperienceProvider');
  }
  return ctx;
}