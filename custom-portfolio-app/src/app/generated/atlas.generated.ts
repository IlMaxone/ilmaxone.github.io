// File generato automaticamente da scripts/generate-experiences.mjs.
// Non modificarlo a mano: gestire cartelle e JSON in content/landing/.
import type { AtlasSection, PageHeadContent } from '../content/experience.model';

export const GENERATED_LANDING_HEAD: PageHeadContent = {
  "id": 0,
  "name": "landing",
  "label": "Landing Page",
  "headTitle": "Portfolio Orbitale · WebGL",
  "headDescriptionRow1": "Benvenuto nel mio",
  "headDescriptionRow2": "Universo Lavorativo",
  "sideTitle": "Abilità acquisite, passioni, competenze lavorative e progetti personali.",
  "sideDescription": "Ogni pianeta rappresenta una sezione del mio universo. Selezionane uno per esplorarla.",
  "route": "/",
  "routeLabel": "Benvenuto nel mio Universo Lavorativo"
};

export const GENERATED_ATLAS: AtlasSection[] = [
  {
    "id": "abilita-acquisite",
    "order": 10,
    "shortLabel": "Abilità Acquisite",
    "glyph": "A",
    "eyebrow": "Settore dell’universo",
    "title": "Abilità Acquisite",
    "period": "0 pianeti",
    "description": "Competenze maturate nel tempo, tra pratica, studio e curiosità.",
    "tags": [],
    "route": "/universo/abilita-acquisite",
    "routeLabel": "Microcosmo delle abilità acquisite",
    "slug": "abilita-acquisite",
    "folderName": "Abilità Acquisite",
    "head": {
      "id": 4,
      "name": "abilita-acquisite",
      "label": "Pagina Abilità Acquisite",
      "headTitle": "Microcosmo delle abilità acquisite",
      "headDescriptionRow1": "Qui trovi le mie",
      "headDescriptionRow2": "Abilità acquisite",
      "sideTitle": "Competenze maturate nel tempo, tra pratica, studio e curiosità.",
      "sideDescription": "Ogni pianeta racconta un'abilità acquisita. Selezionane uno per scoprire come si è sviluppata e dove la applico.",
      "route": "/universo/abilita-acquisite",
      "routeLabel": "Microcosmo delle abilità acquisite"
    },
    "items": []
  },
  {
    "id": "competenze-lavorative",
    "order": 20,
    "shortLabel": "Competenze Lavorative",
    "glyph": "C",
    "eyebrow": "Settore dell’universo",
    "title": "Competenze Lavorative",
    "period": "6 pianeti",
    "description": "Sei domini professionali maturati tra dati, infrastrutture, sicurezza, supporto e sviluppo software.",
    "tags": [
      "Data & Analytics",
      "Sistemi & Cloud",
      "DevOps & Observe",
      "Network & Security"
    ],
    "route": "/universo/competenze-lavorative",
    "routeLabel": "Microcosmo delle competenze lavorative",
    "slug": "competenze-lavorative",
    "folderName": "Competenze Lavorative",
    "head": {
      "id": 1,
      "name": "competenze-lavorative",
      "label": "Pagina Competenze Lavorative",
      "headTitle": "Microcosmo delle competenze lavorative",
      "headDescriptionRow1": "Qui trovi le mie",
      "headDescriptionRow2": "Competenze lavorative",
      "sideTitle": "Sei domini professionali maturati tra dati, infrastrutture, sicurezza, supporto e sviluppo software.",
      "sideDescription": "Ogni pianeta riunisce competenze strettamente collegate. Selezionane uno per esplorare capacità, tecnologie e progetti applicativi.",
      "route": "/universo/competenze-lavorative",
      "routeLabel": "Microcosmo delle competenze lavorative"
    },
    "items": [
      {
        "id": "01-data-engineering",
        "order": 1,
        "shortLabel": "Data & Analytics",
        "glyph": "D",
        "eyebrow": "Data Engineering e Analytics",
        "title": "Data Engineering e Analytics",
        "period": "Pipeline · SQL · BigQuery · Data Quality · BI",
        "description": "Progettazione e supporto di pipeline ETL/ELT, integrazioni MongoDB e BigQuery, modelli SQL, test e controlli di qualità, continuità operativa, analisi e visualizzazione dei dati.",
        "tags": [
          "Data Engineering",
          "ETL/ELT",
          "BigQuery",
          "SQL",
          "Data Quality",
          "Data Analysis",
          "Data Visualization",
          "MongoDB",
          "Node.js"
        ],
        "link": "",
        "detailsPath": "/approfondimenti/data-engineering-analytics"
      },
      {
        "id": "02-sistemistica-cloud",
        "order": 2,
        "shortLabel": "Sistemi & Cloud",
        "glyph": "S",
        "eyebrow": "Sistemistica, Cloud e Virtualizzazione",
        "title": "Sistemistica, Cloud e Virtualizzazione",
        "period": "Proxmox · Linux · Windows Server · Storage · Backup",
        "description": "Amministrazione di infrastrutture virtualizzate e cloud, server Linux e Windows ed endpoint macOS: provisioning, aggiornamenti, storage, database applicativi, backup e ripristino.",
        "tags": [
          "Proxmox VE",
          "Linux",
          "Windows Server",
          "Virtualization",
          "Storage",
          "Cloud",
          "macOS"
        ],
        "link": "",
        "detailsPath": "/approfondimenti/sistemistica-cloud-virtualizzazione"
      },
      {
        "id": "03-devops-observability",
        "order": 3,
        "shortLabel": "DevOps & Observe",
        "glyph": "D",
        "eyebrow": "DevOps, Automazione e Observability",
        "title": "DevOps, Automazione e Observability",
        "period": "Jenkins · Docker · Deployment · Monitoring · Logging",
        "description": "Automazione di build e deployment, runner Jenkins e ambienti Docker, monitoraggio e raccolta log Windows e macOS, con arricchimento delle identità GCPW e consultazione in Elastic e Kibana.",
        "tags": [
          "DevOps",
          "Jenkins",
          "Docker",
          "CI/CD",
          "PRTG",
          "ELK",
          "Grafana Loki",
          "Winlogbeat",
          "Filebeat",
          "GCPW"
        ],
        "link": "",
        "detailsPath": "/approfondimenti/devops-automazione-observability"
      },
      {
        "id": "04-networking-cybersecurity",
        "order": 4,
        "shortLabel": "Network & Security",
        "glyph": "N",
        "eyebrow": "Networking, Cybersecurity e Identity",
        "title": "Networking, Cybersecurity e Identity",
        "period": "Routing · VPN · Firewall · IAM · SSO · ISO 27001",
        "description": "Gestione di reti e VPN, collegamenti Google Cloud e MikroTik con BGP e IPsec, diagnostica PowerShell, protezione BitLocker e federazione delle identità.",
        "tags": [
          "Networking",
          "VPN",
          "Firewall",
          "Cybersecurity",
          "IAM",
          "SSO",
          "ISO 27001",
          "BGP",
          "IPsec",
          "PowerShell"
        ],
        "link": "",
        "detailsPath": "/approfondimenti/networking-cybersecurity-identity"
      },
      {
        "id": "05-digital-workplace-supporto",
        "order": 5,
        "shortLabel": "Workplace & Support",
        "glyph": "W",
        "eyebrow": "Digital Workplace e Supporto IT",
        "title": "Digital Workplace e Supporto IT",
        "period": "Google Workspace · Helpdesk · Utenti · Documentazione",
        "description": "Amministrazione e migrazione di Google Workspace, automazione GAM, supporto multilivello, gestione di utenti e YouTrack, procedure operative e materiale formativo per amministratori.",
        "tags": [
          "Google Workspace",
          "Helpdesk",
          "Incident management",
          "Provisioning",
          "Documentazione",
          "Workspace Security"
        ],
        "link": "",
        "detailsPath": "/approfondimenti/digital-workplace-supporto-it"
      },
      {
        "id": "06-software-soluzioni-clienti",
        "order": 6,
        "shortLabel": "Software & Solutions",
        "glyph": "S",
        "eyebrow": "Software Engineering e Soluzioni Clienti",
        "title": "Software Engineering e Soluzioni Clienti",
        "period": "Java · NestJS · Angular · API · Cloud · Progetti",
        "description": "Sviluppo e manutenzione di applicazioni, API, integrazioni dati e servizi cloud, con casi progettuali anonimi e distinzione tra soluzioni operative e schemi di riferimento.",
        "tags": [
          "Java",
          "NestJS",
          "Node.js",
          "REST API",
          "GCP",
          "BigQuery",
          "Angular",
          "Agile",
          "Data Integration"
        ],
        "link": "",
        "detailsPath": "/approfondimenti/software-engineering-soluzioni-clienti"
      }
    ]
  },
  {
    "id": "passioni",
    "order": 30,
    "shortLabel": "Passioni",
    "glyph": "P",
    "eyebrow": "Settore dell’universo",
    "title": "Passioni",
    "period": "4 pianeti",
    "description": "Interessi che alimentano curiosità, creatività e crescita personale.",
    "tags": [
      "Gaming",
      "Stampa 3D",
      "Minecraft Mod",
      "Java"
    ],
    "route": "/universo/passioni",
    "routeLabel": "Microcosmo delle passioni",
    "slug": "passioni",
    "folderName": "Passioni",
    "head": {
      "id": 3,
      "name": "passioni",
      "label": "Pagina Passioni",
      "headTitle": "Microcosmo delle passioni",
      "headDescriptionRow1": "Qui trovi le mie",
      "headDescriptionRow2": "Passioni",
      "sideTitle": "Interessi che alimentano curiosità, creatività e crescita personale.",
      "sideDescription": "Ogni pianeta racconta una passione. Selezionane uno per scoprire cosa mi coinvolge, cosa studio e cosa continua a ispirarmi.",
      "route": "/universo/passioni",
      "routeLabel": "Microcosmo delle passioni"
    },
    "items": [
      {
        "id": "01",
        "order": 1,
        "shortLabel": "Gaming",
        "glyph": "G",
        "eyebrow": "Gaming",
        "title": "Videogiochi, strategia e mondi interattivi",
        "period": "Passione di lunga data",
        "description": "Il gaming è una passione che coltivo da tempo. Mi attirano i mondi interattivi, le loro regole e le possibilità che offrono: esplorare, sperimentare strategie e osservare come tecnologia, narrazione e creatività si combinano per costruire esperienze coinvolgenti.",
        "tags": [
          "Gaming",
          "Esplorazione",
          "Strategia",
          "Creatività"
        ],
        "link": ""
      },
      {
        "id": "02",
        "order": 2,
        "shortLabel": "Stampa 3D",
        "glyph": "S",
        "eyebrow": "Stampa 3D",
        "title": "Dall'idea digitale all'oggetto reale",
        "period": "Una passione coltivata nel tempo",
        "description": "Per un periodo mi sono dedicato alla stampa 3D, sperimentando il percorso che porta da un modello digitale a un oggetto concreto. È un'attività che unisce curiosità tecnica e manualità, fatta di prove, calibrazione e miglioramenti successivi.",
        "tags": [
          "Stampa 3D",
          "Prototipazione",
          "Calibrazione",
          "Sperimentazione"
        ],
        "link": ""
      },
      {
        "id": "03",
        "order": 3,
        "shortLabel": "Minecraft Mod",
        "glyph": "M",
        "eyebrow": "Modding Minecraft",
        "title": "Un mondo Minecraft ampliato attraverso il codice",
        "period": "Sviluppo Java e game design",
        "description": "Ho sviluppato una mod per Minecraft Java che amplia la generazione del mondo con nuovi materiali e introduce strumenti, armature, dimensioni e numerose dinamiche di gioco. È stato un progetto in cui programmazione, creatività e passione per il gaming si sono incontrate; i dettagli arriveranno in un approfondimento dedicato.",
        "tags": [
          "Minecraft Java",
          "Modding",
          "Java",
          "Game Design"
        ],
        "link": ""
      },
      {
        "id": "04",
        "order": 4,
        "shortLabel": "Java",
        "glyph": "J",
        "eyebrow": "Percorso Java",
        "title": "Dalle basi di programmazione a Java SE e Spring",
        "period": "Corso intensivo di quattro mesi",
        "description": "Ho seguito un corso di quattro mesi dedicato a Java: dai concetti fondamentali della programmazione fino a Java SE, con una prima introduzione a Spring. Un percorso strutturato che ha consolidato le basi e mi ha dato nuovi strumenti per affrontare lo sviluppo software.",
        "tags": [
          "Java",
          "Java SE",
          "Spring",
          "Formazione"
        ],
        "link": ""
      }
    ]
  },
  {
    "id": "progetti-personali",
    "order": 40,
    "shortLabel": "Progetti Personali",
    "glyph": "P",
    "eyebrow": "Settore dell’universo",
    "title": "Progetti Personali",
    "period": "1 pianeta",
    "description": "Idee, esperimenti e prodotti personali trasformati in esperienze concrete.",
    "tags": [
      "Portfolio Planet"
    ],
    "route": "/universo/progetti-personali",
    "routeLabel": "Microcosmo dei progetti personali",
    "slug": "progetti-personali",
    "folderName": "Progetti Personali",
    "head": {
      "id": 2,
      "name": "progetti-personali",
      "label": "Pagina Progetti Personali",
      "headTitle": "Microcosmo dei progetti personali",
      "headDescriptionRow1": "Esplora i miei",
      "headDescriptionRow2": "Progetti personali",
      "sideTitle": "Idee, esperimenti e prodotti personali trasformati in esperienze concrete.",
      "sideDescription": "Ogni pianeta racconta un progetto personale. Selezionane uno per scoprirne obiettivi, scelte tecniche e percorso.",
      "route": "/universo/progetti-personali",
      "routeLabel": "Microcosmo dei progetti personali"
    },
    "items": [
      {
        "id": "01",
        "order": 1,
        "shortLabel": "Portfolio Planet",
        "glyph": "P",
        "eyebrow": "Portfolio",
        "title": "Il pilastro portante del Portfolio",
        "period": "Il punto di partenza",
        "description": "Questo progetto è partito dall'idea di costruire un portfolio originale che rispecchiasse al meglio la mia personalità. Sono sempre stato affascinato dall'universo, dai pianeti e dalle stelle: questo progetto riunisce gli elementi che cercavo per raccontare cosa so fare e cosa mi appassiona. Ho scelto di svilupparlo con il supporto di Codex per rendere più rapido il flusso di lavoro. Lo stack comprende Angular 21 per il frontend e WebGL per le animazioni 3D dei pianeti. Ho scelto tecnologie familiari per mantenere un maggiore controllo sul codice prodotto con l'Intelligenza Artificiale. Per maggiori informazioni sull'utilizzo dell'Intelligenza Artificiale, consulta la sezione Passioni.",
        "tags": [
          "Progetto personale",
          "AI",
          "Architettura",
          "Curiosità"
        ],
        "link": "https://github.com/IlMaxone/ilmaxone.github.io"
      }
    ]
  }
];
