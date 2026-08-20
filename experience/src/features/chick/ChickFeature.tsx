import { useCallback, useState } from 'react';

import { content } from '../../data/content';
import { interactionConfig } from '../../data/interaction.config';
import { useHaptics } from '../../hooks/useHaptics';
import { useInteraction } from '../interactions/InteractionContext';
import type { ChickState } from '../../types/interaction';
import type { Message } from '../../types/message';

const REACTIONS = ['jump', 'blink', 'tilt', 'bounce'] as const;
export type ChickReaction = (typeof REACTIONS)[number];

export interface ChickFeature {
  state: ChickState;
  reaction: ChickReaction;
  tapCount: number;
  handleTap: () => void;
}

export function useChick(): ChickFeature {
  const { isResolved, resolve, emit } = useInteraction();
  const haptic = useHaptics();
  const [state, setState] = useState<ChickState>('initial');
  const [reaction, setReaction] = useState<ChickReaction>('jump');
  const [tapCount, setTapCount] = useState(0);

  const handleTap = useCallback(() => {
    haptic(interactionConfig.haptics.light);
    const resolved = isResolved('chick');

    setReaction(REACTIONS[tapCount % REACTIONS.length]);
    setTapCount((count) => count + 1);

    if (resolved) return;

    const nextCount = tapCount + 1;
    if (nextCount >= interactionConfig.chick.tapsToReveal) {
      setState('reaction');
      const chickRevealMessage: Message = {
        id: 'message-chick-reveal',
        text: content.chick.reveal,
        trigger: 'chick',
        priority: 6,
        kind: 'secondary',
      };
      resolve('chick', chickRevealMessage);
      return;
    }

    if (nextCount === 1) {
      setState('noticed');
      const chickNoticeMessage: Message = {
        id: 'message-chick-notice',
        text: content.chick.notice,
        trigger: 'chick',
        priority: 3,
        kind: 'secondary',
      };
      emit(chickNoticeMessage);
      return;
    }

    setState('interaction');
  }, [isResolved, resolve, emit, haptic, tapCount]);

  return { state, reaction, tapCount, handleTap };
}