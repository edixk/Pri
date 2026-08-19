import { content } from '../../data/content';
import type { InteractionId } from '../../types/interaction';
import type { Message } from '../../types/message';

export type DiscoveryVariant = 'petal' | 'star';

export interface DiscoveryDefinition {
  id: 'discovery-petal' | 'discovery-star';
  variant: DiscoveryVariant;
  ariaLabel: string;
  message: Message;
  positionClass: string;
}

export const discoveries: readonly DiscoveryDefinition[] = [
  {
    id: 'discovery-petal',
    variant: 'petal',
    ariaLabel: 'Un pétalo que brilla. Tócalo para ver qué dice.',
    message: {
      id: 'message-petal',
      text: content.discoveries.petal,
      trigger: 'discovery-petal',
      priority: 4,
      kind: 'secondary',
    },
    positionClass: 'bottom-[22%] left-[3%] sm:left-[9%]',
  },
  {
    id: 'discovery-star',
    variant: 'star',
    ariaLabel: 'Una estrella que parpadea. Tócala para ver qué dice.',
    message: {
      id: 'message-star',
      text: content.discoveries.star,
      trigger: 'discovery-star',
      priority: 4,
      kind: 'secondary',
    },
    positionClass: 'top-[16%] right-[4%] sm:right-[10%]',
  },
] as const;

export function isDiscoveryId(id: InteractionId): id is DiscoveryDefinition['id'] {
  return id === 'discovery-petal' || id === 'discovery-star';
}