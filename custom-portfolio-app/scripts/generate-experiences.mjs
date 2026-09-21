import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDirectory = path.join(projectRoot, 'content', 'experiences');
const outputFile = path.join(
  projectRoot,
  'src',
  'app',
  'generated',
  'experiences.generated.ts',
);

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

const entries = await fs.readdir(contentDirectory, { withFileTypes: true });
const contentFiles = entries
  .filter(entry => entry.isFile() && entry.name.endsWith('.json') && !entry.name.startsWith('_'))
  .map(entry => entry.name)
  .sort((left, right) => left.localeCompare(right));

if (contentFiles.length === 0) {
  throw new Error(`Nessuna esperienza trovata in ${contentDirectory}`);
}

const experiences = [];
const ids = new Set();

for (const fileName of contentFiles) {
  const filePath = path.join(contentDirectory, fileName);
  const rawContent = await fs.readFile(filePath, 'utf8');
  let experience;

  try {
    experience = JSON.parse(rawContent);
  } catch (error) {
    throw new Error(`${fileName}: JSON non valido (${error.message})`);
  }

  for (const field of requiredStrings) {
    if (typeof experience[field] !== 'string' || experience[field].trim().length === 0) {
      throw new Error(`${fileName}: il campo "${field}" deve essere una stringa non vuota`);
    }
  }

  if (!Number.isFinite(experience.order)) {
    throw new Error(`${fileName}: il campo "order" deve essere un numero`);
  }

  if (!Array.isArray(experience.tags) || experience.tags.some(tag => typeof tag !== 'string')) {
    throw new Error(`${fileName}: il campo "tags" deve essere un array di stringhe`);
  }

  if (!['/story', '/works'].includes(experience.route)) {
    throw new Error(`${fileName}: "route" deve essere /story oppure /works`);
  }

  if (!/^[a-z0-9-]+$/.test(experience.id)) {
    throw new Error(`${fileName}: "id" può contenere solo lettere minuscole, numeri e trattini`);
  }

  if (ids.has(experience.id)) {
    throw new Error(`${fileName}: id duplicato "${experience.id}"`);
  }

  ids.add(experience.id);
  experiences.push(experience);
}

experiences.sort((left, right) => left.order - right.order || left.id.localeCompare(right.id));

const generatedSource = `// File generato automaticamente da scripts/generate-experiences.mjs.
// Non modificarlo a mano: aggiungere o modificare i JSON in content/experiences/.
import type { ExperienceContent } from '../content/experience.model';

export const GENERATED_EXPERIENCES: ExperienceContent[] = ${JSON.stringify(experiences, null, 2)};
`;

await fs.mkdir(path.dirname(outputFile), { recursive: true });
await fs.writeFile(outputFile, generatedSource, 'utf8');

console.log(`Generate ${experiences.length} esperienze da content/experiences/.`);
