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
  route: string;
  routeLabel: string;
}

export interface AtlasSection extends ExperienceContent {
  slug: string;
  folderName: string;
  items: ExperienceContent[];
}

export interface ExperienceNode extends ExperienceContent {
  position: { x: number; y: number; z: number };
}
