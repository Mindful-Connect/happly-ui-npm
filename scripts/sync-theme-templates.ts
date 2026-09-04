/**
 * Syncs every copy of the design tokens from the two registry CSS files.
 *
 * Source of truth:
 *   packages/registry/styles/happly-theme.css     (Tailwind v4, @theme)
 *   packages/registry/styles/happly-theme-v3.css  (Tailwind v3, :root)
 *
 * Generated from them:
 *   packages/cli/src/utils/templates/happly-theme.ts   (CLI offline fallback)
 *   tailwind-manual-installation/v4/happly-theme.css   (manual install, v4)
 *   tailwind-manual-installation/v3/globals.css        (manual install, v3)
 *
 * Runs as part of `bun run build:registry`. Run it on its own with
 * `bun run scripts/sync-theme-templates.ts`.
 */

import fs from 'fs';
import path from 'path';

const root = path.join(__dirname, '..');
const read = (p: string) => fs.readFileSync(path.join(root, p), 'utf8');
const write = (p: string, content: string) => {
  const target = path.join(root, p);
  const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  if (current === content) {
    console.log(`= ${p} (unchanged)`);
    return;
  }
  fs.writeFileSync(target, content);
  console.log(`✓ ${p}`);
};

const v4 = read('packages/registry/styles/happly-theme.css');
const v3 = read('packages/registry/styles/happly-theme-v3.css');

// --- CLI fallback templates -------------------------------------------------

const escapeTemplate = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

const templatePath = 'packages/cli/src/utils/templates/happly-theme.ts';
const template = read(templatePath);
// The closing delimiter must be an *unescaped* backtick: the CSS being embedded
// can legitimately contain an escaped one right before a semicolon (a comment
// mentioning `something`; for instance), and a plain lazy match would stop
// there and truncate the block, leaving the rest of the CSS loose in the file.
const v4Block = /(export const HAPPLY_THEME_V4 = `)[\s\S]*?((?<!\\)`;)/;
const v3Block = /(export const HAPPLY_THEME_V3 = `)[\s\S]*?((?<!\\)`;)/;
if (!v4Block.test(template) || !v3Block.test(template)) {
  throw new Error(
    `${templatePath}: HAPPLY_THEME_V4 / HAPPLY_THEME_V3 anchors not found`
  );
}
write(
  templatePath,
  template
    .replace(v4Block, (_, open, close) => open + escapeTemplate(v4) + close)
    .replace(v3Block, (_, open, close) => open + escapeTemplate(v3) + close)
);

// --- Manual installation copies --------------------------------------------

const stripHeader = (css: string, lines: number) =>
  css.split('\n').slice(lines).join('\n');

write(
  'tailwind-manual-installation/v4/happly-theme.css',
  `/* HapplyUI Design Tokens — https://ui.happly.cloud */
/* Manual installation for Tailwind v4. Generated from packages/registry/styles/happly-theme.css — keep in sync. */
/* Colors are authored in oklch() (perceptual lightness, stable hue). */
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));
` + stripHeader(v4, 3)
);

write(
  'tailwind-manual-installation/v3/globals.css',
  v3.replace(
    '/* Tailwind CSS v3 theme — uses :root {} for CSS custom properties */',
    '/* Tailwind CSS v3 theme — uses :root {} for CSS custom properties */\n/* Manual installation copy. Generated from packages/registry/styles/happly-theme-v3.css — keep in sync. */'
  )
);
