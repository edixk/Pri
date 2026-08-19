# PERFORMANCE REPORT — Jardín de Medianoche

Presupuesto y análisis de rendimiento del estado actual. Registro del tamaño de salida y decisiones de optimización.

---

## 1. Presupuesto de producción (build real, `npm run build`)

| Recurso            | Tamaño      | Gzip     |
| ------------------ | ----------- | -------- |
| `index.html`       | 1.83 kB     | 0.84 kB  |
| `assets/*.css`     | 14.92 kB    | 4.01 kB  |
| `assets/*.js`      | 280.94 kB   | 91.42 kB |
| `favicon.svg`      | < 1 kB      | —        |

- **Requests totales:** 4 (HTML + JS + CSS + favicon). Sin fuentes externas ni imágenes rasterizadas.
- **Imágenes:** 0 rasterizadas. Rosa, pollito y glyphs son SVG inline (sin requests).
- **Dependencias de runtime:** react, react-dom, framer-motion, lucide-react. El grueso del JS es Framer Motion + React.

## 2. Análisis

- JS 91 kB gzip para una experiencia animada con Framer Motion está dentro de un presupuesto razonable (React ≈ 42 kB + Framer ≈ 45 kB gzip). No se justifica code splitting en una pantalla única: el coste de latencia/requests adicionales supera el beneficio.
- CSS 4 kB gzip (Tailwind v4 genera solo las utilidades usadas).
- Sin cargas bloqueantes: contenido principal disponible en el primer render (sin lazy de imágenes, sin fuentes externas, sin API).

## 3. Optimizaciones aplicadas

- **Animaciones solo con `transform` y `opacity`** (sin animar layout ni `box-shadow`/`filter` costosos).
- **Ambientales pausadas** cuando: la pestaña está oculta (`useDocumentVisibility`), hay `prefers-reduced-motion`, o el elemento queda fuera del flujo principal.
- **Sin blur/backdrop-filter** de grandes superficies.
- **CLS controlado**: dimensiones reservadas para rosa, área de mensajes (`min-h-20`) e insignia (`min-h-11`); el pollito tiene tamaño fijo en su contenedor.
- **Cleanup completo** de timers, listeners y observadores en todos los efectos (sin memory leaks).
- **Eventos frecuentes sin listeners globales** de pointermove/scroll/resize.
- **`content-visibility`/render** por composición: las partículas usan `useMemo` (no regeneran specs en cada render).

## 4. Métricas de validación

- Build: ~5 s en local, 1970 módulos transformados.
- Preview local: respuesta HTTP 200, primer byte inmediato (servidor estático local; en Vercel con CDN será similar o mejor).

## 5. Redes (análisis conceptual)

| Condición        | Comportamiento esperado                            |
| ---------------- | -------------------------------------------------- |
| Rápida           | Carga instantánea, 4 requests pequeños              |
| Móvil promedio   | HTML+CSS primero; el mensaje es legible al instante |
| Lenta            | `noscript` + CSS inicial; JS llega en un único chunk |

No se bloquea el renderizado por recursos secundarios; no hay dependencia de red para el mensaje principal.

## 6. Lighthouse / herramientas

- No se ha ejecutado Lighthouse en esta máquina (requiere navegador); las decisiones están alineadas con sus métricas principales: LCP (sin imágenes grandes ni fuentes), CLS (espacio reservado), INP (animaciones transform/opacity, targets ≥ 44 px).
- Ejecutar Lighthouse en el preview de producción antes del despliegue como verificación final.

## 7. Recomendaciones

- Si el bundle JS creciera por encima de ~120 kB gzip, evaluar `lazy` de Framer Motion (`motion/react`) o revisar su configuración.
- No añadir analítica, fuentes externas ni imágenes rasterizadas sin re-evaluar este presupuesto.
- `npm audit`: 2 advisories en `esbuild`/`vite` limitados al dev-server (ver `QA_REPORT.md`, §7). Sin impacto en el bundle de producción.