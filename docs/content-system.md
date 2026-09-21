# Sistema di contenuti: una punta per file

## Obiettivo

L'atlante non contiene un elenco di esperienze scritto nel componente Angular. Ogni esperienza è un file JSON nella cartella `custom-portfolio-app/content/experiences/`; ogni nuovo file valido aggiunge automaticamente un pianeta e la relativa orbita durante start, test o build.

## Aggiungere una punta

1. Copiare `content/experiences/_template.json`.
2. Rinominare la copia, per esempio `09-nuova-esperienza.json`.
3. Compilare tutti i campi mantenendo la struttura del template.
4. Eseguire `npm start`, `npm test` oppure `npm run build`.

I file che iniziano con `_` vengono ignorati, quindi `_template.json` non appare nell'atlante.

## Campi

| Campo | Tipo | Uso |
| --- | --- | --- |
| `id` | stringa | Identificatore univoco: minuscole, numeri e trattini |
| `order` | numero | Ordine di lettura e selezione |
| `shortLabel` | stringa | Etichetta breve proiettata accanto al pianeta |
| `glyph` | stringa | Simbolo disponibile per viste compatte e future texture |
| `eyebrow` | stringa | Categoria del pannello informativo |
| `title` | stringa | Titolo dell’esperienza |
| `period` | stringa | Periodo o contesto tecnico |
| `description` | stringa | Descrizione sintetica |
| `tags` | stringhe[] | Tecnologie o temi |
| `route` | `/story` o `/works` | Approfondimento interno |
| `routeLabel` | stringa | Testo del collegamento |

## Generazione

Lo script `scripts/generate-experiences.mjs`:

1. legge tutti i JSON non riservati;
2. valida struttura, tipi, rotte e unicità degli identificatori;
3. ordina le esperienze tramite `order`;
4. genera `src/app/generated/experiences.generated.ts`;
5. interrompe build o test con un messaggio preciso se un file non rispetta il template.

Il file TypeScript generato è versionabile per rendere visibile il risultato, ma non deve essere modificato a mano.

## Distribuzione orbitale automatica

Il componente WebGL assegna a ogni esperienza raggio, inclinazione tridimensionale, velocità, direzione e texture procedurale. I valori derivano dall'indice ordinato e dall'angolo aureo: aggiungere o rimuovere un'esperienza rigenera il sistema orbitale senza coordinate manuali.

## Integrazione con gli script npm

La generazione viene eseguita automaticamente da:

- `prestart` prima del server di sviluppo;
- `pretest` prima dei test;
- `prebuild` prima della build di produzione.
