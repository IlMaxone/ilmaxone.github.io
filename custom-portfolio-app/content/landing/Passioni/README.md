# Passioni

Il file `head-passioni.json` controlla testi, metadati e percorso della pagina Passioni.

La classificazione dei JSON dipende dal nome del file:

- i file numerati, per esempio `01-fotografia.json` o `20-musica.json`, generano i pianeti e ne stabiliscono l'ordine;
- i file che iniziano con `-`, compreso `-template.json`, sono bozze ignorate e non generano né pianeti né pagine;
- il solo file `head-passioni.json` descrive la testata della pagina.

Per aggiungere una passione, duplicare `-template.json`, rinominare la copia con un prefisso numerico e compilare i campi senza cambiarne la struttura. Durante `npm start`, il salvataggio rigenera automaticamente il catalogo.

La guida completa è in `../../../../docs/content-system.md`.
