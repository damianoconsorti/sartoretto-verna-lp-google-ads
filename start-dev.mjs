import { mkdirSync, existsSync } from 'fs';
import { spawn } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';

const root = fileURLToPath(new URL('.', import.meta.url));
const tempDir = join(root, 'node_modules', '.vite-temp');

// Ensure directory exists with retries
for (let i = 0; i < 5; i++) {
  try {
    mkdirSync(tempDir, { recursive: true });
    if (existsSync(tempDir)) break;
  } catch {}
  await new Promise(r => setTimeout(r, 200));
}

// Spawn vite
const vite = spawn(
  process.platform === 'win32' ? 'node_modules\\.bin\\vite.cmd' : 'node_modules/.bin/vite',
  process.argv.slice(2),
  { stdio: 'inherit', shell: true, cwd: root }
);

vite.on('exit', (code) => process.exit(code ?? 0));
