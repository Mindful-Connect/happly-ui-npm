import withMarkdoc from '@markdoc/next.js';

import withSearch from './src/markdoc/search.mjs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    const registryUi = path.resolve(__dirname, '..', 'packages', 'registry', 'ui');
    const registryLib = path.resolve(__dirname, '..', 'packages', 'registry', 'lib');

    // Ensure registry files can resolve packages from docs/node_modules
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, 'node_modules'),
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      // Point @/components/ui to registry source (single source of truth)
      '@/components/ui': registryUi,
      // Point shared lib files to registry source
      '@/lib/happly-ui-utils': path.resolve(registryLib, 'happly-ui-utils'),
      '@/lib/tv': path.resolve(registryLib, 'tv'),
      '@/lib/polymorphic': path.resolve(registryLib, 'polymorphic'),
      '@/lib/recursive-clone-children': path.resolve(registryLib, 'recursive-clone-children'),
      '@/lib/alert-utils': path.resolve(registryLib, 'alert-utils'),
      '@/lib/tag-utils': path.resolve(registryLib, 'tag-utils'),
      '@/lib/currency-input-utils': path.resolve(registryLib, 'currency-input-utils'),
      '@/lib/searchable-combo-box-utils': path.resolve(registryLib, 'searchable-combo-box-utils'),
      '@/lib/upload-file-input-icons': path.resolve(registryLib, 'upload-file-input-icons'),
      // Fix for headlessui 1.7.19 import error: transition/transition.js -> transitions/transition.js
      [path.resolve(
        __dirname,
        'node_modules/@headlessui/react/dist/components/transition/transition.js'
      )]: path.resolve(
        __dirname,
        'node_modules/@headlessui/react/dist/components/transitions/transition.js'
      ),
    };
    return config;
  },
};

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig)
);
