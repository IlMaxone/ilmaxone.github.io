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
  link?: string;
  route?: string;
  routeLabel?: string;
}

export interface PageHeadContent {
  id: number;
  name: string;
  label: string;
  headTitle: string;
  headDescriptionRow1: string;
  headDescriptionRow2: string;
  sideTitle: string;
  sideDescription: string;
  route: string;
  routeLabel: string;
}

export interface AtlasSection extends ExperienceContent {
  route: string;
  routeLabel: string;
  slug: string;
  folderName: string;
  head: PageHeadContent;
  items: ExperienceContent[];
}

export interface ExperienceNode extends ExperienceContent {
  position: { x: number; y: number; z: number };
}
