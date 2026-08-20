# DESIGN SYSTEM — Jardín de Medianoche

Fuente oficial de verdad para la identidad visual del proyecto. Cualquier cambio de tokens, tipografía, movimiento o responsive debe actualizarse aquí primero.

---

## 1. Concepto

**Jardín de Medianoche.** Una noche profunda donde crece una rosa azul. La paleta mezcla azules nocturnos con un acento dorado tenue, y una luz cálida que acompaña al texto. La identidad comunica: intimidad, calma, cuidado y un detalle deliberado detrás de cada elemento.

## 2. Tokens (Tailwind v4, `src/styles/global.css` → `@theme`)

| Token                | Valor      | Uso                                   |
| -------------------- | ---------- | ------------------------------------- |
| `--color-night-950`  | `#05060f`  | Fondo base                            |
| `--color-night-900`  | `#0b1026`  | Superficies / tarjetas                |
| `--color-night-800`  | `#131a3a`  | Badges, profundidad                   |
| `--color-mid-100`    | `#eef1fb`  | Texto principal                       |
| `--color-mid-300`    | `#a6b1d9`  | Texto secundario / firma              |
| `--color-rose-deep`  | `#2f6bff`  | Pétalos externos (sombra)             |
| `--color-rose-mid`   | `#4f8cff`  | Pétalos intermedios                   |
| `--color-rose-light` | `#7fb4ff`  | Pétalos internos, brillos             |
| `--color-gold`       | `#f5d47a`  | Acento dorado: foco, estrellas, haptics |

### Tipografía

| Token           | Pila                                                        | Uso              |
| --------------- | ----------------------------------------------------------- | ---------------- |
| `--font-display`| `Georgia, "Times New Roman", Times, serif` (itálica)        | Mensaje, títulos |
| `--font-body`   | `-apple-system, …, system-ui, sans-serif`                   | Microcopy        |

No se usan fuentes externas: legibilidad garantizada offline y cero bloqueo de renderizado.

## 3. Fondo

- Degradado lineal `160deg` de `#05060f` → `#0b1026` → `#131a3a`.
- Halo radial superior azul tenue (`rgba(79,140,255,0.14)`).
- Campo de estrellas en capas (56, con deriva/scale/tintineo muy lentos y desincronizados) + pétalos ambientales (10, caída lenta) — ambos `transform/opacity`, pausados con pestaña oculta, fuera de viewport (por composición) o reduced motion.

## 4. Composición

- Columna centrada `max-w-3xl`, contenido máximo `max-w-xl` para el mensaje.
- Jerarquía: eyebrow → título → ramo → mensaje → firma → pie.
- El ramo es el centro visual: un ramo multicapa (varias flores, hojas, tallos, papel de envoltura y cinta) de `clamp(230px, 44vw, 400px)`, ratio `320/460`.
- El pollito (asset `Pollito.svg`) está en la esquina inferior derecha: `clamp(76px, 20vw, 108px)` de ancho, siempre presente y nunca dominante.
- Espacio reservado (sin CLS) para: ramo, mensajes (`min-h-20`), insignia de completado (`min-h-11`).

## 5. Movimiento

Categorías:

| Categoría            | Ejemplos                                              |
| -------------------- | ----------------------------------------------------- |
| Entrance             | Entrada escalonada del título                          |
| Interaction          | Bloom de la rosa central, micro-pulso del pollito al tocarlo, scale al tocar descubribles |
| Ambient              | Estrellas en deriva/tintineo por capas, pétalos cayendo, ramo respirando (flores, hojas, papel y cinta) |
| Transition           | Aparición de mensajes (opacity + y), insignia de completado |

Reglas:

- Solo `transform` y `opacity` (prohibido animar `width/height/top/left/box-shadow/filter`).
- Sin blur/backdrop-filter grandes.
- `MotionConfig reducedMotion="user"` a nivel de app + `@media (prefers-reduced-motion: reduce)` que colapsa CSS animations/transitions.
- Ambientales pausadas con `document.visibilityState` y cuando reduced motion está activo.

## 6. Responsive

Mobile-first. Breakpoints probados: 320–430 px (móvil), 768–834 (tablet), 1024–1920 (desktop), portrait y landscape.

- Contenedor base `min-height: 100dvh` (con fallback `100vh` en `body`).
- Safe areas iOS: `env(safe-area-inset-top/right/bottom/left)` en padding del contenido, pollito y elementos fijos.
- Landscape corto (`orientation: landscape` + `max-height: 520px`): el pollito se reduce a 76×84 px y el padding inferior reservado baja a 3.5rem.
- Prohibido overflow horizontal: contenedor `overflow-x-clip` en el shell y causas reales resueltas (no ocultación global indiscriminada).

## 7. Estados interactivos

| Estado | Significado                                        |
| ------ | -------------------------------------------------- |
| idle   | Reposo, sin intervención                            |
| hover  | Desktop, cursor encima                             |
| pressed| Pulsación (pointerdown)                            |
| revealing | Respuesta visual en curso (bloom)               |
| revealed | Terminal: revelado y "iluminado"                 |

Siempre hay feedback: escala, color, movimiento o aparición de contenido. Los targets interactivos miden ≥ 44 px.

## 8. Accesibilidad visual

- Contraste: texto principal `#eef1fb` sobre fondo nocturno (alto contraste); secundario `#a6b1d9` dentro de los límites para texto.
- Foco visible dorado (`outline-gold`) en todos los controles.
- `aria-hidden="true"` en decoración (SVGs, partículas, pulso de pista).
- Los controles son `<button>` reales con `aria-label` descriptivo.

## 9. Reducción de movimiento

- CSS: `animation-duration: 0.01ms`, iteraciones `1`, transiciones colapsadas.
- Framer: `reducedMotion="user"` (transform/layout desactivados, opacity conservada).
- Ambientales apagadas por JS cuando el usuario lo solicita.
- La experiencia completa sigue funcionando sin animaciones.