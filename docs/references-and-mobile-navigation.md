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
- Lo spostamento è animato con `scroll-behavior: smooth`.
- Il trascinamento orizzontale del menu è disabilitato tramite `overflow-x: hidden` e `touch-action: pan-y`.
- Lo scorrimento verticale della pagina resta disponibile.
- I pulsanti hanno etichette ARIA distinte per palette e pagine.

Su tablet e desktop il comportamento rimane invariato e le frecce non sono visualizzate.
