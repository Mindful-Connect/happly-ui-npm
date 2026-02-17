import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import {
  texts,
  shadows,
  borderRadii,
  colors,
  semanticMappings,
  baseSemanticColors,
  fontFamilies,
  backgroundImage,
  screens,
  keyframes,
  animations,
} from '../templates/tokens.js';
import type { HapplyConfig } from '../../types/index.js';
import { logger } from '../logger.js';
/**
 * Update Tailwind configuration based on version
 */
export async function updateTailwindConfig(
  cwd: string,
  config: HapplyConfig,
  tailwindVersion: number
): Promise<void> {
  if (tailwindVersion === 4) {
    await updateCssV4(cwd, config);
  } else {
    await updateConfigV3(cwd, config);
    await updateCssV3(cwd, config);
  }
}

/**
 * Generate CSS variables for the root layer
 */
function generateCssVariables(): string {
  const vars: string[] = [];

  // 1. Base Palettes (from tokens.colors.ds)
  // We skip 'primary' because it uses vars, we want the Hex definitions (blue, neutral, etc)
  // Use unknown to avoid any, then narrow
  const colorsObj = colors as Record<string, unknown>;
  const ds = (colorsObj.ds as Record<string, unknown>) || {};
  Object.entries(ds).forEach(([key, value]) => {
    if (key === 'primary') return; // Skip primary palette here, it's semantic
    if (typeof value === 'object' && value !== null) {
      // Check if values are strings (colors)
      const palette = value as Record<string, string>;
      Object.entries(palette).forEach(([shade, colorValue]) => {
        if (typeof colorValue === 'string' && !colorValue.startsWith('var(')) {
          // This is a base palette color (hex/rgba)
          vars.push(`  --color-${key}-${shade}: ${colorValue};`);
        }
      });
    }
  });

  // 2. Semantic Mappings
  // These define --color-primary-50 defined in mappings.ts (as var(--color-blue-50))
  // and other semantic tokens
  Object.entries(semanticMappings).forEach(([key, value]) => {
    vars.push(`  --color-${key}: ${value};`);
  });

  return `:root {\n${vars.join('\n')}\n}\n`;
}

/**
 * Generate Tailwind v4 @theme block
 */
function generateThemeBlock(): string {
  const lines: string[] = [];

  // Font Sizes
  Object.entries(texts).forEach(([key, value]) => {
    const [fontSize, options] = value as [
      string,
      { lineHeight?: string; letterSpacing?: string; fontWeight?: string },
    ];
    lines.push(`  --text-${key}: ${fontSize};`);
    if (options.lineHeight)
      lines.push(`  --text-${key}--line-height: ${options.lineHeight};`);
    if (options.letterSpacing)
      lines.push(`  --text-${key}--letter-spacing: ${options.letterSpacing};`);
    if (options.fontWeight)
      lines.push(`  --text-${key}--font-weight: ${options.fontWeight};`);
  });

  // Shadows
  Object.entries(shadows).forEach(([key, value]) => {
    // Shadows in tokens.ts are strings or objects?
    // In step 58, shadows are strings mostly, some arrays joined.
    // tokens.ts: "button-primary-focus": [ ... ].join(', ') -> string.
    // So values are strings.
    lines.push(`  --shadow-${key}: ${value};`);
  });

  // Border Radii
  Object.entries(borderRadii).forEach(([key, value]) => {
    lines.push(`  --radius-${key}: ${value};`);
  });

  // Colors (DS)
  // Maps to utilities like bg-ds-primary-dark
  // We flatten colors.ds
  const colorsObj = colors as Record<string, unknown>;
  const ds = (colorsObj.ds as Record<string, unknown>) || {};
  const flattenDs = (obj: Record<string, unknown>, prefix: string) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        flattenDs(value as Record<string, unknown>, `${prefix}-${key}`);
      } else if (typeof value === 'string') {
        lines.push(`  --color-${prefix}-${key}: ${value};`);
      }
    });
  };
  flattenDs(ds, 'ds');

  return `@theme {\n${lines.join('\n')}\n}\n`;
}

/**
 * Update CSS for Tailwind v4
 */
async function updateCssV4(cwd: string, config: HapplyConfig): Promise<void> {
  const cssPath = path.join(cwd, config.tailwind.css);
  // Ensure directory exists
  if (!existsSync(path.dirname(cssPath))) return; // Should created by init?

  let content = '';
  if (existsSync(cssPath)) {
    content = await readFile(cssPath, 'utf-8');
  }

  const themeBlock = generateThemeBlock();
  const varsBlock = generateCssVariables();

  // Create new content
  if (!content.includes('@import')) {
    content = `@import "tailwindcss";\n\n${content}`;
  }

  // Append blocks if not present
  if (!content.includes('--color-ds-primary-dark:')) {
    content += `\n\n${themeBlock}`;
  }

  if (!content.includes('--color-primary-500:')) {
    content += `\n\n${varsBlock}`;
  }

  await writeFile(cssPath, content, 'utf-8');
  logger.success(`Updated ${config.tailwind.css} with Happly tokens (v4)`);
}

/**
 * Update CSS for Tailwind v3
 */
async function updateCssV3(cwd: string, config: HapplyConfig): Promise<void> {
  const cssPath = path.join(cwd, config.tailwind.css);
  if (!existsSync(cssPath)) return;

  let content = await readFile(cssPath, 'utf-8');
  const varsBlock = generateCssVariables();

  if (!content.includes('--color-primary-500:')) {
    content += `\n\n${varsBlock}`;
    await writeFile(cssPath, content, 'utf-8');
    logger.success(`Updated ${config.tailwind.css} with CSS variables`);
  }
}

/**
 * Update Tailwind Config for v3
 */
async function updateConfigV3(
  cwd: string,
  config: HapplyConfig
): Promise<void> {
  const configPath = path.join(cwd, config.tailwind.config);
  if (!existsSync(configPath)) {
    logger.warn(`Tailwind config file not found at ${configPath}`);
    return;
  }

  let content = await readFile(configPath, 'utf-8');

  if (content.includes('ds:')) {
    logger.info("Tailwind config already has 'ds' colors. Skipping update.");
    return;
  }

  const extendContent = generateV3ExtendObject();

  // Regex to find extend object
  // Looking for 'extend: {' or 'extend:{'
  const extendRegex = /extend:\s*\{/;

  if (extendRegex.test(content)) {
    content = content.replace(
      extendRegex,
      (match) => `${match}\n${extendContent},`
    );
    await writeFile(configPath, content, 'utf-8');
    logger.success(`Updated ${config.tailwind.config} with Happly tokens`);
  } else {
    // If no extend block, we might need to create it inside theme
    const themeRegex = /theme:\s*\{/;
    if (themeRegex.test(content)) {
      content = content.replace(
        themeRegex,
        (match) => `${match}\n    extend: {\n${extendContent}\n    },`
      );
      await writeFile(configPath, content, 'utf-8');
      logger.success(
        `Updated ${config.tailwind.config} with Happly tokens (new extend block)`
      );
    } else {
      logger.warn(
        `Could not update ${config.tailwind.config}. Please add Happly tokens manually.`
      );
    }
  }
}

function generateV3ExtendObject(): string {
  // Combine all colors and base semantic colors
  const allColors = {
    ...colors,
    ...baseSemanticColors,
  };

  const colorsJson = JSON.stringify(allColors, null, 6).slice(2, -2); // remove outer braces
  const colorsStr = `      colors: {\n${colorsJson}\n      }`;

  const fontSizeJson = JSON.stringify(texts, null, 6).slice(2, -2);
  const fontSizeStr = `      fontSize: {\n${fontSizeJson}\n      }`;

  const shadowJson = JSON.stringify(shadows, null, 6).slice(2, -2);
  const shadowStr = `      boxShadow: {\n${shadowJson}\n      }`;

  const radiusJson = JSON.stringify(borderRadii, null, 6).slice(2, -2);
  const radiusStr = `      borderRadius: {\n${radiusJson}\n      }`;

  return [
    colorsStr,
    fontSizeStr,
    shadowStr,
    radiusStr,
    `      fontFamily: {\n${JSON.stringify(fontFamilies, null, 6).slice(2, -2)}\n      }`,
    `      backgroundImage: {\n${JSON.stringify(backgroundImage, null, 6).slice(2, -2)}\n      }`,
    `      screens: {\n${JSON.stringify(screens, null, 6).slice(2, -2)}\n      }`,
    `      keyframes: {\n${JSON.stringify(keyframes, null, 6).slice(2, -2)}\n      }`,
    `      animation: {\n${JSON.stringify(animations, null, 6).slice(2, -2)}\n      }`,
  ].join(',\n');
}
