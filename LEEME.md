# Kuntur Data · Sitio web (prototipo estático)

Versión del 5 de noviembre de 2026.

## Cómo verlo

Abra `index.html` en el navegador. Las 7 páginas están enlazadas entre sí y no necesitan servidor.

| Archivo | Página | URL final propuesta |
| --- | --- | --- |
| index.html | Inicio | / |
| kuntur.html | Kuntur (3 servicios) | /kuntur/ |
| lupa-ux.html | Lupa UX | /lupa-ux/ |
| agencias.html | Para agencias | /agencias/ |
| metodo.html | Método | /metodo/ |
| integraciones.html | Integraciones y uso de APIs | /integraciones/ |
| diagnostico-inicial.html | Diagnóstico inicial | /diagnostico-inicial.html |
| muestra-gratis.html | Redirección a diagnostico-inicial.html (meta refresh + JS; GitHub Pages no permite 301) | — |

## Carpetas

- `assets/kd.css`: estilos compartidos de las páginas internas. La home lleva sus estilos dentro del propio archivo.
- `assets/logo`: lockup KUNTUR DATA (vertical A y B, horizontal) y símbolo, en positivo y negativo, en SVG y PNG. Son SVG de trabajo, vectorizados desde el PNG del logo.
- `assets/img`: páginas de las muestras de ejemplo, usadas como imagen.
- `assets/docs`: los 4 PDF de muestra para descarga (Café Andino y Brumal Café, datos ficticios).
- `assets/qr`: códigos QR de WhatsApp, uno por servicio.

## Notas para desarrollo

- Las fuentes (Barlow y DM Sans) se cargan desde Google Fonts. Sin conexión se ven con la fuente del sistema.
- Animaciones: GSAP 3.15 (ScrollTrigger, SplitText, ScrambleText) y Lenis 1.3, servidos desde `assets/vendor` (sin CDN). Lógica en `assets/kd.js` y estilos de la capa tecnológica en `assets/kd-tech.css`. Funcionan en todos los navegadores modernos.
- El relieve del hero es procedural. En producción debe reemplazarse por datos de elevación reales y, como mejora, por la escena WebGL definida en la Fase 6.
- Privacidad (`privacidad.html`) y Condiciones (`terminos.html`) integradas con el texto íntegro del sitio anterior y las mismas URL. La política de cookies vive en la sección 10 de Privacidad (`privacidad.html#analitica`) hasta que el asesor legal entregue una propia.
- Medición: todas las páginas cargan Google Tag Manager (GTM-5GH3MTMJ) con Consent Mode v2 por defecto en «denegado», el aviso de cookies y los eventos `contact_click`, `cta_click`, `copy_email` y `consent_update`. Cada página envía su `content_group` (home, kuntur, lupa_ux, agencias, metodo, integraciones, muestra_gratis, legal). La página diagnostico-inicial.html conserva `muestra_gratis` y los botones renombrados conservan `data-cta="pedir_muestra_gratis"` para no cortar el histórico.
- Respeta `prefers-reduced-motion`: sin animaciones cuando el usuario lo pide.

## Documentos

- Propuesta web (fases 1 a 9): https://claude.ai/artifact/5jnqzZ8itFUvycfVCRkqaZ
- Contenido completo del sitio: https://claude.ai/artifact/7U77P9fyAiJZLi2yqqtEA2

Los dos documentos se pueden descargar en Word o PDF desde su propio menú.
