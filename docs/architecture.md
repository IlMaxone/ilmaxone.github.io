# Architettura e pubblicazione

## Contratto del progetto

- Dominio pubblico: [https://ilmaxone.github.io](https://ilmaxone.github.io).
- Repository GitHub User Site: `IlMaxone/ilmaxone.github.io`.
- GitHub Pages pubblica gli artefatti statici dalla radice del repository.
- I sorgenti Angular restano in `custom-portfolio-app/`.
- Il tag `<base href="/">` resta coerente con la pubblicazione alla radice del dominio.
- Le rotte prerenderizzate e il fallback `404.html` devono essere inclusi in ogni rilascio.

Non si cambia dominio, hosting o struttura di deploy senza documentare e concordare esplicitamente la migrazione.

## Struttura

```text
ilmaxone.github.io/
├── docs/                      # Documentazione mantenuta nel tempo
├── index.html                 # Home prerenderizzata pubblicata
├── index.csr.html             # Shell client-side Angular
├── 404.html                   # Fallback SPA
├── story/index.html           # Rotta /story prerenderizzata
├── works/index.html           # Rotta /works prerenderizzata
├── riferimenti/index.html     # Contatti e riferimenti pubblici
├── universo/*/index.html      # Sezioni generate dalle cartelle dei contenuti
├── main-*.js                  # Bundle pubblicato
├── chunk-*.js                 # Chunk lazy-loaded pubblicati
├── styles-*.css               # Stili pubblicati
├── favicon.ico
└── custom-portfolio-app/      # Sorgenti Angular
```

La radice del repository contiene l'output servito da GitHub Pages. I bundle con hash non si modificano a mano: vengono rigenerati dai sorgenti.

## Sviluppo

Dalla cartella `custom-portfolio-app/`:

```bash
npm ci
npm start
```

Il server di sviluppo è normalmente disponibile su `http://localhost:4200/`.

## Verifica e rilascio

```bash
npm test
npm run build
```

La pubblicazione di GitHub Pages è automatica quando gli artefatti arrivano sul branch configurato. In assenza di una workflow dedicata, build e sincronizzazione del contenuto di `dist/custom-portfolio-app/browser/` con la radice del repository restano passaggi espliciti.

Checklist:

1. lavorare sui sorgenti in `custom-portfolio-app/`;
2. eseguire test e build di produzione;
3. sostituire nella radice gli artefatti con quelli della nuova build;
4. mantenere `404.html` coerente con `index.html`;
5. controllare `/`, `/riferimenti`, le rotte `/universo/*`, `/story`, `/works` e una rotta inesistente;
6. verificare desktop, mobile e navigazione da tastiera;
7. aggiornare la documentazione pertinente;
8. controllare `git diff` e `git status` prima del commit.

## Baseline iniziale

Ricognizione del sito pubblico effettuata il 21 settembre 2026. La versione iniziale aveva tema scuro, logo `GM`, navbar con Home/Storia/Lavori e card testuali. Home e Storia erano duplicate; Home puntava alla rotta non dichiarata `/landing`; il progetto conteneva un link repository placeholder, un riferimento ad Angular 20 con dipendenze Angular 21 e il titolo HTML `CustomPortfolioApp`.

L’evoluzione attuale dell’interfaccia è descritta in [Direzione scelta: Atlante solare](solar-atlas-design.md).

## Debito tecnico noto

Durante l'installazione del 21 settembre 2026, `npm audit` ha segnalato 43 vulnerabilità nella struttura completa delle dipendenze (2 basse, 9 moderate, 29 alte e 3 critiche). Il sito genera esclusivamente artefatti statici, ma il lockfile va analizzato e aggiornato in un intervento dedicato prima di usare il server SSR in produzione. Non è stato eseguito `npm audit fix` automaticamente per evitare aggiornamenti incompatibili non verificati.
