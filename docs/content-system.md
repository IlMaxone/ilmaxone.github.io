# Sistema di contenuti: cartelle e pianeti

## Regola principale

La struttura in `custom-portfolio-app/content/landing/` è la fonte della navigazione:

```text
content/landing/
├── head-landing.json      → testata e metadati della landing
├── Abilità Acquisite/        → pianeta nella landing + pagina /universo/abilita-acquisite
├── Competenze Lavorative/    → pianeta nella landing + pagina /universo/competenze-lavorative
├── Passioni/                 → pianeta nella landing + pagina /universo/passioni
└── Progetti Personali/       → pianeta nella landing + pagina /universo/progetti-personali

content/img/                  → immagini utilizzabili negli approfondimenti
```

- Ogni sottocartella di `landing/` genera un pianeta sulla pagina principale.
- `head-landing.json` governa la testata della landing.
- Ogni sottocartella contiene un solo `head-*.json`, che governa la testata e il collegamento della relativa pagina.
- Il nome della cartella diventa il nome visibile del pianeta.
- Il nome normalizzato senza accenti diventa la rotta `/universo/<nome-cartella>`.
- Ogni altro JSON con prefisso numerico (`01-`, `02-`, `10-`, `28-`...) genera un pianeta nella pagina della sezione.
- Ogni JSON `details-*.json` genera una pagina descrittiva raggiungibile dal popup del pianeta collegato.
- `details-template.json` è un modello editoriale e viene ignorato fino a quando non viene duplicato e rinominato.
- I file `head-*.json` sono metadati di pagina e non diventano pianeti.
- Qualsiasi JSON che inizia con `-`, per esempio `-02-angular.json` o `-template.json`, viene ignorato completamente: non genera né una pagina né un pianeta e non viene validato come contenuto.
- Un JSON che non appartiene a nessuna categoria riconosciuta interrompe la generazione con un errore esplicito.
- Una cartella senza JSON pianeta rimane navigabile e mostra lo stato vuoto con le istruzioni per aggiungere il primo pianeta.

## Aggiungere una sezione alla landing

1. Creare una nuova cartella dentro `content/landing/`, per esempio `Formazione`.
2. Aggiungere `head-formazione.json` seguendo il formato descritto sotto.
3. Aggiungere almeno un JSON pianeta valido nella nuova cartella, oppure lasciarla senza pianeti.
4. Eseguire `npm run generate:experiences`, `npm start`, `npm test` oppure `npm run build`.

Compariranno automaticamente il pianeta `Formazione`, la voce nel menu laterale e la rotta `/universo/formazione`.

## Aggiungere un pianeta a una sezione

1. Copiare `content/landing/Passioni/-template.json` nella cartella desiderata.
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

Competenze Lavorative e Progetti Personali rappresentano il formato canonico. Non esistono più alias o campi del formato precedente.

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
| `detailsPath` | stringa opzionale | Rotta dell'approfondimento, nel formato `/approfondimenti/nome-percorso`; se presente mostra il pulsante arancione “Maggiori informazioni” |

## Aggiungere una pagina descrittiva

Le pagine di approfondimento non compaiono nel menu, nella landing o come pianeti aggiuntivi. Sono raggiungibili esclusivamente dal pulsante **Maggiori informazioni** del pianeta che le dichiara.

Ogni pagina di approfondimento carica automaticamente il fondale WebGL statico della Via Lattea. Il JSON non deve dichiararlo: il fondale è condiviso, ruota in modo indipendente e segue in tempo reale la palette scelta dall'utente. Implementazione, ottimizzazioni e fonti NASA sono documentate in [Direzione scelta: Atlante solare](solar-atlas-design.md#sfondo-via-lattea-degli-approfondimenti).

1. Copiare `content/landing/Competenze Lavorative/details-template.json` nella cartella del pianeta interessato.
2. Rinominare la copia, per esempio `details-02-nome-contenuto.json`.
3. Assegnare un `path` univoco nel formato `/approfondimenti/nome-percorso`.
4. Aggiungere lo stesso valore nel campo `detailsPath` del JSON numerato del pianeta.
5. Compilare titolo, introduzione, paragrafi, sezioni e tag.
6. Se servono immagini, copiarle in `content/img/` e associarle al paragrafo tramite l'oggetto `image`.

Il generatore controlla che il percorso esista nella stessa cartella del pianeta, che non sia duplicato e che ogni file `details-*` attivo sia collegato da almeno un pianeta. In caso contrario build e test si interrompono con un messaggio esplicito.

### Campi di `details-*.json`

| Campo | Tipo | Uso |
| --- | --- | --- |
| `id` | stringa | Identificatore univoco globale dell'approfondimento |
| `path` | stringa | Rotta pubblica `/approfondimenti/<slug>` |
| `eyebrow` | stringa | Soprattitolo contestuale |
| `title` | stringa | Titolo principale della pagina |
| `lead` | stringa | Introduzione breve accanto al titolo |
| `paragraphs` | (stringa oppure oggetto)[] | Uno o più testi introduttivi; l'oggetto permette di affiancare un'immagine al testo |
| `sections` | oggetti[] | Blocchi descrittivi; ciascuno contiene `title` e uno o più `paragraphs`, con lo stesso supporto immagini |
| `tags` | stringhe[] | Temi riassuntivi mostrati nella scheda laterale |

Il numero dei paragrafi e delle sezioni è libero: per allungare la pagina basta aggiungere testi agli array o duplicare un oggetto dentro `sections`.

### Immagini affiancate ai testi

Le immagini devono trovarsi in `custom-portfolio-app/content/img/`. Il nome del file è libero, inclusi spazi e lettere maiuscole; i formati accettati sono `.gif`, `.webp`, `.jpeg`, `.jpg` e `.png`. Durante la generazione vengono controllati estensione, esistenza del file e permanenza all'interno della cartella `img`.

Un paragrafo senza immagine può restare una normale stringa. Per affiancare un'immagine a metà riga, sostituire la stringa con questo oggetto:

```json
{
  "text": "Testo del paragrafo.",
  "image": {
    "file": "Rack 4.webp",
    "alt": "Descrizione accessibile e significativa",
    "position": "right",
    "caption": "Didascalia facoltativa"
  }
}
```

- `file` è il nome relativo alla cartella `content/img/`;
- `alt` è obbligatorio e descrive l'immagine per accessibilità;
- `position` accetta esclusivamente `left` o `right`;
- `caption` è facoltativa;
- su desktop immagine e testo occupano ciascuno metà della riga;
- su mobile i due elementi si dispongono verticalmente per mantenere leggibilità;
- premendo l'immagine si apre una visualizzazione ingrandita, richiudibile con la X arancione, cliccando sullo sfondo oppure premendo `Esc`.

Il file `details-template.json` contiene esempi completi con immagine a destra, a sinistra e dentro una sezione.

## Generazione e prerender

`scripts/generate-experiences.mjs` attraversa tutte le cartelle, classifica i file esclusivamente dal nome, valida testate, pianeti e approfondimenti attivi, crea `src/app/generated/atlas.generated.ts` e interrompe build/test con un errore preciso in caso di dati non validi. Angular usa lo stesso catalogo per menu, landing, pagine interne e parametri di prerender.

## Aggiornamento durante lo sviluppo

`npm start` avvia insieme Angular e `scripts/serve-with-content-watch.mjs`. Il watcher osserva `content/landing/`; quando viene salvato un JSON, rigenera `atlas.generated.ts`. Angular rileva il file generato e aggiorna automaticamente la pagina locale. Le immagini di `content/img/` vengono copiate nel percorso pubblico `/img/` dalla configurazione degli asset Angular.

La navigazione tra due rotte `/universo/...` aggiorna lo stesso componente già aperto: la pagina ascolta i cambiamenti del parametro di route e sostituisce immediatamente testata, pianeti e scena WebGL.

GitHub Pages resta un sito statico: sul dominio pubblico le modifiche ai JSON diventano visibili dopo build, sincronizzazione degli artefatti, commit e pubblicazione automatica.

Le rotte delle sezioni e degli approfondimenti vengono prerenderizzate come directory statiche e restano quindi compatibili con la pubblicazione dalla radice di GitHub Pages.

## Tassonomia corrente

Il refactoring editoriale del 28 settembre 2026 ha definito quattro sezioni stabili:

| Sezione | File head | Rotta pubblica |
| --- | --- | --- |
| Abilità Acquisite | `Abilità Acquisite/head-abilita-acquisite.json` | `/universo/abilita-acquisite` |
| Competenze Lavorative | `Competenze Lavorative/head-competenze-lavorative.json` | `/universo/competenze-lavorative` |
| Passioni | `Passioni/head-passioni.json` | `/universo/passioni` |
| Progetti Personali | `Progetti Personali/head-progetti-personali.json` | `/universo/progetti-personali` |

I nomi delle cartelle, il campo `name`, il campo `route` e il nome del relativo `head-*.json` devono restare coerenti. La generazione blocca build e test se rileva una divergenza.
