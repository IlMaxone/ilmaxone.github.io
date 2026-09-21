# Direzione scelta: Atlante solare

## Combinazione approvata

- Design: **Atlante solare**.
- Palette principale: **Ametista solare**.
- Movimento: **Orbite inclinate**.
- Nucleo: texture ispirata alla **Singolarità editoriale**, reinterpretata in rosso, arancio e giallo caldo.

## Trattamento tridimensionale

Il sole e i pianeti non sono dischi piatti. La scena usa WebGL e geometrie sferiche reali, illuminate nello spazio tridimensionale. Le superfici impiegano texture procedurali derivate dalla palette Ametista solare, mappate a 360° sulle sfere, con rilievo, rugosità, emissione luminosa e atmosfera separata per il nucleo.

Ogni esperienza possiede un piano orbitale con inclinazione indipendente sugli assi X, Y e Z. Le orbite ruotano in direzioni e con velocità diverse, quindi il sistema non appare come una serie di cerchi sovrapposti sullo stesso piano. Con gli otto contenuti attuali vengono creati otto pianeti e otto orbite.

## Interazione

- Trascinamento sullo spazio per ruotare la camera a 360° attorno al sistema.
- Rotella o trackpad per regolare lo zoom.
- Ray casting WebGL per riconoscere il pianeta sotto il puntatore.
- Apertura della scheda esperienza con puntatore o tastiera.
- Etichette HTML proiettate sulle coordinate dei pianeti per mantenere leggibilità e accessibilità.

## Scelte tecniche WebGL

- Rendering con Three.js `0.180.0`, installato come dipendenza npm e incluso nel bundle Angular, con antialiasing.
- Sfere ad alta definizione per sole e pianeti.
- Un gruppo orbitale per ogni file esperienza, con inclinazioni indipendenti sui tre assi.
- Texture generate localmente a runtime: nessuna immagine remota obbligatoria.
- Pixel ratio limitato a `2` per controllare il costo GPU su schermi ad alta densità.
- Supporto a `prefers-reduced-motion` e messaggio di fallback quando WebGL non è disponibile.

La scena non richiede un processo server: Three.js viene compilato insieme all'applicazione e il risultato resta un insieme di artefatti statici compatibili con GitHub Pages. Il componente verifica l'ambiente browser prima di inizializzare WebGL, così il prerender Angular continua a funzionare.

## Implementazione nella home

La direzione è stata integrata nella home il 21 settembre 2026.

- `landing-page.*` definisce impaginazione, contenuto selezionato e pannello informativo.
- `orbital-scene.*` contiene renderer WebGL, camera, texture, orbite, ray casting e controlli.
- `three` è una dipendenza di produzione; `@types/three` è una dipendenza di sviluppo.
- La route home resta prerenderizzata; WebGL viene inizializzato nel browser dopo il rendering statico.
- La build prodotta continua a essere sincronizzata nella radice del repository per GitHub Pages.

## File di riferimento

- Demo standalone: [`solar-atlas-color-motion.html`](solar-atlas-color-motion.html)
- Sorgente dei contenuti: `custom-portfolio-app/content/experiences/`
- Componente Angular: `custom-portfolio-app/src/app/pages/landing/orbital-scene.ts`
