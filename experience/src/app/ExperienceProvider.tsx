import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { content } from '../data/content';
import { siteConfig } from '../data/site.config';
import { totalInteractions } from '../features/interactions/interactionMap';
import {
  InteractionContext,
  type InteractionContextValue,
} from '../features/interactions/InteractionContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { ExperienceSnapshot, ExperienceState } from '../types/experience';
import type { InteractionId } from '../types/interaction';
import type { Message } from '../types/message';
import { createId } from '../utils/ids';

const initialSnapshot: ExperienceSnapshot = {
  discovered: [],
  visitCount: 0,
  completed: false,
};

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useLocalStorage<ExperienceSnapshot>(
    siteConfig.storageKey,
    initialSnapshot,
  );
  const [resolved, setResolved] = useState<ReadonlySet<InteractionId>>(
    () => new Set(snapshot.discovered),
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [completed, setCompleted] = useState(snapshot.completed);
  const [visitCount, setVisitCount] = useState(snapshot.visitCount);
  const [experienceState, setExperienceState] = useState<ExperienceState>('init');
  const announcedCompletion = useRef(false);

  useEffect(() => {
    setExperienceState('intro');
    const timer = window.setTimeout(() => {
      setExperienceState((prev) => (prev === 'intro' ? 'explore' : prev));
    }, siteConfig.durations.intro);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setVisitCount((count) => count + 1);
  }, []);

  useEffect(() => {
    setSnapshot({ discovered: Array.from(resolved), visitCount, completed });
  }, [resolved, visitCount, completed, setSnapshot]);

  const isResolved = useCallback((id: InteractionId) => resolved.has(id), [resolved]);

  const resolve = useCallback((id: InteractionId, message?: Message) => {
    setResolved((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    if (message) {
      setMessages((prev) => [...prev, message]);
    }
  }, []);

  const emit = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const resolvedCount = resolved.size;
  const allResolved = resolvedCount === totalInteractions;

  useEffect(() => {
    if (allResolved) {
      setCompleted(true);
      setExperienceState('complete');
    } else if (resolvedCount > 0) {
      setExperienceState((prev) => (prev === 'complete' ? prev : 'revealed'));
    }
  }, [allResolved, resolvedCount]);

  useEffect(() => {
    if (allResolved && !announcedCompletion.current) {
      announcedCompletion.current = true;
      const completionMessage: Message = {
        id: createId('message-completion'),
        text: content.completion.text,
        kind: 'completion',
        priority: 10,
      };
      setMessages((prev) => [...prev, completionMessage]);
    }
  }, [allResolved]);

  const latestMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  const value = useMemo<InteractionContextValue>(
    () => ({
      isResolved,
      resolve,
      emit,
      totalCount: totalInteractions,
      resolvedCount,
      allResolved,
      completed,
      latestMessage,
      experienceState,
    }),
    [isResolved, resolve, emit, resolvedCount, allResolved, completed, latestMessage, experienceState],
  );

  return <InteractionContext.Provider value={value}>{children}</InteractionContext.Provider>;
}