# PROMPT MAESTRO

## Desarrollo de una experiencia web personal, interactiva, responsive y optimizada

## 0. INSTRUCCIÓN GENERAL

Desarrollar una experiencia web personal de una sola página cuya finalidad sea presentar un mensaje especial a una persona concreta.

No tratar el proyecto como una landing page convencional.

No tratarlo como un sitio corporativo.

No tratarlo como una plantilla romántica prefabricada.

Debe considerarse una **experiencia web narrativa e interactiva**, donde el usuario pueda explorar, descubrir y activar pequeñas interacciones distribuidas por la interfaz.

El resultado final debe funcionar correctamente como una experiencia web autónoma, con una carga inicial rápida, una interfaz visualmente cuidada, interacciones opcionales y una arquitectura suficientemente limpia para permitir modificar posteriormente contenido, assets, textos, animaciones e interacciones sin rehacer el proyecto.

La prioridad no es cantidad de funcionalidades.

La prioridad es:

1. calidad de la experiencia,
2. coherencia visual,
3. interacción significativa,
4. rendimiento,
5. compatibilidad móvil,
6. mantenibilidad,
7. accesibilidad,
8. ausencia de errores.

No implementar funcionalidades únicamente para demostrar capacidad técnica.

Cada interacción debe tener una razón dentro de la experiencia.

---

# 1. OBJETIVO DEL PRODUCTO

Crear una página web interactiva que comunique un mensaje personal mediante:

* contenido escrito,
* composición visual,
* animaciones,
* elementos descubiertos progresivamente,
* pequeñas interacciones,
* estados de interfaz,
* microinteracciones,
* respuesta táctil,
* elementos visuales decorativos,
* comportamiento adaptativo según dispositivo.

La página debe poder utilizarse de dos maneras:

### Modo pasivo

La persona simplemente abre la página y puede consumir el contenido completo sin tener que interactuar obligatoriamente.

### Modo exploración

La persona descubre elementos interactivos, pulsa, toca, mueve, revela o activa determinadas partes de la página.

**Nunca convertir la interacción en un requisito para entender el mensaje principal.**

La experiencia debe ser completa incluso si el usuario no toca nada.

---

# 2. PRINCIPIO CENTRAL DE UX

La página debe seguir el principio:

> La curiosidad debe ser recompensada.

La interfaz puede contener determinados elementos que inicialmente parezcan decorativos, pero que al interactuar con ellos revelen:

* una frase,
* un pequeño mensaje,
* una animación,
* una reacción visual,
* una transición,
* un detalle adicional,
* una pequeña sorpresa.

No utilizar interacción por interacción.

---

# 3. STACK TECNOLÓGICO OBLIGATORIO

Utilizar:

### Aplicación

React

### Lenguaje

TypeScript

### Build

Vite

### Styling

Tailwind CSS

### Animaciones

Framer Motion

### Iconografía

Lucide React únicamente cuando sea necesaria.

### Gestión del estado

No instalar una librería global de estado salvo que el sistema demuestre realmente necesitarla.

Preferir:

* React state,
* context limitado,
* hooks personalizados.

### Persistencia

No incorporar backend.

No incorporar base de datos.

No incorporar autenticación.

No incorporar API externa.

Si algún estado necesita persistir entre cargas, utilizar únicamente mecanismos locales del navegador, como `localStorage`, y sólo cuando exista una razón UX válida.

### Dependencias

Mantener el número de dependencias bajo.

Antes de instalar cualquier dependencia adicional, justificar:

* qué problema resuelve,
* por qué no puede resolverse mediante React/CSS/TypeScript,
* impacto estimado sobre bundle,
* impacto sobre mantenimiento.

---

# 4. ARQUITECTURA GENERAL

La aplicación debe estructurarse en capas claras.

Arquitectura recomendada:

```text
src/
├── app/
│   ├── App.tsx
│   └── routes/
│
├── components/
│   ├── layout/
│   ├── visual/
│   ├── interactive/
│   ├── message/
│   └── feedback/
│
├── features/
│   ├── introduction/
│   ├── rose/
│   ├── discoveries/
│   ├── messages/
│   └── interactions/
│
├── hooks/
│
├── data/
│
├── assets/
│   ├── images/
│   ├── illustrations/
│   ├── icons/
│   └── fonts/
│
├── styles/
│
├── utils/
│
├── types/
│
└── main.tsx
```

Debe mantenerse una separación clara entre:

* presentación,
* datos,
* lógica interactiva,
* assets,
* utilidades.

---

# 5. SINGLE SOURCE OF TRUTH

Crear obligatoriamente:

```text
/docs/DESIGN_SYSTEM.md
/docs/ARCHITECTURE.md
/docs/INTERACTION_SPEC.md
/docs/CONTENT_SPEC.md
/docs/AGENT_CONTRACTS.md
```

Estos documentos constituyen la fuente oficial de verdad del proyecto.

---

# 6. DISEÑO DE LA EXPERIENCIA

La experiencia deberá contemplar como mínimo:

### Estado 0 — Inicialización

El sistema prepara recursos mínimos.

No mostrar una pantalla de loading prolongada.

### Estado 1 — Primera impresión

El contenido principal aparece de forma progresiva.

Debe existir una composición visual clara.

### Estado 2 — Exploración

El usuario puede descubrir elementos interactivos.

### Estado 3 — Revelación

Determinadas interacciones pueden desbloquear contenido adicional.

### Estado 4 — Estado completado

Una vez descubiertos determinados elementos, la interfaz puede reflejar visualmente que la experiencia ha sido recorrida.

Debe existir un modelo explícito de estados.

---

# 7. ELEMENTOS OBLIGATORIOS

La página debe incluir dos elementos visuales específicos:

## Rosa azul

Debe constituir uno de los elementos visuales principales.

Debe tratarse como un elemento propio del sistema, no como una imagen colocada directamente en `App.tsx`.

Debe tener un componente independiente.

Debe poder:

* animarse,
* responder a interacción,
* cambiar de estado,
* recibir eventos,
* adaptarse a diferentes tamaños de pantalla.

## Pollito

Debe existir un pollito asomándose desde una esquina.

Debe considerarse un componente interactivo potencial.

El pollito puede:

* aparecer progresivamente,
* reaccionar,
* esconderse parcialmente,
* asomarse más,
* generar una pequeña animación,
* revelar contenido,
* responder a un toque.

Nunca debe ocupar una superficie excesiva.

En dispositivos pequeños se deben recalcular:

* tamaño,
* posición,
* offset,
* safe areas.

---

# 8. SISTEMA DE INTERACCIONES

Implementar un sistema explícito de interacciones.

No repartir handlers arbitrariamente por múltiples archivos.

Crear una estructura clara para controlar interacciones.

```ts
type InteractionId =
  | 'rose'
  | 'chick'
  | 'discovery-x'
  | 'message-y';
```

Cada interacción debería poder definir:

* identificador,
* estado inicial,
* evento de activación,
* respuesta visual,
* respuesta de contenido,
* condición de finalización,
* posibilidad de repetición,
* persistencia opcional.

---

# 9. TIPOS DE INTERACCIÓN

El equipo UX debe seleccionar un conjunto pequeño y coherente.

Puede incluir:

### Tap / click

### Hold / press

Mantener pulsado durante determinado tiempo puede activar una respuesta.

Debe funcionar correctamente en móviles.

### Reveal

### Toggle

### Discovery

### Sequence

Varias pequeñas acciones pueden desbloquear un estado final.

### Hover

Sólo para desktop.

Nunca utilizar hover como única forma de acceder a información.

### Pointer movement

Sólo si el beneficio visual es claro.

---

# 10. MOBILE INTERACTION FIRST

Los dispositivos táctiles son prioritarios.

No asumir `hover = interacción principal`.

Todas las interacciones importantes deben funcionar mediante:

* `pointerdown`,
* `pointerup`,
* `click`,
* touch,
* teclado cuando corresponda.

Usar Pointer Events cuando sea apropiado.

Evitar conflictos entre scrolling, dragging y tapping.

El tamaño efectivo de los objetivos interactivos debe ser apropiado para dedos.

---

# 11. DESCUBRIMIENTO PROGRESIVO

No revelar absolutamente todos los elementos simultáneamente.

Sin embargo:

* no ocultar contenido esencial,
* no crear puzzles frustrantes,
* no requerir instrucciones ocultas,
* no exigir descubrir todos los secretos para llegar al mensaje principal.

La exploración debe ser opcional.

---

# 12. MICROINTERACCIONES

Todo elemento interactivo importante debe comunicar de alguna forma que respondió.

Ejemplos:

* cambio de escala,
* movimiento,
* transición de color,
* vibración visual,
* aparición de contenido,
* cambio de estado,
* pequeño efecto de profundidad.

No usar feedback exagerado.

---

# 13. HAPTICS

Si el navegador/dispositivo lo permite, investigar si determinadas interacciones pueden producir feedback háptico utilizando APIs disponibles.

Debe ser:

* opcional,
* progresivo,
* nunca necesario.

Si no existe soporte: no debe haber error.

---

# 14. SISTEMA DE ESTADOS

Los componentes interactivos deben tener estados claros.

```ts
type RoseState =
  | 'idle'
  | 'hover'
  | 'pressed'
  | 'revealing'
  | 'revealed';
```

No utilizar booleanos ambiguos cuando exista una máquina de estados más clara.

No crear estados imposibles.

Documentar transiciones.

---

# 15. ANIMACIÓN

Utilizar Framer Motion.

Las animaciones deben dividirse en categorías:

### Entrance animations

### Interaction animations

### Ambient animations

### Transition animations

Las animaciones ambientales deben minimizarse y pausarse cuando:

* la pestaña no está visible,
* el elemento está fuera de viewport,
* el usuario solicita reducción de movimiento.

---

# 16. PERFORMANCE DE ANIMACIONES

Priorizar:

* `transform`,
* `opacity`.

Evitar animar continuamente:

* width,
* height,
* top,
* left,
* box-shadow pesado,
* filter costoso.

Reducir uso innecesario de:

* blur,
* backdrop-filter,
* grandes superficies translúcidas,
* partículas.

---

# 17. SISTEMA DE REVELACIÓN

Las revelaciones de contenido deben ser rápidas.

Una frase puede aparecer mediante:

* opacity,
* clip-path moderado,
* translate,
* scale.

El contenido debe existir correctamente en el DOM cuando corresponda para accesibilidad.

No esconder contenido importante detrás de animaciones que puedan fallar.

---

# 18. INTERACCIÓN CON LA ROSA

La rosa debe poder ser interactiva.

Posibles capas:

### Primer toque

Respuesta visual.

### Segundo estado

Aparece o cambia un pequeño detalle.

### Interacción opcional avanzada

Puede revelarse un pequeño mensaje.

No hacer obligatorio un número de toques arbitrario.

---

# 19. INTERACCIÓN CON EL POLLITO

El pollito puede actuar como elemento sorpresa.

Debe existir una lógica de aparición controlada.

```text
initial
   ↓
peek
   ↓
noticed
   ↓
interaction
   ↓
reaction
```

No hacer que se mueva aleatoriamente por toda la pantalla.

Debe permanecer en una zona visual estable.

---

# 20. ELEMENTOS DESCUBRIBLES

El sistema puede contener elementos sutiles que revelen contenido adicional.

Ejemplos:

* pequeño punto,
* detalle gráfico,
* pétalo,
* marca ornamental,
* elemento del fondo,
* zona de la ilustración.

Un usuario que nunca descubra estos elementos debe seguir teniendo una experiencia completa.

---

# 21. MENSAJES SECUNDARIOS

Permitir múltiples pequeñas piezas de contenido.

Estructura:

```ts
interface Message {
  id: string;
  text: string;
  trigger?: InteractionId;
  priority: number;
}
```

No hardcodear cadenas en componentes.

---

# 22. CONTENIDO CONFIGURABLE

Centralizar textos:

```text
src/data/content.ts
```

Debe ser posible modificar:

* título,
* mensaje,
* firma,
* mensajes secundarios,
* pequeñas frases,
* textos de interacción

sin tocar componentes visuales.

---

# 23. ANALÍTICA

No incorporar Google Analytics ni sistemas de tracking por defecto.

No recopilar información personal.

No enviar interacciones a servidores.

---

# 24. PRIVACIDAD

No pedir:

* nombre,
* email,
* ubicación,
* permisos innecesarios,
* acceso a cámara,
* acceso a micrófono,
* notificaciones.

---

# 25. OFFLINE / FALLBACK

La página debe degradarse correctamente.

Si se desea implementar soporte offline, puede evaluarse PWA, pero no agregar un service worker únicamente por añadirlo.

La página debe poder cargar correctamente incluso sin funcionalidades avanzadas.

---

# 26. RESPONSIVE DESIGN

Implementar:

**mobile-first.**

Validar al menos:

* 320 px,
* 360 px,
* 375 px,
* 390 px,
* 414 px,
* 430 px,
* 768 px,
* 834 px,
* 1024 px,
* 1280 px,
* 1440 px,
* 1920 px.

Validar tanto portrait como landscape.

---

# 27. IPHONE / SAFARI

Consideración obligatoria.

Implementar correctamente:

```css
min-height: 100dvh;
```

y evaluar:

```css
100svh
100lvh
```

cuando el diseño lo requiera.

Usar:

```css
env(safe-area-inset-top)
env(safe-area-inset-right)
env(safe-area-inset-bottom)
env(safe-area-inset-left)
```

donde corresponda.

El diseño debe contemplar:

* Dynamic Island,
* notch,
* home indicator,
* barras dinámicas de Safari.

No fijar elementos importantes a `bottom: 0` sin considerar safe area.

---

# 28. ORIENTACIÓN

Al rotar el dispositivo:

* el layout debe mantenerse estable,
* no deben desaparecer elementos,
* no deben producirse overlaps,
* no debe existir overflow horizontal.

---

# 29. ACCESIBILIDAD

Cumplir buenas prácticas de accesibilidad.

Implementar:

* landmarks,
* HTML semántico,
* `alt`,
* labels,
* foco visible,
* navegación por teclado,
* estados accesibles.

Elementos puramente decorativos: `aria-hidden="true"` cuando corresponda.

Los elementos interactivos deben ser realmente interactivos:

No utilizar `<div onclick="...">` cuando debería existir un `<button>`.

---

# 30. REDUCED MOTION

Implementar obligatoriamente:

```text
prefers-reduced-motion
```

Cuando esté activo:

* eliminar floating innecesario,
* reducir desplazamientos,
* reducir transformaciones,
* eliminar animaciones ambientales constantes.

La interfaz debe seguir funcionando completamente.

---

# 31. CARGA INICIAL

El usuario no debe enfrentarse a una pantalla vacía esperando a que cargue todo.

Orden recomendado:

1. HTML,
2. CSS esencial,
3. contenido principal,
4. imagen principal,
5. interacciones secundarias,
6. decoración no crítica.

No bloquear renderizado por assets secundarios.

---

# 32. CODE SPLITTING

No realizar code splitting artificial.

Sólo dividir bundles cuando exista una ventaja real.

---

# 33. IMÁGENES

Todas las imágenes deben optimizarse.

Preferencia:

1. SVG para ilustraciones vectoriales apropiadas,
2. AVIF,
3. WebP,
4. otros formatos sólo cuando exista justificación.

Definir dimensiones.

---

# 34. LAYOUT STABILITY

Evitar:

**Cumulative Layout Shift.**

Toda imagen o bloque que se cargue posteriormente debe tener espacio reservado.

No permitir que el texto baje, la rosa salte, el pollito desplace contenido o el viewport cambie inesperadamente cuando terminen de cargar recursos.

---

# 35. ERROR BOUNDARIES

Implementar manejo de errores donde resulte razonable.

Si un componente interactivo falla, el resto de la página debe continuar funcionando.

---

# 36. ERROR STATES

Definir comportamiento para:

* asset no encontrado,
* error de import,
* contenido corrupto,
* interacción no disponible,
* API inexistente,
* función de navegador no soportada.

No mostrar stack traces al usuario.

---

# 37. JAVASCRIPT FAILURE

Debe existir una degradación razonable.

El contenido principal no debería depender completamente de una animación JavaScript.

El mensaje principal debe ser recuperable o estar disponible con estructura HTML apropiada.

---

# 38. COMPATIBILIDAD

Validar:

### Desktop

* Chrome
* Edge
* Safari
* Firefox

### Mobile

* Safari iOS
* Chrome Android

---

# 39. TESTING AUTOMATIZADO

Implementar tests básicos de:

* render,
* interacción,
* cambios de estado,
* accesibilidad crítica,
* contenido.

Es obligatorio cubrir la lógica crítica.

---

# 40. TESTING E2E

Si la infraestructura lo permite, utilizar Playwright.

Casos mínimos:

### Test 1

La página carga.

### Test 2

El contenido principal aparece.

### Test 3

La rosa responde.

### Test 4

El pollito responde, si tiene interacción.

### Test 5

Las revelaciones funcionan.

### Test 6

No existe overflow horizontal.

### Test 7

No existen errores JavaScript críticos.

### Test 8

Reduced motion funciona.

### Test 9

La página funciona en viewport móvil.

### Test 10

La página funciona en viewport desktop.

---

# 41. PERFORMANCE TESTING

Ejecutar Lighthouse o equivalente.

Evaluar:

* Performance,
* Accessibility,
* Best Practices,
* SEO.

---

# 42. BUDGET DE PERFORMANCE

Definir límites razonables.

El equipo debe registrar:

* tamaño JS,
* tamaño CSS,
* peso total de imágenes,
* número de requests,
* assets externos,
* dependencias.

---

# 43. NETWORK CONDITIONS

Probar al menos conceptualmente bajo:

* conexión rápida,
* conexión móvil promedio,
* conexión lenta.

---

# 44. VISIBILITY / BACKGROUND

Detectar cuando la página deja de estar visible si existen animaciones continuas.

Utilizar `document.visibilityState` cuando resulte apropiado.

---

# 45. INTERACTION PERFORMANCE

Los eventos frecuentes no deben provocar renders excesivos.

Especialmente:

* pointermove,
* scroll,
* resize.

Utilizar throttling, debouncing, requestAnimationFrame cuando realmente sea necesario.

No añadir listeners globales sin cleanup.

---

# 46. CLEANUP

Todos los efectos deben limpiar:

* timers,
* intervals,
* event listeners,
* animation loops,
* observers.

No permitir memory leaks.

---

# 47. SCROLL MANAGEMENT

No bloquear el scroll global salvo que exista una interacción modal real.

No utilizar `overflow: hidden` globalmente de manera permanente.

---

# 48. MODALES

Evitar modales salvo que exista una razón clara.

Si se utiliza uno:

* focus management,
* Escape,
* cierre apropiado,
* accesibilidad,
* scroll management,
* mobile behavior.

---

# 49. MICROCOPY

Todos los textos de interfaz deben ser breves.

No usar lenguaje técnico para el usuario.

No introducir instrucciones extensas.

---

# 50. DISEÑO SONORO

El sonido NO es obligatorio.

No reproducir audio automáticamente.

La experiencia debe estar completa sin sonido.

---

# 51. CURSOR / DESKTOP ENHANCEMENTS

Es posible añadir mejoras específicas para escritorio.

Pero las funcionalidades fundamentales nunca deben depender del cursor.

---

# 52. TOUCH BEHAVIOR

Evitar:

* double-tap accidental,
* selección de texto no deseada,
* zoom accidental,
* elementos demasiado pequeños.

No utilizar `touch-action: none` globalmente.

---

# 53. COMPONENTES INTERACTIVOS

Todo componente interactivo debe cumplir:

```text
input
→ state transition
→ visual feedback
→ optional content update
```

Esto debe poder probarse independientemente.

---

# 54. CONTRATOS ENTRE COMPONENTES

No permitir que componentes hermanos manipulen directamente el estado interno de otros componentes.

Utilizar props, callbacks, context limitado según corresponda.

---

# 55. DATA / VIEW SEPARATION

El contenido no debe estar mezclado con la lógica visual.

Debe ser posible cambiar una frase sin modificar lógica.

---

# 56. CONFIGURACIÓN

Toda configuración editable debe estar centralizada.

Por ejemplo:

```text
site.config.ts
interaction.config.ts
content.ts
```

---

# 59. REGLAS DE COLABORACIÓN

Los agentes no deben:

* sobrescribir trabajo ajeno sin revisar,
* eliminar funcionalidades sin justificar,
* instalar dependencias arbitrariamente,
* cambiar contratos públicos sin actualizar documentación,
* alterar decisiones visuales fundamentales unilateralmente.

---

# 60. GESTIÓN DE CONFLICTOS

Si dos agentes llegan a conclusiones diferentes:

Prioridad:

1. requerimiento explícito,
2. UX,
3. compatibilidad,
4. accesibilidad,
5. performance,
6. mantenibilidad,
7. preferencia visual.

---

# 62. DEFINICIÓN DE TERMINADO

Una funcionalidad está terminada cuando:

* está implementada,
* funciona,
* tiene estados definidos,
* es responsive,
* tiene feedback,
* no rompe accesibilidad,
* no genera errores,
* está documentada,
* ha sido probada.

---

# 63. CRITERIOS DE ACEPTACIÓN FUNCIONAL

La entrega final debe cumplir:

* [ ] La página carga correctamente.
* [ ] El contenido principal aparece sin esperar todos los assets.
* [ ] La rosa está presente.
* [ ] La rosa es interactiva o puede incorporar interacción coherente.
* [ ] El pollito está presente.
* [ ] El pollito no rompe la composición.
* [ ] Existen varias interacciones secundarias cuidadosamente diseñadas.
* [ ] Existe al menos un mecanismo de descubrimiento.
* [ ] Las interacciones producen feedback visible.
* [ ] El contenido principal no depende de las interacciones.
* [ ] No existen elementos interactivos sin propósito.
* [ ] La página es completamente responsive.
* [ ] No existe overflow horizontal.
* [ ] Funciona correctamente en Safari móvil.
* [ ] Se consideran safe areas.
* [ ] Reduced motion funciona.
* [ ] La navegación por teclado funciona cuando corresponde.
* [ ] Los elementos interactivos tienen estados claros.
* [ ] Los assets están optimizados.
* [ ] No existen errores críticos de JavaScript.
* [ ] El build termina correctamente.

---

# 64. CRITERIOS DE ACEPTACIÓN VISUAL

Debe evaluarse:

### Composición

### Espaciado

### Consistencia

### Movimiento

### Escalabilidad

### Detalle

---

# 65. CRITERIOS DE ACEPTACIÓN DE INTERACCIÓN

Cada interacción debe responder dentro de un tiempo perceptiblemente inmediato.

Todas las interacciones deben tener:

```text
initial state
trigger
response
settled state
```

---

# 66. CRITERIOS DE ACEPTACIÓN DE PERFORMANCE

La experiencia debe:

* cargar rápidamente,
* evitar recursos excesivos,
* evitar render loops innecesarios,
* evitar listeners sin cleanup,
* evitar layout thrashing,
* utilizar transform/opacity para animaciones cuando sea posible.

---

# 67. CRITERIOS DE ACEPTACIÓN DE MANTENIBILIDAD

Una persona que no haya participado en el desarrollo debe poder modificar:

* texto,
* rosa,
* pollito,
* animaciones,
* interacciones,
* contenido secundario

sin tener que comprender toda la aplicación.

---

# 68. ARCHIVOS DE DOCUMENTACIÓN FINALES

Debe entregarse:

```text
README.md
DESIGN_SYSTEM.md
ARCHITECTURE.md
INTERACTION_SPEC.md
CONTENT_SPEC.md
AGENT_CONTRACTS.md
QA_REPORT.md
PERFORMANCE_REPORT.md
```

---

# 69. README

Debe indicar:

* requisitos,
* instalación,
* ejecución,
* build,
* preview,
* estructura,
* modificación de contenido,
* modificación de assets,
* modificación de interacciones.

---

# 70. RESULTADO FINAL

El resultado no debe evaluarse como: "¿La página funciona?"

Debe evaluarse como: "¿La persona que la recibe tiene una experiencia intencional, fluida, interactiva y emocionalmente coherente?"

La calidad se define por: **coherencia + interacción + detalle + rendimiento + estabilidad.**

---

# 71. INSTRUCCIÓN FINAL PARA TODOS LOS AGENTES

No improvisar requisitos inexistentes.

No introducir funcionalidades porque "se ven cool".

No añadir librerías sin necesidad.

No priorizar complejidad técnica sobre experiencia.

No sacrificar rendimiento por decoración.

No sacrificar accesibilidad por estética.

No sacrificar responsive por composición desktop.

No asumir que un comportamiento de Chrome funcionará igual en Safari.

No asumir que una interacción basada en hover funcionará en móvil.

No asumir que `100vh` representa correctamente el viewport de iOS.

No considerar terminado algo que no haya sido validado.