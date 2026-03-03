import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import {
  texts,
  shadows,
  borderRadii,
  colors,
  fontFamilies,
  backgroundImage,
  screens,
  keyframes,
  animations,
} from '../templates/tokens.js';
import type { HapplyConfig } from '../../types/index.js';
import { logger } from '../logger.js';

/**
 * Update Tailwind configuration based on version.
 *
 * For v4: tokens live in happly-theme.css (written by init). Nothing to do here.
 * For v3: inject tokens into tailwind.config.js extend + write CSS variables.
 */
export async function updateTailwindConfig(
  cwd: string,
  config: HapplyConfig,
  tailwindVersion: number
): Promise<void> {
  if (tailwindVersion === 4) {
    // v4: All tokens are in happly-theme.css via @theme block.
    // Init already writes the file and adds the @import.
    logger.success('Happly tokens applied via happly-theme.css (v4)');
  } else {
    await updateConfigV3(cwd, config);
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
  const extendRegex = /extend:\s*\{/;

  if (extendRegex.test(content)) {
    content = content.replace(
      extendRegex,
      (match) => `${match}\n${extendContent},`
    );
    await writeFile(configPath, content, 'utf-8');
    logger.success(`Updated ${config.tailwind.config} with Happly tokens`);
  } else {
    // If no extend block, try to create it inside theme
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
  const colorsJson = JSON.stringify(colors, null, 6).slice(2, -2);
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
