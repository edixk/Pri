import type { InteractionId } from '../../types/interaction';

export interface InteractionDefinition {
  id: InteractionId;
  label: string;
  ariaLabel: string;
}