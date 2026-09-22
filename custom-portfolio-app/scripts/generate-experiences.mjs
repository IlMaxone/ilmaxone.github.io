import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const landingDirectory = path.join(projectRoot, 'content', 'landing');
const outputFile = path.join(projectRoot, 'src', 'app', 'generated', 'atlas.generated.ts');
const landingHeadFile = path.join(landingDirectory, 'head-landing.json');

const HEAD_FILE_PATTERN = /^head-.+\.json$/i;
const PLANET_FILE_PATTERN = /^(\d+)-.+\.json$/i;
const IGNORED_FILE_PATTERN = /^-/;

const requiredHeadStrings = [
  'name',
  'label',
  'headTitle',
  'headDescriptionRow1',
  'headDescriptionRow2',
  'sideTitle',
  'sideDescription',
  'route',
  'routeLabel',
];

const requiredPlanetStrings = [
  'id',
  'name',
  'label',
  'period',
  'title',
  'description',
];

const slugify = value =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const readJson = async (filePath, context) => {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`${context}: JSON non valido (${error.message})`);
  }
};

const readPageHead = async (filePath, context) => {
  const head = await readJson(filePath, context);

  if (!Number.isFinite(head.id)) {
    throw new Error(`${context}: "id" deve essere un numero`);
  }
  for (const field of requiredHeadStrings) {
    if (typeof head[field] !== 'string' || head[field].trim().length === 0) {
      throw new Error(`${context}: "${field}" deve essere una stringa non vuota`);
    }
  }
  if (!/^[a-z0-9-]+$/.test(head.name)) {
    throw new Error(`${context}: "name" accetta minuscole, numeri e trattini`);
  }
  if (head.route !== '/' && !/^\/[a-z0-9][a-z0-9\-/]*$/.test(head.route)) {
    throw new Error(`${context}: "route" deve essere / oppure un percorso interno che inizia con /`);
  }

  return head;
};

const readPlanet = async (directoryPath, directoryName, fileName) => {
  const context = `${directoryName}/${fileName}`;
  const planet = await readJson(path.join(directoryPath, fileName), context);
  const order = Number.parseInt(fileName.match(PLANET_FILE_PATTERN)?.[1] ?? '', 10);

  for (const field of requiredPlanetStrings) {
    if (typeof planet[field] !== 'string' || planet[field].trim().length === 0) {
      throw new Error(`${context}: "${field}" deve essere una stringa non vuota`);
    }
  }
  if (!Number.isFinite(order)) {
    throw new Error(`${context}: il prefisso numerico non è valido`);
  }
  if (!/^[a-z0-9-]+$/i.test(planet.id)) {
    throw new Error(`${context}: "id" accetta lettere, numeri e trattini`);
  }
  if (!Array.isArray(planet.tags) || planet.tags.some(tag => typeof tag !== 'string')) {
    throw new Error(`${context}: "tags" deve essere un array di stringhe`);
  }
  if (typeof planet.link !== 'string') {
    throw new Error(`${context}: "link" deve essere una stringa, anche vuota`);
  }

  return {
    id: planet.id,
    order,
    shortLabel: planet.label,
    glyph: planet.label.slice(0, 1).toUpperCase(),
    eyebrow: planet.name,
    title: planet.title,
    period: planet.period,
    description: planet.description,
    tags: planet.tags,
    link: planet.link,
  };
};

const landingHead = await readPageHead(landingHeadFile, 'head-landing.json');
const directoryEntries = await fs.readdir(landingDirectory, { withFileTypes: true });
const sectionDirectories = directoryEntries
  .filter(entry => entry.isDirectory() && !entry.name.startsWith('-'))
  .sort((left, right) => left.name.localeCompare(right.name, 'it'));

if (sectionDirectories.length === 0) {
  throw new Error(`Nessuna sezione trovata in ${landingDirectory}`);
}

const sections = [];
const sectionSlugs = new Set();
let ignoredFilesCount = 0;

for (const [sectionIndex, directory] of sectionDirectories.entries()) {
  const directoryPath = path.join(landingDirectory, directory.name);
  const slug = slugify(directory.name);
  if (!slug || sectionSlugs.has(slug)) {
    throw new Error(`${directory.name}: nome cartella non valido o duplicato`);
  }
  sectionSlugs.add(slug);

  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const jsonFiles = entries
    .filter(entry => entry.isFile() && entry.name.toLowerCase().endsWith('.json'))
    .map(entry => entry.name);
  const headFiles = jsonFiles.filter(fileName => HEAD_FILE_PATTERN.test(fileName));
  const planetFiles = jsonFiles
    .filter(fileName => PLANET_FILE_PATTERN.test(fileName))
    .sort((left, right) => {
      const leftOrder = Number.parseInt(left.match(PLANET_FILE_PATTERN)?.[1] ?? '', 10);
      const rightOrder = Number.parseInt(right.match(PLANET_FILE_PATTERN)?.[1] ?? '', 10);
      return leftOrder - rightOrder || left.localeCompare(right, 'it');
    });
  const ignoredFiles = jsonFiles.filter(fileName => IGNORED_FILE_PATTERN.test(fileName));
  const unsupportedFiles = jsonFiles.filter(
    fileName =>
      !HEAD_FILE_PATTERN.test(fileName) &&
      !PLANET_FILE_PATTERN.test(fileName) &&
      !IGNORED_FILE_PATTERN.test(fileName),
  );

  ignoredFilesCount += ignoredFiles.length;

  if (unsupportedFiles.length > 0) {
    throw new Error(
      `${directory.name}: JSON non classificati (${unsupportedFiles.join(', ')}). Usa head-*, un prefisso numerico o - per ignorarli.`,
    );
  }
  if (headFiles.length !== 1) {
    throw new Error(
      `${directory.name}: deve contenere un solo file head-*.json, trovati ${headFiles.length}`,
    );
  }

  const headFileName = headFiles[0];
  const head = await readPageHead(
    path.join(directoryPath, headFileName),
    `${directory.name}/${headFileName}`,
  );

  if (head.name !== slug) {
    throw new Error(
      `${directory.name}/${headFileName}: "name" deve coincidere con lo slug della cartella "${slug}"`,
    );
  }
  if (head.route !== `/universo/${slug}`) {
    throw new Error(
      `${directory.name}/${headFileName}: "route" deve essere "/universo/${slug}"`,
    );
  }

  const items = [];
  const ids = new Set();
  for (const fileName of planetFiles) {
    const item = await readPlanet(directoryPath, directory.name, fileName);
    if (ids.has(item.id)) {
      throw new Error(`${directory.name}: id duplicato "${item.id}"`);
    }
    ids.add(item.id);
    items.push(item);
  }

  const itemCount = items.length;
  sections.push({
    id: slug,
    order: (sectionIndex + 1) * 10,
    shortLabel: directory.name,
    glyph: directory.name.slice(0, 1).toUpperCase(),
    eyebrow: 'Settore dell’universo',
    title: directory.name,
    period: `${itemCount} ${itemCount === 1 ? 'pianeta' : 'pianeti'}`,
    description: head.sideTitle,
    tags: items.slice(0, 4).map(item => item.shortLabel),
    route: head.route,
    routeLabel: head.routeLabel,
    slug,
    folderName: directory.name,
    head,
    items,
  });
}

const generatedSource = `// File generato automaticamente da scripts/generate-experiences.mjs.
// Non modificarlo a mano: gestire cartelle e JSON in content/landing/.
import type { AtlasSection, PageHeadContent } from '../content/experience.model';

export const GENERATED_LANDING_HEAD: PageHeadContent = ${JSON.stringify(landingHead, null, 2)};

export const GENERATED_ATLAS: AtlasSection[] = ${JSON.stringify(sections, null, 2)};
`;

await fs.mkdir(path.dirname(outputFile), { recursive: true });
await fs.writeFile(outputFile, generatedSource, 'utf8');

console.log(
  `Generate ${sections.length} sezioni, ${sections.reduce((total, section) => total + section.items.length, 0)} pianeti e ignorati ${ignoredFilesCount} JSON con prefisso -.`,
);
