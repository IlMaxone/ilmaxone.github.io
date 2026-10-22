// File generato automaticamente da scripts/generate-experiences.mjs.
// Non modificarlo a mano: modificare i JSON in content/approfondimenti/.
// Il template HTML condiviso si trova in src/app/pages/details/detail-page.html.
import type { DetailPageContent } from '../content/experience.model';

export const GENERATED_DETAILS: DetailPageContent[] = [
  {
    "id": "data-engineering-analytics",
    "slug": "data-engineering-analytics",
    "path": "/approfondimenti/data-engineering-analytics",
    "eyebrow": "Competenza lavorativa · Data Engineering e Analytics",
    "title": "Dalla sorgente al dato affidabile",
    "lead": "Progettare, trasformare e rendere consultabili dati eterogenei attraverso pipeline osservabili, modelli efficienti e controlli ripetibili.",
    "paragraphs": [
      {
        "text": "Il lavoro copre l'intero percorso del dato: acquisizione, trasformazione, modellazione, controllo qualitativo, pubblicazione e utilizzo analitico."
      },
      {
        "text": "Le soluzioni vengono progettate per essere manutenibili, verificabili e sostenibili in termini di prestazioni, costi e sicurezza degli accessi."
      }
    ],
    "sections": [
      {
        "title": "Pipeline e integrazione",
        "paragraphs": [
          {
            "text": "Progettazione, configurazione e manutenzione di pipeline di ingestion, ETL/ELT e Data Integration, definendo sorgenti, trasformazioni e destinazioni."
          },
          {
            "text": "Utilizzo operativo di CDAP, Cloud Dataflow e Apache Spark per integrare sistemi eterogenei, riallineare flussi e gestire elaborazioni schedulate."
          },
          {
            "text": "Integrazione mediante API REST, gestione di job batch e trattamento di flussi real-time basati su Kafka e architetture ibride cloud."
          },
          {
            "text": "Troubleshooting delle pipeline attraverso log, dipendenze, credenziali e controlli sull'effettivo arrivo dei dati."
          },
          {
            "text": "Migrazione e riconfigurazione delle credenziali API e delle connessioni sicure tra sistemi CRM esterni e ambienti di Analytics."
          }
        ]
      },
      {
        "title": "SQL, BigQuery e database",
        "paragraphs": [
          {
            "text": "Sviluppo di query SQL per estrazione, trasformazione, sincronizzazione e controllo dei dati, incluse funzioni BigQuery come UNNEST e SPLIT."
          },
          {
            "text": "Gestione di BigQuery, Data Warehouse, Cloud Storage, database relazionali e documentali come MySQL e MongoDB."
          },
          {
            "text": "Progettazione e adeguamento degli schemi, gestione di array e tipi strutturati, compatibilità dei driver e dismissione di strutture legacy."
          },
          {
            "text": "Ottimizzazione delle query, delle scansioni e del partizionamento per ridurre tempi di esecuzione e costi."
          }
        ]
      },
      {
        "title": "Data quality, governance e continuità",
        "paragraphs": [
          {
            "text": "Controllo di consistenza, copertura e integrità dei dataset, con individuazione di duplicati, valori inattesi e disallineamenti temporali."
          },
          {
            "text": "Normalizzazione dei dati storici, bonifica delle tabelle temporanee e verifica di esportazioni, riconciliazioni e bilanciamenti."
          },
          {
            "text": "Test di carico e validazione dell'integrità dei dati dopo l'aggiornamento delle viste logiche su BigQuery."
          },
          {
            "text": "Bonifica e archiviazione di dataset e tabelle temporanee utilizzati nelle sessioni di test e UAT."
          },
          {
            "text": "Gestione di policy di conservazione, log di audit, backup, verifiche di recuperabilità e procedure di disaster recovery."
          },
          {
            "text": "Documentazione delle anomalie, delle correzioni e dei criteri di accettazione per garantire tracciabilità."
          }
        ]
      },
      {
        "title": "Business Intelligence e reporting",
        "paragraphs": [
          {
            "text": "Creazione e manutenzione di report e KPI con Looker Studio, incluse aggregazioni periodiche e filtri dinamici."
          },
          {
            "text": "Verifica della copertura dei dati e delle discrepanze tra sorgenti, strutture organizzative e viste analitiche."
          },
          {
            "text": "Profilazione dei contenuti, coni di visibilità e segregazione delle informazioni secondo ruolo, area e responsabilità."
          },
          {
            "text": "Condivisione controllata dei report e manutenzione evolutiva delle viste al cambiare di requisiti e sorgenti."
          }
        ]
      },
      {
        "title": "Esecuzione e controllo operativo",
        "paragraphs": [
          {
            "text": "Schedulazione e verifica delle elaborazioni periodiche, delle code e dei caricamenti batch."
          },
          {
            "text": "Configurazione di alert per caricamenti mancanti, ritardi o disallineamenti e analisi degli errori di runtime."
          },
          {
            "text": "Manutenzione ordinaria delle piattaforme dati e verifica continuativa del corretto funzionamento dei flussi."
          }
        ]
      },
      {
        "title": "Continuità operativa di una piattaforma dati",
        "paragraphs": [
          {
            "text": "Supporto operativo alle pipeline CDAP di un'organizzazione attiva nei servizi territoriali, con analisi delle esecuzioni e gestione delle anomalie."
          },
          {
            "text": "Esecuzione e verifica di backup remoti per proteggere configurazioni e dati necessari alla continuità del servizio."
          },
          {
            "text": "Gestione delle attività di ripristino e controllo del corretto ritorno in esercizio della piattaforma."
          }
        ]
      },
      {
        "title": "Formazione tecnica su Looker Studio e Data Visualization",
        "paragraphs": [
          {
            "text": "Preparazione e svolgimento di lezioni rivolte a studenti di un percorso ITS sui principi della Data Analysis, della Data Visualization e sull'utilizzo operativo di Looker Studio."
          },
          {
            "text": "Presentazione delle sorgenti dati, dell'impatto delle scelte di modellazione sulle prestazioni e dell'utilizzo di tabelle, tabelle pivot, condivisione e versioning dei report."
          },
          {
            "text": "Spiegazione pratica di metriche, dimensioni, KPI, scorecard, campi calcolati, query personalizzate, filtri, formule CASE e funzioni dedicate alle date."
          },
          {
            "text": "Costruzione di grafici a barre e a torta, mappe, cruscotti e visualizzazioni interattive con drill-down, cross-filtering, calcoli cumulativi e parametri."
          },
          {
            "text": "Confronto tra data blending in Looker Studio e join eseguite in BigQuery, con esempi di pubblicazione e incorporamento delle dashboard in Google Sites."
          },
          {
            "text": "Adattamento dei contenuti al livello della classe e gestione del confronto tecnico durante le attività formative."
          }
        ]
      },
      {
        "title": "Caso tecnico: integrazione MongoDB e BigQuery",
        "paragraphs": [
          {
            "text": "Analisi di una pipeline ETL in Node.js per trasferire dati operativi da MongoDB a BigQuery, con mapping guidato dagli schemi, rinomina dei campi e conversione dei tipi."
          },
          {
            "text": "Trattamento di ObjectId, date, valori numerici, record annidati e array, con filtraggio dei campi non previsti dallo schema di destinazione."
          },
          {
            "text": "Il caso documentato comprende denormalizzazione dei dati per analisi di progetto, associazioni temporali, caricamenti suddivisi in blocchi e controlli di riconciliazione."
          },
          {
            "text": "La revisione del codice distingue i flussi di caricamento attivi dalle varianti storiche o di test e individua i punti da verificare prima di un rilascio."
          }
        ]
      },
      {
        "title": "Schema progettuale: elaborazione di flussi NeTEx",
        "paragraphs": [
          {
            "text": "Schema progettuale di riferimento per elaborare file XML NeTEx voluminosi tramite parser SAX e suddividere il flusso in parti più gestibili."
          },
          {
            "text": "Il flusso rappresentato prevede passaggi intermedi in JSON e CSV e un successivo import SQL in Hive, separando acquisizione, trasformazione e caricamento."
          },
          {
            "text": "Il materiale documenta una soluzione progettuale; la presenza dello schema non viene presentata come prova di una specifica implementazione in produzione."
          }
        ]
      }
    ],
    "tags": [
      "Data Engineering",
      "ETL/ELT",
      "BigQuery",
      "SQL",
      "MongoDB",
      "Node.js",
      "Data Quality",
      "Looker Studio",
      "Kafka",
      "Apache Spark",
      "Data Analysis",
      "Data Visualization",
      "Technical Training"
    ],
    "sectionSlug": "competenze-lavorative",
    "sectionLabel": "Competenze Lavorative",
    "backRoute": "/universo/competenze-lavorative"
  },
  {
    "id": "sistemistica-cloud-virtualizzazione",
    "slug": "sistemistica-cloud-virtualizzazione",
    "path": "/approfondimenti/sistemistica-cloud-virtualizzazione",
    "eyebrow": "Competenza lavorativa · Sistemi e infrastrutture",
    "title": "Infrastrutture affidabili e manutenibili",
    "lead": "Amministrare ambienti virtualizzati, server, storage e servizi cloud lungo l'intero ciclo di vita operativo.",
    "paragraphs": [
      {
        "text": "La sistemistica collega provisioning, aggiornamento, monitoraggio e ripristino per mantenere disponibili servizi e ambienti di lavoro."
      },
      {
        "text": "Il perimetro comprende infrastrutture on-premise, virtualizzate e cloud, con attenzione alla continuità e alla capacità di diagnosi."
      }
    ],
    "sections": [
      {
        "title": "Virtualizzazione e cloud",
        "paragraphs": [
          {
            "text": "Configurazione e amministrazione di ambienti Proxmox VE, VMware ESXi e XenServer."
          },
          {
            "text": "Provisioning e migrazione di macchine virtuali, incluse istanze Ubuntu su Proxmox, preparazione delle risorse e verifica della coerenza tra host e storage."
          },
          {
            "text": "Supporto operativo su Google Cloud Platform e ambienti ibridi che integrano servizi Google Cloud e AWS."
          },
          {
            "text": "Monitoraggio di CPU, memoria, spazio disco e stato operativo delle risorse virtualizzate."
          }
        ]
      },
      {
        "title": "Sistemi operativi e manutenzione",
        "paragraphs": [
          {
            "text": "Installazione e manutenzione di server Linux e amministrazione di Windows Server."
          },
          {
            "text": "Aggiornamento di sistemi Ubuntu, incluso il passaggio da Ubuntu 18 a 24 LTS, installazione delle patch di sicurezza e verifica dell'esito degli interventi."
          },
          {
            "text": "Manutenzione ordinaria, ottimizzazione dello spazio disco e gestione degli ambienti di sviluppo aziendali."
          },
          {
            "text": "Manutenzione ordinaria dei database applicativi a supporto della continuità dei servizi."
          },
          {
            "text": "Installazione e verifica di agenti Filebeat su endpoint macOS, con gestione del servizio launchd, dei permessi di accesso ai log e dello stato operativo dell'agente."
          }
        ]
      },
      {
        "title": "Storage, backup e ripristino",
        "paragraphs": [
          {
            "text": "Amministrazione di NAS, share e storage virtualizzato con controllo di capacità, disponibilità e accessibilità."
          },
          {
            "text": "Pianificazione e verifica dei backup, gestione delle procedure di ripristino e applicazione di scenari di disaster recovery."
          },
          {
            "text": "Controllo periodico dell'integrità dei dati salvati e dell'effettiva recuperabilità dei servizi."
          }
        ]
      },
      {
        "title": "Servizi infrastrutturali",
        "paragraphs": [
          {
            "text": "Analisi dei requisiti necessari al rilascio di nuovi servizi e predisposizione dei relativi ambienti."
          },
          {
            "text": "Installazione e gestione di piattaforme interne come BookStack, Nexus, Open edX e Moodle."
          },
          {
            "text": "Gestione dei server di stampa, delle stampanti di rete e dei test d'integrazione tra sedi e servizi remoti."
          }
        ]
      }
    ],
    "tags": [
      "Proxmox VE",
      "VMware ESXi",
      "Linux",
      "Windows Server",
      "macOS",
      "GCP",
      "AWS",
      "NAS",
      "Backup"
    ],
    "sectionSlug": "competenze-lavorative",
    "sectionLabel": "Competenze Lavorative",
    "backRoute": "/universo/competenze-lavorative"
  },
  {
    "id": "devops-automazione-observability",
    "slug": "devops-automazione-observability",
    "path": "/approfondimenti/devops-automazione-observability",
    "eyebrow": "Competenza lavorativa · DevOps e Observability",
    "title": "Automazione e controllo operativo",
    "lead": "Rendere build, deployment e gestione degli ambienti ripetibili, osservabili e più semplici da diagnosticare.",
    "paragraphs": [
      {
        "text": "Automazione e osservabilità riducono gli interventi manuali e permettono di individuare con rapidità il componente responsabile di un'anomalia."
      },
      {
        "text": "La competenza unisce pipeline CI/CD, container, monitoraggio, logging centralizzato e gestione degli alert."
      }
    ],
    "sections": [
      {
        "title": "CI/CD e automazione",
        "paragraphs": [
          {
            "text": "Configurazione e ottimizzazione di Jenkins e dei relativi runner per build, test e rilascio."
          },
          {
            "text": "Gestione delle pipeline CI/CD e verifica della corretta esecuzione delle diverse fasi."
          },
          {
            "text": "Aggiornamento degli ambienti di esecuzione mantenendo compatibilità con job, runtime e dipendenze, incluso l'aggiornamento dei runner Jenkins a Node.js 24."
          },
          {
            "text": "Ottimizzazione dello spazio disco dei runner e gestione delle variabili Docker necessarie all'esecuzione dei job."
          },
          {
            "text": "Automazione delle attività schedulate per rendere i processi ripetibili e ridurre gli interventi manuali."
          }
        ]
      },
      {
        "title": "Container e deployment",
        "paragraphs": [
          {
            "text": "Amministrazione di ambienti Docker e configurazione delle variabili necessarie ai diversi contesti applicativi."
          },
          {
            "text": "Provisioning con Coolify e configurazione di Traefik come reverse proxy per l'esposizione controllata dei servizi."
          },
          {
            "text": "Deployment e collaudo di stack applicativi, con verifica dello stato dei container e delle dipendenze."
          },
          {
            "text": "Analisi degli errori di deployment e runtime tramite configurazioni, log e stato effettivo dei componenti."
          }
        ]
      },
      {
        "title": "Monitoraggio e alert",
        "paragraphs": [
          {
            "text": "Utilizzo di PRTG per monitorare infrastrutture, macchine virtuali, servizi di rete e piattaforme dati."
          },
          {
            "text": "Controllo dello stato dei container, delle pipeline e delle elaborazioni batch."
          },
          {
            "text": "Configurazione di alert e notifiche per rendere tempestive le segnalazioni operative."
          }
        ]
      },
      {
        "title": "Logging e diagnosi",
        "paragraphs": [
          {
            "text": "Deployment e amministrazione dello stack ELK per aggregare e consultare log di sistemi e applicazioni."
          },
          {
            "text": "Configurazione e hardening di Winlogbeat, Filebeat, Grafana Loki e Promtail."
          },
          {
            "text": "Configurazione di Winlogbeat su Windows con attenzione alla cifratura e alla trasmissione sicura dei log di sistema."
          },
          {
            "text": "Setup di Grafana Loki su piattaforma Proxmox per aggregare e analizzare i log."
          },
          {
            "text": "Diagnosi attraverso la correlazione di messaggi, orari, componenti e attività eseguite."
          },
          {
            "text": "Gestione della conservazione dei log e utilizzo operativo di componenti SIEM a supporto della sicurezza."
          }
        ]
      },
      {
        "title": "Audit Windows e identità Google Workspace",
        "paragraphs": [
          {
            "text": "Arricchimento dei log Windows raccolti da Winlogbeat con il contesto delle identità Google Workspace tramite Google Credential Provider for Windows, GCPW."
          },
          {
            "text": "Associazione tra SID Windows e identità Workspace mediante mappe aggiornate automaticamente, con task pianificati all'avvio, al login e a intervalli definiti."
          },
          {
            "text": "Pipeline di ingest Elasticsearch e viste Kibana che aiutano a distinguere il contesto dell'utente interattivo dall'account amministrativo o esecutore registrato da Windows."
          },
          {
            "text": "Conservazione dei campi originali degli eventi e aggiunta di campi di contesto separati. Su postazioni multiutente il contesto console resta un arricchimento interpretativo da verificare insieme all'evento originale."
          },
          {
            "text": "Script PowerShell per verifica, aggiornamento e distribuzione delle configurazioni, accompagnati da test sintetici e controlli sul corretto arrivo degli eventi."
          }
        ]
      },
      {
        "title": "Raccolta log macOS e continuità della raccolta",
        "paragraphs": [
          {
            "text": "Configurazione di Filebeat su macOS come servizio launchd, con input Unified Logs e filestream per raccogliere eventi di autenticazione, elevazione dei privilegi e installazione software."
          },
          {
            "text": "Utilizzo di una coda su disco per mantenere gli eventi già acquisiti durante le interruzioni di connettività e riprendere l'invio a Elasticsearch quando il collegamento torna disponibile, nei limiti della capacità della coda e della disponibilità dei log."
          },
          {
            "text": "Hardening dei permessi di file e configurazioni, verifica dello stato del servizio e controllo dei permessi di accesso ai log del sistema."
          },
          {
            "text": "Generazione di eventi sintetici, query Kibana e pipeline di ingest per verificare acquisizione, classificazione e consultazione. Il perimetro riguarda log e audit operativo e non viene presentato come copertura EDR completa."
          }
        ]
      }
    ],
    "tags": [
      "Jenkins",
      "Docker",
      "Coolify",
      "Traefik",
      "PRTG",
      "ELK",
      "Grafana Loki",
      "SIEM",
      "Winlogbeat",
      "Filebeat",
      "macOS",
      "GCPW",
      "Elasticsearch",
      "Kibana",
      "PowerShell"
    ],
    "sectionSlug": "competenze-lavorative",
    "sectionLabel": "Competenze Lavorative",
    "backRoute": "/universo/competenze-lavorative"
  },
  {
    "id": "networking-cybersecurity-identity",
    "slug": "networking-cybersecurity-identity",
    "path": "/approfondimenti/networking-cybersecurity-identity",
    "eyebrow": "Competenza lavorativa · Networking e sicurezza",
    "title": "Connettività, identità e sicurezza",
    "lead": "Collegare utenti, sedi e servizi proteggendo accessi, comunicazioni e dati secondo responsabilità verificabili.",
    "paragraphs": [
      {
        "text": "La gestione della rete viene affrontata insieme alla sicurezza e all'identità, perché ogni collegamento deve essere disponibile ma anche autorizzato e tracciabile."
      },
      {
        "text": "Le attività comprendono apparati, routing, accesso remoto, cifratura, federazione delle identità e controlli di conformità."
      }
    ],
    "sections": [
      {
        "title": "Reti, apparati e routing",
        "paragraphs": [
          {
            "text": "Configurazione di RouterOS e amministrazione di router e firewall MikroTik distribuiti tra sedi differenti."
          },
          {
            "text": "Gestione degli indirizzi IP, delle tabelle di routing, delle sottoreti e delle regole di firewalling."
          },
          {
            "text": "Verifica di DNS, sottodomini, connessioni punto-punto e accesso alle risorse di rete."
          },
          {
            "text": "Troubleshooting tramite ping, confronto delle configurazioni e isolamento del segmento interessato."
          }
        ]
      },
      {
        "title": "VPN e accesso remoto",
        "paragraphs": [
          {
            "text": "Configurazione e test di VPN Site-to-Site per collegare reti e servizi."
          },
          {
            "text": "Provisioning e troubleshooting di accessi SSTP, L2TP e GlobalProtect."
          },
          {
            "text": "Gestione di tunneling sicuri e IP whitelisting per integrazioni tra piattaforme e ambienti cloud."
          }
        ]
      },
      {
        "title": "Cybersecurity e crittografia",
        "paragraphs": [
          {
            "text": "Hardening di server, agenti e componenti infrastrutturali per ridurre superfici esposte e configurazioni deboli."
          },
          {
            "text": "Installazione e rinnovo di certificati SSL wildcard e gestione del loro ciclo di vita."
          },
          {
            "text": "Applicazione delle policy BitLocker e gestione sicura delle chiavi di ripristino e delle credenziali tramite KeePass."
          },
          {
            "text": "Definizione delle policy per ambienti Dual Boot e stesura delle procedure per il salvataggio delle chiavi di ripristino BitLocker."
          },
          {
            "text": "Procedure per la copia offline delle chiavi BitLocker su supporto USB dedicato, verifica della corrispondenza con dispositivo e volume e controllo dell'eventuale backup centralizzato in Entra ID, Active Directory o MDM."
          },
          {
            "text": "Gestione della custodia del supporto, della perdita e della rotazione delle chiavi, registrando nei ticket l'esito delle attività senza riportare il segreto di ripristino."
          },
          {
            "text": "Analisi delle anomalie di accesso e gestione delle procedure di ripristino degli accessi SSH."
          }
        ]
      },
      {
        "title": "Identity and Access Management",
        "paragraphs": [
          {
            "text": "Federazione delle identità tra Google Workspace e Microsoft Entra ID e configurazione di sistemi Single Sign-On."
          },
          {
            "text": "Configurazione e test di OpenID Connect tra Proxmox VE e Google Cloud Platform."
          },
          {
            "text": "Provisioning e deprovisioning degli utenti, gestione di gruppi, ruoli e permessi su GitLab, YouTrack e servizi interni."
          },
          {
            "text": "Revisione delle autorizzazioni, segregazione degli accessi e bonifica periodica delle utenze inattive."
          }
        ]
      },
      {
        "title": "Audit e conformità",
        "paragraphs": [
          {
            "text": "Applicazione operativa dei requisiti ISO 27001 nelle attività quotidiane sull'infrastruttura IT."
          },
          {
            "text": "Collegamento tra controlli tecnici, responsabilità operative, log ed evidenze necessarie agli audit."
          },
          {
            "text": "Documentazione delle configurazioni di sicurezza, delle procedure di backup e dei criteri di accesso."
          }
        ]
      },
      {
        "title": "Collegamenti ibridi tra Google Cloud e MikroTik",
        "paragraphs": [
          {
            "text": "Configurazione e diagnosi documentata di collegamenti tra reti on-premise e VPC Google Cloud mediante Cloud VPN, Cloud Router e apparati MikroTik."
          },
          {
            "text": "Gestione di sessioni BGP e dei parametri IPsec e IKE, con controlli su tunnel, rotte annunciate e raggiungibilità delle reti coinvolte."
          },
          {
            "text": "Analisi di problemi NAT traversal, regole firewall e negoziazione delle fasi IPsec, distinguendo lo stato del tunnel dal corretto transito del traffico applicativo."
          },
          {
            "text": "Backup delle configurazioni prima degli interventi e verifiche tramite RouterOS e strumenti Google Cloud, descrivendo il metodo senza pubblicare indirizzi, chiavi, nomi di progetto o topologie interne."
          }
        ]
      },
      {
        "title": "Diagnostica VPN e raccolta automatica delle evidenze",
        "paragraphs": [
          {
            "text": "Diagnosi del caso VPN connessa ma risorse interne irraggiungibili tramite confronto di DNS, suffissi, rotte, gateway, metriche delle interfacce e possibili sovrapposizioni tra sottoreti."
          },
          {
            "text": "Script PowerShell per acquisire stato della rete, profili VPN, risoluzione dei nomi, test di connettività e log Windows pertinenti, producendo un pacchetto diagnostico per l'analisi e l'escalation."
          },
          {
            "text": "Utilizzo di Test-NetConnection, Get-NetRoute, Get-NetIPInterface e dei log RasClient per isolare il punto di interruzione e distinguere problemi di autenticazione, tunnel e servizio di destinazione."
          },
          {
            "text": "Gestione dei casi di instabilità e riconnessione con verifiche su rete locale, client concorrenti, MTU e policy di accesso, applicando correzioni proporzionate alle evidenze raccolte."
          }
        ]
      }
    ],
    "tags": [
      "MikroTik",
      "RouterOS",
      "VPN",
      "Firewall",
      "SSL",
      "IAM",
      "SSO",
      "Entra ID",
      "ISO 27001",
      "Cloud VPN",
      "Cloud Router",
      "BGP",
      "IPsec",
      "PowerShell",
      "BitLocker"
    ],
    "sectionSlug": "competenze-lavorative",
    "sectionLabel": "Competenze Lavorative",
    "backRoute": "/universo/competenze-lavorative"
  },
  {
    "id": "digital-workplace-supporto-it",
    "slug": "digital-workplace-supporto-it",
    "path": "/approfondimenti/digital-workplace-supporto-it",
    "eyebrow": "Competenza lavorativa · Digital Workplace e IT Support",
    "title": "Servizi digitali e supporto agli utenti",
    "lead": "Amministrare gli strumenti di collaborazione e accompagnare persone e team dalla richiesta iniziale al ripristino del servizio.",
    "paragraphs": [
      {
        "text": "Il Digital Workplace combina amministrazione delle piattaforme, gestione del ciclo di vita degli utenti e supporto tecnico quotidiano."
      },
      {
        "text": "La documentazione rende configurazioni e procedure ripetibili, riducendo dipendenze individuali e tempi di risoluzione."
      }
    ],
    "sections": [
      {
        "title": "Google Workspace",
        "paragraphs": [
          {
            "text": "Amministrazione dell'ambiente tramite Google Admin Console e automazione delle operazioni ripetitive con GAM."
          },
          {
            "text": "Gestione di utenti, gruppi, permessi, contenuti e condivisioni su Google Drive."
          },
          {
            "text": "Automazione del provisioning e supporto agli utenti sui servizi Google."
          },
          {
            "text": "Utilizzo della CLI GAM per automatizzare provisioning, gestione dei permessi e attività di migrazione su Google Drive."
          }
        ]
      },
      {
        "title": "Migrazioni e federazione",
        "paragraphs": [
          {
            "text": "Pianificazione ed esecuzione di migrazioni tenant-to-tenant con GWMME e CloudM."
          },
          {
            "text": "Trasferimento di account, dati e configurazioni preservando proprietà e autorizzazioni dove previsto."
          },
          {
            "text": "Integrazione con Microsoft Entra ID e federazione bidirezionale tra Google Workspace e Microsoft 365."
          }
        ]
      },
      {
        "title": "Helpdesk e incident management",
        "paragraphs": [
          {
            "text": "Gestione di ticket Helpdesk di livello 1, 2 e 3, dalla raccolta delle evidenze alla verifica finale con l'utente."
          },
          {
            "text": "Diagnosi, risoluzione ed escalation degli incidenti applicativi, sistemistici e di connettività."
          },
          {
            "text": "Supporto su VPN, piattaforme dati e BI, stampanti locali o remote e strumenti di collaborazione."
          },
          {
            "text": "Triage delle segnalazioni VPN distinguendo problemi di rete locale, DNS, routing, autenticazione e servizio applicativo."
          },
          {
            "text": "Raccolta automatizzata delle evidenze con PowerShell e preparazione di un pacchetto diagnostico per l'escalation, selezionando i dati necessari e oscurando gli identificativi non pertinenti."
          }
        ]
      },
      {
        "title": "Utenti e postazioni",
        "paragraphs": [
          {
            "text": "Provisioning dei nuovi collaboratori e verifica della disponibilità di account, strumenti e autorizzazioni."
          },
          {
            "text": "Gestione delle richieste di accesso, degli account tecnici e delle attività connesse ai cambi di ruolo o all'uscita dall'organizzazione."
          },
          {
            "text": "Amministrazione delle licenze e dei ruoli utente su YouTrack e configurazione delle board a supporto dei flussi di lavoro."
          },
          {
            "text": "Manutenzione ordinaria delle postazioni e degli ambienti di sviluppo aziendali."
          }
        ]
      },
      {
        "title": "Documentazione e procedure",
        "paragraphs": [
          {
            "text": "Redazione di documentazione per integrazioni, pipeline, sistemi, architetture e servizi interni."
          },
          {
            "text": "Stesura di linee guida operative per l'utilizzo di YouTrack e per la presa in carico dei ticket Helpdesk."
          },
          {
            "text": "Creazione di runbook per backup, recovery, sicurezza, manutenzione e gestione delle chiavi di cifratura."
          },
          {
            "text": "Registrazione di prerequisiti, passaggi, risultati attesi e criteri di verifica per rendere le attività ripetibili."
          },
          {
            "text": "Produzione di linee guida operative e documentazione coerente con i requisiti ISO 27001."
          }
        ]
      },
      {
        "title": "Materiale formativo per amministratori Google Workspace",
        "paragraphs": [
          {
            "text": "Il materiale formativo disponibile organizza l'amministrazione Workspace in un percorso guidato con esercitazioni, checklist e casi ricorrenti. La disponibilità del materiale non viene equiparata all'erogazione di un corso."
          },
          {
            "text": "I contenuti approfondiscono unità organizzative, gruppi, onboarding, sospensione e dismissione degli account, trasferimento della proprietà dei file e governo dei Drive condivisi."
          },
          {
            "text": "La parte di sicurezza tratta autenticazione a più fattori, ruoli con privilegi minimi, autorizzazioni OAuth, controlli sulle applicazioni, classificazione dei dati e Data Loss Prevention."
          },
          {
            "text": "Sono inclusi temi di amministrazione della posta come SPF, DKIM e DMARC, consultazione dei log amministrativi e Drive, oltre a conservazione e ricerca tramite Vault."
          },
          {
            "text": "Il metodo didattico prevede un ambito pilota, verifica degli effetti delle policy, possibilità di rollback e uso dei log per controllare le modifiche, con casi pratici di recupero account e gestione delle condivisioni."
          }
        ]
      }
    ],
    "tags": [
      "Google Workspace",
      "GAM",
      "GWMME",
      "CloudM",
      "Helpdesk",
      "Provisioning",
      "Documentazione",
      "Workspace Security",
      "Materiale formativo"
    ],
    "sectionSlug": "competenze-lavorative",
    "sectionLabel": "Competenze Lavorative",
    "backRoute": "/universo/competenze-lavorative"
  },
  {
    "id": "software-engineering-soluzioni-clienti",
    "slug": "software-engineering-soluzioni-clienti",
    "path": "/approfondimenti/software-engineering-soluzioni-clienti",
    "eyebrow": "Competenza lavorativa · Software Engineering",
    "title": "Applicazioni e soluzioni costruite sui bisogni reali",
    "lead": "Sviluppare applicazioni, API e integrazioni traducendo necessità operative in soluzioni manutenibili e misurabili.",
    "paragraphs": [
      {
        "text": "Lo sviluppo software comprende disegno, realizzazione, integrazione e manutenzione evolutiva di applicativi web e strumenti aziendali."
      },
      {
        "text": "I casi progettuali sono presentati in forma anonima: descrivono il settore, il problema affrontato e il contributo tecnico senza identificare il cliente."
      }
    ],
    "sections": [
      {
        "title": "Sviluppo web e API",
        "paragraphs": [
          {
            "text": "Sviluppo di applicazioni web basate su pattern MVC con Java e JavaScript."
          },
          {
            "text": "Progettazione e implementazione di API REST con Java e Node.js."
          },
          {
            "text": "Utilizzo operativo di Spring Boot, Vue 3, Angular e Apps Script per applicazioni e automazioni aziendali."
          },
          {
            "text": "Integrazione con database MySQL e MongoDB e manutenzione di applicativi per la gestione dei processi interni."
          }
        ]
      },
      {
        "title": "Integrazione e metodo di lavoro",
        "paragraphs": [
          {
            "text": "Integrazione tra applicazioni, API, database e piattaforme dati, con gestione degli ambienti di sviluppo e delle dipendenze infrastrutturali."
          },
          {
            "text": "Analisi delle esigenze, realizzazione incrementale e manutenzione delle soluzioni secondo pratiche Agile e Scrum."
          },
          {
            "text": "Gestione delle anomalie tramite ticketing, collaborazione con il team e verifica del livello di servizio concordato."
          },
          {
            "text": "Analisi di integrazioni ETL in Node.js tra MongoDB e BigQuery, con mapping degli schemi, conversione dei tipi e trasformazioni dei dati operativi per l'utilizzo analitico."
          }
        ]
      },
      {
        "title": "Assistente conversazionale con piattaforma dati dedicata",
        "paragraphs": [
          {
            "text": "Sviluppo di un chatbot interattivo capace di rispondere a domande circoscritte al dominio informativo del cliente e di contestualizzare le risposte sui dati prodotti dall'utente."
          },
          {
            "text": "Progettazione del flusso che, alla registrazione, predispone risorse Google Cloud isolate per ciascun utente: tabella BigQuery, bucket dedicato e identità tecnica con autorizzazioni mirate."
          },
          {
            "text": "Integrazione da backend TypeScript e NestJS tramite librerie Google Cloud per autenticare le chiamate, invocare Cloud Run Functions e scrivere in BigQuery dati già strutturati per le successive analisi."
          },
          {
            "text": "Gestione dell'accesso mediante Service Account, IAM e secret management, separando le credenziali dalla logica applicativa e preparando la protezione degli ambienti di produzione."
          },
          {
            "text": "Realizzazione del frontend in Angular e integrazione tra interfaccia, backend e servizi cloud per offrire una conversazione semplice, pertinente e coerente con il perimetro previsto."
          }
        ]
      },
      {
        "title": "Piattaforma CRM e analytics per il settore life sciences",
        "paragraphs": [
          {
            "text": "Progettazione di una piattaforma cloud per centralizzare dati CRM e rendere disponibili reporting e KPI manageriali, organizzativi e contrattuali."
          },
          {
            "text": "Realizzazione di pipeline schedulabili con Apache Spark, trasformazioni su BigQuery e reportistica in Looker Studio."
          },
          {
            "text": "Applicazione di VPN, IP whitelisting, IAM e coni di visibilità need-to-know per proteggere dati ad alto valore e mantenere auditabilità."
          }
        ]
      },
      {
        "title": "Piattaforma IoT real-time per dispositivi connessi",
        "paragraphs": [
          {
            "text": "Partecipazione a una data platform ibrida AWS e Google Cloud per raccogliere flussi ad alta frequenza prodotti da dispositivi connessi."
          },
          {
            "text": "Gestione dello streaming tramite Kafka su Amazon MSK, tunneling sicuro e consolidamento dei dati in BigQuery."
          },
          {
            "text": "Preparazione dei dati per analisi, KPI e modelli di explainable AI, con pubblicazione di notifiche personalizzate verso gli utenti finali."
          }
        ]
      },
      {
        "title": "Piattaforma dati per mobilità e servizi pubblici",
        "paragraphs": [
          {
            "text": "Sviluppo di una piattaforma per acquisire e riprocessare grandi volumi di dati provenienti da operatori di mobilità tramite API REST."
          },
          {
            "text": "Gestione di formati standard come GTFS, GBFS, NeTEx e SIRI e adattamento dei dati alle esigenze dei sistemi destinatari."
          },
          {
            "text": "Utilizzo di un orchestratore per gestire pipeline personalizzate con frequenza oraria, giornaliera o settimanale."
          },
          {
            "text": "Il materiale progettuale di riferimento include uno schema di parsing SAX per file NeTEx XML voluminosi, suddivisione in JSON e CSV e successivo import in Hive. Lo schema descrive una soluzione progettuale e non attesta, da solo, una messa in produzione."
          }
        ]
      },
      {
        "title": "Piattaforma unificata per dati cliente e KPI retail",
        "paragraphs": [
          {
            "text": "Realizzazione di una piattaforma cloud per unificare dati provenienti da più sorgenti applicative e renderli disponibili per analisi e reporting."
          },
          {
            "text": "Ingestion giornaliera con Cloud Dataflow, BigQuery, notebook e strumenti ETL, con possibilità di esportazione tramite API."
          },
          {
            "text": "Produzione di KPI incorporabili nei pannelli operativi per analizzare campagne, ritorno degli utenti e andamento della fatturazione."
          }
        ]
      }
    ],
    "tags": [
      "Java",
      "NestJS",
      "Node.js",
      "REST API",
      "Google Cloud",
      "BigQuery",
      "Cloud Run Functions",
      "IAM",
      "Angular",
      "Spring Boot",
      "Vue 3",
      "MySQL",
      "MongoDB",
      "Agile"
    ],
    "sectionSlug": "competenze-lavorative",
    "sectionLabel": "Competenze Lavorative",
    "backRoute": "/universo/competenze-lavorative"
  }
];
