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
  detailsPath?: string;
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

export interface DetailSectionContent {
  title: string;
  paragraphs: DetailParagraphContent[];
}

export interface DetailImageContent {
  file: string;
  src: string;
  alt: string;
  position: 'left' | 'right';
  caption?: string;
}

export interface DetailParagraphContent {
  text: string;
  image?: DetailImageContent;
}

export interface DetailPageContent {
  id: string;
  slug: string;
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: DetailParagraphContent[];
  sections: DetailSectionContent[];
  tags: string[];
  sectionSlug: string;
  sectionLabel: string;
  backRoute: string;
}
