import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDirectory = path.join(projectRoot, 'content', 'landing');
const generatorScript = path.join(projectRoot, 'scripts', 'generate-experiences.mjs');
const angularCli = path.join(projectRoot, 'node_modules', '@angular', 'cli', 'bin', 'ng.js');

let debounceTimer;
let generationRunning = false;
let generationPending = false;
let shuttingDown = false;

const runGenerator = () => {
  if (generationRunning) {
    generationPending = true;
    return;
  }

  generationRunning = true;
  const generator = spawn(process.execPath, [generatorScript], {
    cwd: projectRoot,
    stdio: 'inherit',
  });

  generator.on('exit', code => {
    generationRunning = false;
    if (code !== 0) {
      console.error('Rigenerazione JSON fallita: correggi il file appena salvato.');
    }
    if (generationPending) {
      generationPending = false;
      runGenerator();
    }
  });
};

const watcher = watch(contentDirectory, { recursive: true }, (_eventType, fileName) => {
  if (!fileName?.toLowerCase().endsWith('.json')) {
    return;
  }

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log(`JSON aggiornato: ${fileName}. Rigenero l’universo...`);
    runGenerator();
  }, 120);
});

const angular = spawn(process.execPath, [angularCli, 'serve', ...process.argv.slice(2)], {
  cwd: projectRoot,
  stdio: 'inherit',
});

const shutdown = signal => {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;
  clearTimeout(debounceTimer);
  watcher.close();
  angular.kill(signal);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

angular.on('exit', code => {
  watcher.close();
  process.exitCode = code ?? 0;
});
