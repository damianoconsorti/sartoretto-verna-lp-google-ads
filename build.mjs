// Build senza caricare vite.config — bypassa .vite-temp
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';

const root = fileURLToPath(new URL('.', import.meta.url));

await build({
  configFile: false,
  root,
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': root } },
  build: { outDir: 'dist' },
});
