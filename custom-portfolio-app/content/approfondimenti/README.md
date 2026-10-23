# Contenuti degli approfondimenti

Questa cartella della webapp contiene i testi delle pagine `/approfondimenti/...`. Ogni file JSON attivo è un contenuto modificabile manualmente. Il nome del file serve a riconoscerlo; l'URL pubblico dipende dal campo `path`.

Il template HTML condiviso è separato dai testi e si trova in `../../src/app/pages/details/detail-page.html`. Non occorre modificarlo per aggiornare titolo, introduzione, paragrafi, sezioni o tag. I testi JSON sono visualizzati come testo, senza interpretare markup HTML.

## Modificare una pagina

1. Aprire il JSON dell'approfondimento desiderato.
2. Modificare `title`, `lead`, `paragraphs`, `sections` o `tags` mantenendo un JSON valido.
3. Durante `npm start`, salvare il file: il watcher rigenera i contenuti e Angular aggiorna la pagina.
4. Per l'anteprima Docker, eseguire `docker compose up --build -d` dalla radice del repository.
5. Per GitHub Pages, effettuare build e sincronizzazione degli artefatti prima della pubblicazione.

## Creare una pagina

Copiare `details-template.json` in un nuovo JSON, assegnare `id` e `path` univoci e collegare lo stesso `path` dal campo `detailsPath` di un pianeta in `../landing/`. Il collegamento di ritorno alla sezione viene ricavato dal pianeta: non occorre duplicarlo nel JSON.

Esempio minimo:

```json
{
  "id": "nuovo-argomento",
  "path": "/approfondimenti/nuovo-argomento",
  "eyebrow": "Competenza lavorativa",
  "title": "Titolo dell'approfondimento",
  "lead": "Breve introduzione.",
  "paragraphs": ["Primo paragrafo introduttivo."],
  "sections": [
    {
      "title": "Attività e strumenti",
      "paragraphs": ["Descrizione delle attività svolte."]
    }
  ],
  "tags": ["Software", "Competenza"]
}
```

`details-template.json` e i file con prefisso `-` sono ignorati. I paragrafi possono anche essere oggetti con `text` e un'immagine opzionale, come negli esempi del template; le immagini restano in `../img/`.

Non modificare `src/app/generated/details.generated.ts` o gli `index.html` generati nella cartella `approfondimenti/` alla radice del repository: vengono ricreati a partire da questi JSON e dal template condiviso.

## Anonimizzazione e PDF

I testi pubblici possono citare software e tecnologie; devono escludere clienti e persone identificabili, importi e budget, indirizzi di rete, hostname, credenziali e altri parametri riservati. Materiali didattici e schemi progettuali devono essere descritti come tali.

Il PDF completo legge gli stessi JSON. Dopo una modifica, dalla cartella `custom-portfolio-app/` eseguire `python scripts/export-competencies-pdf.py` con Python e ReportLab disponibili. Il documento viene salvato in `pdf/Report_completo_pianeti_competenze.pdf` sotto `C:/Users/maxim/OneDrive/Documenti/Personale/Universo Lavorativo/`, fuori dal repository. La destinazione è configurabile tramite `UNIVERSO_LAVORATIVO_DIR`; `--output` deve comunque indicare un percorso esterno. CV e report non vanno aggiunti a Git. L'esportazione è separata dalla build del sito e dalla ricostruzione del container.

La guida completa al formato è in [Sistema di contenuti](../../../docs/content-system.md).
