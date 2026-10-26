// Controllo post-build: blocca il deploy se tracking, webhook o pagina /grazie/ non sono quelli attesi.
// Uso: npm run build && npm run verify:build   (in CI gira prima di caricare l'artifact su GitHub Pages)
//
// I valori attesi sono scritti qui apposta in modo indipendente dal codice sorgente: se qualcuno li cambia nel sorgente
// (o reintroduce un typo, come successo con la label il 03/09), la build fallisce. Aggiornare questi valori
// solo con l'approvazione esplicita di chi gestisce Google Ads / Zapier.
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { dirname, join, normalize, resolve } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, process.env.VITE_OUT_DIR || 'dist');

const ADS_ACCOUNT = 'AW-1072446258';
const EXPECTED_LABEL = 'AW-1072446258/BknuCLTJmeIbELL2sP8D'; // I maiuscola dopo "BknuCLTJme"
const OPENAI_PIXEL_ID = 'XTJjt9WSetPHSoQZpqfYBd';
const OPENAI_EVENT = 'lead_created';
const EXPECTED_WEBHOOKS = [
  'https://hooks.zapier.com/hooks/catch/1977593/44jzqgw/', // form principale
  'https://hooks.zapier.com/hooks/catch/1977593/44jzx6p/', // quick form
];

const failures = [];
const passes = [];
function check(ok, message) {
  (ok ? passes : failures).push(message);
}

function walk(dir, predicate, found = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, predicate, found);
    else if (predicate(full)) found.push(full);
  }
  return found;
}

function read(path) {
  return readFileSync(path, 'utf8');
}

if (!existsSync(outDir)) {
  console.error(`verify-build: cartella di build non trovata: ${outDir}`);
  process.exit(1);
}

const jsFiles = walk(outDir, (file) => file.endsWith('.js'));
const bundles = jsFiles.map((file) => ({ file, text: read(file) }));
const allJs = bundles.map((bundle) => bundle.text).join('\n');

// --- Conversion label -------------------------------------------------------------------------------------------------
const labelsFound = [...new Set(allJs.match(/AW-1072446258\/[A-Za-z0-9_-]+/g) ?? [])];
check(labelsFound.length === 1 && labelsFound[0] === EXPECTED_LABEL, `label di conversione = ${EXPECTED_LABEL} (trovate: ${labelsFound.join(', ') || 'nessuna'})`);
check(!allJs.includes('BknuCLTJmelbELL2sP8D'), 'label con typo (l minuscola) assente');

// --- Webhook Zapier ---------------------------------------------------------------------------------------------------
const webhooksFound = [...new Set((allJs.match(/https:\/\/hooks\.zapier\.com\/hooks\/catch\/\d+\/[a-z0-9]+\//g) ?? []))].sort();
check(JSON.stringify(webhooksFound) === JSON.stringify([...EXPECTED_WEBHOOKS].sort()), `webhook = esattamente i 2 attesi (trovati: ${webhooksFound.join(', ') || 'nessuno'})`);

// --- Pagine HTML ------------------------------------------------------------------------------------------------------
const landingPath = join(outDir, 'index.html');
const thankYouPath = join(outDir, 'grazie', 'index.html');
check(existsSync(landingPath), 'dist/index.html presente');
check(existsSync(thankYouPath), 'dist/grazie/index.html presente');

function countOf(text, needle) {
  return text.split(needle).length - 1;
}

if (existsSync(landingPath) && existsSync(thankYouPath)) {
  const landing = read(landingPath);
  const thankYou = read(thankYouPath);

  for (const [name, html] of [['index.html', landing], ['grazie/index.html', thankYou]]) {
    check(countOf(html, `gtag('config', '${ADS_ACCOUNT}')`) === 1, `${name}: Google tag configurato una sola volta (${ADS_ACCOUNT})`);
    check(html.includes(`https://www.googletagmanager.com/gtag/js?id=${ADS_ACCOUNT}`), `${name}: script gtag.js presente`);
    check(countOf(html, `pixelId: '${OPENAI_PIXEL_ID}'`) === 1, `${name}: pixel OpenAI inizializzato una sola volta (${OPENAI_PIXEL_ID})`);
    check(html.includes('https://bzrcdn.openai.com/sdk/oaiq.min.js'), `${name}: SDK OpenAI Ads presente`);
  }
  check(/<meta name="robots" content="noindex/.test(thankYou), 'grazie/index.html: noindex presente');
  check(!/noindex/i.test(landing), 'index.html: nessun noindex (la landing deve restare indicizzabile)');

  // La conversione deve partire solo dalla pagina /grazie/, mai dalla landing.
  const entryOf = (html) => (html.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/) ?? [])[1];
  // Entrambe le pagine risolvono gli asset dalla root del sito (grazie/index.html usa <base href="/">).
  const assetPath = (src) => normalize(join(outDir, src.replace(/^(\.{1,2}\/)+/, '').replace(/^\//, '')));
  const landingEntry = entryOf(landing);
  const thankYouEntry = entryOf(thankYou);
  const landingEntryPath = landingEntry && assetPath(landingEntry);
  const thankYouEntryPath = thankYouEntry && assetPath(thankYouEntry);
  check(Boolean(landingEntryPath && existsSync(landingEntryPath)), `landing: bundle principale raggiungibile (${landingEntry})`);
  check(Boolean(thankYouEntryPath && existsSync(thankYouEntryPath)), `grazie: bundle raggiungibile (${thankYouEntry})`);
  if (landingEntryPath && thankYouEntryPath && existsSync(landingEntryPath) && existsSync(thankYouEntryPath)) {
    check(!read(landingEntryPath).includes(EXPECTED_LABEL), 'landing: il bundle principale NON contiene la label (nessuna conversione dai form)');
    check(read(thankYouEntryPath).includes(EXPECTED_LABEL), 'grazie: il bundle della pagina /grazie/ contiene la label');
    check(!read(landingEntryPath).includes(OPENAI_EVENT), 'landing: il bundle principale NON contiene lead_created (nessuna conversione dalla sola visita)');
    check(read(thankYouEntryPath).includes(OPENAI_EVENT), 'grazie: il bundle della pagina /grazie/ contiene lead_created');
  }

  // --- Contenuto nell'HTML servito (pre-render) ---------------------------------------------------------------------
  // Contenuto di <div id="root"> (da qui alla chiusura del <body>). null se il contenitore non si trova: i controlli sotto falliscono.
  const rootInner = (html) => {
    const start = html.indexOf('<div id="root">');
    const end = html.lastIndexOf('</div>', html.indexOf('</body>'));
    return start === -1 || end < start ? null : html.slice(start + '<div id="root">'.length, end);
  };
  const landingRoot = rootInner(landing) ?? '';
  check(rootInner(landing) !== null, 'index.html: <div id="root"> trovato');
  const visibleWords = landingRoot
    .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')
    .split(/\s+/).filter(Boolean).length;
  check(visibleWords >= 400, `index.html: contenuto testuale nell'HTML grezzo (${visibleWords} parole nel <body>, minimo 400)`);
  check(countOf(landingRoot, '<h1') === 1, `index.html: esattamente un <h1> nell'HTML grezzo (trovati ${countOf(landingRoot, '<h1')})`);
  check(countOf(landingRoot, '<h2') >= 5, `index.html: almeno 5 <h2> nell'HTML grezzo (trovati ${countOf(landingRoot, '<h2')})`);
  check(!/<video\b[^>]*\sposter=/.test(landingRoot), 'index.html: nessun poster video nel markup statico (non anticipa download prima del JS)');
  check(!/<link rel="preload"/.test(landingRoot), 'index.html: nessun <link rel="preload"> sollevato nel markup statico');
  check(!landing.includes(`${ADS_ACCOUNT}/`), 'index.html: la label di conversione NON compare nell\'HTML della landing');
  check(thankYou.includes('<div id="root"></div>'), 'grazie/index.html: NON pre-renderizzata (resta <div id="root"></div>, flusso conversione invariato)');

  // --- robots.txt / sitemap.xml / llms.txt ---------------------------------------------------------------------------
  const SITE = 'https://progetta.sartorettoverna.it';
  const robotsPath = join(outDir, 'robots.txt');
  const sitemapPath = join(outDir, 'sitemap.xml');
  const llmsPath = join(outDir, 'llms.txt');
  check(existsSync(robotsPath), 'robots.txt presente');
  if (existsSync(robotsPath)) {
    const robots = read(robotsPath);
    check(/^User-agent: \*\s*$/m.test(robots) && /^Allow: \/\s*$/m.test(robots), 'robots.txt: User-agent: * con Allow: /');
    check(!/^Disallow:\s*\/\s*$/m.test(robots), 'robots.txt: nessun "Disallow: /" (il sito non deve essere bloccato)');
    check(!/^Disallow:.*grazie/mi.test(robots), 'robots.txt: /grazie/ non bloccata (il noindex deve poter essere letto)');
    check(robots.includes(`Sitemap: ${SITE}/sitemap.xml`), `robots.txt: dichiara la sitemap (${SITE}/sitemap.xml)`);
  }
  check(existsSync(sitemapPath), 'sitemap.xml presente');
  if (existsSync(sitemapPath)) {
    const sitemap = read(sitemapPath);
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    check(/^<\?xml/.test(sitemap) && sitemap.includes('<urlset') && sitemap.includes('</urlset>'), 'sitemap.xml: struttura urlset valida');
    check(locs.length === 4 && locs.every((u) => u === `${SITE}/` || u.startsWith(`${SITE}/?intent=`)), `sitemap.xml: 4 URL, tutti su ${SITE} (trovati ${locs.length})`);
    check(!locs.some((u) => u.includes('grazie')), 'sitemap.xml: /grazie/ (noindex) non elencata');
  }
  check(existsSync(llmsPath), 'llms.txt presente');
  if (existsSync(llmsPath)) {
    const llms = read(llmsPath);
    const links = [...llms.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
    check(/^# \S/.test(llms) && /^> \S/m.test(llms), 'llms.txt: titolo H1 e riassunto in blockquote');
    check(links.length >= 6 && links.every((u) => u.startsWith('https://')), `llms.txt: link https (${links.length})`);
    check(!links.some((u) => u.includes('grazie')), 'llms.txt: /grazie/ non elencata');
  }
}

for (const message of passes) console.log(`  ok   ${message}`);
for (const message of failures) console.error(`  FAIL ${message}`);
if (failures.length) {
  console.error(`\nverify-build: ${failures.length} controllo/i falliti. Deploy bloccato.`);
  process.exit(1);
}
console.log(`\nverify-build: tutti i controlli superati (${passes.length}).`);
