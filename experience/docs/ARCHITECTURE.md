# ARCHITECTURE — Jardín de Medianoche

Fuente oficial de verdad de la arquitectura del proyecto. La implementación actual tiene prioridad sobre cualquier descripción previa; si el código y este documento divergen, actualizar el documento.

---

## 1. Principios

- **Presentación / datos / lógica / utilidades separados.** Cambiar una frase no toca componentes.
- **Sin estado global.** Un único `Context` limitado (`InteractionContext`) gestiona el estado de la experiencia.
- **Sin backend, sin API, sin router.** Experiencia de una pantalla; la ruta es `/`.
- **Dependencias mínimas.** React, ReactDOM, Framer Motion, Lucide React (1 icono). Dev: Vite, Tailwind v4, TypeScript, Vitest.

## 2. Capas

```text
src/
├── app/          Composición raíz (App, ExperienceProvider, ErrorBoundary)
├── components/   Presentación pura (visual / interactive / message / feedback / layout)
├── features/     Lógica de dominio (introduction, rose, chick, discoveries, messages, interactions)
├── hooks/        Lógica reutilizable de navegador
├── data/         Contenido y configuración (single source of truth)
├── styles/       CSS global + tokens
├── utils/        Utilidades sin estado
└── types/        Tipos compartidos
```

## 3. Flujo de datos

```text
User input (click/tap)
  → componente interactivo (presentación)
  → hook de feature (useRose / useChick) — máquina de estados
  → InteractionContext.resolve(id, message) / emit(message)
  → ExperienceProvider actualiza resolved/messages/completed
  → componentes de feedback reaccionan (MessageReveal, CompletionBadge)
  → useLocalStorage persiste snapshot
```

## 4. Estado de la experiencia

Máquina explícita (`src/types/experience.ts`):

```text
init → intro → explore → revealed → complete
```

- `init`: primer render.
- `intro`: entrada escalonada (1.8 s).
- `explore`: el usuario puede interactuar.
- `revealed`: al menos una interacción resuelta.
- `complete`: todas las interacciones resueltas → insignia + mensaje final.

## 5. Persistencia

- Clave única: `midnight-garden:v1` (`src/data/site.config.ts`).
- Guarda: `{ discovered: InteractionId[], visitCount, completed }`.
- Razón UX: re-encuentro (no perder descubrimientos al recargar) y estado completado.
- Acceso aislado y a prueba de fallos en `src/utils/storage.ts` (JSON corrupto o almacenamiento bloqueado → la experiencia sigue sin persistir).
- No se guarda información personal.

## 6. Interacciones

- Registro central en `src/features/interactions/interactionMap.ts`.
- Estados por componente en `src/types/interaction.ts`.
- Configuración (toques, cooldowns, haptics) en `src/data/interaction.config.ts`.
- Los componentes hermanos **nunca** manipulan el estado interno de otros: solo props, callbacks y el Context.

Ver `docs/INTERACTION_SPEC.md`.

## 7. Decisiones relevantes

| Decisión                                   | Motivo                                                        |
| ------------------------------------------ | ------------------------------------------------------------- |
| Sin router ni code splitting               | Una pantalla; fragmentar no aporta.                            |
| SVGs inline (rosa, pollito, glyphs)        | Cero requests de imágenes, escalado perfecto.                  |
| Sin fuentes externas                       | Rendimiento, offline, sin bloqueo de renderizado.              |
| `min-h-dvh` + `100vh` de fallback          | Compatibilidad con viewports dinámicos de iOS.                 |
| `overflow-x-clip` en el shell              | Evita overflow horizontal sin ocultar contenido relevante.     |
| ErrorBoundary en secciones interactivas    | Un fallo decorativo no rompe la experiencia completa.          |
| `MotionConfig reducedMotion="user"`        | Reduced motion gestionado a nivel global de Framer.            |
| Sin `vercel.json`                          | Vite SPA se auto-despliega en Vercel; no hace falta config.    |

## 8. Producción (Vercel)

- Build: `npm run build` → `tsc -b && vite build`.
- Output: `dist/`, base `/`, assets con rutas absolutas `/assets/...`.
- Sin variables de entorno. Sin secretos. `.gitignore` excluye `node_modules`, `dist`, `*.tsbuildinfo` y `.env*`.
- Compatible con Linux: no hay referencias a rutas con distinción de mayúsculas problemáticas; todos los imports usan rutas relativas.