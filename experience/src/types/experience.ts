import type { InteractionId } from './interaction';

export type ExperienceState = 'init' | 'intro' | 'explore' | 'revealed' | 'complete';

export interface ExperienceSnapshot {
  discovered: InteractionId[];
  visitCount: number;
  completed: boolean;
}