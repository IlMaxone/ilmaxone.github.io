export interface ExperienceContent {
  id: string;
  order: number;
  shortLabel: string;
  glyph: string;
  eyebrow: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
  route: '/story' | '/works';
  routeLabel: string;
}

export interface ExperienceNode extends ExperienceContent {
  position: { x: number; y: number; z: number };
}
