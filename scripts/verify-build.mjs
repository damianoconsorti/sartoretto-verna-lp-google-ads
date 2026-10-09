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
  }
}

for (const message of passes) console.log(`  ok   ${message}`);
for (const message of failures) console.error(`  FAIL ${message}`);
if (failures.length) {
  console.error(`\nverify-build: ${failures.length} controllo/i falliti. Deploy bloccato.`);
  process.exit(1);
}
console.log(`\nverify-build: tutti i controlli superati (${passes.length}).`);
