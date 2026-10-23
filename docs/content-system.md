# Sistema di contenuti: cartelle e pianeti

## Regola principale

La webapp separa navigazione, testi e template. La struttura in `custom-portfolio-app/content/landing/` è la fonte della navigazione; `custom-portfolio-app/content/approfondimenti/` contiene i JSON delle pagine descrittive:

```text
content/landing/
├── head-landing.json      → testata e metadati della landing
├── Abilità Acquisite/        → pianeta nella landing + pagina /universo/abilita-acquisite
├── Competenze Lavorative/    → pianeta nella landing + pagina /universo/competenze-lavorative
├── Passioni/                 → pianeta nella landing + pagina /universo/passioni
└── Progetti Personali/       → pianeta nella landing + pagina /universo/progetti-personali

content/approfondimenti/      → testi JSON degli approfondimenti, modificabili a mano
content/img/                  → immagini utilizzabili negli approfondimenti
src/app/pages/details/
└── detail-page.html          → unico template HTML condiviso dagli approfondimenti
```

- Ogni sottocartella di `landing/` genera un pianeta sulla pagina principale.
- `head-landing.json` governa la testata della landing.
- Ogni sottocartella contiene un solo `head-*.json`, che governa la testata e il collegamento della relativa pagina.
- Il nome della cartella diventa il nome visibile del pianeta.
- Il nome normalizzato senza accenti diventa la rotta `/universo/<nome-cartella>`.
- Ogni altro JSON con prefisso numerico (`01-`, `02-`, `10-`, `28-`...) genera un pianeta nella pagina della sezione.
- Ogni JSON attivo in `content/approfondimenti/` genera una pagina descrittiva raggiungibile dal popup del pianeta collegato tramite `detailsPath`.
- Ogni microcosmo può contenere al massimo 6 pianeti. Argomenti tecnicamente collegati devono essere consolidati nello stesso pianeta; la granularità completa viene mantenuta nelle pagine di approfondimento.
- `content/approfondimenti/details-template.json` è un modello editoriale JSON e viene ignorato fino a quando non viene duplicato e rinominato. Il template HTML è un file distinto nella cartella `src/app/pages/details/`.
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

1. Copiare `content/approfondimenti/details-template.json` nella stessa cartella `content/approfondimenti/` della webapp.
2. Rinominare la copia, per esempio `details-02-nome-contenuto.json`.
3. Assegnare un `path` univoco nel formato `/approfondimenti/nome-percorso`.
4. Aggiungere lo stesso valore nel campo `detailsPath` del JSON numerato del pianeta.
5. Compilare titolo, introduzione, paragrafi, sezioni e tag.
6. Se servono immagini, copiarle in `content/img/` e associarle al paragrafo tramite l'oggetto `image`.

Il generatore cerca gli approfondimenti soltanto in `content/approfondimenti/`, verifica che `id` e `path` non siano duplicati e che ogni JSON attivo sia collegato da almeno un pianeta. Il pianeta e l'approfondimento possono quindi stare in cartelle diverse. Il collegamento di ritorno e il nome della sezione vengono ricavati dal pianeta; collegamenti allo stesso approfondimento da sezioni diverse sono rifiutati per evitare un ritorno ambiguo. In caso di errori build e test si interrompono con un messaggio esplicito.

I testi si aggiornano manualmente nel JSON: non è necessario modificare il template HTML né i file TypeScript generati. `title`, `lead`, `paragraphs`, `sections` e `tags` contengono soltanto dati e testi; eventuale markup HTML viene mostrato come testo. La struttura della pagina, i cicli di rendering, le immagini e la lightbox sono gestiti dal template condiviso `src/app/pages/details/detail-page.html`.

Gli `approfondimenti/*/index.html` alla radice del repository sono soltanto artefatti prerenderizzati per GitHub Pages e conservano gli URL pubblici `/approfondimenti/...`. La fonte modificabile resta dentro la webapp.

### Campi dei JSON degli approfondimenti

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

`scripts/generate-experiences.mjs` legge testate e pianeti da `content/landing/` e gli approfondimenti da `content/approfondimenti/`. Valida dati e collegamenti e genera due cataloghi distinti: `src/app/generated/atlas.generated.ts` per la navigazione e `src/app/generated/details.generated.ts` per i testi delle pagine descrittive. Il template HTML non è contenuto nei JSON e non viene generato insieme ai testi. Angular usa i cataloghi per menu, landing, pagine interne e parametri di prerender. Build e test si interrompono con un errore preciso in caso di dati non validi.

`npm run test:content` verifica lettura dei JSON indipendenti, modifica manuale dei testi, collegamenti di ritorno, contenuti ignorati, percorsi mancanti, duplicati e contenuti orfani. Gli stessi controlli vengono eseguiti prima dei test Angular con `npm test`.

## Aggiornamento durante lo sviluppo

`npm start` avvia insieme Angular e `scripts/serve-with-content-watch.mjs`. Il watcher osserva l'intera cartella `content/`, comprese `landing/` e `approfondimenti/`; quando viene salvato un JSON, rigenera i due cataloghi. Angular rileva i file generati e aggiorna automaticamente la pagina locale. Le immagini di `content/img/` vengono copiate nel percorso pubblico `/img/` dalla configurazione degli asset Angular.

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

### Competenze Lavorative

La sezione `Competenze Lavorative` contiene 6 pianeti attivi, ciascuno collegato a un JSON in `content/approfondimenti/` che conserva la granularità delle competenze originarie:

1. Data Engineering e Analytics
2. Sistemistica, Cloud e Virtualizzazione
3. DevOps, Automazione e Observability
4. Networking, Cybersecurity e Identity
5. Digital Workplace e Supporto IT
6. Software Engineering e Soluzioni Clienti

I progetti realizzati per clienti vengono descritti esclusivamente attraverso settore, problema, soluzione e contributo tecnico. Nomi, marchi e altri elementi identificativi del cliente e nomi di persone private non devono comparire nei contenuti pubblici. I nomi dei software e delle tecnologie utilizzate possono essere citati.

Il vincolo di anonimizzazione comprende anche importi, budget, preventivi e altri dati economici, indirizzi di rete, hostname e domini interni, identificativi di progetto, credenziali, chiavi e altri parametri riservati. I riferimenti generali all'ottimizzazione dei costi descrivono una competenza tecnica e non devono riportare valori economici. I materiali sorgente restano separati dai contenuti pubblici e dal PDF esportato.

Lo studio individuale finalizzato a certificazioni non viene presentato come competenza lavorativa. Le tecnologie oggetto di certificazione possono comparire soltanto quando supportate da esperienza pratica documentata.

Il precedente contenuto Customer Data Platform è conservato, ma temporaneamente disabilitato tramite `content/landing/Competenze Lavorative/-01-CDP.json` e `content/approfondimenti/-details-01-cdp.json`. Il prefisso `-` impedisce sia la generazione del pianeta sia quella della rotta di approfondimento, senza eliminare il contenuto editoriale originale.

Il confronto del 22 ottobre 2026 con i PDF formativi e i registri dei tre anni ha integrato i contenuti attivi, mantenendo i sei pianeti esistenti. Gli approfondimenti esplicitano test di carico BigQuery, migrazione delle credenziali API, archiviazione delle tabelle di test/UAT, upgrade Ubuntu e Node.js, manutenzione dei database applicativi, cifratura dei log Winlogbeat, policy Dual Boot/BitLocker, OpenID Connect tra Proxmox e Google Cloud, migrazioni Drive tramite GAM, licenze, board e procedure YouTrack. Le attività formative sono descritte per il loro contenuto pratico, senza attribuire certificazioni conseguite o riprodurre dati anagrafici, firme, nomi di clienti e persone private.

L'arricchimento successivo aggiunge audit Windows con contesto GCPW, raccolta Filebeat su macOS con coda su disco, collegamenti Google Cloud/MikroTik con BGP e IPsec, diagnostica VPN automatizzata, analisi ETL MongoDB/BigQuery e procedure di custodia delle chiavi BitLocker. Il percorso Workspace è presentato come materiale formativo disponibile; il flusso NeTEx/SAX/Hive come schema progettuale. Nessuno dei due viene usato per attribuire docenza o messa in produzione non documentate.

### Esportazione del PDF completo

`scripts/export-competencies-pdf.py` legge i sei pianeti attivi e tutti i loro approfondimenti direttamente dai JSON della webapp e crea `pdf/Report_completo_pianeti_competenze.pdf` nella cartella personale esterna `Universo Lavorativo`. Il documento contiene panoramica, indice, descrizioni, paragrafi, sezioni e tag completi. Il testo non viene mantenuto in una seconda copia editoriale.

Eseguire lo script dalla cartella `custom-portfolio-app/`, con Python e ReportLab disponibili. I font vengono scelti fra Segoe UI su Windows, DejaVu Sans su Linux e i font inclusi in ReportLab:

```bash
python scripts/export-competencies-pdf.py
```

Per fissare la data di edizione o scegliere una destinazione diversa, usare rispettivamente `--date YYYY-MM-DD` e `--output <percorso.pdf>`. La destinazione deve essere esterna al repository: lo script rifiuta percorsi interni. Il file completo è distinto dal precedente riepilogo sintetico, conservato in `pdf/Report_pianeti_competenze_lavorative.pdf` nella stessa cartella personale.

L'esportazione include soltanto contenuti pubblici anonimizzati. Appunti, schermate, fotografie e archivi sorgente riservati non vengono incorporati automaticamente nel documento.

### Documenti professionali fuori dal repository

La destinazione per CV, report e documenti analoghi è `C:/Users/maxim/OneDrive/Documenti/Personale/Universo Lavorativo/`. I PDF sono nella sottocartella `pdf/`; i generatori con contenuti personali dei CV sono in `scripts/`. Questi file non sono asset del sito e non devono essere versionati o pubblicati. La cartella `output/` non viene più usata per i documenti.

Il generatore della versione corrente dei tre CV è `Universo Lavorativo/scripts/export-cv-stile-2023.py`. Produce `CV_Sviluppatore_Software_Web_Stile_2023.pdf`, `CV_Datacenter_Engineer_Stile_2023.pdf` e `CV_Sistemista_di_Rete_Stile_2023.pdf`, sempre nella sottocartella `pdf/` esterna. Ogni CV occupa una pagina, con layout a due colonne, competenze tecniche mirate al ruolo e un campo compilabile per la data finale dell'esperienza IT. La grafica e la scrittura seguono il modello personale del 2023; le informazioni sono integrate con il CV del 2022 e con le competenze verificate. Questi originali sono materiali personali e restano fuori da Git.

Il precedente generatore `Universo Lavorativo/scripts/export-cv-templates.py` e i tre PDF senza suffisso `_Stile_2023` sono conservati separatamente. Per eseguire i generatori dei CV servono Python, ReportLab e pypdf; la versione grafica richiede anche Pillow, i font Windows usati nel modello e l'immagine originale del CV 2023 nella cartella personale. Non copiare nel repository foto, recapiti, contenuti dei CV o generatori che li includono.

La variabile d'ambiente `UNIVERSO_LAVORATIVO_DIR` configura una destinazione alternativa esterna per il generatore del report e quello dei modelli precedenti. Senza tale variabile, il generatore del report usa la cartella personale indicata sopra sotto la home dell'utente; quello dei modelli precedenti usa la cartella che contiene la propria directory `scripts/`. Il generatore grafico del 2023 legge e scrive nella sottocartella `pdf/` della propria cartella personale, individuata dalla posizione dello script.

Il `.gitignore` esclude PDF, `output/` e file temporanei. I PDF precedentemente versionati vengono rimossi dal tracciamento corrente; questo non elimina le copie presenti nei commit storici.

### Passioni

La sezione `Passioni` contiene 4 pianeti attivi:

1. Gaming
2. Stampa 3D
3. Modding Minecraft
4. Percorso Java

I contenuti raccontano interessi, esperienze personali e percorsi formativi al di fuori della tassonomia delle competenze lavorative. La mod Minecraft resta un pianeta sintetico finché non saranno disponibili i dettagli per un eventuale approfondimento dedicato.
