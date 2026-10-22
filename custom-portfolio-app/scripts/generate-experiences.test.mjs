import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, test } from 'node:test';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixturesDirectory = path.join(projectRoot, 'tmp', 'content-tests');
const fixtures = [];

const head = (name, route) => ({
  id: route === '/' ? 0 : 1,
  name,
  route,
  label: name,
  headTitle: name,
  headDescriptionRow1: name,
  headDescriptionRow2: name,
  sideTitle: name,
  sideDescription: name,
  routeLabel: name,
});

const detail = {
  id: 'argomento',
  path: '/approfondimenti/argomento',
  eyebrow: 'Contesto',
  title: 'Titolo da JSON',
  lead: 'Introduzione da JSON',
  paragraphs: ['Testo modificabile manualmente'],
  sections: [{ title: 'Attività', paragraphs: ['Descrizione delle attività'] }],
  tags: ['Software'],
};

const planet = {
  id: '01',
  name: 'Argomento',
  label: 'Argomento',
  title: 'Argomento',
  period: 'Contesto',
  description: 'Descrizione del pianeta',
  tags: ['Software'],
  link: '',
  detailsPath: detail.path,
};

const writeJson = async (root, relativePath, value) => {
  const file = path.join(root, relativePath);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(value), 'utf8');
};

const createFixture = async () => {
  await fs.mkdir(fixturesDirectory, { recursive: true });
  const root = await fs.mkdtemp(path.join(fixturesDirectory, 'fixture-'));
  fixtures.push(root);
  await fs.mkdir(path.join(root, 'scripts'));
  await fs.copyFile(
    path.join(projectRoot, 'scripts', 'generate-experiences.mjs'),
    path.join(root, 'scripts', 'generate-experiences.mjs'),
  );
  await writeJson(root, 'content/landing/head-landing.json', head('landing', '/'));
  await writeJson(root, 'content/landing/Competenze/head-competenze.json', head('competenze', '/universo/competenze'));
  await writeJson(root, 'content/landing/Competenze/01-argomento.json', planet);
  await writeJson(root, 'content/approfondimenti/argomento.json', detail);
  return root;
};

const generate = root => execFileSync(
  process.execPath,
  [path.join(root, 'scripts', 'generate-experiences.mjs')],
  { encoding: 'utf8', stdio: 'pipe' },
);

const readGenerated = (root, file) => fs.readFile(path.join(root, 'src/app/generated', file), 'utf8');

const expectFailure = (root, pattern) => {
  assert.throws(() => generate(root), error => pattern.test(String(error.stderr)));
};

afterEach(async () => {
  for (const root of fixtures.splice(0)) {
    const resolved = path.resolve(root);
    assert.ok(resolved.startsWith(`${path.resolve(fixturesDirectory)}${path.sep}`));
    await fs.rm(resolved, { recursive: true, force: true });
  }
});

test('reads standalone JSON and derives the return link from the owning planet', async () => {
  const root = await createFixture();
  generate(root);
  const generated = await readGenerated(root, 'details.generated.ts');
  assert.match(generated, /Testo modificabile manualmente/);
  assert.match(generated, /"backRoute": "\/universo\/competenze"/);
  assert.match(generated, /"sectionLabel": "Competenze"/);
  const atlas = await readGenerated(root, 'atlas.generated.ts');
  assert.doesNotMatch(atlas, /Testo modificabile manualmente|GENERATED_DETAILS/);
});

test('a manual JSON edit changes the page content without changing the planet catalog', async () => {
  const root = await createFixture();
  generate(root);
  const atlasBefore = await readGenerated(root, 'atlas.generated.ts');
  await writeJson(root, 'content/approfondimenti/argomento.json', {
    ...detail,
    title: 'Titolo aggiornato a mano',
    paragraphs: ['Nuovo paragrafo da JSON'],
  });
  generate(root);
  const generated = await readGenerated(root, 'details.generated.ts');
  assert.match(generated, /Titolo aggiornato a mano/);
  assert.match(generated, /Nuovo paragrafo da JSON/);
  assert.doesNotMatch(generated, /Testo modificabile manualmente/);
  assert.equal(await readGenerated(root, 'atlas.generated.ts'), atlasBefore);
});

test('ignores the JSON template and disabled content', async () => {
  const root = await createFixture();
  await fs.writeFile(path.join(root, 'content/approfondimenti/details-template.json'), 'template non compilato');
  await fs.writeFile(path.join(root, 'content/approfondimenti/-disabilitato.json'), 'contenuto disabilitato');
  generate(root);
  const generated = await readGenerated(root, 'details.generated.ts');
  assert.equal((generated.match(/"backRoute"/g) ?? []).length, 1);
});

test('rejects a broken planet link and an orphan detail', async () => {
  const root = await createFixture();
  await writeJson(root, 'content/landing/Competenze/01-argomento.json', { ...planet, detailsPath: '/approfondimenti/assente' });
  expectFailure(root, /non esiste un JSON corrispondente in content\/approfondimenti/);
  await writeJson(root, 'content/landing/Competenze/01-argomento.json', { ...planet, detailsPath: undefined });
  expectFailure(root, /non è collegato da nessun pianeta/);
});

test('rejects duplicate paths and ambiguous return sections', async () => {
  const root = await createFixture();
  await writeJson(root, 'content/approfondimenti/duplicato.json', { ...detail, id: 'altro-id' });
  expectFailure(root, /path dettaglio duplicato/);
  await fs.unlink(path.join(root, 'content/approfondimenti/duplicato.json'));
  await writeJson(root, 'content/landing/Passioni/head-passioni.json', head('passioni', '/universo/passioni'));
  await writeJson(root, 'content/landing/Passioni/01-argomento.json', planet);
  expectFailure(root, /collegato da sezioni diverse/);
});

test('reports invalid manual JSON and details left in a landing section', async () => {
  const root = await createFixture();
  await fs.writeFile(path.join(root, 'content/approfondimenti/argomento.json'), '{"title":');
  expectFailure(root, /approfondimenti\/argomento.json: JSON non valido/);
  await writeJson(root, 'content/approfondimenti/argomento.json', detail);
  await writeJson(root, 'content/landing/Competenze/details-vecchio.json', detail);
  expectFailure(root, /I JSON degli approfondimenti vanno in content\/approfondimenti/);
});
