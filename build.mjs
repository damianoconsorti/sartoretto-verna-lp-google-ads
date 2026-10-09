// Build senza caricare vite.config — bypassa .vite-temp.
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import { mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { tmpdir } from 'os';

const root = fileURLToPath(new URL('.', import.meta.url));

function resolveOutDir() {
  if (process.env.VITE_OUT_DIR) return process.env.VITE_OUT_DIR;

  const defaultDist = resolve(root, 'dist');
  const probe = join(defaultDist, `.vite-write-test-${process.pid}.tmp`);
  try {
    mkdirSync(defaultDist, { recursive: true });
    writeFileSync(probe, 'ok');
    unlinkSync(probe);
    return 'dist';
  } catch {
    const fallback = join(tmpdir(), 'sartoretto-verna-lp-dist');
    console.warn(`Cartella dist bloccata da Windows: build locale in ${fallback}`);
    return fallback;
  }
}

const outDir = resolveOutDir();

await build({
  configFile: false,
  root,
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': root } },
  build: {
    outDir,
    emptyOutDir: true,
    // Due pagine: la LP (index.html) e la thank-you page /grazie/ (noindex).
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        grazie: resolve(root, 'grazie/index.html'),
      },
    },
  },
});
