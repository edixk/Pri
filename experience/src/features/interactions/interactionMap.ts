import type { InteractionDefinition } from './types';

export const interactionMap: readonly InteractionDefinition[] = [
  {
    id: 'rose',
    label: 'La rosa azul',
    ariaLabel: 'La rosa azul. Tócala para hacerla florecer.',
  },
  {
    id: 'chick',
    label: 'El pollito',
    ariaLabel: 'Un pollito que te espera en el jardín. Tócalo.',
  },
  {
    id: 'discovery-petal',
    label: 'Pétalo',
    ariaLabel: 'Un pétalo que brilla. Tócalo para ver qué dice.',
  },
  {
    id: 'discovery-star',
    label: 'Estrella',
    ariaLabel: 'Una estrella que parpadea. Tócala para ver qué dice.',
  },
] as const;

export const totalInteractions = interactionMap.length;