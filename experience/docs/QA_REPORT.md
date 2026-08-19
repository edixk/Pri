# QA REPORT — Jardín de Medianoche

Informe de validación del estado actual del proyecto (revisión completa, sin deployment).

---

## 1. Resumen

| Comprobación          | Resultado           |
| --------------------- | ------------------- |
| `npm run build`       | PASS                |
| `npm run typecheck`   | PASS                |
| `npm test`            | PASS (12/12)        |
| Preview de producción | HTTP 200, HTML correcto |
| Procesos persistentes | Ninguno (puerto verificado libre) |

## 2. Comprobaciones finitas ejecutadas

- Build de producción (`tsc -b && vite build`) sin errores de compilación.
- Typecheck estricto (`strict`, `noUnusedLocals`, `noUnusedParameters`).
- Suite Vitest: 5 ficheros, 12 tests, todos verdes.
- Preview del `dist/` con `vite preview`: respuesta HTTP 200 y servidor detenido después.
- Revisión manual de `dist/index.html`: assets hasheados referenciados correctamente y `noscript` de fallback presente.

## 3. Hallazgos corregidos en esta revisión

| Hallazgo | Corrección |
| -------- | ---------- |
| Elementos descubribles no recibían clics (el contenedor `pointer-events-none` heredaba a los botones) | `pointer-events-auto` en el botón de `Discoverable` |
| Reduced motion no se aplicaba globalmente a las animaciones de Framer | `MotionConfig reducedMotion="user"` en `App` |
| Pollito y padding inferior sin ajuste en landscape móvil | Clases `.chick-anchor` y `.content-safe` con media query de landscape |
| Contenido genérico (intercambiable entre personas) | Contenido personalizado para Priscila con nomenclatura afectiva variada |
| `noscript` y metadatos con contenido genérico | Actualizados con el mensaje personalizado |
| Artefactos `*.tsbuildinfo` presentes | Eliminados y excluidos en `.gitignore` |
| Sin `.gitignore` | Creado (node_modules, dist, .env*, logs, editor) |
| Sin cobertura de lógica crítica | Añadida suite Vitest (content, storage, rose, chick, app) |

## 4. Auditoría por perspectiva

### Experiencia
- Mensaje principal 100 % legible sin interacción (modo pasivo).
- Progresión emocional: entrada → invitación → profundidad → revelaciones → cierre.
- Nomenclatura afectiva variada (Pri, mi Luz, mi Pris, mi cielo, Priscila Luzardo) integrada de forma natural.

### Implementación
- Interacciones con máquinas de estado explícitas y contratos claros.
- Sin handlers sueltos; todo pasa por `InteractionContext` y los hooks de feature.
- Cleanup completo de timers y listeners en todos los efectos.
- `ErrorBoundary` aísla secciones interactivas sin mostrar stack traces.

### Contenido
- Todo el texto centralizado en `src/data/content.ts`.
- Sin inventos de hechos; la personalización se logra con voz y tratamiento del nombre.

### Producción
- Build Vite estándar, output `dist/`, base `/`, assets absolutos → compatible con Vercel sin `vercel.json`.
- Sin variables de entorno ni secretos.
- Rutas compatibles con case-sensitive de Linux.

## 5. Accesibilidad verificada

- Landmarks semánticos (`header`, `main`, `footer`).
- Controles reales (`<button>`) con `aria-label` y foco visible dorado.
- Región `aria-live="polite"` para revelaciones (`MessageReveal`).
- Decoración marcada con `aria-hidden="true"`.
- `prefers-reduced-motion` gestionado por CSS y por Framer (`reducedMotion="user"`).
- `noscript` con mensaje completo si JavaScript no carga.
- Safe areas de iOS y `min-height: 100dvh` aplicados.

## 6. Compatibilidad y móvil

- Viewports analizados: 320–430 px, 768–834, 1024–1920, portrait y landscape.
- Todos los objetivos interactivos ≥ 44 px; sin dependencia de hover.
- Sin overflow horizontal (contenedor `overflow-x-clip` + causas resueltas).
- Landscape corto: pollito reducido y padding reservado ajustado.

## 7. Riesgos conocidos (sin impacto en producción)

- `npm audit` reporta 2 advisories en `esbuild`/`vite` (dev tooling). Afectan únicamente al dev-server local de Vite, nunca al bundle estático servido. La corrección requiere `vite@8` (breaking change), no justificado para este proyecto; se mantiene `vite@5.4.21`.
- Compatibilidad real con Safari iOS y Chrome Android requiere validación en dispositivos físicos; no se ha podido probar hardware aquí.

## 8. Criterios de aceptación funcional

- [x] La página carga correctamente (preview HTTP 200).
- [x] El contenido principal aparece sin esperar todos los assets.
- [x] La rosa está presente y es interactiva.
- [x] El pollito está presente y no rompe la composición.
- [x] Existen interacciones secundarias cuidadosamente diseñadas (pétalo, estrella).
- [x] Existe un mecanismo de descubrimiento.
- [x] Las interacciones producen feedback visible.
- [x] El contenido principal no depende de las interacciones.
- [x] Sin elementos interactivos sin propósito.
- [x] Responsive completo sin overflow horizontal.
- [x] Safe areas consideradas.
- [x] Reduced motion funciona.
- [x] Navegación por teclado disponible (botones reales).
- [x] Estados interactivos claros.
- [x] Assets optimizados (SVG inline; sin rasterizados).
- [x] Sin errores críticos de JavaScript.
- [x] El build termina correctamente.