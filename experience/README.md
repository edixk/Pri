# Jardín de Medianoche

Una experiencia web de una sola página, hecha a mano, para una persona concreta: **Priscila**.

No es una landing page ni una plantilla. Es una pequeña experiencia narrativa e interactiva donde todo el mensaje principal está visible sin tocar nada, y donde la curiosidad es recompensada con pequeñas revelaciones: una rosa azul, un pollito que se asoma, un pétalo y una estrella que guardan frases que solo ella puede encontrar.

Stack: **React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide React**.

---

## Requisitos

- Node.js 18 o superior
- npm (en Windows, si la política de ejecución bloquea `npm.ps1`, usar `npm.cmd`)

## Instalación

```bash
npm install        # o: npm.cmd install
```

## Scripts

| Comando                 | Descripción                                    |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Servidor de desarrollo (Vite)                  |
| `npm run build`         | Typecheck + build de producción (`dist/`)      |
| `npm run preview`       | Previsualizar el build de producción           |
| `npm run typecheck`     | Verificación de tipos (tsc)                    |
| `npm test`              | Suite de tests (Vitest)                        |
| `npm run test:watch`    | Tests en modo watch                            |

## Estructura

```text
src/
├── app/               Composición raíz: App, ExperienceProvider, ErrorBoundary
├── components/
│   ├── layout/        AppShell, AmbientBackground
│   ├── visual/        Rose (SVG), Chick (SVG), Starfield, PetalField
│   ├── interactive/   InteractiveRose, InteractiveChick, Discoverable
│   ├── message/       MessageReveal (aria-live), MessageCard
│   └── feedback/      CompletionBadge, HintPulse
├── features/
│   ├── introduction/  Entrada del mensaje
│   ├── rose/          Lógica de estados de la rosa (useRose)
│   ├── chick/         Máquina de estados del pollito (useChick)
│   ├── discoveries/   Elementos descubribles (pétalo, estrella)
│   ├── messages/      Mensajes revelados + completado
│   └── interactions/  InteractionContext + interactionMap
├── hooks/             useDocumentVisibility, useHaptics, useLocalStorage, usePrefersReducedMotion
├── data/              content.ts, site.config.ts, interaction.config.ts
├── styles/            global.css (Tailwind v4 + tokens + safe areas + reduced motion)
├── utils/             storage, matchMedia, ids
└── types/             interaction, experience, message
```

## Modificar contenido

Todo el texto vive en `src/data/content.ts`. Cambiar una frase **no requiere tocar ningún componente**:

- `intro` — titular y subtítulo de entrada.
- `message` — el mensaje principal (párrafos + firma).
- `rose` — mensaje que revela la rosa.
- `chick` — aviso y revelación del pollito.
- `discoveries` — frases del pétalo y la estrella.
- `completion` — insignia y mensaje final.
- `footer` — pie de página.

La configuración (tiempos, toques, persistencia) está en `src/data/site.config.ts` y `src/data/interaction.config.ts`.

## Modificar assets

- Las ilustraciones son SVG **inline** (React): `src/components/visual/Rose.tsx` y `src/components/visual/Chick.tsx`.
- El favicon es un SVG estático en `public/favicon.svg`.
- No hay imágenes rasterizadas ni fuentes externas.

## Modificar interacciones

El sistema de interacciones está centralizado:

1. `src/types/interaction.ts` — identificadores y estados.
2. `src/features/interactions/interactionMap.ts` — registro de interacciones.
3. `src/data/interaction.config.ts` — toques, cooldowns y haptics.
4. Los estados de la rosa y el pollito son máquinas de estado explícitas en `useRose` y `useChick`.

Ver `docs/INTERACTION_SPEC.md` para el detalle completo.

## Documentación

En `docs/`:

- `DESIGN_SYSTEM.md` — identidad visual, tokens, movimiento, responsive.
- `ARCHITECTURE.md` — capas, flujo de datos, decisiones.
- `INTERACTION_SPEC.md` — sistema de interacciones y estados.
- `CONTENT_SPEC.md` — modelo de contenido y personalización.
- `AGENT_CONTRACTS.md` — contratos entre componentes/capas.
- `QA_REPORT.md` — validación y hallazgos.
- `PERFORMANCE_REPORT.md` — presupuesto y rendimiento.

## Vercel

El proyecto es una SPA estática estándar de Vite.

- **Build command:** `npm run build` (auto-detectado por Vercel)
- **Output directory:** `dist`
- **Instalación:** `npm install` (auto-detectado)

No requiere `vercel.json` ni variables de entorno. Los assets usan rutas absolutas (`/assets/...`), válidas en el dominio raíz. La ruta base es `/`.