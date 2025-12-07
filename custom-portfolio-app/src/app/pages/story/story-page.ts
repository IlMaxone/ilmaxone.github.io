import { Component } from '@angular/core';
import { InfoBlockComponent } from '../../shared/info-block/info-block';

interface StorySection {
  title: string;
  subtitle?: string;
  body: string | string[];
  tags?: string[];
  highlight?: boolean;
}

@Component({
  selector: 'app-story-page',
  standalone: true,
  imports: [InfoBlockComponent],
  templateUrl: './story-page.html',
  styleUrls: ['./story-page.scss'],
})
export class StoryPageComponent {
  sections: StorySection[] = [
    {
      title: 'Chi sono',
      subtitle: 'Una panoramica veloce',
      body: [
        'Sono uno sviluppatore che ama mettere le mani nel codice e capire come funzionano davvero le cose.',
        'Negli ultimi anni ho lavorato molto su Angular, NestJS e Google Cloud, con un focus su pipeline dati e architetture pulite.',
      ],
      tags: ['Angular', 'NestJS', 'GCP'],
      highlight: true,
    },
    {
      title: 'La mia storia',
      body: [
        'Ho iniziato a programmare per curiosità, poi è diventato il mio modo principale di esprimere idee.',
        'Mi piacciono le soluzioni semplici a problemi complessi, e detesto la complessità gratuita.',
      ],
    },
    {
      title: 'Come penso al lavoro',
      body: [
        'Preferisco processi iterativi e modelli Time & Material – mi interessa più il flusso di lavoro che il “big bang finale”.',
        'Cerco sempre di capire il perché dietro le richieste, non solo il cosa.',
      ],
      tags: ['Mindset', 'Processo', 'Time & Material'],
    },
  ];
}
