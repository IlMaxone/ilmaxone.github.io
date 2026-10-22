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
├── approfondimenti/*/index.html # Output generato delle pagine descrittive
├── riferimenti/index.html     # Contatti e riferimenti pubblici
├── universo/*/index.html      # Sezioni generate dalle cartelle dei contenuti
├── main-*.js                  # Bundle pubblicato
├── chunk-*.js                 # Chunk lazy-loaded pubblicati
├── styles-*.css               # Stili pubblicati
├── favicon.ico
└── custom-portfolio-app/      # Sorgenti Angular
```

La radice del repository contiene l'output servito da GitHub Pages. I bundle con hash non si modificano a mano: vengono rigenerati dai sorgenti.

Gli approfondimenti hanno i propri sorgenti nella webapp: testi modificabili manualmente in `custom-portfolio-app/content/approfondimenti/*.json` e un unico template HTML in `custom-portfolio-app/src/app/pages/details/detail-page.html`. La generazione tiene separati anche i cataloghi TypeScript di navigazione (`atlas.generated.ts`) e contenuto (`details.generated.ts`). Le directory `approfondimenti/` alla radice sono solo output di pubblicazione; gli URL `/approfondimenti/...` restano indipendenti dalla collocazione fisica dei sorgenti.

## Sviluppo

Dalla cartella `custom-portfolio-app/`:

```bash
npm ci
npm start
```

Il server di sviluppo è normalmente disponibile su `http://localhost:4200/`.

Lo script di avvio include il watcher dei contenuti. Salvare un JSON sotto `content/landing/` o `content/approfondimenti/` rigenera i cataloghi TypeScript; il server Angular rileva la modifica e aggiorna la pagina locale. Questa rigenerazione in tempo reale riguarda lo sviluppo locale, mentre GitHub Pages richiede sempre una nuova build e pubblicazione degli artefatti statici.

## Verifica e rilascio

### Anteprima locale con Docker

Dalla radice del repository, con Docker Desktop attivo:

```bash
docker compose up --build -d
```

L'anteprima è disponibile su `http://localhost:4200/`. La build multistage installa le dipendenze e compila Angular in un ambiente Node.js 24; il container finale usa Nginx per servire esclusivamente gli artefatti statici. Le rotte prerenderizzate e il fallback SPA consentono di aprire direttamente pianeti e approfondimenti. Il servizio è esposto soltanto sull'interfaccia locale.

Per verificare lo stato o fermare l'anteprima:

```bash
docker compose ps
docker compose down
```

Dopo una modifica ai contenuti o ai sorgenti, ripetere `docker compose up --build -d`. L'anteprima Docker è indipendente dalla pubblicazione su GitHub Pages e non sincronizza gli artefatti nella radice del repository.

### Build e pubblicazione statica

```bash
npm test
npm run build
```

I comandi vanno eseguiti in `custom-portfolio-app/`. `npm test` comprende sia i controlli del generatore dei contenuti sia i test Angular, inclusa la verifica dell'assenza di contatti, indirizzi di rete, segreti e importi nei contenuti pubblici delle competenze. La build rigenera entrambi i cataloghi e le rotte statiche prima della sincronizzazione con la radice.

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

La verifica del 22 ottobre 2026 ha completato 6 test dei contenuti e 28 test Angular, build locale e Docker, controllo delle sei pagine di approfondimento servite dal container e verifica del PDF completo. Il documento comprende 15 pagine e 39 sezioni tematiche; ogni modifica futura ai JSON richiede una nuova esportazione per mantenerlo coerente con il sito.

## Baseline iniziale

Ricognizione del sito pubblico effettuata il 21 settembre 2026. La versione iniziale aveva tema scuro, logo `GM`, navbar con Home/Storia/Lavori e card testuali. Home e Storia erano duplicate; Home puntava alla rotta non dichiarata `/landing`; il progetto conteneva un link repository placeholder, un riferimento ad Angular 20 con dipendenze Angular 21 e il titolo HTML `CustomPortfolioApp`.

L’evoluzione attuale dell’interfaccia è descritta in [Direzione scelta: Atlante solare](solar-atlas-design.md).

## Debito tecnico noto

Durante l'installazione del 21 settembre 2026, `npm audit` ha segnalato 43 vulnerabilità nella struttura completa delle dipendenze (2 basse, 9 moderate, 29 alte e 3 critiche). Il sito genera esclusivamente artefatti statici, ma il lockfile va analizzato e aggiornato in un intervento dedicato prima di usare il server SSR in produzione. Non è stato eseguito `npm audit fix` automaticamente per evitare aggiornamenti incompatibili non verificati.
