# Sistema di contenuti: cartelle e pianeti

## Regola principale

La struttura in `custom-portfolio-app/content/landing/` è la fonte della navigazione:

```text
content/landing/
├── head-landing.json      → testata e metadati della landing
├── Abilità acquisiste/   → pianeta nella landing + pagina /universo/abilita-acquisiste
├── Capacità/             → pianeta nella landing + pagina /universo/capacita
├── Lavori/               → pianeta nella landing + pagina /universo/lavori
└── Progetti/             → pianeta nella landing + pagina /universo/progetti
```

- Ogni sottocartella di `landing/` genera un pianeta sulla pagina principale.
- `head-landing.json` governa la testata della landing.
- Ogni sottocartella contiene un solo `head-*.json`, che governa la testata e il collegamento della relativa pagina.
- Il nome della cartella diventa il nome visibile del pianeta.
- Il nome normalizzato senza accenti diventa la rotta `/universo/<nome-cartella>`.
- Ogni altro JSON con prefisso numerico (`01-`, `02-`, `10-`, `28-`...) genera un pianeta nella pagina della sezione.
- I file `head-*.json` sono metadati di pagina e non diventano pianeti.
- Qualsiasi JSON che inizia con `-`, per esempio `-02-angular.json` o `-template.json`, viene ignorato completamente: non genera né una pagina né un pianeta e non viene validato come contenuto.
- Un JSON che non appartiene a nessuna delle tre categorie interrompe la generazione con un errore esplicito.
- Una cartella senza JSON pianeta rimane navigabile e mostra lo stato vuoto con le istruzioni per aggiungere il primo pianeta.

## Aggiungere una sezione alla landing

1. Creare una nuova cartella dentro `content/landing/`, per esempio `Formazione`.
2. Aggiungere `head-formazione.json` seguendo il formato descritto sotto.
3. Aggiungere almeno un JSON pianeta valido nella nuova cartella, oppure lasciarla senza pianeti.
4. Eseguire `npm run generate:experiences`, `npm start`, `npm test` oppure `npm run build`.

Compariranno automaticamente il pianeta `Formazione`, la voce nel menu laterale e la rotta `/universo/formazione`.

## Aggiungere un pianeta a una sezione

1. Copiare `content/landing/Capacità/-template.json` nella cartella desiderata.
2. Rinominare la copia con un prefisso d’ordine, per esempio `20-nuovo-contenuto.json`. Il prefisso stabilisce l’ordine dei pianeti.
3. Compilare tutti i campi mantenendo la struttura.
4. Eseguire uno degli script indicati sopra.

Per eliminare un pianeta è sufficiente eliminare il relativo JSON. Le coordinate, il piano orbitale, la velocità e la texture vengono ricalcolati automaticamente.

## Testata di una pagina

I file `head-*.json` condividono lo stesso contratto e sono l’unica fonte dei testi di testata. Una modifica salvata durante `npm start` viene rigenerata automaticamente; test e build eseguono la stessa generazione prima di partire.

| Campo | Tipo | Uso |
| --- | --- | --- |
| `id` | numero | Identificatore del tipo di pagina (`0` per la landing, `1` per una sezione) |
| `name` | stringa | Slug della pagina; nelle sezioni deve coincidere con lo slug della cartella |
| `label` | stringa | Etichetta editoriale della pagina |
| `headTitle` | stringa | Soprattitolo colorato sopra il titolo principale |
| `headDescriptionRow1` | stringa | Prima riga del titolo principale |
| `headDescriptionRow2` | stringa | Seconda riga evidenziata del titolo principale |
| `sideTitle` | stringa | Testo principale nella colonna destra |
| `sideDescription` | stringa | Testo guida nella colonna destra |
| `route` | stringa | Rotta della pagina (`/` per la landing) |
| `routeLabel` | stringa | Descrizione editoriale del collegamento |

## Campi di un pianeta numerato

Lavori e Progetti rappresentano il formato canonico. Non esistono più alias o campi del formato precedente.

| Campo | Tipo | Uso |
| --- | --- | --- |
| prefisso del file | numero | Ordine orbitale e di lettura; non va ripetuto nel contenuto |
| `id` | stringa | Identificatore univoco del pianeta nella cartella |
| `name` | stringa | Nome esteso mostrato nel pannello informativo |
| `label` | stringa | Etichetta breve proiettata sul pianeta |
| `title` | stringa | Titolo completo |
| `period` | stringa | Periodo o contesto tecnico |
| `description` | stringa | Descrizione sintetica |
| `tags` | stringhe[] | Tecnologie o temi |
| `link` | stringa | Collegamento opzionale; usare una stringa vuota quando non serve |

## Generazione e prerender

`scripts/generate-experiences.mjs` attraversa tutte le cartelle, classifica i file esclusivamente dal nome, valida testate e pianeti attivi, crea `src/app/generated/atlas.generated.ts` e interrompe build/test con un errore preciso in caso di dati non validi. Angular usa lo stesso catalogo per menu, landing, pagine interne e parametri di prerender.

## Aggiornamento durante lo sviluppo

`npm start` avvia insieme Angular e `scripts/serve-with-content-watch.mjs`. Il watcher osserva `content/landing/`; quando viene salvato un JSON, rigenera `atlas.generated.ts`. Angular rileva il file generato e aggiorna automaticamente la pagina locale.

La navigazione tra due rotte `/universo/...` aggiorna lo stesso componente già aperto: la pagina ascolta i cambiamenti del parametro di route e sostituisce immediatamente testata, pianeti e scena WebGL.

GitHub Pages resta un sito statico: sul dominio pubblico le modifiche ai JSON diventano visibili dopo build, sincronizzazione degli artefatti, commit e pubblicazione automatica.

Le rotte delle sezioni vengono prerenderizzate come directory statiche e restano quindi compatibili con la pubblicazione dalla radice di GitHub Pages.
