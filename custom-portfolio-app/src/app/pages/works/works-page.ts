import { Component } from '@angular/core';
import { InfoBlockComponent } from '../../shared/info-block/info-block';

interface WorkItem {
  title: string;
  subtitle?: string;
  body: string | string[];
  tags?: string[];
  linkUrl?: string;
  linkLabel?: string;
}

@Component({
  selector: 'app-works-page',
  standalone: true,
  imports: [InfoBlockComponent],
  templateUrl: './works-page.html',
  styleUrls: ['./works-page.scss'],
})
export class WorksPageComponent {
  works: WorkItem[] = [
    {
      title: 'Pipeline dati MongoDB → BigQuery',
      subtitle: 'Dataflow / Apache Beam · 2024',
      body: [
        'Ho progettato e implementato una pipeline che legge da MongoDB e scrive su BigQuery.',
        'Gestione logging su tabella dedicata, orchestrazione inizialmente con Airflow e poi semplificata.',
      ],
      tags: ['Dataflow', 'Beam', 'BigQuery', 'GCP'],
    },
    {
      title: 'Bot di trading Bitcoin',
      subtitle: 'NestJS · Raspberry Pi 5',
      body: [
        'Bot che riceve segnali da TradingView, interagisce con un full node Bitcoin locale e gestisce operazioni di buy/sell quasi istantanee.',
      ],
      tags: ['NestJS', 'Bitcoin', 'TradingView'],
      linkUrl: 'https://github.com/tuo-repo/bot-trading',
      linkLabel: 'Vedi repository',
    },
    {
      title: 'Portfolio personale',
      subtitle: 'Angular 20',
      body: 'Questo sito: un portfolio pensato come vetrina del mio modo di lavorare, non solo dei progetti.',
      tags: ['Angular', 'Frontend'],
    },
  ];
}
