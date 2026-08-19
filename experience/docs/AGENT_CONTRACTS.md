# AGENT CONTRACTS — Jardín de Medianoche

Contratos entre capas, componentes y agentes del sistema. Este documento define quién puede leer, escribir y decidir sobre cada área, y qué forma tienen los reportes.

---

## 1. Ownership

| Área                  | Propietario                 | Permisos                                   |
| --------------------- | --------------------------- | ------------------------------------------ |
| `src/data/**`         | Content/data owner          | Contenido y configuración (editable)       |
| `src/components/**`   | Frontend (presentación)     | Lectura del estado vía props/hooks         |
| `src/features/**`     | Frontend (lógica de dominio)| Máquinas de estado, contextos              |
| `src/hooks/**`        | Frontend (lógica navegador) | Hooks reutilizables                        |
| `src/types/**`        | Arquitectura                | Contratos de tipos                         |
| `src/utils/**`        | Arquitectura                | Utilidades puras                           |
| `docs/**` + `README`  | Documentation               | Fuente de verdad documental                |
| `src/**/*.test.*`     | Testing                     | Cobertura de lógica crítica                |

Regla general: un agente puede **leer** fuera de su área pero solo **escribir** dentro de su ownership, salvo autorización explícita del Orquestador.

## 2. Contratos de datos

### InteractionContext (`src/features/interactions/InteractionContext.tsx`)

```ts
interface InteractionContextValue {
  isResolved: (id: InteractionId) => boolean;
  resolve: (id: InteractionId, message?: Message) => void;   // idempotente
  emit: (message: Message) => void;
  totalCount: number;
  resolvedCount: number;
  allResolved: boolean;
  completed: boolean;
  latestMessage: Message | null;
  experienceState: ExperienceState;
}
```

- `resolve` es idempotente: no re-emite mensajes ni duplica descubrimientos.
- `latestMessage` es la última revelación (el componente `MessageReveal` la muestra en un `aria-live`).
- Cualquier cambio en este contrato obliga a actualizar el harness de tests (`src/test/harness.tsx`).

### Message

```ts
interface Message {
  id: string;
  text: string;
  trigger?: InteractionId;
  priority: number;
  kind: 'secondary' | 'completion';
}
```

### Máquinas de estado

```ts
type RoseState  = 'idle' | 'hover' | 'pressed' | 'revealing' | 'revealed';
type ChickState = 'initial' | 'peek' | 'noticed' | 'interaction' | 'reaction';
type ExperienceState = 'init' | 'intro' | 'explore' | 'revealed' | 'complete';
```

Transiciones documentadas en `docs/INTERACTION_SPEC.md`. No crear estados imposibles; no usar booleanos ambiguos.

## 3. Contratos entre componentes

- Los componentes hermanos **no** manipulan el estado interno de otros. Solo: props, callbacks y `InteractionContext`.
- Patrón: `InteractiveRose` → `useRose()` → `Rose (SVG puro)`. El SVG nunca decide lógica.
- El contenido nunca entra en JSX directamente: solo vía `content` de `src/data/content.ts`.

## 4. Contratos con el navegador

- Persistencia: `src/utils/storage.ts` (safe read/write/remove). Nunca acceder a `localStorage` directamente desde un componente.
- Haptics: `src/hooks/useHaptics.ts` (feature detect + try/catch).
- Media queries: `src/utils/matchMedia.ts` (protegido para SSR/test).
- Visibilidad: `src/hooks/useDocumentVisibility.ts`.

## 5. Formato de reporte de error

Todos los agentes reportan al Orquestador con la misma estructura YAML:

```yaml
status: failed | blocked
error_type: local | specialization | conflict | systemic
severity: low | medium | high | critical
recoverable: true/false
suggested_agents: []
blocked_paths: []
```

## 6. Reglas de colaboración

- No sobrescribir trabajo ajeno sin revisar.
- No eliminar funcionalidades sin justificar.
- No instalar dependencias sin justificación (problema real + por qué no se resuelve con React/CSS/TS + impacto de bundle).
- No cambiar contratos públicos sin actualizar `docs/INTERACTION_SPEC.md`, `docs/ARCHITECTURE.md` y el harness de tests.
- Cada cambio importante debe responder: ¿Qué cambió? ¿Por qué? ¿Qué componentes afecta? ¿Qué tests deben repetirse?

## 7. Resolución de conflictos

Prioridad: requerimiento explícito → UX → compatibilidad → accesibilidad → performance → mantenibilidad → preferencia visual. No se resuelven conflictos por votación.