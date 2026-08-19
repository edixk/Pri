import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

import { content } from '../../data/content';
import { interactionConfig } from '../../data/interaction.config';
import { useHaptics } from '../../hooks/useHaptics';
import { useInteraction } from '../interactions/InteractionContext';
import type { RoseState } from '../../types/interaction';
import type { Message } from '../../types/message';

export interface RoseFeature {
  state: RoseState;
  pressed: boolean;
  swaySignal: number;
  handleClick: () => void;
  handlePointerDown: () => void;
  handlePointerUp: () => void;
  handlePointerEnter: () => void;
  handlePointerLeave: () => void;
}

export function useRose(): RoseFeature {
  const { isResolved, resolve } = useInteraction();
  const haptic = useHaptics();
  const reduced = useReducedMotion();
  const [state, setState] = useState<RoseState>('idle');
  const [pressed, setPressed] = useState(false);
  const [swaySignal, setSwaySignal] = useState(0);
  const tapCount = useRef(0);
  const lastSway = useRef(0);
  const bloomTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (bloomTimer.current !== null) window.clearTimeout(bloomTimer.current);
    };
  }, []);

  const handleClick = useCallback(() => {
    const resolved = isResolved('rose');
    const now = Date.now();

    if (resolved) {
      if (now - lastSway.current < interactionConfig.rose.swayCooldownMs) return;
      lastSway.current = now;
      haptic(interactionConfig.haptics.light);
      if (!reduced) setSwaySignal((signal) => signal + 1);
      return;
    }

    tapCount.current += 1;
    haptic(interactionConfig.haptics.medium);

    if (tapCount.current >= interactionConfig.rose.tapsToReveal) {
      if (bloomTimer.current !== null) window.clearTimeout(bloomTimer.current);
      setState('revealed');
      const roseMessage: Message = {
        id: 'message-rose',
        text: content.rose.reveal,
        trigger: 'rose',
        priority: 5,
        kind: 'secondary',
      };
      resolve('rose', roseMessage);
      return;
    }

    setState('revealing');
    if (bloomTimer.current !== null) window.clearTimeout(bloomTimer.current);
    bloomTimer.current = window.setTimeout(() => {
      setState((prev) => (prev === 'revealing' ? 'idle' : prev));
    }, interactionConfig.rose.bloomMs);
  }, [isResolved, resolve, haptic, reduced]);

  const handlePointerDown = useCallback(() => {
    setPressed(true);
    setState((prev) => (prev === 'idle' || prev === 'hover' ? 'pressed' : prev));
  }, []);

  const handlePointerUp = useCallback(() => {
    setPressed(false);
  }, []);

  const handlePointerEnter = useCallback(() => {
    setState((prev) => (prev === 'idle' ? 'hover' : prev));
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPressed(false);
    setState((prev) => (prev === 'hover' || prev === 'pressed' ? 'idle' : prev));
  }, []);

  return {
    state,
    pressed,
    swaySignal,
    handleClick,
    handlePointerDown,
    handlePointerUp,
    handlePointerEnter,
    handlePointerLeave,
  };
}