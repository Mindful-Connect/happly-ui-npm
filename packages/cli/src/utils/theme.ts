import path from 'path';
import { REGISTRY_URL } from '../types/index.js';
import { fetchOrReadRaw, isLocalRegistry } from './registry.js';
import { HAPPLY_THEME_V4, HAPPLY_THEME_V3 } from './templates/happly-theme.js';
import { logger } from './logger.js';

/**
 * Fetch the theme CSS from the registry, falling back to bundled templates.
 */
export async function fetchThemeCSS(
  tailwindVersion: number,
  registryUrl?: string
): Promise<string> {
  const baseUrl = registryUrl || REGISTRY_URL;
  const fileName =
    tailwindVersion === 4 ? 'happly-theme.css' : 'happly-theme-v3.css';
  const fallback = tailwindVersion === 4 ? HAPPLY_THEME_V4 : HAPPLY_THEME_V3;

  const url = isLocalRegistry(baseUrl)
    ? path.join(baseUrl.replace('file://', ''), 'styles', fileName)
    : `${baseUrl}/styles/${fileName}`;

  try {
    return await fetchOrReadRaw(url);
  } catch {
    logger.warn(
      `Could not fetch latest theme from registry, using bundled fallback.`
    );
    return fallback;
  }
}
