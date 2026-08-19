# CONTENT SPEC — Jardín de Medianoche

Fuente oficial de verdad del contenido. Todo texto editable vive en `src/data/content.ts`; este documento explica su estructura, su voz y cómo personalizarlo.

---

## 1. Modelo de contenido

```ts
export const content = {
  meta:      { title, description },
  intro:     { eyebrow, title },
  message:   { paragraphs[], signature },
  rose:      { reveal },
  chick:     { notice, reveal },
  discoveries: { petal, star },
  completion: { badge, text },
  footer:    { text },
} as const;
```

Regla: los componentes consumen `content`; nunca hay cadenas de texto literales en JSX. Las únicas excepciones son microcopy de accesibilidad (`aria-label`) y estados sin texto.

## 2. Destinataria

- Nombre: **Priscila Luzardo**.
- Forma cotidiana: **Pri**.
- El nombre completo se reserva para contextos con propósito emocional real (en la estrella: *"Elegí una estrella y le puse tu nombre entero: Priscila Luzardo."*).

## 3. Nomenclatura afectiva (reglas)

Los apelativos son un elemento narrativo: varían y evolucionan con el tono de cada pieza. Distribución actual:

| Apelativo | Momento                                  |
| --------- | ---------------------------------------- |
| Pri       | Trato cotidiano, entrada, pollito, pie   |
| mi Luz    | Momento íntimo (revelación de la rosa)   |
| mi Pris   | Momento cercano-juguetón (pollito)       |
| mi cielo  | Momento emocional final (completado)     |

Reglas:

- Nunca repetir el mismo apelativo en piezas consecutivas.
- No listar apodos ni insertarlos forzadamente.
- No usar términos infantiles artificiales ni excesivamente sexuales.
- No inventar hechos (recuerdos, fechas, lugares, gustos) que no se hayan proporcionado. La personalización se logra con voz, cercanía y tratamiento del nombre.

## 4. Voz

- Humana, íntima, directa, cálida. Sin discurso, sin poema forzado, sin marketing.
- La intimidad cotidiana vale más que la metáfora.
- Permitir frases sencillas, pausas y cambios de ritmo.

## 5. Progresión emocional

1. **Entrada** (eyebrow + título): cercanía, atención.
2. **Párrafos** (3): apertura cálida → invitación a explorar sin obligación → profundidad (qué haces en mí).
3. **Revelaciones**: aumentan la intimidad (rosa → mi Luz; pollito → mi Pris; estrella → nombre completo).
4. **Cierre** (completado + firma + pie): conclusión emocional.

## 6. Mensaje principal (modo pasivo)

Los párrafos son legibles sin tocar nada. Las interacciones **nunca** ocultan contenido esencial; son pensamientos adicionales.

## 7. Reglas de edición

- Cambiar texto en `content.ts` no requiere tocar componentes ni tests de contenido estructural.
- Mantener todas las claves presentes (los tests `src/data/content.test.ts` verifican que no haya cadenas vacías y que esté personalizado).
- Si se cambia un apelativo, revisar que no se repita en exceso en toda la experiencia.
- Si se añade una interacción nueva: añadir `InteractionId`, registro en `interactionMap.ts`, mensaje en `content.ts`, definición en `discoveries.ts` si aplica, y actualizar `docs/INTERACTION_SPEC.md`.