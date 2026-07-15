import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname);

console.log('Root:', root);

const debugPlugin = {
  name: 'debug',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      console.log('[REQ]', req.method, req.url);
      next();
    });
  },
  transformIndexHtml(html) {
    console.log('[HTML] index.html trasformato, lunghezza:', html.length);
    return html;
  },
};

try {
  const server = await createServer({
    configFile: false,
    root,
    appType: 'spa',
    cacheDir: resolve(__dirname, '.vite-cache'),
    server: { port: 3000, host: '0.0.0.0' },
    plugins: [debugPlugin, react(), tailwindcss()],
    resolve: { alias: { '@': root } },
  });

  await server.listen();
  server.printUrls();
  console.log('\nApri http://localhost:3000 nel browser');
} catch (err) {
  console.error('Errore Vite:', err.message);
  process.exit(1);
}
