/**
 * Builds the before/after showcase as one self-contained HTML file.
 *
 * Bundles `packages/registry/showcase/skills-before-after.stories.tsx` (the real
 * components, current and the `production` snapshot beside it) with Bun, compiles
 * the Tailwind CSS it needs, and inlines both into a single page — no build step
 * and no external scripts at the other end, so it can be dropped on any static
 * host or opened straight from disk.
 *
 * Usage: bun run showcase:page [outDir]      (default: ~/Desktop/happly-skills-page)
 */

import fs from 'fs';
import os from 'os';
import path from 'path';

const root = path.join(__dirname, '..');
const outDir =
  process.argv[2] ?? path.join(os.homedir(), 'Desktop', 'happly-skills-page');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'happly-showcase-'));

const story = path.join(
  root,
  'packages/registry/showcase/skills-before-after.stories.tsx'
);
if (!fs.existsSync(story)) {
  throw new Error(`showcase story not found at ${story}`);
}

// --- JS: bundle the story's page component ---------------------------------

const entry = path.join(tmp, 'entry.tsx');
fs.writeFileSync(
  entry,
  `import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BeforeAndAfter } from ${JSON.stringify(story)};

const el = document.getElementById('root');
if (el) createRoot(el).render(<React.StrictMode>{BeforeAndAfter.render()}</React.StrictMode>);
`
);
// Bun resolves `react` and the story's `@/…` aliases by walking up from each
// file, so the scratch entry needs the workspace's modules next to it.
fs.symlinkSync(path.join(root, 'node_modules'), path.join(tmp, 'node_modules'));

// `--production` is what switches the JSX transform to react/jsx-runtime and
// sets NODE_ENV. Without it Bun emits `jsxDEV` calls, and React's production
// build of react/jsx-dev-runtime exports `jsxDEV: undefined` — the page then
// throws "s is not a function" and renders blank.
const bundled = Bun.spawnSync([
  'bun',
  'build',
  entry,
  '--outfile',
  path.join(tmp, 'bundle.js'),
  '--target',
  'browser',
  '--production',
]);
if (bundled.exitCode !== 0) {
  throw new Error(`bun build failed:\n${bundled.stderr.toString()}`);
}

// --- CSS: compile the theme + the utilities the components use --------------

const cssEntry = path.join(root, 'packages/registry/.showcase-tw.css');
fs.writeFileSync(
  cssEntry,
  `@import 'tailwindcss';
@import './styles/happly-theme.css';
@plugin 'tailwindcss-animate';
@source './ui';
@source './lib';
@source './showcase';
@custom-variant dark (&:where(.dark, .dark *));
@import './styles/markdown-editor.css';
`
);
const css = Bun.spawnSync([
  'bunx',
  '@tailwindcss/cli',
  '-i',
  cssEntry,
  '-o',
  path.join(tmp, 'styles.css'),
  '--minify',
]);
fs.unlinkSync(cssEntry);
if (css.exitCode !== 0) {
  throw new Error(`tailwind build failed:\n${css.stderr.toString()}`);
}

// --- Assemble ---------------------------------------------------------------

// A closing tag inside a string literal would end the inline block early.
const escapeInline = (s: string, tag: string) =>
  s.replace(new RegExp(`</(${tag})`, 'gi'), '<\\/$1');

const js = escapeInline(
  fs.readFileSync(path.join(tmp, 'bundle.js'), 'utf8'),
  'script'
);
const styles = escapeInline(
  fs.readFileSync(path.join(tmp, 'styles.css'), 'utf8'),
  'style'
);

fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'index.html');
fs.writeFileSync(
  outFile,
  `<title>HapplyUI Before and After</title>
<style>${styles}</style>
<style>html,body{margin:0;padding:0}</style>
<div id="root"></div>
<script type="module">${js}</script>
`
);
fs.rmSync(tmp, { recursive: true, force: true });

const mb = (fs.statSync(outFile).size / 1024 / 1024).toFixed(2);
console.log(`✓ ${outFile} (${mb} MB)`);
