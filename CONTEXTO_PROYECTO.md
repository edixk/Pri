# CONTEXTO DEL PROYECTO — «Jardín de Medianoche»

> **Archivo de mano para cualquier IA o desarrollador futuro.**
> Si te han pasado este archivo, léelo completo antes de hacer nada. Contiene todo lo que el
> usuario ha explicado en sesiones anteriores: qué es el proyecto, qué se ha hecho, qué se exige,
> qué está prohibido y dónde está cada cosa. **No le pidas al usuario que vuelva a contextualizar.**

---

## 0. Cómo usar este documento

1. Lee este archivo completo.
2. Abre `PROMPT_MAESTRO.md` (raíz): es la **especificación original completa** del producto. Este
   documento es un resumen operativo fiel de la misma; ante cualquier duda manda la especificación.
3. Abre `AGENTS.md` (raíz): define el sistema multiagente del repositorio.
4. Para decisiones de diseño, interacciones, contenido, QA y rendimiento, lee
   `experience/docs/*.md` (ver índice en §13).
5. El estado real del código **tiene prioridad** sobre cualquier descripción; si un doc y el código
   divergen, se corrige el doc, no el código.

---

## 1. Identidad del proyecto

- **Nombre de la experiencia:** «Jardín de Medianoche» (`midnight-garden`, `package.json`).
- **Qué es:** una experiencia web personal de una sola página que presenta un **mensaje especial a
  una persona concreta: Priscila Luzardo** (trato cotidiano: **Pri**).
- **Naturaleza:** experiencia narrativa e interactiva, NO una landing page, NO un sitio corporativo,
  NO una plantilla romántica. Debe sentirse escrita a mano para ella.
- **Dos modos de uso:**
  - *Modo pasivo:* abrir y consumir todo el mensaje sin tocar nada (lo esencial NUNCA depende de interacción).
  - *Modo exploración:* descubrir pequeñas interacciones que revelan frases (la curiosidad se recompensa).
- **Stack (fijo e innegociable):** React + TypeScript + Vite + Tailwind CSS + Framer Motion +
  Lucide React (solo iconos necesarios). Sin backend, sin API, sin base de datos, sin auth,
  sin analítica, sin tracking, sin librerías de estado global.
- **Destino de producción:** Vercel (desplegará el usuario; **nunca desplegar tú por tu cuenta**).

---

## 2. Dónde está todo (mapa de rutas real)

```
C:\Users\usuario\.vscode\Projects\VSC\Pri\          ← raíz del workspace
├── AGENTS.md                                        ← sistema multiagente (leer)
├── PROMPT_MAESTRO.md                                ← especificación original completa (leer)
├── CONTEXTO_PROYECTO.md                             ← este archivo
├── Agents/                                          ← 18 definiciones de agentes (.md)
└── experience/                                      ← LA APLICACIÓN
    ├── index.html                                   ← entrada HTML (lang es, viewport-fit, OG, noscript)
    ├── package.json                                 ← deps y scripts
    ├── package-lock.json
    ├── vite.config.ts                               ← plugins react + @tailwindcss/vite
    ├── vitest.config.ts                             ← tests (jsdom)
    ├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
    ├── .gitignore                                   ← node_modules, dist, *.tsbuildinfo, .env*, logs
    ├── README.md
    ├── public/favicon.svg
    ├── docs/                                        ← fuente de verdad documental (ver §13)
    │   ├── DESIGN_SYSTEM.md
    │   ├── ARCHITECTURE.md
    │   ├── INTERACTION_SPEC.md
    │   ├── CONTENT_SPEC.md
    │   ├── AGENT_CONTRACTS.md
    │   ├── QA_REPORT.md
    │   └── PERFORMANCE_REPORT.md
    └── src/
        ├── main.tsx
        ├── app/                  App.tsx · ExperienceProvider.tsx · ErrorBoundary.tsx
        ├── components/
        │   ├── layout/           AppShell.tsx · AmbientBackground.tsx
        │   ├── visual/           Rose.tsx (SVG) · Chick.tsx (SVG) · Starfield.tsx · PetalField.tsx
        │   ├── interactive/      InteractiveRose.tsx · InteractiveChick.tsx · Discoverable.tsx
        │   ├── message/          MessageReveal.tsx (aria-live) · MessageCard.tsx
        │   └── feedback/         CompletionBadge.tsx · HintPulse.tsx
        ├── features/
        │   ├── introduction/     Introduction.tsx
        │   ├── rose/             RoseFeature.tsx (useRose, máquina de estados)
        │   ├── chick/            ChickFeature.tsx (useChick, máquina de estados)
        │   ├── discoveries/      discoveries.ts · DiscoverableHost.tsx
        │   ├── messages/         MessageCenter.tsx
        │   └── interactions/     InteractionContext.tsx · interactionMap.ts · types.ts
        ├── hooks/                useDocumentVisibility · useHaptics · useLocalStorage · usePrefersReducedMotion
        ├── data/                 content.ts (TODOS los textos) · site.config.ts · interaction.config.ts
        ├── styles/               global.css (Tailwind v4: @theme, tokens, safe areas, reduced motion)
        ├── utils/                storage.ts · matchMedia.ts · ids.ts
        ├── types/                interaction.ts · experience.ts · message.ts
        └── test/                 setup.ts · harness.tsx  (+ *.test.ts(x) junto a su código)
```

---

## 3. El sistema multiagente (`AGENTS.md`)

El repositorio define un sistema multiagente de tres niveles. **Todo está en español.** Archivos en
`Agents/`.

- **Orquestador** (`Agents/Mr. Trump-Orquestator.md`): interpreta, planifica, delega, supervisa,
  valida y consolida. **PROHIBIDO escribir código.** En sesiones reales de opencode, el flujo se
  ejecuta delegando a subagentes.
- **Selector** (`Agents/Aduana.md`): consulta **obligatoria antes de planificar** cualquier tarea.
  Solo recomienda; nunca ejecuta.
- **Subagentes** (16): ejecutan dentro de su ownership y reportan solo al orquestador. Nunca se
  hablan entre sí.

Flujo: `Usuario → Orquestador → Aduana (obligatorio) → plan → subagentes ejecutan → validación
(Security/Testing/CodeReview/Performance) → consolidación → Usuario`.

Errores: formato YAML común (`status/error_type/severity/recoverable/suggested_agents/blocked_paths`).

Los agentes relevantes para este proyecto: `frontend-agent.md`, `mobile-agent.md`,
`testing-agent.md`, `documentation-agent.md`, `Review CIA-agent.md`, `performance-agent.md`,
`US Security Secret Service-agent.md`, `refactor-agent.md`.

---

## 4. Requisitos de la especificación original (`PROMPT_MAESTRO.md`)

Resumen operativo. El archivo completo tiene 71 secciones; esto es lo que no se puede violar.

### 4.1 Stack y dependencias
- `react` ^18.3, `react-dom` ^18.3, `framer-motion` ^11.15, `lucide-react`.
- Dev: `vite` ^5.4 (instalado 5.4.21), `typescript` ~5.6, `tailwindcss` ^4 + `@tailwindcss/vite`,
  `@vitejs/plugin-react`, `vitest` (4.1.11) + `jsdom` + `@testing-library/react` + `@testing-library/jest-dom`.
- **Regla:** antes de añadir cualquier dependencia, justificar problema real + por qué no se resuelve
  con React/CSS/TS + impacto de bundle + impacto de mantenimiento.

### 4.2 Reglas de producto (no negociables)
- El mensaje principal es legible sin interacción.
- Cada interacción tiene una razón UX; nada "porque se ve cool".
- Sin backend/API/auth/analítica/tracking/petición de permisos/datos personales.
- `localStorage` solo con razón UX válida (clave real: `midnight-garden:v1`).
- La página debe degradarse con el `noscript` de `index.html` si falla JS (ya implementado).
- Offline: sin service worker (no aporta a una pantalla única).
- Sin fuentes externas, sin imágenes rasterizadas, SVGs inline.

### 4.3 Arquitectura y separación de capas
- Separación estricta: presentación / datos / lógica interactiva / utilidades.
- Todo el texto vive en `src/data/content.ts`; ninguna cadena hardcodeada en JSX.
- Configuración centralizada (`site.config.ts`, `interaction.config.ts`).
- Sistema explícito de interacciones (registro + estados) — no handlers sueltos.
- Componentes hermanos no manipulan el estado interno de otros (props/callbacks/Context limitado).

### 4.4 Elementos obligatorios
- **Rosa azul:** componente propio, independiente, animable, interactiva, con estados.
- **Pollito:** asomando desde una esquina, nunca dominante, recalculado en móvil y safe areas.

### 4.5 Interacciones y estados
- Estados explícitos con tipos, no booleanos ambiguos; sin estados imposibles.
  `RoseState = idle|hover|pressed|revealing|revealed` · `ChickState = initial|peek|noticed|interaction|reaction`
  · `ExperienceState = init|intro|explore|revealed|complete`.
- Tipos soportados: tap, hold, reveal, toggle, discovery, sequence, hover (solo desktop y nunca
  único acceso), pointer movement (solo si aporta).
- Mobile-first; targets ≥ 44 px; sin depender de hover; Pointer Events donde aplique.

### 4.6 Rendimiento, accesibilidad y móvil (operativo)
- Animaciones solo con `transform`/`opacity`; sin blur/backdrop-filter grandes; ambientales pausadas
  al ocultar pestaña (`useDocumentVisibility`), fuera de viewport o con reduced motion.
- `prefers-reduced-motion` OBLIGATORIO (CSS media query + `MotionConfig reducedMotion="user"`).
- iOS/Safari: `min-height: 100dvh`, `env(safe-area-inset-*)`, notch/Dynamic Island/home indicator.
- Sin overflow horizontal; espacio reservado para evitar CLS.
- Accesibilidad: landmarks, `<button>` reales con `aria-label`, foco visible, `aria-live`,
  `aria-hidden` en decoración, navegación por teclado, `aria-pressed` en estados.
- Cleanup de timers/listeners/observers; sin memory leaks; sin listeners globales sin cleanup.

### 4.7 Entregables de documentación
README + `docs/`: DESIGN_SYSTEM, ARCHITECTURE, INTERACTION_SPEC, CONTENT_SPEC, AGENT_CONTRACTS,
QA_REPORT, PERFORMANCE_REPORT. Todos existen (ver §13).

---

## 5. Fase 2 — Revisión total y finalización (instrucciones EN VIGOR)

Fue la segunda gran instrucción del usuario. Sigue teniendo efecto.

### 5.1 Task A = COMPLETADA
- El scaffolding y la implementación base de la experiencia se consideran **completados**.
- **No reconstruir desde cero. No re-planificar. No repetir trabajo ya correcto.**

### 5.2 Prohibiciones vigentes
- **NO realizar deployment** (ni Vercel, ni previews, ni hooks de deploy). El usuario desplegará.
- **NO dejar servidores/procesos persistentes** abiertos. Toda validación debe ser finita
  (build, typecheck, tests, inspección) y, si se levanta un preview, detenerlo y verificar el puerto libre.
- No introducir backend, servidor persistente, base de datos, API propia, procesos permanentes.
- No crear `vercel.json` salvo necesidad comprobable (hoy no existe ni hace falta).

### 5.3 Personalización para Priscila (resumen)
Ver §7 para detalle. Puntos clave:
- La destinataria es **Priscila Luzardo**; trato cotidiano **Pri**.
- El nombre completo se reserva para contextos con propósito emocional real (aparece una sola vez,
  en la estrella).
- Nomenclatura afectiva **variada y natural**, integrada en la voz, nunca forzada ni listada.
- **Prohibido inventar hechos** (recuerdos, fechas, lugares, gustos, experiencias). La
  personalización se logra con voz, profundidad, tratamiento del nombre y estructura.

### 5.4 Criterios de calidad (decisión entre opciones)
- **Autenticidad > frase bonita.** **Naturalidad > creatividad.** **Significatividad > espectáculo.**
- No sobrecargar: la experiencia sigue siendo un mensaje personal, no un juego/portfolio/experimento.

---

## 6. Estado actual y avances

### 6.1 Correcciones aplicadas en la revisión (ya hechas)
| Hallazgo | Corrección |
|---|---|
| Descubribles (pétalo/estrella) no recibían clics: `pointer-events-none` del host se heredaba a los botones | `pointer-events-auto` en el botón de `Discoverable.tsx` |
| Reduced motion no global en Framer | `MotionConfig reducedMotion="user"` en `src/app/App.tsx` |
| Pollito y padding inferior sin ajuste landscape | Clases `.chick-anchor` y `.content-safe` con `@media (orientation: landscape) and (max-height: 520px)` en `global.css` |
| Contenido genérico/intercambiable | Personalizado para Priscila (`content.ts`, `index.html`, `noscript`) |
| Metadatos sin Open Graph | `og:title`, `og:description`, `og:type`, `twitter:card` en `index.html` |
| Artefactos `*.tsbuildinfo` y sin `.gitignore` | Limpiados; `.gitignore` creado |
| Sin cobertura de lógica crítica | Suite Vitest (5 ficheros, 12 tests) |

### 6.2 Verificación (últimos resultados reales)
- `npm run build` → **PASS** (tsc -b + vite build, sin errores).
- `npm run typecheck` → **PASS**.
- `npm test` → **12/12 PASS** en 5 ficheros (content, storage, rose, chick, App).
- `vite preview` → **HTTP 200**, HTML correcto; servidor detenido; puerto 4173 verificado libre.

### 6.3 Presupuesto de rendimiento (build real)
| Recurso | Tamaño | Gzip |
|---|---|---|
| `index.html` | 1.83 kB | 0.84 kB |
| CSS | 16.27 kB | 4.23 kB |
| JS | 280.94 kB | 91.42 kB |
| favicon.svg | <1 kB | — |

- Requests totales: **4** (HTML+JS+CSS+favicon). Sin fuentes externas, sin imágenes rasterizadas.
- El grueso del JS es React (~42 kB) + Framer Motion (~45 kB) en gzip. Sin code splitting
  (pantalla única; no aporta).

---

## 7. Contenido y personalización

### 7.1 Estructura de `experience/src/data/content.ts`
```ts
{
  meta: { title, description },
  intro: { eyebrow, title },              // entrada
  message: { paragraphs[], signature },   // mensaje principal (modo pasivo)
  rose: { reveal },                       // revelación de la rosa
  chick: { notice, reveal },              // aviso + revelación del pollito
  discoveries: { petal, star },           // frases descubribles
  completion: { badge, text },            // insignia + mensaje final
  footer: { text },
}
```
Regla: los componentes consumen `content`; nunca cadenas literales en JSX (salvo `aria-label`).

### 7.2 Nomenclatura afectiva (actual)
| Apelativo | Momento |
|---|---|
| **Pri** | Trato cotidiano: entrada, pollito, pie |
| **mi Luz** | Íntimo: revelación de la rosa (enraizado en el apellido *Luzardo* y en el tema "luz de medianoche") |
| **mi Pris** | Cercano-juguetón: revelación del pollito |
| **mi cielo** | Emocional final: mensaje de completado |
| **Priscila Luzardo** | Único uso del nombre completo: la estrella |

Reglas: no repetir apelativos en piezas consecutivas; no listarlos; no usar diminutivos encadenados
ni términos infantiles artificiales ni expresiones sexuales; que parezcan naturales.

### 7.3 Voz y edición
- Voz humana, íntima, directa, cálida. Sin discurso, poema forzado, marketing ni tono de red social.
- Progresión: cercanía → invitación → profundidad → revelaciones → cierre.
- Editar texto = editar `content.ts`; no toca componentes ni tests estructurales
  (`src/data/content.test.ts` verifica que no haya cadenas vacías y que esté personalizado).
- Si se añade una interacción nueva: `InteractionId` + `interactionMap.ts` + mensaje en `content.ts`
  + `discoveries.ts` si aplica + actualizar `docs/INTERACTION_SPEC.md`.

---

## 8. Decisiones de diseño y arquitectura (resumen de `experience/docs/`)

- **Tema «Jardín de Medianoche»:** azules nocturnos (`#05060f`→`#0b1026`→`#131a3a`), rosa azul
  (`#2f6bff`/`#4f8cff`/`#7fb4ff`), acento dorado `#f5d47a`. Texto serif itálico del sistema
  (`#eef1fb`), microcopy sans (`#a6b1d9`). Sin fuentes externas.
- **Composición:** columna `max-w-3xl` centrada; rosa `clamp(220px,42vw,380px)` como centro; pollito
  `clamp(72px,20vw,104px)` en esquina inferior izquierda con safe areas; espacio reservado (sin CLS).
- **Estados de experiencia:** `init → intro → explore → revealed → complete`.
- **Persistencia:** clave `midnight-garden:v1` (descubiertos + visitas + completado); acceso a prueba
  de fallos en `src/utils/storage.ts`.
- **Contexto:** un único `InteractionContext` limitado (sin librería de estado).
- **Errores:** `ErrorBoundary` por sección interactiva (no rompe el resto, sin stack traces).
- **Vercel:** build `npm run build`, output `dist/`, base `/`, sin `vercel.json`, sin env vars.
- Detalles completos en `docs/DESIGN_SYSTEM.md` y `docs/ARCHITECTURE.md`.

---

## 9. Sistema de interacciones (resumen de `experience/docs/INTERACTION_SPEC.md`)

- Identificadores: `rose | chick | discovery-petal | discovery-star` (total = 4, usado para "completado").
- **Rosa:** tap1 `revealing` (bloom), tap2 `revealed` + mensaje; ya revelada → balanceo con cooldown
  2.4 s; `aria-pressed` refleja el estado; idempotente.
- **Pollito:** asoma a los 2.6 s (`peek`); tap1 `noticed` + aviso; tap2 `interaction`; tap3
  `reaction` + mensaje; después reacciones cíclicas (jump/blink/tilt/bounce). Zona estable.
- **Descubribles (pétalo/estrella):** tipo Discovery; cooldown 2.6 s; tras resolver, el pulso de
  pista (`HintPulse`) se detiene y no re-emiten mensaje.
- **Haptics:** `navigator.vibrate` opcional en try/catch (light 6, medium 12); sin soporte → sin error.
- **Completado:** con las 4 resueltas → insignia «Jardín recorrido» (`role="status"`) + mensaje final
  emitido una única vez.
- Todos los handlers pasan por máquinas de estado (`useRose`, `useChick`) o por el Context; nunca
  handlers sueltos. Ver detalle en `docs/INTERACTION_SPEC.md`.

---

## 10. Entorno técnico (IMPORTANTE)

- **Windows** + **PowerShell 5.1**. La política de ejecución bloquea `npm.ps1` y `npx.ps1`.
  **Usar SIEMPRE `npm.cmd` y `npx.cmd`**, nunca `npm`/`npx` a secas.
- Node **v24.15.0**, npm **11.12.1**.
- Tailwind **v4** (sin `tailwind.config`; se configura en CSS con `@import "tailwindcss"` + `@theme`).
- Los comandos se ejecutan con `workdir = experience/`.
- No hay repo git inicializado en el workspace (pero el proyecto está preparado para Vercel/git).

---

## 11. Despliegue en Vercel (reglas)

- Lo hará el **usuario**. No desplegar por tu cuenta.
- Vercel auto-detecta Vite: build `npm run build`, output `dist/`. No hace falta `vercel.json`.
- Sin variables de entorno ni secretos.
- Checklist pre-deploy: `npm run build`, `npm run typecheck`, `npm test`; opcional Lighthouse sobre
  el preview de producción (no ejecutado aún; requiere navegador).

---

## 12. Riesgos conocidos y deuda técnica

- `npm audit`: 2 advisories de **esbuild/vite** (moderate/high) pero **limitados al dev-server
  local** de Vite; sin impacto en el bundle estático servido. La corrección exige `vite@8`
  (breaking change) → se mantiene `vite@5.4.21`. Documentado en `docs/QA_REPORT.md` §7.
- **Validación en hardware físico pendiente:** Safari iOS y Chrome Android (safe areas, Dynamic
  Island, comportamiento táctil real) no se han probado en dispositivo real.
- **Lighthouse pendiente** (necesita navegador).
- Advertencia de Vitest sobre `esbuild`/`oxc` deprecado (inofensiva).
- Si el bundle JS superara ~120 kB gzip, evaluar `lazy` de Framer Motion.

---

## 13. Índice de documentación (en `experience/docs/`)

| Archivo | Contenido |
|---|---|
| `DESIGN_SYSTEM.md` | Tokens, tipografía, fondo, composición, movimiento, responsive, safe areas, estados, a11y visual |
| `ARCHITECTURE.md` | Capas, flujo de datos, estados de experiencia, persistencia, decisiones, producción Vercel |
| `INTERACTION_SPEC.md` | Sistema de interacciones, máquinas de estado, contratos, mobile-first, reduced motion |
| `CONTENT_SPEC.md` | Modelo de contenido, destinataria, nomenclatura afectiva, voz, progresión, reglas de edición |
| `AGENT_CONTRACTS.md` | Ownership, contratos de datos (Context, Message, estados), contratos de navegador, reportes de error |
| `QA_REPORT.md` | Validación ejecutada, hallazgos corregidos, auditoría, accesibilidad, riesgos |
| `PERFORMANCE_REPORT.md` | Presupuesto real, análisis, optimizaciones, redes, recomendaciones |

`experience/README.md`: requisitos, instalación, scripts, estructura, cómo modificar contenido/
assets/interacciones, notas Vercel.

---

## 14. Comandos útiles

```bash
# dentro de experience/
npm.cmd run dev          # servidor de desarrollo (no dejar abierto como validación habitual)
npm.cmd run build        # typecheck + build de producción (dist/)
npm.cmd run typecheck    # verificación de tipos
npm.cmd test             # suite Vitest (12 tests)
npm.cmd run preview      # previsualizar dist/ (levantar, probar, DETENER)
```

---

## 15. Reglas de oro para futuras sesiones

1. Lee este archivo, `PROMPT_MAESTRO.md` y `AGENTS.md` antes de actuar; usa `docs/*` para decisiones.
2. Task A está completa: **no reconstruir, no re-planificar, no repetir trabajo correcto**.
3. **Nunca desplegar** salvo petición explícita del usuario. **Nunca dejar servidores/procesos**
   persistentes: toda validación es finita.
4. Estado real del código > cualquier descripción previa. No inventar hechos, requisitos ni
   funcionalidades "porque se ven cool".
5. No añadir dependencias sin justificación (problema + por qué no con React/CSS/TS + bundle + mantenimiento).
6. Contenido solo en `content.ts`; interacciones solo por el sistema explícito; sin handlers sueltos.
7. No sacrificar accesibilidad, responsive o rendimiento por estética.
8. Autenticidad > belleza; naturalidad > creatividad; significatividad > espectáculo.
9. Si operas como el sistema multiagente de `AGENTS.md`: consulta a `Aduana.md` antes de planificar,
   el orquestador nunca escribe código, y valida con Testing/Review/Performance/Security.
10. Windows/PowerShell: usa `npm.cmd`. Tailwind v4 se configura en CSS, no en config file.