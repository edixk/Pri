# INTERACTION SPEC — Jardín de Medianoche

Fuente oficial de verdad del sistema de interacciones. Antes de cambiar estados, toques o configuraciones, actualizar este documento.

---

## 1. Principio

> La curiosidad debe ser recompensada.

El mensaje principal es completamente legible sin interacción (modo pasivo). Las interacciones añaden **revelaciones emocionales**, nunca contenido esencial. Nada esencial depende de hover, de descubrir secretos ni de seguir instrucciones ocultas.

## 2. Sistema

- Todos los handlers pasan por la máquina de estados del feature correspondiente (`useRose`, `useChick`, `Discoverable`).
- No hay handlers sueltos repartidos por componentes.
- Identificadores (`src/types/interaction.ts`):

```ts
type InteractionId = 'rose' | 'chick' | 'discovery-petal' | 'discovery-star';
```

- Registro en `src/features/interactions/interactionMap.ts`.
- Configuración en `src/data/interaction.config.ts`.

## 3. Interacciones

### 3.1 La rosa azul — `rose`

Estados: `idle → hover → pressed → revealing → revealed` (terminal).

| Acción                         | Respuesta                                         |
| ------------------------------ | ------------------------------------------------- |
| Tap 1                          | `revealing`: bloom (pétalos se abren) + pulso de escala |
| Tap 2 (umbral configurado)     | `revealed`: revela el mensaje de la rosa          |
| Tap posterior (revelada)       | Balanceo suave (cooldown 2.4 s) + haptic ligero   |
| Pointer down / enter / leave   | `pressed` / `hover` con degradación segura a `idle` |

Reglas: no vuelve a revelar (idempotente). `aria-pressed` refleja el estado `revealed`. Haptics opcionales.

### 3.2 El pollito — `chick`

Estados: `initial → peek → noticed → interaction → reaction` (según `src/types/interaction.ts`).

| Evento                     | Respuesta                                   |
| -------------------------- | ------------------------------------------- |
| Entra en escena a los 2.6 s| `peek`: aparece de pie con entrada suave    |
| Tap 1                      | `noticed`: salto/parpadeo + aviso "Estoy aquí" |
| Tap 2                      | `interaction`: nueva reacción               |
| Tap 3 (umbral)             | `reaction`: se asoma del todo + mensaje     |
| Taps posteriores           | Reacciones cíclicas (jump/blink/tilt/bounce) |

Zona visual estable: de pie en la parte inferior, permanentemente presente, nunca se desplaza por la pantalla. Reacciones cíclicas sin repetir spam de mensajes.

### 3.3 Elementos descubribles — `discovery-petal` / `discovery-star`

Tipo **Discovery**: aparentan decoración, pero al tocarlos revelan una frase.

| Elemento | Posición                                | Contenido              |
| -------- | --------------------------------------- | ---------------------- |
| Pétalo   | `bottom-[22%] left-[3%]` (móvil)        | Frase del pétalo       |
| Estrella | `top-[16%] right-[4%]` (móvil)          | Frase de la estrella   |

- Cooldown 2.6 s contra toques accidentales repetidos.
- `pointer-events: auto` en el botón (el host es `pointer-events: none` para no bloquear el fondo).
- Tras resolverse, `HintPulse` se detiene y el tap no re-emite el mensaje.

### 3.4 Haptics

- `navigator.vibrate()` opcional, dentro de `try/catch` con feature detect.
- Sin vibración → sin error.
- Patrones: `light: 6`, `medium: 12`.

## 4. Completado

Cuando las 4 interacciones están resueltas:

- Estado → `complete`.
- Insignia "Jardín recorrido" (con `role="status"`).
- Mensaje de completado emitido una única vez (guard `announcedCompletion`).

## 5. Contratos

Cada interacción cumple: `input → state transition → visual feedback → optional content update`.

- El feedback visual es responsabilidad de los componentes de presentación (`InteractiveRose`, `InteractiveChick`, `Discoverable`).
- La lógica de estado es responsabilidad de los hooks de feature (`useRose`, `useChick`).
- La revelación de contenido es responsabilidad del `ExperienceProvider` (mensajes) y `MessageReveal` (`aria-live="polite"`).

## 6. Mobile-first

- Todas las interacciones usan `click`/pointer events (funcionan táctiles y teclado).
- Targets ≥ 44 px.
- Sin `hover` como único acceso a información.
- Sin `touch-action: none` global.
- Landscape corto: pollito reducido, sin superposición agresiva.

## 7. Reduced motion

- `MotionConfig reducedMotion="user"` + CSS `@media (prefers-reduced-motion: reduce)`.
- Con reduced motion: sin blooms/sways/ambientales; los mensajes siguen apareciendo; los estados siguen siendo alcanzables y verificables por tests.