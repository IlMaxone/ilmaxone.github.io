# Struttura editoriale della landing

Il file `head-landing.json` controlla i testi della testata della landing.

Ogni cartella di questo livello genera un pianeta nella landing, una voce nel menu e una pagina `/universo/<nome-cartella>`. Ogni cartella deve contenere esattamente un file `head-*.json`: questo controlla testi e collegamento della relativa pagina.

La classificazione dipende esclusivamente dal nome del file:

- `head-*.json` controlla la pagina e non genera un pianeta;
- `01-*.json`, `02-*.json`, `10-*.json`, `28-*.json` e in generale ogni JSON con prefisso numerico genera un pianeta; il numero ne stabilisce l’ordine;
- i JSON degli approfondimenti si trovano separatamente in `../approfondimenti/` e sono collegati dal campo `detailsPath` del pianeta;
- `-*.json`, come `-02-angular.json` o `-template.json`, viene ignorato completamente e non genera né pagine né pianeti.

Durante `npm start`, ogni salvataggio di un JSON rigenera automaticamente il catalogo e aggiorna il server di sviluppo.

I contenuti degli approfondimenti si modificano a mano nei JSON di `../approfondimenti/`; il template HTML condiviso resta in `../../src/app/pages/details/detail-page.html`. I paragrafi possono affiancare immagini da `../img/`, nei formati gif, webp, jpeg, jpg o png. `../approfondimenti/details-template.json` mostra il formato completo e [la guida della cartella](../approfondimenti/README.md) descrive come modificare o aggiungere una pagina.

La guida completa è in `../../../docs/content-system.md`.

## Sezioni attuali

| Cartella | Head | Percorso |
| --- | --- | --- |
| `Abilità Acquisite/` | `head-abilita-acquisite.json` | `/universo/abilita-acquisite` |
| `Competenze Lavorative/` | `head-competenze-lavorative.json` | `/universo/competenze-lavorative` |
| `Passioni/` | `head-passioni.json` | `/universo/passioni` |
| `Progetti Personali/` | `head-progetti-personali.json` | `/universo/progetti-personali` |
