#!/usr/bin/env node
/* Copies the IBM Plex Sans Arabic + IBM Plex Mono woff2 files we use from
   @fontsource into /assets/fonts/. Run once after `npm install`. */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dest = path.join(root, 'assets', 'fonts');
fs.mkdirSync(dest, { recursive: true });

const COPIES = [
  // IBM Plex Sans Arabic — weights 300/400/500/600/700 (Arabic subset)
  { pkg: '@fontsource/ibm-plex-sans-arabic', file: 'ibm-plex-sans-arabic-arabic-300-normal.woff2', out: 'IBMPlexSansArabic-300.woff2' },
  { pkg: '@fontsource/ibm-plex-sans-arabic', file: 'ibm-plex-sans-arabic-arabic-400-normal.woff2', out: 'IBMPlexSansArabic-400.woff2' },
  { pkg: '@fontsource/ibm-plex-sans-arabic', file: 'ibm-plex-sans-arabic-arabic-500-normal.woff2', out: 'IBMPlexSansArabic-500.woff2' },
  { pkg: '@fontsource/ibm-plex-sans-arabic', file: 'ibm-plex-sans-arabic-arabic-600-normal.woff2', out: 'IBMPlexSansArabic-600.woff2' },
  { pkg: '@fontsource/ibm-plex-sans-arabic', file: 'ibm-plex-sans-arabic-arabic-700-normal.woff2', out: 'IBMPlexSansArabic-700.woff2' },
  // IBM Plex Mono — weights 400/500 (latin subset; used for digits)
  { pkg: '@fontsource/ibm-plex-mono', file: 'ibm-plex-mono-latin-400-normal.woff2', out: 'IBMPlexMono-400.woff2' },
  { pkg: '@fontsource/ibm-plex-mono', file: 'ibm-plex-mono-latin-500-normal.woff2', out: 'IBMPlexMono-500.woff2' },
];

let copied = 0;
let missing = [];

for (const c of COPIES) {
  const src = path.join(root, 'node_modules', c.pkg, 'files', c.file);
  const out = path.join(dest, c.out);
  if (!fs.existsSync(src)) {
    missing.push(src);
    continue;
  }
  fs.copyFileSync(src, out);
  copied++;
}

console.log(`Copied ${copied} font files to ${path.relative(root, dest)}/`);
if (missing.length) {
  console.warn('\nMissing source files (did you `npm install`?):');
  for (const m of missing) console.warn('  - ' + m);
  process.exit(1);
}
