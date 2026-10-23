# Documenti personali e professionali

- CV, report PDF, bozze e altri documenti professionali vanno sempre salvati fuori dal repository, in `C:/Users/maxim/OneDrive/Documenti/Personale/Universo Lavorativo/`.
- Usare la sottocartella `pdf/` per i PDF e `scripts/` per i generatori che contengono contenuti personali dei CV. Per la versione corrente, ispirata al modello del 2023, usare `scripts/export-cv-stile-2023.py` in quella cartella esterna. `scripts/export-cv-templates.py` conserva i modelli precedenti.
- I tre CV devono restare di una sola pagina, con competenze core e dettagli tecnici mirati al ruolo. Conservare separatamente i documenti originali forniti dall'utente; non presumere date finali di lavoro o qualifiche non documentate.
- Non salvare questi documenti in `output/`, negli asset pubblici o in altre directory versionate. Non aggiungerli a Git e non pubblicarli con il sito.
- Gli script generici del sito possono restare nel repository, ma devono esportare i documenti nella destinazione esterna. La variabile `UNIVERSO_LAVORATIVO_DIR` permette di configurare tale destinazione su un altro computer.
- Conservare l'anonimizzazione di clienti, terze persone, importi e dati riservati. I file personali non sono contenuti pubblici del portfolio.
- Per spostamenti o sostituzioni, verificare prima i percorsi e preservare i file esistenti. Non riscrivere la cronologia Git per rimuovere vecchi documenti senza una richiesta esplicita.
