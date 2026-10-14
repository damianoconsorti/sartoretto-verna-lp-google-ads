// Pre-render a build della landing: renderizza l'App REALE a stringa (react-dom/server) e la scrive dentro <div id="root"> di index.html.
//
// Perché: l'HTML servito era `<div id="root"></div>` (0 parole). I crawler che non eseguono JS (o lo eseguono con budget
// limitato, come molti bot AI) vedevano una pagina vuota. Qui il testo viene dall'app stessa, quindi non può andare fuori sync.
//
// Comportamento per l'utente: invariato. Il client continua a usare createRoot (index.tsx NON cambia): al mount React sostituisce
// il contenuto statico. Nessuna idratazione, quindi nessun rischio di mismatch. Gli elementi animati escono con lo stile iniziale
// di framer-motion (opacity:0), quindi prima del JS non compare testo "a scatti".
// Solo la landing viene pre-renderizzata: /grazie/ resta com'è (noindex, e non si tocca il flusso della conversione).
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const ROOT_PLACEHOLDER = '<div id="root"></div>';

// Il markup statico serve ai crawler: non deve cambiare il caricamento delle risorse per l'utente reale.
function sanitizeForStaticHtml(markup) {
  return markup
    // React 19 "solleva" in testa al markup dei <link rel="preload"> per le <img> con fetchPriority (logo, poster hero).
    // Il poster hero è già precaricato nell'<head> di index.html, il logo oggi non lo è: tolti, nulla cambia rispetto a prima.
    .replace(/^(?:<link rel="preload"[^>]*\/>)+/, '')
    // Il browser scarica `poster` anche con preload="none": i 4 poster delle testimonianze partirebbero prima del JS,
    // in concorrenza con il poster hero (LCP). Nel DOM finale (dopo il mount) restano com'erano.
    .replace(/<video\b[^>]*>/g, (tag) => tag.replace(/\sposter="[^"]*"/, ''));
}

export async function prerenderLanding({ root, outDir }) {
  const htmlPath = join(outDir, 'index.html');
  const template = readFileSync(htmlPath, 'utf8');
  if (!template.includes(ROOT_PLACEHOLDER)) {
    throw new Error(`prerender: ${ROOT_PLACEHOLDER} non trovato in ${htmlPath} (già pre-renderizzato o index.html cambiato?)`);
  }

  // Vite in modalità middleware, usato solo per caricare i .tsx come moduli SSR: nessuna porta aperta, nessun HMR.
  const server = await createServer({
    root,
    configFile: false,
    logLevel: 'error',
    appType: 'custom',
    plugins: [react()],
    resolve: { alias: { '@': root } },
    server: { middlewareMode: true, hmr: false },
  });

  try {
    const { renderToString } = await import('react-dom/server');
    const React = (await import('react')).default;
    const { default: App } = await server.ssrLoadModule('/App.tsx');
    const markup = sanitizeForStaticHtml(renderToString(React.createElement(App)));
    if (!/<h1[\s>]/.test(markup)) throw new Error('prerender: nessun <h1> nel markup generato');

    writeFileSync(htmlPath, template.replace(ROOT_PLACEHOLDER, () => `<div id="root">${markup}</div>`));
    return { bytes: markup.length };
  } finally {
    await server.close();
  }
}
