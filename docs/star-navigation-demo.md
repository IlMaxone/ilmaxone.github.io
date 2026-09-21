# Demo: costellazione 3D

## Obiettivo

Trasformare il portfolio da elenco di card a spazio esplorabile. Un nucleo sferico rappresenta l'identità professionale; le esperienze sono cubi collocati su coordinate tridimensionali e collegati al centro. L'interfaccia comunica che competenze, progetti e metodo sono parti dello stesso sistema.

## Interazione

- Trascinamento della scena per modificare gli angoli della camera sugli assi X e Y.
- Rotella del mouse per avvicinare o allontanare la scena.
- Avvicinamento del puntatore entro 118 px da un nodo: le sei facce del cubo si separano e rivelano il nucleo energetico.
- Hover, focus o click producono lo stesso stato aperto; il comportamento resta quindi disponibile anche da tastiera e touch.
- Frecce della tastiera per selezionare i nodi o inclinare la scena; `Home` ripristina la visuale.
- Click su un nodo per mostrare il relativo contenuto.
- Pannello laterale aggiornato in tempo reale con descrizione, periodo, tecnologie e collegamento alla sezione pertinente.
- Su schermi piccoli il pannello viene disposto sotto la costellazione, senza perdere controlli o contenuti.

## Nodi della demo

1. Profilo — identità e approccio.
2. Angular — interfacce e frontend.
3. NestJS — servizi e integrazioni backend.
4. Google Cloud — infrastruttura e servizi gestiti.
5. Data pipeline — MongoDB, Apache Beam, Dataflow e BigQuery.
6. Bitcoin bot — segnali TradingView, full node e Raspberry Pi.
7. Metodo — iterazione, semplicità e Time & Material.
8. Portfolio — il sito come laboratorio progettuale.

## Scelte tecniche

- Implementazione Angular e CSS 3D nativa, senza WebGL, canvas, librerie grafiche o dipendenze esterne.
- Nucleo, cubi, facce e raggi sono elementi HTML/CSS: rimangono semantici, selezionabili e testabili.
- Il budget degli stili di un componente è impostato a 14 kB di avviso e 16 kB di errore per ospitare la visualizzazione autocontenuta senza introdurre una libreria grafica.
- Ogni nodo riceve coordinate X/Y/Z generate automaticamente. Lunghezza, inclinazione e rotazione dei collegamenti vengono calcolate dal relativo vettore 3D.
- Le esperienze arrivano dai file JSON descritti in [Sistema di contenuti](content-system.md); le coordinate sono generate con una distribuzione sferica basata sull’angolo aureo.
- Il trascinamento aggiorna la trasformazione della camera; lo zoom è limitato tra 72% e 130%.
- La prossimità è calcolata sulle coordinate proiettate dei cubi dopo la trasformazione 3D.
- Le animazioni rispettano `prefers-reduced-motion`.
- Le pagine `/story` e `/works` restano disponibili come approfondimenti e come rotte prerenderizzate.

## Stato della demo

La demo è implementata come nuova home. Corregge inoltre il collegamento Home verso `/`, distingue la home dalla pagina Storia, aggiorna il riferimento del portfolio ad Angular 21 e rimuove il collegamento repository placeholder.

## Evoluzioni possibili

- Aggiungere date, metriche e risultati misurabili alle esperienze.
- Collegare nodi secondari tra loro per mostrare relazioni tra tecnologie e progetti.
- Usare filtri per separare competenze, progetti e principi di lavoro.
- Aggiungere una modalità “timeline” alternativa alla costellazione.
- Sostituire i contenuti dimostrativi con testi, link e contatti definitivi.
