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
      !['phone-input', 'radio-group', 'key-icon'].includes(item.name)
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
 * Get a specific component's full data including files
 */
export function getComponent(name: string): RegistryItemWithDocs | null {
  const componentPath = path.join(REGISTRY_PATH, 'ui', `${name}.json`);

  if (!fs.existsSync(componentPath)) {
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
