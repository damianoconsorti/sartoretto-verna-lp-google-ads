// Build senza caricare vite.config — bypassa .vite-temp.
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import { mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { tmpdir } from 'os';
import { prerenderLanding } from './scripts/prerender.mjs';

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
    // Tre pagine: la LP (index.html), la thank-you page /grazie/ (noindex) e l'anteprima della nuova LP /anteprima/ (noindex).
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        grazie: resolve(root, 'grazie/index.html'),
        anteprima: resolve(root, 'anteprima/index.html'),
      },
    },
  },
});

// Contenuto testuale nell'HTML servito (crawler senza JS). Solo la landing; vedi scripts/prerender.mjs.
const { bytes } = await prerenderLanding({ root, outDir: resolve(root, outDir) });
console.log(`prerender: index.html con ${(bytes / 1024).toFixed(1)} KB di markup statico nel <div id="root">`);
