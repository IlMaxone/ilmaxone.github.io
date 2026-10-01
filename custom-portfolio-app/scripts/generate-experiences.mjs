import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const landingDirectory = path.join(projectRoot, 'content', 'landing');
const imagesDirectory = path.join(projectRoot, 'content', 'img');
const outputFile = path.join(projectRoot, 'src', 'app', 'generated', 'atlas.generated.ts');
const landingHeadFile = path.join(landingDirectory, 'head-landing.json');

const HEAD_FILE_PATTERN = /^head-.+\.json$/i;
const PLANET_FILE_PATTERN = /^(\d+)-.+\.json$/i;
const DETAILS_FILE_PATTERN = /^details-.+\.json$/i;
const DETAILS_TEMPLATE_FILE = 'details-template.json';
const IGNORED_FILE_PATTERN = /^-/;
const SUPPORTED_IMAGE_EXTENSIONS = new Set(['.gif', '.webp', '.jpeg', '.jpg', '.png']);

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

const requiredDetailStrings = [
  'id',
  'path',
  'eyebrow',
  'title',
  'lead',
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
  if (
    planet.detailsPath !== undefined &&
    (typeof planet.detailsPath !== 'string' ||
      !/^\/approfondimenti\/[a-z0-9][a-z0-9-]*$/.test(planet.detailsPath))
  ) {
    throw new Error(
      `${context}: "detailsPath" deve usare il formato /approfondimenti/nome-percorso`,
    );
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
    detailsPath: planet.detailsPath,
  };
};

const readDetail = async (directoryPath, directoryName, fileName) => {
  const context = `${directoryName}/${fileName}`;
  const detail = await readJson(path.join(directoryPath, fileName), context);

  for (const field of requiredDetailStrings) {
    if (typeof detail[field] !== 'string' || detail[field].trim().length === 0) {
      throw new Error(`${context}: "${field}" deve essere una stringa non vuota`);
    }
  }
  if (!/^[a-z0-9-]+$/.test(detail.id)) {
    throw new Error(`${context}: "id" accetta minuscole, numeri e trattini`);
  }
  if (!/^\/approfondimenti\/[a-z0-9][a-z0-9-]*$/.test(detail.path)) {
    throw new Error(
      `${context}: "path" deve usare il formato /approfondimenti/nome-percorso`,
    );
  }
  const normalizeImage = async (image, paragraphContext) => {
    if (typeof image !== 'object' || image === null) {
      throw new Error(`${paragraphContext}: "image" deve essere un oggetto`);
    }
    if (typeof image.file !== 'string' || image.file.trim().length === 0) {
      throw new Error(`${paragraphContext}: "image.file" deve essere una stringa non vuota`);
    }
    if (typeof image.alt !== 'string' || image.alt.trim().length === 0) {
      throw new Error(`${paragraphContext}: "image.alt" deve essere una stringa non vuota`);
    }
    if (image.position !== 'left' && image.position !== 'right') {
      throw new Error(`${paragraphContext}: "image.position" deve essere "left" oppure "right"`);
    }
    if (image.caption !== undefined && typeof image.caption !== 'string') {
      throw new Error(`${paragraphContext}: "image.caption" deve essere una stringa`);
    }

    const normalizedFile = image.file.replaceAll('\\', '/').replace(/^\/+/, '');
    const imagePath = path.resolve(imagesDirectory, normalizedFile);
    const imagesRoot = `${path.resolve(imagesDirectory)}${path.sep}`;
    if (!imagePath.startsWith(imagesRoot)) {
      throw new Error(`${paragraphContext}: "image.file" deve restare dentro content/img`);
    }
    if (!SUPPORTED_IMAGE_EXTENSIONS.has(path.extname(imagePath).toLowerCase())) {
      throw new Error(
        `${paragraphContext}: formato immagine non supportato; usa gif, webp, jpeg, jpg o png`,
      );
    }
    try {
      const imageStats = await fs.stat(imagePath);
      if (!imageStats.isFile()) {
        throw new Error('non è un file');
      }
    } catch {
      throw new Error(
        `${paragraphContext}: immagine "${normalizedFile}" non trovata in content/img`,
      );
    }

    return {
      file: normalizedFile,
      src: `/img/${normalizedFile.split('/').map(encodeURIComponent).join('/')}`,
      alt: image.alt,
      position: image.position,
      ...(image.caption?.trim() ? { caption: image.caption.trim() } : {}),
    };
  };

  const normalizeParagraphs = async (paragraphs, paragraphsContext) => {
    if (!Array.isArray(paragraphs) || paragraphs.length === 0) {
      throw new Error(`${paragraphsContext} deve contenere uno o più testi non vuoti`);
    }

    return Promise.all(
      paragraphs.map(async (paragraph, paragraphIndex) => {
        const paragraphContext = `${paragraphsContext}[${paragraphIndex}]`;
        if (typeof paragraph === 'string') {
          if (paragraph.trim().length === 0) {
            throw new Error(`${paragraphContext}: il testo non può essere vuoto`);
          }
          return { text: paragraph };
        }
        if (
          typeof paragraph !== 'object' ||
          paragraph === null ||
          typeof paragraph.text !== 'string' ||
          paragraph.text.trim().length === 0
        ) {
          throw new Error(`${paragraphContext}: usa una stringa o un oggetto con "text"`);
        }

        return {
          text: paragraph.text,
          ...(paragraph.image
            ? { image: await normalizeImage(paragraph.image, paragraphContext) }
            : {}),
        };
      }),
    );
  };

  const paragraphs = await normalizeParagraphs(detail.paragraphs, `${context}: "paragraphs"`);
  if (
    !Array.isArray(detail.sections) ||
    detail.sections.length === 0 ||
    detail.sections.some(
      section =>
        typeof section !== 'object' ||
        section === null ||
        typeof section.title !== 'string' ||
        section.title.trim().length === 0 ||
        !Array.isArray(section.paragraphs) ||
        section.paragraphs.length === 0,
    )
  ) {
    throw new Error(
      `${context}: "sections" deve contenere almeno un oggetto con "title" e uno o più "paragraphs"`,
    );
  }
  if (!Array.isArray(detail.tags) || detail.tags.some(tag => typeof tag !== 'string')) {
    throw new Error(`${context}: "tags" deve essere un array di stringhe`);
  }

  const sections = await Promise.all(
    detail.sections.map(async (section, sectionIndex) => ({
      title: section.title,
      paragraphs: await normalizeParagraphs(
        section.paragraphs,
        `${context}: "sections"[${sectionIndex}]."paragraphs"`,
      ),
    })),
  );

  return {
    id: detail.id,
    slug: detail.path.slice('/approfondimenti/'.length),
    path: detail.path,
    eyebrow: detail.eyebrow,
    title: detail.title,
    lead: detail.lead,
    paragraphs,
    sections,
    tags: detail.tags,
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
const details = [];
const sectionSlugs = new Set();
const detailIds = new Set();
const detailPaths = new Set();
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
  const detailFiles = jsonFiles
    .filter(
      fileName =>
        DETAILS_FILE_PATTERN.test(fileName) && fileName.toLowerCase() !== DETAILS_TEMPLATE_FILE,
    )
    .sort((left, right) => left.localeCompare(right, 'it'));
  const detailTemplateFiles = jsonFiles.filter(
    fileName => fileName.toLowerCase() === DETAILS_TEMPLATE_FILE,
  );
  const ignoredFiles = jsonFiles.filter(fileName => IGNORED_FILE_PATTERN.test(fileName));
  const unsupportedFiles = jsonFiles.filter(
    fileName =>
      !HEAD_FILE_PATTERN.test(fileName) &&
      !PLANET_FILE_PATTERN.test(fileName) &&
      !DETAILS_FILE_PATTERN.test(fileName) &&
      !IGNORED_FILE_PATTERN.test(fileName),
  );

  ignoredFilesCount += ignoredFiles.length + detailTemplateFiles.length;

  if (unsupportedFiles.length > 0) {
    throw new Error(
      `${directory.name}: JSON non classificati (${unsupportedFiles.join(', ')}). Usa head-*, un prefisso numerico, details-* oppure - per ignorarli.`,
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

  const sectionDetails = [];
  for (const fileName of detailFiles) {
    const detail = await readDetail(directoryPath, directory.name, fileName);
    if (detailIds.has(detail.id)) {
      throw new Error(`${directory.name}: id dettaglio duplicato "${detail.id}"`);
    }
    if (detailPaths.has(detail.path)) {
      throw new Error(`${directory.name}: path dettaglio duplicato "${detail.path}"`);
    }
    detailIds.add(detail.id);
    detailPaths.add(detail.path);
    sectionDetails.push({
      ...detail,
      sectionSlug: slug,
      sectionLabel: directory.name,
      backRoute: head.route,
    });
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

  const localDetailPaths = new Set(sectionDetails.map(detail => detail.path));
  for (const item of items) {
    if (item.detailsPath && !localDetailPaths.has(item.detailsPath)) {
      throw new Error(
        `${directory.name}: il pianeta "${item.id}" punta a "${item.detailsPath}", ma non esiste un details-*.json corrispondente nella stessa cartella`,
      );
    }
  }
  for (const detail of sectionDetails) {
    if (!items.some(item => item.detailsPath === detail.path)) {
      throw new Error(
        `${directory.name}: il dettaglio "${detail.path}" non è collegato da nessun pianeta numerato`,
      );
    }
  }
  details.push(...sectionDetails);

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
import type { AtlasSection, DetailPageContent, PageHeadContent } from '../content/experience.model';

export const GENERATED_LANDING_HEAD: PageHeadContent = ${JSON.stringify(landingHead, null, 2)};

export const GENERATED_ATLAS: AtlasSection[] = ${JSON.stringify(sections, null, 2)};

export const GENERATED_DETAILS: DetailPageContent[] = ${JSON.stringify(details, null, 2)};
`;

await fs.mkdir(path.dirname(outputFile), { recursive: true });
await fs.writeFile(outputFile, generatedSource, 'utf8');

console.log(
  `Generate ${sections.length} sezioni, ${sections.reduce((total, section) => total + section.items.length, 0)} pianeti, ${details.length} ${details.length === 1 ? 'approfondimento' : 'approfondimenti'} e ignorati ${ignoredFilesCount} template o JSON con prefisso -.`,
);
