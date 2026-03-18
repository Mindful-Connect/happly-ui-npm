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
        item.name !== 'avatar-empty-icons'
    )
    .map((item) => ({
      title: item.title,
      href: `/docs/components/${item.name}`,
      name: item.name,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  // Filter hooks and generate navigation links
  const hookLinks = registry.items
    .filter((item) => item.type === 'registry:hook')
    .map((item) => ({
      title: item.title,
      href: `/docs/hooks/${item.name}`,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  // Filter context libraries and generate navigation links
  const contextLinks = registry.items
    .filter(
      (item) =>
        item.type === 'registry:lib' && item.name.endsWith('-context')
    )
    .map((item) => ({
      title: item.title,
      href: `/docs/contexts/${item.name}`,
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
    'info-grid',
    'key-icon',
    'level-bar',
    'progress-bar',
    'progress-circle',
    'skeleton',
    'ai-orb',
    'status-badge',
    'table',
    'tag',
  ];

  const NAVIGATION_COMPONENTS = [
    'dot-stepper',
    'menu-tab-bar',
    'pagination',
  ];

  const LAYOUT_COMPONENTS = [
    'accordion',
    'switch-toggle',
    'tab-menu-horizontal',
  ];

  const FEEDBACK_COMPONENTS = [
    'alert',
    'empty-state',
    'loader',
    'tooltip',
  ];

  const OVERLAY_COMPONENTS = [
    'command-menu',
    'drawer',
    'dropdown',
    'emoji-dialog',
    'modal',
    'popover',
  ];

  const FORM_COMPONENTS = [
    'checkbox',
    'color-picker',
    'datepicker',
    'digit-input',
    'form-field',
    'hint',
    'input',
    'label',
    'markdown-editor',
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
    'phone-input',
    'socials-input',
    'tag-input',
  ];

  const FILE_UPLOAD_COMPONENTS = [
    'file-format-icon',
    'file-upload',
    'file-card',
    'logo-upload',
  ];

  const PROVIDER_COMPONENTS = [
    'theme-provider',
  ];

  const SECTION_COMPONENTS = [
    'section',
    'section-toggle',
  ];

  const CARD_COMPONENTS = [
    'info-card',
    'promotional-card',
  ];

  const GROUPED_COMPONENTS = [...ACTION_COMPONENTS, ...DISPLAYING_DATA_COMPONENTS, ...NAVIGATION_COMPONENTS, ...LAYOUT_COMPONENTS, ...FEEDBACK_COMPONENTS, ...OVERLAY_COMPONENTS, ...FORM_COMPONENTS, ...COMPOSED_INPUT_COMPONENTS, ...FILE_UPLOAD_COMPONENTS, ...PROVIDER_COMPONENTS, ...SECTION_COMPONENTS, ...CARD_COMPONENTS];

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

  const fileUploadLinks = componentLinks
    .filter((item) => FILE_UPLOAD_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const providerLinks = componentLinks
    .filter((item) => PROVIDER_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const layoutLinks = componentLinks
    .filter((item) => LAYOUT_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const sectionLinks = componentLinks
    .filter((item) => SECTION_COMPONENTS.includes(item.name))
    .map(({ name, ...rest }) => rest);

  const cardLinks = componentLinks
    .filter((item) => CARD_COMPONENTS.includes(item.name))
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
            {
              title: 'File Upload',
              links: fileUploadLinks,
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
          title: 'Layout',
          links: layoutLinks,
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
        {
          title: 'Providers',
          links: providerLinks,
          collapsed: false,
        },
        {
          title: 'Cards',
          links: cardLinks,
          collapsed: false,
        },
        {
          title: 'Sections',
          links: sectionLinks,
          collapsed: false,
        },
        ...mainLinks,
      ],
    },
    ...(hookLinks.length > 0
      ? [
          {
            title: 'Hooks',
            links: hookLinks,
          },
        ]
      : []),
    ...(contextLinks.length > 0
      ? [
          {
            title: 'Contexts',
            links: contextLinks,
          },
        ]
      : []),
  ];

  // Write to JSON file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(navigation, null, 2));
  console.log(
    `✓ Generated navigation data with ${componentLinks.length} components, ${hookLinks.length} hooks, and ${contextLinks.length} contexts`
  );
  console.log(`  Output: ${OUTPUT_PATH}`);
}

main();
