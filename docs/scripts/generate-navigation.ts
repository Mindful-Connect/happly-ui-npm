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
      (item) =>
        item.type === 'registry:ui' &&
        item.name !== 'phone-input' &&
        item.name !== 'avatar-empty-icons'
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

  const DISPLAYING_DATA_COMPONENTS = [
    'avatar',
    'avatar-group',
    'avatar-group-compact',
    'badge',
    'banner',
    'divider',
    'kbd',
    'key-icon',
    'level-bar',
    'progress-bar',
    'progress-circle',
    'status-badge',
    'table',
    'tag',
  ];

  const NAVIGATION_COMPONENTS = [
    'dot-stepper',
    'pagination',
  ];

  const FEEDBACK_COMPONENTS = [
    'alert',
    'tooltip',
  ];

  const OVERLAY_COMPONENTS = [
    'command-menu',
    'drawer',
    'dropdown',
    'modal',
    'popover',
  ];

  const FORM_COMPONENTS = [
    'checkbox',
    'color-picker',
    'datepicker',
    'digit-input',
    'hint',
    'input',
    'label',
    'radio',
    'radio-card',
    'select',
    'slider',
    'switch',
    'textarea',
  ];

  const COMPOSED_INPUT_COMPONENTS = [
    'combo-box',
    'currency-input',
    'location-input',
    'password-input',
    'socials-input',
    'tag-input',
    'upload-file-input',
  ];

  const GROUPED_COMPONENTS = [...ACTION_COMPONENTS, ...DISPLAYING_DATA_COMPONENTS, ...NAVIGATION_COMPONENTS, ...FEEDBACK_COMPONENTS, ...OVERLAY_COMPONENTS, ...FORM_COMPONENTS, ...COMPOSED_INPUT_COMPONENTS];

  const mainLinks = componentLinks
    .filter((item) => !GROUPED_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const actionLinks = componentLinks
    .filter((item) => ACTION_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const displayingDataLinks = componentLinks
    .filter((item) => DISPLAYING_DATA_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const navigationLinks = componentLinks
    .filter((item) => NAVIGATION_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const feedbackLinks = componentLinks
    .filter((item) => FEEDBACK_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const overlayLinks = componentLinks
    .filter((item) => OVERLAY_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const formLinks = componentLinks
    .filter((item) => FORM_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const composedInputLinks = componentLinks
    .filter((item) => COMPOSED_INPUT_COMPONENTS.includes(item.name))
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
        {
          title: 'Displaying data',
          links: displayingDataLinks,
          collapsed: false,
        },
        {
          title: 'Form',
          links: [
            ...formLinks,
            {
              title: 'Composed Inputs',
              links: composedInputLinks,
              collapsed: false,
            },
          ],
          collapsed: false,
        },
        {
          title: 'Navigation',
          links: navigationLinks,
          collapsed: false,
        },
        {
          title: 'Feedback',
          links: feedbackLinks,
          collapsed: false,
        },
        {
          title: 'Overlays',
          links: overlayLinks,
          collapsed: false,
        },
        ...mainLinks,
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
