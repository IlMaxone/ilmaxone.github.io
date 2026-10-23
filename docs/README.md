# Documentazione

Questa cartella è la fonte di verità per architettura, decisioni e procedure del portfolio.

- [Architettura e pubblicazione](architecture.md)
- [Sistema di contenuti: pianeti, approfondimenti JSON e PDF](content-system.md)
- [Direzione scelta: Atlante solare](solar-atlas-design.md)
- [Riferimenti e navigazione mobile](references-and-mobile-navigation.md)
- [Popup dei pianeti e pausa cosmica](planet-detail-popup.md)

Ogni modifica significativa al sito deve aggiornare il documento pertinente. Il README del progetto rimane volutamente minimale e rimanda a questa cartella.

Per modificare i testi degli approfondimenti, partire dalla [guida ai JSON della webapp](../custom-portfolio-app/content/approfondimenti/README.md). L'[anteprima Docker](architecture.md#anteprima-locale-con-docker) serve il sito su localhost; l'[esportazione del PDF completo](content-system.md#esportazione-del-pdf-completo) usa gli stessi contenuti pubblici anonimizzati.

CV, PDF esportati e relativi materiali personali restano nella cartella esterna `Universo Lavorativo`, esclusi dal sito e da Git. La [gestione dei documenti professionali](content-system.md#documenti-professionali-fuori-dal-repository) descrive i generatori correnti e quelli precedenti.
