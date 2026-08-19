import type { InteractionId } from './interaction';

export type MessageKind = 'secondary' | 'completion';

export interface Message {
  id: string;
  text: string;
  trigger?: InteractionId;
  priority: number;
  kind: MessageKind;
}