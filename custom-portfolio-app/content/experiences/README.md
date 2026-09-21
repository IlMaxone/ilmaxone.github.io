# Esperienze

Ogni file `.json` di questa cartella, tranne quelli che iniziano con `_`, genera una punta della costellazione 3D.

Per aggiungere un’esperienza:

1. duplicare `_template.json` con un nome descrittivo;
2. compilare tutti i campi senza cambiare la struttura;
3. usare un `id` univoco composto da lettere minuscole, numeri e trattini;
4. scegliere `route` tra `/story` e `/works`;
5. eseguire `npm run generate:experiences` oppure direttamente `npm start`, `npm test` o `npm run build`.

Lo script valida i file, li ordina tramite `order` e genera il catalogo usato dalla home. Le coordinate X/Y/Z vengono calcolate automaticamente, quindi non occorre modificare il componente Angular.
