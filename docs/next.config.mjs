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
    config.resolve.alias = {
      ...config.resolve.alias,
      // Fix for headlessui 1.7.19 import error: transition/transition.js -> transitions/transition.js
      [path.resolve(__dirname, 'node_modules/@headlessui/react/dist/components/transition/transition.js')]: 
        path.resolve(__dirname, 'node_modules/@headlessui/react/dist/components/transitions/transition.js'),
    };
    return config;
  },
};

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig)
);
