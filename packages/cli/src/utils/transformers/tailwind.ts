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
import { REGISTRY_URL } from '../../types/index.js';
import type { HapplyConfig } from '../../types/index.js';
import { fetchOrReadRaw, isLocalRegistry } from '../registry.js';
import { logger } from '../logger.js';

const HAPPLY_PLUGIN_FILE = 'happly-ui-tailwind.cjs';
// `init` installs this for every project; v4 registers it with `@plugin` in the
// theme CSS, so v3 has to register it here or the animate-in/out utilities that
// the overlay components rely on emit nothing.
const ANIMATE_PLUGIN_PACKAGE = 'tailwindcss-animate';

/**
 * Update Tailwind configuration based on version.
 *
 * For v4: tokens live in happly-theme.css (written by init). Nothing to do here.
 * For v3: write a Tailwind plugin with design tokens and register it.
 */
export async function updateTailwindConfig(
  cwd: string,
  config: HapplyConfig,
  tailwindVersion: number
): Promise<void> {
  if (tailwindVersion === 4) {
    logger.success('Happly tokens applied via happly-theme.css (v4)');
  } else {
    await updateConfigV3(cwd, config);
  }
}

/**
 * Update Tailwind Config for v3.
 *
 * Writes a plugin file (happly-ui-tailwind.cjs) that extends the Tailwind
 * theme with HapplyUI design tokens. Uses Tailwind's plugin API so that
 * colors are deep-merged with the user's existing config (including shadcn).
 *
 * Then registers the plugin in tailwind.config.ts plugins array.
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

  // Write the plugin file — fetch from registry, fall back to bundled tokens
  const pluginPath = path.join(cwd, HAPPLY_PLUGIN_FILE);
  const pluginContent = await fetchPluginFile(config.registry);

  if (existsSync(pluginPath)) {
    logger.info(`Overwriting existing ${HAPPLY_PLUGIN_FILE}`);
  }
  await writeFile(pluginPath, pluginContent, 'utf-8');
  logger.success(`Created ${HAPPLY_PLUGIN_FILE}`);

  // Register plugins in tailwind config
  let content = await readFile(configPath, 'utf-8');

  const missing: string[] = [];
  if (!content.includes(HAPPLY_PLUGIN_FILE)) {
    missing.push(`require('./${HAPPLY_PLUGIN_FILE}')`);
  }
  if (!content.includes(ANIMATE_PLUGIN_PACKAGE)) {
    missing.push(`require('${ANIMATE_PLUGIN_PACKAGE}')`);
  }

  if (missing.length === 0) {
    logger.info(
      `${HAPPLY_PLUGIN_FILE} and ${ANIMATE_PLUGIN_PACKAGE} already registered in tailwind config.`
    );
    return;
  }

  const registered = missing.join(' and ');

  const pluginsRegex = /plugins:\s*\[/;
  if (pluginsRegex.test(content)) {
    const inserted = missing.map((entry) => `\n    ${entry},`).join('');
    content = content.replace(pluginsRegex, (match) => `${match}${inserted}`);
    await writeFile(configPath, content, 'utf-8');
    logger.success(`Registered ${registered} in ${config.tailwind.config}`);
  } else {
    // No plugins array — try to add one before the closing brace of the config
    const closingBrace = /}\s*;?\s*$/;
    if (closingBrace.test(content)) {
      content = content.replace(
        closingBrace,
        `  plugins: [${missing.join(', ')}],\n};`
      );
      await writeFile(configPath, content, 'utf-8');
      logger.success(
        `Added plugins array with ${registered} to ${config.tailwind.config}`
      );
    } else {
      logger.warn(
        `Could not update ${config.tailwind.config}. Add manually:\n` +
          `  plugins: [${missing.join(', ')}]`
      );
    }
  }
}

/**
 * Fetch the pre-built Tailwind plugin file from the registry.
 * Falls back to generating locally from bundled tokens if fetch fails.
 */
async function fetchPluginFile(registryUrl?: string): Promise<string> {
  const baseUrl = registryUrl || REGISTRY_URL;
  const url = isLocalRegistry(baseUrl)
    ? path.join(baseUrl.replace('file://', ''), 'styles', HAPPLY_PLUGIN_FILE)
    : `${baseUrl}/styles/${HAPPLY_PLUGIN_FILE}`;

  try {
    const content = await fetchOrReadRaw(url);
    logger.info('Fetched latest tokens from registry');
    return content;
  } catch {
    logger.warn(
      'Could not fetch latest tokens from registry, using bundled fallback.'
    );
    return generatePluginFile();
  }
}

/**
 * Generate the HapplyUI Tailwind plugin file content from bundled tokens.
 *
 * This is the fallback when the registry is unreachable.
 * Using Tailwind's plugin API ensures proper deep-merging with
 * existing user config (shadcn primary, etc.) without key conflicts.
 */
function generatePluginFile(): string {
  const config = {
    theme: {
      extend: {
        colors: colors,
        fontSize: texts,
        boxShadow: shadows,
        borderRadius: borderRadii,
        fontFamily: fontFamilies,
        backgroundImage: backgroundImage,
        screens: screens,
        keyframes: keyframes,
        animation: animations,
      },
    },
  };

  return `// HapplyUI Design Tokens — https://ui.happly.cloud
// Auto-generated by @happlyui/cli — do not edit manually
// This plugin extends your Tailwind config with HapplyUI design tokens.
// It uses Tailwind's plugin API for proper deep-merging with your existing config.

const plugin = require('tailwindcss/plugin');

module.exports = plugin(function() {
  // No base styles needed — CSS variables are in happly-theme.css
}, ${JSON.stringify(config, null, 2)});
`;
}
