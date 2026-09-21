import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const landingDirectory = path.join(projectRoot, 'content', 'landing');
const outputFile = path.join(projectRoot, 'src', 'app', 'generated', 'atlas.generated.ts');

const requiredStrings = [
  'id',
  'shortLabel',
  'glyph',
  'eyebrow',
  'title',
  'period',
  'description',
  'route',
  'routeLabel',
];

const sectionDescriptions = {
  'abilita-acquisiste': 'Le competenze maturate nel tempo, tra pratica, studio e curiosità.',
  capacita: 'Tecnologie, metodo e capacità che porto nel lavoro quotidiano.',
  lavori: 'Esperienze professionali, risultati e contesti in cui ho lavorato.',
  progetti: 'Prodotti, esperimenti e idee trasformate in qualcosa di concreto.',
};

const slugify = value =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const directoryEntries = await fs.readdir(landingDirectory, { withFileTypes: true });
const sectionDirectories = directoryEntries
  .filter(entry => entry.isDirectory() && !entry.name.startsWith('_'))
  .sort((left, right) => left.name.localeCompare(right.name, 'it'));

if (sectionDirectories.length === 0) {
  throw new Error(`Nessuna sezione trovata in ${landingDirectory}`);
}

const sections = [];
const sectionSlugs = new Set();

for (const [sectionIndex, directory] of sectionDirectories.entries()) {
  const directoryPath = path.join(landingDirectory, directory.name);
  const slug = slugify(directory.name);
  if (!slug || sectionSlugs.has(slug)) {
    throw new Error(`${directory.name}: nome cartella non valido o duplicato`);
  }
  sectionSlugs.add(slug);

  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const contentFiles = entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.json') && !entry.name.startsWith('_'))
    .map(entry => entry.name)
    .sort((left, right) => left.localeCompare(right, 'it'));

  const items = [];
  const ids = new Set();

  for (const fileName of contentFiles) {
    const filePath = path.join(directoryPath, fileName);
    let item;

    try {
      item = JSON.parse(await fs.readFile(filePath, 'utf8'));
    } catch (error) {
      throw new Error(`${directory.name}/${fileName}: JSON non valido (${error.message})`);
    }

    for (const field of requiredStrings) {
      if (typeof item[field] !== 'string' || item[field].trim().length === 0) {
        throw new Error(`${directory.name}/${fileName}: "${field}" deve essere una stringa non vuota`);
      }
    }

    if (!Number.isFinite(item.order)) {
      throw new Error(`${directory.name}/${fileName}: "order" deve essere un numero`);
    }
    if (!Array.isArray(item.tags) || item.tags.some(tag => typeof tag !== 'string')) {
      throw new Error(`${directory.name}/${fileName}: "tags" deve essere un array di stringhe`);
    }
    if (!/^\/[a-z0-9][a-z0-9\-/]*$/.test(item.route)) {
      throw new Error(`${directory.name}/${fileName}: "route" deve essere un percorso interno che inizia con /`);
    }
    if (!/^[a-z0-9-]+$/.test(item.id)) {
      throw new Error(`${directory.name}/${fileName}: "id" accetta minuscole, numeri e trattini`);
    }
    if (ids.has(item.id)) {
      throw new Error(`${directory.name}: id duplicato "${item.id}"`);
    }

    ids.add(item.id);
    items.push(item);
  }

  items.sort((left, right) => left.order - right.order || left.id.localeCompare(right.id));
  const itemCount = items.length;
  sections.push({
    id: slug,
    order: (sectionIndex + 1) * 10,
    shortLabel: directory.name,
    glyph: directory.name.slice(0, 1).toUpperCase(),
    eyebrow: 'Settore dell’universo',
    title: directory.name,
    period: `${itemCount} ${itemCount === 1 ? 'pianeta' : 'pianeti'}`,
    description:
      sectionDescriptions[slug] ??
      `Una costellazione di ${itemCount} ${itemCount === 1 ? 'contenuto' : 'contenuti'} da esplorare.`,
    tags: items.slice(0, 4).map(item => item.shortLabel),
    route: `/universo/${slug}`,
    routeLabel: `Entra in ${directory.name}`,
    slug,
    folderName: directory.name,
    items,
  });
}

const generatedSource = `// File generato automaticamente da scripts/generate-experiences.mjs.
// Non modificarlo a mano: gestire cartelle e JSON in content/landing/.
import type { AtlasSection } from '../content/experience.model';

export const GENERATED_ATLAS: AtlasSection[] = ${JSON.stringify(sections, null, 2)};
`;

await fs.mkdir(path.dirname(outputFile), { recursive: true });
await fs.writeFile(outputFile, generatedSource, 'utf8');

console.log(
  `Generate ${sections.length} sezioni e ${sections.reduce((total, section) => total + section.items.length, 0)} contenuti da content/landing/.`,
);
