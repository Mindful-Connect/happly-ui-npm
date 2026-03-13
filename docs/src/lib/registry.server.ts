import fs from 'fs';
import path from 'path';

import type { Registry, RegistryItem, RegistryItemWithDocs } from './registry';

// Registry paths - relative to docs folder
const REGISTRY_PATH = path.join(process.cwd(), '..', 'packages', 'registry');

/**
 * Read the main registry.json file
 */
export function getRegistry(): Registry {
  const registryPath = path.join(REGISTRY_PATH, 'registry.json');
  const content = fs.readFileSync(registryPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Get all UI components from the registry
 */
export function getUIComponents(): RegistryItem[] {
  const registry = getRegistry();
  return registry.items.filter(
    (item) =>
      item.type === 'registry:ui' &&
      !['radio-group', 'key-icon'].includes(item.name)
  );
}

/**
 * Get all library utilities from the registry
 */
export function getLibraries(): RegistryItem[] {
  const registry = getRegistry();
  return registry.items.filter((item) => item.type === 'registry:lib');
}

/**
 * Get all hooks from the registry
 */
export function getHooks(): RegistryItem[] {
  const registry = getRegistry();
  return registry.items.filter((item) => item.type === 'registry:hook');
}

/**
 * Get a specific component's full data including files
 */
export function getComponent(name: string): RegistryItemWithDocs | null {
  // Try ui/ first, then hooks/
  const uiPath = path.join(REGISTRY_PATH, 'ui', `${name}.json`);
  const hookPath = path.join(REGISTRY_PATH, 'hooks', `${name}.json`);

  const componentPath = fs.existsSync(uiPath) ? uiPath : fs.existsSync(hookPath) ? hookPath : null;

  if (!componentPath) {
    return null;
  }

  const content = fs.readFileSync(componentPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * Get all component names for static generation
 */
export function getAllComponentNames(): string[] {
  const components = getUIComponents();
  return components.map((c) => c.name);
}

/**
 * Get all hook names for static generation
 */
export function getAllHookNames(): string[] {
  const hooks = getHooks();
  return hooks.map((h) => h.name);
}

/**
 * Generate navigation links for components
 */
export function getComponentNavigation(): Array<{
  title: string;
  href: string;
}> {
  const components = getUIComponents();
  return components
    .map((c) => ({
      title: c.title,
      href: `/docs/components/${c.name}`,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}
