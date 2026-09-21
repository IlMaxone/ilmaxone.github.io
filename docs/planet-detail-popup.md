# Popup dei pianeti e pausa cosmica

Le pagine interne dell’universo (`/universo/*`) mostrano il contenuto di un pianeta in un popup sovrapposto alla scena WebGL. La landing continua invece a usare i pianeti come collegamenti diretti alle sezioni.

## Comportamento

1. La selezione di un pianeta interno apre il relativo dettaglio e mette immediatamente in pausa la rotazione automatica del sole, dei pianeti e delle orbite.
2. Il popup mantiene titolo, periodo, descrizione, tag, collegamento e navigazione tra i pianeti della sezione.
3. Si può chiudere dalla X arancione, premendo `Esc` oppure selezionando lo spazio oscurato intorno al popup.
4. Se il cosmo stava ruotando prima dell’apertura, dopo la chiusura resta fermo per due secondi. Lo stato in alto a sinistra mostra il conto alla rovescia; allo scadere la rotazione riparte automaticamente.
5. Se il cosmo era già in pausa prima dell’apertura, il conto alla rovescia non compare: resta visibile lo stato di pausa manuale e la scena rimane ferma.
6. Se durante il conto alla rovescia viene selezionato un altro pianeta, il timer viene annullato e si apre subito il nuovo dettaglio; alla nuova chiusura non viene avviato un secondo countdown perché il cosmo era già fermo.

## Dimensioni responsive

- Desktop: larghezza massima di `520px` e margine minimo di `22px` dal bordo dello schermo.
- Telefono: larghezza disponibile con `12px` di margine per lato; tipografia, spazi e navigazione si compattano automaticamente.
- Il popup usa sempre la propria altezza naturale: non ha altezza massima e non mostra scrollbar interne. Il contenuto attuale rimane quindi interamente visibile sia su desktop sia su telefono.

L’overlay usa un posizionamento fisso rispetto al viewport, non rispetto al riquadro WebGL: il popup rimane centrato e completo anche se la scena inizia più in basso nella pagina.

La X riprende il linguaggio visivo della freccia di fuoco: nucleo arancione, alone luminoso e una piccola scia rivolta verso sinistra.

## Accessibilità

Il dettaglio usa `role="dialog"` e `aria-modal="true"`, riceve il focus sul pulsante di chiusura e restituisce il focus all’elemento precedente quando viene chiuso. Lo stato della scena è annunciato con una regione `aria-live` discreta. Le animazioni di ingresso e le transizioni sono quasi azzerate quando il sistema richiede movimento ridotto.

## File coinvolti

- `custom-portfolio-app/src/app/pages/landing/landing-page.ts`: stato del popup, pausa, timer e gestione del focus.
- `custom-portfolio-app/src/app/pages/landing/landing-page.html`: dialogo e collegamento con la scena.
- `custom-portfolio-app/src/app/pages/landing/landing-page.scss`: overlay, misure responsive e X di fuoco.
- `custom-portfolio-app/src/app/pages/landing/orbital-scene.ts`: sospensione degli aggiornamenti automatici WebGL.
- `custom-portfolio-app/src/app/pages/landing/orbital-scene.html` e `.scss`: indicatore pausa/conto alla rovescia.
- `custom-portfolio-app/src/app/pages/landing/landing-detail.spec.ts`: test del flusso di apertura e ripresa.

Gli scatti del timer richiedono esplicitamente un nuovo controllo della vista Angular: in questo modo il testo del conto alla rovescia e l’input `motionPaused` della scena vengono aggiornati anche nella build di produzione zoneless.

## Pausa manuale

Nei controlli della scena, subito dopo Reset, è presente il selettore di movimento. Quando il cosmo ruota mostra `II`; premendolo ferma la rotazione e si trasforma nel triangolo arancione di ripresa. Il pulsante usa `aria-pressed` e un’etichetta dinamica per comunicare lo stato anche senza affidarsi alla sola forma.

La pausa manuale è indipendente dal popup: l’apertura del dettaglio mette comunque il cosmo in pausa, ma alla chiusura viene rispettato lo stato precedente. Il countdown appare soltanto se prima dell’apertura la scena era in rotazione.
