import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const [, , inputArg, outputArg] = process.argv;

if (!inputArg) {
  console.error("Usage: node scripts/export-md-pdf.mjs <input.md> [output.pdf]");
  process.exit(1);
}

const cwd = process.cwd();
const inputPath = path.resolve(cwd, inputArg);
const outputPath = path.resolve(
  cwd,
  outputArg ?? `${path.basename(inputPath, path.extname(inputPath))}.pdf`,
);

if (!fs.existsSync(inputPath)) {
  console.error(`Input not found: ${inputPath}`);
  process.exit(1);
}

const browserCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
];

const browserPath = browserCandidates.find((candidate) => fs.existsSync(candidate));

if (!browserPath) {
  console.error("No supported browser found. Install Edge or Chrome.");
  process.exit(1);
}

const markdown = fs.readFileSync(inputPath, "utf8").replace(/\r\n/g, "\n");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inlineFormat(value) {
  let text = escapeHtml(value);
  text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return text;
}

function markdownToHtml(source) {
  const lines = source.split("\n");
  const chunks = [];
  let paragraph = [];
  let inUl = false;
  let inOl = false;

  function flushParagraph() {
    if (paragraph.length) {
      chunks.push(`<p>${inlineFormat(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }

  function closeLists() {
    if (inUl) {
      chunks.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      chunks.push("</ol>");
      inOl = false;
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      flushParagraph();
      closeLists();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      closeLists();
      const level = headingMatch[1].length;
      chunks.push(`<h${level}>${inlineFormat(headingMatch[2].trim())}</h${level}>`);
      continue;
    }

    const ulMatch = line.match(/^\s*-\s+(.*)$/);
    if (ulMatch) {
      flushParagraph();
      if (inOl) {
        chunks.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        chunks.push("<ul>");
        inUl = true;
      }
      chunks.push(`<li>${inlineFormat(ulMatch[1].trim())}</li>`);
      continue;
    }

    const olMatch = line.match(/^\s*\d+\.\s+(.*)$/);
    if (olMatch) {
      flushParagraph();
      if (inUl) {
        chunks.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        chunks.push("<ol>");
        inOl = true;
      }
      chunks.push(`<li>${inlineFormat(olMatch[1].trim())}</li>`);
      continue;
    }

    closeLists();
    paragraph.push(line.trim());
  }

  flushParagraph();
  closeLists();
  return chunks.join("\n");
}

const bodyHtml = markdownToHtml(markdown);
const title = path.basename(inputPath);
const html = `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm;
    }
    :root {
      color-scheme: light;
    }
    body {
      margin: 0;
      color: #111827;
      background: #ffffff;
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.55;
    }
    main {
      width: 100%;
    }
    h1, h2, h3, h4, h5, h6 {
      color: #0f172a;
      margin: 1.1em 0 0.45em;
      line-height: 1.2;
      page-break-after: avoid;
    }
    h1 {
      font-size: 22pt;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 8px;
      margin-top: 0;
    }
    h2 { font-size: 17pt; }
    h3 { font-size: 14pt; }
    p, ul, ol {
      margin: 0 0 0.8em;
    }
    ul, ol {
      padding-left: 1.4em;
    }
    li {
      margin: 0.2em 0;
    }
    code {
      font-family: Consolas, "Courier New", monospace;
      font-size: 0.95em;
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      border-radius: 4px;
      padding: 0.08em 0.35em;
    }
    strong {
      color: #020617;
    }
  </style>
</head>
<body>
  <main>
    ${bodyHtml}
  </main>
</body>
</html>`;

const tempHtmlPath = path.join(
  path.dirname(outputPath),
  `${path.basename(outputPath, ".pdf")}.print.html`,
);
const tempProfileDir = path.join(
  path.dirname(outputPath),
  ".tmp-md-pdf-profile",
);

fs.writeFileSync(tempHtmlPath, html, "utf8");
fs.mkdirSync(tempProfileDir, { recursive: true });

const args = [
  "--headless=new",
  `--user-data-dir=${tempProfileDir}`,
  "--disable-gpu",
  "--run-all-compositor-stages-before-draw",
  `--print-to-pdf=${outputPath}`,
  pathToFileURL(tempHtmlPath).href,
];

const result = spawnSync(browserPath, args, {
  encoding: "utf8",
  stdio: "pipe",
});

if (result.status !== 0) {
  console.error(result.stderr || result.stdout || "Browser PDF export failed.");
  process.exit(result.status ?? 1);
}

if (!fs.existsSync(outputPath)) {
  console.error("PDF export did not produce an output file.");
  process.exit(1);
}

console.log(`PDF created: ${outputPath}`);
