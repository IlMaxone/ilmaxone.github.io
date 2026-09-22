# Struttura editoriale della landing

Il file `head-landing.json` controlla i testi della testata della landing.

Ogni cartella di questo livello genera un pianeta nella landing, una voce nel menu e una pagina `/universo/<nome-cartella>`. Ogni cartella deve contenere esattamente un file `head-*.json`: questo controlla testi e collegamento della relativa pagina.

La classificazione dipende esclusivamente dal nome del file:

- `head-*.json` controlla la pagina e non genera un pianeta;
- `01-*.json`, `02-*.json`, `10-*.json`, `28-*.json` e in generale ogni JSON con prefisso numerico genera un pianeta; il numero ne stabilisce l’ordine;
- `-*.json`, come `-02-angular.json` o `-template.json`, viene ignorato completamente e non genera né pagine né pianeti.

Durante `npm start`, ogni salvataggio di un JSON rigenera automaticamente il catalogo e aggiorna il server di sviluppo.

La guida completa è in `../../../docs/content-system.md`.
