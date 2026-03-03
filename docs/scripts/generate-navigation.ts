/**
 * Script to generate navigation data from the registry
 * Run this before building the docs site
 */

import fs from 'fs';
import path from 'path';

const REGISTRY_PATH = path.join(__dirname, '..', '..', 'packages', 'registry');
const OUTPUT_PATH = path.join(
  __dirname,
  '..',
  'src',
  'lib',
  'navigation-data.json'
);

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
}

interface Registry {
  items: RegistryItem[];
}

function main() {
  // Read registry.json
  const registryPath = path.join(REGISTRY_PATH, 'registry.json');
  const registryContent = fs.readFileSync(registryPath, 'utf-8');
  const registry: Registry = JSON.parse(registryContent);

  // Filter UI components and generate navigation links
  const componentLinks = registry.items
    .filter(
      (item) => item.type === 'registry:ui' && item.name !== 'phone-input'
    )
    .map((item) => ({
      title: item.title,
      href: `/docs/components/${item.name}`,
      name: item.name,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const ACTION_COMPONENTS = [
    'button',
    'button-group',
    'compact-button',
    'fancy-button',
    'link-button',
  ];

  const SUPPORT_COMPONENTS = [
    'command',
    'custom-input-wrapper',
    'dialog',
    'popover',
    'key-icon',
    'alert',
  ];

  const GROUPED_COMPONENTS = [...ACTION_COMPONENTS, ...SUPPORT_COMPONENTS];

  const mainLinks = componentLinks
    .filter((item) => !GROUPED_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const actionLinks = componentLinks
    .filter((item) => ACTION_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const supportLinks = componentLinks
    .filter((item) => SUPPORT_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  // Build full navigation structure
  const navigation = [
    {
      title: 'Introduction',
      links: [
        { title: 'Getting started', href: '/' },
        { title: 'Installation', href: '/docs/installation' },
      ],
    },
    {
      title: 'Components',
      links: [
        {
          title: 'Actions',
          links: actionLinks,
          collapsed: false,
        },
        ...mainLinks,
        {
          title: 'Support components',
          links: supportLinks,
          collapsed: true,
        },
      ],
    },
  ];

  // Write to JSON file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(navigation, null, 2));
  console.log(
    `✓ Generated navigation data with ${componentLinks.length} components`
  );
  console.log(`  Output: ${OUTPUT_PATH}`);
}

main();
