import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import type {
  RegistryItem,
  RegistryIndex,
  HapplyConfig,
} from '../types/index.js';
import { REGISTRY_URL } from '../types/index.js';

/**
 * Get the registry URL from config or default
 */
function getRegistryUrl(config?: HapplyConfig): string {
  return config?.registry || REGISTRY_URL;
}

/**
 * Check if registry is a local path
 */
export function isLocalRegistry(registry: string): boolean {
  return (
    registry.startsWith('/') ||
    registry.startsWith('./') ||
    registry.startsWith('file://') ||
    /^[a-zA-Z]:[\\/]/.test(registry) // Windows absolute path (e.g. C:\... or C:/...)
  );
}

/**
 * Fetch from URL or read local file
 */
async function fetchOrRead(url: string): Promise<unknown> {
  if (isLocalRegistry(url)) {
    const localPath = url.replace('file://', '');
    if (!existsSync(localPath)) {
      throw new Error(`Local registry file not found: ${localPath}`);
    }
    const content = await readFile(localPath, 'utf-8');
    return JSON.parse(content);
  }

  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch the registry index
 */
export async function fetchRegistryIndex(
  config?: HapplyConfig
): Promise<RegistryIndex> {
  const baseUrl = getRegistryUrl(config);
  const url = isLocalRegistry(baseUrl)
    ? path.join(baseUrl.replace('file://', ''), 'registry.json')
    : `${baseUrl}/registry.json`;

  return fetchOrRead(url) as Promise<RegistryIndex>;
}

export async function fetchOrReadRaw(url: string): Promise<string> {
  if (isLocalRegistry(url)) {
    const localPath = url.replace('file://', '');
    if (!existsSync(localPath)) {
      throw new Error(`Local file not found: ${localPath}`);
    }
    return readFile(localPath, 'utf-8');
  }

  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.text();
}

/**
 * Fetch a single registry item
 */
export async function fetchRegistryItem(
  name: string,
  config?: HapplyConfig
): Promise<RegistryItem> {
  const baseUrl = getRegistryUrl(config);
  const isLocal = isLocalRegistry(baseUrl);
  const cleanBaseUrl = baseUrl.replace('file://', '');

  // Try different paths based on component type
  const paths = isLocal
    ? [
        path.join(cleanBaseUrl, 'ui', `${name}.json`),
        path.join(cleanBaseUrl, 'hooks', `${name}.json`),
        path.join(cleanBaseUrl, 'lib', `${name}.json`),
        path.join(cleanBaseUrl, `${name}.json`),
      ]
    : [
        `${baseUrl}/ui/${name}.json`,
        `${baseUrl}/hooks/${name}.json`,
        `${baseUrl}/lib/${name}.json`,
        `${baseUrl}/${name}.json`,
      ];

  for (const url of paths) {
    try {
      const item = (await fetchOrRead(url)) as RegistryItem;

      // Hydrate missing content
      await Promise.all(
        item.files.map(async (file) => {
          if (!file.content) {
            const fileUrl = isLocal
              ? path.join(cleanBaseUrl, file.path)
              : `${baseUrl}/${file.path}`;
            file.content = await fetchOrReadRaw(fileUrl);
          }
        })
      );

      return item;
    } catch {
      continue;
    }
  }

  throw new Error(`Component "${name}" not found in registry`);
}

/**
 * Fetch multiple registry items
 */
export async function fetchRegistryItems(
  names: string[],
  config?: HapplyConfig
): Promise<RegistryItem[]> {
  const items: RegistryItem[] = [];
  const fetchedNames = new Set<string>();

  // Queue for resolving dependencies
  const queue = [...names];

  while (queue.length > 0) {
    const name = queue.shift()!;

    if (fetchedNames.has(name)) continue;
    fetchedNames.add(name);

    const item = await fetchRegistryItem(name, config);
    items.push(item);

    // Add registry dependencies to queue
    if (item.registryDependencies) {
      for (const dep of item.registryDependencies) {
        if (!fetchedNames.has(dep)) {
          queue.push(dep);
        }
      }
    }
  }

  return items;
}

/**
 * Get all available components from registry
 */
export async function getAvailableComponents(
  config?: HapplyConfig
): Promise<string[]> {
  const index = await fetchRegistryIndex(config);
  return index.items.map((item) => item.name);
}

/**
 * Check if a component exists in registry
 */
export async function componentExistsInRegistry(
  name: string,
  config?: HapplyConfig
): Promise<boolean> {
  try {
    await fetchRegistryItem(name, config);
    return true;
  } catch {
    return false;
  }
}

/**
 * Collect all npm dependencies from registry items
 */
export function collectDependencies(items: RegistryItem[]): {
  dependencies: string[];
  devDependencies: string[];
} {
  const deps = new Set<string>();
  const devDeps = new Set<string>();

  for (const item of items) {
    if (item.dependencies) {
      item.dependencies.forEach((dep) => deps.add(dep));
    }
    if (item.devDependencies) {
      item.devDependencies.forEach((dep) => devDeps.add(dep));
    }
  }

  return {
    dependencies: Array.from(deps),
    devDependencies: Array.from(devDeps),
  };
}
