# Direzione scelta: Atlante solare

## Esperienza approvata

- Design: **Atlante solare**.
- Palette predefinita: **Ametista solare**.
- Movimento: **Orbite inclinate**.
- Nucleo: texture ispirata alla **Singolarità editoriale**, reinterpretata in rosso, arancio e giallo caldo.
- Frase principale: **“Benvenuto nel mio Universo Lavorativo. La raccolta definitiva delle abilità professionali e non.”**

## Navigazione gerarchica

La landing è la mappa dell’universo. Ogni cartella in `content/landing/` produce un pianeta; premendo il pianeta si apre la pagina della sezione corrispondente. Dentro quella pagina, ogni JSON della cartella produce un nuovo pianeta selezionabile con titolo, descrizione, tag e collegamento di approfondimento.

Il menu laterale rende sempre visibili:

1. selettore della palette;
2. collegamento alla Landing;
3. una voce per ogni cartella generata;
4. numero di JSON presenti nella sezione.

Su schermi piccoli palette e navigazione diventano due righe orizzontali controllate da frecce. Il trascinamento laterale è disabilitato per evitare conflitti con lo scorrimento della pagina e con la scena WebGL.

## Palette

Sono mantenute tutte le cinque combinazioni del laboratorio:

- Terra Cotta;
- Oro notturno;
- Cobalto corallo;
- Salvia rame;
- Ametista solare, predefinita.

La palette modifica l’intera interfaccia e la scena WebGL: sfondo, pannelli, testi, accenti, luci, stelle, orbite e texture procedurali delle sfere. La preferenza viene salvata in `localStorage`; una nuova visita senza preferenze parte da Ametista solare.

## Trattamento tridimensionale

Sole e pianeti sono geometrie sferiche reali. Le texture procedurali avvolgono le superfici a 360° e cambiano con la palette. Ogni pianeta usa un piano orbitale indipendente sugli assi X, Y e Z, con velocità e direzione proprie.

Interazioni disponibili:

- trascinamento per ruotare la camera a 360°;
- rotella o trackpad per lo zoom;
- ray casting per selezionare direttamente le sfere;
- etichette HTML proiettate sulle coordinate 3D;
- frecce, tasti `+`/`-` e `Home` per la tastiera;
- supporto a `prefers-reduced-motion` e fallback senza WebGL.

I comandi di rotazione della camera adottano il design **Coordinate stellari**, condiviso con le frecce dei menu mobile. Il pulsante Reset è centrato sul loro asse verticale e usa due emissioni laterali ametista per collegare visivamente i tre controlli. La scorciatoia globale alla landing usa invece il design **Cometa radente**.

## Scelte tecniche

- Three.js `0.180.0` incluso nel bundle Angular.
- Pixel ratio massimo `2` per controllare il costo GPU.
- Nessuna texture remota obbligatoria.
- Prerender Angular con inizializzazione WebGL solo nel browser.
- Artefatti statici compatibili con GitHub Pages.

## File principali

- `custom-portfolio-app/content/landing/`: gerarchia editoriale.
- `custom-portfolio-app/scripts/generate-experiences.mjs`: generatore e validazione.
- `custom-portfolio-app/src/app/pages/landing/landing-page.*`: landing e pagine delle sezioni.
- `custom-portfolio-app/src/app/pages/landing/orbital-scene.*`: scena WebGL.
- `custom-portfolio-app/src/app/shared/navbar/*`: menu e selettore palette.
- `custom-portfolio-app/src/app/theme/palette.ts`: definizioni e persistenza delle palette.
- [`solar-atlas-color-motion.html`](solar-atlas-color-motion.html): laboratorio standalone originale.
