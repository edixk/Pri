import type { ReactNode } from 'react';

import {
  InteractionContext,
  type InteractionContextValue,
} from '../features/interactions/InteractionContext';

export function createInteractionValue(
  overrides: Partial<InteractionContextValue> = {},
): InteractionContextValue {
  return {
    isResolved: () => false,
    resolve: () => {},
    emit: () => {},
    totalCount: 4,
    resolvedCount: 0,
    allResolved: false,
    completed: false,
    latestMessage: null,
    experienceState: 'explore',
    ...overrides,
  };
}

export function interactionWrapper(value: InteractionContextValue) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <InteractionContext.Provider value={value}>{children}</InteractionContext.Provider>;
  };
}