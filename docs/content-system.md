# Sistema di contenuti: cartelle e pianeti

## Regola principale

La struttura in `custom-portfolio-app/content/landing/` è la fonte della navigazione:

```text
content/landing/
├── Abilità acquisiste/   → pianeta nella landing + pagina /universo/abilita-acquisiste
├── Capacità/             → pianeta nella landing + pagina /universo/capacita
├── Lavori/               → pianeta nella landing + pagina /universo/lavori
└── Progetti/             → pianeta nella landing + pagina /universo/progetti
```

- Ogni sottocartella di `landing/` genera un pianeta sulla pagina principale.
- Il nome della cartella diventa il nome visibile del pianeta.
- Il nome normalizzato senza accenti diventa la rotta `/universo/<nome-cartella>`.
- Ogni JSON della sottocartella genera un pianeta nella pagina della sezione.
- I file o le cartelle che iniziano con `_` sono riservati e non diventano contenuti visibili.
- Una cartella senza JSON rimane navigabile e mostra lo stato vuoto con le istruzioni per aggiungere il primo pianeta.

## Aggiungere una sezione alla landing

1. Creare una nuova cartella dentro `content/landing/`, per esempio `Formazione`.
2. Aggiungere almeno un JSON valido nella nuova cartella.
3. Eseguire `npm run generate:experiences`, `npm start`, `npm test` oppure `npm run build`.

Compariranno automaticamente il pianeta `Formazione`, la voce nel menu laterale e la rotta `/universo/formazione`.

## Aggiungere un pianeta a una sezione

1. Copiare `content/landing/Capacità/_template.json` nella cartella desiderata.
2. Rinominare la copia con un prefisso d’ordine, per esempio `20-nuovo-contenuto.json`.
3. Compilare tutti i campi mantenendo la struttura.
4. Eseguire uno degli script indicati sopra.

Per eliminare un pianeta è sufficiente eliminare il relativo JSON. Le coordinate, il piano orbitale, la velocità e la texture vengono ricalcolati automaticamente.

## Campi JSON

| Campo | Tipo | Uso |
| --- | --- | --- |
| `id` | stringa | Identificatore univoco nella cartella: minuscole, numeri e trattini |
| `order` | numero | Ordine di lettura e selezione |
| `shortLabel` | stringa | Nome breve proiettato accanto al pianeta |
| `glyph` | stringa | Simbolo disponibile per viste compatte |
| `eyebrow` | stringa | Categoria del pannello informativo |
| `title` | stringa | Titolo completo |
| `period` | stringa | Periodo o contesto tecnico |
| `description` | stringa | Descrizione sintetica |
| `tags` | stringhe[] | Tecnologie o temi |
| `route` | stringa | Percorso interno di approfondimento, sempre iniziato da `/` |
| `routeLabel` | stringa | Testo del collegamento di approfondimento |

## Generazione e prerender

`scripts/generate-experiences.mjs` attraversa tutte le cartelle, valida ogni JSON, crea `src/app/generated/atlas.generated.ts` e interrompe build/test con un errore preciso in caso di dati non validi. Angular usa lo stesso catalogo per menu, landing, pagine interne e parametri di prerender.

Le rotte delle sezioni vengono prerenderizzate come directory statiche e restano quindi compatibili con la pubblicazione dalla radice di GitHub Pages.
