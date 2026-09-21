# Riferimenti e navigazione mobile

## Pagina Riferimenti

Il nome **IlMaxone** nel menu laterale non riporta più alla landing: apre `/riferimenti`.

La pagina raccoglie soltanto contatti pubblici verificabili già associati al progetto:

- profilo GitHub [`github.com/IlMaxone`](https://github.com/IlMaxone);
- dominio ufficiale [`ilmaxone.github.io`](https://ilmaxone.github.io).

Non sono stati inventati indirizzi email o profili social. Eventuali nuovi recapiti vanno aggiunti in `src/app/pages/references/references-page.html` e verificati prima della pubblicazione.

Il vecchio logo testuale `GM` è stato rimosso dall’interfaccia principale.

## Menu su telefono

Sotto i `680px`, selettore palette e navigazione delle pagine diventano due caroselli orizzontali controllati da pulsanti freccia.

- Le frecce sinistra/destra spostano il rispettivo elenco di circa il 72% della larghezza visibile.
- La freccia sinistra è invisibile all’inizio dell’elenco e quella destra scompare quando viene raggiunta la fine; entrambe ricompaiono tornando verso il centro.
- Lo spostamento è animato con `scroll-behavior: smooth`.
- Il trascinamento orizzontale del menu è disabilitato tramite `overflow-x: hidden` e `touch-action: pan-y`.
- Lo scorrimento verticale della pagina resta disponibile.
- I pulsanti hanno etichette ARIA distinte per palette e pagine.

### Direzione grafica selezionata

Il 21 settembre 2026 è stata scelta la variante **05 · Coordinate stellari**:

- reticolo a croce che richiama le coordinate di una mappa astronomica;
- rombo ametista luminoso al centro;
- indicatore triangolare arancio rivolto nella direzione dello spostamento;
- stesso linguaggio applicato ai controlli che ruotano la scena WebGL.

La variante **03 · Cometa radente** è usata come scorciatoia permanente verso la landing. È posizionata accanto al nome IlMaxone sia nel menu desktop sia nell’intestazione mobile; la testa luminosa punta a sinistra e la scia indica il ritorno al nucleo dell’universo.

Su tablet e desktop il comportamento rimane invariato e le frecce non sono visualizzate.
